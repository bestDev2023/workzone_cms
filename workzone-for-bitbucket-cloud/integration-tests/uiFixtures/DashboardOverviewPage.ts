import {Page} from "playwright"

import {PageFixture} from "./PageFixture"

export class DashboardOverviewPage extends PageFixture {
  constructor(page: Page) {
    super(page, "https://bitbucket.org/dashboard/overview")
  }
}
