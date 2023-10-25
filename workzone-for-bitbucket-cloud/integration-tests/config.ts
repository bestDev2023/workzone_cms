import {LaunchOptions} from "playwright"

export interface TestConfig {
  fixture: {
    password: string
    workspace: string
    descriptor: string
    username: string
  }
  browser?: Pick<LaunchOptions, "headless" | "slowMo" | "timeout" | "devtools">
  isVerbose?: boolean
  uninstall?: {
    isBefore?: boolean
    isAfter?: boolean
  }
}

export function configure(): TestConfig {
  return {
    fixture: {
      username: "workzone-test1@izymes.com",
      password: "OwcnK7mojqs1iul",
      descriptor: "https://staging.workzonecloud.net/atlassian-connect.json",
      workspace: "wzt-workpace-1",
    },
  }
}
