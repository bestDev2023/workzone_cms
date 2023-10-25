import {Page} from "playwright"

import {AddonManagementPage} from "@/uiFixtures/AddonManagementPage"

export async function uninstall(page: Page, workspace: string): Promise<void> {
  const addonManagement = new AddonManagementPage(page, workspace)
  await addonManagement.goto()
  await addonManagement.uninstall(true)
}
