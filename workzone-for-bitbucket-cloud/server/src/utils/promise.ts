/**
 * Simple utility to replace then and allow transforming the value
 * @param promise
 * @param mapper
 */
export async function map<T, R>(
  promise: Promise<T>,
  mapper: (_: T) => R
): Promise<R> {
  return mapper(await promise)
}
