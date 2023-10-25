import {HttpError, ok} from "oazapfts"

import {
  deleteUserHostedPropertyValue,
  retrieveUserHostedPropertyValue,
} from "bitbucket-api"
import {decrypt, encrypt} from "@/security/crypto"
import {context} from "@/context"
import {AS_APP_USER, httpClient} from "@/httpClient"

export async function saveApplicationProperty<T>(
  name: string,
  value: T
): Promise<void> {
  const ctx = context()

  const addOnUserId = await ctx.addOnUserId
  const {addOnKey} = ctx
  const encrypted = encrypt(JSON.stringify(value))
  // updateUserHostedPropertyValue signature/spec is broken since it doesn't
  // take the payload parameters
  await httpClient.put(
    `https://api.bitbucket.org/2.0/users/${addOnUserId}/properties/${addOnKey}/${name}`,
    {
      json: {
        value: encrypted,
        _attributes: ["read_only"],
      },
      headers: AS_APP_USER,
    }
  )
}

export async function findApplicationProperty<T>(
  name: string
): Promise<T | undefined> {
  const ctx = context()

  try {
    const propertyValue: string = await ok(
      retrieveUserHostedPropertyValue(
        await ctx.addOnUserId,
        ctx.addOnKey,
        name,
        {headers: AS_APP_USER}
      )
    )

    return JSON.parse(decrypt(JSON.parse(propertyValue).value))
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      return
    }
    throw error
  }
}

export async function deleteApplicationProperty(name: string): Promise<void> {
  const ctx = context()

  await ok(
    deleteUserHostedPropertyValue(await ctx.addOnUserId, ctx.addOnKey, name, {
      headers: AS_APP_USER,
    })
  )

  return
}
