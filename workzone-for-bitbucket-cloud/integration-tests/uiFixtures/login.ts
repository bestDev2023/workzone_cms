import {Page} from "playwright"

export async function login(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  await page.goto("https://bitbucket.org/dashboard/overview")

  await page.fill('[placeholder="Enter\\ email"]', email)
  await page.click('button:has-text("Continue")')
  await page.fill('[placeholder="Enter\\ password"]', password)
  await Promise.all([
    page.waitForNavigation(),
    page.click('button:has-text("Log in")'),
  ])
}
