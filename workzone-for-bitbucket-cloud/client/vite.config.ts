import {inspect} from "node:util"

inspect.defaultOptions.depth = null
import {defineConfig} from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import tsconfigPaths from "vite-tsconfig-paths"
import {resolve} from "node:path"
import fs from "node:fs"
import {visualizer} from "rollup-plugin-visualizer"
import ejs from "ejs"
import child_process from "child_process"
import copy from "rollup-plugin-copy"
import {paramCase, pascalCase} from "change-case"
import {filter, map, mapToObj, pipe} from "remeda"
import {virtualHtmlTemplateVitePlugin} from "./virtualHtmlTemplateVitePlugin"

if (process.env["NODE_ENV"] == null) {
  process.env["NODE_ENV"] = "development"
}

const isTest = process.env["NODE_ENV"] === "test"
const isDevelopment = process.env["NODE_ENV"] === "development"
const isProfileBundle = process.env["PROFILE_BUNDLE"] === "true"

const appRevision =
  child_process
    .execSync("git log --pretty=format:'%h' -n 1")
    .toString()
    .trim() + (isDevelopment ? "-dev" : "")

console.log("Environment:", process.env["NODE_ENV"])
const entrySuffix = ".entry.tsx"
const pages = pipe(
  fs.readdirSync("./src"),
  filter(file => file.includes(entrySuffix)),
  map(entryName => paramCase(entryName.replaceAll(entrySuffix, ""))),
  mapToObj(module => [
    module,
    {
      template: "/index-template.html.ejs",
      data: {view: pascalCase(module)},
    },
  ])
)

console.log("Modules", Object.keys(pages))
const htmlTemplatePlugin = virtualHtmlTemplateVitePlugin({
  pages,
  render(template, data) {
    return ejs.render(template, {...data, appRevision})
  },
})

async function configure() {
  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [
      htmlTemplatePlugin,
      reactRefresh(),
      tsconfigPaths(),
      copy({
        targets: [
          {
            src: ["nginx-default.conf"],
            dest: "out/dist",
          },
        ],
        hook: "writeBundle",
      }),
    ],

    root: "src",
    esbuild: {
      jsxInject: `import { jsx } from '@emotion/react'`, // allow css in jsx
      jsxFactory: `jsx`, // ^^
    },
    define: {
      "process.env": {},
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "@shared": resolve(__dirname, "../shared"),
        // User browser version
        "testdouble": "testdouble/dist/testdouble.js",
        "fetch-mock": "fetch-mock/esm/client",
        // "util": "util",
        // "assert": "assert",
        // Force version 11 on Atlaskit to avoid two different runtimes
        "@emotion/core": "@emotion/react",
        "react-intl-next": "react-intl",
        // "@atlaskit/analytics-next": "@atlaskit/analytics-next/dist/es2019",
        // "@atlaskit/avatar": "@atlaskit/avatar/dist/es2019",
      },
    },
    build: {
      emptyOutDir: true,
      outDir: "../out/dist/static",
      rollupOptions: {
        plugins: [
          isProfileBundle && visualizer({filename: "./out/stats.html"}),
        ],
      },
    },
    server: {
      // Use same port as Beanstalk
      port: 5000,
      hmr: {
        // When running inside bitbucket it requires TLS connection,
        // and ngrok only exposes the default port
        ...(isTest ? {} : {clientPort: 443}),
      },
      proxy: {
        "^/(atlassian-connect.json|api/|installed|uninstalled|health-check)": {
          target: "http://localhost:9000",
          changeOrigin: true,
          secure: false,
          configure: proxy => {
            proxy.on("proxyReq", proxyRequest => {
              console.debug("Proxy request:", proxyRequest.path)
            })
          },
        },
      },
    },
  })
}

const config = configure()

export default config
