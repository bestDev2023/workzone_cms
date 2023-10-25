import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Res,
  Route,
  TsoaResponse,
} from "@tsoa/runtime"

import {Credential} from "@shared/models"

import {deleteSurrogate, getSurrogateUsername, setSurrogate} from "./surrogate"

@Route("surrogate")
export class SurrogateApi extends Controller {
  @Get("{workspace}")
  async getSurrogate(
    @Path() workspace: string,
    @Res() notFoundResponse: TsoaResponse<404, null>
  ): Promise<string> {
    // Do not expose password
    const username = await getSurrogateUsername(workspace)
    return username == null ? notFoundResponse(404, null) : username
  }

  @Post("{workspace}")
  async setSurrogate(
    @Path() workspace: string,
    @Body() credential: Credential
  ): Promise<void> {
    await setSurrogate(workspace, credential)
    this.setStatus(204)
  }

  @Delete("{workspace}")
  async deleteSurrogate(@Path() workspace: string): Promise<void> {
    await deleteSurrogate(workspace)
  }
}
