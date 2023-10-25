import {PullRequestMergeCheckResult} from "@shared/models"

export function countChecks(results: Array<PullRequestMergeCheckResult>): {
  total: number
  passed: number
} {
  const allChecks = results.flatMap(prResult => prResult.checkResults)

  const passed = allChecks.filter(_ => _.status === "PASSED").length
  const total = allChecks.length

  return {total, passed}
}
