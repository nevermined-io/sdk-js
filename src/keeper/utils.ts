import { Hex, SignTypedDataParams, SmartAccountSigner } from '@alchemy/aa-core'
import { Signer, TypedDataField, Wallet, ethers } from 'ethers'
import { KeeperError } from '../errors'

export async function getNetworkName(networkId: number): Promise<string> {
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
    case 10:
      return 'optimism'
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
    case 8453:
      return 'base'
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
    case 421614:
      return 'arbitrum-sepolia'
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
export function isTestnet(networkId: number): boolean {
  switch (networkId) {
    case 1:
      return false
    case 2:
      return true
    case 3:
      return true
    case 4:
      return true
    case 5:
      return true
    case 10:
      return false
    case 77:
      return false
    case 99:
      return false
    case 42:
      return true
    case 100:
      return false
    case 137:
      return false
    case 1337:
      return true
    case 3141:
      return true
    case 8453:
      return false
    case 10200:
      return true
    case 31337:
      return true
    case 8996:
      return true
    case 8997:
      return true
    case 8998:
      return true
    case 42220:
      return false
    case 44787:
      return true
    case 62320:
      return true
    case 80001:
      return true
    case 42161:
      return false
    case 421613:
      return true
    case 421614:
      return true
    case 1313161554:
      return false
    case 1313161555:
      return true
    case 1313161556:
      return true
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

export class DEPRECATED_Web3ProviderWrapper {
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

const isWalletEthersV6 = (signer: any): signer is Wallet =>
  signer && signer.signTypedData !== undefined

// zerodev ethersV6 compatibility
export const convertEthersV6SignerToAccountSigner = (
  signer: Signer | Wallet,
): SmartAccountSigner => {
  return {
    signerType: '',
    getAddress: async () => Promise.resolve((await signer.getAddress()) as `0x${string}`),
    signMessage: async (msg: Uint8Array | string) =>
      (await signer.signMessage(msg)) as `0x${string}`,
    signTypedData: async (params: SignTypedDataParams) => {
      if (!isWalletEthersV6(signer)) {
        throw Error('signTypedData method not implemented in signer')
      }
      return (await signer.signTypedData(
        params.domain!,
        params.types as unknown as Record<string, TypedDataField[]>,
        params.message,
      )) as Hex
    },
  }
}
