import {Request, Response} from "express"
import {ok} from "oazapfts"
import {SetRequired} from "type-fest"

import {f, loggers} from "@/logger"
import {
  Commitstatus,
  getRepositoriesByWorkspaceAndRepoSlugPullrequests,
  HookEvent,
  Repository,
  User,
} from "bitbucket-api"
import {extractNamesFrom} from "@/extractNamesFrom"
import {onChange} from "@/reviewers/MergeCheck"
import {PullRequest} from "@shared/models"

const logger = loggers.webhook

export function webhookHandler() {
  return async (req: Request, res: Response): Promise<void | Response> => {
    const eventPayload = req.body as {
      event: string
      data: {actor: {display_name: string}}
    }

    logger.debug(f`webhook: event: ${eventPayload.event}`)

    // TODO when the surrogate account is enabled check it it's the author and
    // skip the update as an additional safety mechanism to avoid triggering a
    // circular update
    if (
      eventPayload.data.actor.display_name
        .toLowerCase()
        .includes("__workzone__")
    ) {
      logger.debug(f`Ignoring webhook from self update`)
    } else {
      // log the webhook payload
      logger.debug(
        f`Webhook payload
        ${req.body}`
      )

      if (isPullRequestEvent(eventPayload)) {
        void onChange(eventPayload.data.pullrequest)
      } else if (
        isCommitStatusEvent(eventPayload) &&
        // Only eval on SUCCESS because it's when it requires actions from
        // Workzone, e.g. auto merge or add reviewers. It won't remove reviewers
        // on failure though
        eventPayload.data.commit_status.state === "SUCCESSFUL"
      ) {
        const fullName = req.body.data.repository.full_name
        const {workspace, repository} = extractNamesFrom(fullName)
        const commitHash = req.body.data.commit_status.commit.hash
        // Get pull requests by commit API only works if
        // "Pull Request Commit Links" app is installed, so evaluate it via
        // open PRs
        // TODO use API/app if enabled
        const prsToEval = (
          (
            await ok(
              getRepositoriesByWorkspaceAndRepoSlugPullrequests(
                repository,
                workspace,
                {state: "OPEN"}
              )
            )
          ).values ?? []
        ).filter(_ =>
          commitHash.startsWith(_.source?.commit?.hash)
        ) as Array<PullRequest>

        for (const pr of prsToEval) {
          void onChange(pr)
        }
      }
    }
    res.sendStatus(200)
  }
}

type CommitStatusEventType = Extract<
  HookEvent["event"],
  "repo:commit_status_created" | "repo:commit_status_updated"
>

interface PullRequestUpdatedEvent {
  event: NonNullable<HookEvent["event"]>
  data: {pullrequest: PullRequest; repository: Repository; actor: User}
}

interface CommitStatusEvent {
  event: CommitStatusEventType
  data: {
    commit_status: Commitstatus
    repository: SetRequired<Repository, "full_name">
    actor: User
  }
}

function isCommitStatusEvent(value: {
  event: string
}): value is CommitStatusEvent {
  return value.event.startsWith("repo:commit_status")
}

function isPullRequestEvent(value: {
  event: string
}): value is PullRequestUpdatedEvent {
  return value.event.startsWith("pullrequest:")
}
