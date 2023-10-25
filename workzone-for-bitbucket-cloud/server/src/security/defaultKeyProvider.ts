import {fail} from "@shared/fail"

let encryptionKeys: ReadonlyArray<string> | undefined

export function defaultKeyProvider(): ReadonlyArray<string> {
  if (encryptionKeys == null) {
    encryptionKeys =
      process.env["ENCRYPTION_KEYS"]?.split(" ") ??
      fail("ENCRYPTION_KEYS environment variable is missing")
  }

  return encryptionKeys
}
