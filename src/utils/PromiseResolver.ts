import { Logger } from '../sdk'

const zipObject = (keys = [], values = []) => {
  return keys.reduce(
    (acc, key, index) => ({
      ...acc,
      [key]: values[index],
    }),
    {},
  )
}

export const objectPromiseAll = async (obj: { [key: string]: Promise<any> }) => {
  const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult =>
    input.status === 'rejected'
  const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> =>
    input.status === 'fulfilled'

  const keys = Object.keys(obj)
  const result = await Promise.allSettled(Object.values(obj))
  const fulfilled = result.filter(isFulfilled).map((f) => f.value)
  const areRejected = result.filter(isRejected)
  areRejected.forEach((r) => Logger.error(r.reason))

  return zipObject(keys, fulfilled)
}
