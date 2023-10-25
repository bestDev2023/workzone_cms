import {pick} from "remeda"

export function assertMatches<T extends object>(
  actual: T | undefined,
  expected: Partial<T>
): void {
  if (actual === undefined) {
    assert.fail(actual, expected)
  }
  const partialActual = pick(actual, <Array<keyof T>>Object.keys(expected))
  assert.deepStrictEqual(partialActual, expected)
}

export function assertEqual<T extends object>(
  actual: T | undefined,
  expected: T
): void {
  assert.deepStrictEqual(actual, expected)
}
