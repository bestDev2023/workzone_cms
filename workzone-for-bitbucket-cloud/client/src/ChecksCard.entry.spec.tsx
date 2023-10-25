import {render as renderTl} from "@testing-library/react"
import {PullRequestMergeCheckResult} from "@shared/models"

import {
  newPullRequestMergeCheckResult,
  newReviewerCheckResultFor,
  newReviewGroupWithNames,
  REVIEWERS,
  USERS,
} from "../../sample/ReviewerSpec.sample"

import {ChecksCard, ChecksCardResult} from "./ChecksCard.entry"
import {newUserAccount} from "../../sample/sample"
import {Quota} from "../../shared/models"
import {countChecks} from "../../server/src/reviewers/countChecks"

function render(results: Array<PullRequestMergeCheckResult>) {
  const checkResult = {...countChecks(results), results}
  renderTl(
    <div css={{width: 240, padding: "2em", border: "1px solid lightgrey"}}>
      <ChecksCardResult checkResult={checkResult} />
    </div>
  )
}

const QUOTAS = {
  PCT_25: new Quota(25, "PERCENT"),
  PCT_60: new Quota(60, "PERCENT"),
  PCT_100: new Quota(100, "PERCENT"),
} as const
// FXIME when only approver is user do not show "1 more approvals needed"
// FIXME do not show ZERO quota as checks? Or don't eval in the backend?
describe("<ChecksCard>", () => {
  it("no results", () => {
    render([])
  })

  describe("generic checks", () => {
    it("has generic checks pending requested changes", () => {
      const reviewResult: PullRequestMergeCheckResult = {
        checkResults: [
          {
            type: "generic",
            status: "PENDING",
            description: "Require something",
          },
        ],
        settingId: "",
      }

      render([reviewResult])
    })

    it("has multiple generic checks ", () => {
      const reviewResult: PullRequestMergeCheckResult = {
        checkResults: [
          {
            type: "generic",
            status: "PASSED",
            description: "Require something",
          },
          {
            type: "generic",
            status: "PENDING",
            description: "Require something else",
          },
        ],
        settingId: "",
      }

      render([reviewResult])
    })

    it("lists reviewers last", () => {
      const reviewGroup = newReviewGroupWithNames({
        reviewers: [REVIEWERS.A, REVIEWERS.GROUP_1],
      })

      const reviewCheckResult = newReviewerCheckResultFor(
        [reviewGroup],
        [REVIEWERS.A.id],
        {
          "group-1": [newUserAccount(), newUserAccount()],
        }
      )

      const prCheckResult: PullRequestMergeCheckResult = {
        checkResults: [
          {
            type: "generic",
            status: "PASSED",
            description: "Require something",
          },
          {
            type: "generic",
            status: "PENDING",
            description: "Require something",
          },
          ...reviewCheckResult,
        ],
        settingId: "",
      }

      render([prCheckResult])
    })
  })
  describe("single review group", () => {
    it("has user and group", () => {
      const reviewGroup = newReviewGroupWithNames({
        reviewers: [REVIEWERS.A, REVIEWERS.GROUP_1],
      })

      const reviewResult = newReviewerCheckResultFor(
        [reviewGroup],
        [REVIEWERS.A.id],
        {
          "group-1": [newUserAccount(), newUserAccount()],
        }
      )

      render([newPullRequestMergeCheckResult({checkResults: reviewResult})])
    })

    it("has only users", () => {
      const reviewGroup = newReviewGroupWithNames({
        reviewers: [REVIEWERS.A, REVIEWERS.B],
      })

      const reviewResult = newReviewerCheckResultFor(
        [reviewGroup],
        [REVIEWERS.A.id]
      )

      render([newPullRequestMergeCheckResult({checkResults: reviewResult})])
    })

    it("has only groups", () => {
      const reviewGroup = newReviewGroupWithNames({
        reviewers: [REVIEWERS.GROUP_1, REVIEWERS.GROUP_2],
      })

      const reviewResult = newReviewerCheckResultFor(
        [reviewGroup],
        [REVIEWERS.A.id],
        {
          "group-1": [USERS.A, USERS.B],
          "group-2": [USERS.C, USERS.D],
        }
      )

      render([newPullRequestMergeCheckResult({checkResults: reviewResult})])
    })
  })

  describe("multiple review groups", () => {
    it("has user and group", () => {
      const reviewGroups = [
        newReviewGroupWithNames({
          reviewers: [REVIEWERS.A, REVIEWERS.GROUP_1],
        }),
        newReviewGroupWithNames({
          reviewers: [REVIEWERS.B, REVIEWERS.GROUP_2],
        }),
      ]

      const reviewResult = newReviewerCheckResultFor(
        reviewGroups,
        [REVIEWERS.A.id],
        {
          "group-1": [newUserAccount(), newUserAccount()],
          "group-2": [newUserAccount(), newUserAccount()],
        }
      )

      render([newPullRequestMergeCheckResult({checkResults: reviewResult})])
    })

    it("has only users", () => {
      const reviewGroup = newReviewGroupWithNames({
        reviewers: [REVIEWERS.A, REVIEWERS.B],
      })

      const reviewResult = newReviewerCheckResultFor(
        [reviewGroup],
        [REVIEWERS.A.id]
      )

      render([newPullRequestMergeCheckResult({checkResults: reviewResult})])
    })

    it("it requires three approvals and at least one from each group", () => {
      const reviewGroups = [
        newReviewGroupWithNames({
          quota: new Quota(3),
          reviewers: [REVIEWERS.GROUP_1, REVIEWERS.GROUP_2],
        }),
        newReviewGroupWithNames({
          quota: new Quota(1),
          reviewers: [REVIEWERS.GROUP_1],
        }),
        newReviewGroupWithNames({
          quota: new Quota(1),
          reviewers: [REVIEWERS.GROUP_2],
        }),
      ]

      const reviewResult = newReviewerCheckResultFor(
        reviewGroups,
        [REVIEWERS.A.id, REVIEWERS.B.id, REVIEWERS.C.id],
        {
          "group-1": [USERS.A, USERS.B, USERS.C],
          "group-2": [USERS.D, USERS.E],
        }
      )

      render([newPullRequestMergeCheckResult({checkResults: reviewResult})])
    })
  })

  describe("options", () => {
    it("has filters", () => {
      const reviewGroup = newReviewGroupWithNames({
        filePattern: "*.java, *.js",
      })

      const reviewResult = newReviewerCheckResultFor([reviewGroup], [])

      render([newPullRequestMergeCheckResult({checkResults: reviewResult})])
    })

    it("has signature method", () => {
      const reviewGroup = newReviewGroupWithNames({
        approvalMethod: "DIGITAL_SIGNATURE",
      })

      const reviewResult = newReviewerCheckResultFor([reviewGroup], [])

      render([newPullRequestMergeCheckResult({checkResults: reviewResult})])
    })

    it("has filters and signature", () => {
      const reviewGroup = newReviewGroupWithNames({
        filePattern: "*.java, *.js",
        approvalMethod: "DIGITAL_SIGNATURE",
      })

      const reviewResult = newReviewerCheckResultFor([reviewGroup], [])

      render([newPullRequestMergeCheckResult({checkResults: reviewResult})])
    })
  })
  describe("quota", () => {
    describe("single review group", () => {
      const INDIVIDUAL_REVIEWERS = [
        REVIEWERS.A,
        REVIEWERS.B,
        REVIEWERS.C,
      ] as const
      const GROUP_1_USERS = [USERS.D, USERS.E]
      const APPROVERS = [
        ...INDIVIDUAL_REVIEWERS.map(_ => _.id),
        ...GROUP_1_USERS.map(_ => _.uuid),
      ]

      for (const approvalRate of [0, 65, 100]) {
        for (const quota of [
          ...Object.values(QUOTAS),
          new Quota(1),
          new Quota(3),
        ]) {
          it(`quota: ${quota.toString()} / approval rate: ${approvalRate}% `, () => {
            const reviewGroup = newReviewGroupWithNames({
              quota,
              reviewers: [...INDIVIDUAL_REVIEWERS, REVIEWERS.GROUP_1],
            })

            const totalApprovals = Math.round(
              (approvalRate * APPROVERS.length) / 100
            )

            const approvals = APPROVERS.slice(0, totalApprovals)
            const reviewResult = newReviewerCheckResultFor(
              [reviewGroup],
              approvals,
              {
                "group-1": [USERS.D, USERS.E],
              }
            )

            render([
              newPullRequestMergeCheckResult({checkResults: reviewResult}),
            ])
          })
        }
      }
    })
  })
})
