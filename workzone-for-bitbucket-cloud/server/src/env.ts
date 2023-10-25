export function getEnvironment(): string {
  return process.env["NODE_ENV"] ?? "development"
}

export const isDevelopment = getEnvironment() === "development"
export const isDevelopmentTest = getEnvironment() === "test"

export function isUseLocalStore(): boolean {
  return process.env["WZ_USE_LOCAL_STORE"] === "TRUE"
}
