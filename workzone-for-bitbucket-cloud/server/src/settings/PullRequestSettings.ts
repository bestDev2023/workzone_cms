import {PullRequestSettingsEntry} from "@shared/models"
import {assertWorkspacePermission, WorkspacePermission} from "@/context"

import {
  findApplicationProperty,
  saveApplicationProperty,
} from "./applicationProperty"

const PULL_REQUEST_SETTINGS = "pull-request-settings"

export async function save(
  workspace: string,
  pullRequestSettings: Array<PullRequestSettingsEntry>
): Promise<void> {
  await assertWorkspacePermission(workspace, "owner")
  return saveApplicationProperty(PULL_REQUEST_SETTINGS, pullRequestSettings)
}

export async function createOrUpdate(
  workspace: string,
  pullRequestSetting: PullRequestSettingsEntry
): Promise<"UPDATED" | "CREATED"> {
  await assertWorkspacePermission(workspace, "owner")
  const all = await list(workspace, "owner")
  const pos = all.findIndex(_ => _.id === pullRequestSetting.id)
  const isNew = pos === -1
  if (isNew) {
    all.push(pullRequestSetting)
  } else {
    all[pos] = pullRequestSetting
  }

  await save(workspace, all)

  return isNew ? "CREATED" : "UPDATED"
}

export async function list(
  workspace: string,
  requiredPermission: WorkspacePermission
): Promise<Array<PullRequestSettingsEntry>> {
  await assertWorkspacePermission(workspace, requiredPermission)
  return (await findApplicationProperty(PULL_REQUEST_SETTINGS)) ?? []
}

export async function remove(workspace: string, id: string): Promise<boolean> {
  await assertWorkspacePermission(workspace, "owner")
  const all = await list(workspace, "owner")
  const filtered = all.filter(_ => _.id !== id)
  const hasRemoved = filtered.length < all.length

  if (hasRemoved) {
    await save(workspace, filtered)
  }

  return hasRemoved
}
