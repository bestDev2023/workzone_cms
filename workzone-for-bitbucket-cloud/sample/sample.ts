import {GroupMember} from "@/bitbucket-api/internal"

// https://developer.atlassian.com/bitbucket/api/2/reference/meta/pagination
interface Paginated<T> {
  size: number
  page: number
  pagelen: number
  next?: string
  previous?: string
  values: Array<T>
}

export function paginated<T>(values: Array<T>): Paginated<T> {
  return {
    size: values.length,
    page: 1,
    pagelen: 1,
    values,
  }
}

// GroupMember is Account but with some additional properties
export function newUserAccount(overrides?: Partial<GroupMember>): GroupMember {
  return {
    ...{
      display_name: "Renato Izymes",
      uuid: "{1f2b1343-7d1f-4e94-acce-9ad94771765f}",
      links: {
        self: {
          href: "https://bitbucket.org/!api/2.0/users/%7B1f2b1343-7d1f-4e94-acce-9ad94771765f%7D",
        },
        html: {
          href: "https://bitbucket.org/%7B1f2b1343-7d1f-4e94-acce-9ad94771765f%7D/",
        },
        avatar: {
          href: "data:image/png;base64,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",
        },
      },
      nickname: "Renato Izymes",
      is_active: true,
      type: "user",
      account_id: "60b8730d13c0e90069f00918",
    },
    ...overrides,
  }
}
