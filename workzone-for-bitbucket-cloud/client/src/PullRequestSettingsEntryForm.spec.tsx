import fetchMock from "fetch-mock"

import {render} from "./test/render"
import {PullRequestSettingsEntryForm} from "./PullRequestSettingsEntryForm"

function renderView() {
  return render(<PullRequestSettingsEntryForm />)
}

describe("<PullRequestSettingsEntryForm>", () => {
  before(() => {})

  it("no check results", async () => {
    fetchMock.get("glob:*/2.0/workspaces/r-e-n-a-t-o/members", {body: x})
    fetchMock.get("glob:*/!api/internal/workspaces/r-e-n-a-t-o/groups", {
      body: groups,
    })
    const view = renderView()
    //await view.findByText("Merge")
  })
})

const x = {
  pagelen: 50,
  values: [
    {
      links: {
        self: {
          href: "https://api.bitbucket.org/2.0/workspaces/r-e-n-a-t-o/members/%7B9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430%7D",
        },
      },
      type: "workspace_membership",
      user: {
        display_name: "Renato Garcia",
        uuid: "{9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430}",
        links: {
          self: {
            href: "https://api.bitbucket.org/2.0/users/%7B9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430%7D",
          },
          html: {
            href: "https://bitbucket.org/%7B9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430%7D/",
          },
          avatar: {
            href: "https://secure.gravatar.com/avatar/1df9051b4c581c1c5c3067bb7137bf72?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FRG-3.png",
          },
        },
        type: "user",
        nickname: "Renato Garcia",
        account_id: "5b28d0104bcba343d8496401",
      },
      workspace: {
        slug: "r-e-n-a-t-o",
        type: "workspace",
        name: "Renato Garcia",
        links: {
          self: {
            href: "https://api.bitbucket.org/2.0/workspaces/r-e-n-a-t-o",
          },
          html: {href: "https://bitbucket.org/r-e-n-a-t-o/"},
          avatar: {
            href: "https://bitbucket.org/workspaces/r-e-n-a-t-o/avatar/?ts=1574073979",
          },
        },
        uuid: "{9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430}",
      },
    },
    {
      links: {
        self: {
          href: "https://api.bitbucket.org/2.0/workspaces/r-e-n-a-t-o/members/%7B1c4ca386-ee90-465c-abc6-52f4a84b414e%7D",
        },
      },
      type: "workspace_membership",
      user: {
        display_name: "Workzone",
        uuid: "{1c4ca386-ee90-465c-abc6-52f4a84b414e}",
        links: {
          self: {
            href: "https://api.bitbucket.org/2.0/users/%7B1c4ca386-ee90-465c-abc6-52f4a84b414e%7D",
          },
          html: {
            href: "https://bitbucket.org/%7B1c4ca386-ee90-465c-abc6-52f4a84b414e%7D/",
          },
          avatar: {
            href: "https://secure.gravatar.com/avatar/5e50d4cd11181f83373738811cae08d4?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FW-3.png",
          },
        },
        type: "user",
        nickname: "Workzone (Bot account)",
        account_id: "61023188e6e6f80071afa86c",
      },
      workspace: {
        slug: "r-e-n-a-t-o",
        type: "workspace",
        name: "Renato Garcia",
        links: {
          self: {
            href: "https://api.bitbucket.org/2.0/workspaces/r-e-n-a-t-o",
          },
          html: {href: "https://bitbucket.org/r-e-n-a-t-o/"},
          avatar: {
            href: "https://bitbucket.org/workspaces/r-e-n-a-t-o/avatar/?ts=1574073979",
          },
        },
        uuid: "{9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430}",
      },
    },
    {
      links: {
        self: {
          href: "https://api.bitbucket.org/2.0/workspaces/r-e-n-a-t-o/members/%7B1f2b1343-7d1f-4e94-acce-9ad94771765f%7D",
        },
      },
      type: "workspace_membership",
      user: {
        display_name: "Renato Izymes",
        uuid: "{1f2b1343-7d1f-4e94-acce-9ad94771765f}",
        links: {
          self: {
            href: "https://api.bitbucket.org/2.0/users/%7B1f2b1343-7d1f-4e94-acce-9ad94771765f%7D",
          },
          html: {
            href: "https://bitbucket.org/%7B1f2b1343-7d1f-4e94-acce-9ad94771765f%7D/",
          },
          avatar: {
            href: "https://secure.gravatar.com/avatar/2f78d9a657770a3d243de5f525892ffb?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FRI-4.png",
          },
        },
        type: "user",
        nickname: "Renato Izymes",
        account_id: "60b8730d13c0e90069f00918",
      },
      workspace: {
        slug: "r-e-n-a-t-o",
        type: "workspace",
        name: "Renato Garcia",
        links: {
          self: {
            href: "https://api.bitbucket.org/2.0/workspaces/r-e-n-a-t-o",
          },
          html: {href: "https://bitbucket.org/r-e-n-a-t-o/"},
          avatar: {
            href: "https://bitbucket.org/workspaces/r-e-n-a-t-o/avatar/?ts=1574073979",
          },
        },
        uuid: "{9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430}",
      },
    },
  ],
  page: 1,
  size: 3,
}

