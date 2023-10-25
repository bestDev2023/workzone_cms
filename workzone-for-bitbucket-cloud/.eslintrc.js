const {resolve} = require("node:path")

const rulesDirPlugin = require("eslint-plugin-rulesdir")
rulesDirPlugin.RULES_DIR = resolve(__dirname, "eslint") // (an example folder where your rules might be stored)

const baseRestrictedImports = [
  {
    group: ["../*"],
    message: "Prefer absolute imports using @/.",
  },
]

const namingConventions = [
  {
    selector: "default",
    format: ["camelCase"],
  },
  {
    selector: "variable",
    format: ["camelCase"],
  },
  {
    selector: "variable",
    modifiers: ["const"],
    format: ["camelCase", "UPPER_CASE"],
  },
  {
    selector: "parameter",
    format: ["camelCase"],
    leadingUnderscore: "allow",
  },
  {
    selector: "enumMember",
    format: ["PascalCase"],
  },
  {
    selector: "typeLike",
    format: ["PascalCase"],
  },
  {
    selector: "property",
    format: ["strictCamelCase", "PascalCase"],
    leadingUnderscore: "allow",
    filter: {
      regex: "[-]",
      match: false,
    },
  },
  {
    selector: "property",
    modifiers: ["static", "readonly"],
    format: ["UPPER_CASE"],
    // Add filter to force it to be specific
    filter: {
      regex: "[_]",
      match: true,
    },
  },
]
const project = ["./server/tsconfig.json", "./client/tsconfig.json"]

