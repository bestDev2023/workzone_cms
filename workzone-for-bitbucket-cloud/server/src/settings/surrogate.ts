import {Credential} from "@shared/models"
import {assertWorkspacePermission} from "@/context"

import {
  deleteApplicationProperty,
  findApplicationProperty,
  saveApplicationProperty,
} from "./applicationProperty"

const ACCOUNT_SETTINGS = "surrogate-account-settings"

export async function getSurrogateUsername(
  workspace: string
): Promise<string | undefined> {
  await assertWorkspacePermission(workspace, "owner")
  const credentials = await __getSurrogate()

  return credentials?.username
}

export async function __getSurrogate(): Promise<Credential | undefined> {
  // Permission is not enforced here be since the credentials are necessary to
  // perform actions as the surrogate account for non-owners, so this must be
  // used only internally
  return findApplicationProperty(ACCOUNT_SETTINGS)
}

export async function setSurrogate(
  workspace: string,
  credential: Credential
): Promise<void> {
  await assertWorkspacePermission(workspace, "owner")
  return saveApplicationProperty(ACCOUNT_SETTINGS, credential)
}

export async function deleteSurrogate(workspace: string): Promise<void> {
  await assertWorkspacePermission(workspace, "owner")
  return deleteApplicationProperty(ACCOUNT_SETTINGS)
}

export function toBasicAuth(credentials: {
  username: string
  password: string
}): string {
  return `Basic ${Buffer.from(
    `${credentials.username}:${credentials.password}`
  ).toString("base64")}`
}
