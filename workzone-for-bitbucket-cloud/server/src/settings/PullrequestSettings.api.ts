import {Body, Controller, Delete, Get, Path, Put, Route} from "@tsoa/runtime"

import {PullRequestSettingsEntry} from "@shared/models"

import {createOrUpdate, list, remove, save} from "./PullRequestSettings"

@Route("pull-request-settings")
export class PullRequestSettingsApi extends Controller {
  @Get("{workspace}")
  async list(
    @Path() workspace: string
  ): Promise<Array<PullRequestSettingsEntry>> {
    return list(workspace, "owner")
  }

  @Put("{workspace}")
  async save(
    @Path() workspace: string,
    @Body() pullRequestSettings: Array<PullRequestSettingsEntry>
  ): Promise<void> {
    await save(workspace, pullRequestSettings)
    this.setStatus(204)
  }

  @Put("{workspace}/{id}")
  async createOrUpdate(
    @Path() workspace: string,
    @Path() id: string,
    @Body() pullRequestSetting: PullRequestSettingsEntry
  ): Promise<void> {
    const result = await createOrUpdate(workspace, pullRequestSetting)
    this.setStatus(result === "CREATED" ? 204 : 200)
  }

  @Delete("{workspace}/{id}")
  async remove(@Path() workspace: string, @Path() id: string): Promise<void> {
    this.setStatus(200)
    const hasRemoved = await remove(workspace, id)
    this.setStatus(hasRemoved ? 200 : 404)
  }
}
