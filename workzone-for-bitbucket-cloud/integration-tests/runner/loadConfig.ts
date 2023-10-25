import {optionalRequire} from "optional-require"
import deepmerge from "deepmerge"
import {ReadonlyDeep} from "type-fest"

import {configure, TestConfig} from "config"

export function loadConfig(): ReadonlyDeep<TestConfig> {
  const configLocal = optionalRequire("config.local")?.configure() ?? {}
  return deepmerge(configure(), configLocal)
}
