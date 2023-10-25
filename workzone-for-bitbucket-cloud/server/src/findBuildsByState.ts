import {ok} from "oazapfts"
import {groupBy, mapToObj, mapValues, pipe} from "remeda"

import {
  Commitstatus,
  getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdStatuses,
} from "bitbucket-api"
import {fail} from "@shared/fail"
import {PullRequest} from "@shared/models"
import {getRepositoryRef} from "@/reviewers/getRepositoryRef"

const BUILD_STATES = ["SUCCESSFUL", "FAILED", "INPROGRESS", "STOPPED"] as const
type BuildState = NonNullable<Commitstatus["state"]>

export async function findBuildsByState(
  pullRequest: PullRequest
): Promise<Record<BuildState, number>> {
  const {workspace, repository} = getRepositoryRef(pullRequest)
  const commitStatuses = await ok(
    getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdStatuses(
      pullRequest.id,
      repository,
      workspace
    )
  )
  const initialValues = mapToObj(BUILD_STATES, _ => [_, 0])
  return {
    ...initialValues,
    ...pipe(
      commitStatuses.values ?? [],
      groupBy(_ => _.state ?? fail("Unknown build status")),
      mapValues(_ => _.length)
    ),
  }
}
