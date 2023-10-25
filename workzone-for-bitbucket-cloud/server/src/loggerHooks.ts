import pino from "pino"

import type {Loggers} from "@/logger"

export interface LoggerHooks {
  configure?: (loggerOptions: pino.LoggerOptions) => void
  afterCreate?: (_: Loggers) => void
}
