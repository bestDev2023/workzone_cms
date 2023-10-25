# Installation

1. Install [git], [node], [npm] \(2.7.5+) and [ngrok].
2. Run `npm install`.
3. Run `ngrok http 5000` and take note of the proxy's `https://..` base url.
4. Run `AC_LOCAL_BASE_URL=https://THE_NGROK_BASE_URL node app.js` from the
   repository root.

# Development loop

You can manually install/update/uninstall your add-ons from
`https://bitbucket.org/account/user/USERNAME/addon-management`.

[git]: http://git-scm.com/
[node]: https://nodejs.org/
[npm]: https://github.com/npm/npm#super-easy-install
[ngrok]: https://ngrok.com/

# .env.local

Create a file at the root of the project, with the required variables to be
used locally only:

```shell
ENCRYPTION_KEYS="yb9Hb9l1RZiYDhn6OdDNprI6Ik403pKnVakymWy0yk4="
WZ_USE_LOCAL_STORE=TRUE
AC_LOCAL_BASE_URL=https://renato.au.ngrok.io
```

# NGROK

```shell
ngrok http --region=au --hostname=renato.au.ngrok.io 5000
```

### Node version

picks up the required version from .nvmrc

nvm install

### DB local dev

`docker-compose -f docker-compose.dev.yml up -d dynamodb`

### Docker local dev

```shell script
cd server
npm run dev:server
```

```shell script
cd client
npm run dev:client
```

### Docker local

After running `build.sh`, the application can be run using Docker `start-local.sh`

### Logging

For local logging config create a file see `./logger.local.ts` hooks:

```typescript
import {TransportTargetOptions} from "pino"

import {LoggerHooks} from "@/logger"

export const loggerHooks: LoggerHooks = {
  configure: loggerOptions => {
    // Root logger level
    // loggerOptions.level = "trace"

    const transport = <TransportTargetOptions>loggerOptions.transport
    transport.options["ignore"] = "pid,hostname"
    // transport.options["translateTime"] = "HH:MM:ss"
  },
  afterCreate: loggers => {
    // Set levels individually
    loggers.logger.level = "trace"
    // Enable to trace for response body
    loggers.httpClient.level = "trace"
  },
}
```

To print logs in the console run tests with

`NODE_ENV=test npx mocha src/**/*.spec.*` in combination with `logger.local.ts`

```
const loggerHooks: LoggerHooks = {
    configure: loggerOptions => {
        loggerOptions.level = "debug"
    },
    afterCreate: loggers => {
        loggers.logger.destination(1)
        // loggers.logger.level
    }
}
export {loggerHooks}
```

#### non local

Use logger API:

```shell
$ curl -X POST --location "https://workzonecloud.net/api/admin/logger/levels" \
    -H "Content-Type: application/json" \
    -d "{
          \"logger\": \"info\",
          \"authentication\": \"info\",
          \"httpClient\": \"info\",
          \"httpServer\": \"debug\"
        }" \
    --basic --user "izymes-admin:$PASSWD"
```

curl -X GET --location "https://staging.workzonecloud.net/api/admin/logger/levels" \
--basic --user "izymes-admin:$PASSWD"

### Tests

Mocha watch + Typescript:
`--watch --watch-files **/*.ts`

#### Client tests

`npm run test:client:unit-dev`

browser: http://localhost:3001/test/

#### server tests

```
cd server
npm run test:server
```

### Deploy EB AWS

$ eb create workzone-staging --shared-lb shared-load-balancer --elb-type application

### Bitbucket api generation

Source is https://api.bitbucket.org/swagger.json

- Manually:
  - Download local copy of swagger.json
  - Rename the summary to x-summary so that the descriptions are used instead
  - Delete methods with undocumented params (most of the Pipeline ones)
  - Find and replace to add '@deprecated' annotation
  - build (
    - npm run bitbucket-api:generate-types,
    - npm run bitbucket-api:build )

### Shim/polyfills example

https://github.com/EvinqWang/vite_vue3_web3/blob/main/index.html

### Relevant discussions

- Bot user/surrogate
  https://community.developer.atlassian.com/t/authenticating-as-an-app-and-not-as-the-user-that-installed-the-app/35971

### Build

- Server is CommonJS because ESM had too many issues
- bitbucket-api is build as CommonJS as a separate project since oazapfts fails with
  exactOptionalPropertyTypes
- client consumes bitbucket-api as TS (not dist)

### Concepts

> Workspaces provides a single default user experience for how you collaborate across your organization.
> <br/><small> [Source](https://www.bitbucket.org/blog/introducing-workspaces) </small>
