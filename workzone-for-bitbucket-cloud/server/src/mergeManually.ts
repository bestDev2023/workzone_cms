import {ok} from "oazapfts"

import {
  Account,
  getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestId,
  Pullrequest,
} from "bitbucket-api"
import {AppError, fail} from "@shared/fail"
import {checkMerge} from "@/reviewers/MergeCheck"
import {countChecks} from "@/reviewers/countChecks"

import {context} from "./context"
import {httpClient} from "./httpClient"

function isPassing({total, passed}: {total: number; passed: number}) {
  return total === passed
}

export async function mergeManually(
  workspace: string,
  repository: string,
  pullRequestId: number
): Promise<string> {
  const mergeCheckResult = await checkMerge(
    workspace,
    repository,
    pullRequestId
  )

  if (!isPassing(countChecks(mergeCheckResult))) {
    throw new AppError(
      "Pull request cannot be merged because there are pending merge checks."
    )
  }

  const pr = await ok(
    getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestId(
      pullRequestId,
      repository,
      workspace
    )
  )

  const loggedInUser = await context().loggedInUser()

  const message = createManualMergeMessage(pr, loggedInUser)

  // api signature/spec is broken since it doesn't
  // declare response header
  const res = await httpClient.post(
    `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/pullrequests/${pullRequestId}/merge?async=true`,
    {
      json: {message},
    }
  )
  return res.statusCode === 202 || res.statusCode === 200
    ? res.headers.location ?? ""
    : fail(res.body)
}

function createManualMergeMessage(pr: Pullrequest, loggedInUser: Account) {
  const source = pr.source?.branch?.name ?? fail("Branch name required")
  const prId = pr.id
  const username = loggedInUser.display_name
  return `Merged in ${source} (pull request #${prId}) on behalf of ${username}`
}
