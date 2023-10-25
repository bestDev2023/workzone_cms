import {EffectCallback, useEffect} from "react"

export function useMountEffect(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- need to run only once
  return useEffect(effect, [])
}
