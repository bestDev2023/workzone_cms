import {Controller, Get, Path, Route} from "@tsoa/runtime"

import {PullRequestMergeCheckResult} from "@shared/models"

import {checkMerge} from "./MergeCheck"
import {countChecks} from "./countChecks"

@Route("merge-check")
export class MergeCheckApi extends Controller {
  @Get("{workspace}/{repository}/{pullrequestId}")
  async perform(
    @Path() workspace: string,
    @Path() repository: string,
    @Path() pullrequestId: number
  ): Promise<{
    total: number
    passed: number
    results: Array<PullRequestMergeCheckResult>
  }> {
    const results = await checkMerge(workspace, repository, pullrequestId)

    return {results, ...countChecks(results)}
  }
}
