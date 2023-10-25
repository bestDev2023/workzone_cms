import {newMergeRestrictions} from "@sample/ReviewerSpec.sample"

import {isPassingStandardChecks} from "./isPassingStandardChecks"

describe("isPassingStandardChecks", function () {
  it("passes for when all are passing", async () => {
    const mergeRestriction = newMergeRestrictions(true)()
    assert(isPassingStandardChecks(mergeRestriction))
  })

  it("fails when all checks are failing", async () => {
    const mergeRestriction = newMergeRestrictions(false)()
    assert(!isPassingStandardChecks(mergeRestriction))
  })

  it("fails if any check is failing", async () => {
    const mergeRestriction = newMergeRestrictions(true)()
    mergeRestriction.restrictions.maximum_commits_behind.pass = false
    assert(!isPassingStandardChecks(mergeRestriction))
  })
})
