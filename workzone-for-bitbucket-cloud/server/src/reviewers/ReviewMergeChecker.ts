import {countBy, uniqBy} from "remeda"
import {PartialDeep} from "type-fest"
import {ok} from "oazapfts"
import is from "@sindresorhus/is"

import {
  getWorkspacesByWorkspaceMembersAndMember,
  Pullrequest,
  User,
} from "bitbucket-api"
import {fail} from "@shared/fail"
import {getGroup, getGroupMembers} from "@/bitbucket-api/internal"
import {
  MergeCheckResult,
  NamedReviewer,
  PartialDiffStat,
  PullRequest,
  QuotaResult,
  Reviewer,
  ReviewGroup,
  ReviewMergeCheckResult,
  ReviewSpec,
  ReviewStatus,
} from "@shared/models"
import {findBuildsByState} from "@/findBuildsByState"
import {matchDiff} from "@/reviewers/matchDiff"
import {getDiffStatPaths} from "@/bitbucket-api/getDiffStatPaths"
import {getRepositoryRef} from "@/reviewers/getRepositoryRef"
import {f, logger} from "@/logger"

interface MergeChecker {
  perform: (
    pullRequest: PullRequest,
    diffStat: Array<PartialDiffStat>
  ) => Promise<Array<MergeCheckResult>>
}

type UUID = string

export class ReviewMergeChecker implements MergeChecker {
  constructor(
    private readonly reviewSpec: ReviewSpec,
    public _getWorkspacesByWorkspaceMembersAndMember = getWorkspacesByWorkspaceMembersAndMember,
    public _getGroupMembers = getGroupMembers,
    public _getGroup = getGroup,
    public _getDiffStatPaths = getDiffStatPaths
  ) {}

  async perform(
    pullRequest: PullRequest
  ): Promise<Array<ReviewMergeCheckResult>> {
    // Resolve group's users and their approval status and checks against
    // the quota, if applicable

    const {workspace} = getRepositoryRef(pullRequest)

    const reviewGroupWithUsers = await Promise.all(
      (
        await evalReviewers(
          pullRequest,
          this.reviewSpec.reviewGroups,
          this._getDiffStatPaths,
          this._getGroupMembers
        )
      ).map(async ({reviewGroup, participants}) => {
        // TODO This could be more efficient by not fetching the Account for the
        // user that has already being loaded when resolving the group
        const withUser = await Promise.all(
          participants.map(async ({uuid}) => this.getUser(uuid, workspace))
        )

        return {reviewGroup, participants: withUser}
      })
    )

    return Promise.all(
      reviewGroupWithUsers
        .map(withReviewStatus)
        .map(entry => {
          const quotaResult = calculateQuota(entry)
          return {...entry, quota: quotaResult}
        })
        .map(withCheckStatus)
        .map(async _ => this.withReviewerName(workspace, _))
    )

    function withCheckStatus<T>(
      reviewResult: T & Pick<ReviewMergeCheckResult, "quota">
    ): T & Pick<ReviewMergeCheckResult, "type" | "description" | "status"> {
      return {
        ...reviewResult,
        type: "review-merge-check",
        description: "Required reviewers",
        status: reviewResult.quota.isMet ? "PASSED" : "PENDING",
      }
    }

    function withReviewStatus({
      reviewGroup,
      participants,
    }: {
      reviewGroup: ReviewGroup
      participants: Array<User>
    }): {
      reviewGroup: ReviewGroup
      reviewStatus: Array<ReviewStatus>
    } {
      // FIXME should check for role REVIEWER?
      const prParticipants = pullRequest.participants ?? []
      logger.debug(
        f`PR ${pullRequest.id} participants : ${prParticipants.map(
          _ => _.user?.uuid
        )}`
      )
      logger.debug(
        f`PR ${pullRequest.id} configured reviewers : ${participants.map(
          _ => _.uuid
        )}`
      )
      const reviewStatus = participants.map(participant => {
        const isApproved = prParticipants.some(
          _ => _.user?.uuid === participant.uuid && _.approved
        )

        logger.debug(
          f`PR ${pullRequest.id} reviewer ${participant.uuid} , approved: ${isApproved}`
        )
        return {participant, isApproved}
      })

      return {reviewGroup, reviewStatus}
    }
  }

