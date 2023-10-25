import dotenv from "dotenv"

import {f, logger} from "@/logger"

export function sourceEnvFile(): void {
  const envFile = ".env.local"
  const envVariables = dotenv.config({path: `../${envFile}`})
  if (envVariables.parsed == null) {
    throw Error(`Cannot find ${envFile} at project root - see README.md`)
  } else {
    logger.info(f`Environment variables from ${envFile}:
                ${envVariables.parsed}`)
  }
}