module.exports = {
  parser: "@typescript-eslint/parser",

  parserOptions: {
    sourceType: "module",
    project,
  },
  reportUnusedDisableDirectives: true,
  plugins: [
    "import",
    "unicorn",
    "promise",
    "react",
    "react-hooks",
    "testing-library",
    "@emotion",
    "eslint-comments",
    "deprecation",
    "rulesdir",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/all",
    "plugin:react-hooks/recommended",
    "plugin:unicorn/all",
    "plugin:promise/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:import/react",
    "prettier",
  ],
  settings: {
    "react": {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project,
      },
    },
    "import/internal-regex": "^@(shared|sample)|bitbucket-api",
  },

  rules: {
    "indent": "off",
    "complexity": ["error", {max: 11}],
    "no-undef": "off",
    // use logger
    "no-console": "error",
    "no-negated-condition": "error",
    "object-shorthand": ["error", "always"],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          ...baseRestrictedImports,
          {
            group: ["@sample/*"],
            message: "Do not use samples in production code",
          },
        ],
      },
    ],
    // Only enforce comments since Prettier won't format them
    "max-len": [
      "error",
      {
        comments: 80,
        code: 120,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        // Allow eslint description
        ignorePattern: "[//|/*] eslint.*",
      },
    ],
    "eqeqeq": ["error", "smart"],
    "dot-notation": "off",
    "grouped-accessor-pairs": ["error", "getBeforeSet"],
    "no-alert": ["error"],
    "no-constructor-return": ["error"],
    "no-empty-function": ["off"],
    "no-floating-decimal": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
    "no-unneeded-ternary": "error",
    "no-warning-comments": ["error", {terms: ["fixme"]}],
    "one-var-declaration-per-line": ["error", "always"],
    "prefer-exponentiation-operator": ["error"],
    "prefer-arrow-callback": ["error"],
    "prefer-rest-params": ["error"],
    "prefer-template": ["error"],
    "prefer-spread": ["error"],
    "prefer-destructuring": [
      "error",
      {
        object: true,
        array: false,
      },
    ],
    "spaced-comment": ["error", "always", {markers: ["/"]}],
    "no-useless-concat": "error",
    "no-sequences": "error",
    "no-invalid-regexp": "error",
    "arrow-body-style": ["error", "as-needed"],
    "prefer-object-spread": "error",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: ["multiline-block-like", "multiline-expression"],
        next: ["if", "return"],
      },
    ],
    // Typescript/vite handles it
    "import/no-unresolved": "off",
    "import/no-named-as-default-member": "off",
    // tsconfig paths don't work, using no-restricted-imports instead
    // https://github.com/import-js/eslint-plugin-import/issues/1392
    "import/no-relative-parent-imports": "off",
    "import/newline-after-import": ["error", {count: 1}],
    "import/no-unused-modules": [1, {unusedExports: true}],
    "import/no-default-export": "error",
    "import/no-duplicates": ["error", {considerQueryString: true}],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "unknown",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        "pathGroups": [
          {
            pattern: "@test/unit/rewiremock",
            group: "builtin",
          },
          {
            pattern: "@/** ",
            group: "internal",
          },
          {
            pattern: "@test/** ",
            group: "index",
          },
        ],
        "pathGroupsExcludedImportTypes": [],
      },
    ],
    "import/no-cycle": "error",
    "import/no-internal-modules": [
      "error",
      {
        allow: [
          "@/**",
          "@atlaskit/**",
          "aui-react/**",
          "rewiremock/**",
          "@atlassian/aui/**",
          "atlassian-connect-express/lib/middleware/authentication",
        ],
      },
    ],
    "no-shadow": [
      "error",
      {builtinGlobals: false, hoist: "functions", allow: []},
    ],
    "unicorn/better-regex": "error",
    "unicorn/catch-error-name": [
      "error",
      {
        // Promises default name
        ignore: ["reason"],
      },
    ],
    // Typescript will fail if type changes
    "unicorn/no-array-callback-reference": "off",
    "unicorn/consistent-function-scoping": "error",
    "unicorn/custom-error-definition": "off",
    "unicorn/error-message": "error",
    "unicorn/escape-case": "error",
    "unicorn/expiring-todo-comments": "error",
    "unicorn/explicit-length-check": "error",
    "unicorn/filename-case": "off",
    "unicorn/import-index": "error",
    "unicorn/new-for-builtins": "off",
    "unicorn/no-abusive-eslint-disable": "error",
    "unicorn/no-array-instanceof": "error",
    "unicorn/no-console-spaces": "error",
    // Prevented by types
    "unicorn/no-fn-reference-in-iterator": "off",
    "unicorn/no-for-loop": "error",
    "unicorn/no-hex-escape": "error",
    "unicorn/no-keyword-prefix": "off",
    // Accepted
    "unicorn/no-nested-ternary": "off",
    "unicorn/no-new-buffer": "error",
    "unicorn/no-null": "off",
    "unicorn/no-process-exit": "error",
    "unicorn/no-unreadable-array-destructuring": "error",
    "unicorn/no-unsafe-regex": "off",
    "unicorn/no-unused-properties": "off",
    "unicorn/no-useless-undefined": "error",
    "unicorn/no-zero-fractions": "error",
    "unicorn/number-literal-case": "error",
    "unicorn/prefer-add-event-listener": "error",
    "unicorn/prefer-dataset": "error",
    "unicorn/prefer-event-key": "error",
    "unicorn/prefer-flat-map": "error",
    "unicorn/prefer-includes": "error",
    "unicorn/prefer-modern-dom-apis": "error",
    "unicorn/prefer-negative-index": "error",
    "unicorn/prefer-node-append": "error",
    "unicorn/prefer-node-remove": "error",
    "unicorn/prefer-number-properties": "error",
    "unicorn/prefer-optional-catch-binding": "off",
    "unicorn/prefer-query-selector": "error",
    "unicorn/prefer-reflect-apply": "error",
    // TODO enable polyfill?
    "unicorn/prefer-replace-all": "off",
    "unicorn/prefer-set-has": "error",
    "unicorn/prefer-spread": "error",
    "unicorn/prefer-starts-ends-with": "error",
    "unicorn/prefer-string-slice": "error",
    "unicorn/prefer-text-content": "error",
    "unicorn/prefer-trim-start-end": "error",
    "unicorn/prefer-type-error": "error",
    "unicorn/no-await-expression-member": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        allowList: {
          arg: true,
          args: true,
          Args: true,
          acc: true,
          ctx: true,
          dev: true,
          Dir: true,
          docs: true,
          Docs: true,
          El: true,
          el: true,
          env: true,
          Env: true,
          err: true,
          params: true,
          Param: true,
          prevState: true,
          prod: true,
          Props: true,
          props: true,
          ref: true,
          Ref: true,
          req: true,
          res: true,
          tmp: true,
          str: true,
          Str: true,
        },
      },
    ],
    "unicorn/string-content": "off",
    "unicorn/throw-new-error": "off",
    "eslint-comments/require-description": [
      "error",
      {ignore: ["eslint-enable"]},
    ],
    "eslint-comments/disable-enable-pair": "error",
    "deprecation/deprecation": "error",
    "promise/always-return": "off",
    // Does not support get - patched in rulesdir
    // TODO Fix upstream
    "promise/prefer-await-to-then": "off",
    "rulesdir/prefer-await-to-then": "error",
    "promise/prefer-await-to-callbacks": "error",
    "promise/no-return-wrap": "error",
    "promise/param-names": "error",
    "promise/catch-or-return": "error",
    "promise/no-nesting": "error",
    "promise/no-promise-in-callback": "error",
    "promise/no-callback-in-promise": "error",
    "promise/avoid-new": "off",
    "promise/no-new-statics": "error",
    "promise/no-return-in-finally": "error",
    "promise/valid-params": "error",
    "@typescript-eslint/dot-notation": [
      "error",
      {allowIndexSignaturePropertyAccess: true},
    ],
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-base-to-string": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/naming-convention": ["error", ...namingConventions],
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "no-public",
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/no-untyped-public-signature": "off",
    "@typescript-eslint/lines-between-class-members": [
      "error",
      "always",
      {exceptAfterSingleLine: true, exceptAfterOverload: true},
    ],
    "@typescript-eslint/no-empty-function": ["error"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/array-type": ["error", {default: "generic"}],
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "never",
      },
    ],
    "@typescript-eslint/no-floating-promises": ["error", {ignoreIIFE: true}],
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/no-unused-vars": ["error", {ignoreRestSiblings: true}],
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    "@typescript-eslint/no-throw-literal": "error",
    "@typescript-eslint/no-unnecessary-qualifier": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {allowNumber: true, allowBoolean: true, allowNullish: true},
    ],
    "@typescript-eslint/return-await": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/unified-signatures": "off",
    // Using react/emotion factory
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, {extensions: [".tsx"]}],
    "react/jsx-max-depth": ["error", {max: 4}],
    "react/jsx-no-literals": "off",
    "react-hooks/exhaustive-deps": "error",
    "react/forbid-dom-props": [
      "error",
      {forbid: [{propName: "style", message: "Use 'css' prop instead"}]},
    ],
    "react/no-set-state": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-multi-comp": ["error", {ignoreStateless: true}],
    "react/jsx-no-bind": ["error", {allowArrowFunctions: true}],
    "react/jsx-sort-props": [
      "error",
      {callbacksLast: true, reservedFirst: true, shorthandFirst: true},
    ],
    "react/require-default-props": "off",
    "react/sort-comp": [
      "error",
      {
        order: [
          "static-variables",
          "static-methods",
          "lifecycle",
          "/^handle.+$/",
          "render",
          "everything-else",
        ],
      },
    ],
    "react/no-unused-prop-types": "off",
    "react/no-did-mount-set-state": "off",
  },
  overrides: [
    {
      // Node
      files: ["main.ts"],
      rules: {
        // Only available on ES modules and it's currently emitting cjs
        "unicorn/prefer-top-level-await": "off",
      },
    },
    {
      // Node
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-var-requires": "off",
        // Type info will be enforced when converting to ts
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
    {
      files: ["server/**"],
      rules: {
        // Only applicable for ESM output
        "unicorn/prefer-module": "off",
        "import/no-extraneous-dependencies": [
          "error",
          {packageDir: ["./", "./server/"]},
        ],
      },
    },
    {
      files: ["server/**/*.api.ts"],
      rules: {
        // Used by tsoa
        "import/no-unused-modules": "off",
      },
    },
    {
      files: ["client/**"],
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          {packageDir: ["./", "./client/"]},
        ],
      },
    },
    {
      // React
      files: ["*.tsx"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/naming-convention": [
          "error",
          ...[
            ...[
              {
                selector: ["function"],
                format: ["camelCase", "PascalCase"],
              },
              {
                selector: ["variable"],
                format: ["camelCase", "PascalCase", "UPPER_CASE"],
                modifiers: ["const"],
              },
            ],
            ...namingConventions,
          ],
        ],
      },
    },
    {
      // Tests
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
      rules: {
        // Using container element
        "testing-library/prefer-screen-queries": "off",
        // Allow @samples
        "no-restricted-imports": [
          "error",
          {
            patterns: baseRestrictedImports,
          },
        ],
      },
    },
    {
      // Test fixtures
      files: ["server/src/test/hooks.ts"],
      rules: {
        // Using container element
        "import/no-unused-modules": "off",
      },
    },
  ],
  ignorePatterns: [
    ".eslintrc.js",
    "**/bitbucket-api/**/*",
    "**/client-api/**/*",
    "*.local.*",
    "out",
    "node_modules",
  ],
}
