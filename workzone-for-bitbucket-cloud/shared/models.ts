import {CommitFile, DiffStat, Pullrequest, User} from "../bitbucket-api/index"
import {SetRequired} from "type-fest"

// {1f2b1343-7d1f-4e94-acce-9ad94771765f}
// type UUID = `{${string}-${string}-${string}-${string}-${string}}`
export type UUID = string

export interface RepositoryRef {
  repository: string | UUID
  workspace: string | UUID
}

interface PullRequestRef extends RepositoryRef {
  id: number
}

export interface Credential {
  username: string
  password: string
}

export interface PullRequestSettingsEntry {
  // FIXME use UUID
  id: string
  /**
   * @maxLength 128
   */
  destination?: string
  /**
   * @maxLength 128
   */
  source?: string
  deleteSourceBranch: boolean
  autoMerge: boolean
  reviewSpec?: ReviewSpec
  standard: {
    checks: StandardChecks
    settings: StandardSettings
  }
}

// Replicated Bitbucket functionality because if the checks
// are enabled BB will report the PR as ready to merge
export interface StandardChecks {
  noChangesRequested: boolean
  noUnresolvedTasks: boolean
  successfulBuilds: number
}

// Mirrored to BB
export interface StandardSettings {
  shouldResetChanges: boolean
  // PREMIUM BB feature
  shouldResetApprovals: boolean
}

export type MergeCheckResult =
  | ReviewMergeCheckResult
  | (MergeCheckResultBase & {type: "generic"})

export interface MergeCheckResultBase {
  readonly description: string
  readonly status: "PASSED" | "PENDING" | "FAILED"
}

export interface PullRequestMergeCheckResult {
  settingId: UUID
  isAutoMerge: boolean
  checkResults: Array<MergeCheckResult>
}

export interface ReviewStatus {
  participant: User
  isApproved: boolean
}

export class QuotaResult {
  /**
   * @isInt
   */
  readonly required: number
  readonly isMet: boolean
  readonly pending: number

  constructor(quota: Quota, readonly total: number, readonly approved: number) {
    this.required =
      quota.type === "ABSOLUTE"
        ? quota.amount
        : Math.ceil((quota.amount / 100) * total)
    this.isMet = approved >= this.required
    this.pending = Math.max(0, this.required - approved)
  }
}

export interface ReviewMergeCheckResult extends MergeCheckResultBase {
  type: "review-merge-check"
  reviewGroup: ReviewGroup<NamedReviewer>
  reviewStatus: Array<ReviewStatus>
  quota: QuotaResult
}

export interface ReviewSpec {
  ignoreCommitterApprovals: boolean
  reviewGroups: Array<ReviewGroup>
}

export interface ReviewGroup<T = Reviewer> {
  reviewers: Array<T>
  quota: Quota
  filePattern?: string
  approvalMethod: "STANDARD" | "DIGITAL_SIGNATURE"
  requireSuccessfulBuilds: number
}

export interface UserReviewer {
  id: string
  type: "user"
}

export interface GroupReviewer {
  id: string
  type: "group"
}

export type Reviewer = GroupReviewer | UserReviewer

export type NamedReviewer =
  | (GroupReviewer & {name: string})
  | (UserReviewer & {name: string})

export class Quota {
  static readonly ZERO = new Quota(0)
  static readonly PCT_100 = new Quota(100, "PERCENT")

  /**
   * @isInt
   */
  readonly amount: number

  constructor(
    amount: number,
    readonly type: "PERCENT" | "ABSOLUTE" = "ABSOLUTE"
  ) {
    this.amount = amount
  }

  toString(): string {
    return `${this.amount}${this.type === "PERCENT" ? `%` : `+`}`
  }
}

export function newPullRequestSettingsEntry(
  id: string
): PullRequestSettingsEntry {
  return {
    id,
    autoMerge: true,
    deleteSourceBranch: true,
    standard: {
      checks: {
        noChangesRequested: true,
        noUnresolvedTasks: true,
        successfulBuilds: 0,
      },
      settings: {
        shouldResetApprovals: true,
        shouldResetChanges: false,
      },
    },
  }
}

export type PartialDiffStat = {new: {path: string}; old?: {path: string}}
export type PullRequest = SetRequired<Pullrequest, "id">
