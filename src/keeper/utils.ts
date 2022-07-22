import { KeeperError } from '../errors'

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
        case 1338:
            return 'development'
        case 8996:
            return 'Spree'
        case 8997:
            return 'polygon-localnet'
        case 42220:
            return 'celo'
        case 44787:
            return 'celo-alfajores'
        case 62320:
            return 'celo-baklava'
        case 80001:
            return 'mumbai'
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
