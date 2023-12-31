/**
 * Bitbucket API
 * 2.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "oazapfts/lib/runtime"
import * as QS from "oazapfts/lib/runtime/query"
export const defaults: Oazapfts.RequestOpts = {
  baseUrl: "https://api.bitbucket.org/2.0",
}
const oazapfts = Oazapfts.runtime(defaults)
export const servers = {
  server1: "https://api.bitbucket.org/2.0",
}
export type Error = {
  type: string
  error?: {
    message: string
    detail?: string
    data?: {
      [key: string]: any
    }
  }
  [key: string]: any
}
export type SubjectTypes = {
  repository?: {
    events?: {
      href?: string
      name?: string
    }
  }
  user?: {
    events?: {
      href?: string
      name?: string
    }
  }
  team?: {
    events?: {
      href?: string
      name?: string
    }
  }
}
export type HookEvent = {
  event?:
    | "pullrequest:unapproved"
    | "issue:comment_created"
    | "repo:imported"
    | "repo:created"
    | "repo:commit_comment_created"
    | "pullrequest:approved"
    | "pullrequest:comment_updated"
    | "issue:updated"
    | "project:updated"
    | "repo:deleted"
    | "pullrequest:changes_request_created"
    | "pullrequest:comment_created"
    | "repo:commit_status_updated"
    | "pullrequest:updated"
    | "issue:created"
    | "repo:fork"
    | "pullrequest:comment_deleted"
    | "repo:commit_status_created"
    | "repo:updated"
    | "pullrequest:rejected"
    | "pullrequest:fulfilled"
    | "pullrequest:created"
    | "pullrequest:changes_request_removed"
    | "repo:transfer"
    | "repo:push"
  category?: string
  label?: string
  description?: string
}
export type PaginatedHookEvents = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: HookEvent[]
}
export type Object = {
  type: string
  [key: string]: any
}
export type Account = Object & {
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
    followers?: {
      href?: string
      name?: string
    }
    following?: {
      href?: string
      name?: string
    }
    repositories?: {
      href?: string
      name?: string
    }
  }
  username?: string
  nickname?: string
  account_status?: string
  display_name?: string
  website?: string
  created_on?: string
  uuid?: string
  has_2fa_enabled?: boolean
  [key: string]: any
}
export type Team = Account & {
  [key: string]: any
}
export type Project = Object & {
  links?: {
    html?: {
      href?: string
      name?: string
    }
    avatar?: {
      href?: string
      name?: string
    }
  }
  uuid?: string
  key?: string
  owner?: Team
  name?: string
  description?: string
  is_private?: boolean
  created_on?: string
  updated_on?: string
  has_publicly_visible_repos?: boolean
  [key: string]: any
}
export type Author = Object & {
  raw?: string
  user?: Account
  [key: string]: any
}
export type BaseCommit = Object & {
  "hash"?: string
  "date"?: string
  "author"?: Author
  "message"?: string
  "x-summary"?: {
    raw?: string
    markup?: "markdown" | "creole" | "plaintext"
    html?: string
  }
  "parents"?: BaseCommit[]
  [key: string]: any
}
export type User = Account & {
  is_staff?: boolean
  account_id?: string
  [key: string]: any
}
export type Participant = Object & {
  user?: User
  role?: "PARTICIPANT" | "REVIEWER"
  approved?: boolean
  state?: "approved" | "changes_requested"
  participated_on?: string
  [key: string]: any
}
export type Commit = BaseCommit & {
  repository?: Repository
  participants?: Participant[]
  [key: string]: any
}
export type Ref = {
  type: string
  links?: {
    self?: {
      href?: string
      name?: string
    }
    commits?: {
      href?: string
      name?: string
    }
    html?: {
      href?: string
      name?: string
    }
  }
  name?: string
  target?: Commit
  [key: string]: any
}
export type Branch = Ref & {
  merge_strategies?: ("merge_commit" | "squash" | "fast_forward")[]
  default_merge_strategy?: string
  [key: string]: any
}
export type Repository = Object & {
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
    pullrequests?: {
      href?: string
      name?: string
    }
    commits?: {
      href?: string
      name?: string
    }
    forks?: {
      href?: string
      name?: string
    }
    watchers?: {
      href?: string
      name?: string
    }
    downloads?: {
      href?: string
      name?: string
    }
    clone?: {
      href?: string
      name?: string
    }[]
    hooks?: {
      href?: string
      name?: string
    }
  }
  uuid?: string
  full_name?: string
  is_private?: boolean
  parent?: Repository
  scm?: "git"
  owner?: Account
  name?: string
  description?: string
  created_on?: string
  updated_on?: string
  size?: number
  language?: string
  has_issues?: boolean
  has_wiki?: boolean
  fork_policy?: "allow_forks" | "no_public_forks" | "no_forks"
  project?: Project
  mainbranch?: Branch
  [key: string]: any
}
export type PullRequestEndpoint = {
  repository?: Repository
  branch?: {
    name?: string
    merge_strategies?: ("merge_commit" | "squash" | "fast_forward")[]
    default_merge_strategy?: string
  }
  commit?: {
    hash?: string
  }
}
export type Pullrequest = Object & {
  "links"?: {
    self?: {
      href?: string
      name?: string
    }
    html?: {
      href?: string
      name?: string
    }
    commits?: {
      href?: string
      name?: string
    }
    approve?: {
      href?: string
      name?: string
    }
    diff?: {
      href?: string
      name?: string
    }
    diffstat?: {
      href?: string
      name?: string
    }
    comments?: {
      href?: string
      name?: string
    }
    activity?: {
      href?: string
      name?: string
    }
    merge?: {
      href?: string
      name?: string
    }
    decline?: {
      href?: string
      name?: string
    }
  }
  "id"?: number
  "title"?: string
  "rendered"?: {
    title?: {
      raw?: string
      markup?: "markdown" | "creole" | "plaintext"
      html?: string
    }
    description?: {
      raw?: string
      markup?: "markdown" | "creole" | "plaintext"
      html?: string
    }
    reason?: {
      raw?: string
      markup?: "markdown" | "creole" | "plaintext"
      html?: string
    }
  }
  "x-summary"?: {
    raw?: string
    markup?: "markdown" | "creole" | "plaintext"
    html?: string
  }
  "state"?: "MERGED" | "SUPERSEDED" | "OPEN" | "DECLINED"
  "author"?: Account
  "source"?: PullRequestEndpoint
  "destination"?: PullRequestEndpoint
  "merge_commit"?: {
    hash?: string
  }
  "comment_count"?: number
  "task_count"?: number
  "close_source_branch"?: boolean
  "closed_by"?: Account
  "reason"?: string
  "created_on"?: string
  "updated_on"?: string
  "reviewers"?: Account[]
  "participants"?: Participant[]
  [key: string]: any
}
export type PaginatedPullRequests = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Pullrequest[]
}
export type PaginatedRepositories = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Repository[]
}
export type Workspace = Object & {
  links?: {
    avatar?: {
      href?: string
      name?: string
    }
    html?: {
      href?: string
      name?: string
    }
    members?: {
      href?: string
      name?: string
    }
    owners?: {
      href?: string
      name?: string
    }
    projects?: {
      href?: string
      name?: string
    }
    repositories?: {
      href?: string
      name?: string
    }
    snippets?: {
      href?: string
      name?: string
    }
    self?: {
      href?: string
      name?: string
    }
  }
  uuid?: string
  name?: string
  slug?: string
  is_private?: boolean
  created_on?: string
  updated_on?: string
  [key: string]: any
}
export type Group = Object & {
  links?: {
    self?: {
      href?: string
      name?: string
    }
    html?: {
      href?: string
      name?: string
    }
  }
  owner?: Account
  workspace?: Workspace
  name?: string
  slug?: string
  full_slug?: string
  [key: string]: any
}
export type Branchrestriction = Object & {
  links?: {
    self?: {
      href?: string
      name?: string
    }
  }
  id?: number
  kind:
    | "require_tasks_to_be_completed"
    | "allow_auto_merge_when_builds_pass"
    | "require_passing_builds_to_merge"
    | "force"
    | "require_all_dependencies_merged"
    | "require_commits_behind"
    | "restrict_merges"
    | "enforce_merge_checks"
    | "reset_pullrequest_changes_requested_on_change"
    | "require_no_changes_requested"
    | "smart_reset_pullrequest_approvals"
    | "push"
    | "require_approvals_to_merge"
    | "require_default_reviewer_approvals_to_merge"
    | "reset_pullrequest_approvals_on_change"
    | "delete"
  branch_match_kind: "branching_model" | "glob"
  branch_type?:
    | "feature"
    | "bugfix"
    | "release"
    | "hotfix"
    | "development"
    | "production"
  pattern: string
  users?: Account[]
  groups?: Group[]
  value?: number
  [key: string]: any
}
export type PaginatedBranchRestrictions = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Branchrestriction[]
}
export type BranchingModel = Object & {
  branch_types?: {
    kind: "feature" | "bugfix" | "release" | "hotfix"
    prefix: string
  }[]
  development?: {
    branch?: Branch
    name: string
    use_mainbranch: boolean
  }
  production?: {
    branch?: Branch
    name: string
    use_mainbranch: boolean
  }
  [key: string]: any
}
export type BranchingModelSettings = Object & {
  links?: {
    self?: {
      href?: string
      name?: string
    }
  }
  branch_types?: {
    enabled?: boolean
    kind: "feature" | "bugfix" | "release" | "hotfix"
    prefix?: string
  }[]
  development?: {
    is_valid?: boolean
    name?: string
    use_mainbranch?: boolean
  }
  production?: {
    is_valid?: boolean
    name?: string
    use_mainbranch?: boolean
    enabled?: boolean
  }
  [key: string]: any
}
export type Comment = Object & {
  id?: number
  created_on?: string
  updated_on?: string
  content?: {
    raw?: string
    markup?: "markdown" | "creole" | "plaintext"
    html?: string
  }
  user?: User
  deleted?: boolean
  parent?: Comment
  inline?: {
    to?: number
    from?: number
    path: string
  }
  links?: {
    self?: {
      href?: string
      name?: string
    }
    html?: {
      href?: string
      name?: string
    }
    code?: {
      href?: string
      name?: string
    }
  }
  [key: string]: any
}
export type CommitComment = Comment & {
  commit?: Commit
  [key: string]: any
}
export type PaginatedCommitComments = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: CommitComment[]
}
export type ReportData = {
  type?:
    | "BOOLEAN"
    | "DATE"
    | "DURATION"
    | "LINK"
    | "NUMBER"
    | "PERCENTAGE"
    | "TEXT"
  title?: string
  value?: object
}
export type Report = Object & {
  uuid?: string
  title?: string
  details?: string
  external_id?: string
  reporter?: string
  link?: string
  remote_link_enabled?: boolean
  logo_url?: string
  report_type?: "SECURITY" | "COVERAGE" | "TEST" | "BUG"
  result?: "PASSED" | "FAILED" | "PENDING"
  data?: ReportData[]
  created_on?: string
  updated_on?: string
  [key: string]: any
}
export type PaginatedReports = {
  page?: number
  values?: Report[]
  size?: number
  pagelen?: number
  next?: string
  previous?: string
}
export type ReportAnnotation = Object & {
  "external_id"?: string
  "uuid"?: string
  "annotation_type"?: "VULNERABILITY" | "CODE_SMELL" | "BUG"
  "path"?: string
  "line"?: number
  "x-summary"?: string
  "details"?: string
  "result"?: "PASSED" | "FAILED" | "SKIPPED" | "IGNORED"
  "severity"?: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
  "link"?: string
  "created_on"?: string
  "updated_on"?: string
  [key: string]: any
}
export type PaginatedAnnotations = {
  page?: number
  values?: ReportAnnotation[]
  size?: number
  pagelen?: number
  next?: string
  previous?: string
}
export type Commitstatus = Object & {
  links?: {
    self?: {
      href?: string
      name?: string
    }
    commit?: {
      href?: string
      name?: string
    }
  }
  uuid?: string
  key?: string
  refname?: string
  url?: string
  state?: "SUCCESSFUL" | "FAILED" | "INPROGRESS" | "STOPPED"
  name?: string
  description?: string
  created_on?: string
  updated_on?: string
  [key: string]: any
}
export type PaginatedCommitStatuses = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Commitstatus[]
}
export type Page = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: BaseCommit[]
}
export type Component = Object & {
  links?: {
    self?: {
      href?: string
      name?: string
    }
  }
  name?: string
  id?: number
  [key: string]: any
}
export type PaginatedComponents = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Component[]
}
export type DeployKey = Object & {
  key?: string
  repository?: Repository
  comment?: string
  label?: string
  added_on?: string
  last_used?: string
  links?: {
    self?: {
      href?: string
      name?: string
    }
  }
  owner?: Account
  [key: string]: any
}
export type PaginatedDeployKeys = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: DeployKey[]
}
export type DeploymentState = Object & {
  [key: string]: any
}
export type DeploymentEnvironment = Object & {
  uuid?: string
  name?: string
  [key: string]: any
}
export type DeploymentRelease = Object & {
  uuid?: string
  name?: string
  url?: string
  commit?: Commit
  created_on?: string
  [key: string]: any
}
export type Deployment = Object & {
  uuid?: string
  state?: DeploymentState
  environment?: DeploymentEnvironment
  release?: DeploymentRelease
  [key: string]: any
}
export type PaginatedDeployments = {
  page?: number
  values?: Deployment[]
  size?: number
  pagelen?: number
  next?: string
  previous?: string
}
export type CommitFile = {
  type: string
  path?: string
  commit?: Commit
  attributes?: "link" | "executable" | "subrepository" | "binary" | "lfs"
  escaped_path?: string
  [key: string]: any
}
export type DiffStat = {
  type: string
  status?: "added" | "removed" | "modified" | "renamed"
  lines_added?: number
  lines_removed?: number
  old?: CommitFile
  new?: CommitFile
  [key: string]: any
}
export type PaginatedDiffStat = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: DiffStat[]
}
export type PaginatedDeploymentEnvironments = {
  page?: number
  values?: DeploymentEnvironment[]
  size?: number
  pagelen?: number
  next?: string
  previous?: string
}
export type PaginatedFiles = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: CommitFile[]
}
export type WebhookSubscription = Object & {
  uuid?: string
  url?: string
  description?: string
  subject_type?: "workspace" | "user" | "repository" | "team"
  subject?: Object
  active?: boolean
  created_at?: string
  events?: (
    | "pullrequest:unapproved"
    | "issue:comment_created"
    | "repo:imported"
    | "repo:created"
    | "repo:commit_comment_created"
    | "pullrequest:approved"
    | "pullrequest:comment_updated"
    | "issue:updated"
    | "project:updated"
    | "repo:deleted"
    | "pullrequest:changes_request_created"
    | "pullrequest:comment_created"
    | "repo:commit_status_updated"
    | "pullrequest:updated"
    | "issue:created"
    | "repo:fork"
    | "pullrequest:comment_deleted"
    | "repo:commit_status_created"
    | "repo:updated"
    | "pullrequest:rejected"
    | "pullrequest:fulfilled"
    | "pullrequest:created"
    | "pullrequest:changes_request_removed"
    | "repo:transfer"
    | "repo:push"
  )[]
  [key: string]: any
}
export type PaginatedWebhookSubscriptions = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: WebhookSubscription[]
}
export type Milestone = Object & {
  links?: {
    self?: {
      href?: string
      name?: string
    }
  }
  name?: string
  id?: number
  [key: string]: any
}
export type Version = Object & {
  links?: {
    self?: {
      href?: string
      name?: string
    }
  }
  name?: string
  id?: number
  [key: string]: any
}
export type Issue = Object & {
  links?: {
    self?: {
      href?: string
      name?: string
    }
    html?: {
      href?: string
      name?: string
    }
    comments?: {
      href?: string
      name?: string
    }
    attachments?: {
      href?: string
      name?: string
    }
    watch?: {
      href?: string
      name?: string
    }
    vote?: {
      href?: string
      name?: string
    }
  }
  id?: number
  repository?: Repository
  title?: string
  reporter?: User
  assignee?: User
  created_on?: string
  updated_on?: string
  edited_on?: string
  state?:
    | "new"
    | "open"
    | "resolved"
    | "on hold"
    | "invalid"
    | "duplicate"
    | "wontfix"
    | "closed"
  kind?: "bug" | "enhancement" | "proposal" | "task"
  priority?: "trivial" | "minor" | "major" | "critical" | "blocker"
  milestone?: Milestone
  version?: Version
  component?: Component
  votes?: number
  content?: {
    raw?: string
    markup?: "markdown" | "creole" | "plaintext"
    html?: string
  }
  [key: string]: any
}
export type PaginatedIssues = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Issue[]
}
export type ExportOptions = {
  type: string
  project_key?: string
  project_name?: string
  send_email?: boolean
  include_attachments?: boolean
  [key: string]: any
}
export type IssueJobStatus = {
  type?: string
  status?: "ACCEPTED" | "STARTED" | "RUNNING" | "FAILURE"
  phase?: string
  total?: number
  count?: number
  pct?: number
}
export type IssueAttachment = Object & {
  links?: {
    self?: {
      href?: string
      name?: string
    }
  }
  name?: string
  [key: string]: any
}
export type PaginatedIssueAttachment = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: IssueAttachment[]
}
export type IssueChange = {
  type: string
  links?: {
    self?: {
      href?: string
      name?: string
    }
    issue?: {
      href?: string
      name?: string
    }
  }
  name?: string
  created_on?: string
  user?: User
  issue?: Issue
  changes?: {
    assignee?: {
      old?: string
      new?: string
    }
    state?: {
      old?: string
      new?: string
    }
    title?: {
      old?: string
      new?: string
    }
    kind?: {
      old?: string
      new?: string
    }
    milestone?: {
      old?: string
      new?: string
    }
    component?: {
      old?: string
      new?: string
    }
    priority?: {
      old?: string
      new?: string
    }
    version?: {
      old?: string
      new?: string
    }
    content?: {
      old?: string
      new?: string
    }
  }
  message?: {
    raw?: string
    markup?: "markdown" | "creole" | "plaintext"
    html?: string
  }
  [key: string]: any
}
export type PaginatedLogEntries = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: IssueChange[]
}
export type IssueComment = Comment & {
  issue?: Issue
  [key: string]: any
}
export type PaginatedIssueComments = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: IssueComment[]
}
export type PaginatedMilestones = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Milestone[]
}
export type PullrequestComment = Comment & {
  pullrequest?: Pullrequest
  [key: string]: any
}
export type PaginatedPullRequestComments = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: PullrequestComment[]
}
export type PullRequestMergeParameters = {
  type: string
  message?: string
  close_source_branch?: boolean
  merge_strategy?: "merge_commit" | "squash" | "fast_forward"
  [key: string]: any
}
export type PaginatedRefs = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Ref[]
}
export type PaginatedBranches = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Branch[]
}
export type Tag = Ref & {
  message?: string
  date?: string
  tagger?: Author
  [key: string]: any
}
export type PaginatedTags = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Tag[]
}
export type TreeEntry = {
  type: string
  path?: string
  commit?: Commit
  [key: string]: any
}
export type PaginatedTreeEntry = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: TreeEntry[]
}
export type PaginatedVersions = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Version[]
}
export type Snippet = Object & {
  id?: number
  title?: string
  scm?: "git"
  created_on?: string
  updated_on?: string
  owner?: Account
  creator?: Account
  is_private?: boolean
  [key: string]: any
}
export type PaginatedSnippets = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Snippet[]
}
export type SnippetComment = Object & {
  links?: {
    self?: {
      href?: string
      name?: string
    }
    html?: {
      href?: string
      name?: string
    }
  }
  snippet?: Snippet
  [key: string]: any
}
export type PaginatedSnippetComments = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: SnippetComment[]
}
export type SnippetCommit = BaseCommit & {
  links?: {
    self?: {
      href?: string
      name?: string
    }
    html?: {
      href?: string
      name?: string
    }
    diff?: {
      href?: string
      name?: string
    }
  }
  snippet?: Snippet
  [key: string]: any
}
export type PaginatedSnippetCommits = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: SnippetCommit[]
}
export type PaginatedUsers = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: User[]
}
export type PaginatedTeams = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Team[]
}
export type TeamPermission = {
  type: string
  permission?: "admin" | "collaborator" | "member"
  user?: User
  team?: Team
  [key: string]: any
}
export type PaginatedTeamPermissions = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: TeamPermission[]
}
export type RepositoryPermission = {
  type: string
  permission?: "admin" | "write" | "read"
  user?: User
  repository?: Repository
  [key: string]: any
}
export type PaginatedRepositoryPermissions = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: RepositoryPermission[]
}
export type PaginatedProjects = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Project[]
}
export type SearchSegment = {
  text?: string
  match?: boolean
}
export type SearchLine = {
  line?: number
  segments?: SearchSegment[]
}
export type SearchContentMatch = {
  lines?: SearchLine[]
}
export type SearchCodeSearchResult = {
  type?: string
  content_match_count?: number
  content_matches?: SearchContentMatch[]
  path_matches?: SearchSegment[]
  file?: CommitFile
}
export type SearchResultPage = {
  size?: number
  page?: number
  pagelen?: number
  query_substituted?: boolean
  next?: string
  previous?: string
  values?: SearchCodeSearchResult[]
}
export type WorkspaceMembership = Object & {
  links?: {
    self?: {
      href?: string
      name?: string
    }
  }
  user?: Account
  workspace?: Workspace
  [key: string]: any
}
export type PaginatedWorkspaceMemberships = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: WorkspaceMembership[]
}
export type SshKey = Object & {
  uuid?: string
  key?: string
  comment?: string
  label?: string
  created_on?: string
  last_used?: string
  links?: {
    self?: {
      href?: string
      name?: string
    }
  }
  [key: string]: any
}
export type SshAccountKey = SshKey & {
  owner?: Account
  [key: string]: any
}
export type PaginatedSshUserKeys = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: SshAccountKey[]
}
export type PaginatedWorkspaces = {
  size?: number
  page?: number
  pagelen?: number
  next?: string
  previous?: string
  values?: Workspace[]
}
/**
 * Deletes the application for the user.
 *
 * This endpoint is intended to be used by Bitbucket Connect apps
 * and only supports JWT authentication -- that is how Bitbucket
 * identifies the particular installation of the app. Developers
 * with applications registered in the "Develop Apps" section
 * of Bitbucket Marketplace need not use this endpoint as
 * updates for those applications can be sent out via the
 * UI of that section.
 *
 * ```
 * $ curl -X DELETE https://api.bitbucket.org/2.0/addon \
 *   -H "Authorization: JWT <JWT Token>"
 * ```
 */
