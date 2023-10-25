import waitOn from "wait-on"

export async function waitForDatabase(url: string, timeout = 5000) {
  await waitOn({
    timeout,
    resources: [url],
    validateStatus: status => status === 400,
  })
}
