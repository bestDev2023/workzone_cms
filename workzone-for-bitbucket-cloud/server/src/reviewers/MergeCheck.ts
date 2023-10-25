import deepmerge from "deepmerge"
import {PartialDeep} from "type-fest"
import {ok} from "oazapfts"
import {difference, filter, isDefined, map, pipe} from "remeda"

import {
  getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestId,
  postRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdMerge,
  Pullrequest,
  putRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestId,
} from "bitbucket-api"
import {
  MergeCheckResult,
  PullRequest,
  PullRequestMergeCheckResult,
  PullRequestSettingsEntry,
} from "@shared/models"
import {fail} from "@shared/fail"
import {getConflicts} from "@/bitbucket-api/internal"
import {findBuildsByState} from "@/findBuildsByState"
import {list} from "@/settings/PullRequestSettings"
import {f, logger} from "@/logger"
import {getRepositoryRef} from "@/reviewers/getRepositoryRef"

import {ReviewMergeChecker} from "./ReviewMergeChecker"
import {matchPullRequest} from "./matchPullRequest"
import {countChecks} from "./countChecks"

function hasRequestedChanges(pr: Pullrequest): boolean {
  return pr.participants?.some(_ => _.state === "changes_requested") ?? false
}

async function runChecks(
  pullRequest: PullRequest,
  prSetting: PullRequestSettingsEntry
): Promise<PullRequestMergeCheckResult> {
  logger.debug(f`runChecks: Matched PR settings: ${prSetting}`)

  const pendingChecks: Array<Promise<Array<MergeCheckResult>>> = []

  if (prSetting.reviewSpec) {
    const reviewResult = new ReviewMergeChecker(prSetting.reviewSpec).perform(
      pullRequest
    )
    pendingChecks.push(reviewResult)
  }

  if (prSetting.standard.checks.noChangesRequested) {
    const status = hasRequestedChanges(pullRequest) ? "PENDING" : "PASSED"
    const mergeCheckResult: MergeCheckResult = {
      type: "generic",
      description: "No requested changes",
      status,
    }
    pendingChecks.push(Promise.resolve([mergeCheckResult]))
  }

  if (prSetting.standard.checks.noUnresolvedTasks) {
    const status = (pullRequest.task_count ?? 0) > 0 ? "PENDING" : "PASSED"
    const mergeCheckResult: MergeCheckResult = {
      type: "generic",
      description: "No unresolved tasks",
      status,
    }
    pendingChecks.push(Promise.resolve([mergeCheckResult]))
  }

  const requiredSuccessfulBuilds = prSetting.standard.checks.successfulBuilds
  if (requiredSuccessfulBuilds > 0) {
    const pendingCheck = new Promise<Array<MergeCheckResult>>(async resolve => {
      const buildCount = await findBuildsByState(pullRequest)
      const status =
        buildCount.SUCCESSFUL >= requiredSuccessfulBuilds &&
        buildCount.FAILED === 0
          ? "PASSED"
          : "PENDING"

      const mergeCheckResult: MergeCheckResult = {
        type: "generic",
        description: `<strong>+${requiredSuccessfulBuilds}</strong> successful and no failed builds`,
        status,
      }
      resolve([mergeCheckResult])
    })

    pendingChecks.push(pendingCheck)
  }

  const resolvedChecks = (await Promise.all(pendingChecks)).flat()

  logger.debug(f`runChecks: result ${{resolvedChecks}}`)

  return {
    // FIXME set ID
    settingId: "{00000000-0000-0000-0000-000000000000}",
    checkResults: resolvedChecks,
    isAutoMerge: prSetting.autoMerge,
  }
}

export async function checkMerge(
  workspace: string,
  repository: string,
  pullrequestId: number
): Promise<Array<PullRequestMergeCheckResult>> {
  const pr = (await ok(
    getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestId(
      pullrequestId,
      repository,
      workspace
    )
  )) as PullRequest

  const prSettings = await list(workspace, "member")
  const appliedSettings = prSettings
    .filter(_ => matchPullRequest(pr, _))
    .map(async prSetting => runChecks(pr, prSetting))

  return (await Promise.all(appliedSettings)).flat()
}