export function deleteAddon(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
  >("/addon", {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Updates the application installation for the user.
 *
 * This endpoint is intended to be used by Bitbucket Connect apps
 * and only supports JWT authentication -- that is how Bitbucket
 * identifies the particular installation of the app. Developers
 * with applications registered in the "Develop Apps" section
 * of Bitbucket Marketplace need not use this endpoint as
 * updates for those applications can be sent out via the
 * UI of that section.
 *
 * A new, valid descriptor must be provided in the body of the
 * PUT request.
 *
 * ```
 * $ curl -X PUT https://api.bitbucket.org/2.0/addon \
 *   -H "Authorization: JWT <JWT Token>" \
 *   --header "Content-Type: application/json" \
 *   --data '{"descriptor": $NEW_DESCRIPTOR}'
 * ```
 *
 * Note that the scopes of the application cannot be increased
 * in the new descriptor nor reduced to none.
 */
export function putAddon(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
  >("/addon", {
    ...opts,
    method: "PUT",
  })
}
/**
 * Gets a list of all [linkers](/cloud/bitbucket/modules/linker/)
 * for the authenticated application.
 */
export function getAddonLinkers(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 401
        data: Error
      }
  >("/addon/linkers", {
    ...opts,
  })
}
/**
 * Gets a [linker](/cloud/bitbucket/modules/linker/) specified by `linker_key`
 * for the authenticated application.
 */
export function getAddonLinkersByLinkerKey(
  linkerKey: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/addon/linkers/${linkerKey}`, {
    ...opts,
  })
}
/**
 * Delete all [linker](/cloud/bitbucket/modules/linker/) values for the
 * specified linker of the authenticated application.
 */
export function deleteAddonLinkersByLinkerKeyValues(
  linkerKey: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/addon/linkers/${linkerKey}/values`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Gets a list of all [linker](/cloud/bitbucket/modules/linker/) values for the
 * specified linker of the authenticated application.
 *
 * A linker value lets applications supply values to modify its regular
 * expression.
 *
 * The base regular expression must use a Bitbucket-specific match group `(?K)`
 * which will be translated to `([\w\-]+)`. A value must match this pattern.
 *
 * [Read more about linker
 * values](/cloud/bitbucket/modules/linker/#usingthebitbucketapitosupplyvalues)
 */
export function getAddonLinkersByLinkerKeyValues(
  linkerKey: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/addon/linkers/${linkerKey}/values`, {
    ...opts,
  })
}
/**
 * Creates a [linker](/cloud/bitbucket/modules/linker/) value for the specified
 * linker of authenticated application.
 *
 * A linker value lets applications supply values to modify its regular
 * expression.
 *
 * The base regular expression must use a Bitbucket-specific match group `(?K)`
 * which will be translated to `([\w\-]+)`. A value must match this pattern.
 *
 * [Read more about linker
 * values](/cloud/bitbucket/modules/linker/#usingthebitbucketapitosupplyvalues)
 */
export function postAddonLinkersByLinkerKeyValues(
  linkerKey: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
    | {
        status: 409
        data: Error
      }
  >(`/addon/linkers/${linkerKey}/values`, {
    ...opts,
    method: "POST",
  })
}
/**
 * Bulk update [linker](/cloud/bitbucket/modules/linker/) values for the
 * specified linker of the authenticated application.
 *
 * A linker value lets applications supply values to modify its regular
 * expression.
 *
 * The base regular expression must use a Bitbucket-specific match group `(?K)`
 * which will be translated to `([\w\-]+)`. A value must match this pattern.
 *
 * [Read more about linker
 * values](/cloud/bitbucket/modules/linker/#usingthebitbucketapitosupplyvalues)
 */
export function putAddonLinkersByLinkerKeyValues(
  linkerKey: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/addon/linkers/${linkerKey}/values`, {
    ...opts,
    method: "PUT",
  })
}
/**
 * Delete a single [linker](/cloud/bitbucket/modules/linker/) value
 * of the authenticated application.
 */
export function deleteAddonLinkersByLinkerKeyValuesAndValueId(
  linkerKey: string,
  valueId: number,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/addon/linkers/${linkerKey}/values/${valueId}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Get a single [linker](/cloud/bitbucket/modules/linker/) value
 * of the authenticated application.
 */
export function getAddonLinkersByLinkerKeyValuesAndValueId(
  linkerKey: string,
  valueId: number,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/addon/linkers/${linkerKey}/values/${valueId}`, {
    ...opts,
  })
}
/**
 * Returns the webhook resource or subject types on which webhooks can
 * be registered.
 *
 * Each resource/subject type contains an `events` link that returns the
 * paginated list of specific events each individual subject type can
 * emit.
 *
 * This endpoint is publicly accessible and does not require
 * authentication or scopes.
 *
 * Example:
 *
 * ```
 * $ curl https://api.bitbucket.org/2.0/hook_events
 *
 * {
 *     "repository": {
 *         "links": {
 *             "events": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/hook_events/repository"
 *             }
 *         }
 *     },
 *     "team": {
 *         "links": {
 *             "events": {
 *                 "href": "https://api.bitbucket.org/2.0/hook_events/team"
 *             }
 *         }
 *     },
 *     "user": {
 *         "links": {
 *             "events": {
 *                 "href": "https://api.bitbucket.org/2.0/hook_events/user"
 *             }
 *         }
 *     }
 * }
 * ```
 */
export function getHookEvents(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<{
    status: 200
    data: SubjectTypes
  }>("/hook_events", {
    ...opts,
  })
}
/**
 * Returns a paginated list of all valid webhook events for the
 * specified entity.
 * **The team and user webhooks are deprecated, and you should use workspace
 * instead. For more information, see [the
 * announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 *
 * This is public data that does not require any scopes or authentication.
 *
 * Example:
 *
 * NOTE: The following example is a truncated response object for the
 * `workspace` `subject_type`. We return the same structure for the other
 * `subject_type` objects.
 *
 * ```
 * $ curl https://api.bitbucket.org/2.0/hook_events/workspace
 * {
 *     "page": 1,
 *     "pagelen": 30,
 *     "size": 21,
 *     "values": [
 *         {
 *             "category": "Repository",
 *             "description": "Whenever a repository push occurs",
 *             "event": "repo:push",
 *             "label": "Push"
 *         },
 *         {
 *             "category": "Repository",
 *             "description": "Whenever a repository fork occurs",
 *             "event": "repo:fork",
 *             "label": "Fork"
 *         },
 *         {
 *             "category": "Repository",
 *             "description": "Whenever a repository import occurs",
 *             "event": "repo:imported",
 *             "label": "Import"
 *         },
 *         ...
 *         {
 *             "category":"Pull Request",
 *             "label":"Approved",
 *             "description":"When someone has approved a pull request",
 *             "event":"pullrequest:approved"
 *         },
 *     ]
 * }
 * ```
 */
export function getHookEventsBySubjectType(
  subjectType: "workspace" | "user" | "repository" | "team",
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedHookEvents
      }
    | {
        status: 404
        data: Error
      }
  >(`/hook_events/${subjectType}`, {
    ...opts,
  })
}
/**
 * Returns all pull requests authored by the specified user.
 *
 * By default only open pull requests are returned. This can be controlled
 * using the `state` query parameter. To retrieve pull requests that are
 * in one of multiple states, repeat the `state` parameter for each
 * individual state.
 *
 * This endpoint also supports filtering and sorting of the results. See
 * [filtering and sorting](../../../../meta/filtering) for more details.
 */
export function getPullrequestsBySelectedUser(
  selectedUser: string,
  {
    state,
  }: {
    state?: "MERGED" | "SUPERSEDED" | "OPEN" | "DECLINED"
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedPullRequests
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/pullrequests/${selectedUser}${QS.query(
      QS.form({
        state,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns a paginated list of all public repositories.
 *
 * This endpoint also supports filtering and sorting of the results. See
 * [filtering and sorting](../meta/filtering) for more details.
 */
export function getRepositories(
  {
    after,
    role,
    q,
    sort,
  }: {
    after?: string
    role?: "admin" | "contributor" | "member" | "owner"
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedRepositories
  }>(
    `/repositories${QS.query(
      QS.form({
        after,
        role,
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns a paginated list of all repositories owned by the specified
 * account or UUID.
 *
 * The result can be narrowed down based on the authenticated user's role.
 *
 * E.g. with `?role=contributor`, only those repositories that the
 * authenticated user has write access to are returned (this includes any
 * repo the user is an admin on, as that implies write access).
 *
 * This endpoint also supports filtering and sorting of the results. See
 * [filtering and sorting](../../meta/filtering) for more details.
 */
export function getRepositoriesByWorkspace(
  workspace: string,
  {
    role,
    q,
    sort,
  }: {
    role?: "admin" | "contributor" | "member" | "owner"
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedRepositories
      }
    | {
        status: 404
        data: Error
      }
    | {
        status: 410
        data: Error
      }
  >(
    `/repositories/${workspace}${QS.query(
      QS.form({
        role,
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Deletes the repository. This is an irreversible operation.
 *
 * This does not affect its forks.
 */
export function deleteRepositoriesByWorkspaceAndRepoSlug(
  repoSlug: string,
  workspace: string,
  {
    redirectTo,
  }: {
    redirectTo?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}${QS.query(
      QS.form({
        redirect_to: redirectTo,
      })
    )}`,
    {
      ...opts,
      method: "DELETE",
    }
  )
}
/**
 * Returns the object describing this repository.
 */
export function getRepositoriesByWorkspaceAndRepoSlug(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Repository
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}`, {
    ...opts,
  })
}
/**
 * Creates a new repository.
 *
 * Note: In order to set the project for the newly created repository,
 * pass in either the project key or the project UUID as part of the
 * request body as shown in the examples below:
 *
 * ```
 * $ curl -X POST -H "Content-Type: application/json" -d '{
 *     "scm": "git",
 *     "project": {
 *         "key": "MARS"
 *     }
 * }' https://api.bitbucket.org/2.0/repositories/teamsinspace/hablanding
 * ```
 *
 * or
 *
 * ```
 * $ curl -X POST -H "Content-Type: application/json" -d '{
 *     "scm": "git",
 *     "project": {
 *         "key": "{ba516952-992a-4c2d-acbd-17d502922f96}"
 *     }
 * }' https://api.bitbucket.org/2.0/repositories/teamsinspace/hablanding
 * ```
 *
 * The project must be assigned for all repositories. If the project is not
 * provided, the repository is automatically assigned to the oldest project in
 * the workspace.
 *
 * Note: In the examples above, the workspace ID `teamsinspace`,
 * and/or the repository name `hablanding` can be replaced by UUIDs.
 */
export function postRepositoriesByWorkspaceAndRepoSlug(
  repoSlug: string,
  workspace: string,
  repository?: Repository,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Repository
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 401
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: repository,
    })
  )
}
/**
 * Since this endpoint can be used to both update and to create a
 * repository, the request body depends on the intent.
 *
 * #### Creation
 *
 * See the POST documentation for the repository endpoint for an example
 * of the request body.
 *
 * #### Update
 *
 * Note: Changing the `name` of the repository will cause the location to
 * be changed. This is because the URL of the repo is derived from the
 * name (a process called slugification). In such a scenario, it is
 * possible for the request to fail if the newly created slug conflicts
 * with an existing repository's slug. But if there is no conflict,
 * the new location will be returned in the `Location` header of the
 * response.
 */
export function putRepositoriesByWorkspaceAndRepoSlug(
  repoSlug: string,
  workspace: string,
  repository?: Repository,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Repository
      }
    | {
        status: 201
        data: Repository
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 401
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}`,
    oazapfts.json({
      ...opts,
      method: "PUT",
      body: repository,
    })
  )
}
/**
 * Returns a paginated list of all branch restrictions on the
 * repository.
 */
export function getRepositoriesByWorkspaceAndRepoSlugBranchRestrictions(
  repoSlug: string,
  workspace: string,
  {
    kind,
    pattern,
  }: {
    kind?: string
    pattern?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedBranchRestrictions
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/branch-restrictions${QS.query(
      QS.form({
        kind,
        pattern,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Creates a new branch restriction rule for a repository.
 *
 * `kind` describes what will be restricted. Allowed values include:
 * `push`, `force`, `delete` and `restrict_merges`.
 *
 * Different kinds of branch restrictions have different requirements:
 *
 * * `push` and `restrict_merges` require `users` and `groups` to be
 *   specified. Empty lists are allowed, in which case permission is
 *   denied for everybody.
 *
 * The restriction applies to all branches that match. There are
 * two ways to match a branch. It is configured in `branch_match_kind`:
 *
 * 1. `glob`: Matches a branch against the `pattern`. A `'*'` in
 *    `pattern` will expand to match zero or more characters, and every
 *    other character matches itself. For example, `'foo*'` will match
 *    `'foo'` and `'foobar'`, but not `'barfoo'`. `'*'` will match all
 *    branches.
 * 2. `branching_model`: Matches a branch against the repository's
 *    branching model. The `branch_type` controls the type of branch
 *    to match. Allowed values include: `production`, `development`,
 *    `bugfix`, `release`, `feature` and `hotfix`.
 *
 * The combination of `kind` and match must be unique. This means that
 * two `glob` restrictions in a repository cannot have the same `kind` and
 * `pattern`. Additionally, two `branching_model` restrictions in a
 * repository cannot have the same `kind` and `branch_type`.
 *
 * `users` and `groups` are lists of users and groups that are except from
 * the restriction. They can only be configured in `push` and
 * `restrict_merges` restrictions. The `push` restriction stops a user
 * pushing to matching branches unless that user is in `users` or is a
 * member of a group in `groups`. The `restrict_merges` stops a user
 * merging pull requests to matching branches unless that user is in
 * `users` or is a member of a group in `groups`. Adding new users or
 * groups to an existing restriction should be done via `PUT`.
 *
 * Note that branch restrictions with overlapping matchers is allowed,
 * but the resulting behavior may be surprising.
 */
export function postRepositoriesByWorkspaceAndRepoSlugBranchRestrictions(
  repoSlug: string,
  workspace: string,
  branchrestriction: Branchrestriction,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: Branchrestriction
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/branch-restrictions`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: branchrestriction,
    })
  )
}
/**
 * Deletes an existing branch restriction rule.
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugBranchRestrictionsId(
  id: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/branch-restrictions/${id}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Returns a specific branch restriction rule.
 */
export function getRepositoriesByWorkspaceAndRepoSlugBranchRestrictionsId(
  id: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Branchrestriction
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/branch-restrictions/${id}`, {
    ...opts,
  })
}
/**
 * Updates an existing branch restriction rule.
 *
 * Fields not present in the request body are ignored.
 *
 * See [`POST`](../branch-restrictions#post) for details.
 */
export function putRepositoriesByWorkspaceAndRepoSlugBranchRestrictionsId(
  id: string,
  repoSlug: string,
  workspace: string,
  branchrestriction: Branchrestriction,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Branchrestriction
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/branch-restrictions/${id}`,
    oazapfts.json({
      ...opts,
      method: "PUT",
      body: branchrestriction,
    })
  )
}
/**
 * Return the branching model as applied to the repository. This view is
 * read-only. The branching model settings can be changed using the
 * [settings](branching-model/settings#get) API.
 *
 * The returned object:
 *
 * 1. Always has a `development` property. `development.branch` contains
 *    the actual repository branch object that is considered to be the
 *    `development` branch. `development.branch` will not be present
 *    if it does not exist.
 * 2. Might have a `production` property. `production` will not
 *    be present when `production` is disabled.
 *    `production.branch` contains the actual branch object that is
 *    considered to be the `production` branch. `production.branch` will
 *    not be present if it does not exist.
 * 3. Always has a `branch_types` array which contains all enabled branch
 *    types.
 *
 * Example body:
 *
 * ```
 * {
 *   "development": {
 *     "name": "master",
 *     "branch": {
 *       "type": "branch",
 *       "name": "master",
 *       "target": {
 *         "hash": "16dffcb0de1b22e249db6799532074cf32efe80f"
 *       }
 *     },
 *     "use_mainbranch": true
 *   },
 *   "production": {
 *     "name": "production",
 *     "branch": {
 *       "type": "branch",
 *       "name": "production",
 *       "target": {
 *         "hash": "16dffcb0de1b22e249db6799532074cf32efe80f"
 *       }
 *     },
 *     "use_mainbranch": false
 *   },
 *   "branch_types": [
 *     {
 *       "kind": "release",
 *       "prefix": "release/"
 *     },
 *     {
 *       "kind": "hotfix",
 *       "prefix": "hotfix/"
 *     },
 *     {
 *       "kind": "feature",
 *       "prefix": "feature/"
 *     },
 *     {
 *       "kind": "bugfix",
 *       "prefix": "bugfix/"
 *     }
 *   ],
 *   "type": "branching_model",
 *   "links": {
 *     "self": {
 *       "href": "https://api.bitbucket.org/.../branching-model"
 *     }
 *   }
 * }
 * ```
 */
export function getRepositoriesByWorkspaceAndRepoSlugBranchingModel(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: BranchingModel
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/branching-model`, {
    ...opts,
  })
}
/**
 * Return the branching model configuration for a repository. The returned
 * object:
 *
 * 1. Always has a `development` property for the development branch.
 * 2. Always a `production` property for the production branch. The
 *    production branch can be disabled.
 * 3. The `branch_types` contains all the branch types.
 *
 * This is the raw configuration for the branching model. A client
 * wishing to see the branching model with its actual current branches may
 * find the [active model API](../branching-model#get) more useful.
 *
 * Example body:
 *
 * ```
 * {
 *   "development": {
 *     "is_valid": true,
 *     "name": null,
 *     "use_mainbranch": true
 *   },
 *   "production": {
 *     "is_valid": true,
 *     "name": "production",
 *     "use_mainbranch": false,
 *     "enabled": false
 *   },
 *   "branch_types": [
 *     {
 *       "kind": "release",
 *       "enabled": true,
 *       "prefix": "release/"
 *     },
 *     {
 *       "kind": "hotfix",
 *       "enabled": true,
 *       "prefix": "hotfix/"
 *     },
 *     {
 *       "kind": "feature",
 *       "enabled": true,
 *       "prefix": "feature/"
 *     },
 *     {
 *       "kind": "bugfix",
 *       "enabled": false,
 *       "prefix": "bugfix/"
 *     }
 *   ],
 *   "type": "branching_model_settings",
 *   "links": {
 *     "self": {
 *       "href": "https://api.bitbucket.org/.../branching-model/settings"
 *     }
 *   }
 * }
 * ```
 */
export function getRepositoriesByWorkspaceAndRepoSlugBranchingModelSettings(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: BranchingModelSettings
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/branching-model/settings`, {
    ...opts,
  })
}
/**
 * Update the branching model configuration for a repository.
 *
 * The `development` branch can be configured to a specific branch or to
 * track the main branch. When set to a specific branch it must
 * currently exist. Only the passed properties will be updated. The
 * properties not passed will be left unchanged. A request without a
 * `development` property will leave the development branch unchanged.
 *
 * It is possible for the `development` branch to be invalid. This
 * happens when it points at a specific branch that has been
 * deleted. This is indicated in the `is_valid` field for the branch. It is
 * not possible to update the settings for `development` if that
 * would leave the branch in an invalid state. Such a request will be
 * rejected.
 *
 * The `production` branch can be a specific branch, the main
 * branch or disabled. When set to a specific branch it must currently
 * exist. The `enabled` property can be used to enable (`true`) or
 * disable (`false`) it. Only the passed properties will be updated. The
 * properties not passed will be left unchanged. A request without a
 * `production` property will leave the production branch unchanged.
 *
 * It is possible for the `production` branch to be invalid. This
 * happens when it points at a specific branch that has been
 * deleted. This is indicated in the `is_valid` field for the branch. A
 * request that would leave `production` enabled and invalid will be
 * rejected. It is possible to update `production` and make it invalid if
 * it would also be left disabled.
 *
 * The `branch_types` property contains the branch types to be updated.
 * Only the branch types passed will be updated. All updates will be
 * rejected if it would leave the branching model in an invalid state.
 * For branch types this means that:
 *
 * 1. The prefixes for all enabled branch types are valid. For example,
 *    it is not possible to use '*' inside a Git prefix.
 * 2. A prefix of an enabled branch type must not be a prefix of another
 *    enabled branch type. This is to ensure that a branch can be easily
 *    classified by its prefix unambiguously.
 *
 * It is possible to store an invalid prefix if that branch type would be
 * left disabled. Only the passed properties will be updated. The
 * properties not passed will be left unchanged. Each branch type must
 * have a `kind` property to identify it.
 *
 * Example Body:
 *
 * ```
 *     {
 *       "development": {
 *         "use_mainbranch": true
 *       },
 *       "production": {
 *         "enabled": true,
 *         "use_mainbranch": false,
 *         "name": "production"
 *       },
 *       "branch_types": [
 *         {
 *           "kind": "bugfix",
 *           "enabled": true,
 *           "prefix": "bugfix/"
 *         },
 *         {
 *           "kind": "feature",
 *           "enabled": true,
 *           "prefix": "feature/"
 *         },
 *         {
 *           "kind": "hotfix",
 *           "prefix": "hotfix/"
 *         },
 *         {
 *           "kind": "release",
 *           "enabled": false,
 *         }
 *       ]
 *     }
 * ```
 */
export function putRepositoriesByWorkspaceAndRepoSlugBranchingModelSettings(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: BranchingModelSettings
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/branching-model/settings`, {
    ...opts,
    method: "PUT",
  })
}
/**
 * Returns the specified commit.
 *
 * Example:
 *
 * ```
 * $ curl
 * https://api.bitbucket.org/2.0/repositories/bitbucket/geordi/commit/f7591a1
 * {
 *     "rendered": {
 *         "message": {
 *         "raw": "Add a GEORDI_OUTPUT_DIR setting",
 *         "markup": "markdown",
 *         "html": "<p>Add a GEORDI_OUTPUT_DIR setting</p>",
 *         "type": "rendered"
 *         }
 *     },
 *     "hash": "f7591a13eda445d9a9167f98eb870319f4b6c2d8",
 *     "repository": {
 *         "name": "geordi",
 *         "type": "repository",
 *         "full_name": "bitbucket/geordi",
 *         "links": {
 *             "self": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/repositories/bitbucket/geordi"
 *             },
 *             "html": {
 *                 "href": "https://bitbucket.org/bitbucket/geordi"
 *             },
 *             "avatar": {
 *                 "href":
 * "https://bytebucket.org/ravatar/%7B85d08b4e-571d-44e9-a507-fa476535aa98%7D?ts=1730260"
 *             }
 *         },
 *         "uuid": "{85d08b4e-571d-44e9-a507-fa476535aa98}"
 *     },
 *     "links": {
 *         "self": {
 *             "href":
 * "https://api.bitbucket.org/2.0/repositories/bitbucket/geordi/commit/f7591a13eda445d9a9167f98eb870319f4b6c2d8"
 *         },
 *         "comments": {
 *             "href":
 * "https://api.bitbucket.org/2.0/repositories/bitbucket/geordi/commit/f7591a13eda445d9a9167f98eb870319f4b6c2d8/comments"
 *         },
 *         "patch": {
 *             "href":
 * "https://api.bitbucket.org/2.0/repositories/bitbucket/geordi/patch/f7591a13eda445d9a9167f98eb870319f4b6c2d8"
 *         },
 *         "html": {
 *             "href":
 * "https://bitbucket.org/bitbucket/geordi/commits/f7591a13eda445d9a9167f98eb870319f4b6c2d8"
 *         },
 *         "diff": {
 *             "href":
 * "https://api.bitbucket.org/2.0/repositories/bitbucket/geordi/diff/f7591a13eda445d9a9167f98eb870319f4b6c2d8"
 *         },
 *         "approve": {
 *             "href":
 * "https://api.bitbucket.org/2.0/repositories/bitbucket/geordi/commit/f7591a13eda445d9a9167f98eb870319f4b6c2d8/approve"
 *         },
 *         "statuses": {
 *             "href":
 * "https://api.bitbucket.org/2.0/repositories/bitbucket/geordi/commit/f7591a13eda445d9a9167f98eb870319f4b6c2d8/statuses"
 *         }
 *     },
 *     "author": {
 *         "raw": "Brodie Rao <a@b.c>",
 *         "type": "author",
 *         "user": {
 *             "display_name": "Brodie Rao",
 *             "uuid": "{9484702e-c663-4afd-aefb-c93a8cd31c28}",
 *             "links": {
 *                 "self": {
 *                     "href":
 * "https://api.bitbucket.org/2.0/users/%7B9484702e-c663-4afd-aefb-c93a8cd31c28%7D"
 *                 },
 *                 "html": {
 *                     "href":
 * "https://bitbucket.org/%7B9484702e-c663-4afd-aefb-c93a8cd31c28%7D/"
 *                 },
 *                 "avatar": {
 *                     "href":
 * "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/557058:3aae1e05-702a-41e5-81c8-f36f29afb6ca/613070db-28b0-421f-8dba-ae8a87e2a5c7/128"
 *                 }
 *             },
 *             "type": "user",
 *             "nickname": "brodie",
 *             "account_id": "557058:3aae1e05-702a-41e5-81c8-f36f29afb6ca"
 *         }
 *     },
 *     "x-summary": {
 *         "raw": "Add a GEORDI_OUTPUT_DIR setting",
 *         "markup": "markdown",
 *         "html": "<p>Add a GEORDI_OUTPUT_DIR setting</p>",
 *         "type": "rendered"
 *     },
 *     "participants": [],
 *     "parents": [
 *         {
 *             "type": "commit",
 *             "hash": "f06941fec4ef6bcb0c2456927a0cf258fa4f899b",
 *             "links": {
 *                 "self": {
 *                     "href":
 * "https://api.bitbucket.org/2.0/repositories/bitbucket/geordi/commit/f06941fec4ef6bcb0c2456927a0cf258fa4f899b"
 *                 },
 *                 "html": {
 *                     "href":
 * "https://bitbucket.org/bitbucket/geordi/commits/f06941fec4ef6bcb0c2456927a0cf258fa4f899b"
 *                 }
 *             }
 *         }
 *     ],
 *     "date": "2012-07-16T19:37:54+00:00",
 *     "message": "Add a GEORDI_OUTPUT_DIR setting",
 *     "type": "commit"
 * }
 * ```
 */
export function getRepositoriesByWorkspaceAndRepoSlugCommitCommit(
  commit: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Commit
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/commit/${commit}`, {
    ...opts,
  })
}
/**
 * Redact the authenticated user's approval of the specified commit.
 *
 * This operation is only available to users that have explicit access to
 * the repository. In contrast, just the fact that a repository is
 * publicly accessible to users does not give them the ability to approve
 * commits.
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugCommitCommitApprove(
  commit: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/commit/${commit}/approve`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Approve the specified commit as the authenticated user.
 *
 * This operation is only available to users that have explicit access to
 * the repository. In contrast, just the fact that a repository is
 * publicly accessible to users does not give them the ability to approve
 * commits.
 */
export function postRepositoriesByWorkspaceAndRepoSlugCommitCommitApprove(
  commit: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Participant
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/commit/${commit}/approve`, {
    ...opts,
    method: "POST",
  })
}
/**
 * Returns the commit's comments.
 *
 * This includes both global and inline comments.
 *
 * The default sorting is oldest to newest and can be overridden with
 * the `sort` query parameter.
 */
export function getRepositoriesByWorkspaceAndRepoSlugCommitCommitComments(
  commit: string,
  repoSlug: string,
  workspace: string,
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedCommitComments
  }>(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/comments${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Creates new comment on the specified commit.
 *
 * To post a reply to an existing comment, include the `parent.id` field:
 *
 * ```
 * $ curl
 * https://api.bitbucket.org/2.0/repositories/atlassian/prlinks/commit/db9ba1e031d07a02603eae0e559a7adc010257fc/comments/
 * \
 *   -X POST -u evzijst \
 *   -H 'Content-Type: application/json' \
 *   -d '{"content": {"raw": "One more thing!"},
 *        "parent": {"id": 5728901}}'
 * ```
 */
export function postRepositoriesByWorkspaceAndRepoSlugCommitCommitComments(
  commit: string,
  repoSlug: string,
  workspace: string,
  commitComment: CommitComment,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/comments`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: commitComment,
    })
  )
}
/**
 * Returns the specified commit comment.
 */
export function getRepositoriesByWorkspaceAndRepoSlugCommitCommitCommentsCommentId(
  commentId: number,
  commit: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: 200
    data: CommitComment
  }>(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/comments/${commentId}`,
    {
      ...opts,
    }
  )
}
/**
 * Update an [application property](/cloud/bitbucket/application-properties/)
 * value stored against a commit.
 */
export function updateCommitHostedPropertyValue(
  workspace: string,
  repoSlug: string,
  commit: string,
  appKey: string,
  propertyName: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/properties/${appKey}/${propertyName}`,
    {
      ...opts,
      method: "PUT",
    }
  )
}
/**
 * Delete an [application property](/cloud/bitbucket/application-properties/)
 * value stored against a commit.
 */
export function deleteCommitHostedPropertyValue(
  workspace: string,
  repoSlug: string,
  commit: string,
  appKey: string,
  propertyName: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/properties/${appKey}/${propertyName}`,
    {
      ...opts,
      method: "DELETE",
    }
  )
}
/**
 * Retrieve an [application property](/cloud/bitbucket/application-properties/)
 * value stored against a commit.
 */
export function getCommitHostedPropertyValue(
  workspace: string,
  repoSlug: string,
  commit: string,
  appKey: string,
  propertyName: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/properties/${appKey}/${propertyName}`,
    {
      ...opts,
    }
  )
}
export function getPullrequestsForCommit(
  workspace: string,
  repoSlug: string,
  commit: string,
  {
    page,
    pagelen,
  }: {
    page?: number
    pagelen?: number
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedPullRequests
      }
    | {
        status: 202
        data: PaginatedPullRequests
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/pullrequests${QS.query(
      QS.form({
        page,
        pagelen,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns a paginated list of Reports linked to this commit.
 */
export function getReportsForCommit(
  workspace: string,
  repoSlug: string,
  commit: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedReports
  }>(`/repositories/${workspace}/${repoSlug}/commit/${commit}/reports`, {
    ...opts,
  })
}
/**
 * Creates or updates a report for the specified commit.
 * To upload a report, make sure to generate an ID that is unique across all
 * reports for that commit. If you want to use an existing id from your own
 * system, we recommend prefixing it with your system's name to avoid
 * collisions, for example, mySystem-001.
 *
 * ### Sample cURL request:
 * ```
 * curl --request PUT
 * 'https://api.bitbucket.org/2.0/repositories/<username>/<reposity-name>/commit/<commit-hash>/reports/mysystem-001'
 * \
 * --header 'Content-Type: application/json' \
 * --data-raw '{
 *     "title": "Security scan report",
 *     "details": "This pull request introduces 10 new dependency
 * vulnerabilities.",
 *     "report_type": "SECURITY",
 *     "reporter": "mySystem",
 *     "link": "http://www.mysystem.com/reports/001",
 *     "result": "FAILED",
 *     "data": [
 *         {
 *             "title": "Duration (seconds)",
 *             "type": "DURATION",
 *             "value": 14
 *         },
 *         {
 *             "title": "Safe to merge?",
 *             "type": "BOOLEAN",
 *             "value": false
 *         }
 *     ]
 * }'
 * ```
 *
 * ### Possible field values:
 * report_type: SECURITY, COVERAGE, TEST, BUG
 * result: PASSED, FAILED, PENDING
 * data.type: BOOLEAN, DATE, DURATION, LINK, NUMBER, PERCENTAGE, TEXT
 *
 * #### Data field formats
 * | Type  Field   | Value Field Type  | Value Field Display |
 * |:--------------|:------------------|:--------------------|
 * | None/ Omitted | Number, String or Boolean (not an array or object) | Plain
 * text |
 * | BOOLEAN	| Boolean | The value will be read as a JSON boolean and
 * displayed as 'Yes' or 'No'. |
 * | DATE  | Number | The value will be read as a JSON number in the form of a
 * Unix timestamp (milliseconds) and will be displayed as a relative date if
 * the date is less than one week ago, otherwise  it will be displayed as an
 * absolute date. |
 * | DURATION | Number | The value will be read as a JSON number in
 * milliseconds and will be displayed in a human readable duration format. |
 * | LINK | Object: `{"text": "Link text here", "href":
 * "https://link.to.annotation/in/external/tool"}` | The value will be read as
 * a JSON object containing the fields "text" and "href" and will be displayed
 * as a clickable link on the report. |
 * | NUMBER | Number | The value will be read as a JSON number and large
 * numbers will be  displayed in a human readable format (e.g. 14.3k). |
 * | PERCENTAGE | Number (between 0 and 100) | The value will be read as a JSON
 * number between 0 and 100 and will be displayed with a percentage sign. |
 * | TEXT | String | The value will be read as a JSON string and will be
 * displayed as-is |
 *
 * Please refer to the [Code Insights
 * documentation](https://confluence.atlassian.com/bitbucket/code-insights-994316785.html)
 * for more information.
 *
 */
export function createOrUpdateReport(
  workspace: string,
  repoSlug: string,
  commit: string,
  reportId: string,
  report: Report,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Report
      }
    | {
        status: 400
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/reports/${reportId}`,
    oazapfts.json({
      ...opts,
      method: "PUT",
      body: report,
    })
  )
}
/**
 * Returns a single Report matching the provided ID.
 */
export function getReport(
  workspace: string,
  repoSlug: string,
  commit: string,
  reportId: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Report
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/reports/${reportId}`,
    {
      ...opts,
    }
  )
}
/**
 * Deletes a single Report matching the provided ID.
 */
export function deleteReport(
  workspace: string,
  repoSlug: string,
  commit: string,
  reportId: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/reports/${reportId}`,
    {
      ...opts,
      method: "DELETE",
    }
  )
}
/**
 * Bulk upload of annotations.
 * Annotations are individual findings that have been identified as part of a
 * report, for example, a line of code that represents a vulnerability. These
 * annotations can be attached to a specific file and even a specific line in
 * that file, however, that is optional. Annotations are not mandatory and a
 * report can contain up to 1000 annotations.
 *
 * Add the annotations you want to upload as objects in a JSON array and make
 * sure each annotation has the external_id field set to a unique value. If you
 * want to use an existing id from your own system, we recommend prefixing it
 * with your system's name to avoid collisions, for example,
 * mySystem-annotation001. The external id can later be used to identify the
 * report as an alternative to the generated
 * [UUID](https://developer.atlassian.com/bitbucket/api/2/reference/meta/uri-uuid#uuid).
 * You can upload up to 100 annotations per POST request.
 *
 * ### Sample cURL request:
 * ```
 * curl --location
 * 'https://api.bitbucket.org/2.0/repositories/<username>/<reposity-name>/commit/<commit-hash>/reports/mysystem-001/annotations'
 * \
 * --header 'Content-Type: application/json' \
 * --data-raw '[
 *   {
 *         "external_id": "mysystem-annotation001",
 *         "title": "Security scan report",
 *         "annotation_type": "VULNERABILITY",
 *         "x-summary": "This line represents a security threat.",
 *         "severity": "HIGH",
 *       "path":
 * "my-service/src/main/java/com/myCompany/mysystem/logic/Main.java",
 *         "line": 42
 *   },
 *   {
 *         "external_id": "mySystem-annotation002",
 *         "title": "Bug report",
 *         "annotation_type": "BUG",
 *         "result": "FAILED",
 *         "x-summary": "This line might introduce a bug.",
 *         "severity": "MEDIUM",
 *       "path":
 * "my-service/src/main/java/com/myCompany/mysystem/logic/Helper.java",
 *         "line": 13
 *   }
 * ]'
 * ```
 *
 * ### Possible field values:
 * annotation_type: VULNERABILITY, CODE_SMELL, BUG
 * result: PASSED, FAILED, IGNORED, SKIPPED
 * severity: HIGH, MEDIUM, LOW, CRITICAL
 *
 * Please refer to the [Code Insights
 * documentation](https://confluence.atlassian.com/bitbucket/code-insights-994316785.html)
 * for more information.
 *
 */
export function bulkCreateOrUpdateAnnotations(
  workspace: string,
  repoSlug: string,
  commit: string,
  reportId: string,
  body: ReportAnnotation[],
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: 200
    data: ReportAnnotation[]
  }>(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/reports/${reportId}/annotations`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body,
    })
  )
}
/**
 * Returns a paginated list of Annotations for a specified report.
 */
export function getAnnotationsForReport(
  workspace: string,
  repoSlug: string,
  commit: string,
  reportId: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedAnnotations
  }>(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/reports/${reportId}/annotations`,
    {
      ...opts,
    }
  )
}
/**
 * Creates or updates an individual annotation for the specified report.
 * Annotations are individual findings that have been identified as part of a
 * report, for example, a line of code that represents a vulnerability. These
 * annotations can be attached to a specific file and even a specific line in
 * that file, however, that is optional. Annotations are not mandatory and a
 * report can contain up to 1000 annotations.
 *
 * Just as reports, annotation needs to be uploaded with a unique ID that can
 * later be used to identify the report as an alternative to the generated
 * [UUID](https://developer.atlassian.com/bitbucket/api/2/reference/meta/uri-uuid#uuid).
 * If you want to use an existing id from your own system, we recommend
 * prefixing it with your system's name to avoid collisions, for example,
 * mySystem-annotation001.
 *
 * ### Sample cURL request:
 * ```
 * curl --request PUT
 * 'https://api.bitbucket.org/2.0/repositories/<username>/<reposity-name>/commit/<commit-hash>/reports/mySystem-001/annotations/mysystem-annotation001'
 * \
 * --header 'Content-Type: application/json' \
 * --data-raw '{
 *     "title": "Security scan report",
 *     "annotation_type": "VULNERABILITY",
 *     "x-summary": "This line represents a security thread.",
 *     "severity": "HIGH",
 *     "path":
 * "my-service/src/main/java/com/myCompany/mysystem/logic/Main.java",
 *     "line": 42
 * }'
 * ```
 *
 * ### Possible field values:
 * annotation_type: VULNERABILITY, CODE_SMELL, BUG
 * result: PASSED, FAILED, IGNORED, SKIPPED
 * severity: HIGH, MEDIUM, LOW, CRITICAL
 *
 * Please refer to the [Code Insights
 * documentation](https://confluence.atlassian.com/bitbucket/code-insights-994316785.html)
 * for more information.
 *
 */
export function createOrUpdateAnnotation(
  workspace: string,
  repoSlug: string,
  commit: string,
  reportId: string,
  annotationId: string,
  reportAnnotation: ReportAnnotation,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: ReportAnnotation
      }
    | {
        status: 400
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/reports/${reportId}/annotations/${annotationId}`,
    oazapfts.json({
      ...opts,
      method: "PUT",
      body: reportAnnotation,
    })
  )
}
/**
 * Returns a single Annotation matching the provided ID.
 */
export function getAnnotation(
  workspace: string,
  repoSlug: string,
  commit: string,
  reportId: string,
  annotationId: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: ReportAnnotation
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/reports/${reportId}/annotations/${annotationId}`,
    {
      ...opts,
    }
  )
}
/**
 * Deletes a single Annotation matching the provided ID.
 */
export function deleteAnnotation(
  workspace: string,
  repoSlug: string,
  commit: string,
  reportId: string,
  annotationId: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/reports/${reportId}/annotations/${annotationId}`,
    {
      ...opts,
      method: "DELETE",
    }
  )
}
/**
 * Returns all statuses (e.g. build results) for a specific commit.
 */
