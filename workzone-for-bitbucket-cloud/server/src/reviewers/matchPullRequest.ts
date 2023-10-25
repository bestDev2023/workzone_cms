import {isMatch as microIsMatch} from "micromatch"
import is from "@sindresorhus/is"

import {Pullrequest} from "bitbucket-api"
import {PullRequestSettingsEntry} from "@shared/models"

const isMatch = (string: string, pattern: string) =>
  microIsMatch(string, pattern, {bash: true})

export function matchPullRequest(
  pullRequest: Pullrequest,
  settings: PullRequestSettingsEntry
): boolean {
  const isDestinationMatching = isMatch(
    pullRequest.destination?.branch?.name ?? "",
    is.nonEmptyString(settings.destination) ? settings.destination : "*"
  )
  const isSourceMatching = isMatch(
    pullRequest.source?.branch?.name ?? "",
    is.nonEmptyString(settings.source) ? settings.source : "*"
  )
  return isDestinationMatching && isSourceMatching
}
