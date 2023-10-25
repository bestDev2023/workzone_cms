import {AsyncLocalStorage} from "node:async_hooks"

import {ClientInfo} from "atlassian-connect-express"
import {ok} from "oazapfts"
import {SetRequired} from "type-fest"

import {Credential, UUID} from "@shared/models"
import {
  getUser,
  getWorkspacesByWorkspacePermissions,
  User,
  WorkspaceMembership,
} from "bitbucket-api"
import {fail, SecurityError} from "@shared/fail"
import {toWorkspacePermissions} from "@/security/toWorkspacePermissions"
import {AS_APP_USER, AS_LOGGED_IN_USER} from "@/httpClient"
import {f, logger} from "@/logger"
import {__getSurrogate} from "@/settings/surrogate"
import {map} from "@/utils/promise"

type AuthenticatedUser = SetRequired<User, "uuid" | "username">

const WORKSPACE_USER_TYPE = "team"

class Context {
  private _workzoneUserCredentials: Promise<Credential | undefined> | undefined
  private _clientInfo: Promise<ClientInfo> | undefined
  private _user: Promise<User> | undefined
  private _workspacePermissions: Promise<Array<WorkspaceMembership>> | undefined

  constructor(
    readonly addOnKey: string,
    readonly clientKey: string,
    private readonly clientInfoProvider: () => Promise<ClientInfo>,
    readonly userAuth: typeof AS_APP_USER | typeof AS_LOGGED_IN_USER,
    readonly bearerToken?: string
  ) {}

  get workzoneUserCredentials(): Promise<Credential | undefined> {
    if (!this._workzoneUserCredentials) {
      this._workzoneUserCredentials = __getSurrogate()
    }

    return this._workzoneUserCredentials
  }

  get addOnUserId(): Promise<UUID> {
    return this.clientInfo().then(clientInfo => {
      const withUser = <{principal: {uuid: UUID}}>(<unknown>clientInfo)
      return withUser.principal.uuid
    })
  }

  get sharedSecret(): Promise<string> {
    return this.clientInfo().then(clientInfo => clientInfo.sharedSecret)
  }

  async loggedInUser(): Promise<AuthenticatedUser> {
    if (this._user == null) {
      this._user = ok(getUser({headers: this.userAuth}))
    }

    return <Promise<AuthenticatedUser>>this._user
  }

  async getPermissions(workspace: string): Promise<Permissions> {
    // getUserPermissionsWorkspaces Fail with "This API is currently disabled
    // for Connect applications" therefore the alternative is get all member's
    // workspace permissions as the app and select based on who is logged in.
    if (this._workspacePermissions == null) {
      this._workspacePermissions = map(
        ok(getWorkspacesByWorkspacePermissions(workspace)),
        _ => _.values ?? []
      )
    }

    const user = await this.loggedInUser()
    // TODO WBBC-10: it may not be necessary to fetch workspace 'member'
    //  permissions if the user is the workspace itself (via webhook)
    const workspaceMemberships: Array<WorkspaceMembership> = await this
      ._workspacePermissions
    if (user.type === WORKSPACE_USER_TYPE) {
      // this is a workspace user (via webhook), not a logged in user
      const workspaceUserPermissionAsOwner = {
        permission: "owner",
        user,
        workspace: {
          slug: workspace,
          type: "workspace",
        },
        type: WORKSPACE_USER_TYPE,
      }
      logger.debug(
        f`user.type == team (Workspace user). Adding workspace user permission as owner ${workspaceUserPermissionAsOwner}`
      )
      workspaceMemberships.push(workspaceUserPermissionAsOwner)
    }

    return new Permissions(
      toWorkspacePermissions(user.uuid, workspaceMemberships)
    )
  }

  private async clientInfo() {
    if (!this._clientInfo) {
      this._clientInfo = this.clientInfoProvider()
    }

    return this._clientInfo
  }
}

const asyncLocalStorage = new AsyncLocalStorage<Context>()
let mockedContext: Context | undefined

// Should be used by tests
// export function mockContext(contextMock: Partial<Context>): void {
//   mockedContext = <Context>contextMock
// }

export function context(): Context {
  return (
    asyncLocalStorage.getStore() ??
    mockedContext ??
    fail("App Context not available")
  )
}

export function runWithContext(
  callback: () => unknown,
  addOnKey: string,
  clientKey: string,
  clientInfoProvider: () => Promise<ClientInfo>,
  userAuth: typeof AS_APP_USER | typeof AS_LOGGED_IN_USER,
  bearerToken?: string
): unknown {
  const ctx: Context = new Context(
    addOnKey,
    clientKey,
    clientInfoProvider,
    userAuth,
    bearerToken
  )
  return asyncLocalStorage.run(ctx, callback)
}

class Permissions {
  constructor(private readonly permissions: Record<string, Array<string>>) {}

  assert(resource: string, permission: string): void {
    if (!this.has(resource, permission)) {
      throw new SecurityError(
        `User does not have permission '${permission}' on resource '${resource}'`
      )
    }
  }

  has(resource: string, permission: string): boolean {
    logger.debug(
      f`require ${resource} permission ${permission} - available permissions ${this.permissions} `
    )

    return (
      this.permissions[resource]?.some(
        _ =>
          PERMISSIONS_HIERARCHY.indexOf(_) >=
          PERMISSIONS_HIERARCHY.indexOf(permission)
      ) ?? false
    )
  }
}

export type WorkspacePermission = "owner" | "member"

const PERMISSIONS_HIERARCHY: Array<string> = [
  "member", // lowest permission level
  "collaborator",
  "owner", // highest permission level
]

export async function assertWorkspacePermission(
  workspace: string,
  permission: WorkspacePermission
): Promise<void> {
  const permissions = await context().getPermissions(workspace)
  permissions.assert(workspace, permission)
}
