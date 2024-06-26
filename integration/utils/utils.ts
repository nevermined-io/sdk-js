import { NvmAccount, Logger, Nevermined, generateId, zeroPadValue } from '../../src'

export const transformMetadata = (metadata: any): any => {
  try {
    metadata.main.nonce = Math.random()
  } catch (error) {
    Logger.error(error)
  }
  return metadata
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Promise that raises a error if the timeout occurs.
 *
 * Useful to test promises that never resolve or take a long time to resolve
 *
 * @example
 * ```ts
 * await Promise.race([promiseNotResolving, awaitTimeout(2000)])
 * ```
 *
 * @param delay - time to wait in milliseconds
 * @returns
 */
export const awaitTimeout = (delay): Promise<void> =>
  new Promise((_resolve, reject) => setTimeout(() => reject('Timeout'), delay))

export async function repeat<T>(n: number, p: Promise<T>): Promise<T> {
  for (let i = 0; i < n; i++) {
    try {
      return await p
    } catch (error) {
      Logger.error(error)
    }
    await sleep(500)
  }
  return p
}

export async function mineBlocks(
  nevermined: Nevermined,
  account: NvmAccount,
  blocksToWait: number,
) {
  for (let index = 0; index < blocksToWait; index++) {
    console.debug(`Mining block ${index}`)
    await nevermined.provenance.used(
      generateId(),
      generateId(),
      account.getId(),
      account.getId(),
      zeroPadValue('0x', 32),
      `miningBlock${index}`,
      account,
    )
    await sleep(100)
  }
}
