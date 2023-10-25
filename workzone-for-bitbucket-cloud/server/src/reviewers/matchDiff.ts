import micromatch from "micromatch"

import {PartialDiffStat} from "@shared/models"

export function matchDiff(
  filePattern: string,
  diffStats: Array<PartialDiffStat>
): boolean {
  const isMatch = micromatch.matcher(filePattern, {bash: true, dot: true})

  return diffStats.some(
    _ => isMatch(_.new.path) || (_.old?.path != null && isMatch(_.old.path))
  )
}
