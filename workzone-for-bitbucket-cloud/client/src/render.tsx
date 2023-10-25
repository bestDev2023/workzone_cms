import React from "react"
import ReactDOM from "react-dom"

import "./api"
import "@atlaskit/css-reset"
import {fail} from "@shared/fail"

export async function render<T>(View: (_: T) => JSX.Element, props: T) {
  const workspace = await getCurrentWorkspace()

  const root =
    document.querySelector("#root") ??
    fail("Unable to find the element with the #root selector")
  ReactDOM.render(
    <React.StrictMode>
      <View {...props} workspace={workspace} />
    </React.StrictMode>,
    root
  )
  new ResizeObserver(() => {
    AP.resize()
  }).observe(root)
}

async function getCurrentWorkspace(): Promise<string | undefined> {
  // Use the location to determine the workspace as it seems to be a simpler
  // and more direct way, instead of Bitbucket context parameters, given that
  // there's no workspace available directly, and it has to be determined using
  // some logic around user and target_user
  return new Promise(resolve => {
    AP.getLocation(location => {
      resolve(location.split("/")[3])
    })
  })
}
