import fetchMock from "fetch-mock"

import {render} from "./test/render"
import {PullRequestSettingsPage} from "@/PullRequestSettingsPage.entry"
import {newPullRequestSettingsEntry} from "../../sample/ReviewerSpec.sample"
import {AccountSettingsPage} from "@/AccountSettingsPage.entry"

function renderView() {
  return render(<AccountSettingsPage />)
}

describe("<AccountSettingsPage>", () => {
  before(() => {})

  it("no check results", async () => {
    const settings = [newPullRequestSettingsEntry()]
    fetchMock.get("glob:*/api/pull-request-settings/*", {body: settings})

    const view = renderView()
  })
})