const groups = {
  pagelen: 20,
  values: [
    {
      default_permission: "write",
      name: "Documentation reviewers",
      links: {
        self: {
          href: "https://bitbucket.org/!api/1.0/groups/r-e-n-a-t-o/documentation-reviewers",
        },
        html: {
          href: "https://bitbucket.org/r-e-n-a-t-o/workspace/settings/groups/documentation-reviewers",
        },
      },
      extra: {repository_count: 0, members_count: 1},
      email_forwarding_disabled: true,
      full_slug: "r-e-n-a-t-o:documentation-reviewers",
      account_privilege: null,
      workspace: {
        slug: "r-e-n-a-t-o",
        type: "workspace",
        name: "Renato Garcia",
        links: {
          self: {
            href: "https://bitbucket.org/!api/2.0/workspaces/r-e-n-a-t-o",
          },
          html: {href: "https://bitbucket.org/r-e-n-a-t-o/"},
          avatar: {
            href: "https://bitbucket.org/workspaces/r-e-n-a-t-o/avatar/?ts=1574073979",
          },
        },
        uuid: "{9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430}",
      },
      owner: {
        display_name: "Renato Garcia",
        uuid: "{9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430}",
        links: {
          self: {
            href: "https://bitbucket.org/!api/2.0/users/%7B9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430%7D",
          },
          html: {
            href: "https://bitbucket.org/%7B9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430%7D/",
          },
          avatar: {
            href: "https://secure.gravatar.com/avatar/1df9051b4c581c1c5c3067bb7137bf72?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FRG-3.png",
          },
        },
        type: "user",
        nickname: "Renato Garcia",
        account_id: "5b28d0104bcba343d8496401",
      },
      type: "group",
      slug: "documentation-reviewers",
    },
    {
      default_permission: "write",
      name: "Team Reviewers",
      links: {
        self: {
          href: "https://bitbucket.org/!api/1.0/groups/r-e-n-a-t-o/team-reviewers",
        },
        html: {
          href: "https://bitbucket.org/r-e-n-a-t-o/workspace/settings/groups/team-reviewers",
        },
      },
      extra: {repository_count: 0, members_count: 3},
      email_forwarding_disabled: false,
      full_slug: "r-e-n-a-t-o:team-reviewers",
      account_privilege: "admin",
      workspace: {
        slug: "r-e-n-a-t-o",
        type: "workspace",
        name: "Renato Garcia",
        links: {
          self: {
            href: "https://bitbucket.org/!api/2.0/workspaces/r-e-n-a-t-o",
          },
          html: {href: "https://bitbucket.org/r-e-n-a-t-o/"},
          avatar: {
            href: "https://bitbucket.org/workspaces/r-e-n-a-t-o/avatar/?ts=1574073979",
          },
        },
        uuid: "{9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430}",
      },
      owner: {
        display_name: "Renato Garcia",
        uuid: "{9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430}",
        links: {
          self: {
            href: "https://bitbucket.org/!api/2.0/users/%7B9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430%7D",
          },
          html: {
            href: "https://bitbucket.org/%7B9e70c1d9-e1fa-4b79-bc41-0a1b6ad01430%7D/",
          },
          avatar: {
            href: "https://secure.gravatar.com/avatar/1df9051b4c581c1c5c3067bb7137bf72?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FRG-3.png",
          },
        },
        type: "user",
        nickname: "Renato Garcia",
        account_id: "5b28d0104bcba343d8496401",
      },
      type: "group",
      slug: "team-reviewers",
    },
  ],
  page: 1,
  size: 2,
}
