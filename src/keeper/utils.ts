import Web3 from 'web3'

export function getNetworkId(web3: Web3): Promise<number> {
    return web3.eth.net.getId()
}

export function getNetworkName(web3): Promise<string> {
    return web3.eth.net.getId().then((networkId: number) => {
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
            case 2199:
                return 'Duero'
            case 8996:
                return 'Spree'
            case 8997:
                return 'polygon-localnet'
            case 8995:
                return 'Nile'
            case 0xcea11:
                return 'Pacific'
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
                return 'Development'
        }
    })
}
