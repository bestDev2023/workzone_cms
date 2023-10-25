import * as td from "testdouble"
import {TestDouble} from "testdouble"
import {Test} from "mocha"
import {forEachObj} from "remeda"
import {capitalCase} from "change-case"
import {HttpError} from "oazapfts"

import {fail} from "@shared/fail"
import {getGroupMembers, GroupMember, UserGroup} from "@/bitbucket-api/internal"
import {
  GroupReviewer,
  Quota,
  QuotaResult,
  ReviewMergeCheckResult,
  ReviewSpec,
} from "@shared/models"
import {f, logger} from "@/logger"
import {assertMatches} from "@/test/assertMatches"
import {
  newParticipant,
  newPullrequest,
  newReviewGroup,
  newReviewSpec,
  REVIEWERS,
  USERS,
  withApprovals,
} from "@sample/ReviewerSpec.sample"
import {newUserAccount, paginated} from "@sample/sample"

import {resolveUser, ReviewMergeChecker} from "./ReviewMergeChecker"

function assertPassing(result: QuotaResult | undefined, required?: number) {
  if (result === undefined) {
    assert.fail(result)
  }

  assertMatches(result, {
    pending: 0,
    isMet: true,
    total: result.approved,
    approved: result.required,
    required: required ?? result.required,
  })
}

function assertPending(result: QuotaResult | undefined, pending: number) {
  if (result === undefined) {
    assert.fail(result)
  }

  assertMatches(result, {
    pending,
    isMet: false,
    total: result.approved + pending,
    approved: result.total - result.pending,
  })
}

function hasReviewerInStatus(
  groupMember: GroupMember,
  reviewMergeCheckResults: Array<ReviewMergeCheckResult>
) {
  return reviewMergeCheckResults.some(_ =>
    _.reviewStatus.some(status => status.participant.uuid === groupMember.uuid)
  )
}

// TODO test reviewer with declined

