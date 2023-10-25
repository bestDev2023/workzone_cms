import {Controller, Path, Post, Route} from "@tsoa/runtime"

import {mergeManually} from "./mergeManually"

@Route("merge")
export class MergeApi extends Controller {
  @Post("{workspace}/{repository}/{pullrequestId}")
  async mergeManually(
    @Path() workspace: string,
    @Path() repository: string,
    @Path() pullrequestId: number
  ): Promise<string> {
    return mergeManually(workspace, repository, pullrequestId)
  }
}
