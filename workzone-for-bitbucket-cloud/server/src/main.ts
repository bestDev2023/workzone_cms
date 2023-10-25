// Entry point for the app
import fs from "node:fs"
import http from "node:http"
import {inspect} from "node:util"

import express, {Express, NextFunction, Request, Response} from "express"
import ace, {AddOn} from "atlassian-connect-express"
import {ValidateError} from "@tsoa/runtime"
import {isNumber} from "remeda"

import {getEnvironment, isDevelopment, isUseLocalStore} from "@/env"
import {AppError, fail, SecurityError} from "@shared/fail"
import {anonymous, authenticate} from "@/security/authentication"
import {sourceEnvFile} from "@/sourceEnvFile"
import {RegisterRoutes} from "@generated/routes"

import {setupFetch} from "./httpClient"
import {webhookHandler} from "./webhookHandler"
import {aceLoggerConsole, f, logger, pinoHttp} from "./logger"

import {prepareStore, StoreConfig} from "@/db/prepareStore"
import {getLocalStore} from "@/db/getLocalStore"

inspect.defaultOptions.depth = null
inspect.defaultOptions.colors = true

logger.info(f`ENV is: ${getEnvironment()}`)

if (isDevelopment) {
  sourceEnvFile()
}

async function main() {
  setupFetch()

  const app = express()
  app.set("x-powered-by", false)
  app.use(express.json())

  app.use(pinoHttp)

  const configOverride = isUseLocalStore()
    ? {[getEnvironment()]: {store: await getLocalStore()}}
    : {}

  const addon = ace(
    app,
    {
      config: configOverride,
    },
    aceLoggerConsole,
    async () => {
      // ACE is configured asynchronously, so only add routes after it is
      // finished otherwise /install can be overridden by the catch all
      app.use(errorHandler)

      // Replace ACE's listener with a handler that has better logs
      if (process.listenerCount("unhandledRejection") !== 1) {
        logger.warn(f`Removing more listeners than expected`)
      }
      process.removeAllListeners("unhandledRejection")
      process.on("unhandledRejection", err => {
        if (err instanceof Error) {
          logger.error(f`Unhandled error:`, err)
        } else {
          logger.error(f`Unhandled error: ${err}`)
        }
      })
    }
  )

  if (isUseLocalStore()) {
    // non-development tables are created manually

    const configDynamic = addon.config as unknown as Record<
      string,
      () => {store: StoreConfig}
    >
    const storeConfig =
      configDynamic[addon.config.environment()]?.().store ??
      fail("Store configuration not found")

    await prepareStore(storeConfig)
  }

  registerRoutes(app, addon)
  startHttpServer(app, addon)
}

function startHttpServer(app: Express, addon: AddOn) {
  const port = addon.config.port()

  const isTCP = isNumber(port)
  if (!isTCP && fs.existsSync(port)) {
    fs.unlinkSync(port)
  }
  // Boot the HTTP server
  const server = http.createServer(app).listen(port, () => {
    if (!isNumber(port)) {
      // Give permission to reverse proxy user
      fs.chmodSync(port, fs.constants.S_IWOTH)
    }

    logger.info(f`App server running at ${port}`)
  })

  process.on("SIGTERM", async signal => {
    logger.info(f`Stopping server. Received ${signal}`)
    server.close()
  })
}

function registerRoutes(app: Express, addon: AddOn) {
  app.post(
    "/api/webhook",
    authenticate(addon, {
      // Webhooks run are authenticated as the app by using the JWT
      allowJwtAsUser: true,
    }),
    webhookHandler()
  )

  // Everything else to be authenticated by default and make anonymous explicit
  app.use(authenticate(addon, {allowJwtAsUser: false}))

  app.get("/api/tokenRefresh", (req, res) => {
    res.sendStatus(200)
  })

  app.get(anonymous("/health-check"), (req, res) => {
    res.sendStatus(200)
  })

  // handler is provided by ACE
  anonymous("/installed")
  anonymous("/atlassian-connect.json")

  // Api routes generated by tsoa
  RegisterRoutes(app)

  if (isDevelopment) {
    void enableSwaggerUi(app)
  }
}

function errorHandler(
  err: Record<PropertyKey, unknown> | undefined,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const statusCode = <number | undefined>err?.["statusCode"]

  if (err instanceof SecurityError) {
    logger.error(err)
    return res.status(403).json({
      message: err.message,
    })
  }

  if (err instanceof AppError || err instanceof SyntaxError) {
    return res.status(statusCode ?? 400).json({
      message: err.message,
    })
  }

  if (err instanceof ValidateError) {
    logger.warn(f`Caught validation error for ${req.path}: ${err.fields}`)
    return res.status(422).json({
      message: "Validation failed",
      details: err.fields,
    })
  }

  if (err != null) {
    if (err instanceof Error) {
      logger.error(err)
    } else {
      logger.error(f`Unexpected error: ${err}, no stack available`)
    }

    return res.status(500).json({
      message: "Internal server error",
    })
  }

  next()
}

async function enableSwaggerUi(app: Express) {
  try {
    const swaggerUi = await import("swagger-ui-express")
    app.use(
      anonymous("/api/docs"),
      swaggerUi.serve,
      async (req: Request, res: Response) => {
        const spec = await import("@generated/swagger.json")

        // Workaround - Remove empty definitions added by tsoa, which
        // overrides the global one
        const specStr = JSON.stringify(spec).replaceAll(`"security":[],`, "")
        const specNoSecurity = JSON.parse(specStr)

        // Adds support for development authentication
        specNoSecurity.security = [{devAuth: []}]
        specNoSecurity.components.securitySchemes = {
          devAuth: {
            type: "apiKey",
            name: "x-auth-client-key",
            in: "header",
          },
        }

        res.send(
          swaggerUi.generateHTML(specNoSecurity, {
            swaggerOptions: {
              persistAuthorization: true,
            },
          })
        )
      }
    )
  } catch {
    logger.warn(f`api/docs is not available`)
  }
}

void main()