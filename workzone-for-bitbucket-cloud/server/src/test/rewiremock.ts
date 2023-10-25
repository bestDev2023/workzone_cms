// rewiremock.es6.js
import * as rewiremock from "rewiremock"

// rewiremock.addPlugin(plugins.nodejs)
// rewiremock.addPlugin(plugins.toBeUsed)
rewiremock.addPlugin(rewiremock.plugins.usedByDefault)

// rewiremock.enable()

rewiremock.overrideEntryPoint(module)

export * as rewiremock from "rewiremock"
