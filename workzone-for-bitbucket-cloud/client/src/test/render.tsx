import React, {ReactElement} from "react"
import {IntlProvider} from "react-intl"
import {
  queries,
  Queries,
  render as rtlRender,
  RenderOptions,
} from "@testing-library/react"

export function render<Q extends Queries, T extends typeof queries & Q>(
  ui: ReactElement,
  options: RenderOptions<Q> = {}
) {
  // Use a container to provide isolation for queries
  const container = document.createElement("div")
  document.body.append(container)

  const allQueries: T = {...options.queries, ...queries} as T

  return rtlRender<T>(ui, {
    ...options,
    queries: allQueries,
    wrapper: IntlWrapper,
  })
}

const IntlWrapper = ({children}: any) => (
  <React.StrictMode>
    <IntlProvider locale="en">{children}</IntlProvider>
  </React.StrictMode>
)
