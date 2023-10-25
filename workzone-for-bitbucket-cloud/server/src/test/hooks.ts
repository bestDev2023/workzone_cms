import {inspect} from "node:util"

import * as td from "testdouble"
import {RootHookObject} from "mocha"
// This syntax is necessary to avoid the problem where TS transpiles the code to
// `power_assert_1.default`, make it globally for convenience
// eslint-disable-next-line @typescript-eslint/no-require-imports -- see above
import assert = require("power-assert")

const g = <{assert: typeof assert}>(<unknown>global)
g.assert = assert

// setupFetch()

inspect.defaultOptions.depth = null
inspect.defaultOptions.colors = true

export const mochaHooks: RootHookObject = {
  beforeAll() {
    // rewiremock.enable()
  },
  beforeEach() {
    // rewiremock.enable()
  },
  afterEach() {
    td.reset()
    // rewiremock.disable()
  },
  afterAll() {
    // rewiremock.disable()
  },
}
