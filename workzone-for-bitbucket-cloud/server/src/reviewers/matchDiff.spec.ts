import {matchDiff} from "@/reviewers/matchDiff"
import {PartialDiffStat} from "@shared/models"

function newDiffStats(): Array<PartialDiffStat> {
  return [
    {new: {path: ".idea/.gitignore"}},
    {new: {path: ".idea/codeStyles/Project.xml"}},
    {new: {path: ".idea/codeStyles/codeStyleConfig.xml"}},
    {new: {path: ".idea/dictionaries"}},
    {new: {path: ".idea/inspectionProfiles/Project_Default.xml"}},
    {new: {path: ".idea/misc.xml"}},
    {new: {path: ".idea/modules.xml"}},
    {new: {path: ".idea/myrepotest.iml"}},
    {new: {path: ".idea/sbt.xml"}},
    {new: {path: ".idea/vcs.xml"}},
    // Modified files have same path
    {new: {path: "myFile.txt"}, old: {path: "myFile.txt"}},
    // FIXME check it this is how renamed files are represented
    {new: {path: "anotherFile.txt"}, old: {path: "myFolder/anotherFile.md"}},
  ]
}

describe("matchDiff", () => {
  it("doesn't match", async () => {
    assert(!matchDiff("*.java|*.go", newDiffStats()))
  })

  it("doesn't match a directory", async () => {
    assert(!matchDiff("backend", newDiffStats()))
  })

  it("matches a directory", async () => {
    assert(matchDiff(".idea/*", newDiffStats()))
  })

  it("matches just one file", async () => {
    assert(matchDiff(".idea/dictionaries", newDiffStats()))
  })

  it("matches more than one file", async () => {
    assert(matchDiff("*.xml", newDiffStats()))
  })

  it("matches dot files directories", async () => {
    assert(
      matchDiff("*.xml", [
        {new: {path: ".idea/misc.xml"}},
        {new: {path: ".idea/modules.xml"}},
      ])
    )
  })

  it("matches files that have been renamed", async () => {
    assert(matchDiff("*.md", newDiffStats()))
  })

  it("fails when pattern is empty", async () => {
    assert.throws(() => matchDiff("", newDiffStats()))
  })
})
