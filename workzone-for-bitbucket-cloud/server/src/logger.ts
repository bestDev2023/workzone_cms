import util from "node:util"

import {optionalRequire} from "optional-require"
import pino, {LoggerOptions} from "pino"
import {compact, mapToObj} from "remeda"
import pino_http from "pino-http"
import {Entries} from "type-fest"
import is from "@sindresorhus/is"

import {isDevelopment, isDevelopmentTest} from "@/env"
import {LoggerHooks} from "@/loggerHooks"

// pino-caller doesn't filter intermediate functions
const callerMixin = () => {
  const relativeTo = __dirname
  const LINE_OFFSET = 7
  const STACKTRACE_OFFSET = 0

  const stackHolder = {stack: ""}
  Error.captureStackTrace(stackHolder)

  const caller = stackHolder.stack
    .split("\n")
    .slice(5)
    .filter(
      s =>
        !s.includes("node_modules/pino") &&
        !s.includes("node_modules\\pino") &&
        !s.includes("Pino.logMethod")
    )
    [STACKTRACE_OFFSET]?.slice(LINE_OFFSET)

  // TODO Some stacks don't have parentheses e.g. authentication.ts so
  // it's not picking it
  const sourceCaller = caller?.split(" ")[1]?.replace(/[()]/g, "")
  const noColumn = sourceCaller?.slice(
    0,
    Math.max(0, sourceCaller.lastIndexOf(":"))
  )
  const relativeToNodeModules = relativeTo.replace("src", "node_modules")
  const relativeCaller = noColumn
    ?.replace(`${relativeTo}/`, "")
    .replace(`${relativeToNodeModules}/`, "")

  return {
    caller: relativeCaller,
    // source: `file://${sourceCaller}`,
  }
}

const localHooks = optionalRequire("logger.local") as
  | {
      loggerHooks?: LoggerHooks
    }
  | undefined

const devConfig: LoggerOptions = {
  mixin: callerMixin,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      levelFirst: true,
      ignore: "pid,hostname,time",
    },
  },
}

localHooks?.loggerHooks?.configure?.(devConfig)

const [pinoLogger, formatTemplate] =
  isDevelopment || isDevelopmentTest
    ? [pino(devConfig), interpolatePretty]
    : [pino(), interpolateRaw]

interface TemplateMessage {
  template: ReadonlyArray<string>
  substitutions: Array<unknown>
}

export function f(
  template: TemplateStringsArray,
  ...substitutions: Array<unknown>
): TemplateMessage {
  return {template, substitutions}
}

type Level = "error" | "warn" | "info" | "debug" | "trace"
type Destination = 1 | 2 // stdout | stderr

type LogFunction = ((message: TemplateMessage) => void) &
  ((message: TemplateMessage, error?: Error) => void) &
  ((error: Error) => void) &
  ((object: Record<PropertyKey, unknown>, message: TemplateMessage) => void)

function isTemplateMessage(object?: unknown): object is TemplateMessage {
  // TODO should be Object.hasOwn but typings are not updated yet and can't
  // get augmentation to work
  // https://github.com/microsoft/TypeScript/issues/44253
  return object != null && Object.keys(object as object).includes("template")
}

