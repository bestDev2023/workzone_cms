"use strict"
const tsConfig = require("@istanbuljs/nyc-config-typescript")
const defaultExclude = require("@istanbuljs/schema/default-exclude")
const exclude = ["**/out/**"].concat(defaultExclude, [
  "src/main.ts",
  "src/db/**",
])
module.exports = {
  ...tsConfig,
  exclude,
  all: true,
  checkCoverage: true,
  reporter: ["lcov", "text-summary"],
  reportDir: "out/coverage",
  tempDir: "out/coverage",
  statements: 10,
  lines: 10,
}
