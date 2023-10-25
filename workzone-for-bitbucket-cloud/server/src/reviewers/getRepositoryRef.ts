import {Pullrequest} from "bitbucket-api"
import {fail} from "@shared/fail"
import {extractNamesFrom} from "@/extractNamesFrom"
import {RepositoryRef} from "@shared/models"

export function getRepositoryRef(pullRequest: Pullrequest): RepositoryRef {
  const fullName =
    pullRequest.destination?.repository?.full_name ??
    fail(`Full name not available for pull request id: ${pullRequest.id}`)
  return extractNamesFrom(fullName)
}
