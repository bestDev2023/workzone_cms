import {LoggerHooks} from "./loggerHooks"

const loggerHooks: LoggerHooks = {
  configure: loggerOptions => {
    // loggerOptions.level = "debug"
  },
  afterCreate: loggers => {
    // pino logs to >stdout
    // loggers.logger.destination(1)
  },
}
export {loggerHooks}
