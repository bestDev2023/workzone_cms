import ky from "ky"
import {fail} from "@shared/fail"

import {defaults} from "../../server/client-api"
import {defaults as bitbucketDefaults} from "../../bitbucket-api"
import {defaults as bbInternalDefaults} from "../../server/src/bitbucket-api/internal"

export const apiConfig = {isRefreshTokenEnabled: true}

let currentJwt: string | null

const api = ky.extend({
  timeout: false,
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [
      async request => {
        const token =
          currentJwt ?? new URLSearchParams(window.location.search).get("jwt")
        request.headers.set("Authorization", `JWT ${token}`)
        const bearerToken = await getBearerToken()
        request.headers.set("x-bearer-token", bearerToken)
      },
    ],
    afterResponse: [
      (request, options, response) => {
        if (apiConfig.isRefreshTokenEnabled) {
          currentJwt =
            response.headers.get("x-acpt") ??
            fail("JWT not included in the response")
          scheduleTokenRefresh(getExpiration(currentJwt))
        }
      },
    ],
  },
})

const apiBitbucket = ky.extend({
  timeout: false,
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [
      async request => {
        const bearerToken = await getBearerToken()
        request.headers.set("Authorization", `Bearer ${bearerToken}`)
      },
    ],
  },
})

defaults.fetch = api
bitbucketDefaults.fetch = apiBitbucket
bbInternalDefaults.fetch = apiBitbucket

let tokenOptions: unknown

// TODO improve test support
if (window.name) {
  const addon = JSON.parse(window.name)
  tokenOptions = {
    ...addon.options,
    baseUrl: window.location.origin,
    extensionId: addon.extension_id,
  }
}

export async function getBearerToken(): Promise<string> {
  return new Promise(resolve => {
    AP.request_access_token(tokenOptions, (_, result) => {
      resolve(result.access_token)
    })
  })
}

function getExpiration(jwt: string): number {
  const unverifiedClaims = JSON.parse(
    window.atob(jwt.split(".")[1] ?? fail("Invalid JWT token"))
  )
  return unverifiedClaims.exp
}

function scheduleTokenRefresh(expiry: number) {
  const leeway = 30_000
  const untilExpiry = expiry * 1000 - Date.now() - leeway

  setTimeout(async () => {
    await api.get("/api/tokenRefresh")
  }, untilExpiry)
}

export const httpClient = api
