import is from "@sindresorhus/is"

type ErrorContext = {stack?: string} & Record<PropertyKey, unknown>

export function fail<T extends Error>(error: T): never
export function fail(message: string | Error, context?: ErrorContext): never
export function fail(value: string | Error, context?: ErrorContext): never {
  throw typeof value === "string" ? new Failure(value, context) : value
}
function formatContext(context: Record<string, unknown>) {
  const emptyObject = is.emptyObject(context)

  return emptyObject === true ? "" : `\n Context:\n${JSON.stringify(context)}`
}

class Failure extends Error {
  constructor(message: string, context?: ErrorContext) {
    super(message)

    Object.setPrototypeOf(this, Failure.prototype)

    if (context) {
      const {stack, ...rest} = context
      if (stack != null) {
        this.stack = stack
      }
      this.message += formatContext(rest)
    }
  }
}

export class AppError extends Error {}
export class SecurityError extends Error {}
