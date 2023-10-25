import crypto from "node:crypto"

import {fail} from "@shared/fail"

import {defaultKeyProvider} from "./defaultKeyProvider"

const IV_LENGTH = 16

// Uses CTR assuming the values are only written by the application and can´t
// be set by the client
const AES_256_CTR = "aes-256-ctr"

export function encrypt(
  input: string,
  keyProvider: () => ReadonlyArray<string> = defaultKeyProvider
): string {
  const keys = keyProvider()
  const keyIndex = keys.length - 1
  const encryptionKey = keys[keyIndex] ?? fail("Key not found")

  const iv = Buffer.from(crypto.randomBytes(IV_LENGTH))
    .toString("hex")
    .slice(0, IV_LENGTH)
  const cipher = crypto.createCipheriv(
    AES_256_CTR,
    Buffer.from(encryptionKey, "base64"),
    iv
  )

  let encrypted = cipher.update(input)
  encrypted = Buffer.concat([encrypted, cipher.final()])

  return `${keyIndex}:${iv}:${encrypted.toString("hex")}`
}

export function decrypt(
  input: string,
  keyProvider: () => ReadonlyArray<string> = defaultKeyProvider
): string {
  const keys = keyProvider()
  const parts = input.split(":")
  const key = keys[Number(parts.shift())] ?? fail("Unable to find encryption")
  const iv = Buffer.from(parts.shift() ?? "", "binary")
  const encrypted = Buffer.from(parts.join(":"), "hex")
  const decipher = crypto.createDecipheriv(
    AES_256_CTR,
    Buffer.from(key, "base64"),
    iv
  )
  let decrypted = decipher.update(encrypted)

  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}
