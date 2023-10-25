/// <reference types="../typings/global" />
import fs from "node:fs"
import {inspect} from "node:util"

import del from "del"
import playwright, {
  Browser,
  BrowserContext,
  BrowserContextOptions,
  ConsoleMessage,
  Page,
} from "playwright"
import {Test} from "mocha"
import assert from "power-assert"

import {newRunContext, RunContext} from "@/runner/RunContext"
import {DashboardOverviewPage} from "@/uiFixtures/DashboardOverviewPage"
import {loadConfig} from "@/runner/loadConfig"
import {uninstall} from "@/uiFixtures/uninstall"
import {login} from "@/uiFixtures/login"
import {TestConfig} from "@/config"

inspect.defaultOptions.depth = null

interface WritableGlobal {
  browser: Browser
  browserContext: BrowserContext
  defaultContextOptions: BrowserContextOptions
  page: Page

  assert: typeof assert

  config: TestConfig

  ctx: RunContext
  currentTest: Mocha.Test

  log: Console["debug"]
}

const failedScreenshotsPath = `./out/failed-screenshots/`

let pageErrors = new Array<string>()
let ignoredConsole = new Array<(message: ConsoleMessage) => boolean>()

const config = loadConfig()

console.log("Testing...")
console.log(` Descriptor: ${config.fixture.descriptor}`)
console.log(` Workspace: ${config.fixture.workspace}`)
console.log(` Username: ${config.fixture.username}`)

// eslint-disable-next-line import/no-unused-modules -- Mocha root plugin
export const mochaHooks = async (): Promise<Mocha.RootHookObject> => {
  const isHeadless = config.browser?.headless ?? true
  const g = global as WritableGlobal & typeof global
  g.config = config
  g.ctx = newRunContext(isHeadless)
  g.log = console.debug

  if (!(config.isVerbose ?? false) || isHeadless) {
    console.debug = () => {
      /* silent */
    }
  }

  console.debug("config", config)

  del.sync(failedScreenshotsPath, {force: true})
  fs.mkdirSync(failedScreenshotsPath, {recursive: true})

  return {
    async beforeAll() {
      g.assert = assert.strict
      const browserType = playwright[ctx.browserName]
      g.browser = await browserType.launch({
        ...config.browser,
        headless: isHeadless,
      })

      g.browserContext = await newAuthenticatedContext(
        browser,
        config.fixture.username,
        config.fixture.password
      )

      if (config.uninstall?.isBefore ?? true) {
        const uninstallPage = await g.browserContext.newPage()
        try {
          await uninstall(uninstallPage, config.fixture.workspace)
        } catch (error) {
          console.error(error)
        } finally {
          void uninstallPage.close()
        }
      }
    },
    async afterAll() {
      if (config.uninstall?.isAfter ?? true) {
        const uninstallPage = await g.browserContext.newPage()
        try {
          await uninstall(uninstallPage, config.fixture.workspace)
        } catch (error) {
          console.error(error)
        } finally {
          void uninstallPage.close()
        }
      }
      await browser.close()
    },
    async beforeEach(this: Mocha.Context) {
      g.page = await g.browserContext.newPage()
      watchConsoleForErrors(g.page)
      g.currentTest = this.currentTest as Test
    },

    async afterEach(this: Mocha.Context) {
      const currentTest = this.currentTest as Test
      if (currentTest.isFailed()) {
        // Take a screenshot
        const screenshot = await page.screenshot()
        const filename = currentTest.fullTitle()

        const filePath = `${failedScreenshotsPath}${filename}.png`
        fs.writeFileSync(`${filePath}`, screenshot, "base64")

        console.info(
          `Saved error screenshot '${filename}.png' to "file://${failedScreenshotsPath}"`
        )

        const actionFrame = page.frames()[1]

        console.error(
          "Bitbucket errors:",
          await actionFrame?.locator(".aui-message-error").allTextContents()
        )
      }

      // https://github.com/mochajs/mocha/wiki/HOW-TO:-Conditionally-fail-a-test-after-completion
      const test = this.test as Mocha.Runnable & {
        error: (description: string) => void
      }

      if (pageErrors.length > 0) {
        test.error(`Detected ${pageErrors.length} error(s) on page console.`)
        pageErrors = []
      }

      ignoredConsole = []

      await page.close()
    },
  }
}

function ignoreConsoleError(
  predicate: (message: ConsoleMessage) => boolean
): void {
  ignoredConsole.push(predicate)
}

function watchConsoleForErrors(page: Page): void {
  page.on("console", message => {
    // Uncaught exception will also generate error messages
    if (
      message.type() === "error" &&
      !ignoredConsole.some(predicate => predicate(message))
    ) {
      pageErrors.push(message.text())
      console.error("### Error detected on page ###")
      console.error(message.text())
      console.error(message.location().url)
    }
  })
}

async function newAuthenticatedContext(
  browser: Browser,
  username: string,
  password: string
): Promise<BrowserContext> {
  const storageStatePath = `.storage/${username}.local.json`
  let loginPage: Page | undefined
  let browserContext
  try {
    browserContext = await browser.newContext({
      storageState: storageStatePath,
    })

    loginPage = await browserContext.newPage()
    console.debug("Reusing login")

    await ensureLoggedIn(loginPage)
  } catch (error) {
    console.debug(`re-login`, error)
    browserContext = await browser.newContext()

    loginPage = await browserContext.newPage()
    await login(loginPage, username, password)

    await browserContext.storageState({
      path: storageStatePath,
    })

    console.debug(`Stored login at ${storageStatePath}`)
  } finally {
    void loginPage?.close()
  }

  return browserContext
}

async function ensureLoggedIn(page: Page): Promise<void> {
  const dashboardOverview = new DashboardOverviewPage(page)
  await dashboardOverview.goto()

  await page.waitForURL(_ => _.href.startsWith(dashboardOverview.url), {
    timeout: 15_000,
  })
}

ignoreConsoleError(
  message =>
    // Ignore messages that are not from the app
    !message.location().url.match("ngrok|workzone.net")
)