export function getRepositoriesByWorkspaceAndRepoSlugCommitCommitStatuses(
  commit: string,
  repoSlug: string,
  workspace: string,
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedCommitStatuses
      }
    | {
        status: 401
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/statuses${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Creates a new build status against the specified commit.
 *
 * If the specified key already exists, the existing status object will
 * be overwritten.
 *
 * Example:
 *
 * ```
 * curl
 * https://api.bitbucket.org/2.0/repositories/my-workspace/my-repo/commit/e10dae226959c2194f2b07b077c07762d93821cf/statuses/build/
 *           -X POST -u jdoe -H 'Content-Type: application/json'           -d
 * '{
 *     "key": "MY-BUILD",
 *     "state": "SUCCESSFUL",
 *     "description": "42 tests passed",
 *     "url": "https://www.example.org/my-build-result"
 *   }'
 * ```
 *
 * When creating a new commit status, you can use a URI template for the URL.
 * Templates are URLs that contain variable names that Bitbucket will
 * evaluate at runtime whenever the URL is displayed anywhere similar to
 * parameter substitution in
 * [Bitbucket
 * Connect](https://developer.atlassian.com/bitbucket/concepts/context-parameters.html).
 * For example, one could use `https://foo.com/builds/{repository.full_name}`
 * which Bitbucket will turn into `https://foo.com/builds/foo/bar` at render
 * time. The context variables available are `repository` and `commit`.
 */
export function postRepositoriesByWorkspaceAndRepoSlugCommitCommitStatusesBuild(
  commit: string,
  repoSlug: string,
  workspace: string,
  commitstatus?: Commitstatus,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: Commitstatus
      }
    | {
        status: 401
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/statuses/build`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: commitstatus,
    })
  )
}
/**
 * Returns the specified build status for a commit.
 */
export function getRepositoriesByWorkspaceAndRepoSlugCommitCommitStatusesBuildKey(
  commit: string,
  key: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Commitstatus
      }
    | {
        status: 401
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/statuses/build/${key}`,
    {
      ...opts,
    }
  )
}
/**
 * Used to update the current status of a build status object on the
 * specific commit.
 *
 * This operation can also be used to change other properties of the
 * build status:
 *
 * * `state`
 * * `name`
 * * `description`
 * * `url`
 * * `refname`
 *
 * The `key` cannot be changed.
 */
export function putRepositoriesByWorkspaceAndRepoSlugCommitCommitStatusesBuildKey(
  commit: string,
  key: string,
  repoSlug: string,
  workspace: string,
  commitstatus?: Commitstatus,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Commitstatus
      }
    | {
        status: 401
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/commit/${commit}/statuses/build/${key}`,
    oazapfts.json({
      ...opts,
      method: "PUT",
      body: commitstatus,
    })
  )
}
/**
 * These are the repository's commits. They are paginated and returned
 * in reverse chronological order, similar to the output of `git log`.
 * Like these tools, the DAG can be filtered.
 *
 * #### GET /repositories/{workspace}/{repo_slug}/commits/
 *
 * Returns all commits in the repo in topological order (newest commit
 * first). All branches and tags are included (similar to
 * `git log --all`).
 *
 * #### GET /repositories/{workspace}/{repo_slug}/commits/?exclude=master
 *
 * Returns all commits in the repo that are not on master
 * (similar to `git log --all ^master`).
 *
 * #### GET
 * /repositories/{workspace}/{repo_slug}/commits/?include=foo&include=bar&exclude=fu&exclude=fubar
 *
 * Returns all commits that are on refs `foo` or `bar`, but not on `fu` or
 * `fubar` (similar to `git log foo bar ^fu ^fubar`).
 *
 * An optional `path` parameter can be specified that will limit the
 * results to commits that affect that path. `path` can either be a file
 * or a directory. If a directory is specified, commits are returned that
 * have modified any file in the directory tree rooted by `path`. It is
 * important to note that if the `path` parameter is specified, the commits
 * returned by this endpoint may no longer be a DAG, parent commits that
 * do not modify the path will be omitted from the response.
 *
 * #### GET
 * /repositories/{workspace}/{repo_slug}/commits/?path=README.md&include=foo&include=bar&exclude=master
 *
 * Returns all commits that are on refs `foo` or `bar`, but not on `master`
 * that changed the file README.md.
 *
 * #### GET
 * /repositories/{workspace}/{repo_slug}/commits/?path=src/&include=foo&include=bar&exclude=master
 *
 * Returns all commits that are on refs `foo` or `bar`, but not on `master`
 * that changed to a file in any file in the directory src or its children.
 *
 * Because the response could include a very large number of commits, it
 * is paginated. Follow the 'next' link in the response to navigate to the
 * next page of commits. As with other paginated resources, do not
 * construct your own links.
 *
 * When the include and exclude parameters are more than can fit in a
 * query string, clients can use a `x-www-form-urlencoded` POST instead.
 */
export function getRepositoriesByWorkspaceAndRepoSlugCommits(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Page
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/commits`, {
    ...opts,
  })
}
/**
 * Identical to `GET /repositories/{workspace}/{repo_slug}/commits`,
 * except that POST allows clients to place the include and exclude
 * parameters in the request body to avoid URL length issues.
 *
 * **Note that this resource does NOT support new commit creation.**
 */
export function postRepositoriesByWorkspaceAndRepoSlugCommits(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Page
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/commits`, {
    ...opts,
    method: "POST",
  })
}
/**
 * These are the repository's commits. They are paginated and returned
 * in reverse chronological order, similar to the output of `git log`.
 * Like these tools, the DAG can be filtered.
 *
 * #### GET /repositories/{workspace}/{repo_slug}/commits/master
 *
 * Returns all commits on rev `master` (similar to `git log master`).
 *
 * #### GET
 * /repositories/{workspace}/{repo_slug}/commits/dev?include=foo&exclude=master
 *
 * Returns all commits on ref `dev` or `foo`, except those that are reachable
 * on
 * `master` (similar to `git log dev foo ^master`).
 *
 * An optional `path` parameter can be specified that will limit the
 * results to commits that affect that path. `path` can either be a file
 * or a directory. If a directory is specified, commits are returned that
 * have modified any file in the directory tree rooted by `path`. It is
 * important to note that if the `path` parameter is specified, the commits
 * returned by this endpoint may no longer be a DAG, parent commits that
 * do not modify the path will be omitted from the response.
 *
 * #### GET
 * /repositories/{workspace}/{repo_slug}/commits/dev?path=README.md&include=foo&include=bar&exclude=master
 *
 * Returns all commits that are on refs `dev` or `foo` or `bar`, but not on
 * `master` that changed the file README.md.
 *
 * #### GET
 * /repositories/{workspace}/{repo_slug}/commits/dev?path=src/&include=foo&exclude=master
 *
 * Returns all commits that are on refs `dev` or `foo`, but not on `master`
 * that changed to a file in any file in the directory src or its children.
 *
 * Because the response could include a very large number of commits, it
 * is paginated. Follow the 'next' link in the response to navigate to the
 * next page of commits. As with other paginated resources, do not
 * construct your own links.
 *
 * When the include and exclude parameters are more than can fit in a
 * query string, clients can use a `x-www-form-urlencoded` POST instead.
 */
export function getRepositoriesByWorkspaceAndRepoSlugCommitsRevision(
  repoSlug: string,
  revision: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Page
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/commits/${revision}`, {
    ...opts,
  })
}
/**
 * Identical to `GET /repositories/{workspace}/{repo_slug}/commits/{revision}`,
 * except that POST allows clients to place the include and exclude
 * parameters in the request body to avoid URL length issues.
 *
 * **Note that this resource does NOT support new commit creation.**
 */
export function postRepositoriesByWorkspaceAndRepoSlugCommitsRevision(
  repoSlug: string,
  revision: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Page
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/commits/${revision}`, {
    ...opts,
    method: "POST",
  })
}
/**
 * Returns the components that have been defined in the issue tracker.
 *
 * This resource is only available on repositories that have the issue
 * tracker enabled.
 */
export function getRepositoriesByWorkspaceAndRepoSlugComponents(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedComponents
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/components`, {
    ...opts,
  })
}
/**
 * Returns the specified issue tracker component object.
 */
export function getRepositoriesByWorkspaceAndRepoSlugComponentsComponentId(
  componentId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Component
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/components/${componentId}`, {
    ...opts,
  })
}
/**
 * Returns the repository's default reviewers.
 *
 * These are the users that are automatically added as reviewers on every
 * new pull request that is created.
 */
export function getRepositoriesByWorkspaceAndRepoSlugDefaultReviewers(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 403
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/default-reviewers`, {
    ...opts,
  })
}
/**
 * Removes a default reviewer from the repository.
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugDefaultReviewersTargetUsername(
  repoSlug: string,
  targetUsername: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/default-reviewers/${targetUsername}`,
    {
      ...opts,
      method: "DELETE",
    }
  )
}
/**
 * Returns the specified reviewer.
 *
 * This can be used to test whether a user is among the repository's
 * default reviewers list. A 404 indicates that that specified user is not
 * a default reviewer.
 */
export function getRepositoriesByWorkspaceAndRepoSlugDefaultReviewersTargetUsername(
  repoSlug: string,
  targetUsername: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/default-reviewers/${targetUsername}`,
    {
      ...opts,
    }
  )
}
/**
 * Adds the specified user to the repository's list of default
 * reviewers.
 *
 * This method is idempotent. Adding a user a second time has no effect.
 */
export function putRepositoriesByWorkspaceAndRepoSlugDefaultReviewersTargetUsername(
  repoSlug: string,
  targetUsername: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/default-reviewers/${targetUsername}`,
    {
      ...opts,
      method: "PUT",
    }
  )
}
/**
 * Returns all deploy-keys belonging to a repository.
 *
 * Example:
 * ```
 * $ curl -H "Authorization <auth header>" \
 * https://api.bitbucket.org/2.0/repositories/mleu/test/deploy-keys
 *
 * Output:
 * {
 *     "pagelen": 10,
 *     "values": [
 *         {
 *             "id": 123,
 *             "key": "ssh-rsa
 * AAAAB3NzaC1yc2EAAAADAQABAAABAQDAK/b1cHHDr/TEV1JGQl+WjCwStKG6Bhrv0rFpEsYlyTBm1fzN0VOJJYn4ZOPCPJwqse6fGbXntEs+BbXiptR+++HycVgl65TMR0b5ul5AgwrVdZdT7qjCOCgaSV74/9xlHDK8oqgGnfA7ZoBBU+qpVyaloSjBdJfLtPY/xqj4yHnXKYzrtn/uFc4Kp9Tb7PUg9Io3qohSTGJGVHnsVblq/rToJG7L5xIo0OxK0SJSQ5vuId93ZuFZrCNMXj8JDHZeSEtjJzpRCBEXHxpOPhAcbm4MzULgkFHhAVgp4JbkrT99/wpvZ7r9AdkTg7HGqL3rlaDrEcWfL7Lu6TnhBdq5",
 *             "label": "mykey",
 *             "type": "deploy_key",
 *             "created_on": "2018-08-15T23:50:59.993890+00:00",
 *             "repository": {
 *                 "full_name": "mleu/test",
 *                 "name": "test",
 *                 "type": "repository",
 *                 "uuid": "{85d08b4e-571d-44e9-a507-fa476535aa98}"
 *             },
 *             "links":{
 *                 "self":{
 *                     "href":
 * "https://api.bitbucket.org/2.0/repositories/mleu/test/deploy-keys/123"
 *                 }
 *             }
 *             "last_used": null,
 *             "comment": "mleu@C02W454JHTD8"
 *         }
 *     ],
 *     "page": 1,
 *     "size": 1
 * }
 * ```
 */
export function getRepositoriesByWorkspaceAndRepoSlugDeployKeys(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedDeployKeys
      }
    | {
        status: 403
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/deploy-keys`, {
    ...opts,
  })
}
/**
 * Create a new deploy key in a repository. Note: If authenticating a deploy
 * key
 * with an OAuth consumer, any changes to the OAuth consumer will subsequently
 * invalidate the deploy key.
 *
 *
 * Example:
 * ```
 * $ curl -XPOST \
 * -H "Authorization <auth header>" \
 * -H "Content-type: application/json" \
 * https://api.bitbucket.org/2.0/repositories/mleu/test/deploy-keys -d \
 * '{
 *     "key": "ssh-rsa
 * AAAAB3NzaC1yc2EAAAADAQABAAABAQDAK/b1cHHDr/TEV1JGQl+WjCwStKG6Bhrv0rFpEsYlyTBm1fzN0VOJJYn4ZOPCPJwqse6fGbXntEs+BbXiptR+++HycVgl65TMR0b5ul5AgwrVdZdT7qjCOCgaSV74/9xlHDK8oqgGnfA7ZoBBU+qpVyaloSjBdJfLtPY/xqj4yHnXKYzrtn/uFc4Kp9Tb7PUg9Io3qohSTGJGVHnsVblq/rToJG7L5xIo0OxK0SJSQ5vuId93ZuFZrCNMXj8JDHZeSEtjJzpRCBEXHxpOPhAcbm4MzULgkFHhAVgp4JbkrT99/wpvZ7r9AdkTg7HGqL3rlaDrEcWfL7Lu6TnhBdq5
 * mleu@C02W454JHTD8",
 *     "label": "mydeploykey"
 * }'
 *
 * Output:
 * {
 *     "id": 123,
 *     "key": "ssh-rsa
 * AAAAB3NzaC1yc2EAAAADAQABAAABAQDAK/b1cHHDr/TEV1JGQl+WjCwStKG6Bhrv0rFpEsYlyTBm1fzN0VOJJYn4ZOPCPJwqse6fGbXntEs+BbXiptR+++HycVgl65TMR0b5ul5AgwrVdZdT7qjCOCgaSV74/9xlHDK8oqgGnfA7ZoBBU+qpVyaloSjBdJfLtPY/xqj4yHnXKYzrtn/uFc4Kp9Tb7PUg9Io3qohSTGJGVHnsVblq/rToJG7L5xIo0OxK0SJSQ5vuId93ZuFZrCNMXj8JDHZeSEtjJzpRCBEXHxpOPhAcbm4MzULgkFHhAVgp4JbkrT99/wpvZ7r9AdkTg7HGqL3rlaDrEcWfL7Lu6TnhBdq5",
 *     "label": "mydeploykey",
 *     "type": "deploy_key",
 *     "created_on": "2018-08-15T23:50:59.993890+00:00",
 *     "repository": {
 *         "full_name": "mleu/test",
 *         "name": "test",
 *         "type": "repository",
 *         "uuid": "{85d08b4e-571d-44e9-a507-fa476535aa98}"
 *     },
 *     "links":{
 *         "self":{
 *             "href":
 * "https://api.bitbucket.org/2.0/repositories/mleu/test/deploy-keys/123"
 *         }
 *     }
 *     "last_used": null,
 *     "comment": "mleu@C02W454JHTD8"
 * }
 * ```
 */
export function postRepositoriesByWorkspaceAndRepoSlugDeployKeys(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: DeployKey
      }
    | {
        status: 400
      }
    | {
        status: 403
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/deploy-keys`, {
    ...opts,
    method: "POST",
  })
}
/**
 * This deletes a deploy key from a repository.
 *
 * Example:
 * ```
 * $ curl -XDELETE \
 * -H "Authorization <auth header>" \
 * https://api.bitbucket.org/2.0/repositories/mleu/test/deploy-keys/1234
 * ```
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugDeployKeysKeyId(
  keyId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 403
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/deploy-keys/${keyId}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Returns the deploy key belonging to a specific key.
 *
 * Example:
 * ```
 * $ curl -H "Authorization <auth header>" \
 * https://api.bitbucket.org/2.0/repositories/mleu/test/deploy-key/1234
 *
 * Output:
 * {
 *     "comment": "mleu@C02W454JHTD8",
 *     "last_used": null,
 *     "links": {
 *         "self": {
 *             "href":
 * https://api.bitbucket.org/2.0/repositories/mleu/test/deploy-key/1234"
 *         }
 *     },
 *     "repository": {
 *         "full_name": "mleu/test",
 *         "name": "test",
 *         "type": "repository",
 *         "uuid": "{85d08b4e-571d-44e9-a507-fa476535aa98}"
 *     },
 *     "label": "mykey",
 *     "created_on": "2018-08-15T23:50:59.993890+00:00",
 *     "key": "ssh-rsa
 * AAAAB3NzaC1yc2EAAAADAQABAAABAQDAK/b1cHHDr/TEV1JGQl+WjCwStKG6Bhrv0rFpEsYlyTBm1fzN0VOJJYn4ZOPCPJwqse6fGbXntEs+BbXiptR+++HycVgl65TMR0b5ul5AgwrVdZdT7qjCOCgaSV74/9xlHDK8oqgGnfA7ZoBBU+qpVyaloSjBdJfLtPY/xqj4yHnXKYzrtn/uFc4Kp9Tb7PUg9Io3qohSTGJGVHnsVblq/rToJG7L5xIo0OxK0SJSQ5vuId93ZuFZrCNMXj8JDHZeSEtjJzpRCBEXHxpOPhAcbm4MzULgkFHhAVgp4JbkrT99/wpvZ7r9AdkTg7HGqL3rlaDrEcWfL7Lu6TnhBdq5",
 *     "id": 1234,
 *     "type": "deploy_key"
 * }
 * ```
 */
export function getRepositoriesByWorkspaceAndRepoSlugDeployKeysKeyId(
  keyId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: DeployKey
      }
    | {
        status: 403
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/deploy-keys/${keyId}`, {
    ...opts,
  })
}
/**
 * Create a new deploy key in a repository.
 *
 * The same key needs to be passed in but the comment and label can change.
 *
 * Example:
 * ```
 * $ curl -XPUT \
 * -H "Authorization <auth header>" \
 * -H "Content-type: application/json" \
 * https://api.bitbucket.org/2.0/repositories/mleu/test/deploy-keys/1234 -d \
 * '{
 *     "label": "newlabel",
 *     "key": "ssh-rsa
 * AAAAB3NzaC1yc2EAAAADAQABAAABAQDAK/b1cHHDr/TEV1JGQl+WjCwStKG6Bhrv0rFpEsYlyTBm1fzN0VOJJYn4ZOPCPJwqse6fGbXntEs+BbXiptR+++HycVgl65TMR0b5ul5AgwrVdZdT7qjCOCgaSV74/9xlHDK8oqgGnfA7ZoBBU+qpVyaloSjBdJfLtPY/xqj4yHnXKYzrtn/uFc4Kp9Tb7PUg9Io3qohSTGJGVHnsVblq/rToJG7L5xIo0OxK0SJSQ5vuId93ZuFZrCNMXj8JDHZeSEtjJzpRCBEXHxpOPhAcbm4MzULgkFHhAVgp4JbkrT99/wpvZ7r9AdkTg7HGqL3rlaDrEcWfL7Lu6TnhBdq5
 * newcomment",
 * }'
 *
 * Output:
 * {
 *     "comment": "newcomment",
 *     "last_used": null,
 *     "links": {
 *         "self": {
 *             "href":
 * "https://api.bitbucket.org/2.0/repositories/mleu/test/deploy-keys/1234"
 *         }
 *     },
 *     "repository": {
 *         "full_name": "mleu/test",
 *         "name": "test",
 *         "type": "repository",
 *         "uuid": "{85d08b4e-571d-44e9-a507-fa476535aa98}"
 *     },
 *     "label": "newlabel",
 *     "created_on": "2018-08-15T23:50:59.993890+00:00",
 *     "key": "ssh-rsa
 * AAAAB3NzaC1yc2EAAAADAQABAAABAQDAK/b1cHHDr/TEV1JGQl+WjCwStKG6Bhrv0rFpEsYlyTBm1fzN0VOJJYn4ZOPCPJwqse6fGbXntEs+BbXiptR+++HycVgl65TMR0b5ul5AgwrVdZdT7qjCOCgaSV74/9xlHDK8oqgGnfA7ZoBBU+qpVyaloSjBdJfLtPY/xqj4yHnXKYzrtn/uFc4Kp9Tb7PUg9Io3qohSTGJGVHnsVblq/rToJG7L5xIo0OxK0SJSQ5vuId93ZuFZrCNMXj8JDHZeSEtjJzpRCBEXHxpOPhAcbm4MzULgkFHhAVgp4JbkrT99/wpvZ7r9AdkTg7HGqL3rlaDrEcWfL7Lu6TnhBdq5",
 *     "id": 1234,
 *     "type": "deploy_key"
 * }
 * ```
 */
export function putRepositoriesByWorkspaceAndRepoSlugDeployKeysKeyId(
  keyId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: DeployKey
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 403
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/deploy-keys/${keyId}`, {
    ...opts,
    method: "PUT",
  })
}
/**
 * Find deployments
 */
export function getDeploymentsForRepository(
  workspace: string,
  repoSlug: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedDeployments
  }>(`/repositories/${workspace}/${repoSlug}/deployments/`, {
    ...opts,
  })
}
/**
 * Retrieve a deployment
 */
export function getDeploymentForRepository(
  workspace: string,
  repoSlug: string,
  deploymentUuid: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Deployment
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/deployments/${deploymentUuid}`, {
    ...opts,
  })
}
/**
 * Produces a raw git-style diff.
 *
 * #### Single commit spec
 *
 * If the `spec` argument to this API is a single commit, the diff is
 * produced against the first parent of the specified commit.
 *
 * #### Two commit spec
 *
 * Two commits separated by `..` may be provided as the `spec`, e.g.,
 * `3a8b42..9ff173`. When two commits are provided and the `merge` query
 * parameter is true or absent, this API produces a 3-way diff, also
 * referred to as a merge diff. This is equivalent to merging the left
 * branch into the right branch and then computing the diff of the merge
 * commit against its first parent (the right branch). These diffs have
 * the same behavior as pull requests that show the 3-way diff, such as
 * the [Bitbucket Cloud Pull
 * Request](https://blog.developer.atlassian.com/a-better-pull-request/).
 * For a simple git-style diff, add `merge=false` to the query.
 *
 * The two commits are interpreted as follows:
 *
 * * First commit: the commit containing the changes we wish to preview
 * * Second commit: the commit representing the state to which we want to
 *   compare the first commit
 * * **Note**: This is the opposite of the order used in `git diff`.
 *
 * #### Comparison to patches
 *
 * While similar to patches, diffs:
 *
 * * Don't have a commit header (username, commit message, etc)
 * * Support the optional `path=foo/bar.py` query param to filter
 *   the diff to just that one file diff
 *
 * #### Response
 *
 * The raw diff is returned as-is, in whatever encoding the files in the
 * repository use. It is not decoded into unicode. As such, the
 * content-type is `text/plain`.
 */
export function getRepositoriesByWorkspaceAndRepoSlugDiffSpec(
  repoSlug: string,
  spec: string,
  workspace: string,
  {
    context,
    path,
    ignoreWhitespace,
    binary,
    renames,
    merge,
  }: {
    context?: number
    path?: string
    ignoreWhitespace?: boolean
    binary?: boolean
    renames?: boolean
    merge?: boolean
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 555
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/diff/${spec}${QS.query(
      QS.form({
        context,
        path,
        ignore_whitespace: ignoreWhitespace,
        binary,
        renames,
        merge,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Produces a response in JSON format with a record for every path
 * modified, including information on the type of the change and the
 * number of lines added and removed.
 *
 * #### Single commit spec
 *
 * If the `spec` argument to this API is a single commit, the diff is
 * produced against the first parent of the specified commit.
 *
 * #### Two commit spec
 *
 * Two commits separated by `..` may be provided as the `spec`, e.g.,
 * `3a8b42..9ff173`. When two commits are provided and the `merge` query
 * parameter is true or absent, this API produces a 3-way diff, also
 * referred to as a merge diff. This is equivalent to merging the left
 * branch into the right branch and then computing the diff of the merge
 * commit against its first parent (the right branch). These diffs have
 * the same behavior as pull requests that show the 3-way diff, such as
 * the [Bitbucket Cloud Pull
 * Request](https://blog.developer.atlassian.com/a-better-pull-request/).
 * For a simple git-style diff, add `merge=false` to the query.
 *
 * The two commits are interpreted as follows:
 *
 * * First commit: the commit containing the changes we wish to preview
 * * Second commit: the commit representing the state to which we want to
 *   compare the first commit
 * * **Note**: This is the opposite of the order used in `git diff`.
 *
 * #### Sample output
 * ```
 * curl
 * https://api.bitbucket.org/2.0/repositories/bitbucket/geordi/diffstat/d222fa2..e174964
 * {
 *     "pagelen": 500,
 *     "values": [
 *         {
 *             "type": "diffstat",
 *             "status": "modified",
 *             "lines_removed": 1,
 *             "lines_added": 2,
 *             "old": {
 *                 "path": "setup.py",
 *                 "escaped_path": "setup.py",
 *                 "type": "commit_file",
 *                 "links": {
 *                     "self": {
 *                         "href":
 * "https://api.bitbucket.org/2.0/repositories/bitbucket/geordi/src/e1749643d655d7c7014001a6c0f58abaf42ad850/setup.py"
 *                     }
 *                 }
 *             },
 *             "new": {
 *                 "path": "setup.py",
 *                 "escaped_path": "setup.py",
 *                 "type": "commit_file",
 *                 "links": {
 *                     "self": {
 *                         "href":
 * "https://api.bitbucket.org/2.0/repositories/bitbucket/geordi/src/d222fa235229c55dad20b190b0b571adf737d5a6/setup.py"
 *                     }
 *                 }
 *             }
 *         }
 *     ],
 *     "page": 1,
 *     "size": 1
 * }
 * ```
 */
export function getRepositoriesByWorkspaceAndRepoSlugDiffstatSpec(
  repoSlug: string,
  spec: string,
  workspace: string,
  {
    ignoreWhitespace,
    merge,
    path,
    renames,
  }: {
    ignoreWhitespace?: boolean
    merge?: boolean
    path?: string
    renames?: boolean
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedDiffStat
      }
    | {
        status: 555
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/diffstat/${spec}${QS.query(
      QS.form({
        ignore_whitespace: ignoreWhitespace,
        merge,
        path,
        renames,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns a list of download links associated with the repository.
 */
export function getRepositoriesByWorkspaceAndRepoSlugDownloads(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 403
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/downloads`, {
    ...opts,
  })
}
/**
 * Upload new download artifacts.
 *
 * To upload files, perform a `multipart/form-data` POST containing one
 * or more `files` fields:
 *
 *     $ echo Hello World > hello.txt
 *     $ curl -s -u evzijst -X POST
 * https://api.bitbucket.org/2.0/repositories/evzijst/git-tests/downloads -F
 * files=@hello.txt
 *
 * When a file is uploaded with the same name as an existing artifact,
 * then the existing file will be replaced.
 */
export function postRepositoriesByWorkspaceAndRepoSlugDownloads(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 406
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/downloads`, {
    ...opts,
    method: "POST",
  })
}
/**
 * Deletes the specified download artifact from the repository.
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugDownloadsFilename(
  filename: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/downloads/${filename}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Return a redirect to the contents of a download artifact.
 *
 * This endpoint returns the actual file contents and not the artifact's
 * metadata.
 *
 *     $ curl -s -L
 * https://api.bitbucket.org/2.0/repositories/evzijst/git-tests/downloads/hello.txt
 * Hello World
 */
export function getRepositoriesByWorkspaceAndRepoSlugDownloadsFilename(
  filename: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 302
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/downloads/${filename}`, {
    ...opts,
  })
}
/**
 * Create an environment.
 */
export function createEnvironment(
  workspace: string,
  repoSlug: string,
  deploymentEnvironment: DeploymentEnvironment,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: DeploymentEnvironment
      }
    | {
        status: 404
        data: Error
      }
    | {
        status: 409
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/environments/`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: deploymentEnvironment,
    })
  )
}
/**
 * Find environments
 */
export function getEnvironmentsForRepository(
  workspace: string,
  repoSlug: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedDeploymentEnvironments
  }>(`/repositories/${workspace}/${repoSlug}/environments/`, {
    ...opts,
  })
}
/**
 * Retrieve an environment
 */
export function getEnvironmentForRepository(
  workspace: string,
  repoSlug: string,
  environmentUuid: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: DeploymentEnvironment
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/environments/${environmentUuid}`, {
    ...opts,
  })
}
/**
 * Delete an environment
 */
export function deleteEnvironmentForRepository(
  workspace: string,
  repoSlug: string,
  environmentUuid: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/environments/${environmentUuid}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Update an environment
 */
export function updateEnvironmentForRepository(
  workspace: string,
  repoSlug: string,
  environmentUuid: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 202
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/environments/${environmentUuid}/changes/`,
    {
      ...opts,
      method: "POST",
    }
  )
}
/**
 * Returns a paginated list of commits that modified the specified file.
 *
 * Commits are returned in reverse chronological order. This is roughly
 * equivalent to the following commands:
 *
 *     $ git log --follow --date-order <sha> <path>
 *
 *     $ hg log --follow <path>
 *
 * By default, Bitbucket will follow renames and the path name in the
 * returned entries reflects that. This can be turned off using the
 * `?renames=false` query parameter.
 *
 * Results are returned in descending chronological order by default, and
 * like most endpoints you can
 * [filter and sort](../../../../../../meta/filtering) the response to
 * only provide exactly the data you want.
 *
 * For example, if you wanted to find commits made before 2011-05-18
 * against a file named `README.rst`, but you only wanted the path and
 * date, your query would look like this:
 *
 * ```
 * $ curl
 * 'https://api.bitbucket.org/2.0/repositories/evzijst/dogslow/filehistory/master/README.rst'\
 *   '?fields=values.next,values.path,values.commit.date&q=commit.date<=2011-05-18'
 * {
 *   "values": [
 *     {
 *       "commit": {
 *         "date": "2011-05-17T07:32:09+00:00"
 *       },
 *       "path": "README.rst"
 *     },
 *     {
 *       "commit": {
 *         "date": "2011-05-16T06:33:28+00:00"
 *       },
 *       "path": "README.txt"
 *     },
 *     {
 *       "commit": {
 *         "date": "2011-05-16T06:15:39+00:00"
 *       },
 *       "path": "README.txt"
 *     }
 *   ]
 * }
 * ```
 *
 * In the response you can see that the file was renamed to `README.rst`
 * by the commit made on 2011-05-16, and was previously named `README.txt`.
 */
export function getRepositoriesByWorkspaceAndRepoSlugFilehistoryCommitPath(
  commit: string,
  path: string,
  repoSlug: string,
  workspace: string,
  {
    renames,
    q,
    sort,
  }: {
    renames?: string
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedFiles
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/filehistory/${commit}/${path}${QS.query(
      QS.form({
        renames,
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns a paginated list of all the forks of the specified
 * repository.
 */
export function getRepositoriesByWorkspaceAndRepoSlugForks(
  repoSlug: string,
  workspace: string,
  {
    role,
    q,
    sort,
  }: {
    role?: "admin" | "contributor" | "member" | "owner"
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedRepositories
  }>(
    `/repositories/${workspace}/${repoSlug}/forks${QS.query(
      QS.form({
        role,
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Creates a new fork of the specified repository.
 *
 * #### Forking a repository
 *
 * To create a fork, specify the workspace explicitly as part of the
 * request body:
 *
 * ```
 * $ curl -X POST -u jdoe
 * https://api.bitbucket.org/2.0/repositories/atlassian/bbql/forks \
 *   -H 'Content-Type: application/json' -d '{
 *     "name": "bbql_fork",
 *     "workspace": {
 *       "slug": "atlassian"
 *     }
 * }'
 * ```
 *
 * To fork a repository into the same workspace, also specify a new `name`.
 *
 * When you specify a value for `name`, it will also affect the `slug`.
 * The `slug` is reflected in the repository URL of the new fork. It is
 * derived from `name` by substituting non-ASCII characters, removes
 * whitespace, and changes characters to lower case. For example,
 * `My repo` would turn into `my_repo`.
 *
 * You need contributor access to create new forks within a workspace.
 *
 *
 * #### Change the properties of a new fork
 *
 * By default the fork inherits most of its properties from the parent.
 * However, since the optional POST body document follows the normal
 * `repository` JSON schema and you can override the new fork's
 * properties.
 *
 * Properties that can be overridden include:
 *
 * * description
 * * fork_policy
 * * language
 * * mainbranch
 * * is_private (note that a private repo's fork_policy might prohibit
 *   the creation of public forks, in which `is_private=False` would fail)
 * * has_issues (to initialize or disable the new repo's issue tracker --
 *   note that the actual contents of the parent repository's issue
 *   tracker are not copied during forking)
 * * has_wiki (to initialize or disable the new repo's wiki --
 *   note that the actual contents of the parent repository's wiki are not
 *   copied during forking)
 * * project (when forking into a private project, the fork's `is_private`
 *   must be `true`)
 *
 * Properties that cannot be modified include:
 *
 * * scm
 * * parent
 * * full_name
 */
export function postRepositoriesByWorkspaceAndRepoSlugForks(
  repoSlug: string,
  workspace: string,
  repository?: Repository,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: 201
    data: Repository
  }>(
    `/repositories/${workspace}/${repoSlug}/forks`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: repository,
    })
  )
}
/**
 * Returns a paginated list of webhooks installed on this repository.
 */
export function getRepositoriesByWorkspaceAndRepoSlugHooks(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedWebhookSubscriptions
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/hooks`, {
    ...opts,
  })
}
/**
 * Creates a new webhook on the specified repository.
 *
 * Example:
 *
 * ```
 * $ curl -X POST -u credentials -H 'Content-Type: application/json'
 *   https://api.bitbucket.org/2.0/repositories/my-workspace/my-repo-slug/hooks
 *   -d '
 *     {
 *       "description": "Webhook Description",
 *       "url": "https://example.com/",
 *       "active": true,
 *       "events": [
 *         "repo:push",
 *         "issue:created",
 *         "issue:updated"
 *       ]
 *     }'
 * ```
 *
 * Note that this call requires the webhook scope, as well as any scope
 * that applies to the events that the webhook subscribes to. In the
 * example above that means: `webhook`, `repository` and `issue`.
 *
 * Also note that the `url` must properly resolve and cannot be an
 * internal, non-routed address.
 */
export function postRepositoriesByWorkspaceAndRepoSlugHooks(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: WebhookSubscription
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/hooks`, {
    ...opts,
    method: "POST",
  })
}
/**
 * Deletes the specified webhook subscription from the given
 * repository.
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugHooksUid(
  repoSlug: string,
  uid: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/hooks/${uid}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Returns the webhook with the specified id installed on the specified
 * repository.
 */
export function getRepositoriesByWorkspaceAndRepoSlugHooksUid(
  repoSlug: string,
  uid: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: WebhookSubscription
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/hooks/${uid}`, {
    ...opts,
  })
}
/**
 * Updates the specified webhook subscription.
 *
 * The following properties can be mutated:
 *
 * * `description`
 * * `url`
 * * `active`
 * * `events`
 */
export function putRepositoriesByWorkspaceAndRepoSlugHooksUid(
  repoSlug: string,
  uid: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: WebhookSubscription
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/hooks/${uid}`, {
    ...opts,
    method: "PUT",
  })
}
/**
 * Returns the issues in the issue tracker.
 */
export function getRepositoriesByWorkspaceAndRepoSlugIssues(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedIssues
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/issues`, {
    ...opts,
  })
}
/**
 * Creates a new issue.
 *
 * This call requires authentication. Private repositories or private
 * issue trackers require the caller to authenticate with an account that
 * has appropriate authorization.
 *
 * The authenticated user is used for the issue's `reporter` field.
 */
export function postRepositoriesByWorkspaceAndRepoSlugIssues(
  repoSlug: string,
  workspace: string,
  issue: Issue,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: Issue
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/issues`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: issue,
    })
  )
}
/**
 * A POST request to this endpoint initiates a new background celery task that
 * archives the repo's issues.
 *
 * For example, you can run:
 *
 * curl -u <username> -X POST
 * http://api.bitbucket.org/2.0/repositories/<owner_username>/<repo_slug>/
 * issues/export
 *
 * When the job has been accepted, it will return a 202 (Accepted) along with a
 * unique url to this job in the
 * 'Location' response header. This url is the endpoint for where the user can
 * obtain their zip files."
 */
