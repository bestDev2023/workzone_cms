import {WorkspaceMembership} from "bitbucket-api"
import {toWorkspacePermissions} from "@/security/toWorkspacePermissions"
import {assertEqual} from "@/test/assertMatches"

describe("toWorkspacePermissions", () => {
  it("simple permissions", async () => {
    const permissions = toWorkspacePermissions(
      "{470c176d-3574-44ea-bb41-89e8638bcca4}",
      workspaceMemberships
    )
    assertEqual(permissions, {
      bbworkspace1: ["owner"],
    })
  })
})

const workspaceMemberships: Array<WorkspaceMembership> = [
  {
    permission: "owner",
    type: "workspace_membership",
    user: {
      type: "user",
      uuid: "{470c176d-3574-44ea-bb41-89e8638bcca4}",
      display_name: "Erik van Zijst",
    },
    workspace: {
      type: "workspace",
      uuid: "{a15fb181-db1f-48f7-b41f-e1eff06929d6}",
      slug: "bbworkspace1",
      name: "Atlassian Bitbucket",
    },
  },
  {
    permission: "member",
    type: "workspace_membership",
    user: {
      type: "user",
      nickname: "seanaty",
      display_name: "Sean Conaty",
      uuid: "{504c3b62-8120-4f0c-a7bc-87800b9d6f70}",
    },
    workspace: {
      type: "workspace",
      uuid: "{a15fb181-db1f-48f7-b41f-e1eff06929d6}",
      slug: "bbworkspace1",
      name: "Atlassian Bitbucket",
    },
  },
]
