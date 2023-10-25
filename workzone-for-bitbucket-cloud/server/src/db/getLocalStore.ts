import {waitForDatabase} from "@/db/waitForDatabase"
import {getEnvironment} from "@/env"

export async function getLocalStore() {
  // When running as container it's the service name
  let endpoint = "http://dynamodb:8000"
  try {
    await waitForDatabase(endpoint)
  } catch {
    endpoint = "http://localhost:8000"
    try {
      await waitForDatabase(endpoint, 500)
    } catch {
      throw Error(`Unable to connect to database at ${endpoint}`)
    }
  }

  return {
    adapter: "dynamodb",
    table: `workzone-${getEnvironment()}-tenants`,
    region: "localhost",
    endpoint,
    credentials: {
      accessKeyId: "dummy",
      secretAccessKey: "dummy",
    },
    connectionTimeout: 2500,
    timeout: 2500,
    maxRetries: 4,
  } as const
}
