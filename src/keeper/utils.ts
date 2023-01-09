import { ethers } from 'ethers'
import { KeeperError, Web3Error } from "../errors";

export async function getNetworkName(networkId: number): Promise<string> {
    switch (networkId) {
        case 1:
            return 'Mainnet'
        case 2:
            return 'Morden'
        case 3:
            return 'Ropsten'
        case 4:
            return 'Rinkeby'
        case 5:
            return 'Goerli'
        case 77:
            return 'POA_Sokol'
        case 99:
            return 'POA_Core'
        case 42:
            return 'Kovan'
        case 100:
            return 'xDai'
        case 137:
            return 'matic'
        case 1337:
            return 'geth-localnet'
        case 31337:
            return 'geth-localnet'
        case 8996:
            return 'spree'
        case 8997:
            return 'polygon-localnet'
        case 8998:
            return 'geth-localnet'
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
    jsonrpc: string;
    method: string;
    params: any[];
    id?: string | number;
}

export interface JsonRpcResponse {
    jsonrpc: string;
    id: number;
    result?: any;
    error?: string;
}

export class Web3ProviderWrapper {
    provider: ethers.providers.JsonRpcProvider
    constructor(provider: ethers.providers.JsonRpcProvider) {
        this.provider = provider
    }
    send(payload: JsonRpcPayload, callback: (error: Error | null, result?: JsonRpcResponse) => void): void {
        const id = typeof payload.id === 'string' ? parseInt(payload.id) : payload.id
        this.provider.send(payload.method, payload.params).then(result => callback(null, {jsonrpc: payload.jsonrpc, id, result}))
    }
}

export function isValidWeb3Provider(web3Provider: ethers.providers.JsonRpcProvider) {
        web3Provider.getNetwork().then(() => {
            return web3Provider
        }).catch(() => {throw new Web3Error(`Invalid web3 provider uri: ${{web3Provider}}.`)})
}
