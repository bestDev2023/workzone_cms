import {map} from "@/utils/promise"

describe("promise", () => {
  it("maps a value", async () => {
    const promise = Promise.resolve(2)
    const resultPromise = map(promise, _ => _ + 2)
    const result = await resultPromise

    assert(result === 4)
  })

  it("maps a rejected value", async () => {
    const promise: Promise<number> = Promise.reject(
      new Error("something went wrong")
    )
    const resultPromise = map(promise, _ => _ + 1)
    try {
      await resultPromise
    } catch {
      return
    }
    // assert.throws doesn't work on async
    assert.fail("Should throw exception")
  })
})