  async evalApply(pullRequest: PullRequest): Promise<PartialDeep<Pullrequest>> {
    let reviewersByGroup = await evalReviewers(
      pullRequest,
      this.reviewSpec.reviewGroups,
      this._getDiffStatPaths,
      this._getGroupMembers
    )

    logger.debug(
      f`ReviewMergeChecker.evalApply found reviewers ${reviewersByGroup}`
    )

    const hasAddAfterBuildCheck = reviewersByGroup.some(
      _ => _.reviewGroup.requireSuccessfulBuilds > 0
    )

    if (hasAddAfterBuildCheck) {
      const buildCount = await findBuildsByState(pullRequest)
      reviewersByGroup = reviewersByGroup.filter(
        _ =>
          buildCount.SUCCESSFUL >= _.reviewGroup.requireSuccessfulBuilds &&
          buildCount.FAILED === 0
      )
    }

    return {
      reviewers: reviewersByGroup.flatMap(
        reviewParticipant => reviewParticipant.participants
      ),
    }
  }

  private readonly withReviewerName = async <
    T extends {
      reviewGroup: ReviewGroup
      reviewStatus: Array<ReviewStatus>
      quota: QuotaResult
    }
  >(
    workspace: string,
    reviewResult: T
  ): Promise<T & {reviewGroup: ReviewGroup<NamedReviewer>}> => {
    const namedReviewers = await Promise.all(
      reviewResult.reviewGroup.reviewers.map(async reviewer => {
        let name
        if (reviewer.type === "user") {
          name =
            // TODO implement a user local cache
            (await this.getUser(reviewer.id, workspace)).display_name ??
            fail("Error while resolving user reviewer name")
        } else {
          const {name: groupName} = await this._getGroup(workspace, reviewer.id)
          name = groupName
        }

        return {...reviewer, name}
      })
    )

    const reviewGroupWithNames: ReviewGroup<NamedReviewer> = {
      ...reviewResult.reviewGroup,
      reviewers: namedReviewers,
    }

    return {...reviewResult, reviewGroup: reviewGroupWithNames}
  }

  private readonly getUser = async (uuid: UUID, workspace: string) =>
    (await ok(this._getWorkspacesByWorkspaceMembersAndMember(uuid, workspace)))
      .user ?? fail(`Unable to find user with uuid: ${uuid}`)
}

function calculateQuota(entry: {
  reviewGroup: ReviewGroup
  reviewStatus: Array<ReviewStatus>
}): QuotaResult {
  const {quota} = entry.reviewGroup

  const approved = countBy(entry.reviewStatus, _ => _.isApproved)
  const totalReviewers = entry.reviewStatus.length

  logger.debug(
    f`Calculating quota ${quota} with totalReviewers: ${totalReviewers} approved: ${approved}`
  )
  const quotaResult = new QuotaResult(quota, totalReviewers, approved)
  logger.debug(f`reviewer quota result: ${quotaResult}`)
  return quotaResult
}

export async function resolveUser(
  workspace: string,
  reviewer: Reviewer,
  _getGroupMembers: typeof getGroupMembers
): Promise<Array<UUID>> {
  let users
  if (reviewer.type === "group") {
    const result = await _getGroupMembers(workspace, reviewer.id)
    users = result.values.map(_ => _.uuid)
  } else {
    users = [reviewer.id]
  }

  return users
}

async function evalReviewers(
  pullRequest: PullRequest,
  reviewGroups: Array<ReviewGroup>,
  _getDiffStatPaths: typeof getDiffStatPaths,
  _getGroupMembers: typeof getGroupMembers
): Promise<
  Array<{reviewGroup: ReviewGroup; participants: Array<{uuid: string}>}>
> {
  const {workspace, repository} = getRepositoryRef(pullRequest)
  const authorId = pullRequest.author?.uuid

  let filteredReviewGroups = reviewGroups.filter(
    _ => !(_.reviewers.length === 1 && _.reviewers[0]?.id === authorId)
  )

  const hasFilePattern = filteredReviewGroups.some(_ =>
    is.nonEmptyString(_.filePattern)
  )

  if (hasFilePattern) {
    const diffStats = await _getDiffStatPaths(
      workspace,
      repository,
      pullRequest.id
    )
    filteredReviewGroups = filteredReviewGroups.filter(
      _ => _.filePattern == null || matchDiff(_.filePattern, diffStats)
    )
  }

  return Promise.all(
    filteredReviewGroups.map(async reviewGroup => {
      const participants = (
        await Promise.all(
          reviewGroup.reviewers
            .filter(
              reviewer =>
                // Discard the User Reviewer when the PR author is the
                // reviewer (multiple users in the review group)
                !(reviewer.type === "user" && reviewer.id === authorId)
            )
            .map(async reviewer =>
              (
                await Promise.all(
                  await resolveUser(workspace, reviewer, _getGroupMembers)
                )
              )
                .map(uuid => ({
                  uuid,
                }))
                // The author can't be a reviewer
                .filter(_ => _.uuid !== authorId)
            )
        )
      ).flat()

      const participantsSet = uniqBy(participants, _ => _.uuid)

      return {
        reviewGroup,
        participants: participantsSet,
      }
    })
  )
}
