import {useEffect, useState} from "react"
import CheckCircleIcon from "@atlaskit/icon/glyph/check-circle"
import {token} from "@atlaskit/tokens"
import {G300, N90} from "@atlaskit/theme/colors"
import {css} from "@emotion/react"
import Avatar from "@atlaskit/avatar"
import Spinner from "@atlaskit/spinner"

import {
  MergeCheckResult,
  PullRequestMergeCheckResult,
  Reviewer,
  ReviewGroup,
  ReviewMergeCheckResult,
  ReviewStatus,
  UserReviewer,
} from "../../shared/models"
import {perform} from "../../server/client-api"
import {ok} from "oazapfts"
import {logger} from "./logger"

import PeopleIcon from "@atlaskit/icon/glyph/people"

const checkRow = css({
  padding: "4px 0px",
})
const checkTitle = css({display: "flex", alignItems: "center"})
const checkDescription = css({marginBottom: "1px", marginLeft: "6px"})
const checkDetail = css({paddingLeft: "2em"})

const statusIcon = (isPassed: boolean) => (
  <div css={{display: "flex"}}>
    {isPassed
      ? SuccessIcon({label: "Check passed"})
      : PendingIcon({label: "Check pending"})}
  </div>
)

function SuccessIcon(props: {label: string}) {
  return <CheckCircleIcon label={props.label} primaryColor={G300} />
}

function PendingIcon(props: {label: string}) {
  return (
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNGNEY1RjciIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
      alt={props.label}
    />
  )
}

function renderDetails(reviewGroup: ReviewGroup) {
  return (
    <div>
      {reviewGroup.filePattern != null && (
        <div>
          <small>Pattern: {reviewGroup.filePattern}</small>
        </div>
      )}
      {reviewGroup.approvalMethod === "DIGITAL_SIGNATURE" && (
        <div>
          <small>Method: Digital Signature</small>
        </div>
      )}
    </div>
  )
}

function renderReviewer(
  reviewer: Reviewer & {name: string},
  avatarHref: string | undefined
) {
  const [suffix, image] =
    reviewer.type === "user"
      ? [
          "",
          <Avatar
            key={reviewer.name}
            appearance="circle"
            name={reviewer.name}
            size="xsmall"
            src={avatarHref ?? ""}
          />,
        ]
      : [
          "group",
          <div key={reviewer.name} css={{padding: "1px 2px"}}>
            <PeopleIcon
              label="group"
              size="small"
              primaryColor={token("color.background.default", N90)}
            />
          </div>,
        ]
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        marginTop: "2px",
      }}
    >
      <div css={{textAlign: "center"}}>{image}</div>
      &nbsp;{reviewer.name}&nbsp;{suffix}
    </div>
  )
}

function findAvatar(
  reviewer: UserReviewer,
  reviewStatus: Array<ReviewStatus>
): string | undefined {
  return reviewStatus.find(status => status.participant.uuid === reviewer.id)
    ?.participant.links?.avatar?.href
}

function renderReviewMergeCheckResult(
  reviewGroupResult: ReviewMergeCheckResult
) {
  const {quota} = reviewGroupResult.reviewGroup
  const approvalText =
    quota.type === "PERCENT" ? (
      quota.amount === 100 ? (
        <strong>Approval</strong>
      ) : (
        <span>
          <strong>{quota.amount}%</strong> approval
        </span>
      )
    ) : (
      <span>
        <strong>{quota.amount}+</strong> approvals
      </span>
    )
  const description = reviewGroupResult.reviewGroup.reviewers.map(reviewer =>
    reviewer.type === "user"
      ? renderReviewer(
          reviewer,
          findAvatar(reviewer, reviewGroupResult.reviewStatus)
        )
      : renderReviewer(reviewer, "")
  )

  return (
    <div css={checkRow}>
      <div css={checkTitle}>
        {statusIcon(reviewGroupResult.quota.isMet)}
        <span css={checkDescription}>{approvalText}&nbsp;from</span>
      </div>
      <div css={checkDetail}>
        {description}
        <div css={{lineHeight: "1em", marginTop: "4px"}}>
          {!reviewGroupResult.quota.isMet && (
            <small>
              {reviewGroupResult.quota.pending} more approvals needed
            </small>
          )}
          {renderDetails(reviewGroupResult.reviewGroup)}
        </div>
      </div>
    </div>
  )
}

function renderGenericMergeCheck(mergeCheckResult: MergeCheckResult) {
  return (
    <div css={checkRow}>
      <div css={checkTitle}>
        {statusIcon(mergeCheckResult.status === "PASSED")}
        <div
          css={checkDescription}
          dangerouslySetInnerHTML={{__html: mergeCheckResult.description}}
        />
      </div>
    </div>
  )
}

export function ChecksCardResult({
  checkResult: {passed, results, total},
}: {
  checkResult: {
    total: number
    passed: number
    results: Array<PullRequestMergeCheckResult>
  }
}): JSX.Element {
  const hasResults = results.length > 0
  return (
    <div>
      {total > 0 ? (
        <div css={{paddingBottom: "6px"}}>
          <strong>
            {passed} of {total}
          </strong>
          &nbsp;checks passed
        </div>
      ) : (
        <div
          css={{
            textAlign: "center",
            paddingTop: "0.75em",
            color: N90,
          }}
        >
          {hasResults ? (
            <div>No applicable checks</div>
          ) : (
            <div>No matched settings</div>
          )}
        </div>
      )}

      {results.map(({checkResults}) =>
        checkResults.map(mergeCheckResult =>
          mergeCheckResult.type === "review-merge-check"
            ? renderReviewMergeCheckResult(mergeCheckResult)
            : renderGenericMergeCheck(mergeCheckResult)
        )
      )}
    </div>
  )
}

export function ChecksCard(props: {
  workspacePath: string
  repositoryPath: string
  pullrequestId: number
  jwt: string
}) {
  const [checkResult, setCheckResult] = useState<{
    total: number
    passed: number
    results: Array<PullRequestMergeCheckResult>
  }>()

  useEffect(() => {
    ;(async () => {
      try {
        const result = await ok(
          perform(
            props.workspacePath,
            props.repositoryPath,
            props.pullrequestId
          )
        )
        // TODO failing because of the default param "ABSOLUTE"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- see TODO
        // @ts-ignore
        setCheckResult(result)
        AP.events.emit("mergeCheckStatus", [JSON.stringify(result)])
      } catch (reason) {
        logger.error("Error while fetching merge status", reason)
      }
    })()
  }, [props.pullrequestId, props.repositoryPath, props.workspacePath])

  return checkResult ? (
    <ChecksCardResult checkResult={checkResult} />
  ) : (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "125px",
      }}
    >
      <Spinner size="large" />
    </div>
  )
}
