// These are internal Bitbucket APIs being used by organized. There are no specs
// and they are maintained manually
// TODO create tests to ensure APIs are available/compatible
import * as Oazapfts from "oazapfts/lib/runtime"

export const defaults: Oazapfts.RequestOpts = {
  baseUrl: "https://bitbucket.org/!api/internal",
}

const oazapfts = Oazapfts.runtime(defaults)

interface Paginated<T> {
  size: number
  page: number
  pagelen: number
  next?: string
  previous?: string
  values: Array<T>
}

export type GroupMember = {
  display_name: string
  uuid: string
  nickname: string
  is_active: boolean
  type: "user"
  email?: string
  account_id: string
  links?: {
    self?: {
      href?: string
      name?: string
    }
    html?: {
      href?: string
      name?: string
    }
    avatar?: {
      href?: string
      name?: string
    }
  }
}

export type UserGroup = {
  name: string
  slug: string
}

export function getGroupMembers(
  workspace: string,
  groupSlug: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200
          data: Paginated<GroupMember>
        }
      | {
          status: 401
          data: Error
        }
    >(`/workspaces/${workspace}/groups/${groupSlug}/members`, {
      ...opts,
    })
  )
}

export type Conflict = {
  path: string
  message: string
  scenario: string
}

export type MergeRestrictionType =
  | "resolved_tasks"
  | "minimum_successful_builds"
  | "minimum_default_reviewer_approvals"
  | "maximum_commits_behind"
  | "no_changes_requested"
  | "pr_deps_merged"
  | "minimum_approvals"
  | "failed_builds"

export type MergeRestrictions = {
  restrictions: Record<
    MergeRestrictionType,
    {
      count: number | null
      errors: Array<string>
      name: string
      label: string | null
      allow_merge: boolean
      key: MergeRestrictionType
      pass: boolean
    }
  >
}

export function getGroup(
  workspace: string,
  groupSlug: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200
          data: UserGroup
        }
      | {
          status: 401
          data: Error
        }
    >(`/workspaces/${workspace}/groups/${groupSlug}`, {
      ...opts,
    })
  )
}

export function getGroups(workspace: string, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Paginated<UserGroup>
      }
    | {
        status: 401
        data: Error
      }
  >(`/workspaces/${workspace}/groups`, {
    ...opts,
  })
}

export function getConflicts(
  workspace: string,
  repository: string,
  pullRequestId: number,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200
          data: Array<Conflict>
        }
      | {
          status: 401
          data: Error
        }
    >(
      `repositories/${workspace}/${repository}/pullrequests/${pullRequestId}/conflicts`,
      {
        ...opts,
      }
    )
  )
}

export function getMergeRestrictions(
  workspace: string,
  repository: string,
  pullRequestId: number,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.ok(
    oazapfts.fetchJson<
      | {
          status: 200
          data: MergeRestrictions
        }
      | {
          status: 401
          data: Error
        }
    >(
      `repositories/${workspace}/${repository}/pullrequests/${pullRequestId}/merge-restrictions`,
      {
        ...opts,
      }
    )
  )
}
