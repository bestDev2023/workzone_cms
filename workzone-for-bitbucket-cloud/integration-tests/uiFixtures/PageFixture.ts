import {Page} from "playwright"

export class PageFixture {
  constructor(readonly page: Page, readonly url: string) {}

  async goto(): Promise<void> {
    await this.page.goto(this.url)
  }
}
