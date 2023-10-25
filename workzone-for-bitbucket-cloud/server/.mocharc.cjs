const isCI = process.env["CI"] != null
const options = isCI ? {
  reporter: ["mocha-junit-reporter"],
  reporterOptions: ["mochaFile=./out/test-results/mocha.xml"],
} : {}
module.exports = {
  ...options,
  require: ["./setup-unit.cjs", "./src/test/hooks.ts"]
}
