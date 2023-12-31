const vite = require("vite-web-test-runner-plugin")

const ignoredBrowserLogs = ["[vite] connecting...", "[vite] connected."]

module.exports = {
  plugins: [vite()],
  coverageConfig: {
    include: ["**/*.{js,jsx,ts,tsx}"],
    reportDir: "out/coverage/client",
    threshold: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  testRunnerHtml: testFramework => `
    <html>
      <head>
        <script type="module">
          // Note: globals expected by @testing-library/react
          window.global = window;
          window.process = { env: {} };
          // Note: adapted from https://github.com/vitejs/vite/issues/1984#issuecomment-778289660
          // Note: without this you'll run into https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201
          window.__vite_plugin_react_preamble_installed__ = true;
        </script>
        <script type="module" src="${testFramework}"></script>
        <script type="module" >
          import {loadAllModules} from "./test/index.ts"
          await loadAllModules({includeSpecs:false})
        </script>
      </head>
    </html>
  `,
  filterBrowserLogs: ({args}) => {
    return !args.some(arg => ignoredBrowserLogs.includes(arg))
  },
  testFramework: {
    config: {},
  },
}
