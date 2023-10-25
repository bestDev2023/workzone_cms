import {Browser, Page} from "playwright"

import {RunContext} from "@/runner/RunContext"
import {TestConfig} from "@/runner/loadConfig"

declare global {
  const browser: Browser
  const page: Page

  const config: TestConfig
  const ctx: RunContext
}

export {}
