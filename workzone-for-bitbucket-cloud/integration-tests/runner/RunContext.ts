type BrowserName = "chromium" | "firefox" | "webkit"
export interface RunContext {
  readonly isHeadless: boolean

  browserName: BrowserName

  pathPrefix?: string
}

export function newRunContext(isHeadless: boolean): RunContext {
  return {
    isHeadless,
    browserName:
      (process.env["BROWSER_NAME"] as BrowserName | null) ?? "chromium",
  }
}
