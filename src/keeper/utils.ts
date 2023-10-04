import { ethers } from 'ethers'
import { KeeperError } from '../errors'

export const getNetworkName = (networkId: number): string => {
  switch (networkId) {
    case 1:
      return 'mainnet'
    case 2:
      return 'morden'
    case 3:
      return 'ropsten'
    case 4:
      return 'rinkeby'
    case 5:
      return 'goerli'
    case 77:
      return 'poa_sokol'
    case 99:
      return 'poa_core'
    case 42:
      return 'kovan'
    case 100:
      return 'gnosis'
    case 137:
      return 'matic'
    case 1337:
      return 'geth-localnet'
    case 3141:
      return 'hyperspace'
    case 10200:
      return 'chiado' // Gnosis testnet
    case 31337:
      return 'geth-localnet'
    case 8996:
      return 'spree'
    case 8997:
      return 'polygon-localnet'
    case 8998:
      return 'hardhat'
    case 42220:
      return 'celo'
    case 44787:
      return 'celo-alfajores'
    case 62320:
      return 'celo-baklava'
    case 80001:
      return 'mumbai'
    case 42161:
      return 'arbitrum-one'
    case 421613:
      return 'arbitrum-goerli'
    case 1313161554:
      return 'aurora'
    case 1313161555:
      return 'aurora-testnet'
    case 1313161556:
      return 'aurora-betanet'
    default:
      throw new KeeperError(`Network with id ${networkId} not supported.`)
  }
}

// Wrapper for implementing web3 provider. Needed for OpenGSN
export interface JsonRpcPayload {
  jsonrpc: string
  method: string
  params: any[]
  id?: string | number
}

export interface JsonRpcResponse {
  jsonrpc: string
  id: number
  result?: any
  error?: string
}

export class Web3ProviderWrapper {
  provider: ethers.JsonRpcProvider | ethers.BrowserProvider

  constructor(provider: ethers.JsonRpcProvider | ethers.BrowserProvider) {
    this.provider = provider
  }
  send(
    payload: JsonRpcPayload,
    callback: (error: Error | null, result?: JsonRpcResponse) => void,
  ): void {
    const id = typeof payload.id === 'string' ? parseInt(payload.id) : payload.id
    this.provider
      .send(payload.method, payload.params)
      .then((result) => callback(null, { jsonrpc: payload.jsonrpc, id, result }))
  }
}
