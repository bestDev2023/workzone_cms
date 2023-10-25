import deepmerge from "deepmerge"

import {DiffStat, Participant, Pullrequest} from "../bitbucket-api"
import {PartialDeep, Primitive} from "type-fest"
import {newUserAccount} from "./sample"
import {
  GroupReviewer,
  NamedReviewer,
  PartialDiffStat,
  PullRequest,
  PullRequestMergeCheckResult,
  PullRequestSettingsEntry,
  Quota,
  QuotaResult,
  ReviewGroup,
  ReviewMergeCheckResult,
  ReviewSpec,
  UserReviewer,
  UUID,
} from "../shared/models"
import {GroupMember, MergeRestrictions} from "@/bitbucket-api/internal"
import {fail} from "../shared/fail"

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function newUuid(): UUID {
  // no need to be real uuid
  const end = getRandomInt(111111111111, 999999999999)
  return `{11111111-2222-3333-4444-${end}}`
}

function sampleBuilder<T>(defaults: T): (
  // Using Partial instead of PartialDeep seems to provide more accurate type
  overrides?: Partial<T>,
  mergeOptions?: MergeOptions
) => Readonly<T> {
  return function newSample(
    overrides?: Partial<T>,
    mergeOptions?: MergeOptions
  ): Readonly<T> {
    return mergeWith(defaults, <PartialDeep<T>>overrides, mergeOptions)
  }
}

export const newParticipant = sampleBuilder<Participant>({
  participated_on: "2021-07-22T03:20:41.181380+00:00",
  /* state: null,*/
  role: "PARTICIPANT",
  user: newUserAccount(),
  type: "participant",
  approved: false,
})

export const newUserReviewer = sampleBuilder<UserReviewer>({
  type: "user",
  id: newUuid(),
})

export const newGroupReviewer = sampleBuilder<GroupReviewer>({
  type: "group",
  id: "group-id",
})

export const newPullRequestMergeCheckResult =
  sampleBuilder<PullRequestMergeCheckResult>({
    checkResults: [],
    settingId: newUuid(),
    isAutoMerge: false,
  })