function wrapLogger(wrappedLogger: pino.Logger): Logger {
  function logWith(level: Level): LogFunction {
    return <LogFunction>function log(...args): void {
      if (!wrappedLogger.isLevelEnabled(level)) {
        return
      }

      const [arg0, arg1, ...rest] = args
      const [templateMessage, error, consoleMessage = null] = isTemplateMessage(
        arg0
      )
        ? [arg0, arg1]
        : isTemplateMessage(arg1)
        ? [arg1, arg0]
        : is.string(arg0)
        ? is.error(arg1)
          ? [null, arg1, arg0]
          : [null, null, arg0]
        : [null, arg0]

      const pinoArgs = []
      if (error != null) {
        pinoArgs.push(error)
      }

      if (isDevelopmentTest && !!arg0) {
        console.log(
          `${level.toUpperCase()}: ${formatConsoleTemplate(
            arg0 as TemplateMessage
          )}`
        )
        return // if we don't return here pino will log everything after all tests are run
      }
      // Support for raw string/Console interface
      if (consoleMessage != null) {
        const substitutions = compact([arg1, ...rest])
        const template = [
          `${consoleMessage} `,
          ...Array.from<string>({length: substitutions.length}).fill(" "),
        ]

        const {message: formatMessage, values} = formatTemplate({
          template,
          substitutions,
        })
        pinoArgs.push(formatMessage, ...values)
      }

      if (templateMessage) {
        const {message, values} = formatTemplate(templateMessage)
        pinoArgs.push(message, ...values)
      }

      ;(<(..._: Array<unknown>) => void>wrappedLogger[level])(...pinoArgs)
    }
  }

  return {
    isLevelEnabled(level: Level): boolean {
      return wrappedLogger.isLevelEnabled(level)
    },

    get level(): Level {
      return <Level>wrappedLogger.level
    },

    set level(level: Level) {
      wrappedLogger.level = level
    },

    destination(d: Destination): void {
      pino.destination(d)
    },

    error: logWith("error"),
    warn: logWith("warn"),
    info: logWith("info"),
    debug: logWith("debug"),
    trace: logWith("trace"),
  }
}

function formatConsoleTemplate(templateMessage: TemplateMessage) {
  const values = templateMessage.substitutions
  const [first, ...messageStrings] = [...templateMessage.template]
  let result = [first]
  messageStrings.forEach(function (msg, i) {
    let value = values[i]
    result.push(JSON.stringify(value) + msg)
  })
  return result.join("")
}

function interpolatePretty(templateMessage: TemplateMessage): {
  message: string
  values: Array<unknown>
} {
  const message = templateMessage.template.join("%s")
  const formattedValues = templateMessage.substitutions.map(_ =>
    util.inspect(_, {colors: true})
  )
  const noIndent = message.replace(/^[^\S\n]+/gm, "")
  return {message: noIndent, values: formattedValues}
}

function interpolateRaw(templateMessage: TemplateMessage): {
  message: string
  values: Array<unknown>
} {
  const message = templateMessage.template
    .flatMap((templatePart, index) => {
      const value = templateMessage.substitutions[index]
      const interpolator = value == null ? "" : is.string(value) ? "%s" : "%o"

      return [templatePart, interpolator]
    })
    .join("")

  const formattedValues = templateMessage.substitutions

  return {
    message,
    values: formattedValues,
  }
}

interface Logger {
  // Expose only required logging methods based on template literals and
  // abstracts away logger implementation

  warn: LogFunction
  info: LogFunction
  debug: LogFunction
  trace: LogFunction
  error: LogFunction

  level: Level

  isLevelEnabled: (level: Level) => boolean
  destination: (d: Destination) => void
}

const httpServerPinoLogger = pinoLogger.child({name: "http-server"})

export const pinoHttp = pino_http({
  logger: httpServerPinoLogger,
  useLevel: "debug",
  autoLogging: {
    ignorePaths: ["/health-check"],
  },
})

export type Loggers = typeof loggers

export const loggers = {
  logger: wrapLogger(pinoLogger),
  ace: wrapLogger(pinoLogger.child({name: "ace"})),
  authentication: wrapLogger(pinoLogger.child({name: "authentication"})),
  webhook: wrapLogger(pinoLogger.child({name: "webhook"})),
  httpClient: wrapLogger(pinoLogger.child({name: "http-client"})),
  httpServer: wrapLogger(httpServerPinoLogger),
} as const

export const aceLoggerConsole = loggers.ace as unknown as Console

localHooks?.loggerHooks?.afterCreate?.(loggers)

export const {logger} = loggers

export type LogLevelSettings = Record<keyof Loggers, Level>

export function setLevels(config: LogLevelSettings): void {
  for (const [loggerName, level] of <Entries<LogLevelSettings>>(
    Object.entries(config)
  )) {
    loggers[loggerName].level = level
    loggers[loggerName][level](f`${loggerName} enabled level ${level}`)
  }
}

export function getLevels(): LogLevelSettings {
  const entries = <Entries<Loggers>>Object.entries(loggers)
  return mapToObj(entries, ([loggerName, entryLogger]) => [
    loggerName,
    entryLogger.level,
  ])
}