export function postRepositoriesByWorkspaceAndRepoSlugIssuesExport(
  repoSlug: string,
  workspace: string,
  exportOptions?: ExportOptions,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 202
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/issues/export`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: exportOptions,
    })
  )
}
/**
 * This endpoint is used to poll for the progress of an issue export
 * job and return the zip file after the job is complete.
 * As long as the job is running, this will return a 200 response
 * with in the response body a description of the current status.
 *
 * After the job has been scheduled, but before it starts executing, this
 * endpoint's response is:
 *
 * {
 *  "type": "issue_job_status",
 *  "status": "ACCEPTED",
 *  "phase": "Initializing",
 *  "total": 0,
 *  "count": 0,
 *  "pct": 0
 * }
 *
 *
 * Then once it starts running, it becomes:
 *
 * {
 *  "type": "issue_job_status",
 *  "status": "STARTED",
 *  "phase": "Attachments",
 *  "total": 15,
 *  "count": 11,
 *  "pct": 73
 * }
 *
 * Once the job has successfully completed, it returns a stream of the zip file.
 */
export function getRepositoriesByWorkspaceAndRepoSlugIssuesExportRepoNameIssuesTaskIdZip(
  repoName: string,
  repoSlug: string,
  taskId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 202
        data: IssueJobStatus
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/issues/export/${repoName}-issues-${taskId}.zip`,
    {
      ...opts,
    }
  )
}
/**
 * When using GET, this endpoint reports the status of the current import task.
 * Request example:
 *
 * ```
 * $ curl -u <username> -X GET
 * https://api.bitbucket.org/2.0/repositories/<owner_username>/<repo_slug>/issues/import
 * ```
 *
 * After the job has been scheduled, but before it starts executing, this
 * endpoint's response is:
 *
 * ```
 * < HTTP/1.1 202 Accepted
 * {
 *     "type": "issue_job_status",
 *     "status": "PENDING",
 *     "phase": "Attachments",
 *     "total": 15,
 *     "count": 0,
 *     "percent": 0
 * }
 * ```
 *
 * Once it starts running, it is a 202 response with status STARTED and
 * progress filled.
 *
 * After it is finished, it becomes a 200 response with status SUCCESS or
 * FAILURE.
 */
export function getRepositoriesByWorkspaceAndRepoSlugIssuesImport(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: IssueJobStatus
      }
    | {
        status: 202
        data: IssueJobStatus
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/issues/import`, {
    ...opts,
  })
}
/**
 * A POST request to this endpoint will import the zip file given by the
 * archive parameter into the repository. All existing issues will be deleted
 * and replaced by the contents of the imported zip file.
 *
 * Imports are done through a multipart/form-data POST. There is one valid and
 * required form field, with the name
 * "archive," which needs to be a file field:
 *
 * ```
 * $ curl -u <username> -X POST -F archive=@/path/to/file.zip
 * https://api.bitbucket.org/2.0/repositories/<owner_username>/<repo_slug>/issues/import
 * ```
 *
 * When the import job is accepted, here is example output:
 *
 * ```
 * < HTTP/1.1 202 Accepted
 *
 * {
 *     "type": "issue_job_status",
 *     "status": "ACCEPTED",
 *     "phase": "Attachments",
 *     "total": 15,
 *     "count": 0,
 *     "percent": 0
 * }
 * ```
 */
export function postRepositoriesByWorkspaceAndRepoSlugIssuesImport(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 202
        data: IssueJobStatus
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
    | {
        status: 409
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/issues/import`, {
    ...opts,
    method: "POST",
  })
}
/**
 * Deletes the specified issue. This requires write access to the
 * repository.
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugIssuesIssueId(
  issueId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Issue
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/issues/${issueId}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Returns the specified issue.
 */
export function getRepositoriesByWorkspaceAndRepoSlugIssuesIssueId(
  issueId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Issue
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
    | {
        status: 410
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/issues/${issueId}`, {
    ...opts,
  })
}
/**
 * Modifies the issue.
 *
 * ```
 * $ curl https://api.bitbucket.org/2.0/repostories/evzijst/dogslow/issues/123 \
 *   -u evzijst -s -X PUT -H 'Content-Type: application/json' \
 *   -d '{
 *   "title": "Updated title",
 *   "assignee": {
 *     "username": "evzijst"
 *   },
 *   "priority": "minor",
 *   "version": {
 *     "name": "1.0"
 *   },
 *   "component": null
 * }'
 * ```
 *
 * This example changes the `title`, `assignee`, `priority` and the
 * `version`. It also removes the value of the `component` from the issue
 * by setting the field to `null`. Any field not present keeps its existing
 * value.
 *
 * Each time an issue is edited in the UI or through the API, an immutable
 * change record is created under the `/issues/123/changes` endpoint. It
 * also has a comment associated with the change.
 */
export function putRepositoriesByWorkspaceAndRepoSlugIssuesIssueId(
  issueId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Issue
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/issues/${issueId}`, {
    ...opts,
    method: "PUT",
  })
}
/**
 * Returns all attachments for this issue.
 *
 * This returns the files' meta data. This does not return the files'
 * actual contents.
 *
 * The files are always ordered by their upload date.
 */
export function getRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdAttachments(
  issueId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedIssueAttachment
      }
    | {
        status: 401
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/issues/${issueId}/attachments`, {
    ...opts,
  })
}
/**
 * Upload new issue attachments.
 *
 * To upload files, perform a `multipart/form-data` POST containing one
 * or more file fields.
 *
 * When a file is uploaded with the same name as an existing attachment,
 * then the existing file will be replaced.
 */
export function postRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdAttachments(
  issueId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
      }
    | {
        status: 400
      }
    | {
        status: 401
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/issues/${issueId}/attachments`, {
    ...opts,
    method: "POST",
  })
}
/**
 * Deletes an attachment.
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdAttachmentsPath(
  issueId: string,
  path: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 401
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/issues/${issueId}/attachments/${path}`,
    {
      ...opts,
      method: "DELETE",
    }
  )
}
/**
 * Returns the contents of the specified file attachment.
 *
 * Note that this endpoint does not return a JSON response, but instead
 * returns a redirect pointing to the actual file that in turn will return
 * the raw contents.
 *
 * The redirect URL contains a one-time token that has a limited lifetime.
 * As a result, the link should not be persisted, stored, or shared.
 */
export function getRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdAttachmentsPath(
  issueId: string,
  path: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 302
      }
    | {
        status: 401
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/issues/${issueId}/attachments/${path}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns the list of all changes that have been made to the specified
 * issue. Changes are returned in chronological order with the oldest
 * change first.
 *
 * Each time an issue is edited in the UI or through the API, an immutable
 * change record is created under the `/issues/123/changes` endpoint. It
 * also has a comment associated with the change.
 *
 * Note that this operation is changing significantly, due to privacy changes.
 * See the
 * [announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-changes-gdpr/#changes-to-the-issue-changes-api)
 * for details.
 *
 * ```
 * $ curl -s
 * https://api.bitbucket.org/2.0/repositories/evzijst/dogslow/issues/1/changes
 * - | jq .
 *
 * {
 *   "pagelen": 20,
 *   "values": [
 *     {
 *       "changes": {
 *         "priority": {
 *           "new": "trivial",
 *           "old": "major"
 *         },
 *         "assignee": {
 *           "new": "",
 *           "old": "evzijst"
 *         },
 *         "assignee_account_id": {
 *           "new": "",
 *           "old": "557058:c0b72ad0-1cb5-4018-9cdc-0cde8492c443"
 *         },
 *         "kind": {
 *           "new": "enhancement",
 *           "old": "bug"
 *         }
 *       },
 *       "links": {
 *         "self": {
 *           "href":
 * "https://api.bitbucket.org/2.0/repositories/evzijst/dogslow/issues/1/changes/2"
 *         },
 *         "html": {
 *           "href": "https://bitbucket.org/evzijst/dogslow/issues/1#comment-2"
 *         }
 *       },
 *       "issue": {
 *         "links": {
 *           "self": {
 *             "href":
 * "https://api.bitbucket.org/2.0/repositories/evzijst/dogslow/issues/1"
 *           }
 *         },
 *         "type": "issue",
 *         "id": 1,
 *         "repository": {
 *           "links": {
 *             "self": {
 *               "href":
 * "https://api.bitbucket.org/2.0/repositories/evzijst/dogslow"
 *             },
 *             "html": {
 *               "href": "https://bitbucket.org/evzijst/dogslow"
 *             },
 *             "avatar": {
 *               "href": "https://bitbucket.org/evzijst/dogslow/avatar/32/"
 *             }
 *           },
 *           "type": "repository",
 *           "name": "dogslow",
 *           "full_name": "evzijst/dogslow",
 *           "uuid": "{988b17c6-1a47-4e70-84ee-854d5f012bf6}"
 *         },
 *         "title": "Updated title"
 *       },
 *       "created_on": "2018-03-03T00:35:28.353630+00:00",
 *       "user": {
 *         "username": "evzijst",
 *         "nickname": "evzijst",
 *         "display_name": "evzijst",
 *         "type": "user",
 *         "uuid": "{aaa7972b-38af-4fb1-802d-6e3854c95778}",
 *         "links": {
 *           "self": {
 *             "href": "https://api.bitbucket.org/2.0/users/evzijst"
 *           },
 *           "html": {
 *             "href": "https://bitbucket.org/evzijst/"
 *           },
 *           "avatar": {
 *             "href": "https://bitbucket.org/account/evzijst/avatar/32/"
 *           }
 *         }
 *       },
 *       "message": {
 *         "raw": "Removed assignee, changed kind and priority.",
 *         "markup": "markdown",
 *         "html": "<p>Removed assignee, changed kind and priority.</p>",
 *         "type": "rendered"
 *       },
 *       "type": "issue_change",
 *       "id": 2
 *     }
 *   ],
 *   "page": 1
 * }
 * ```
 *
 * Changes support [filtering and sorting](../../../meta/filtering) that
 * can be used to search for specific changes. For instance, to see
 * when an issue transitioned to "resolved":
 *
 * ```
 * $ curl -s
 * https://api.bitbucket.org/2.0/repositories/site/master/issues/1/changes \
 *    -G --data-urlencode='q=changes.state.new = "resolved"'
 * ```
 *
 * This resource is only available on repositories that have the issue
 * tracker enabled.
 *
 * N.B.
 *
 * The `changes.assignee` and `changes.assignee_account_id` fields are not
 * a `user` object. Instead, they contain the raw `username` and
 * `account_id` of the user. This is to protect the integrity of the audit
 * log even after a user account gets deleted.
 *
 * The `changes.assignee` field is deprecated will disappear in the
 * future. Use `changes.assignee_account_id` instead.
 */
export function getRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdChanges(
  issueId: string,
  repoSlug: string,
  workspace: string,
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedLogEntries
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/issues/${issueId}/changes${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Makes a change to the specified issue.
 *
 * For example, to change an issue's state and assignee, create a new
 * change object that modifies these fields:
 *
 * ```
 * curl https://api.bitbucket.org/2.0/site/master/issues/1234/changes \
 *   -s -u evzijst -X POST -H "Content-Type: application/json" \
 *   -d '{
 *     "changes": {
 *       "assignee_account_id": {
 *         "new": "557058:c0b72ad0-1cb5-4018-9cdc-0cde8492c443"
 *       },
 *       "state": {
 *         "new": 'resolved"
 *       }
 *     }
 *     "message": {
 *       "raw": "This is now resolved."
 *     }
 *   }'
 * ```
 *
 * The above example also includes a custom comment to go alongside the
 * change. This comment will also be visible on the issue page in the UI.
 *
 * The fields of the `changes` object are strings, not objects. This
 * allows for immutable change log records, even after user accounts,
 * milestones, or other objects recorded in a change entry, get renamed or
 * deleted.
 *
 * The `assignee_account_id` field stores the account id. When POSTing a
 * new change and changing the assignee, the client should therefore use
 * the user's account_id in the `changes.assignee_account_id.new` field.
 *
 * This call requires authentication. Private repositories or private
 * issue trackers require the caller to authenticate with an account that
 * has appropriate authorization.
 */
export function postRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdChanges(
  issueId: string,
  repoSlug: string,
  workspace: string,
  issueChange: IssueChange,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: IssueChange
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/issues/${issueId}/changes`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: issueChange,
    })
  )
}
/**
 * Returns the specified issue change object.
 *
 * This resource is only available on repositories that have the issue
 * tracker enabled.
 */
export function getRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdChangesChangeId(
  changeId: string,
  issueId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: IssueChange
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/issues/${issueId}/changes/${changeId}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns a paginated list of all comments that were made on the
 * specified issue.
 *
 * The default sorting is oldest to newest and can be overridden with
 * the `sort` query parameter.
 *
 * This endpoint also supports filtering and sorting of the results. See
 * [filtering and sorting](../../../../../../meta/filtering) for more details.
 */
export function getRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdComments(
  issueId: string,
  repoSlug: string,
  workspace: string,
  {
    q,
  }: {
    q?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedIssueComments
  }>(
    `/repositories/${workspace}/${repoSlug}/issues/${issueId}/comments${QS.query(
      QS.form({
        q,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Creates a new issue comment.
 *
 * ```
 * $ curl
 * https://api.bitbucket.org/2.0/repositories/atlassian/prlinks/issues/42/comments/
 * \
 *   -X POST -u evzijst \
 *   -H 'Content-Type: application/json' \
 *   -d '{"content": {"raw": "Lorem ipsum."}}'
 * ```
 */
export function postRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdComments(
  issueId: string,
  repoSlug: string,
  workspace: string,
  issueComment: IssueComment,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
      }
    | {
        status: 400
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/issues/${issueId}/comments`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: issueComment,
    })
  )
}
/**
 * Deletes the specified comment.
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdCommentsCommentId(
  commentId: number,
  issueId: string,
  repoSlug: string,
  workspace: string,
  issueComment: IssueComment,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/issues/${issueId}/comments/${commentId}`,
    oazapfts.json({
      ...opts,
      method: "DELETE",
      body: issueComment,
    })
  )
}
/**
 * Returns the specified issue comment object.
 */
export function getRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdCommentsCommentId(
  commentId: number,
  issueId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: 200
    data: IssueComment
  }>(
    `/repositories/${workspace}/${repoSlug}/issues/${issueId}/comments/${commentId}`,
    {
      ...opts,
    }
  )
}
/**
 * Updates the content of the specified issue comment. Note that only
 * the `content.raw` field can be modified.
 *
 * ```
 * $ curl
 * https://api.bitbucket.org/2.0/repositories/atlassian/prlinks/issues/42/comments/5728901
 * \
 *   -X PUT -u evzijst \
 *   -H 'Content-Type: application/json' \
 *   -d '{"content": {"raw": "Lorem ipsum."}'
 * ```
 */
export function putRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdCommentsCommentId(
  commentId: number,
  issueId: string,
  repoSlug: string,
  workspace: string,
  issueComment: IssueComment,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: IssueComment
      }
    | {
        status: 400
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/issues/${issueId}/comments/${commentId}`,
    oazapfts.json({
      ...opts,
      method: "PUT",
      body: issueComment,
    })
  )
}
/**
 * Retract your vote.
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdVote(
  issueId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: number
    data: Error
  }>(`/repositories/${workspace}/${repoSlug}/issues/${issueId}/vote`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Check whether the authenticated user has voted for this issue.
 * A 204 status code indicates that the user has voted, while a 404
 * implies they haven't.
 */
export function getRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdVote(
  issueId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
        data: Error
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/issues/${issueId}/vote`, {
    ...opts,
  })
}
/**
 * Vote for this issue.
 *
 * To cast your vote, do an empty PUT. The 204 status code indicates that
 * the operation was successful.
 */
export function putRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdVote(
  issueId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
        data: Error
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/issues/${issueId}/vote`, {
    ...opts,
    method: "PUT",
  })
}
/**
 * Stop watching this issue.
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdWatch(
  issueId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
        data: Error
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/issues/${issueId}/watch`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Indicated whether or not the authenticated user is watching this
 * issue.
 */
export function getRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdWatch(
  issueId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
        data: Error
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/issues/${issueId}/watch`, {
    ...opts,
  })
}
/**
 * Start watching this issue.
 *
 * To start watching this issue, do an empty PUT. The 204 status code
 * indicates that the operation was successful.
 */
export function putRepositoriesByWorkspaceAndRepoSlugIssuesIssueIdWatch(
  issueId: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
        data: Error
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/issues/${issueId}/watch`, {
    ...opts,
    method: "PUT",
  })
}
/**
 * Returns the best common ancestor between two commits, specified in a revspec
 * of 2 commits (e.g. 3a8b42..9ff173).
 *
 * If more than one best common ancestor exists, only one will be returned. It
 * is unspecified which will be returned.
 */
export function getRepositoriesByWorkspaceAndRepoSlugMergeBaseRevspec(
  repoSlug: string,
  revspec: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Commit
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/merge-base/${revspec}`, {
    ...opts,
  })
}
/**
 * Returns the milestones that have been defined in the issue tracker.
 *
 * This resource is only available on repositories that have the issue
 * tracker enabled.
 */
export function getRepositoriesByWorkspaceAndRepoSlugMilestones(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedMilestones
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/milestones`, {
    ...opts,
  })
}
/**
 * Returns the specified issue tracker milestone object.
 */
export function getRepositoriesByWorkspaceAndRepoSlugMilestonesMilestoneId(
  milestoneId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Milestone
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/milestones/${milestoneId}`, {
    ...opts,
  })
}
/**
 * Produces a raw patch for a single commit (diffed against its first
 * parent), or a patch-series for a revspec of 2 commits (e.g.
 * `3a8b42..9ff173` where the first commit represents the source and the
 * second commit the destination).
 *
 * In case of the latter (diffing a revspec), a patch series is returned
 * for the commits on the source branch (`3a8b42` and its ancestors in
 * our example). For Mercurial, a single patch is returned that combines
 * the changes of all commits on the source branch.
 *
 * While similar to diffs, patches:
 *
 * * Have a commit header (username, commit message, etc)
 * * Do not support the `path=foo/bar.py` query parameter
 *
 * The raw patch is returned as-is, in whatever encoding the files in the
 * repository use. It is not decoded into unicode. As such, the
 * content-type is `text/plain`.
 */
export function getRepositoriesByWorkspaceAndRepoSlugPatchSpec(
  repoSlug: string,
  spec: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 555
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/patch/${spec}`, {
    ...opts,
  })
}

/**
 * Update an [application property](/cloud/bitbucket/application-properties/)
 * value stored against a repository.
 */
export function updateRepositoryHostedPropertyValue(
  workspace: string,
  repoSlug: string,
  appKey: string,
  propertyName: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/properties/${appKey}/${propertyName}`,
    {
      ...opts,
      method: "PUT",
    }
  )
}
/**
 * Delete an [application property](/cloud/bitbucket/application-properties/)
 * value stored against a repository.
 */
export function deleteRepositoryHostedPropertyValue(
  workspace: string,
  repoSlug: string,
  appKey: string,
  propertyName: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/properties/${appKey}/${propertyName}`,
    {
      ...opts,
      method: "DELETE",
    }
  )
}
/**
 * Retrieve an [application property](/cloud/bitbucket/application-properties/)
 * value stored against a repository.
 */
export function getRepositoryHostedPropertyValue(
  workspace: string,
  repoSlug: string,
  appKey: string,
  propertyName: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/properties/${appKey}/${propertyName}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns all pull requests on the specified repository.
 *
 * By default only open pull requests are returned. This can be controlled
 * using the `state` query parameter. To retrieve pull requests that are
 * in one of multiple states, repeat the `state` parameter for each
 * individual state.
 *
 * This endpoint also supports filtering and sorting of the results. See
 * [filtering and sorting](../../../../meta/filtering) for more details.
 */
export function getRepositoriesByWorkspaceAndRepoSlugPullrequests(
  repoSlug: string,
  workspace: string,
  {
    state,
  }: {
    state?: "MERGED" | "SUPERSEDED" | "OPEN" | "DECLINED"
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedPullRequests
      }
    | {
        status: 401
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests${QS.query(
      QS.form({
        state,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Creates a new pull request where the destination repository is
 * this repository and the author is the authenticated user.
 *
 * The minimum required fields to create a pull request are `title` and
 * `source`, specified by a branch name.
 *
 * ```
 * curl
 * https://api.bitbucket.org/2.0/repositories/my-workspace/my-repository/pullrequests
 * \
 *     -u my-username:my-password \
 *     --request POST \
 *     --header 'Content-Type: application/json' \
 *     --data '{
 *         "title": "My Title",
 *         "source": {
 *             "branch": {
 *                 "name": "staging"
 *             }
 *         }
 *     }'
 * ```
 *
 * If the pull request's `destination` is not specified, it will default
 * to the `repository.mainbranch`. To open a pull request to a
 * different branch, say from a feature branch to a staging branch,
 * specify a `destination` (same format as the `source`):
 *
 * ```
 * {
 *     "title": "My Title",
 *     "source": {
 *         "branch": {
 *             "name": "my-feature-branch"
 *         }
 *     },
 *     "destination": {
 *         "branch": {
 *             "name": "staging"
 *         }
 *     }
 * }
 * ```
 *
 * Reviewers can be specified by adding an array of user objects as the
 * `reviewers` property.
 *
 * ```
 * {
 *     "title": "My Title",
 *     "source": {
 *         "branch": {
 *             "name": "my-feature-branch"
 *         }
 *     },
 *     "reviewers": [
 *         {
 *             "uuid": "{504c3b62-8120-4f0c-a7bc-87800b9d6f70}"
 *         }
 *     ]
 * }
 * ```
 *
 * Other fields:
 *
 * * `description` - a string
 * * `close_source_branch` - boolean that specifies if the source branch should
 * be closed upon merging
 */
export function postRepositoriesByWorkspaceAndRepoSlugPullrequests(
  repoSlug: string,
  workspace: string,
  pullrequest?: Pullrequest,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: Pullrequest
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 401
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: pullrequest,
    })
  )
}
/**
 * Returns a paginated list of the pull request's activity log.
 *
 * This handler serves both a v20 and internal endpoint. The v20 endpoint
 * returns reviewer comments, updates, approvals and request changes. The
 * internal endpoint includes those plus tasks and attachments.
 *
 * Comments created on a file or a line of code have an inline property.
 *
 * Comment example:
 * ```
 * {
 *     "pagelen": 20,
 *     "values": [
 *         {
 *             "comment": {
 *                 "links": {
 *                     "self": {
 *                         "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/pullrequests/5695/comments/118571088"
 *                     },
 *                     "html": {
 *                         "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/5695/_/diff#comment-118571088"
 *                     }
 *                 },
 *                 "deleted": false,
 *                 "pullrequest": {
 *                     "type": "pullrequest",
 *                     "id": 5695,
 *                     "links": {
 *                         "self": {
 *                             "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/pullrequests/5695"
 *                         },
 *                         "html": {
 *                             "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/5695"
 *                         }
 *                     },
 *                     "title": "username/NONE: small change from onFocus to
 * onClick to handle tabbing through the page and not expand the editor unless
 * a click event triggers it"
 *                 },
 *                 "content": {
 *                     "raw": "inline with to a dn from lines",
 *                     "markup": "markdown",
 *                     "html": "<p>inline with to a dn from lines</p>",
 *                     "type": "rendered"
 *                 },
 *                 "created_on": "2019-09-27T00:33:46.039178+00:00",
 *                 "user": {
 *                     "display_name": "Name Lastname",
 *                     "uuid": "{}",
 *                     "links": {
 *                         "self": {
 *                             "href":
 * "https://bitbucket.org/!api/2.0/users/%7B%7D"
 *                         },
 *                         "html": {
 *                             "href": "https://bitbucket.org/%7B%7D/"
 *                         },
 *                         "avatar": {
 *                             "href":
 * "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/:/128"
 *                         }
 *                     },
 *                     "type": "user",
 *                     "nickname": "Name",
 *                     "account_id": ""
 *                 },
 *                 "created_on": "2019-09-27T00:33:46.039178+00:00",
 *                 "user": {
 *                     "display_name": "Name Lastname",
 *                     "uuid": "{}",
 *                     "links": {
 *                         "self": {
 *                             "href":
 * "https://bitbucket.org/!api/2.0/users/%7B%7D"
 *                         },
 *                         "html": {
 *                             "href": "https://bitbucket.org/%7B%7D/"
 *                         },
 *                         "avatar": {
 *                             "href":
 * "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/:/128"
 *                         }
 *                     },
 *                     "type": "user",
 *                     "nickname": "Name",
 *                     "account_id": ""
 *                 },
 *                 "updated_on": "2019-09-27T00:33:46.055384+00:00",
 *                 "inline": {
 *                     "context_lines": "",
 *                     "to": null,
 *                     "path": "",
 *                     "outdated": false,
 *                     "from": 211
 *                 },
 *                 "type": "pullrequest_comment",
 *                 "id": 118571088
 *             },
 *             "pull_request": {
 *                 "type": "pullrequest",
 *                 "id": 5695,
 *                 "links": {
 *                     "self": {
 *                         "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/pullrequests/5695"
 *                     },
 *                     "html": {
 *                         "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/5695"
 *                     }
 *                 },
 *                 "title": "username/NONE: small change from onFocus to
 * onClick to handle tabbing through the page and not expand the editor unless
 * a click event triggers it"
 *             }
 *         }
 *     ]
 * }
 * ```
 *
 * Updates include a state property of OPEN, MERGED, or DECLINED.
 *
 * Update example:
 * ```
 * {
 *     "pagelen": 20,
 *     "values": [
 *         {
 *             "update": {
 *                 "description": "",
 *                 "title": "username/NONE: small change from onFocus to
 * onClick to handle tabbing through the page and not expand the editor unless
 * a click event triggers it",
 *                 "destination": {
 *                     "commit": {
 *                         "type": "commit",
 *                         "hash": "6a2c16e4a152",
 *                         "links": {
 *                             "self": {
 *                                 "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/commit/6a2c16e4a152"
 *                             },
 *                             "html": {
 *                                 "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6a2c16e4a152"
 *                             }
 *                         }
 *                     },
 *                     "branch": {
 *                         "name": "master"
 *                     },
 *                     "repository": {
 *                         "name": "Atlaskit-MK-2",
 *                         "type": "repository",
 *                         "full_name": "atlassian/atlaskit-mk-2",
 *                         "links": {
 *                             "self": {
 *                                 "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2"
 *                             },
 *                             "html": {
 *                                 "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2"
 *                             },
 *                             "avatar": {
 *                                 "href":
 * "https://bytebucket.org/ravatar/%7B%7D?ts=js"
 *                             }
 *                         },
 *                         "uuid": "{}"
 *                     }
 *                 },
 *                 "reason": "",
 *                 "source": {
 *                     "commit": {
 *                         "type": "commit",
 *                         "hash": "728c8bad1813",
 *                         "links": {
 *                             "self": {
 *                                 "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/commit/728c8bad1813"
 *                             },
 *                             "html": {
 *                                 "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/commits/728c8bad1813"
 *                             }
 *                         }
 *                     },
 *                     "branch": {
 *                         "name":
 * "username/NONE-add-onClick-prop-for-accessibility"
 *                     },
 *                     "repository": {
 *                         "name": "Atlaskit-MK-2",
 *                         "type": "repository",
 *                         "full_name": "atlassian/atlaskit-mk-2",
 *                         "links": {
 *                             "self": {
 *                                 "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2"
 *                             },
 *                             "html": {
 *                                 "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2"
 *                             },
 *                             "avatar": {
 *                                 "href":
 * "https://bytebucket.org/ravatar/%7B%7D?ts=js"
 *                             }
 *                         },
 *                         "uuid": "{}"
 *                     }
 *                 },
 *                 "state": "OPEN",
 *                 "author": {
 *                     "display_name": "Name Lastname",
 *                     "uuid": "{}",
 *                     "links": {
 *                         "self": {
 *                             "href":
 * "https://bitbucket.org/!api/2.0/users/%7B%7D"
 *                         },
 *                         "html": {
 *                             "href": "https://bitbucket.org/%7B%7D/"
 *                         },
 *                         "avatar": {
 *                             "href":
 * "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/:/128"
 *                         }
 *                     },
 *                     "type": "user",
 *                     "nickname": "Name",
 *                     "account_id": ""
 *                 },
 *                 "date": "2019-05-10T06:48:25.305565+00:00"
 *             },
 *             "pull_request": {
 *                 "type": "pullrequest",
 *                 "id": 5695,
 *                 "links": {
 *                     "self": {
 *                         "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/pullrequests/5695"
 *                     },
 *                     "html": {
 *                         "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/5695"
 *                     }
 *                 },
 *                 "title": "username/NONE: small change from onFocus to
 * onClick to handle tabbing through the page and not expand the editor unless
 * a click event triggers it"
 *             }
 *         }
 *     ]
 * }
 * ```
 *
 * Approval example:
 * ```
 * {
 *     "pagelen": 20,
 *     "values": [
 *         {
 *             "approval": {
 *                 "date": "2019-09-27T00:37:19.849534+00:00",
 *                 "pullrequest": {
 *                     "type": "pullrequest",
 *                     "id": 5695,
 *                     "links": {
 *                         "self": {
 *                             "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/pullrequests/5695"
 *                         },
 *                         "html": {
 *                             "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/5695"
 *                         }
 *                     },
 *                     "title": "username/NONE: small change from onFocus to
 * onClick to handle tabbing through the page and not expand the editor unless
 * a click event triggers it"
 *                 },
 *                 "user": {
 *                     "display_name": "Name Lastname",
 *                     "uuid": "{}",
 *                     "links": {
 *                         "self": {
 *                             "href":
 * "https://bitbucket.org/!api/2.0/users/%7B%7D"
 *                         },
 *                         "html": {
 *                             "href": "https://bitbucket.org/%7B%7D/"
 *                         },
 *                         "avatar": {
 *                             "href":
 * "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/:/128"
 *                         }
 *                     },
 *                     "type": "user",
 *                     "nickname": "Name",
 *                     "account_id": ""
 *                 }
 *             },
 *             "pull_request": {
 *                 "type": "pullrequest",
 *                 "id": 5695,
 *                 "links": {
 *                     "self": {
 *                         "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/pullrequests/5695"
 *                     },
 *                     "html": {
 *                         "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/5695"
 *                     }
 *                 },
 *                 "title": "username/NONE: small change from onFocus to
 * onClick to handle tabbing through the page and not expand the editor unless
 * a click event triggers it"
 *             }
 *         }
 *     ]
 * }
 * ```
 */
export function getRepositoriesByWorkspaceAndRepoSlugPullrequestsActivity(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 401
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/pullrequests/activity`, {
    ...opts,
  })
}
/**
 * Returns the specified pull request.
 */
export function getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestId(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Pullrequest
      }
    | {
        status: 401
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}`, {
    ...opts,
  })
}
/**
 * Mutates the specified pull request.
 *
 * This can be used to change the pull request's branches or description.
 *
 * Only open pull requests can be mutated.
 */
export function putRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestId(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  pullrequest?: Pullrequest,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Pullrequest
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}`,
    oazapfts.json({
      ...opts,
      method: "PUT",
      body: pullrequest,
    })
  )
}
/**
 * Returns a paginated list of the pull request's activity log.
 *
 * This handler serves both a v20 and internal endpoint. The v20 endpoint
 * returns reviewer comments, updates, approvals and request changes. The
 * internal endpoint includes those plus tasks and attachments.
 *
 * Comments created on a file or a line of code have an inline property.
 *
 * Comment example:
 * ```
 * {
 *     "pagelen": 20,
 *     "values": [
 *         {
 *             "comment": {
 *                 "links": {
 *                     "self": {
 *                         "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/pullrequests/5695/comments/118571088"
 *                     },
 *                     "html": {
 *                         "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/5695/_/diff#comment-118571088"
 *                     }
 *                 },
 *                 "deleted": false,
 *                 "pullrequest": {
 *                     "type": "pullrequest",
 *                     "id": 5695,
 *                     "links": {
 *                         "self": {
 *                             "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/pullrequests/5695"
 *                         },
 *                         "html": {
 *                             "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/5695"
 *                         }
 *                     },
 *                     "title": "username/NONE: small change from onFocus to
 * onClick to handle tabbing through the page and not expand the editor unless
 * a click event triggers it"
 *                 },
 *                 "content": {
 *                     "raw": "inline with to a dn from lines",
 *                     "markup": "markdown",
 *                     "html": "<p>inline with to a dn from lines</p>",
 *                     "type": "rendered"
 *                 },
 *                 "created_on": "2019-09-27T00:33:46.039178+00:00",
 *                 "user": {
 *                     "display_name": "Name Lastname",
 *                     "uuid": "{}",
 *                     "links": {
 *                         "self": {
 *                             "href":
 * "https://bitbucket.org/!api/2.0/users/%7B%7D"
 *                         },
 *                         "html": {
 *                             "href": "https://bitbucket.org/%7B%7D/"
 *                         },
 *                         "avatar": {
 *                             "href":
 * "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/:/128"
 *                         }
 *                     },
 *                     "type": "user",
 *                     "nickname": "Name",
 *                     "account_id": ""
 *                 },
 *                 "created_on": "2019-09-27T00:33:46.039178+00:00",
 *                 "user": {
 *                     "display_name": "Name Lastname",
 *                     "uuid": "{}",
 *                     "links": {
 *                         "self": {
 *                             "href":
 * "https://bitbucket.org/!api/2.0/users/%7B%7D"
 *                         },
 *                         "html": {
 *                             "href": "https://bitbucket.org/%7B%7D/"
 *                         },
 *                         "avatar": {
 *                             "href":
 * "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/:/128"
 *                         }
 *                     },
 *                     "type": "user",
 *                     "nickname": "Name",
 *                     "account_id": ""
 *                 },
 *                 "updated_on": "2019-09-27T00:33:46.055384+00:00",
 *                 "inline": {
 *                     "context_lines": "",
 *                     "to": null,
 *                     "path": "",
 *                     "outdated": false,
 *                     "from": 211
 *                 },
 *                 "type": "pullrequest_comment",
 *                 "id": 118571088
 *             },
 *             "pull_request": {
 *                 "type": "pullrequest",
 *                 "id": 5695,
 *                 "links": {
 *                     "self": {
 *                         "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/pullrequests/5695"
 *                     },
 *                     "html": {
 *                         "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/5695"
 *                     }
 *                 },
 *                 "title": "username/NONE: small change from onFocus to
 * onClick to handle tabbing through the page and not expand the editor unless
 * a click event triggers it"
 *             }
 *         }
 *     ]
 * }
 * ```
 *
 * Updates include a state property of OPEN, MERGED, or DECLINED.
 *
 * Update example:
 * ```
 * {
 *     "pagelen": 20,
 *     "values": [
 *         {
 *             "update": {
 *                 "description": "",
 *                 "title": "username/NONE: small change from onFocus to
 * onClick to handle tabbing through the page and not expand the editor unless
 * a click event triggers it",
 *                 "destination": {
 *                     "commit": {
 *                         "type": "commit",
 *                         "hash": "6a2c16e4a152",
 *                         "links": {
 *                             "self": {
 *                                 "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/commit/6a2c16e4a152"
 *                             },
 *                             "html": {
 *                                 "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6a2c16e4a152"
 *                             }
 *                         }
 *                     },
 *                     "branch": {
 *                         "name": "master"
 *                     },
 *                     "repository": {
 *                         "name": "Atlaskit-MK-2",
 *                         "type": "repository",
 *                         "full_name": "atlassian/atlaskit-mk-2",
 *                         "links": {
 *                             "self": {
 *                                 "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2"
 *                             },
 *                             "html": {
 *                                 "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2"
 *                             },
 *                             "avatar": {
 *                                 "href":
 * "https://bytebucket.org/ravatar/%7B%7D?ts=js"
 *                             }
 *                         },
 *                         "uuid": "{}"
 *                     }
 *                 },
 *                 "reason": "",
 *                 "source": {
 *                     "commit": {
 *                         "type": "commit",
 *                         "hash": "728c8bad1813",
 *                         "links": {
 *                             "self": {
 *                                 "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/commit/728c8bad1813"
 *                             },
 *                             "html": {
 *                                 "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/commits/728c8bad1813"
 *                             }
 *                         }
 *                     },
 *                     "branch": {
 *                         "name":
 * "username/NONE-add-onClick-prop-for-accessibility"
 *                     },
 *                     "repository": {
 *                         "name": "Atlaskit-MK-2",
 *                         "type": "repository",
 *                         "full_name": "atlassian/atlaskit-mk-2",
 *                         "links": {
 *                             "self": {
 *                                 "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2"
 *                             },
 *                             "html": {
 *                                 "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2"
 *                             },
 *                             "avatar": {
 *                                 "href":
 * "https://bytebucket.org/ravatar/%7B%7D?ts=js"
 *                             }
 *                         },
 *                         "uuid": "{}"
 *                     }
 *                 },
 *                 "state": "OPEN",
 *                 "author": {
 *                     "display_name": "Name Lastname",
 *                     "uuid": "{}",
 *                     "links": {
 *                         "self": {
 *                             "href":
 * "https://bitbucket.org/!api/2.0/users/%7B%7D"
 *                         },
 *                         "html": {
 *                             "href": "https://bitbucket.org/%7B%7D/"
 *                         },
 *                         "avatar": {
 *                             "href":
 * "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/:/128"
 *                         }
 *                     },
 *                     "type": "user",
 *                     "nickname": "Name",
 *                     "account_id": ""
 *                 },
 *                 "date": "2019-05-10T06:48:25.305565+00:00"
 *             },
 *             "pull_request": {
 *                 "type": "pullrequest",
 *                 "id": 5695,
 *                 "links": {
 *                     "self": {
 *                         "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/pullrequests/5695"
 *                     },
 *                     "html": {
 *                         "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/5695"
 *                     }
 *                 },
 *                 "title": "username/NONE: small change from onFocus to
 * onClick to handle tabbing through the page and not expand the editor unless
 * a click event triggers it"
 *             }
 *         }
 *     ]
 * }
 * ```
 *
 * Approval example:
 * ```
 * {
 *     "pagelen": 20,
 *     "values": [
 *         {
 *             "approval": {
 *                 "date": "2019-09-27T00:37:19.849534+00:00",
 *                 "pullrequest": {
 *                     "type": "pullrequest",
 *                     "id": 5695,
 *                     "links": {
 *                         "self": {
 *                             "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/pullrequests/5695"
 *                         },
 *                         "html": {
 *                             "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/5695"
 *                         }
 *                     },
 *                     "title": "username/NONE: small change from onFocus to
 * onClick to handle tabbing through the page and not expand the editor unless
 * a click event triggers it"
 *                 },
 *                 "user": {
 *                     "display_name": "Name Lastname",
 *                     "uuid": "{}",
 *                     "links": {
 *                         "self": {
 *                             "href":
 * "https://bitbucket.org/!api/2.0/users/%7B%7D"
 *                         },
 *                         "html": {
 *                             "href": "https://bitbucket.org/%7B%7D/"
 *                         },
 *                         "avatar": {
 *                             "href":
 * "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/:/128"
 *                         }
 *                     },
 *                     "type": "user",
 *                     "nickname": "Name",
 *                     "account_id": ""
 *                 }
 *             },
 *             "pull_request": {
 *                 "type": "pullrequest",
 *                 "id": 5695,
 *                 "links": {
 *                     "self": {
 *                         "href":
 * "https://bitbucket.org/!api/2.0/repositories/atlassian/atlaskit-mk-2/pullrequests/5695"
 *                     },
 *                     "html": {
 *                         "href":
 * "https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/5695"
 *                     }
 *                 },
 *                 "title": "username/NONE: small change from onFocus to
 * onClick to handle tabbing through the page and not expand the editor unless
 * a click event triggers it"
 *             }
 *         }
 *     ]
 * }
 * ```
 */
export function getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdActivity(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 401
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/activity`,
    {
      ...opts,
    }
  )
}
/**
 * Redact the authenticated user's approval of the specified pull
 * request.
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdApprove(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/approve`,
    {
      ...opts,
      method: "DELETE",
    }
  )
}
/**
 * Approve the specified pull request as the authenticated user.
 */
export function postRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdApprove(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Participant
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/approve`,
    {
      ...opts,
      method: "POST",
    }
  )
}
/**
 * Returns a paginated list of the pull request's comments.
 *
 * This includes both global, inline comments and replies.
 *
 * The default sorting is oldest to newest and can be overridden with
 * the `sort` query parameter.
 *
 * This endpoint also supports filtering and sorting of the results. See
 * [filtering and sorting](../../../../../../meta/filtering) for more
 * details.
 */
export function getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdComments(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedPullRequestComments
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/comments`,
    {
      ...opts,
    }
  )
}
/**
 * Creates a new pull request comment.
 *
 * Returns the newly created pull request comment.
 */
export function postRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdComments(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  pullrequestComment: PullrequestComment,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: PullrequestComment
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/comments`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: pullrequestComment,
    })
  )
}
/**
 * Deletes a specific pull request comment.
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdCommentsCommentId(
  commentId: number,
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/comments/${commentId}`,
    {
      ...opts,
      method: "DELETE",
    }
  )
}
/**
 * Returns a specific pull request comment.
 */
export function getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdCommentsCommentId(
  commentId: number,
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PullrequestComment
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/comments/${commentId}`,
    {
      ...opts,
    }
  )
}
/**
 * Updates a specific pull request comment.
 */
export function putRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdCommentsCommentId(
  commentId: number,
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  pullrequestComment: PullrequestComment,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PullrequestComment
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/comments/${commentId}`,
    oazapfts.json({
      ...opts,
      method: "PUT",
      body: pullrequestComment,
    })
  )
}
/**
 * Returns a paginated list of the pull request's commits.
 *
 * These are the commits that are being merged into the destination
 * branch when the pull requests gets accepted.
 */
export function getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdCommits(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/commits`,
    {
      ...opts,
    }
  )
}
/**
 * Declines the pull request.
 */
export function postRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdDecline(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Pullrequest
      }
    | {
        status: 555
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/decline`,
    {
      ...opts,
      method: "POST",
    }
  )
}
/**
 * Redirects to the [repository diff](../../diff/%7Bspec%7D)
 * with the revspec that corresponds to the pull request.
 */
