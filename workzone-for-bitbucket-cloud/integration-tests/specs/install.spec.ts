import {AddonManagementPage} from "@/uiFixtures/AddonManagementPage"

describe("install", () => {
  it("install the addon", async () => {
    const addonManagement = new AddonManagementPage(
      page,
      config.fixture.workspace
    )
    await addonManagement.goto()

    await addonManagement.install(config.fixture.descriptor, true)
  })
})