export async function onChange(pr: PullRequest): Promise<void> {
  if (pr.state !== "OPEN") {
    return
  }

  const {workspace, repository} = getRepositoryRef(pr)
  const prSettings = await list(workspace, "member")
  const matchedSettings = prSettings.filter(_ => matchPullRequest(pr, _))

  const shouldAutoMerge = matchedSettings.some(_ => _.autoMerge)
  if (shouldAutoMerge) {
    const conflicts = await getConflicts(workspace, repository, pr.id)
    if (conflicts.length === 0) {
      const checkResults = await Promise.all(
        matchedSettings.map(async prSetting => runChecks(pr, prSetting))
      )

      const {total, passed} = countChecks(checkResults)
      logger.debug(f`onChange: checks passed ${passed}/${total}`)
      if (total === passed) {
        // FIXME handle error
        await postRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdMerge(
          pr.id,
          repository,
          workspace,
          {type: ""}
        )
      }
    }
  }

  // TODO no need to trigger reviewer updates if auto merge occurred?
  const updates = await Promise.all(
    pipe(
      matchedSettings,
      map(_ => _.reviewSpec),
      filter(isDefined),
      map(async reviewSpec => new ReviewMergeChecker(reviewSpec).evalApply(pr))
    )
  )

  logger.debug(f`onChange: evaluating updates:${updates}`)

  const {updateRequired, changes} = evalUpdates(pr, updates)
  logger.debug(
    f`onChange: updates:${updates} updateRequired: ${updateRequired}`
  )
  if (updateRequired) {
    logger.debug(
      f`Applying update to PR: ${pr.id} : ${JSON.stringify(changes)}`
    )
    await putRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestId(
      pr.id,
      repository,
      workspace,
      <Pullrequest>changes
    )
  }
}

function evalUpdates(
  pr: PullRequest,
  updates: Array<PartialDeep<PullRequest>>
): {updateRequired: boolean; changes: PartialDeep<PullRequest>} {
  const mergedPartials = updates.reduce<Partial<PullRequest>>(
    (update, partialUpdate) => deepmerge(update, partialUpdate),
    {}
  )

  // The webhook will trigger itself and this can cause circular if it's not
  // able to evaluate if the change has already been applied. It also works as
  // an optimization to avoid unnecessary updates in some scenarios.
  const updateRequired = isUpdateRequired(pr, mergedPartials)
  return {
    updateRequired,
    changes: {
      // Title is required when updating via BB API
      title: pr.title ?? fail("Pull request doesn't have a title"),
      ...mergedPartials,
    },
  }
}

function isUpdateRequired(
  pr: Pullrequest,
  updates: Partial<Pullrequest>
): boolean {
  const {reviewers, ...rest} = updates
  let isRequired = false
  const updateReviewers = reviewers?.map(_ => _.uuid) ?? []
  const currentReviewers = pr.reviewers?.map(_ => _.uuid) ?? []
  isRequired =
    difference(currentReviewers, updateReviewers).length > 0 ||
    difference(updateReviewers, currentReviewers).length > 0

  logger.debug(
    f`isUpdateRequired for PR ${pr.id}? updateReviewers: ${updateReviewers}, currentReviewers: ${currentReviewers} -> required:${isRequired}`
  )
  // Safety net to avoid circular updates in case it doesn't know how to compare
  // the objects due to changes in how the PR is updated
  if (Object.keys(rest).length > 0) {
    logger.warn(
      f`Unable to evaluate if update is required due to unexpected properties for PR ${pr.id}: ${rest}`
    )
    fail(
      `Unable to evaluate if update is required due to unexpected properties for PR ${pr.id}: ${rest}`,
      {rest}
    )
  }

  return isRequired
}
