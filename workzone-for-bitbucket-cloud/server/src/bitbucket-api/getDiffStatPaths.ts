import {httpClient} from "@/httpClient"
import {PartialDiffStat} from "@shared/models"

export async function getDiffStatPaths(
  workspace: string,
  repoSlug: string,
  pullRequestId: number
): Promise<Array<PartialDiffStat>> {
  const res = await httpClient.get<{
    values: Array<PartialDiffStat>
  }>(
    `https://api.bitbucket.org/2.0/repositories/${workspace}/${repoSlug}/pullrequests/${pullRequestId}/diffstat?fields=values.old.path,values.new.path`,
    {
      responseType: "json",
    }
  )

  return res.body.values
}