export const newPullrequest = sampleBuilder<PullRequest>({
  rendered: {
    description: {
      raw: "",
      markup: "markdown",
      html: "" /* type: "rendered"*/,
    },
    title: {
      raw: "new title value 2",
      markup: "markdown",
      html: "<p>new title value 2</p>",
      /* type: "rendered",*/
    },
  },
  type: "pullrequest",
  description: "",
  links: {
    decline: {
      href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest/pullrequests/1/decline",
    },
    diffstat: {
      href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest/diffstat/r-e-n-a-t-o/myrepotest:5d92a17b2c22%0D28dfe571143a?from_pullrequest_id=1",
    },
    commits: {
      href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest/pullrequests/1/commits",
    },
    self: {
      href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest/pullrequests/1",
    },
    comments: {
      href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest/pullrequests/1/comments",
    },
    merge: {
      href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest/pullrequests/1/merge",
    },
    html: {
      href: "https://bitbucket.org/r-e-n-a-t-o/myrepotest/pull-requests/1",
    },
    activity: {
      href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest/pullrequests/1/activity",
    },
    /* "request-changes": {
        href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest/pullrequests/1/request-changes",
      },*/
    diff: {
      href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest/diff/r-e-n-a-t-o/myrepotest:5d92a17b2c22%0D28dfe571143a?from_pullrequest_id=1",
    },
    approve: {
      href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest/pullrequests/1/approve",
    },
    /* statuses: {
        href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest/pullrequests/1/statuses",
      },*/
  },
  title: "new title value 2",
  close_source_branch: false,
  reviewers: [
    {
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
  ],
  id: 1,
  destination: {
    commit: {
      hash: "28dfe571143a",
      // type: "commit",
      /* links: {
          self: {
            href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest/commit/28dfe571143a",
          },
          html: {
            href: "https://bitbucket.org/r-e-n-a-t-o/myrepotest/commits/28dfe571143a",
          },
        },*/
    },
    repository: {
      links: {
        self: {
          href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest",
        },
        html: {href: "https://bitbucket.org/r-e-n-a-t-o/myrepotest"},
        avatar: {
          href: "https://bytebucket.org/ravatar/%7B18638928-bbb6-445c-856f-7886ffd3db08%7D?ts=default",
        },
      },
      type: "repository",
      name: "myrepotest",
      full_name: "r-e-n-a-t-o/myrepotest",
      uuid: "{18638928-bbb6-445c-856f-7886ffd3db08}",
    },
    branch: {name: "master"},
  },
  created_on: "2021-06-16T04:26:38.290237+00:00",
  summary: {raw: "", markup: "markdown", html: "" /* type: "rendered"*/},
  source: {
    commit: {
      hash: "5d92a17b2c22",
      /* type: "commit",
        links: {
          self: {
            href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest/commit/5d92a17b2c22",
          },
          html: {
            href: "https://bitbucket.org/r-e-n-a-t-o/myrepotest/commits/5d92a17b2c22",
          },
        },*/
    },
    repository: {
      links: {
        self: {
          href: "https://api.bitbucket.org/2.0/repositories/r-e-n-a-t-o/myrepotest",
        },
        html: {href: "https://bitbucket.org/r-e-n-a-t-o/myrepotest"},
        avatar: {
          href: "https://bytebucket.org/ravatar/%7B18638928-bbb6-445c-856f-7886ffd3db08%7D?ts=default",
        },
      },
      type: "repository",
      name: "myrepotest",
      full_name: "r-e-n-a-t-o/myrepotest",
      uuid: "{18638928-bbb6-445c-856f-7886ffd3db08}",
    },
    branch: {name: "my_branch"},
  },
  comment_count: 1,
  state: "OPEN",
  task_count: 0,
  participants: [
    {
      participated_on: "2021-07-22T03:20:41.181380+00:00",
      /* state: null,*/
      role: "PARTICIPANT",
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
      type: "participant",
      approved: false,
    },
    {
      /* participated_on: null,*/
      /* state: null,*/
      role: "REVIEWER",
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
      type: "participant",
      approved: false,
    },
  ],
  reason: "",
  updated_on: "2021-08-12T05:10:15.475734+00:00",
  author: {
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
  /* merge_commit: null,*/
  /* closed_by: null,*/
})

export const newPullRequestSettingsEntry =
  sampleBuilder<PullRequestSettingsEntry>({
    id: newUuid(),
    autoMerge: false,
    deleteSourceBranch: false,
    standard: {
      settings: {
        shouldResetChanges: true,
        shouldResetApprovals: true,
      },
      checks: {
        noChangesRequested: true,
        noUnresolvedTasks: true,
        successfulBuilds: 1,
      },
    },
  })

export const newMergeRestrictions = (isPassing: boolean) =>
  sampleBuilder<MergeRestrictions>({
    restrictions: {
      resolved_tasks: {
        count: null,
        errors: [],
        name: "Resolved Tasks",
        label: "Resolved pull request tasks",
        allow_merge: true,
        key: "resolved_tasks",
        pass: isPassing,
      },
      minimum_successful_builds: {
        count: 1,
        errors: [],
        name: "Minimum Successful Builds",
        label: "1 successful build on last commit",
        allow_merge: true,
        key: "minimum_successful_builds",
        pass: isPassing,
      },
      minimum_default_reviewer_approvals: {
        count: 1,
        errors: [],
        name: "Minimum Default Reviewer Approvals",
        label: "At least 1 approval from default reviewers",
        allow_merge: true,
        key: "minimum_default_reviewer_approvals",
        pass: isPassing,
      },
      maximum_commits_behind: {
        count: null,
        errors: [],
        name: "Maximum Commits Behind",
        label: null,
        allow_merge: true,
        key: "maximum_commits_behind",
        pass: isPassing,
      },
      no_changes_requested: {
        count: null,
        errors: [],
        name: "No Changes Requested",
        label: "No changes requested",
        allow_merge: true,
        key: "no_changes_requested",
        pass: isPassing,
      },
      pr_deps_merged: {
        count: null,
        errors: [],
        name: "Pr Deps Merged",
        label: null,
        allow_merge: true,
        key: "pr_deps_merged",
        pass: isPassing,
      },
      minimum_approvals: {
        count: 1,
        errors: [],
        name: "Minimum Approvals",
        label: "At least 1 approval",
        allow_merge: true,
        key: "minimum_approvals",
        pass: isPassing,
      },
      failed_builds: {
        count: null,
        errors: [],
        name: "Failed Builds",
        label: "No failed builds on last commit",
        allow_merge: true,
        key: "failed_builds",
        pass: isPassing,
      },
    },
  })

interface MergeOptions {
  combineArray: boolean
}

function mergeWith<T>(
  target: T,
  overrides?: PartialDeep<T>,
  options: MergeOptions = {combineArray: false}
): T {
  const deepmergeOptions: deepmerge.Options = options.combineArray
    ? {}
    : {arrayMerge: (destinationArray, sourceArray) => sourceArray}
  return overrides
    ? <T>deepmerge(target, <Partial<T>>overrides, deepmergeOptions)
    : target
}

export const withApprovals = (users: Array<GroupMember>): Array<Participant> =>
  users.map(_ => newParticipant({user: _, approved: true}))

// TODO render different avatars
export const REVIEWERS = {
  A: {
    ...newUserReviewer({
      id: "user-A",
    }),
    name: "User A",
  },
  B: {
    ...newUserReviewer({
      id: "user-B",
    }),
    name: "User B",
  },
  C: {
    ...newUserReviewer({
      id: "user-C",
    }),
    name: "User C",
  },
  D: {
    ...newUserReviewer({
      id: "user-D",
    }),
    name: "User D",
  },
  E: newUserReviewer({
    id: "user-E",
  }),
  GROUP_1: {...newGroupReviewer({id: "group-1"}), name: "Group 1"},
  GROUP_2: {...newGroupReviewer({id: "group-2"}), name: "Group 2"},
}

export const USERS = {
  A: newUserAccount({
    uuid: REVIEWERS.A.id,
  }),
  B: newUserAccount({
    uuid: REVIEWERS.B.id,
  }),
  C: newUserAccount({
    uuid: REVIEWERS.C.id,
  }),
  D: newUserAccount({
    uuid: REVIEWERS.D.id,
  }),
  E: newUserAccount({
    uuid: REVIEWERS.E.id,
  }),
}

export const newReviewGroup = sampleBuilder<ReviewGroup>({
  quota: Quota.PCT_100,
  approvalMethod: "STANDARD",
  reviewers: [REVIEWERS.A],
  requireSuccessfulBuilds: 0,
})

export const newReviewSpec = sampleBuilder<ReviewSpec>({
  ignoreCommitterApprovals: false,
  reviewGroups: [newReviewGroup()],
})

export const newReviewGroupWithNames = sampleBuilder<
  ReviewGroup<NamedReviewer>
>({
  quota: Quota.PCT_100,
  approvalMethod: "STANDARD",
  reviewers: [REVIEWERS.A],
  requireSuccessfulBuilds: 0,
})

export function newReviewerCheckResultFor(
  reviewGroups: Array<ReviewGroup<NamedReviewer>>,
  approvals: Array<string>,
  groupMap?: Record<string, Array<GroupMember>>
): Array<ReviewMergeCheckResult> {
  return reviewGroups.map(reviewGroup => {
    const reviewStatus = reviewGroup.reviewers.flatMap(reviewer => {
      const groupMembers = () =>
        groupMap?.[reviewer.id] ??
        fail(`Group members not provided for ${reviewer.id}`)

      const participants =
        reviewer.type === "group"
          ? groupMembers()
          : [newUserAccount({uuid: reviewer.id})]

      return participants.map(participant => ({
        isApproved: approvals.includes(participant.uuid),
        participant,
      }))
    })

    const quota = new QuotaResult(
      reviewGroup.quota,
      reviewStatus.length,
      reviewStatus.filter(_ => _.isApproved).length
    )

    return <ReviewMergeCheckResult>{
      type: "review-merge-check",
      description: "",
      status: quota.isMet ? "PASSED" : "PENDING",
      reviewStatus,
      reviewGroup,
      quota,
    }
  })
}

// export const newDiffStats = () =>
//   sampleBuilder<Array<DiffStat>>({[]})
