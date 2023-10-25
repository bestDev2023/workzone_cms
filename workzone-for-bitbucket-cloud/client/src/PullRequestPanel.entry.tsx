import SectionMessage from "@atlaskit/section-message"
import Button from "@atlaskit/button"
import {ok} from "oazapfts"
import ky from "ky"
import {useEffect, useState} from "react"

import {PullRequestMergeCheckResult} from "../../shared/models"
import {Pullrequest} from "../../bitbucket-api"
import {mergeManually} from "../../server/client-api"
import {fail} from "../../shared/fail"

import {getBearerToken} from "./api"

type PanelMergeStatus =
  | "READY_TO_MERGE"
  | "NOT_READY"
  | "MERGE_IN_PROGRESS"
  | "WAITING_AUTO_MERGE"
  | "MERGE_ERROR"
  | "MERGE_SUCCESS"
  | "NO_MATCHED_SETTINGS"

export function PullRequestPanel(props: {
  workspacePath: string
  repositoryPath: string
  pullrequestId: number
  pullRequestState: Pullrequest["state"]
}) {
  const [status, setStatus] = useState<PanelMergeStatus>()

  useEffect(listenMergeCheckStatusEvent, [props.pullRequestState])

  let render = null
  switch (status) {
    case "READY_TO_MERGE":
      render = renderReadyToMerge()
      break
    case "MERGE_IN_PROGRESS":
      render = renderMergeInProgress()
      break
    case "WAITING_AUTO_MERGE":
      render = renderWaitingAutoMerge()
      break
    case "MERGE_SUCCESS":
      render = <CompletedBanner />
      break
    default:
  }

  return render ? <div>{render}</div> : render

  function listenMergeCheckStatusEvent() {
    AP.events.once("mergeCheckStatus", data => {
      const result: {
        total: number
        passed: number
        results: Array<PullRequestMergeCheckResult>
      } = JSON.parse(
        (data as Array<string>)[0] ?? fail("Invalid merge check result")
      )

      let panelStatus: PanelMergeStatus | undefined
      const isAutoMerge: boolean = result.results[0]?.isAutoMerge ?? false

      // TODO The status should com from the backed as business logic,
      // including if it's auto merge and the merge status URL to allow checking
      // it
      if (props.pullRequestState === "OPEN") {
        if (result.results.length === 0) {
          panelStatus = "NO_MATCHED_SETTINGS"
        } else if (result.total === result.passed) {
          panelStatus = isAutoMerge ? "WAITING_AUTO_MERGE" : "READY_TO_MERGE"
        } else {
          panelStatus = "NOT_READY"
        }
      }

      setStatus(panelStatus)
    })
  }

  function renderReadyToMerge() {
    return (
      <SectionMessage title="This pull request is ready to merge">
        <p>All merge checks have passed.</p>
        <div css={{textAlign: "right"}}>
          <Button appearance="primary" onClick={handleMerge}>
            {" "}
            Merge{" "}
          </Button>
        </div>
      </SectionMessage>
    )
  }

  async function handleMerge() {
    setStatus("MERGE_IN_PROGRESS")
    const mergeResultPoll = await ok(
      mergeManually(
        props.workspacePath,
        props.repositoryPath,
        props.pullrequestId
      )
    )

    if (mergeResultPoll === "") {
      setStatus("MERGE_SUCCESS")
    } else {
      try {
        await waitForMerge(mergeResultPoll)
        setStatus("MERGE_SUCCESS")
      } catch {
        setStatus("MERGE_ERROR")
      }
    }
  }
}

function CompletedBanner() {
  const [location, setLocation] = useState<string>()
  useEffect(() => {
    AP.getLocation(setLocation)
  }, [])

  return (
    <div>
      {location != null && (
        <SectionMessage
          appearance="success"
          title="This pull request has been merged successfully"
        >
          <p>In order to view the updated status please reload.</p>
          <div css={{textAlign: "right"}}>
            <Button appearance="primary" href={location} target="_parent">
              Reload
            </Button>
          </div>
        </SectionMessage>
      )}
    </div>
  )
}

function renderMergeInProgress() {
  return (
    <SectionMessage title="Merge in progress">
      <p>
        This pull request is being merged in the background. You can safely
        navigate away. The status of the pull request will be updated once it is
        merged.
      </p>
    </SectionMessage>
  )
}

function renderWaitingAutoMerge() {
  return (
    <SectionMessage title="Workzone auto-merge in progress">
      <p>
        This pull request is being automatically merged in the background. You
        can safely navigate away. The status of the pull request will be updated
        once it is merged.
      </p>
    </SectionMessage>
  )
}

async function waitForMerge(mergeResultPoll: string) {
  return new Promise<void>((resolve, reject) => {
    const intervalId = setInterval(async () => {
      const url = mergeResultPoll.replaceAll('"', "")
      const pollResult = await ky.get(url, {
        headers: {Authorization: `Bearer ${await getBearerToken()}`},
      })
      if (pollResult.ok) {
        if ((await pollResult.json()).task_status === "SUCCESS") {
          clearInterval(intervalId)
          resolve()
        }
      }
    }, 250)
    setTimeout(() => {
      clearInterval(intervalId)
      reject()
    }, 60000)
  })
}
