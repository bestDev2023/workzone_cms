import {default as powerAssert} from "power-assert"

declare global {
  const assert: typeof powerAssert
}

export {}
