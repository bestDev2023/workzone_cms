import {fail} from "@shared/fail"

export function extractNamesFrom(fullName: string): {
  workspace: string
  repository: string
} {
  // FIXME can repo have more than one / in full_name?
  const [workspace, repository] = fullName.split("/")

  if (workspace == null || repository == null) {
    fail(
      `Unable to obtain workspace and repository from full name: ${fullName}`
    )
  }

  return {workspace, repository}
}
