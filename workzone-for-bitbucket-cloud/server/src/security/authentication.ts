import basicAuth from "basic-auth"
import {RequestHandler} from "express-serve-static-core"
import {NextFunction, Request, Response} from "express"
import {getVerifiedClaims} from "atlassian-connect-express/lib/middleware/authentication"
import {AddOn} from "atlassian-connect-express"

import {runWithContext} from "@/context"
import {f, loggers} from "@/logger"
import {isDevelopment} from "@/env"
import {AS_APP_USER, AS_LOGGED_IN_USER} from "@/httpClient"
import {authenticate as adminAuthenticate} from "@/security/Admin"

const ANONYMOUS_URLS = new Array<string>()

const logger = loggers.authentication

export function authenticate(
  addon: AddOn,
  options: {
    allowJwtAsUser: boolean
  }
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers
    logger.debug(f`Trying to auth: ${req.path} ${authorization}`)

    if (authorization?.startsWith("JWT") === true) {
      // When JWT is used to map to user then it must check QSH to ensure
      // that a token obtained as member is used to run with principal
      // permissions
      const skipQshCheck = !options.allowJwtAsUser

      try {
        const verifiedClaims = await getVerifiedClaims(
          addon,
          req,
          res,
          skipQshCheck
        )
        logger.debug(f`verifiedClaims: ${verifiedClaims}`)

        // Upon successful authentication getVerifiedClaims adds
        // a new token to the response as x-acpt

        const clientInfoProvider = async () =>
          addon.loadClientInfo(verifiedClaims.clientKey)
        const bearerToken = req.header("x-bearer-token")

        const userAuth = options.allowJwtAsUser
          ? AS_APP_USER
          : AS_LOGGED_IN_USER

        return runWithContext(
          () => {
            next()
          },
          addon.key,
          verifiedClaims.clientKey,
          clientInfoProvider,
          userAuth,
          bearerToken
        )
      } catch (error) {
        if (error instanceof Error) {
          logger.debug(error)
        } else {
          logger.debug(f`Unexpected error ${error}`)
        }

        return res.status(401).send("Authentication failed")
      }
    } else if (ANONYMOUS_URLS.some(_ => req.path.startsWith(_))) {
      return next()
    } else if (req.path.startsWith("/api/admin")) {
      const credentials = basicAuth(req)
      let authenticated = false
      if (credentials != null) {
        authenticated = adminAuthenticate({
          username: credentials.name,
          password: credentials.pass,
        })
      }

      return authenticated
        ? next()
        : res.status(401).send("Authentication failed")
    } else if (isDevelopment) {
      // TODO only add this to the router if in dev, other don't even register
      // TODO set loggedInUser and permissions
      const authClientKey = req.headers["x-auth-client-key"]
      if (authClientKey != null) {
        // TODO Revisit dev support
        throw Error("Not implemented")
      }
    }

    // Catch all
    return res.status(404).send({message: "Not Found"})
  }
}

export function anonymous(url: string): string {
  ANONYMOUS_URLS.push(url)
  return url
}
