const {resolve} = require("node:path")
const project = resolve(__dirname, "tsconfig.json")

module.exports = {
  extends: ["../.eslintrc.js"],
  parserOptions: {
    sourceType: "module",
    project,
  },
  settings: {
    "react": {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  rules: {
    "no-console": "off",
    // Only applicable to ESM
    "import/default": "off",
  },
  overrides: [
    {
      // Node
      files: ["spec/**"],
      rules: {
        // Use log
        "no-console": "error",
      },
    },
  ],
}
