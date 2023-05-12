import { ethers } from 'ethers'
import { Account, Logger, Nevermined, generateId } from '../../src'

export const transformMetadata = (metadata: any): any => {
  try {
    metadata.main.nonce = Math.random()
  } catch (error) {
    Logger.error(error)
  }
  return metadata
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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

export async function mineBlocks(nevermined: Nevermined, account: Account, blocksToWait: number) {
  for (let index = 0; index < blocksToWait; index++) {
    await nevermined.provenance.used(
      generateId(),
      generateId(),
      account.getId(),
      account.getId(),
      ethers.utils.hexZeroPad('0x0', 32),
      'mining',
      account,
    )
  }
}
