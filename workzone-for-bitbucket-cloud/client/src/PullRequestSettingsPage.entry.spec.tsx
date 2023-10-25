import fetchMock from "fetch-mock"

import {render} from "./test/render"
import {PullRequestSettingsPage} from "@/PullRequestSettingsPage.entry"
import {
  newPullRequestSettingsEntry,
  newReviewGroup,
  newReviewSpec,
} from "../../sample/ReviewerSpec.sample"

function renderView() {
  return render(<PullRequestSettingsPage />)
}

describe("<PullRequestSettingsPage>", () => {
  it("no check results", async () => {
    const settings = [
      newPullRequestSettingsEntry({autoMerge: true, deleteSourceBranch: true}),
    ]
    fetchMock.get("glob:*/api/pull-request-settings/*", {body: settings})

    const view = renderView()
  })

  it("render summary settings", async () => {
    const settings = [
      newPullRequestSettingsEntry({
        autoMerge: true,
        deleteSourceBranch: true,
        standard: {
          settings: {shouldResetApprovals: true, shouldResetChanges: true},
          checks: {
            noChangesRequested: true,
            noUnresolvedTasks: true,
            successfulBuilds: 1,
          },
        },
      }),
    ]
    fetchMock.get("glob:*/api/pull-request-settings/*", {body: settings})

    const view = renderView()
  })

  it("render summary reviewer groups", async () => {
    const settings = [
      newPullRequestSettingsEntry({
        autoMerge: true,
        deleteSourceBranch: false,
        reviewSpec: newReviewSpec({
          reviewGroups: [newReviewGroup(), newReviewGroup()],
        }),
      }),
    ]

    fetchMock.get("glob:*/api/pull-request-settings/*", {body: settings})

    const view = renderView()
  })
})