export function getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdDiff(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/diff`,
    {
      ...opts,
    }
  )
}
/**
 * Redirects to the [repository diffstat](../../diffstat/%7Bspec%7D)
 * with the revspec that corresponds to the pull request.
 */
export function getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdDiffstat(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/diffstat`,
    {
      ...opts,
    }
  )
}
/**
 * Merges the pull request.
 */
export function postRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdMerge(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  pullrequestMergeParameters?: PullRequestMergeParameters,
  {
    async,
  }: {
    async?: boolean
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Pullrequest
      }
    | {
        status: 202
      }
    | {
        status: 555
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/merge${QS.query(
      QS.form({
        async,
      })
    )}`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: pullrequestMergeParameters,
    })
  )
}
/**
 * When merging a pull request takes too long, the client receives a
 * task ID along with a 202 status code. The task ID can be used in a call
 * to this endpoint to check the status of a merge task.
 *
 * ```
 * curl -X GET
 * https://api.bitbucket.org/2.0/repositories/atlassian/bitbucket/pullrequests/2286/merge/task-status/<task_id>
 * ```
 *
 * If the merge task is not yet finished, a PENDING status will be returned.
 *
 * ```
 * HTTP/2 200
 * {
 *     "task_status": "PENDING",
 *     "links": {
 *         "self": {
 *             "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/bitbucket/pullrequests/2286/merge/task-status/<task_id>"
 *         }
 *     }
 * }
 * ```
 *
 * If the merge was successful, a SUCCESS status will be returned.
 *
 * ```
 * HTTP/2 200
 * {
 *     "task_status": "SUCCESS",
 *     "links": {
 *         "self": {
 *             "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/bitbucket/pullrequests/2286/merge/task-status/<task_id>"
 *         }
 *     },
 *     "merge_result": <the merged pull request object>
 * }
 * ```
 *
 * If the merge task failed, an error will be returned.
 *
 * ```
 * {
 *     "type": "error",
 *     "error": {
 *         "message": "<error message>"
 *     }
 * }
 * ```
 */
export function getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdMergeTaskStatusTaskId(
  pullRequestId: number,
  repoSlug: string,
  taskId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/merge/task-status/${taskId}`,
    {
      ...opts,
    }
  )
}
/**
 * Redirects to the [repository patch](../../patch/%7Bspec%7D)
 * with the revspec that corresponds to pull request.
 */
export function getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdPatch(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/patch`,
    {
      ...opts,
    }
  )
}
export function deleteRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdRequestChanges(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/request-changes`,
    {
      ...opts,
      method: "DELETE",
    }
  )
}
export function postRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdRequestChanges(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Participant
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/request-changes`,
    {
      ...opts,
      method: "POST",
    }
  )
}
/**
 * Returns all statuses (e.g. build results) for the given pull
 * request.
 */
export function getRepositoriesByWorkspaceAndRepoSlugPullrequestsPullRequestIdStatuses(
  pullRequestId: number,
  repoSlug: string,
  workspace: string,
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedCommitStatuses
      }
    | {
        status: 401
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/statuses${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Update an [application property](/cloud/bitbucket/application-properties/)
 * value stored against a pull request.
 */
export function updatePullRequestHostedPropertyValue(
  workspace: string,
  repoSlug: string,
  pullrequestId: string,
  appKey: string,
  propertyName: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullrequestId}/properties/${appKey}/${propertyName}`,
    {
      ...opts,
      method: "PUT",
    }
  )
}
/**
 * Delete an [application property](/cloud/bitbucket/application-properties/)
 * value stored against a pull request.
 */
export function deletePullRequestHostedPropertyValue(
  workspace: string,
  repoSlug: string,
  pullrequestId: string,
  appKey: string,
  propertyName: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullrequestId}/properties/${appKey}/${propertyName}`,
    {
      ...opts,
      method: "DELETE",
    }
  )
}
/**
 * Retrieve an [application property](/cloud/bitbucket/application-properties/)
 * value stored against a pull request.
 */
export function getPullRequestHostedPropertyValue(
  workspace: string,
  repoSlug: string,
  pullrequestId: string,
  appKey: string,
  propertyName: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/repositories/${workspace}/${repoSlug}/pullrequests/${pullrequestId}/properties/${appKey}/${propertyName}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns the branches and tags in the repository.
 *
 * By default, results will be in the order the underlying source control
 * system returns them and identical to the ordering one sees when running "$
 * git show-ref". Note that this follows simple lexical ordering of the ref
 * names.
 *
 * This can be undesirable as it does apply any natural sorting semantics,
 * meaning for instance that refs are sorted ["branch1", "branch10", "branch2",
 * "v10", "v11", "v9"] instead of ["branch1", "branch2",
 * "branch10", "v9", "v10", "v11"].
 *
 * Sorting can be changed using the ?sort= query parameter. When using
 * ?sort=name to explicitly sort on ref name, Bitbucket will apply natural
 * sorting and interpret numerical values as numbers instead of strings.
 */
export function getRepositoriesByWorkspaceAndRepoSlugRefs(
  repoSlug: string,
  workspace: string,
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedRefs
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/refs${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns a list of all open branches within the specified repository.
 *         Results will be in the order the source control manager returns
 * them.
 *
 *         ```
 *         $ curl -s
 * https://api.bitbucket.org/2.0/repositories/atlassian/aui/refs/branches?pagelen=1
 * | jq .
 *         {
 *           "pagelen": 1,
 *           "size": 187,
 *           "values": [
 *             {
 *               "name": "issue-9.3/AUI-5343-assistive-class",
 *               "links": {
 *                 "commits": {
 *                   "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/commits/issue-9.3/AUI-5343-assistive-class"
 *                 },
 *                 "self": {
 *                   "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/refs/branches/issue-9.3/AUI-5343-assistive-class"
 *                 },
 *                 "html": {
 *                   "href":
 * "https://bitbucket.org/atlassian/aui/branch/issue-9.3/AUI-5343-assistive-class"
 *                 }
 *               },
 *               "default_merge_strategy": "squash",
 *               "merge_strategies": [
 *                 "merge_commit",
 *                 "squash",
 *                 "fast_forward"
 *               ],
 *               "type": "branch",
 *               "target": {
 *                 "hash": "e5d1cde9069fcb9f0af90403a4de2150c125a148",
 *                 "repository": {
 *                   "links": {
 *                     "self": {
 *                       "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui"
 *                     },
 *                     "html": {
 *                       "href": "https://bitbucket.org/atlassian/aui"
 *                     },
 *                     "avatar": {
 *                       "href":
 * "https://bytebucket.org/ravatar/%7B585074de-7b60-4fd1-81ed-e0bc7fafbda5%7D?ts=86317"
 *                     }
 *                   },
 *                   "type": "repository",
 *                   "name": "aui",
 *                   "full_name": "atlassian/aui",
 *                   "uuid": "{585074de-7b60-4fd1-81ed-e0bc7fafbda5}"
 *                 },
 *                 "links": {
 *                   "self": {
 *                     "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/commit/e5d1cde9069fcb9f0af90403a4de2150c125a148"
 *                   },
 *                   "comments": {
 *                     "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/commit/e5d1cde9069fcb9f0af90403a4de2150c125a148/comments"
 *                   },
 *                   "patch": {
 *                     "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/patch/e5d1cde9069fcb9f0af90403a4de2150c125a148"
 *                   },
 *                   "html": {
 *                     "href":
 * "https://bitbucket.org/atlassian/aui/commits/e5d1cde9069fcb9f0af90403a4de2150c125a148"
 *                   },
 *                   "diff": {
 *                     "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/diff/e5d1cde9069fcb9f0af90403a4de2150c125a148"
 *                   },
 *                   "approve": {
 *                     "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/commit/e5d1cde9069fcb9f0af90403a4de2150c125a148/approve"
 *                   },
 *                   "statuses": {
 *                     "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/commit/e5d1cde9069fcb9f0af90403a4de2150c125a148/statuses"
 *                   }
 *                 },
 *                 "author": {
 *                   "raw": "Marcin Konopka <mkonopka@atlassian.com>",
 *                   "type": "author",
 *                   "user": {
 *                     "display_name": "Marcin Konopka",
 *                     "uuid": "{47cc24f4-2a05-4420-88fe-0417535a110a}",
 *                     "links": {
 *                       "self": {
 *                         "href":
 * "https://api.bitbucket.org/2.0/users/%7B47cc24f4-2a05-4420-88fe-0417535a110a%7D"
 *                       },
 *                       "html": {
 *                         "href":
 * "https://bitbucket.org/%7B47cc24f4-2a05-4420-88fe-0417535a110a%7D/"
 *                       },
 *                       "avatar": {
 *                         "href":
 * "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/MK-1.png"
 *                       }
 *                     },
 *                     "nickname": "Marcin Konopka",
 *                     "type": "user",
 *                     "account_id": "60113d2b47a9540069f4de03"
 *                   }
 *                 },
 *                 "parents": [
 *                   {
 *                     "hash": "87f7fc92b00464ae47b13ef65c91884e4ac9be51",
 *                     "type": "commit",
 *                     "links": {
 *                       "self": {
 *                         "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/commit/87f7fc92b00464ae47b13ef65c91884e4ac9be51"
 *                       },
 *                       "html": {
 *                         "href":
 * "https://bitbucket.org/atlassian/aui/commits/87f7fc92b00464ae47b13ef65c91884e4ac9be51"
 *                       }
 *                     }
 *                   }
 *                 ],
 *                 "date": "2021-04-13T13:44:49+00:00",
 *                 "message": "wip
 * ",
 *                 "type": "commit"
 *               }
 *             }
 *           ],
 *           "page": 1,
 *           "next":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/refs/branches?pagelen=1&page=2"
 *         }
 *         ```
 *
 *         Branches support [filtering and
 * sorting](../../../../../meta/filtering) that can be used to search for
 * specific branches. For instance, to find all branches that have "stab" in
 * their name:
 *
 *         ```
 *         curl -s
 * https://api.bitbucket.org/2.0/repositories/atlassian/aui/refs/branches -G
 * --data-urlencode 'q=name ~ "stab"'
 *         ```
 *
 *         By default, results will be in the order the underlying source
 * control system returns them and identical to the ordering one sees when
 * running "$ hg branches" or "$ git branch --list". Note that this follows
 * simple lexical ordering of the ref names.
 *
 *         This can be undesirable as it does apply any natural sorting
 * semantics, meaning for instance that tags are sorted ["v10", "v11", "v9"]
 * instead of ["v9", "v10", "v11"].
 *
 *         Sorting can be changed using the ?q= query parameter. When using
 * ?q=name to explicitly sort on ref name, Bitbucket will apply natural sorting
 * and interpret numerical values as numbers instead of strings.
 */
export function getRepositoriesByWorkspaceAndRepoSlugRefsBranches(
  repoSlug: string,
  workspace: string,
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedBranches
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/refs/branches${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Creates a new branch in the specified repository.
 *
 * The payload of the POST should consist of a JSON document that
 * contains the name of the tag and the target hash.
 *
 * ```
 * curl https://api.bitbucket.org/2.0/repositories/seanfarley/hg/refs/branches \
 * -s -u seanfarley -X POST -H "Content-Type: application/json" \
 * -d '{
 *     "name" : "smf/create-feature",
 *     "target" : {
 *         "hash" : "default",
 *     }
 * }'
 * ```
 *
 * This call requires authentication. Private repositories require the
 * caller to authenticate with an account that has appropriate
 * authorization.
 *
 * The branch name should not include any prefixes (e.g.
 * refs/heads). This endpoint does support using short hash prefixes for
 * the commit hash, but it may return a 400 response if the provided
 * prefix is ambiguous. Using a full commit hash is the preferred
 * approach.
 */
export function postRepositoriesByWorkspaceAndRepoSlugRefsBranches(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: Branch
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/refs/branches`, {
    ...opts,
    method: "POST",
  })
}
/**
 * Delete a branch in the specified repository.
 *
 * The main branch is not allowed to be deleted and will return a 400
 * response.
 *
 * The branch name should not include any prefixes (e.g.
 * refs/heads).
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugRefsBranchesName(
  name: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/refs/branches/${name}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Returns a branch object within the specified repository.
 *
 *         ```
 *         $ curl -s
 * https://api.bitbucket.org/2.0/repositories/atlassian/aui/refs/branches/master
 * | jq .
 *         {
 *           "name": "master",
 *           "links": {
 *             "commits": {
 *               "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/commits/master"
 *             },
 *             "self": {
 *               "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/refs/branches/master"
 *             },
 *             "html": {
 *               "href": "https://bitbucket.org/atlassian/aui/branch/master"
 *             }
 *           },
 *           "default_merge_strategy": "squash",
 *           "merge_strategies": [
 *             "merge_commit",
 *             "squash",
 *             "fast_forward"
 *           ],
 *           "type": "branch",
 *           "target": {
 *             "hash": "e7d158ff7ed5538c28f94cd97a9ad569680fc94e",
 *             "repository": {
 *               "links": {
 *                 "self": {
 *                   "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui"
 *                 },
 *                 "html": {
 *                   "href": "https://bitbucket.org/atlassian/aui"
 *                 },
 *                 "avatar": {
 *                   "href":
 * "https://bytebucket.org/ravatar/%7B585074de-7b60-4fd1-81ed-e0bc7fafbda5%7D?ts=86317"
 *                 }
 *               },
 *               "type": "repository",
 *               "name": "aui",
 *               "full_name": "atlassian/aui",
 *               "uuid": "{585074de-7b60-4fd1-81ed-e0bc7fafbda5}"
 *             },
 *             "links": {
 *               "self": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/commit/e7d158ff7ed5538c28f94cd97a9ad569680fc94e"
 *               },
 *               "comments": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/commit/e7d158ff7ed5538c28f94cd97a9ad569680fc94e/comments"
 *               },
 *               "patch": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/patch/e7d158ff7ed5538c28f94cd97a9ad569680fc94e"
 *               },
 *               "html": {
 *                 "href":
 * "https://bitbucket.org/atlassian/aui/commits/e7d158ff7ed5538c28f94cd97a9ad569680fc94e"
 *               },
 *               "diff": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/diff/e7d158ff7ed5538c28f94cd97a9ad569680fc94e"
 *               },
 *               "approve": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/commit/e7d158ff7ed5538c28f94cd97a9ad569680fc94e/approve"
 *               },
 *               "statuses": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/commit/e7d158ff7ed5538c28f94cd97a9ad569680fc94e/statuses"
 *               }
 *             },
 *             "author": {
 *               "raw": "psre-renovate-bot <psre-renovate-bot@atlassian.com>",
 *               "type": "author",
 *               "user": {
 *                 "display_name": "psre-renovate-bot",
 *                 "uuid": "{250a442a-3ab3-4fcb-87c3-3c8f3df65ec7}",
 *                 "links": {
 *                   "self": {
 *                     "href":
 * "https://api.bitbucket.org/2.0/users/%7B250a442a-3ab3-4fcb-87c3-3c8f3df65ec7%7D"
 *                   },
 *                   "html": {
 *                     "href":
 * "https://bitbucket.org/%7B250a442a-3ab3-4fcb-87c3-3c8f3df65ec7%7D/"
 *                   },
 *                   "avatar": {
 *                     "href":
 * "https://secure.gravatar.com/avatar/6972ee037c9f36360170a86f544071a2?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FP-3.png"
 *                   }
 *                 },
 *                 "nickname": "Renovate Bot",
 *                 "type": "user",
 *                 "account_id": "5d5355e8c6b9320d9ea5b28d"
 *               }
 *             },
 *             "parents": [
 *               {
 *                 "hash": "eab868a309e75733de80969a7bed1ec6d4651e06",
 *                 "type": "commit",
 *                 "links": {
 *                   "self": {
 *                     "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/aui/commit/eab868a309e75733de80969a7bed1ec6d4651e06"
 *                   },
 *                   "html": {
 *                     "href":
 * "https://bitbucket.org/atlassian/aui/commits/eab868a309e75733de80969a7bed1ec6d4651e06"
 *                   }
 *                 }
 *               }
 *             ],
 *             "date": "2021-04-12T06:44:38+00:00",
 *             "message": "Merged in issue/NONE-renovate-master-babel-monorepo
 * (pull request #2883)
 *
 * chore(deps): update babel monorepo to v7.13.15 (master)
 *
 * Approved-by: Chris "Daz" Darroch
 * ",
 *             "type": "commit"
 *           }
 *         }
 *         ```
 *
 *         This call requires authentication. Private repositories require the
 *         caller to authenticate with an account that has appropriate
 *         authorization.
 *
 *         For Git, the branch name should not include any prefixes (e.g.
 *         refs/heads).
 */
export function getRepositoriesByWorkspaceAndRepoSlugRefsBranchesName(
  name: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Branch
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/refs/branches/${name}`, {
    ...opts,
  })
}
/**
 * Returns the tags in the repository.
 *
 * By default, results will be in the order the underlying source control
 * system returns them and identical to the ordering one sees when running "$
 * hg tags" or "$ git tag --list". Note that this follows simple lexical
 * ordering of the ref names.
 *
 * This can be undesirable as it does apply any natural sorting semantics,
 * meaning for instance that tags are sorted ["v10", "v11", "v9"] instead of
 * ["v9", "v10", "v11"].
 *
 * Sorting can be changed using the ?sort= query parameter. When using
 * ?sort=name to explicitly sort on ref name, Bitbucket will apply natural
 * sorting and interpret numerical values as numbers instead of strings.
 */
export function getRepositoriesByWorkspaceAndRepoSlugRefsTags(
  repoSlug: string,
  workspace: string,
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedTags
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/refs/tags${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Creates a new tag in the specified repository.
 *
 * The payload of the POST should consist of a JSON document that
 * contains the name of the tag and the target hash.
 *
 * ```
 * curl https://api.bitbucket.org/2.0/repositories/jdoe/myrepo/refs/tags \
 * -s -u jdoe -X POST -H "Content-Type: application/json" \
 * -d '{
 *     "name" : "new-tag-name",
 *     "target" : {
 *         "hash" : "a1b2c3d4e5f6",
 *     }
 * }'
 * ```
 *
 * This endpoint does support using short hash prefixes for the commit
 * hash, but it may return a 400 response if the provided prefix is
 * ambiguous. Using a full commit hash is the preferred approach.
 */
export function postRepositoriesByWorkspaceAndRepoSlugRefsTags(
  repoSlug: string,
  workspace: string,
  tag: Tag,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: Tag
      }
    | {
        status: 400
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/refs/tags`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: tag,
    })
  )
}
/**
 * Delete a tag in the specified repository.
 *
 * For Git, the tag name should not include any prefixes (e.g. refs/tags).
 * For Mercurial, this adds a commit to the main branch that removes the
 * specified tag.
 */
