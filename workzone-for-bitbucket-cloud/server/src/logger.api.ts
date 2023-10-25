import {Body, Controller, Get, Post, Route} from "@tsoa/runtime"

import {getLevels, LogLevelSettings, setLevels} from "@/logger"

@Route("admin/logger")
export class LoggerApi extends Controller {
  @Post("levels")
  setLevels(@Body() settings: LogLevelSettings): void {
    setLevels(settings)
  }

  @Get("levels")
  getLevels(): LogLevelSettings {
    return getLevels()
  }
}