describe("ReviewMergeChecker", () => {
  let getGroupMembersMock: TestDouble<typeof getGroupMembers> | null

  afterEach(async function (this: Mocha.Context) {
    const currentTest = <Test>this.currentTest
    if (currentTest.isFailed() && getGroupMembersMock) {
      logger.error(f`${td.explain(getGroupMembersMock).description}`)
    }
    getGroupMembersMock = null
  })

  const whenGetGroupMembers = function (
    mergeChecker: ReviewMergeChecker,
    group: GroupReviewer,
    members: Array<GroupMember>
  ) {
    getGroupMembersMock =
      getGroupMembersMock ?? td.func(mergeChecker._getGroupMembers)

    mergeChecker._getGroupMembers = td
      .when(getGroupMembersMock(td.matchers.anything(), group.id))
      .thenResolve(paginated(members))

    mergeChecker._getGroup = async (workspace, groupSlug) =>
      <UserGroup>{name: capitalCase(groupSlug)}
  }

  forEachObj(USERS, user => {
    const name = capitalCase(user.uuid)
    user.display_name = name
    user.nickname = name
  })

  const NO_REVIEWERS_PR = newPullrequest({participants: []})

  function mergeCheckerSubject(reviewSpec: ReviewSpec) {
    const mergeChecker = new ReviewMergeChecker(reviewSpec)

    mergeChecker._getWorkspacesByWorkspaceMembersAndMember = async (
      member: string
    ) => {
      const user =
        Object.values(USERS).find(_ => _.uuid === member) ??
        fail(new HttpError(404, "User not found"))

      return {
        status: 200,
        data: {
          type: "workspace_membership",
          user,
        },
      }
    }

    return mergeChecker
  }

  it("resolveGroupToUsers", async () => {
    const users = await resolveUser(
      "r-e-n-a-t-o",
      {
        id: "documentation-reviewers",
        type: "group",
      },
      async () =>
        paginated(<Array<GroupMember>>[
          newUserAccount({uuid: "1"}),
          newUserAccount({uuid: "2"}),
        ])
    )

    assert.deepEqual(users, ["1", "2"])
  })

  it("does not trigger the check if the author is the only reviewer", async () => {
    const reviewSpec = newReviewSpec({
      reviewGroups: [newReviewGroup({reviewers: [REVIEWERS.A]})],
    })

    const pr = newPullrequest({author: USERS.A})

    const mergeChecker = mergeCheckerSubject(reviewSpec)

    const result = await mergeChecker.perform(pr)

    assert(result.length === 0)
  })

  it("ignores author as a user reviewer", async () => {
    const reviewSpec = newReviewSpec({
      reviewGroups: [newReviewGroup({reviewers: [REVIEWERS.A, REVIEWERS.B]})],
    })

    const pr = newPullrequest({
      author: USERS.A,
      participants: withApprovals([USERS.B]),
    })

    const mergeChecker = mergeCheckerSubject(reviewSpec)

    const result = await mergeChecker.perform(pr)

    assertMatches(result[0], {
      status: "PASSED",
    })
  })

  it("ignores author as a user in a group reviewer", async () => {
    const reviewSpec = newReviewSpec({
      reviewGroups: [newReviewGroup({reviewers: [REVIEWERS.GROUP_1]})],
    })

    const pr = newPullrequest({author: USERS.A})
    const mergeChecker = mergeCheckerSubject(reviewSpec)
    whenGetGroupMembers(mergeChecker, REVIEWERS.GROUP_1, [USERS.B, USERS.A])

    const result = await mergeChecker.perform(pr)

    assertMatches(result[0], {status: "PENDING"})
  })

  describe("user reviewer", () => {
    it("is pending", async () => {
      const reviewSpec = newReviewSpec({
        reviewGroups: [newReviewGroup({reviewers: [REVIEWERS.A]})],
      })

      const mergeChecker = mergeCheckerSubject(reviewSpec)

      const result = await mergeChecker.perform(NO_REVIEWERS_PR)

      assertMatches(result[0], {status: "PENDING"})
    })

    describe("single user", async () => {
      const quotas = [
        new Quota(1, "ABSOLUTE"),
        new Quota(100, "PERCENT"),
        // TODO new Quota(1, "PERCENT"),
      ]

      for (const quota of quotas) {
        const reviewSpec = newReviewSpec({
          reviewGroups: [
            newReviewGroup({
              reviewers: [REVIEWERS.A],
              quota,
            }),
          ],
        })

        const mergeChecker = mergeCheckerSubject(reviewSpec)

        describe(`Quota - ${quota.toString()}`, async () => {
          it("is pending", async () => {
            const result = (await mergeChecker.perform(NO_REVIEWERS_PR))[0]

            assertMatches(result, {status: "PENDING"})
            assertPending(result?.quota, 1)
          })

          it("is passing", async () => {
            const pr = newPullrequest({
              participants: withApprovals([USERS.A]),
            })
            const result = (await mergeChecker.perform(pr))[0]

            assertMatches(result, {status: "PASSED"})
            assertPassing(result?.quota)
          })
        })
      }
    })

    it("is pending - multiple users", async () => {
      const reviewSpec = newReviewSpec({
        reviewGroups: [
          newReviewGroup({
            reviewers: [REVIEWERS.A, REVIEWERS.B],
            quota: new Quota(60, "PERCENT"),
          }),
        ],
      })

      const mergeChecker = mergeCheckerSubject(reviewSpec)
      const pr = newPullrequest({
        participants: [
          newParticipant({
            approved: true,
            user: newUserAccount({uuid: REVIEWERS.B.id}),
          }),
        ],
      })
      const result = await mergeChecker.perform(pr)

      assertMatches(result[0], {status: "PENDING"})
    })

    it("is passing - multiple users", async () => {
      const reviewSpec = newReviewSpec({
        reviewGroups: [newReviewGroup({reviewers: [REVIEWERS.A, REVIEWERS.B]})],
      })

      const participants = reviewSpec.reviewGroups.flatMap(reviewGroup =>
        reviewGroup.reviewers.map(reviewer =>
          newParticipant({
            approved: true,
            user: newUserAccount({uuid: reviewer.id}),
          })
        )
      )

      const pr = newPullrequest({
        participants,
      })

      const mergeChecker = mergeCheckerSubject(reviewSpec)

      const result = await mergeChecker.perform(pr)

      assertMatches(result[0], {status: "PASSED"})
    })
  })

  describe("group reviewer", () => {
    it("is pending - single group ", async () => {
      const reviewSpec = newReviewSpec({
        reviewGroups: [newReviewGroup({reviewers: [REVIEWERS.GROUP_1]})],
      })

      const mergeChecker = mergeCheckerSubject(reviewSpec)
      whenGetGroupMembers(mergeChecker, REVIEWERS.GROUP_1, [USERS.B, USERS.A])

      const result = await mergeChecker.perform(NO_REVIEWERS_PR)

      assertMatches(result[0], {status: "PENDING"})
    })

    it("is pending - 2 groups / 1 pending", async () => {
      const reviewSpec = newReviewSpec({
        reviewGroups: [
          newReviewGroup({reviewers: [REVIEWERS.GROUP_1, REVIEWERS.GROUP_2]}),
        ],
      })

      const mergeChecker = mergeCheckerSubject(reviewSpec)
      whenGetGroupMembers(mergeChecker, REVIEWERS.GROUP_1, [USERS.A, USERS.B])
      whenGetGroupMembers(mergeChecker, REVIEWERS.GROUP_2, [USERS.C])

      const pr = newPullrequest({
        participants: [
          newParticipant({
            approved: true,
            user: USERS.C,
          }),
        ],
      })

      const result = await mergeChecker.perform(pr)

      assertMatches(result[0], {status: "PENDING"})
      assert(result[0]?.quota.approved === 1)
    })

    it("is pending - 2 groups / 2 pending", async () => {
      const reviewSpec = newReviewSpec({
        reviewGroups: [
          newReviewGroup({reviewers: [REVIEWERS.GROUP_1, REVIEWERS.GROUP_2]}),
        ],
      })

      const mergeChecker = mergeCheckerSubject(reviewSpec)
      whenGetGroupMembers(mergeChecker, REVIEWERS.GROUP_1, [USERS.A, USERS.B])
      whenGetGroupMembers(mergeChecker, REVIEWERS.GROUP_2, [USERS.C])

      const pr = newPullrequest({
        participants: [
          newParticipant({
            approved: true,
            user: USERS.A,
          }),
        ],
      })

      const result = await mergeChecker.perform(pr)

      assertMatches(result[0], {status: "PENDING"})
      assert(result[0]?.quota.approved === 1)
      assert(result[0]?.quota.pending === 2)
    })

    it("is pending - 1 group / 50% quota", async () => {
      const reviewSpec = newReviewSpec({
        reviewGroups: [
          newReviewGroup({
            quota: {amount: 50, type: "PERCENT"},
            reviewers: [REVIEWERS.GROUP_1],
          }),
        ],
      })

      const mergeChecker = mergeCheckerSubject(reviewSpec)
      whenGetGroupMembers(mergeChecker, REVIEWERS.GROUP_1, [
        USERS.A,
        USERS.B,
        USERS.C,
      ])

      const pr = newPullrequest({
        participants: [
          newParticipant({
            approved: true,
            user: USERS.A,
          }),
        ],
      })

      const result = await mergeChecker.perform(pr)

      assertMatches(result[0], {status: "PENDING"})
      assert(result[0]?.quota.approved === 1)
    })

    it("is passing - 1 group / 25% quota", async () => {
      const reviewSpec = newReviewSpec({
        reviewGroups: [
          newReviewGroup({
            quota: {amount: 25, type: "PERCENT"},
            reviewers: [REVIEWERS.GROUP_1],
          }),
        ],
      })

      const mergeChecker = mergeCheckerSubject(reviewSpec)
      whenGetGroupMembers(mergeChecker, REVIEWERS.GROUP_1, [
        USERS.A,
        USERS.B,
        USERS.C,
      ])

      const pr = newPullrequest({
        participants: [
          newParticipant({
            approved: true,
            user: USERS.A,
          }),
          newParticipant({
            approved: true,
            user: USERS.B,
          }),
        ],
      })

      const result = await mergeChecker.perform(pr)

      assertMatches(result[0], {status: "PASSED"})
      assert(result[0]?.quota.approved === 2)
    })
  })

  describe("mix group and user reviewers, two review groups", () => {
    const reviewSpec = newReviewSpec({
      reviewGroups: [
        newReviewGroup({reviewers: [REVIEWERS.GROUP_1, REVIEWERS.E]}),
        newReviewGroup({reviewers: [REVIEWERS.GROUP_2]}),
      ],
    })

    const mergeChecker = mergeCheckerSubject(reviewSpec)
    beforeEach(() => {
      whenGetGroupMembers(mergeChecker, REVIEWERS.GROUP_1, [USERS.A, USERS.B])
      whenGetGroupMembers(mergeChecker, REVIEWERS.GROUP_2, [USERS.C, USERS.D])
    })

    it("is pending - no approvals", async () => {
      const result = await mergeChecker.perform(NO_REVIEWERS_PR)

      const quotaResult1 = result[0]?.quota

      assertPending(quotaResult1, 3)

      const quotaResult2 = result[1]?.quota

      assertPending(quotaResult2, 2)

      assertMatches(result[0], {status: "PENDING"})
      assertMatches(result[1], {status: "PENDING"})
    })

    it("is passing", async () => {
      const pr = newPullrequest({
        participants: withApprovals([
          USERS.A,
          USERS.B,
          USERS.C,
          USERS.D,
          USERS.E,
        ]),
      })

      const result = await mergeChecker.perform(pr)

      const quotaResult1 = result[0]?.quota
      assertPassing(quotaResult1)

      const quotaResult2 = result[1]?.quota
      assertPassing(quotaResult2)

      assertMatches(result[0], {status: "PASSED"})
      assertMatches(result[1], {status: "PASSED"})
    })

    it("is pending - pending user approval", async () => {
      const pr = newPullrequest({
        participants: withApprovals([USERS.A, USERS.B, USERS.C, USERS.D]),
      })

      const result = await mergeChecker.perform(pr)

      const quotaResult1 = result[0]?.quota
      assertPending(quotaResult1, 1)

      const quotaResult2 = result[1]?.quota
      assertPassing(quotaResult2)

      assertMatches(result[0], {status: "PENDING"})
      assertMatches(result[1], {status: "PASSED"})
    })

    it("is pending - group  approval", async () => {
      const pr = newPullrequest({
        participants: withApprovals([USERS.A, USERS.E, USERS.C]),
      })

      const result = await mergeChecker.perform(pr)

      const quotaResult1 = result[0]?.quota
      assertPending(quotaResult1, 1)

      const quotaResult2 = result[1]?.quota
      assertPending(quotaResult2, 1)

      assertMatches(result[0], {status: "PENDING"})
    })
  })

  it("has the same user as individual reviewer and part of a group", async () => {
    const reviewSpec = newReviewSpec({
      reviewGroups: [
        newReviewGroup({reviewers: [REVIEWERS.GROUP_1, REVIEWERS.E]}),
        newReviewGroup({reviewers: [REVIEWERS.GROUP_2]}),
      ],
    })

    const mergeChecker = mergeCheckerSubject(reviewSpec)

    whenGetGroupMembers(mergeChecker, REVIEWERS.GROUP_1, [
      USERS.A,
      USERS.B,
      USERS.E,
    ])
    whenGetGroupMembers(mergeChecker, REVIEWERS.GROUP_2, [
      USERS.C,
      USERS.D,
      USERS.E,
    ])

    const approvals = withApprovals([USERS.A, USERS.E])

    const pr = newPullrequest({
      participants: approvals,
    })

    const result = await mergeChecker.perform(pr)

    assertMatches(result[0]?.quota, {
      required: 3,
    })
  })

  it("has the same user in two different groups", async () => {
    const reviewSpec = newReviewSpec({
      reviewGroups: [
        newReviewGroup({reviewers: [REVIEWERS.GROUP_1, REVIEWERS.GROUP_2]}),
      ],
    })

    const mergeChecker = mergeCheckerSubject(reviewSpec)

    whenGetGroupMembers(mergeChecker, REVIEWERS.GROUP_1, [USERS.A, USERS.B])
    whenGetGroupMembers(mergeChecker, REVIEWERS.GROUP_2, [USERS.A, USERS.D])

    const approvals = withApprovals([USERS.A, USERS.B])

    const pr = newPullrequest({
      participants: approvals,
    })

    const result = await mergeChecker.perform(pr)

    assertMatches(result[0]?.quota, {
      required: 3,
      total: 3,
      pending: 1,
      approved: 2,
    })
  })

  describe("file pattern", async () => {
    it("triggers review checks on for matching review groups ", async () => {
      const reviewSpec = newReviewSpec({
        reviewGroups: [
          newReviewGroup({
            reviewers: [REVIEWERS.A],
            filePattern: "*.java",
          }),
          newReviewGroup({
            reviewers: [REVIEWERS.B],
            filePattern: "*.xml",
          }),
          newReviewGroup({
            reviewers: [REVIEWERS.C],
          }),
        ],
      })

      const mergeChecker = mergeCheckerSubject(reviewSpec)
      mergeChecker._getDiffStatPaths = async () => [
        {new: {path: "myFolder/anotherFolder/myFile.xml"}},
      ]

      const pr = newPullrequest()
      const result = await mergeChecker.perform(pr)

      assert(!hasReviewerInStatus(USERS.A, result))
      assert(hasReviewerInStatus(USERS.B, result))
      assert(hasReviewerInStatus(USERS.C, result))
    })
  })
})
