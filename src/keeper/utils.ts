import { Chain, arbitrum, arbitrumSepolia, aurora, auroraTestnet, base, celo, celoAlfajores, gnosis, mainnet, optimism, polygon, polygonMumbai } from 'viem/chains'
import { KeeperError } from '../errors'
import { defineChain } from 'viem'

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

export function getChain(networkId: number): Chain {
  switch (networkId) {
    case 1:
      return mainnet
    case 10:
      return optimism as Chain
    case 100:
      return gnosis            
    case 137:
      return polygon
    case 8453:
      return base as Chain
    case 42161:
      return arbitrum   
    case 42220:
      return celo as Chain
    case 44787:
      return celoAlfajores as Chain
    case 80001:
      return polygonMumbai      
    case 421614:
      return arbitrumSepolia                        
    case 1313161554:
      return aurora      
    case 1313161555:
      return auroraTestnet
    case 8996 || 8997 || 31337:
      return defineChain({
        id: networkId,
        name: 'geth-localnet',
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: {
          default: {
            http: ['http://contracts.nevermined.localnet'],
            webSocket: []
          }
        }
      })
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
