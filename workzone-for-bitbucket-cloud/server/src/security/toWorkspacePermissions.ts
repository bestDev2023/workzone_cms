import {filter, groupBy, mapValues, pipe} from "remeda"

import {WorkspaceMembership} from "bitbucket-api"

export function toWorkspacePermissions(
  userUuid: string,
  workspaceMemberships: Array<WorkspaceMembership>
): Record<string, Array<string>> {
  return pipe(
    workspaceMemberships,
    filter(_ => _.user?.uuid === userUuid),
    groupBy(_ => _.workspace?.slug ?? ""),
    mapValues(_ => _.map(x => x["permission"]))
  )
}
