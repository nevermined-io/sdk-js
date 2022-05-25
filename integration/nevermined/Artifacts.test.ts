import { assert } from 'chai'
import { mkdtempSync, writeFileSync } from 'fs'
import { Config, Nevermined } from '../../src'
import fetch from 'node-fetch'
import { x } from 'tar'

describe('Artifacts', () => {
    const artifactsRepo = 'https://artifacts.nevermined.rocks/'
    const tests = [
        {
            nodeUri: 'https://matic-mumbai.chainstacklabs.com',
            networkName: ['mumbai'],
            networkId: [80001],
            versions: ['v1.3.6'],
            tag: 'common'
        },
        {
            nodeUri: 'https://alfajores-forno.celo-testnet.org',
            networkName: ['celo-alfajores'],
            networkId: [44787],
            versions: ['v1.3.5'],
            tag: 'common'
        }

        // {
        //     nodeUri: `https://mainnet.infura.io/v3/${infuraToken}`,
        //     networkName: ['mainnet'],
        //     networkId: [1]
        // },
        // {
        //     nodeUri: `https://rinkeby.infura.io/v3/${infuraToken}`,
        //     networkName: ['rinkeby'],
        //     networkId: [4]
        // },
        // {
        //     nodeUri: 'http://localhost:8545',
        //     networkName: ['spree', 'polygon-localnet', 'geth-localnet'],
        //     networkId: [8996, 8997, 1337]
        // },
        // {
        //     nodeUri: 'https://matic-mumbai.chainstacklabs.com',
        //     networkName: ['mumbai'],
        //     networkId: [80001]
        // },
        // {
        //     nodeUri: 'https://alfajores-forno.celo-testnet.org',
        //     networkName: ['celo-alfajores'],
        //     networkId: [44787]
        // },
        // {
        //     nodeUri: `https://polygon-mainnet.infura.io/v3/${infuraToken}`,
        //     networkName: ['matic'],
        //     networkId: [137]
        // }
        // No celo mainnet deployment
        // {
        //     nodeUri: 'https://forno.celo.org',
        //     networkName: ['celo'],
        //     networkId: [42220]
        // }
    ]

    const downloadFile = async (url, path) => {
        const response = await fetch(url)
        const buffer = await response.buffer()
        writeFileSync(path, buffer)
    }

    tests.forEach(({ nodeUri, networkId, networkName, versions, tag }) => {
        it(`Should get the correct artifacts for ${networkName}-${versions} with tag ${tag}`, async () => {
            const tempDir = mkdtempSync('/tmp/artifacts_')

            const artifactPackageUrl = `${artifactsRepo}${networkId}/${tag}/contracts_${versions}.tar.gz`
            const packageFileName = `${tempDir}/contracts_${versions}.tar.gz`

            await downloadFile(artifactPackageUrl, packageFileName)

            await x({
                file: packageFileName,
                cwd: tempDir
            })

            const nvm = await Nevermined.getInstance({
                nodeUri: nodeUri,
                artifactsFolder: tempDir
                // verbose: LogLevel.Verbose
            } as Config)

            assert.isDefined(nvm)
            assert.isDefined(nvm.keeper)
            assert.isDefined(nvm.keeper.didRegistry)
            assert.oneOf((await nvm.keeper.getNetworkName()).toLowerCase(), networkName)
            assert.oneOf(await nvm.keeper.getNetworkId(), networkId)
        })
    })
})
