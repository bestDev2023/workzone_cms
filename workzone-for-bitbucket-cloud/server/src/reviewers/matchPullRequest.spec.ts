import {
  newPullrequest,
  newPullRequestSettingsEntry,
} from "@sample/ReviewerSpec.sample"

import {matchPullRequest} from "./matchPullRequest"

describe("matchPullRequest", () => {
  it("matches nested paths using single star", async () => {
    const prSettings = newPullRequestSettingsEntry({destination: "**"})
    const pr = newPullrequest({
      destination: {branch: {name: "feature/new-shiny-1"}},
    })

    assert(matchPullRequest(pr, prSettings))
  })

  it("treats blank as single star", async () => {
    const prSettings = newPullRequestSettingsEntry({destination: ""})
    const pr = newPullrequest({
      destination: {branch: {name: "feature/new-shiny-1"}},
    })

    assert(matchPullRequest(pr, prSettings))
  })

  it("matches not specified source/destination", async () => {
    const pr = newPullrequest()
    const prSettings = newPullRequestSettingsEntry()

    assert(matchPullRequest(pr, prSettings))
  })

  it("matches source/not specified destination", async () => {
    const pr = newPullrequest({destination: {branch: {name: "development"}}})
    const prSettings = newPullRequestSettingsEntry({destination: "dev*"})

    assert(matchPullRequest(pr, prSettings))
  })

  it("matches source/destination", async () => {
    const pr = newPullrequest({
      source: {branch: {name: "my_feature"}},
      destination: {branch: {name: "development"}},
    })
    const prSettings = newPullRequestSettingsEntry({
      source: "*feature*",
      destination: "dev*",
    })

    assert(matchPullRequest(pr, prSettings))
  })

  it("does not matches source/destination", async () => {
    const pr = newPullrequest({
      source: {branch: {name: "my_feature"}},
      destination: {branch: {name: "development"}},
    })
    const prSettings = newPullRequestSettingsEntry({
      source: "production",
      destination: "master",
    })

    assert(!matchPullRequest(pr, prSettings))
  })

  it("matches source but not destination", async () => {
    const pr = newPullrequest({
      source: {branch: {name: "my_feature"}},
      destination: {branch: {name: "development"}},
    })
    const prSettings = newPullRequestSettingsEntry({
      source: "*feature*",
      destination: "production",
    })

    assert(!matchPullRequest(pr, prSettings))
  })

  it("matches destination but not source", async () => {
    const pr = newPullrequest({
      source: {branch: {name: "my_feature"}},
      destination: {branch: {name: "development"}},
    })
    const prSettings = newPullRequestSettingsEntry({
      source: "production",
      destination: "development",
    })

    assert(!matchPullRequest(pr, prSettings))
  })
})
