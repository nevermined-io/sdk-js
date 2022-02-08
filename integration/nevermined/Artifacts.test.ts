import { assert } from 'chai'
import { Config, Nevermined } from '../../src'
import { LogLevel } from '../../src/utils'

describe('Artifacts', () => {
    const infuraToken = process.env.INFURA_TOKEN
    const tests = [
        {
            nodeUri: `https://mainnet.infura.io/v3/${infuraToken}`,
            networkName: ['mainnet'],
            networkId: [1]
        },
        {
            nodeUri: `https://rinkeby.infura.io/v3/${infuraToken}`,
            networkName: ['rinkeby'],
            networkId: [4]
        },
        {
            nodeUri: 'http://localhost:8545',
            networkName: ['spree', 'polygon-localnet'],
            networkId: [8996, 8997]
        },
        {
            nodeUri: 'https://matic-mumbai.chainstacklabs.com',
            networkName: ['mumbai'],
            networkId: [80001]
        },
        {
            nodeUri: 'https://alfajores-forno.celo-testnet.org',
            networkName: ['celo-alfajores'],
            networkId: [44787]
            //        },
            //        {
            //            nodeUri: 'https://baklava-forno.celo-testnet.org',
            //            networkName: ['celo-baklava'],
            //            networkId: [62320]
        },
        {
            nodeUri: `https://polygon-mainnet.infura.io/v3/${infuraToken}`,
            networkName: ['matic'],
            networkId: [137]
        }
    ]

    tests.forEach(({ nodeUri, networkName, networkId }) => {
        it(`Should get the correct artifacts for ${networkName}-${networkId} on ${nodeUri}`, async () => {
            const nvm = await Nevermined.getInstance({
                nodeUri: nodeUri,
                verbose: LogLevel.Verbose
            } as Config)

            assert.isDefined(nvm)
            assert.isDefined(nvm.keeper)
            assert.isDefined(nvm.keeper.didRegistry)
            assert.oneOf((await nvm.keeper.getNetworkName()).toLowerCase(), networkName)
            assert.oneOf(await nvm.keeper.getNetworkId(), networkId)
        })
    })
})
