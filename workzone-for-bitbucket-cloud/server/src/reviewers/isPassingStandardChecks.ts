import {MergeRestrictions} from "@/bitbucket-api/internal"

export function isPassingStandardChecks(
  mergeRestrictions: MergeRestrictions
): boolean {
  return !Object.values(mergeRestrictions.restrictions).some(
    restriction => !restriction.pass
  )
}