export function deleteRepositoriesByWorkspaceAndRepoSlugRefsTagsName(
  name: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/refs/tags/${name}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Returns the specified tag.
 *
 * ```
 * $ curl -s
 * https://api.bitbucket.org/2.0/repositories/seanfarley/hg/refs/tags/3.8 -G |
 * jq .
 * {
 *   "name": "3.8",
 *   "links": {
 *     "commits": {
 *       "href":
 * "https://api.bitbucket.org/2.0/repositories/seanfarley/hg/commits/3.8"
 *     },
 *     "self": {
 *       "href":
 * "https://api.bitbucket.org/2.0/repositories/seanfarley/hg/refs/tags/3.8"
 *     },
 *     "html": {
 *       "href": "https://bitbucket.org/seanfarley/hg/commits/tag/3.8"
 *     }
 *   },
 *   "tagger": {
 *     "raw": "Matt Mackall <mpm@selenic.com>",
 *     "type": "author",
 *     "user": {
 *       "username": "mpmselenic",
 *       "nickname": "mpmselenic",
 *       "display_name": "Matt Mackall",
 *       "type": "user",
 *       "uuid": "{a4934530-db4c-419c-a478-9ab4964c2ee7}",
 *       "links": {
 *         "self": {
 *           "href": "https://api.bitbucket.org/2.0/users/mpmselenic"
 *         },
 *         "html": {
 *           "href": "https://bitbucket.org/mpmselenic/"
 *         },
 *         "avatar": {
 *           "href": "https://bitbucket.org/account/mpmselenic/avatar/32/"
 *         }
 *       }
 *     }
 *   },
 *   "date": "2016-05-01T18:52:25+00:00",
 *   "message": "Added tag 3.8 for changeset f85de28eae32",
 *   "type": "tag",
 *   "target": {
 *     "hash": "f85de28eae32e7d3064b1a1321309071bbaaa069",
 *     "repository": {
 *       "links": {
 *         "self": {
 *           "href": "https://api.bitbucket.org/2.0/repositories/seanfarley/hg"
 *         },
 *         "html": {
 *           "href": "https://bitbucket.org/seanfarley/hg"
 *         },
 *         "avatar": {
 *           "href": "https://bitbucket.org/seanfarley/hg/avatar/32/"
 *         }
 *       },
 *       "type": "repository",
 *       "name": "hg",
 *       "full_name": "seanfarley/hg",
 *       "uuid": "{c75687fb-e99d-4579-9087-190dbd406d30}"
 *     },
 *     "links": {
 *       "self": {
 *         "href":
 * "https://api.bitbucket.org/2.0/repositories/seanfarley/hg/commit/f85de28eae32e7d3064b1a1321309071bbaaa069"
 *       },
 *       "comments": {
 *         "href":
 * "https://api.bitbucket.org/2.0/repositories/seanfarley/hg/commit/f85de28eae32e7d3064b1a1321309071bbaaa069/comments"
 *       },
 *       "patch": {
 *         "href":
 * "https://api.bitbucket.org/2.0/repositories/seanfarley/hg/patch/f85de28eae32e7d3064b1a1321309071bbaaa069"
 *       },
 *       "html": {
 *         "href":
 * "https://bitbucket.org/seanfarley/hg/commits/f85de28eae32e7d3064b1a1321309071bbaaa069"
 *       },
 *       "diff": {
 *         "href":
 * "https://api.bitbucket.org/2.0/repositories/seanfarley/hg/diff/f85de28eae32e7d3064b1a1321309071bbaaa069"
 *       },
 *       "approve": {
 *         "href":
 * "https://api.bitbucket.org/2.0/repositories/seanfarley/hg/commit/f85de28eae32e7d3064b1a1321309071bbaaa069/approve"
 *       },
 *       "statuses": {
 *         "href":
 * "https://api.bitbucket.org/2.0/repositories/seanfarley/hg/commit/f85de28eae32e7d3064b1a1321309071bbaaa069/statuses"
 *       }
 *     },
 *     "author": {
 *       "raw": "Sean Farley <sean@farley.io>",
 *       "type": "author",
 *       "user": {
 *         "username": "seanfarley",
 *         "nickname": "seanfarley",
 *         "display_name": "Sean Farley",
 *         "type": "user",
 *         "uuid": "{a295f8a8-5876-4d43-89b5-3ad8c6c3c51d}",
 *         "links": {
 *           "self": {
 *             "href": "https://api.bitbucket.org/2.0/users/seanfarley"
 *           },
 *           "html": {
 *             "href": "https://bitbucket.org/seanfarley/"
 *           },
 *           "avatar": {
 *             "href": "https://bitbucket.org/account/seanfarley/avatar/32/"
 *           }
 *         }
 *       }
 *     },
 *     "parents": [
 *       {
 *         "hash": "9a98d0e5b07fc60887f9d3d34d9ac7d536f470d2",
 *         "type": "commit",
 *         "links": {
 *           "self": {
 *             "href":
 * "https://api.bitbucket.org/2.0/repositories/seanfarley/hg/commit/9a98d0e5b07fc60887f9d3d34d9ac7d536f470d2"
 *           },
 *           "html": {
 *             "href":
 * "https://bitbucket.org/seanfarley/hg/commits/9a98d0e5b07fc60887f9d3d34d9ac7d536f470d2"
 *           }
 *         }
 *       }
 *     ],
 *     "date": "2016-05-01T04:21:17+00:00",
 *     "message": "debian: alphabetize build deps",
 *     "type": "commit"
 *   }
 * }
 * ```
 */
export function getRepositoriesByWorkspaceAndRepoSlugRefsTagsName(
  name: string,
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Tag
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/refs/tags/${name}`, {
    ...opts,
  })
}
/**
 * This endpoint redirects the client to the directory listing of the
 * root directory on the main branch.
 *
 * This is equivalent to directly hitting
 * [/2.0/repositories/{username}/{repo_slug}/src/{commit}/{path}](src/%7Bcommit%7D/%7Bpath%7D)
 * without having to know the name or SHA1 of the repo's main branch.
 *
 * To create new commits, [POST to this endpoint](#post)
 */
export function getRepositoriesByWorkspaceAndRepoSlugSrc(
  repoSlug: string,
  workspace: string,
  {
    format,
  }: {
    format?: "meta"
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedTreeEntry
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/src${QS.query(
      QS.form({
        format,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * This endpoint is used to create new commits in the repository by
 * uploading files.
 *
 * To add a new file to a repository:
 *
 * ```
 * $ curl https://api.bitbucket.org/2.0/repositories/username/slug/src \
 *   -F /repo/path/to/image.png=@image.png
 * ```
 *
 * This will create a new commit on top of the main branch, inheriting the
 * contents of the main branch, but adding (or overwriting) the
 * `image.png` file to the repository in the `/repo/path/to` directory.
 *
 * To create a commit that deletes files, use the `files` parameter:
 *
 * ```
 * $ curl https://api.bitbucket.org/2.0/repositories/username/slug/src \
 *   -F files=/file/to/delete/1.txt \
 *   -F files=/file/to/delete/2.txt
 * ```
 *
 * You can add/modify/delete multiple files in a request. Rename/move a
 * file by deleting the old path and adding the content at the new path.
 *
 * This endpoint accepts `multipart/form-data` (as in the examples above),
 * as well as `application/x-www-form-urlencoded`.
 *
 * #### multipart/form-data
 *
 * A `multipart/form-data` post contains a series of "form fields" that
 * identify both the individual files that are being uploaded, as well as
 * additional, optional meta data.
 *
 * Files are uploaded in file form fields (those that have a
 * `Content-Disposition` parameter) whose field names point to the remote
 * path in the repository where the file should be stored. Path field
 * names are always interpreted to be absolute from the root of the
 * repository, regardless whether the client uses a leading slash (as the
 * above `curl` example did).
 *
 * File contents are treated as bytes and are not decoded as text.
 *
 * The commit message, as well as other non-file meta data for the
 * request, is sent along as normal form field elements. Meta data fields
 * share the same namespace as the file objects. For `multipart/form-data`
 * bodies that should not lead to any ambiguity, as the
 * `Content-Disposition` header will contain the `filename` parameter to
 * distinguish between a file named "message" and the commit message field.
 *
 * #### application/x-www-form-urlencoded
 *
 * It is also possible to upload new files using a simple
 * `application/x-www-form-urlencoded` POST. This can be convenient when
 * uploading pure text files:
 *
 * ```
 * $ curl https://api.bitbucket.org/2.0/repositories/atlassian/bbql/src \
 *   --data-urlencode "/path/to/me.txt=Lorem ipsum." \
 *   --data-urlencode "message=Initial commit" \
 *   --data-urlencode "author=Erik van Zijst <erik.van.zijst@gmail.com>"
 * ```
 *
 * There could be a field name clash if a client were to upload a file
 * named "message", as this filename clashes with the meta data property
 * for the commit message. To avoid this and to upload files whose names
 * clash with the meta data properties, use a leading slash for the files,
 * e.g. `curl --data-urlencode "/message=file contents"`.
 *
 * When an explicit slash is omitted for a file whose path matches that of
 * a meta data parameter, then it is interpreted as meta data, not as a
 * file.
 *
 * #### Executables and links
 *
 * While this API aims to facilitate the most common use cases, it is
 * possible to perform some more advanced operations like creating a new
 * symlink in the repository, or creating an executable file.
 *
 * Files can be supplied with a `x-attributes` value in the
 * `Content-Disposition` header. For example, to upload an executable
 * file, as well as create a symlink from `README.txt` to `README`:
 *
 * ```
 * --===============1438169132528273974==
 * Content-Type: text/plain; charset="us-ascii"
 * MIME-Version: 1.0
 * Content-Transfer-Encoding: 7bit
 * Content-ID: "bin/shutdown.sh"
 * Content-Disposition: attachment; filename="shutdown.sh";
 * x-attributes:"executable"
 *
 * #!/bin/sh
 * halt
 *
 * --===============1438169132528273974==
 * Content-Type: text/plain; charset="us-ascii"
 * MIME-Version: 1.0
 * Content-Transfer-Encoding: 7bit
 * Content-ID: "/README.txt"
 * Content-Disposition: attachment; filename="README.txt"; x-attributes:"link"
 *
 * README
 * --===============1438169132528273974==--
 * ```
 *
 * Links are files that contain the target path and have
 * `x-attributes:"link"` set.
 *
 * When overwriting links with files, or vice versa, the newly uploaded
 * file determines both the new contents, as well as the attributes. That
 * means uploading a file without specifying `x-attributes="link"` will
 * create a regular file, even if the parent commit hosted a symlink at
 * the same path.
 *
 * The same applies to executables. When modifying an existing executable
 * file, the form-data file element must include
 * `x-attributes="executable"` in order to preserve the executable status
 * of the file.
 *
 * Note that this API does not support the creation or manipulation of
 * subrepos / submodules.
 */
export function postRepositoriesByWorkspaceAndRepoSlugSrc(
  repoSlug: string,
  workspace: string,
  {
    message,
    author,
    parents,
    files,
    branch,
  }: {
    message?: string
    author?: string
    parents?: string
    files?: string
    branch?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/src${QS.query(
      QS.form({
        message,
        author,
        parents,
        files,
        branch,
      })
    )}`,
    {
      ...opts,
      method: "POST",
    }
  )
}
/**
 * This endpoints is used to retrieve the contents of a single file,
 * or the contents of a directory at a specified revision.
 *
 * #### Raw file contents
 *
 * When `path` points to a file, this endpoint returns the raw contents.
 * The response's Content-Type is derived from the filename
 * extension (not from the contents). The file contents are not processed
 * and no character encoding/recoding is performed and as a result no
 * character encoding is included as part of the Content-Type.
 *
 * The `Content-Disposition` header will be "attachment" to prevent
 * browsers from running executable files.
 *
 * If the file is managed by LFS, then a 301 redirect pointing to
 * Atlassian's media services platform is returned.
 *
 * The response includes an ETag that is based on the contents of the file
 * and its attributes. This means that an empty `__init__.py` always
 * returns the same ETag, regardless on the directory it lives in, or the
 * commit it is on.
 *
 * #### File meta data
 *
 * When the request for a file path includes the query parameter
 * `?format=meta`, instead of returning the file's raw contents, Bitbucket
 * instead returns the JSON object describing the file's properties:
 *
 * ```javascript
 * $ curl
 * https://api.bitbucket.org/2.0/repositories/atlassian/bbql/src/eefd5ef/tests/__init__.py?format=meta
 * {
 *   "links": {
 *     "self": {
 *       "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/bbql/src/eefd5ef5d3df01aed629f650959d6706d54cd335/tests/__init__.py"
 *     },
 *     "meta": {
 *       "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/bbql/src/eefd5ef5d3df01aed629f650959d6706d54cd335/tests/__init__.py?format=meta"
 *     }
 *   },
 *   "path": "tests/__init__.py",
 *   "commit": {
 *     "type": "commit",
 *     "hash": "eefd5ef5d3df01aed629f650959d6706d54cd335",
 *     "links": {
 *       "self": {
 *         "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/bbql/commit/eefd5ef5d3df01aed629f650959d6706d54cd335"
 *       },
 *       "html": {
 *         "href":
 * "https://bitbucket.org/atlassian/bbql/commits/eefd5ef5d3df01aed629f650959d6706d54cd335"
 *       }
 *     }
 *   },
 *   "attributes": [],
 *   "type": "commit_file",
 *   "size": 0
 * }
 * ```
 *
 * File objects contain an `attributes` element that contains a list of
 * possible modifiers. Currently defined values are:
 *
 * * `link` -- indicates that the entry is a symbolic link. The contents
 *     of the file represent the path the link points to.
 * * `executable` -- indicates that the file has the executable bit set.
 * * `subrepository` -- indicates that the entry points to a submodule or
 *     subrepo. The contents of the file is the SHA1 of the repository
 *     pointed to.
 * * `binary` -- indicates whether Bitbucket thinks the file is binary.
 *
 * This endpoint can provide an alternative to how a HEAD request can be
 * used to check for the existence of a file, or a file's size without
 * incurring the overhead of receiving its full contents.
 *
 *
 * #### Directory listings
 *
 * When `path` points to a directory instead of a file, the response is a
 * paginated list of directory and file objects in the same order as the
 * underlying SCM system would return them.
 *
 * For example:
 *
 * ```javascript
 * $ curl
 * https://api.bitbucket.org/2.0/repositories/atlassian/bbql/src/eefd5ef/tests
 * {
 *   "pagelen": 10,
 *   "values": [
 *     {
 *       "path": "tests/test_project",
 *       "type": "commit_directory",
 *       "links": {
 *         "self": {
 *           "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/bbql/src/eefd5ef5d3df01aed629f650959d6706d54cd335/tests/test_project/"
 *         },
 *         "meta": {
 *           "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/bbql/src/eefd5ef5d3df01aed629f650959d6706d54cd335/tests/test_project/?format=meta"
 *         }
 *       },
 *       "commit": {
 *         "type": "commit",
 *         "hash": "eefd5ef5d3df01aed629f650959d6706d54cd335",
 *         "links": {
 *           "self": {
 *             "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/bbql/commit/eefd5ef5d3df01aed629f650959d6706d54cd335"
 *           },
 *           "html": {
 *             "href":
 * "https://bitbucket.org/atlassian/bbql/commits/eefd5ef5d3df01aed629f650959d6706d54cd335"
 *           }
 *         }
 *       }
 *     },
 *     {
 *       "links": {
 *         "self": {
 *           "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/bbql/src/eefd5ef5d3df01aed629f650959d6706d54cd335/tests/__init__.py"
 *         },
 *         "meta": {
 *           "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/bbql/src/eefd5ef5d3df01aed629f650959d6706d54cd335/tests/__init__.py?format=meta"
 *         }
 *       },
 *       "path": "tests/__init__.py",
 *       "commit": {
 *         "type": "commit",
 *         "hash": "eefd5ef5d3df01aed629f650959d6706d54cd335",
 *         "links": {
 *           "self": {
 *             "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/bbql/commit/eefd5ef5d3df01aed629f650959d6706d54cd335"
 *           },
 *           "html": {
 *             "href":
 * "https://bitbucket.org/atlassian/bbql/commits/eefd5ef5d3df01aed629f650959d6706d54cd335"
 *           }
 *         }
 *       },
 *       "attributes": [],
 *       "type": "commit_file",
 *       "size": 0
 *     }
 *   ],
 *   "page": 1,
 *   "size": 2
 * }
 * ```
 *
 * When listing the contents of the repo's root directory, the use of a
 * trailing slash at the end of the URL is required.
 *
 * The response by default is not recursive, meaning that only the direct
 * contents of a path are returned. The response does not recurse down into
 * subdirectories. In order to "walk" the entire directory tree, the client can
 * either parse each response and follow the `self` links of each
 * `commit_directory` object, or can specify a `max_depth` to recurse to.
 *
 * The max_depth parameter will do a breadth-first search to return the
 * contents of the subdirectories up to the depth specified. Breadth-first
 * search was chosen as it leads to the least amount of file system operations
 * for git. If the `max_depth` parameter is specified to be too large, the call
 * will time out and return a 555.
 *
 * Each returned object is either a `commit_file`, or a `commit_directory`,
 * both of which contain a `path` element. This path is the absolute path
 * from the root of the repository. Each object also contains a `commit`
 * object which embeds the commit the file is on. Note that this is merely
 * the commit that was used in the URL. It is *not* the commit that last
 * modified the file.
 *
 * Directory objects have 2 representations. Their `self` link returns the
 * paginated contents of the directory. The `meta` link on the other hand
 * returns the actual `directory` object itself, e.g.:
 *
 * ```javascript
 * {
 *   "path": "tests/test_project",
 *   "type": "commit_directory",
 *   "links": {
 *     "self": {
 *       "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/bbql/src/eefd5ef5d3df01aed629f650959d6706d54cd335/tests/test_project/"
 *     },
 *     "meta": {
 *       "href":
 * "https://api.bitbucket.org/2.0/repositories/atlassian/bbql/src/eefd5ef5d3df01aed629f650959d6706d54cd335/tests/test_project/?format=meta"
 *     }
 *   },
 *   "commit": { ... }
 * }
 * ```
 *
 * #### Querying, filtering and sorting
 *
 * Like most API endpoints, this API supports the Bitbucket
 * querying/filtering syntax and so you could filter a directory listing
 * to only include entries that match certain criteria. For instance, to
 * list all binary files over 1kb use the expression:
 *
 * `size > 1024 and attributes = "binary"`
 *
 * which after urlencoding yields the query string:
 *
 * `?q=size%3E1024+and+attributes%3D%22binary%22`
 *
 * To change the ordering of the response, use the `?sort` parameter:
 *
 * `.../src/eefd5ef/?sort=-size`
 *
 * See [filtering and sorting](../../../../../../meta/filtering) for more
 * details.
 */
export function getRepositoriesByWorkspaceAndRepoSlugSrcCommitPath(
  commit: string,
  path: string,
  repoSlug: string,
  workspace: string,
  {
    format,
    q,
    sort,
    maxDepth,
  }: {
    format?: "meta" | "rendered"
    q?: string
    sort?: string
    maxDepth?: number
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedTreeEntry
      }
    | {
        status: 404
        data: Error
      }
    | {
        status: 555
        data: Error
      }
  >(
    `/repositories/${workspace}/${repoSlug}/src/${commit}/${path}${QS.query(
      QS.form({
        format,
        q,
        sort,
        max_depth: maxDepth,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns the versions that have been defined in the issue tracker.
 *
 * This resource is only available on repositories that have the issue
 * tracker enabled.
 */
export function getRepositoriesByWorkspaceAndRepoSlugVersions(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedVersions
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/versions`, {
    ...opts,
  })
}
/**
 * Returns the specified issue tracker version object.
 */
export function getRepositoriesByWorkspaceAndRepoSlugVersionsVersionId(
  repoSlug: string,
  versionId: number,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Version
      }
    | {
        status: 404
        data: Error
      }
  >(`/repositories/${workspace}/${repoSlug}/versions/${versionId}`, {
    ...opts,
  })
}
/**
 * Returns a paginated list of all the watchers on the specified
 * repository.
 */
export function getRepositoriesByWorkspaceAndRepoSlugWatchers(
  repoSlug: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(`/repositories/${workspace}/${repoSlug}/watchers`, {
    ...opts,
  })
}
/**
 * Returns all snippets. Like pull requests, repositories and workspaces, the
 * full set of snippets is defined by what the current user has access to.
 *
 * This includes all snippets owned by any of the workspaces the user is a
 * member of, or snippets by other users that the current user is either
 * watching or has collaborated on (for instance by commenting on it).
 *
 * To limit the set of returned snippets, apply the
 * `?role=[owner|contributor|member]` query parameter where the roles are
 * defined as follows:
 *
 * * `owner`: all snippets owned by the current user
 * * `contributor`: all snippets owned by, or watched by the current user
 * * `member`: created in a workspaces or watched by the current user
 *
 * When no role is specified, all public snippets are returned, as well as all
 * privately owned snippets watched or commented on.
 *
 * The returned response is a normal paginated JSON list. This endpoint
 * only supports `application/json` responses and no
 * `multipart/form-data` or `multipart/related`. As a result, it is not
 * possible to include the file contents.
 */
