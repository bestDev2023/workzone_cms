import path from "node:path"
import fs, {promises as fsp} from "node:fs"

import {normalizePath, Plugin, ViteDevServer} from "vite"

// Simplified version of https://github.com/windsonR/vite-plugin-virtual-html
// but with support for:
//  - root build option
//  - html not found in dev mode
//  - remove warn for lib mode
//  - support for existing pages(test/index.html)
// TODO apply fixes upstream or use different plugin
export function virtualHtmlTemplateVitePlugin(
  virtualHtmlOptions: PluginOptions
): Plugin {
  const {
    pages,
    render: globalRender = (template: string) => template,
    data: globalData = {},
  } = virtualHtmlOptions

  const needRemove: Array<string> = []
  return {
    name: "vite-plugin-virtual-html-template",
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use("/", async (req, res, next) => {
          const url = decodeURI(generateUrl(req.url))
          if (
            req.url === "/test/index.html" ||
            (!url.endsWith(".html") && url !== "/")
          ) {
            return next()
          }

          const page = pages[getHtmlName(url)]
          if (page == null) {
            res.statusCode = 404
            res.end()
          } else {
            const pageOptions = await generatePageOptions(
              page,
              globalData,
              globalRender
            )
            res.end(
              await server.transformIndexHtml(url, await readHtml(pageOptions))
            )
          }
        })
      }
    },
    async config(config, {command}) {
      if (command === "build") {
        const allPage = Object.entries(pages)
        // copy all html which is not under project root
        for (const [key, value] of allPage) {
          const pageOption = await generatePageOptions(
            value,
            globalData,
            globalRender
          )
          const vHtml = path.resolve(cwd, `./${key}.html`)
          if (!fs.existsSync(vHtml)) {
            needRemove.push(vHtml)
            await fsp.copyFile(
              path.resolve(cwd, `.${pageOption.template}`),
              vHtml
            )
          }
        }
        // inject build.rollupOptions.input from pages directly.
        config.build = {
          ...config.build,
          rollupOptions: {
            input: {
              ...extractHtmlPath(pages),
            },
          },
        }
      }
    },
    async load(id: string) {
      if (id.endsWith("html")) {
        const newId = getHtmlName(id)
        const pageName = pages[newId]
        if (pageName == null) {
          throw Error(`Page ${pageName} not found`)
        }
        const page = await generatePageOptions(
          pageName,
          globalData,
          globalRender
        )

        return readHtml(page)
      }

      return null
    },
    async closeBundle() {
      // remove files should not be under project root
      for (const vHtml of needRemove) {
        if (fs.existsSync(vHtml)) {
          await fsp.rm(vHtml).catch(() => {
            // ignore this warning
          })
        }
      }
    },
  }
}

interface PageObject {
  template: string
  data?: VirtualHtmlTemplateData
  render?: VirtualHtmlTemplateRender
}
/**
 * describe a page
 */
type VirtualHtmlPage = string | PageObject

type VirtualHtmlTemplateRender = (
  template: string,
  data: Record<string, any>
) => string

type VirtualHtmlTemplateData = object

interface PluginOptions {
  /**
   * config html-entries' path
   */
  pages: {[key: string]: VirtualHtmlPage}
  /**
   * use for template. as global inject data
   */
  data?: Record<string, unknown>
  /**
   * function to render template
   */
  render?: VirtualHtmlTemplateRender
}

function defaultRender(template: string) {
  return template
}

// TODO should come from root build config
const cwd = normalizePath(`${process.cwd()}/src`)

function generateUrl(url?: string): string {
  if (url == null) {
    return "/"
  }

  // Discard parameters
  return url.split("?")[0] ?? url
}

async function readHtml({
  template = "",
  data = {},
  render = defaultRender,
}: PageObject) {
  const templatePath = path.resolve(cwd, `.${template}`)
  if (!fs.existsSync(templatePath)) {
    throw Error(`Template not found! - ${templatePath}`)
  }

  return renderTemplate(templatePath, render, data)
}

/**
 * render template
 * @param templatePath
 * @param render
 * @param data
 */
async function renderTemplate(
  templatePath: string,
  render: VirtualHtmlTemplateRender,
  data: VirtualHtmlTemplateData
) {
  const code = await readTemplate(templatePath)
  return render(code, data)
}

/**
 * read html file's content to render with render function
 * @param templatePath
 */
async function readTemplate(templatePath: string): Promise<string> {
  const result = await fsp.readFile(templatePath)
  return result.toString()
}

async function generatePageOptions(
  page: VirtualHtmlPage,
  globalData: Record<string, unknown>,
  globalRender: VirtualHtmlTemplateRender
): Promise<PageObject> {
  if (typeof page === "string") {
    return {
      template: page,
      data: {
        ...globalData,
      },
      render: globalRender,
    }
  }
  const {data = {}, render, template} = page
  return {
    template,
    data: {
      ...globalData,
      ...data,
    },
    render: render ?? globalRender ?? defaultRender,
  }
}

/**
 * use pages' key as html name
 * @param pages
 */
function extractHtmlPath(pages: {[p: string]: VirtualHtmlPage}) {
  const newPages: {[key: string]: string} = {}
  for (const key of Object.keys(pages)) {
    newPages[key] = `/${key}.html`
  }

  return newPages
}

function getHtmlName(id: string) {
  return id.replace(cwd, "").slice(1, id.replace(cwd, "").length - 5)
}
