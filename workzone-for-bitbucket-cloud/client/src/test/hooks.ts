import * as td from "testdouble"
import fetchMock from "fetch-mock"
import {apiConfig} from "@/api"

before(() => {
  apiConfig.isRefreshTokenEnabled = false
  AP.request_access_token = (_, callback) => {
    callback(_, {access_token: "DUMMY_TOKEN"})
  }
})
afterEach(() => {
  td.reset()
  // Do not reset mocks if running just one test so the test
  // is still interactive
  if (document.querySelectorAll(".test").length > 1) {
    fetchMock.reset()
  }
})