export function getSnippets(
  {
    role,
  }: {
    role?: "owner" | "contributor" | "member"
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedSnippets
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/snippets${QS.query(
      QS.form({
        role,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Creates a new snippet under the authenticated user's account.
 *
 * Snippets can contain multiple files. Both text and binary files are
 * supported.
 *
 * The simplest way to create a new snippet from a local file:
 *
 *     $ curl -u username:password -X POST
 * https://api.bitbucket.org/2.0/snippets               -F file=@image.png
 *
 * Creating snippets through curl has a few limitations and so let's look
 * at a more complicated scenario.
 *
 * Snippets are created with a multipart POST. Both `multipart/form-data`
 * and `multipart/related` are supported. Both allow the creation of
 * snippets with both meta data (title, etc), as well as multiple text
 * and binary files.
 *
 * The main difference is that `multipart/related` can use rich encoding
 * for the meta data (currently JSON).
 *
 *
 * multipart/related (RFC-2387)
 * ----------------------------
 *
 * This is the most advanced and efficient way to create a paste.
 *
 *     POST /2.0/snippets/evzijst HTTP/1.1
 *     Content-Length: 1188
 *     Content-Type: multipart/related; start="snippet";
 * boundary="===============1438169132528273974==" MIME-Version: 1.0
 *
 *     --===============1438169132528273974==
 *     Content-Type: application/json; charset="utf-8"
 *     MIME-Version: 1.0
 *     Content-ID: snippet
 *
 *     {
 *       "title": "My snippet",
 *       "is_private": true,
 *       "scm": "hg",
 *       "files": {
 *           "foo.txt": {},
 *           "image.png": {}
 *         }
 *     }
 *
 *     --===============1438169132528273974==
 *     Content-Type: text/plain; charset="us-ascii"
 *     MIME-Version: 1.0
 *     Content-Transfer-Encoding: 7bit
 *     Content-ID: "foo.txt"
 *     Content-Disposition: attachment; filename="foo.txt"
 *
 *     foo
 *
 *     --===============1438169132528273974==
 *     Content-Type: image/png
 *     MIME-Version: 1.0
 *     Content-Transfer-Encoding: base64
 *     Content-ID: "image.png"
 *     Content-Disposition: attachment; filename="image.png"
 *
 *     iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAYAAAD+MdrbAAABD0lEQVR4Ae3VMUoDQRTG8ccUaW2m
 * TKONFxArJYJamCvkCnZTaa+VnQdJSBFl2SMsLFrEWNjZBZs0JgiL/+KrhhVmJRbCLPx4O+/DT2TB
 * cbblJxf+UWFVVRNsEGAtgvJxnLm2H+A5RQ93uIl+3632PZyl/skjfOn9Gvdwmlcw5aPUwimG+NT5
 * EnNN036IaZePUuIcK533NVfal7/5yjWeot2z9ta1cAczHEf7I+3J0ws9Cgx0fsOFpmlfwKcWPuBQ
 *     73Oc4FHzBaZ8llq4q1mr5B2mOUCt815qYR8eB1hG2VJ7j35q4RofaH7IG+Xrf/PfJhfmwtfFYoIN
 * AqxFUD6OMxcvkO+UfKfkOyXfKdsv/AYCHMLVkHAFWgAAAABJRU5ErkJggg==
 *     --===============1438169132528273974==--
 *
 * The request contains multiple parts and is structured as follows.
 *
 * The first part is the JSON document that describes the snippet's
 * properties or meta data. It either has to be the first part, or the
 * request's `Content-Type` header must contain the `start` parameter to
 * point to it.
 *
 * The remaining parts are the files of which there can be zero or more.
 * Each file part should contain the `Content-ID` MIME header through
 * which the JSON meta data's `files` element addresses it. The value
 * should be the name of the file.
 *
 * `Content-Disposition` is an optional MIME header. The header's
 * optional `filename` parameter can be used to specify the file name
 * that Bitbucket should use when writing the file to disk. When present,
 * `filename` takes precedence over the value of `Content-ID`.
 *
 * When the JSON body omits the `files` element, the remaining parts are
 * not ignored. Instead, each file is added to the new snippet as if its
 * name was explicitly linked (the use of the `files` elements is
 * mandatory for some operations like deleting or renaming files).
 *
 *
 * multipart/form-data
 * -------------------
 *
 * The use of JSON for the snippet's meta data is optional. Meta data can
 * also be supplied as regular form fields in a more conventional
 * `multipart/form-data` request:
 *
 *     $ curl -X POST -u credentials https://api.bitbucket.org/2.0/snippets
 *           -F title="My snippet"               -F file=@foo.txt -F
 * file=@image.png
 *
 *     POST /2.0/snippets HTTP/1.1
 *     Content-Length: 951
 *     Content-Type: multipart/form-data;
 * boundary=----------------------------63a4b224c59f
 *
 *     ------------------------------63a4b224c59f
 *     Content-Disposition: form-data; name="file"; filename="foo.txt"
 *     Content-Type: text/plain
 *
 *     foo
 *
 *     ------------------------------63a4b224c59f
 *     Content-Disposition: form-data; name="file"; filename="image.png"
 *     Content-Type: application/octet-stream
 *
 *     ?PNG
 *
 *     IHDR?1??I.....
 *     ------------------------------63a4b224c59f
 *     Content-Disposition: form-data; name="title"
 *
 *     My snippet
 *     ------------------------------63a4b224c59f--
 *
 * Here the meta data properties are included as flat, top-level form
 * fields. The file attachments use the `file` field name. To attach
 * multiple files, simply repeat the field.
 *
 * The advantage of `multipart/form-data` over `multipart/related` is
 * that it can be easier to build clients.
 *
 * Essentially all properties are optional, `title` and `files` included.
 *
 *
 * Sharing and Visibility
 * ----------------------
 *
 * Snippets can be either public (visible to anyone on Bitbucket, as well
 * as anonymous users), or private (visible only to members of the workspace).
 * This is controlled through the snippet's `is_private` element:
 *
 * * **is_private=false** -- everyone, including anonymous users can view
 *   the snippet
 * * **is_private=true** -- only workspace members can view the snippet
 *
 * To create the snippet under a workspace, just append the workspace ID
 * to the URL. See
 * [`/2.0/snippets/{workspace}`](./snippets/%7Bworkspace%7D#post).
 */
export function postSnippets(snippet: Snippet, opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: Snippet
      }
    | {
        status: 401
        data: Error
      }
  >(
    "/snippets",
    oazapfts.json({
      ...opts,
      method: "POST",
      body: snippet,
    })
  )
}
/**
 * Identical to [`/snippets`](../snippets), except that the result is further
 * filtered by the snippet owner and only those that are owned by `{workspace}`
 * are returned.
 */
export function getSnippetsByWorkspace(
  workspace: string,
  {
    role,
  }: {
    role?: "owner" | "contributor" | "member"
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedSnippets
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/snippets/${workspace}${QS.query(
      QS.form({
        role,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Identical to [`/snippets`](../snippets#post), except that the new snippet
 * will be created under the workspace specified in the path parameter
 * `{workspace}`.
 */
export function postSnippetsByWorkspace(
  workspace: string,
  snippet: Snippet,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: Snippet
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
  >(
    `/snippets/${workspace}`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: snippet,
    })
  )
}
/**
 * Deletes a snippet and returns an empty response.
 */
export function deleteSnippetsByWorkspaceAndEncodedId(
  encodedId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Retrieves a single snippet.
 *
 * Snippets support multiple content types:
 *
 * * application/json
 * * multipart/related
 * * multipart/form-data
 *
 *
 * application/json
 * ----------------
 *
 * The default content type of the response is `application/json`.
 * Since JSON is always `utf-8`, it cannot reliably contain file contents
 * for files that are not text. Therefore, JSON snippet documents only
 * contain the filename and links to the file contents.
 *
 * This means that in order to retrieve all parts of a snippet, N+1
 * requests need to be made (where N is the number of files in the
 * snippet).
 *
 *
 * multipart/related
 * -----------------
 *
 * To retrieve an entire snippet in a single response, use the
 * `Accept: multipart/related` HTTP request header.
 *
 *     $ curl -H "Accept: multipart/related"
 * https://api.bitbucket.org/2.0/snippets/evzijst/1
 *
 * Response:
 *
 *     HTTP/1.1 200 OK
 *     Content-Length: 2214
 *     Content-Type: multipart/related; start="snippet";
 * boundary="===============1438169132528273974==" MIME-Version: 1.0
 *
 *     --===============1438169132528273974==
 *     Content-Type: application/json; charset="utf-8"
 *     MIME-Version: 1.0
 *     Content-ID: snippet
 *
 *     {
 *       "links": {
 *         "self": {
 *           "href": "https://api.bitbucket.org/2.0/snippets/evzijst/kypj"
 *         },
 *         "html": {
 *           "href": "https://bitbucket.org/snippets/evzijst/kypj"
 *         },
 *         "comments": {
 *           "href":
 * "https://api.bitbucket.org/2.0/snippets/evzijst/kypj/comments"
 *         },
 *         "watchers": {
 *           "href":
 * "https://api.bitbucket.org/2.0/snippets/evzijst/kypj/watchers"
 *         },
 *         "commits": {
 *           "href":
 * "https://api.bitbucket.org/2.0/snippets/evzijst/kypj/commits"
 *         }
 *       },
 *       "id": kypj,
 *       "title": "My snippet",
 *       "created_on": "2014-12-29T22:22:04.790331+00:00",
 *       "updated_on": "2014-12-29T22:22:04.790331+00:00",
 *       "is_private": false,
 *       "files": {
 *         "foo.txt": {
 *           "links": {
 *             "self": {
 *               "href":
 * "https://api.bitbucket.org/2.0/snippets/evzijst/kypj/files/367ab19/foo.txt"
 *             },
 *             "html": {
 *               "href":
 * "https://bitbucket.org/snippets/evzijst/kypj#file-foo.txt"
 *             }
 *           }
 *         },
 *         "image.png": {
 *           "links": {
 *             "self": {
 *               "href":
 * "https://api.bitbucket.org/2.0/snippets/evzijst/kypj/files/367ab19/image.png"
 *             },
 *             "html": {
 *               "href":
 * "https://bitbucket.org/snippets/evzijst/kypj#file-image.png"
 *             }
 *           }
 *         }
 *       ],
 *       "owner": {
 *         "username": "evzijst",
 *         "nickname": "evzijst",
 *         "display_name": "Erik van Zijst",
 *         "uuid": "{d301aafa-d676-4ee0-88be-962be7417567}",
 *         "links": {
 *           "self": {
 *             "href": "https://api.bitbucket.org/2.0/users/evzijst"
 *           },
 *           "html": {
 *             "href": "https://bitbucket.org/evzijst"
 *           },
 *           "avatar": {
 *             "href":
 * "https://bitbucket-staging-assetroot.s3.amazonaws.com/c/photos/2013/Jul/31/erik-avatar-725122544-0_avatar.png"
 *           }
 *         }
 *       },
 *       "creator": {
 *         "username": "evzijst",
 *         "nickname": "evzijst",
 *         "display_name": "Erik van Zijst",
 *         "uuid": "{d301aafa-d676-4ee0-88be-962be7417567}",
 *         "links": {
 *           "self": {
 *             "href": "https://api.bitbucket.org/2.0/users/evzijst"
 *           },
 *           "html": {
 *             "href": "https://bitbucket.org/evzijst"
 *           },
 *           "avatar": {
 *             "href":
 * "https://bitbucket-staging-assetroot.s3.amazonaws.com/c/photos/2013/Jul/31/erik-avatar-725122544-0_avatar.png"
 *           }
 *         }
 *       }
 *     }
 *
 *     --===============1438169132528273974==
 *     Content-Type: text/plain; charset="us-ascii"
 *     MIME-Version: 1.0
 *     Content-Transfer-Encoding: 7bit
 *     Content-ID: "foo.txt"
 *     Content-Disposition: attachment; filename="foo.txt"
 *
 *     foo
 *
 *     --===============1438169132528273974==
 *     Content-Type: image/png
 *     MIME-Version: 1.0
 *     Content-Transfer-Encoding: base64
 *     Content-ID: "image.png"
 *     Content-Disposition: attachment; filename="image.png"
 *
 *     iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAYAAAD+MdrbAAABD0lEQVR4Ae3VMUoDQRTG8ccUaW2m
 * TKONFxArJYJamCvkCnZTaa+VnQdJSBFl2SMsLFrEWNjZBZs0JgiL/+KrhhVmJRbCLPx4O+/DT2TB
 * cbblJxf+UWFVVRNsEGAtgvJxnLm2H+A5RQ93uIl+3632PZyl/skjfOn9Gvdwmlcw5aPUwimG+NT5
 * EnNN036IaZePUuIcK533NVfal7/5yjWeot2z9ta1cAczHEf7I+3J0ws9Cgx0fsOFpmlfwKcWPuBQ
 *     73Oc4FHzBaZ8llq4q1mr5B2mOUCt815qYR8eB1hG2VJ7j35q4RofaH7IG+Xrf/PfJhfmwtfFYoIN
 * AqxFUD6OMxcvkO+UfKfkOyXfKdsv/AYCHMLVkHAFWgAAAABJRU5ErkJggg==
 *     --===============1438169132528273974==--
 *
 * multipart/form-data
 * -------------------
 *
 * As with creating new snippets, `multipart/form-data` can be used as an
 * alternative to `multipart/related`. However, the inherently flat
 * structure of form-data means that only basic, root-level properties
 * can be returned, while nested elements like `links` are omitted:
 *
 *     $ curl -H "Accept: multipart/form-data"
 * https://api.bitbucket.org/2.0/snippets/evzijst/kypj
 *
 * Response:
 *
 *     HTTP/1.1 200 OK
 *     Content-Length: 951
 *     Content-Type: multipart/form-data;
 * boundary=----------------------------63a4b224c59f
 *
 *     ------------------------------63a4b224c59f
 *     Content-Disposition: form-data; name="title"
 *     Content-Type: text/plain; charset="utf-8"
 *
 *     My snippet
 *     ------------------------------63a4b224c59f--
 *     Content-Disposition: attachment; name="file"; filename="foo.txt"
 *     Content-Type: text/plain
 *
 *     foo
 *
 *     ------------------------------63a4b224c59f
 *     Content-Disposition: attachment; name="file"; filename="image.png"
 *     Content-Transfer-Encoding: base64
 *     Content-Type: application/octet-stream
 *
 *     iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAYAAAD+MdrbAAABD0lEQVR4Ae3VMUoDQRTG8ccUaW2m
 * TKONFxArJYJamCvkCnZTaa+VnQdJSBFl2SMsLFrEWNjZBZs0JgiL/+KrhhVmJRbCLPx4O+/DT2TB
 * cbblJxf+UWFVVRNsEGAtgvJxnLm2H+A5RQ93uIl+3632PZyl/skjfOn9Gvdwmlcw5aPUwimG+NT5
 * EnNN036IaZePUuIcK533NVfal7/5yjWeot2z9ta1cAczHEf7I+3J0ws9Cgx0fsOFpmlfwKcWPuBQ
 *     73Oc4FHzBaZ8llq4q1mr5B2mOUCt815qYR8eB1hG2VJ7j35q4RofaH7IG+Xrf/PfJhfmwtfFYoIN
 * AqxFUD6OMxcvkO+UfKfkOyXfKdsv/AYCHMLVkHAFWgAAAABJRU5ErkJggg==
 *     ------------------------------5957323a6b76--
 */
export function getSnippetsByWorkspaceAndEncodedId(
  encodedId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Snippet
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
    | {
        status: 410
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}`, {
    ...opts,
  })
}
/**
 * Used to update a snippet. Use this to add and delete files and to
 * change a snippet's title.
 *
 * To update a snippet, one can either PUT a full snapshot, or only the
 * parts that need to be changed.
 *
 * The contract for PUT on this API is that properties missing from the
 * request remain untouched so that snippets can be efficiently
 * manipulated with differential payloads.
 *
 * To delete a property (e.g. the title, or a file), include its name in
 * the request, but omit its value (use `null`).
 *
 * As in Git, explicit renaming of files is not supported. Instead, to
 * rename a file, delete it and add it again under another name. This can
 * be done atomically in a single request. Rename detection is left to
 * the SCM.
 *
 * PUT supports three different content types for both request and
 * response bodies:
 *
 * * `application/json`
 * * `multipart/related`
 * * `multipart/form-data`
 *
 * The content type used for the request body can be different than that
 * used for the response. Content types are specified using standard HTTP
 * headers.
 *
 * Use the `Content-Type` and `Accept` headers to select the desired
 * request and response format.
 *
 *
 * application/json
 * ----------------
 *
 * As with creation and retrieval, the content type determines what
 * properties can be manipulated. `application/json` does not support
 * file contents and is therefore limited to a snippet's meta data.
 *
 * To update the title, without changing any of its files:
 *
 *     $ curl -X POST -H "Content-Type: application/json"
 * https://api.bitbucket.org/2.0/snippets/evzijst/kypj             -d
 * '{"title": "Updated title"}'
 *
 *
 * To delete the title:
 *
 *     $ curl -X POST -H "Content-Type: application/json"
 * https://api.bitbucket.org/2.0/snippets/evzijst/kypj             -d
 * '{"title": null}'
 *
 * Not all parts of a snippet can be manipulated. The owner and creator
 * for instance are immutable.
 *
 *
 * multipart/related
 * -----------------
 *
 * `multipart/related` can be used to manipulate all of a snippet's
 * properties. The body is identical to a POST. properties omitted from
 * the request are left unchanged. Since the `start` part contains JSON,
 * the mechanism for manipulating the snippet's meta data is identical
 * to `application/json` requests.
 *
 * To update one of a snippet's file contents, while also changing its
 * title:
 *
 *     PUT /2.0/snippets/evzijst/kypj HTTP/1.1
 *     Content-Length: 288
 *     Content-Type: multipart/related; start="snippet";
 * boundary="===============1438169132528273974==" MIME-Version: 1.0
 *
 *     --===============1438169132528273974==
 *     Content-Type: application/json; charset="utf-8"
 *     MIME-Version: 1.0
 *     Content-ID: snippet
 *
 *     {
 *       "title": "My updated snippet",
 *       "files": {
 *           "foo.txt": {}
 *         }
 *     }
 *
 *     --===============1438169132528273974==
 *     Content-Type: text/plain; charset="us-ascii"
 *     MIME-Version: 1.0
 *     Content-Transfer-Encoding: 7bit
 *     Content-ID: "foo.txt"
 *     Content-Disposition: attachment; filename="foo.txt"
 *
 *     Updated file contents.
 *
 *     --===============1438169132528273974==--
 *
 * Here only the parts that are changed are included in the body. The
 * other files remain untouched.
 *
 * Note the use of the `files` list in the JSON part. This list contains
 * the files that are being manipulated. This list should have
 * corresponding multiparts in the request that contain the new contents
 * of these files.
 *
 * If a filename in the `files` list does not have a corresponding part,
 * it will be deleted from the snippet, as shown below:
 *
 *     PUT /2.0/snippets/evzijst/kypj HTTP/1.1
 *     Content-Length: 188
 *     Content-Type: multipart/related; start="snippet";
 * boundary="===============1438169132528273974==" MIME-Version: 1.0
 *
 *     --===============1438169132528273974==
 *     Content-Type: application/json; charset="utf-8"
 *     MIME-Version: 1.0
 *     Content-ID: snippet
 *
 *     {
 *       "files": {
 *         "image.png": {}
 *       }
 *     }
 *
 *     --===============1438169132528273974==--
 *
 * To simulate a rename, delete a file and add the same file under
 * another name:
 *
 *     PUT /2.0/snippets/evzijst/kypj HTTP/1.1
 *     Content-Length: 212
 *     Content-Type: multipart/related; start="snippet";
 * boundary="===============1438169132528273974==" MIME-Version: 1.0
 *
 *     --===============1438169132528273974==
 *     Content-Type: application/json; charset="utf-8"
 *     MIME-Version: 1.0
 *     Content-ID: snippet
 *
 *     {
 *         "files": {
 *           "foo.txt": {},
 *           "bar.txt": {}
 *         }
 *     }
 *
 *     --===============1438169132528273974==
 *     Content-Type: text/plain; charset="us-ascii"
 *     MIME-Version: 1.0
 *     Content-Transfer-Encoding: 7bit
 *     Content-ID: "bar.txt"
 *     Content-Disposition: attachment; filename="bar.txt"
 *
 *     foo
 *
 *     --===============1438169132528273974==--
 *
 *
 * multipart/form-data
 * -----------------
 *
 * Again, one can also use `multipart/form-data` to manipulate file
 * contents and meta data atomically.
 *
 *     $ curl -X PUT http://localhost:12345/2.0/snippets/evzijst/kypj
 *   -F title="My updated snippet" -F file=@foo.txt
 *
 *     PUT /2.0/snippets/evzijst/kypj HTTP/1.1
 *     Content-Length: 351
 *     Content-Type: multipart/form-data;
 * boundary=----------------------------63a4b224c59f
 *
 *     ------------------------------63a4b224c59f
 *     Content-Disposition: form-data; name="file"; filename="foo.txt"
 *     Content-Type: text/plain
 *
 *     foo
 *
 *     ------------------------------63a4b224c59f
 *     Content-Disposition: form-data; name="title"
 *
 *     My updated snippet
 *     ------------------------------63a4b224c59f
 *
 * To delete a file, omit its contents while including its name in the
 * `files` field:
 *
 *     $ curl -X PUT https://api.bitbucket.org/2.0/snippets/evzijst/kypj -F
 * files=image.png
 *
 *     PUT /2.0/snippets/evzijst/kypj HTTP/1.1
 *     Content-Length: 149
 *     Content-Type: multipart/form-data;
 * boundary=----------------------------ef8871065a86
 *
 *     ------------------------------ef8871065a86
 *     Content-Disposition: form-data; name="files"
 *
 *     image.png
 *     ------------------------------ef8871065a86--
 *
 * The explicit use of the `files` element in `multipart/related` and
 * `multipart/form-data` is only required when deleting files.
 * The default mode of operation is for file parts to be processed,
 * regardless of whether or not they are listed in `files`, as a
 * convenience to the client.
 */
export function putSnippetsByWorkspaceAndEncodedId(
  encodedId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Snippet
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}`, {
    ...opts,
    method: "PUT",
  })
}
/**
 * Used to retrieve a paginated list of all comments for a specific
 * snippet.
 *
 * This resource works identical to commit and pull request comments.
 *
 * The default sorting is oldest to newest and can be overridden with
 * the `sort` query parameter.
 */
export function getSnippetsByWorkspaceAndEncodedIdComments(
  encodedId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedSnippetComments
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/comments`, {
    ...opts,
  })
}
/**
 * Creates a new comment.
 *
 * The only required field in the body is `content.raw`.
 *
 * To create a threaded reply to an existing comment, include `parent.id`.
 */
export function postSnippetsByWorkspaceAndEncodedIdComments(
  encodedId: string,
  workspace: string,
  snippet: Snippet,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: Snippet
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/snippets/${workspace}/${encodedId}/comments`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: snippet,
    })
  )
}
/**
 * Deletes a snippet comment.
 *
 * Comments can only be removed by their author.
 */
export function deleteSnippetsByWorkspaceAndEncodedIdCommentsCommentId(
  commentId: number,
  encodedId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/comments/${commentId}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Returns the specific snippet comment.
 */
export function getSnippetsByWorkspaceAndEncodedIdCommentsCommentId(
  commentId: number,
  encodedId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: SnippetComment
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/comments/${commentId}`, {
    ...opts,
  })
}
/**
 * Updates a comment.
 *
 * Comments can only be updated by their author.
 */
export function putSnippetsByWorkspaceAndEncodedIdCommentsCommentId(
  commentId: number,
  encodedId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/comments/${commentId}`, {
    ...opts,
    method: "PUT",
  })
}
/**
 * Returns the changes (commits) made on this snippet.
 */
export function getSnippetsByWorkspaceAndEncodedIdCommits(
  encodedId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedSnippetCommits
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/commits`, {
    ...opts,
  })
}
/**
 * Returns the changes made on this snippet in this commit.
 */
export function getSnippetsByWorkspaceAndEncodedIdCommitsRevision(
  encodedId: string,
  revision: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: SnippetCommit
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/commits/${revision}`, {
    ...opts,
  })
}
/**
 * Convenience resource for getting to a snippet's raw files without the
 * need for first having to retrieve the snippet itself and having to pull
 * out the versioned file links.
 */
export function getSnippetsByWorkspaceAndEncodedIdFilesPath(
  encodedId: string,
  path: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 302
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/files/${path}`, {
    ...opts,
  })
}
/**
 * Used to stop watching a specific snippet. Returns 204 (No Content)
 * to indicate success.
 */
export function deleteSnippetsByWorkspaceAndEncodedIdWatch(
  encodedId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
        data: PaginatedUsers
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/watch`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Used to check if the current user is watching a specific snippet.
 *
 * Returns 204 (No Content) if the user is watching the snippet and 404 if
 * not.
 *
 * Hitting this endpoint anonymously always returns a 404.
 */
export function getSnippetsByWorkspaceAndEncodedIdWatch(
  encodedId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
        data: PaginatedUsers
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/watch`, {
    ...opts,
  })
}
/**
 * Used to start watching a specific snippet. Returns 204 (No Content).
 */
export function putSnippetsByWorkspaceAndEncodedIdWatch(
  encodedId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
        data: PaginatedUsers
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/watch`, {
    ...opts,
    method: "PUT",
  })
}
/**
 * Returns a paginated list of all users watching a specific snippet.
 */
export function getSnippetsByWorkspaceAndEncodedIdWatchers(
  encodedId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedUsers
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/watchers`, {
    ...opts,
  })
}
/**
 * Deletes the snippet.
 *
 * Note that this only works for versioned URLs that point to the latest
 * commit of the snippet. Pointing to an older commit results in a 405
 * status code.
 *
 * To delete a snippet, regardless of whether or not concurrent changes
 * are being made to it, use `DELETE /snippets/{encoded_id}` instead.
 */
export function deleteSnippetsByWorkspaceAndEncodedIdNodeId(
  encodedId: string,
  nodeId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
    | {
        status: 405
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/${nodeId}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Identical to `GET /snippets/encoded_id`, except that this endpoint
 * can be used to retrieve the contents of the snippet as it was at an
 * older revision, while `/snippets/encoded_id` always returns the
 * snippet's current revision.
 *
 * Note that only the snippet's file contents are versioned, not its
 * meta data properties like the title.
 *
 * Other than that, the two endpoints are identical in behavior.
 */
export function getSnippetsByWorkspaceAndEncodedIdNodeId(
  encodedId: string,
  nodeId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Snippet
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/${nodeId}`, {
    ...opts,
  })
}
/**
 * Identical to `UPDATE /snippets/encoded_id`, except that this endpoint
 * takes an explicit commit revision. Only the snippet's "HEAD"/"tip"
 * (most recent) version can be updated and requests on all other,
 * older revisions fail by returning a 405 status.
 *
 * Usage of this endpoint over the unrestricted `/snippets/encoded_id`
 * could be desired if the caller wants to be sure no concurrent
 * modifications have taken place between the moment of the UPDATE
 * request and the original GET.
 *
 * This can be considered a so-called "Compare And Swap", or CAS
 * operation.
 *
 * Other than that, the two endpoints are identical in behavior.
 */
export function putSnippetsByWorkspaceAndEncodedIdNodeId(
  encodedId: string,
  nodeId: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Snippet
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
    | {
        status: 405
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/${nodeId}`, {
    ...opts,
    method: "PUT",
  })
}
/**
 * Retrieves the raw contents of a specific file in the snippet. The
 * `Content-Disposition` header will be "attachment" to avoid issues with
 * malevolent executable files.
 *
 * The file's mime type is derived from its filename and returned in the
 * `Content-Type` header.
 *
 * Note that for text files, no character encoding is included as part of
 * the content type.
 */
export function getSnippetsByWorkspaceAndEncodedIdNodeIdFilesPath(
  encodedId: string,
  nodeId: string,
  path: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/${nodeId}/files/${path}`, {
    ...opts,
  })
}
/**
 * Returns the diff of the specified commit against its first parent.
 *
 * Note that this resource is different in functionality from the `patch`
 * resource.
 *
 * The differences between a diff and a patch are:
 *
 * * patches have a commit header with the username, message, etc
 * * diffs support the optional `path=foo/bar.py` query param to filter the
 *   diff to just that one file diff (not supported for patches)
 * * for a merge, the diff will show the diff between the merge commit and
 *   its first parent (identical to how PRs work), while patch returns a
 *   response containing separate patches for each commit on the second
 *   parent's ancestry, up to the oldest common ancestor (identical to
 *   its reachability).
 *
 * Note that the character encoding of the contents of the diff is
 * unspecified as Git does not track this, making it hard for
 * Bitbucket to reliably determine this.
 */
export function getSnippetsByWorkspaceAndEncodedIdRevisionDiff(
  encodedId: string,
  revision: string,
  workspace: string,
  {
    path,
  }: {
    path?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/snippets/${workspace}/${encodedId}/${revision}/diff${QS.query(
      QS.form({
        path,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns the patch of the specified commit against its first
 * parent.
 *
 * Note that this resource is different in functionality from the `diff`
 * resource.
 *
 * The differences between a diff and a patch are:
 *
 * * patches have a commit header with the username, message, etc
 * * diffs support the optional `path=foo/bar.py` query param to filter the
 *   diff to just that one file diff (not supported for patches)
 * * for a merge, the diff will show the diff between the merge commit and
 *   its first parent (identical to how PRs work), while patch returns a
 *   response containing separate patches for each commit on the second
 *   parent's ancestry, up to the oldest common ancestor (identical to
 *   its reachability).
 *
 * Note that the character encoding of the contents of the patch is
 * unspecified as Git does not track this, making it hard for
 * Bitbucket to reliably determine this.
 */
export function getSnippetsByWorkspaceAndEncodedIdRevisionPatch(
  encodedId: string,
  revision: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/snippets/${workspace}/${encodedId}/${revision}/patch`, {
    ...opts,
  })
}
/**
 * Returns all the teams that the authenticated user is associated
 * with.
 *
 * **@deprecated This endpoint has been deprecated and will stop functioning
 * soon. You should use the [workspaces](./workspaces) endpoint instead. For
 * more information, see [this
 * post](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 */
export function getTeams(
  {
    role,
  }: {
    role?: "admin" | "contributor" | "member"
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedTeams
      }
    | {
        status: 401
        data: Error
      }
  >(
    `/teams${QS.query(
      QS.form({
        role,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Gets the public information associated with a team.
 *
 * If the team's profile is private, `location`, `website` and
 * `created_on` elements are omitted.
 *
 * **@deprecated This endpoint has been deprecated and will stop functioning on
 * August 25th, 2021. You should use the
 * [workspace](../workspaces/%7Bworkspace%7D) endpoint instead. For more
 * information, see [this
 * post](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 */
export function getTeamsByUsername(
  username: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Team
      }
    | {
        status: 404
        data: Error
      }
  >(`/teams/${username}`, {
    ...opts,
  })
}
/**
 * Returns the list of accounts that are following this team.
 *
 * **@deprecated This endpoint has been deprecated and will stop functioning
 * soon. There is no replacement endpoint. For more information, see [this
 * post](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 */
export function getTeamsByUsernameFollowers(
  username: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedUsers
      }
    | {
        status: 404
        data: Error
      }
  >(`/teams/${username}/followers`, {
    ...opts,
  })
}
/**
 * Returns the list of accounts this team is following.
 *
 * **@deprecated This endpoint has been deprecated and will stop functioning
 * soon. There is no replacement endpoint. For more information, see [this
 * post](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 */
export function getTeamsByUsernameFollowing(
  username: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedUsers
      }
    | {
        status: 404
        data: Error
      }
  >(`/teams/${username}/following`, {
    ...opts,
  })
}
/**
 * Returns all members of the specified team. Any member of any of the
 * team's groups is considered a member of the team. This includes users
 * in groups that may not actually have access to any of the team's
 * repositories.
 *
 * **This operation has been deprecated due to privacy changes.
 * See the
 * [announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-changes-gdpr/)
 * for details. You should this
 * [workspaces](../../workspaces/%7Bworkspace%7D/members) endpoint as a
 * replacement.**
 */
export function getTeamsByUsernameMembers(
  username: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: User
      }
    | {
        status: 404
        data: Error
      }
  >(`/teams/${username}/members`, {
    ...opts,
  })
}
/**
 * Returns an object for each team permission a user on the team has.
 *
 * **@deprecated This endpoint has been deprecated and will stop functioning
 * soon. You should use the [workspace
 * permissions](../../workspaces/%7Bworkspace%7D/permissions) endpoint instead.
 * For more information, see [the
 * announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 *
 * Permissions returned are effective permissions — if a user is a member of
 * multiple groups with distinct roles, only the highest level is returned.
 *
 * Permissions can be:
 *
 * * `admin`
 * * `collaborator`
 *
 * Only users with admin permission for the team may access this resource.
 *
 * Example:
 *
 * ```
 * $ curl https://api.bitbucket.org/2.0/teams/atlassian_tutorial/permissions
 *
 * {
 *   "pagelen": 10,
 *   "values": [
 *     {
 *       "permission": "admin",
 *       "type": "team_permission",
 *       "user": {
 *         "type": "user",
 *         "nickname": "evzijst",
 *         "display_name": "Erik van Zijst",
 *         "uuid": "{d301aafa-d676-4ee0-88be-962be7417567}"
 *       },
 *       "team": {
 *         "display_name": "Atlassian Bitbucket",
 *         "uuid": "{4cc6108a-a241-4db0-96a5-64347ac04f87}"
 *       }
 *     },
 *     {
 *       "permission": "collaborator",
 *       "type": "team_permission",
 *       "user": {
 *         "type": "user",
 *         "nickname": "seanaty",
 *         "display_name": "Sean Conaty",
 *         "uuid": "{504c3b62-8120-4f0c-a7bc-87800b9d6f70}"
 *       },
 *       "team": {
 *         "display_name": "Atlassian Bitbucket",
 *         "uuid": "{4cc6108a-a241-4db0-96a5-64347ac04f87}"
 *       }
 *     }
 *   ],
 *   "page": 1,
 *   "size": 2
 * }
 * ```
 *
 * Results may be further [filtered or sorted](../../../meta/filtering) by
 * team, user, or permission by adding the following query string
 * parameters:
 *
 * * `q=user.uuid="{d301aafa-d676-4ee0-88be-962be7417567}"` or
 * `q=permission="admin"`
 * * `sort=team.display_name`
 *
 * Note that the query parameter values need to be URL escaped so that `=`
 * would become `%3D`.
 */
export function getTeamsByUsernamePermissions(
  username: string,
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedTeamPermissions
      }
    | {
        status: 403
        data: Error
      }
  >(
    `/teams/${username}/permissions${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns an object for each repository permission for all of a
 * team’s repositories.
 *
 * **@deprecated This endpoint has been deprecated and will stop functioning
 * soon. You should use the [workspace repository
 * permissions](../../../workspaces/%7Bworkspace%7D/permissions/repositories)
 * endpoint instead. For more information, see [the
 * announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 *
 * If the username URL parameter refers to a user account instead of
 * a team account, an object containing the repository permissions
 * of all the username's repositories will be returned.
 *
 * Permissions returned are effective permissions — the highest level of
 * permission the user has. This does not include public repositories that
 * users are not granted any specific permission in, and does not
 * distinguish between direct and indirect privileges.
 *
 * Only users with admin permission for the team may access this resource.
 *
 * Permissions can be:
 *
 * * `admin`
 * * `write`
 * * `read`
 *
 * Example:
 *
 * ```
 * $ curl
 * https://api.bitbucket.org/2.0/teams/atlassian_tutorial/permissions/repositories
 *
 * {
 *   "pagelen": 10,
 *   "values": [
 *     {
 *       "type": "repository_permission",
 *       "user": {
 *         "type": "user",
 *         "display_name": "Erik van Zijst",
 *         "uuid": "{d301aafa-d676-4ee0-88be-962be7417567}"
 *       },
 *       "repository": {
 *         "type": "repository",
 *         "name": "geordi",
 *         "full_name": "bitbucket/geordi",
 *         "uuid": "{85d08b4e-571d-44e9-a507-fa476535aa98}"
 *       },
 *       "permission": "admin"
 *     },
 *     {
 *       "type": "repository_permission",
 *       "user": {
 *         "type": "user",
 *         "display_name": "Sean Conaty",
 *         "uuid": "{504c3b62-8120-4f0c-a7bc-87800b9d6f70}"
 *       },
 *       "repository": {
 *         "type": "repository",
 *         "name": "geordi",
 *         "full_name": "bitbucket/geordi",
 *         "uuid": "{85d08b4e-571d-44e9-a507-fa476535aa98}"
 *       },
 *       "permission": "write"
 *     }
 *   ],
 *   "page": 1,
 *   "size": 2
 * }
 * ```
 *
 * Results may be further [filtered or sorted](../../../../meta/filtering)
 * by repository, user, or permission by adding the following query string
 * parameters:
 *
 * * `q=repository.name="geordi"` or `q=permission>"read"`
 * * `sort=user.display_name`
 *
 * Note that the query parameter values need to be URL escaped so that `=`
 * would become `%3D`.
 */
export function getTeamsByUsernamePermissionsRepositories(
  username: string,
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedRepositoryPermissions
      }
    | {
        status: 403
        data: Error
      }
  >(
    `/teams/${username}/permissions/repositories${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns an object for each repository permission of a given repository.
 *
 * **@deprecated This endpoint has been deprecated and will stop functioning
 * soon. You should use the [workspace repository
 * permissions](../../../../workspaces/%7Bworkspace%7D/permissions/repositories/%7Brepo_slug%7D)
 * endpoint instead. For more information, see [the
 * announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 *
 * If the username URL parameter refers to a user account instead of
 * a team account, an object containing the repository permissions
 * of the username's repository will be returned.
 *
 * Permissions returned are effective permissions — the highest level of
 * permission the user has. This does not include public repositories that
 * users are not granted any specific permission in, and does not
 * distinguish between direct and indirect privileges.
 *
 * Only users with admin permission for the repository may access this
 * resource.
 *
 * Permissions can be:
 *
 * * `admin`
 * * `write`
 * * `read`
 *
 * Example:
 *
 * ```
 * $ curl
 * https://api.bitbucket.org/2.0/teams/atlassian_tutorial/permissions/repositories/geordi
 *
 * {
 *   "pagelen": 10,
 *   "values": [
 *     {
 *       "type": "repository_permission",
 *       "user": {
 *         "type": "user",
 *         "display_name": "Erik van Zijst",
 *         "uuid": "{d301aafa-d676-4ee0-88be-962be7417567}"
 *       },
 *       "repository": {
 *         "type": "repository",
 *         "name": "geordi",
 *         "full_name": "bitbucket/geordi",
 *         "uuid": "{85d08b4e-571d-44e9-a507-fa476535aa98}"
 *       },
 *       "permission": "admin"
 *     },
 *     {
 *       "type": "repository_permission",
 *       "user": {
 *         "type": "user",
 *         "display_name": "Sean Conaty",
 *         "uuid": "{504c3b62-8120-4f0c-a7bc-87800b9d6f70}"
 *       },
 *       "repository": {
 *         "type": "repository",
 *         "name": "geordi",
 *         "full_name": "bitbucket/geordi",
 *         "uuid": "{85d08b4e-571d-44e9-a507-fa476535aa98}"
 *       },
 *       "permission": "write"
 *     }
 *   ],
 *   "page": 1,
 *   "size": 2
 * }
 * ```
 *
 * Results may be further [filtered or sorted](../../../../meta/filtering)
 * by user, or permission by adding the following query string parameters:
 *
 * * `q=permission>"read"`
 * * `sort=user.display_name`
 *
 * Note that the query parameter values need to be URL escaped so that `=`
 * would become `%3D`.
 */
export function getTeamsByUsernamePermissionsRepositoriesAndRepoSlug(
  repoSlug: string,
  username: string,
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedRepositoryPermissions
      }
    | {
        status: 403
        data: Error
      }
  >(
    `/teams/${username}/permissions/repositories/${repoSlug}${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * **@deprecated This endpoint has been deprecated and will stop functioning on
 * August 25th, 2021. You should use the [workspace
 * projects](../../../workspaces/%7Bworkspace%7D/projects#get) endpoint
 * instead. For more information, see [the
 * announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 */
export function getTeamsByUsernameProjects(
  username: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedProjects
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/teams/${username}/projects/`, {
    ...opts,
  })
}
/**
 * Creates a new project.
 *
 * **@deprecated This endpoint has been deprecated and will stop functioning on
 * August 25th, 2021. You should use the [workspace
 * projects](../../../workspaces/%7Bworkspace%7D/projects#post) endpoint
 * instead. For more information, see [the
 * announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 *
 * Note that the avatar has to be embedded as either a data-url
 * or a URL to an external image as shown in the examples below:
 *
 * ```
 * $ body=$(cat << EOF
 * {
 *     "name": "Mars Project",
 *     "key": "MARS",
 *     "description": "Software for colonizing mars.",
 *     "links": {
 *         "avatar": {
 *             "href":
 * "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/..."
 *         }
 *     },
 *     "is_private": false
 * }
 * EOF
 * )
 * $ curl -H "Content-Type: application/json" \
 *        -X POST \
 *        -d "$body" \
 *        https://api.bitbucket.org/2.0/teams/teams-in-space/projects/ | jq .
 * {
 *   // Serialized project document
 * }
 * ```
 *
 * or even:
 *
 * ```
 * $ body=$(cat << EOF
 * {
 *     "name": "Mars Project",
 *     "key": "MARS",
 *     "description": "Software for colonizing mars.",
 *     "links": {
 *         "avatar": {
 *             "href": "http://i.imgur.com/72tRx4w.gif"
 *         }
 *     },
 *     "is_private": false
 * }
 * EOF
 * )
 * $ curl -H "Content-Type: application/json" \
 *        -X POST \
 *        -d "$body" \
 *        https://api.bitbucket.org/2.0/teams/teams-in-space/projects/ | jq .
 * {
 *   // Serialized project document
 * }
 * ```
 */
export function postTeamsByUsernameProjects(
  username: string,
  project: Project,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: Project
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/teams/${username}/projects/`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: project,
    })
  )
}
/**
 * **@deprecated This endpoint has been deprecated and will stop functioning
 * soon. You should use the [workspace
 * project](../../../workspaces/%7Bworkspace%7D/projects/%7Bproject_key%7D#delete)
 * endpoint instead. For more information, see [the
 * announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 */
export function deleteTeamsByUsernameProjectsAndProjectKey(
  projectKey: string,
  username: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/teams/${username}/projects/${projectKey}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * **@deprecated This endpoint has been deprecated and will stop functioning
 * soon. You should use the [workspace
 * project](../../../workspaces/%7Bworkspace%7D/projects/%7Bproject_key%7D#get)
 * endpoint instead. For more information, see [the
 * announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 */
export function getTeamsByUsernameProjectsAndProjectKey(
  projectKey: string,
  username: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Project
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/teams/${username}/projects/${projectKey}`, {
    ...opts,
  })
}
/**
 * Since this endpoint can be used to both update and to create a
 * project, the request body depends on the intent.
 *
 * **@deprecated This endpoint has been deprecated and will stop functioning
 * soon. You should use the [workspace
 * project](../../../workspaces/%7Bworkspace%7D/projects/%7Bproject_key%7D#put)
 * endpoint instead. For more information, see [the
 * announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 *
 * #### Creation
 *
 * See the POST documentation for the project collection for an
 * example of the request body.
 *
 * Note: The `key` should not be specified in the body of request
 * (since it is already present in the URL). The `name` is required,
 * everything else is optional.
 *
 * #### Update
 *
 * See the POST documentation for the project collection for an
 * example of the request body.
 *
 * Note: The key is not required in the body (since it is already in
 * the URL). The key may be specified in the body, if the intent is
 * to change the key itself. In such a scenario, the location of the
 * project is changed and is returned in the `Location` header of the
 * response.
 */
export function putTeamsByUsernameProjectsAndProjectKey(
  projectKey: string,
  username: string,
  project: Project,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Project
      }
    | {
        status: 201
        data: Project
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/teams/${username}/projects/${projectKey}`,
    oazapfts.json({
      ...opts,
      method: "PUT",
      body: project,
    })
  )
}
export function searchAccount(
  username: string,
  searchQuery: string,
  {
    page,
    pagelen,
  }: {
    page?: number
    pagelen?: number
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: SearchResultPage
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 404
        data: Error
      }
    | {
        status: 429
        data: Error
      }
  >(
    `/teams/${username}/search/code${QS.query(
      QS.form({
        search_query: searchQuery,
        page,
        pagelen,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * All repositories in the given workspace. This includes any private
 * repositories the calling user has access to.
 *
 * **@deprecated This endpoint has been deprecated and will stop functioning
 * soon. You should use the [repository
 * list](../../repositories/%7Bworkspace%7D) endpoint instead. For more
 * information, see the [deprecation
 * announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 */
export function getTeamsByWorkspaceRepositories(
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: number
    data: Error
  }>(`/teams/${workspace}/repositories`, {
    ...opts,
  })
}
/**
 * Returns the currently logged in user.
 */
export function getUser(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: User
      }
    | {
        status: 401
        data: Error
      }
  >("/user", {
    ...opts,
  })
}
/**
 * Returns all the authenticated user's email addresses. Both
 * confirmed and unconfirmed.
 */
export function getUserEmails(opts?: Oazapfts.RequestOpts) {
  return oazapfts.fetchJson<{
    status: number
    data: Error
  }>("/user/emails", {
    ...opts,
  })
}
/**
 * Returns details about a specific one of the authenticated user's
 * email addresses.
 *
 * Details describe whether the address has been confirmed by the user and
 * whether it is the user's primary address or not.
 */
export function getUserEmailsByEmail(
  email: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: number
    data: Error
  }>(`/user/emails/${email}`, {
    ...opts,
  })
}
/**
 * Returns an object for each repository the caller has explicit access
 * to and their effective permission — the highest level of permission the
 * caller has. This does not return public repositories that the user was
 * not granted any specific permission in, and does not distinguish between
 * direct and indirect privileges.
 *
 * Permissions can be:
 *
 * * `admin`
 * * `write`
 * * `read`
 *
 * Example:
 *
 * ```
 * $ curl https://api.bitbucket.org/2.0/user/permissions/repositories
 *
 * {
 *   "pagelen": 10,
 *   "values": [
 *     {
 *       "type": "repository_permission",
 *       "user": {
 *         "type": "user",
 *         "nickname": "evzijst",
 *         "display_name": "Erik van Zijst",
 *         "uuid": "{d301aafa-d676-4ee0-88be-962be7417567}"
 *       },
 *       "repository": {
 *         "type": "repository",
 *         "name": "geordi",
 *         "full_name": "bitbucket/geordi",
 *         "uuid": "{85d08b4e-571d-44e9-a507-fa476535aa98}"
 *       },
 *       "permission": "admin"
 *     }
 *   ],
 *   "page": 1,
 *   "size": 1
 * }
 * ```
 *
 * Results may be further [filtered or sorted](../../../meta/filtering) by
 * repository or permission by adding the following query string
 * parameters:
 *
 * * `q=repository.name="geordi"` or `q=permission>"read"`
 * * `sort=repository.name`
 *
 * Note that the query parameter values need to be URL escaped so that `=`
 * would become `%3D`.
 */
export function getUserPermissionsRepositories(
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedRepositoryPermissions
  }>(
    `/user/permissions/repositories${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns an object for each team the caller is a member of, and their
 * effective role — the highest level of privilege the caller has. If a
 * user is a member of multiple groups with distinct roles, only the
 * highest level is returned.
 *
 * **@deprecated This endpoint has been deprecated and will stop functioning
 * soon. You should use the [workspace permissions](./workspaces) endpoint
 * instead. For more information, see [the
 * announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 *
 * Permissions can be:
 *
 * * `admin`
 * * `collaborator`
 *
 * Example:
 *
 * ```
 * $ curl https://api.bitbucket.org/2.0/user/permissions/teams
 *
 * {
 *   "pagelen": 10,
 *   "values": [
 *     {
 *       "permission": "admin",
 *       "type": "team_permission",
 *       "user": {
 *         "type": "user",
 *         "nickname": "evzijst",
 *         "display_name": "Erik van Zijst",
 *         "uuid": "{d301aafa-d676-4ee0-88be-962be7417567}"
 *       },
 *       "team": {
 *         "display_name": "Atlassian Bitbucket",
 *         "uuid": "{4cc6108a-a241-4db0-96a5-64347ac04f87}"
 *       }
 *     }
 *   ],
 *   "page": 1,
 *   "size": 1
 * }
 * ```
 *
 * Results may be further [filtered or sorted](../../../meta/filtering) by
 * team or permission by adding the following query string parameters:
 *
 * * `q=team.uuid="{4cc6108a-a241-4db0-96a5-64347ac04f87}"` or
 * `q=permission="admin"`
 * * `sort=team.display_name`
 *
 * Note that the query parameter values need to be URL escaped so that `=`
 * would become `%3D`.
 */
export function getUserPermissionsTeams(
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: 200
    data: PaginatedTeamPermissions
  }>(
    `/user/permissions/teams${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns an object for each workspace the caller is a member of, and
 * their effective role - the highest level of privilege the caller has.
 * If a user is a member of multiple groups with distinct roles, only the
 * highest level is returned.
 *
 * Permissions can be:
 *
 * * `owner`
 * * `collaborator`
 * * `member`
 *
 * Example:
 *
 * ```
 * $ curl https://api.bitbucket.org/2.0/user/permissions/workspaces
 *
 * {
 *   "pagelen": 10,
 *   "page": 1,
 *   "size": 1,
 *   "values": [
 *     {
 *       "type": "workspace_membership",
 *       "permission": "owner",
 *       "last_accessed": "2019-03-07T12:35:02.900024+00:00",
 *       "added_on": "2018-10-11T17:42:02.961424+00:00",
 *       "user": {
 *         "type": "user",
 *         "uuid": "{470c176d-3574-44ea-bb41-89e8638bcca4}",
 *         "nickname": "evzijst",
 *         "display_name": "Erik van Zijst",
 *       },
 *       "workspace": {
 *         "type": "workspace",
 *         "uuid": "{a15fb181-db1f-48f7-b41f-e1eff06929d6}",
 *         "slug": "bbworkspace1",
 *         "name": "Atlassian Bitbucket",
 *       }
 *     }
 *   ]
 * }
 * ```
 *
 * Results may be further [filtered or sorted](../../../meta/filtering) by
 * workspace or permission by adding the following query string parameters:
 *
 * * `q=workspace.slug="bbworkspace1"` or `q=permission="owner"`
 * * `sort=workspace.slug`
 *
 * Note that the query parameter values need to be URL escaped so that `=`
 * would become `%3D`.
 */
export function getUserPermissionsWorkspaces(
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedWorkspaceMemberships
      }
    | {
        status: 401
        data: Error
      }
  >(
    `/user/permissions/workspaces${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Gets the public information associated with a user account.
 *
 * If the user's profile is private, `location`, `website` and
 * `created_on` elements are omitted.
 *
 * Note that the user object returned by this operation is changing
 * significantly, due to privacy changes. See the
 * [announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-changes-gdpr/#changes-to-bitbucket-user-objects)
 * for details.
 */
export function getUsersBySelectedUser(
  selectedUser: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: User
      }
    | {
        status: 404
        data: Error
      }
  >(`/users/${selectedUser}`, {
    ...opts,
  })
}
/**
 * Update an [application property](/cloud/bitbucket/application-properties/)
 * value stored against a user.
 */
export function updateUserHostedPropertyValue(
  selectedUser: string,
  appKey: string,
  propertyName: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/users/${selectedUser}/properties/${appKey}/${propertyName}`,
    {
      ...opts,
      method: "PUT",
    }
  )
}
/**
 * Delete an [application property](/cloud/bitbucket/application-properties/)
 * value stored against a user.
 */
export function deleteUserHostedPropertyValue(
  selectedUser: string,
  appKey: string,
  propertyName: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/users/${selectedUser}/properties/${appKey}/${propertyName}`,
    {
      ...opts,
      method: "DELETE",
    }
  )
}
/**
 * Retrieve an [application property](/cloud/bitbucket/application-properties/)
 * value stored against a user.
 */
export function retrieveUserHostedPropertyValue(
  selectedUser: string,
  appKey: string,
  propertyName: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchText(
    `/users/${selectedUser}/properties/${appKey}/${propertyName}`,
    {
      ...opts,
    }
  )
}
export function searchAccount2(
  selectedUser: string,
  searchQuery: string,
  {
    page,
    pagelen,
  }: {
    page?: number
    pagelen?: number
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: SearchResultPage
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 404
        data: Error
      }
    | {
        status: 429
        data: Error
      }
  >(
    `/users/${selectedUser}/search/code${QS.query(
      QS.form({
        search_query: searchQuery,
        page,
        pagelen,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns a paginated list of the user's SSH public keys.
 *
 * Example:
 *
 * ```
 * $ curl
 * https://api.bitbucket.org/2.0/users/{ed08f5e1-605b-4f4a-aee4-6c97628a673e}/ssh-keys
 * {
 *     "page": 1,
 *     "pagelen": 10,
 *     "size": 1,
 *     "values": [
 *         {
 *             "comment": "user@myhost",
 *             "created_on": "2018-03-14T13:17:05.196003+00:00",
 *             "key": "ssh-ed25519
 * AAAAC3NzaC1lZDI1NTE5AAAAIKqP3Cr632C2dNhhgKVcon4ldUSAeKiku2yP9O9/bDtY",
 *             "label": "",
 *             "last_used": "2018-03-20T13:18:05.196003+00:00",
 *             "links": {
 *                 "self": {
 *                     "href":
 * "https://api.bitbucket.org/2.0/users/{ed08f5e1-605b-4f4a-aee4-6c97628a673e}/ssh-keys/b15b6026-9c02-4626-b4ad-b905f99f763a"
 *                 }
 *             },
 *             "owner": {
 *                 "display_name": "Mark Adams",
 *                 "links": {
 *                     "avatar": {
 *                         "href":
 * "https://bitbucket.org/account/markadams-atl/avatar/32/"
 *                     },
 *                     "html": {
 *                         "href": "https://bitbucket.org/markadams-atl/"
 *                     },
 *                     "self": {
 *                         "href":
 * "https://api.bitbucket.org/2.0/users/{ed08f5e1-605b-4f4a-aee4-6c97628a673e}"
 *                     }
 *                 },
 *                 "type": "user",
 *                 "username": "markadams-atl",
 *                 "nickname": "markadams-atl",
 *                 "uuid": "{d7dd0e2d-3994-4a50-a9ee-d260b6cefdab}"
 *             },
 *             "type": "ssh_key",
 *             "uuid": "{b15b6026-9c02-4626-b4ad-b905f99f763a}"
 *         }
 *     ]
 * }
 * ```
 */
export function getUsersBySelectedUserSshKeys(
  selectedUser: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedSshUserKeys
      }
    | {
        status: 403
      }
    | {
        status: 404
        data: Error
      }
  >(`/users/${selectedUser}/ssh-keys`, {
    ...opts,
  })
}
/**
 * Adds a new SSH public key to the specified user account and returns the
 * resulting key.
 *
 * Example:
 * ```
 * $ curl -X POST -H "Content-Type: application/json" -d '{"key": "ssh-ed25519
 * AAAAC3NzaC1lZDI1NTE5AAAAIKqP3Cr632C2dNhhgKVcon4ldUSAeKiku2yP9O9/bDtY
 * user@myhost"}'
 * https://api.bitbucket.org/2.0/users/{ed08f5e1-605b-4f4a-aee4-6c97628a673e}/ssh-keys
 *
 * {
 *     "comment": "user@myhost",
 *     "created_on": "2018-03-14T13:17:05.196003+00:00",
 *     "key": "ssh-ed25519
 * AAAAC3NzaC1lZDI1NTE5AAAAIKqP3Cr632C2dNhhgKVcon4ldUSAeKiku2yP9O9/bDtY",
 *     "label": "",
 *     "last_used": "2018-03-20T13:18:05.196003+00:00",
 *     "links": {
 *         "self": {
 *             "href":
 * "https://api.bitbucket.org/2.0/users/{ed08f5e1-605b-4f4a-aee4-6c97628a673e}/ssh-keys/b15b6026-9c02-4626-b4ad-b905f99f763a"
 *         }
 *     },
 *     "owner": {
 *         "display_name": "Mark Adams",
 *         "links": {
 *             "avatar": {
 *                 "href":
 * "https://bitbucket.org/account/markadams-atl/avatar/32/"
 *             },
 *             "html": {
 *                 "href": "https://bitbucket.org/markadams-atl/"
 *             },
 *             "self": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/users/{ed08f5e1-605b-4f4a-aee4-6c97628a673e}"
 *             }
 *         },
 *         "type": "user",
 *         "username": "markadams-atl",
 *         "nickname": "markadams-atl",
 *         "uuid": "{d7dd0e2d-3994-4a50-a9ee-d260b6cefdab}"
 *     },
 *     "type": "ssh_key",
 *     "uuid": "{b15b6026-9c02-4626-b4ad-b905f99f763a}"
 * }
 * ```
 */
export function postUsersBySelectedUserSshKeys(
  selectedUser: string,
  sshAccountKey?: SshAccountKey,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: SshAccountKey
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 403
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/users/${selectedUser}/ssh-keys`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: sshAccountKey,
    })
  )
}
/**
 * Deletes a specific SSH public key from a user's account
 *
 * Example:
 * ```
 * $ curl -X DELETE
 * https://api.bitbucket.org/2.0/users/{ed08f5e1-605b-4f4a-aee4-6c97628a673e}/ssh-keys/{b15b6026-9c02-4626-b4ad-b905f99f763a}
 * ```
 */
export function deleteUsersBySelectedUserSshKeysAndKeyId(
  keyId: string,
  selectedUser: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 403
      }
    | {
        status: 404
        data: Error
      }
  >(`/users/${selectedUser}/ssh-keys/${keyId}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Returns a specific SSH public key belonging to a user.
 *
 * Example:
 * ```
 * $ curl
 * https://api.bitbucket.org/2.0/users/{ed08f5e1-605b-4f4a-aee4-6c97628a673e}/ssh-keys/{fbe4bbab-f6f7-4dde-956b-5c58323c54b3}
 *
 * {
 *     "comment": "user@myhost",
 *     "created_on": "2018-03-14T13:17:05.196003+00:00",
 *     "key": "ssh-ed25519
 * AAAAC3NzaC1lZDI1NTE5AAAAIKqP3Cr632C2dNhhgKVcon4ldUSAeKiku2yP9O9/bDtY",
 *     "label": "",
 *     "last_used": "2018-03-20T13:18:05.196003+00:00",
 *     "links": {
 *         "self": {
 *             "href":
 * "https://api.bitbucket.org/2.0/users/{ed08f5e1-605b-4f4a-aee4-6c97628a673e}/ssh-keys/b15b6026-9c02-4626-b4ad-b905f99f763a"
 *         }
 *     },
 *     "owner": {
 *         "display_name": "Mark Adams",
 *         "links": {
 *             "avatar": {
 *                 "href":
 * "https://bitbucket.org/account/markadams-atl/avatar/32/"
 *             },
 *             "html": {
 *                 "href": "https://bitbucket.org/markadams-atl/"
 *             },
 *             "self": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/users/{ed08f5e1-605b-4f4a-aee4-6c97628a673e}"
 *             }
 *         },
 *         "type": "user",
 *         "username": "markadams-atl",
 *         "nickname": "markadams-atl",
 *         "uuid": "{d7dd0e2d-3994-4a50-a9ee-d260b6cefdab}"
 *     },
 *     "type": "ssh_key",
 *     "uuid": "{b15b6026-9c02-4626-b4ad-b905f99f763a}"
 * }
 * ```
 */
export function getUsersBySelectedUserSshKeysAndKeyId(
  keyId: string,
  selectedUser: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: SshAccountKey
      }
    | {
        status: 403
      }
    | {
        status: 404
        data: Error
      }
  >(`/users/${selectedUser}/ssh-keys/${keyId}`, {
    ...opts,
  })
}
/**
 * Updates a specific SSH public key on a user's account
 *
 * Note: Only the 'comment' field can be updated using this API. To modify the
 * key or comment values, you must delete and add the key again.
 *
 * Example:
 * ```
 * $ curl -X PUT -H "Content-Type: application/json" -d '{"label": "Work key"}'
 * https://api.bitbucket.org/2.0/users/{ed08f5e1-605b-4f4a-aee4-6c97628a673e}/ssh-keys/{b15b6026-9c02-4626-b4ad-b905f99f763a}
 *
 * {
 *     "comment": "",
 *     "created_on": "2018-03-14T13:17:05.196003+00:00",
 *     "key": "ssh-ed25519
 * AAAAC3NzaC1lZDI1NTE5AAAAIKqP3Cr632C2dNhhgKVcon4ldUSAeKiku2yP9O9/bDtY",
 *     "label": "Work key",
 *     "last_used": "2018-03-20T13:18:05.196003+00:00",
 *     "links": {
 *         "self": {
 *             "href":
 * "https://api.bitbucket.org/2.0/users/{ed08f5e1-605b-4f4a-aee4-6c97628a673e}/ssh-keys/b15b6026-9c02-4626-b4ad-b905f99f763a"
 *         }
 *     },
 *     "owner": {
 *         "display_name": "Mark Adams",
 *         "links": {
 *             "avatar": {
 *                 "href":
 * "https://bitbucket.org/account/markadams-atl/avatar/32/"
 *             },
 *             "html": {
 *                 "href": "https://bitbucket.org/markadams-atl/"
 *             },
 *             "self": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/users/{ed08f5e1-605b-4f4a-aee4-6c97628a673e}"
 *             }
 *         },
 *         "type": "user",
 *         "username": "markadams-atl",
 *         "nickname": "markadams-atl",
 *         "uuid": "{d7dd0e2d-3994-4a50-a9ee-d260b6cefdab}"
 *     },
 *     "type": "ssh_key",
 *     "uuid": "{b15b6026-9c02-4626-b4ad-b905f99f763a}"
 * }
 * ```
 */
export function putUsersBySelectedUserSshKeysAndKeyId(
  keyId: string,
  selectedUser: string,
  sshAccountKey?: SshAccountKey,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: SshAccountKey
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 403
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/users/${selectedUser}/ssh-keys/${keyId}`,
    oazapfts.json({
      ...opts,
      method: "PUT",
      body: sshAccountKey,
    })
  )
}
/**
 * **@deprecated This endpoint has been deprecated and will stop functioning
 * soon. You should use the
 * [workspaces](../../workspaces/%7Bworkspace%7D/members) endpoint instead. For
 * more information, see [this
 * post](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 */
export function getUsersByUsernameMembers(
  username: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: User
      }
    | {
        status: 404
        data: Error
      }
  >(`/users/${username}/members`, {
    ...opts,
  })
}
/**
 * All repositories in the given workspace. This includes any private
 * repositories the calling user has access to.
 *
 * **@deprecated This endpoint has been deprecated and will stop functioning
 * soon. You should use the [repository
 * list](../../repositories/%7Bworkspace%7D) endpoint instead. For more
 * information, see the [deprecation
 * announcement](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-teams-deprecation/).**
 */
export function getUsersByWorkspaceRepositories(
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<{
    status: number
    data: Error
  }>(`/users/${workspace}/repositories`, {
    ...opts,
  })
}
/**
 * Returns a list of workspaces accessible by the authenticated user.
 *
 * Example:
 *
 * ```
 * $ curl https://api.bitbucket.org/2.0/workspaces
 *
 * {
 *   "pagelen": 10,
 *   "page": 1,
 *   "size": 1,
 *   "values": [
 *     {
 *         "uuid": "{a15fb181-db1f-48f7-b41f-e1eff06929d6}",
 *         "links": {
 *             "owners": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/workspaces/bbworkspace1/members?q=permission%3D%22owner%22"
 *             },
 *             "self": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/workspaces/bbworkspace1"
 *             },
 *             "repositories": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/repositories/bbworkspace1"
 *             },
 *             "snippets": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/snippets/bbworkspace1"
 *             },
 *             "html": {
 *                 "href": "https://bitbucket.org/bbworkspace1/"
 *             },
 *             "avatar": {
 *                 "href":
 * "https://bitbucket.org/workspaces/bbworkspace1/avatar/?ts=1543465801"
 *             },
 *             "members": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/workspaces/bbworkspace1/members"
 *             },
 *             "projects": {
 *                 "href":
 * "https://api.bitbucket.org/2.0/workspaces/bbworkspace1/projects"
 *             }
 *         },
 *         "created_on": "2018-11-14T19:15:05.058566+00:00",
 *         "type": "workspace",
 *         "slug": "bbworkspace1",
 *         "is_private": true,
 *         "name": "Atlassian Bitbucket"
 *     }
 *   ]
 * }
 * ```
 *
 * Results may be further [filtered or sorted](../meta/filtering) by
 * workspace or permission by adding the following query string parameters:
 *
 * * `q=slug="bbworkspace1"` or `q=is_private=true`
 * * `sort=created_on`
 *
 * Note that the query parameter values need to be URL escaped so that `=`
 * would become `%3D`.
 */
export function getWorkspaces(
  {
    role,
    q,
    sort,
  }: {
    role?: "owner" | "collaborator" | "member"
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedWorkspaces
      }
    | {
        status: 401
        data: Error
      }
  >(
    `/workspaces${QS.query(
      QS.form({
        role,
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns the requested workspace.
 */
export function getWorkspacesByWorkspace(
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Workspace
      }
    | {
        status: 404
        data: Error
      }
  >(`/workspaces/${workspace}`, {
    ...opts,
  })
}
/**
 * Returns a paginated list of webhooks installed on this workspace.
 */
export function getWorkspacesByWorkspaceHooks(
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedWebhookSubscriptions
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/workspaces/${workspace}/hooks`, {
    ...opts,
  })
}
/**
 * Creates a new webhook on the specified workspace.
 *
 * Workspace webhooks are fired for events from all repositories contained
 * by that workspace.
 *
 * Note that only owners can install webhooks on workspaces.
 */
export function postWorkspacesByWorkspaceHooks(
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: WebhookSubscription
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/workspaces/${workspace}/hooks`, {
    ...opts,
    method: "POST",
  })
}
/**
 * Deletes the specified webhook subscription from the given workspace.
 */
export function deleteWorkspacesByWorkspaceHooksAndUid(
  uid: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/workspaces/${workspace}/hooks/${uid}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Returns the webhook with the specified id installed on the given
 * workspace.
 */
export function getWorkspacesByWorkspaceHooksAndUid(
  uid: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: WebhookSubscription
      }
    | {
        status: 404
        data: Error
      }
  >(`/workspaces/${workspace}/hooks/${uid}`, {
    ...opts,
  })
}
/**
 * Updates the specified webhook subscription.
 *
 * The following properties can be mutated:
 *
 * * `description`
 * * `url`
 * * `active`
 * * `events`
 */
export function putWorkspacesByWorkspaceHooksAndUid(
  uid: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: WebhookSubscription
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/workspaces/${workspace}/hooks/${uid}`, {
    ...opts,
    method: "PUT",
  })
}
/**
 * Returns all members of the requested workspace.
 */
export function getWorkspacesByWorkspaceMembers(
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedWorkspaceMemberships
      }
    | {
        status: 401
        data: Error
      }
  >(`/workspaces/${workspace}/members`, {
    ...opts,
  })
}
/**
 * Returns the workspace membership, which includes
 * a `User` object for the member and a `Workspace` object
 * for the requested workspace.
 */
export function getWorkspacesByWorkspaceMembersAndMember(
  member: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: WorkspaceMembership
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/workspaces/${workspace}/members/${member}`, {
    ...opts,
  })
}
/**
 * Returns the list of members in a workspace
 * and their permission levels.
 * Permission can be:
 * * `owner`
 * * `collaborator`
 * * `member`
 *
 * Example:
 *
 * ```
 * $ curl -X https://api.bitbucket.org/2.0/workspaces/bbworkspace1/permissions
 *
 * {
 *     "pagelen": 10,
 *     "values": [
 *         {
 *             "permission": "owner",
 *             "type": "workspace_membership",
 *             "user": {
 *                 "type": "user",
 *                 "uuid": "{470c176d-3574-44ea-bb41-89e8638bcca4}",
 *                 "display_name": "Erik van Zijst",
 *             },
 *             "workspace": {
 *                 "type": "workspace",
 *                 "uuid": "{a15fb181-db1f-48f7-b41f-e1eff06929d6}",
 *                 "slug": "bbworkspace1",
 *                 "name": "Atlassian Bitbucket",
 *             }
 *         },
 *         {
 *             "permission": "member",
 *             "type": "workspace_membership",
 *             "user": {
 *                 "type": "user",
 *                 "nickname": "seanaty",
 *                 "display_name": "Sean Conaty",
 *                 "uuid": "{504c3b62-8120-4f0c-a7bc-87800b9d6f70}"
 *             },
 *             "workspace": {
 *                 "type": "workspace",
 *                 "uuid": "{a15fb181-db1f-48f7-b41f-e1eff06929d6}",
 *                 "slug": "bbworkspace1",
 *                 "name": "Atlassian Bitbucket",
 *             }
 *         }
 *     ],
 *     "page": 1,
 *     "size": 2
 * }
 * ```
 *
 * Results may be further [filtered](../../../meta/filtering) by
 * permission by adding the following query string parameters:
 *
 * * `q=permission="owner"`
 */
export function getWorkspacesByWorkspacePermissions(
  workspace: string,
  {
    q,
  }: {
    q?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedWorkspaceMemberships
      }
    | {
        status: 401
        data: Error
      }
  >(
    `/workspaces/${workspace}/permissions${QS.query(
      QS.form({
        q,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns an object for each repository permission for all of a
 * workspace's repositories.
 *
 * Permissions returned are effective permissions: the highest level of
 * permission the user has. This does not distinguish between direct and
 * indirect (group) privileges.
 *
 * Only users with admin permission for the team may access this resource.
 *
 * Permissions can be:
 *
 * * `admin`
 * * `write`
 * * `read`
 *
 * Example:
 *
 * ```
 * $ curl
 * https://api.bitbucket.org/2.0/workspaces/atlassian_tutorial/permissions/repositories
 *
 * {
 *   "pagelen": 10,
 *   "values": [
 *     {
 *       "type": "repository_permission",
 *       "user": {
 *         "type": "user",
 *         "display_name": "Erik van Zijst",
 *         "uuid": "{d301aafa-d676-4ee0-88be-962be7417567}"
 *       },
 *       "repository": {
 *         "type": "repository",
 *         "name": "geordi",
 *         "full_name": "atlassian_tutorial/geordi",
 *         "uuid": "{85d08b4e-571d-44e9-a507-fa476535aa98}"
 *       },
 *       "permission": "admin"
 *     },
 *     {
 *       "type": "repository_permission",
 *       "user": {
 *         "type": "user",
 *         "display_name": "Sean Conaty",
 *         "uuid": "{504c3b62-8120-4f0c-a7bc-87800b9d6f70}"
 *       },
 *       "repository": {
 *         "type": "repository",
 *         "name": "geordi",
 *         "full_name": "atlassian_tutorial/geordi",
 *         "uuid": "{85d08b4e-571d-44e9-a507-fa476535aa98}"
 *       },
 *       "permission": "write"
 *     },
 *     {
 *       "type": "repository_permission",
 *       "user": {
 *         "type": "user",
 *         "display_name": "Jeff Zeng",
 *         "uuid": "{47f92a9a-c3a3-4d0b-bc4e-782a969c5c72}"
 *       },
 *       "repository": {
 *         "type": "repository",
 *         "name": "whee",
 *         "full_name": "atlassian_tutorial/whee",
 *         "uuid": "{30ba25e9-51ff-4555-8dd0-fc7ee2fa0895}"
 *       },
 *       "permission": "admin"
 *     }
 *   ],
 *   "page": 1,
 *   "size": 3
 * }
 * ```
 *
 * Results may be further [filtered or sorted](../../../../meta/filtering)
 * by repository, user, or permission by adding the following query string
 * parameters:
 *
 * * `q=repository.name="geordi"` or `q=permission>"read"`
 * * `sort=user.display_name`
 *
 * Note that the query parameter values need to be URL escaped so that `=`
 * would become `%3D`.
 */
export function getWorkspacesByWorkspacePermissionsRepositories(
  workspace: string,
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedRepositoryPermissions
      }
    | {
        status: 403
        data: Error
      }
  >(
    `/workspaces/${workspace}/permissions/repositories${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}
/**
 * Returns an object for the repository permission of each user in the
 * requested repository.
 *
 * Permissions returned are effective permissions: the highest level of
 * permission the user has. This does not distinguish between direct and
 * indirect (group) privileges.
 *
 * Only users with admin permission for the repository may access this
 * resource.
 *
 * Permissions can be:
 *
 * * `admin`
 * * `write`
 * * `read`
 *
 * Example:
 *
 * ```
 * $ curl
 * https://api.bitbucket.org/2.0/workspaces/atlassian_tutorial/permissions/repositories/geordi
 *
 * {
 *   "pagelen": 10,
 *   "values": [
 *     {
 *       "type": "repository_permission",
 *       "user": {
 *         "type": "user",
 *         "display_name": "Erik van Zijst",
 *         "uuid": "{d301aafa-d676-4ee0-88be-962be7417567}"
 *       },
 *       "repository": {
 *         "type": "repository",
 *         "name": "geordi",
 *         "full_name": "atlassian_tutorial/geordi",
 *         "uuid": "{85d08b4e-571d-44e9-a507-fa476535aa98}"
 *       },
 *       "permission": "admin"
 *     },
 *     {
 *       "type": "repository_permission",
 *       "user": {
 *         "type": "user",
 *         "display_name": "Sean Conaty",
 *         "uuid": "{504c3b62-8120-4f0c-a7bc-87800b9d6f70}"
 *       },
 *       "repository": {
 *         "type": "repository",
 *         "name": "geordi",
 *         "full_name": "atlassian_tutorial/geordi",
 *         "uuid": "{85d08b4e-571d-44e9-a507-fa476535aa98}"
 *       },
 *       "permission": "write"
 *     }
 *   ],
 *   "page": 1,
 *   "size": 2
 * }
 * ```
 *
 * Results may be further [filtered or sorted](../../../../meta/filtering)
 * by user, or permission by adding the following query string parameters:
 *
 * * `q=permission>"read"`
 * * `sort=user.display_name`
 *
 * Note that the query parameter values need to be URL escaped so that `=`
 * would become `%3D`.
 */
export function getWorkspacesByWorkspacePermissionsRepositoriesAndRepoSlug(
  repoSlug: string,
  workspace: string,
  {
    q,
    sort,
  }: {
    q?: string
    sort?: string
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedRepositoryPermissions
      }
    | {
        status: 403
        data: Error
      }
  >(
    `/workspaces/${workspace}/permissions/repositories/${repoSlug}${QS.query(
      QS.form({
        q,
        sort,
      })
    )}`,
    {
      ...opts,
    }
  )
}

/**
 * Returns the list of projects in this workspace.
 */
export function getWorkspacesByWorkspaceProjects(
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: PaginatedProjects
      }
    | {
        status: 404
        data: Error
      }
  >(`/workspaces/${workspace}/projects`, {
    ...opts,
  })
}
/**
 * Creates a new project.
 *
 * Note that the avatar has to be embedded as either a data-url
 * or a URL to an external image as shown in the examples below:
 *
 * ```
 * $ body=$(cat << EOF
 * {
 *     "name": "Mars Project",
 *     "key": "MARS",
 *     "description": "Software for colonizing mars.",
 *     "links": {
 *         "avatar": {
 *             "href":
 * "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/..."
 *         }
 *     },
 *     "is_private": false
 * }
 * EOF
 * )
 * $ curl -H "Content-Type: application/json" \
 *        -X POST \
 *        -d "$body" \
 *        https://api.bitbucket.org/2.0/teams/teams-in-space/projects/ | jq .
 * {
 *   // Serialized project document
 * }
 * ```
 *
 * or even:
 *
 * ```
 * $ body=$(cat << EOF
 * {
 *     "name": "Mars Project",
 *     "key": "MARS",
 *     "description": "Software for colonizing mars.",
 *     "links": {
 *         "avatar": {
 *             "href": "http://i.imgur.com/72tRx4w.gif"
 *         }
 *     },
 *     "is_private": false
 * }
 * EOF
 * )
 * $ curl -H "Content-Type: application/json" \
 *        -X POST \
 *        -d "$body" \
 *        https://api.bitbucket.org/2.0/teams/teams-in-space/projects/ | jq .
 * {
 *   // Serialized project document
 * }
 * ```
 */
export function postWorkspacesByWorkspaceProjects(
  workspace: string,
  project: Project,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 201
        data: Project
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/workspaces/${workspace}/projects`,
    oazapfts.json({
      ...opts,
      method: "POST",
      body: project,
    })
  )
}
/**
 * Deletes this project. This is an irreversible operation.
 *
 * You cannot delete a project that still contains repositories.
 * To delete the project,
 * [delete](../../../repositories/%7Bworkspace%7D/%7Brepo_slug%7D#delete) or
 * transfer the repositories first.
 *
 * Example:
 * ```
 * $ curl -X DELETE https://api.bitbucket.org/2.0/bbworkspace1/PROJ
 * ```
 */
export function deleteWorkspacesByWorkspaceProjectsAndProjectKey(
  projectKey: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 204
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/workspaces/${workspace}/projects/${projectKey}`, {
    ...opts,
    method: "DELETE",
  })
}
/**
 * Returns the requested project.
 */
export function getWorkspacesByWorkspaceProjectsAndProjectKey(
  projectKey: string,
  workspace: string,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Project
      }
    | {
        status: 401
        data: Error
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(`/workspaces/${workspace}/projects/${projectKey}`, {
    ...opts,
  })
}
/**
 * Since this endpoint can be used to both update and to create a
 * project, the request body depends on the intent.
 *
 * #### Creation
 *
 * See the POST documentation for the project collection for an
 * example of the request body.
 *
 * Note: The `key` should not be specified in the body of request
 * (since it is already present in the URL). The `name` is required,
 * everything else is optional.
 *
 * #### Update
 *
 * See the POST documentation for the project collection for an
 * example of the request body.
 *
 * Note: The key is not required in the body (since it is already in
 * the URL). The key may be specified in the body, if the intent is
 * to change the key itself. In such a scenario, the location of the
 * project is changed and is returned in the `Location` header of the
 * response.
 */
export function putWorkspacesByWorkspaceProjectsAndProjectKey(
  projectKey: string,
  workspace: string,
  project: Project,
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: Project
      }
    | {
        status: 201
        data: Project
      }
    | {
        status: 403
        data: Error
      }
    | {
        status: 404
        data: Error
      }
  >(
    `/workspaces/${workspace}/projects/${projectKey}`,
    oazapfts.json({
      ...opts,
      method: "PUT",
      body: project,
    })
  )
}
export function searchAccount3(
  workspace: string,
  searchQuery: string,
  {
    page,
    pagelen,
  }: {
    page?: number
    pagelen?: number
  } = {},
  opts?: Oazapfts.RequestOpts
) {
  return oazapfts.fetchJson<
    | {
        status: 200
        data: SearchResultPage
      }
    | {
        status: 400
        data: Error
      }
    | {
        status: 404
        data: Error
      }
    | {
        status: 429
        data: Error
      }
  >(
    `/workspaces/${workspace}/search/code${QS.query(
      QS.form({
        search_query: searchQuery,
        page,
        pagelen,
      })
    )}`,
    {
      ...opts,
    }
  )
}
