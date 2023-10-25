import got, {NormalizedOptions} from "got"
import {createFetch} from "got-fetch"
import * as jwt from "atlassian-jwt"
import {addMinutes} from "date-fns"

import {fail} from "@shared/fail"
import {defaults} from "bitbucket-api"
import {Credential} from "@shared/models"
import {defaults as internalDefaults} from "@/bitbucket-api/internal"
import {context} from "@/context"
import {toBasicAuth} from "@/settings/surrogate"
import {f, loggers} from "@/logger"

export const AS_APP_USER = {authorization: "JWT"} as const
export const AS_LOGGED_IN_USER = {authorization: "LOGGED_IN"} as const
const AS_WORKZONE_USER = {authorization: "WORKZONE"} as const

const logger = loggers.httpClient

// TODO only add debug hook if isDevelopment
export const httpClient = got.extend({
  hooks: {
    beforeRequest: [
      async (options: NormalizedOptions) => {
        const authScheme =
          (options.headers["authorization"] as string | undefined) ??
          // Read operations should default to APP since it's faster
          (options.method.toUpperCase() === "GET"
            ? AS_APP_USER
            : AS_WORKZONE_USER
          ).authorization

        const credentials =
          authScheme === AS_WORKZONE_USER.authorization
            ? (await context().workzoneUserCredentials) ?? "NOT CONFIGURED"
            : null

        const selectedScheme =
          credentials === "NOT CONFIGURED"
            ? AS_APP_USER.authorization
            : authScheme

        switch (selectedScheme) {
          case AS_WORKZONE_USER.authorization: {
            options.headers = {
              ...options.headers,
              authorization: toBasicAuth(<Credential>credentials),
            }
            break
          }
          case AS_APP_USER.authorization: {
            const token = await newJwt({
              method: options.method,
              pathname: options.url.toString(),
              query: options.url.searchParams,
            })

            options.headers["authorization"] = `JWT ${token}`

            break
          }
          case AS_LOGGED_IN_USER.authorization: {
            options.headers["authorization"] = `Bearer ${context().bearerToken}`

            break
          }
          default: {
            // TODO Better support for redirects which use previously selected
            // token - maybe use a authorization-scheme header instead?
            if (!selectedScheme.startsWith("JWT")) {
              const url = options.url.toString()
              fail(
                `Invalid authorization scheme ${JSON.stringify(
                  selectedScheme
                )} for ${url}`,
                {stack: options.context["stack"] as string}
              )
            }
          }
        }

        logger.debug(
          f`Requesting: ${options.url.toString()} (${selectedScheme})`
        )
      },
    ],
    afterResponse: [
      response => {
        logger.debug(f`Response: ${response.url} (${response.statusCode})`)
        const body = <string>response.body
        if (body !== "" && logger.isLevelEnabled("trace")) {
          try {
            logger.trace(JSON.parse(body))
          } catch {
            logger.trace(f`${body}`)
          }
        }
        if (response.statusCode >= 400) {
          logger.error(
            f`Error code ${response.statusCode} body: ${response.body}`
          )
        }

        return response
      },
    ],
    beforeError: [
      error => {
        error.stack = <string>error.options.context["stack"]

        return error
      },
    ],
  },
  handlers: [
    (options, next) => {
      // Support for better stack traces
      options.context = {}
      Error.captureStackTrace(options.context)

      return next(options)
    },
  ],
})

export function setupFetch(): void {
  defaults.fetch = internalDefaults.fetch = createFetch(httpClient)
}

async function newJwt(req: jwt.Request): Promise<string> {
  // Based on https://bitbucket.org/atlassian/atlassian-connect-express/src/d3e4ba420a495900c7f15cf4d8d74f189f2e2f62/lib/internal/host-request.js?at=master#lines-153
  const now = Date.now()
  const ctx = context()

  const tokenData = {
    iss: ctx.addOnKey,
    iat: now,
    exp: addMinutes(now, 3).getTime(),
    // [Query String Hash](https://developer.atlassian.com/cloud/jira/platform/understanding-jwt/#a-name-qsh-a-creating-a-query-string-hash)
    qsh: jwt.createQueryStringHash(req),
    sub: ctx.clientKey,
  }

  const secret = await ctx.sharedSecret
  return jwt.encodeSymmetric(tokenData, secret)
}
