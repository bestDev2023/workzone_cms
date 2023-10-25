import {nodeResolve} from "@rollup/plugin-node-resolve"
import json from "@rollup/plugin-json"
import commonjs from "@rollup/plugin-commonjs"
import {typescriptPaths} from "rollup-plugin-typescript-paths"
import {resolve} from "node:path"
import alias from "@rollup/plugin-alias"
export default [
  {
    input: "./out/dist/server/src/main.js",
    output: {
      dir: "./out/bundled",
      format: "cjs",
      preserveModules: true,

      exports: "auto",
    },
    plugins: [
      nodeResolve(),
      json(),
      commonjs(),
      alias({
        entries: {
          "@": resolve(__dirname, "out/dist/server/src"),
          "bitbucket-api": resolve(__dirname, "out/dist/bitbucket-api"),
          "@shared": "/home/rgarcia/git/workzone-cloud/server/out/dist/shared",
        },
      }),
      /*typescriptPaths({
        absolute: true,
        transform(path) {
          console.log("path:", path)
          return path
        },
      })*/
    ],
  },
]
