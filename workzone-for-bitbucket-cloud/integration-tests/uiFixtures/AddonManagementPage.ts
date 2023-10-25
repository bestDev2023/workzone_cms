import assert from "node:assert"

import {Page} from "playwright"

import {fail} from "@shared/fail"

import {PageFixture} from "./PageFixture"

export class AddonManagementPage extends PageFixture {
  constructor(page: Page, workspace: string) {
    super(
      page,
      `https://bitbucket.org/${workspace}/workspace/settings/addon-management`
    )
  }

  async install(
    descriptorUrl: string,
    shouldIgnoreAlreadyInstalled = false
  ): Promise<void> {
    await this.page.waitForSelector("#settings-frame")
    const settingsFrame =
      this.page.frame({
        name: "settings-frame",
      }) ?? fail("Unable to find frame ")

    const isWorkzoneVisible = await settingsFrame.isVisible("text=Workzone")

    if (isWorkzoneVisible) {
      if (shouldIgnoreAlreadyInstalled) {
        return
      }
      throw Error("Addon already installed")
    }

    await settingsFrame.locator("text=Enable development mode").setChecked(true)
    await settingsFrame.click("text=Install app from URL")
    await settingsFrame.click('[placeholder="https\\:\\/\\/"]')
    await settingsFrame.fill('[placeholder="https\\:\\/\\/"]', descriptorUrl)

    await settingsFrame.click(
      'section[role="dialog"] button:has-text("Install")'
    )
    await settingsFrame.click("text=Grant access")

    await settingsFrame.isVisible("text=Workzone")

    await settingsFrame.waitForSelector(".aui-message-success")
  }

  async uninstall(shouldIgnoreNotInstalled = false): Promise<void> {
    await this.page.waitForSelector("#settings-frame")
    const settingsFrame =
      this.page.frame({
        name: "settings-frame",
      }) ?? fail("Unable to find frame ")

    const isWorkzoneVisible = await settingsFrame.isVisible("text=Workzone")

    if (!isWorkzoneVisible) {
      if (shouldIgnoreNotInstalled) {
        return
      }
      throw Error("Add not installed")
    }

    await settingsFrame.click("text=Workzone")
    await settingsFrame.click(`button:has-text("Remove"):visible`)
    await settingsFrame.click(`#remove-addon >> button:has-text("Remove")`)

    const message = await settingsFrame
      .locator(".aui-message-success")
      .elementHandle()
    await message?.isVisible()
    await message?.waitForElementState("hidden")
    assert(
      !(await settingsFrame.isVisible("text=Workzone")),
      "Failed to uninstall addon"
    )
  }
}
