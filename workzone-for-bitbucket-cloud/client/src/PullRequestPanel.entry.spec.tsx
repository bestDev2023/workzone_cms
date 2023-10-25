import fetchMock from "fetch-mock"
import pDefer from "p-defer"
import userEvent from "@testing-library/user-event"
import assert from "power-assert"
import {queries} from "@testing-library/react"

import {render} from "./test/render"
import {PullRequestPanel} from "./PullRequestPanel.entry"

window.AP = {events: {} as any} as any

const mockEvent = function (data: {
  total: number
  passed: number
  results: Array<any>
}) {
  AP.events.once = (event, listener) => {
    setTimeout(() => listener([JSON.stringify(data)]))
  }
}

function renderView() {
  return render(
    <PullRequestPanel
      pullRequestState="OPEN"
      pullrequestId={0}
      repositoryPath=""
      workspacePath=""
    />,
    {
      queries: {
        findReloadButton: async container =>
          queries.findByRole<HTMLAnchorElement>(container, "link", {
            name: "Reload",
          }),
      },
    }
  )
}

function mockMergeApi() {
  const deferred = pDefer()
  fetchMock.post("glob:*/api/merge/*", deferred.promise)
  return deferred
}

describe("<PullRequestPanel>", () => {
  const reloadUrl = "http://reload-url/"

  before(() => {
    AP.getLocation = callback => callback(reloadUrl)
  })

  it("no check results", async () => {
    mockEvent({total: 0, passed: 0, results: []})
    const view = renderView()
    await view.findByText("Merge")
  })

  it("is pending", async () => {
    mockEvent({total: 1, passed: 0, results: []})
    const view = renderView()
    assert(view.container.childElementCount === 0)
  })

  it("merges async/polling", async () => {
    mockEvent({total: 0, passed: 0, results: []})
    const view = renderView()
    const deferred = mockMergeApi()

    await userEvent.click(await view.findByText("Merge"))

    await view.findByText("Merge in progress")

    const pollUrl = `https://poll-url/`
    fetchMock.get(pollUrl, {body: {task_status: "SUCCESS"}, status: 200})

    deferred.resolve({body: pollUrl, status: 200})

    const reloadButton = await view.findReloadButton()

    assert(reloadButton.href === reloadUrl)
  })

  it("merges sync/no polling", async () => {
    mockEvent({total: 2, passed: 2, results: []})
    const view = renderView()
    const deferred = mockMergeApi()

    await userEvent.click(await view.findByText("Merge"))

    await view.findByText("Merge in progress")

    deferred.resolve({body: "", status: 200})

    const reloadButton = await view.findReloadButton()

    assert(reloadButton.href === reloadUrl)
  })
})
