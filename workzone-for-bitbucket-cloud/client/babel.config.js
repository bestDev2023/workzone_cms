module.exports = (/** @type {{ cache: (arg0: boolean) => void; }} */ api) => {
  // Cache configuration is a required option/based on Mocha's examples
  // @ts-ignore
  console.log("API", api)
  api.cache(false)
  const config = {}

  config.plugins = ["mockable-imports"]
  /*
  config.overrides = [
    {
      test: ["*"],
      //xtest: ["**!/!*.spec.ts", "**!/!*.spec.tsx"],
      plugins: [
        [
          "babel-plugin-espower",
          {
            embedAst: true,
            xpatterns: [
              "(0, power_assert_1.default)(value, [message])",
              "power_assert_1.default(value, [message])",
              "power_assert_1.default.ok(value, [message])",
              "power_assert_1.default.equal(actual, expected, [message])",
              "power_assert_1.default.notEqual(actual, expected, [message])",
              "power_assert_1.default.strictEqual(actual, expected, [message])",
              "power_assert_1.default.notStrictEqual(actual, expected, [message])",
              "power_assert_1.default.deepEqual(actual, expected, [message])",
              "power_assert_1.default.notDeepEqual(actual, expected, [message])",
              "power_assert_1.default.deepStrictEqual(actual, expected, [message])",
              "power_assert_1.default.notDeepStrictEqual(actual, expected, [message])",
            ],
          },
        ],
      ],
    },
  ]
*/

  return config
}
