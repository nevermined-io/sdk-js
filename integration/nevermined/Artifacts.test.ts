import { assert } from 'chai'
import { mkdtempSync, writeFileSync } from 'fs'
import { Config, Nevermined } from '../../src'
import fetch from 'node-fetch'
import { x } from 'tar'

describe('Artifacts', () => {
    const artifactsRepo = 'https://artifacts.nevermined.rocks/'
    const tests = [
        {
            nodeUri: 'https://goerli-rollup.arbitrum.io/rpc',
            networkName: ['arbitrum-goerli'],
            networkId: [421613],
            versions: ['v2.1.0'],
            tag: 'public'
        },
        {
            nodeUri: 'https://matic-mumbai.chainstacklabs.com',
            networkName: ['mumbai'],
            networkId: [80001],
            versions: ['v2.1.0'],
            tag: 'public'
        },
        {
            nodeUri: 'https://polygon-rpc.com',
            networkName: ['matic'],
            networkId: [137],
            versions: ['v2.0.0'],
            tag: 'common'
        },
        {
            nodeUri: 'https://alfajores-forno.celo-testnet.org',
            networkName: ['celo-alfajores'],
            networkId: [44787],
            versions: ['v1.3.5'],
            tag: 'common'
        }
    ]

    const downloadFile = async (url, path) => {
        const response = await fetch(url)
        const buffer = await response.buffer()
        writeFileSync(path, buffer)
    }

    for (const test of tests) {
        const { nodeUri, networkId, networkName, versions, tag } = test

        it(`Should get the correct artifacts for ${networkName}-${versions} with tag ${tag}`, async () => {
            const tempDir = mkdtempSync('/tmp/artifacts_')

            const artifactPackageUrl = `${artifactsRepo}${networkId}/${tag}/contracts_${versions}.tar.gz`
            const packageFileName = `${tempDir}/contracts_${versions}.tar.gz`

            await downloadFile(artifactPackageUrl, packageFileName)

            await x({
                file: packageFileName,
                cwd: tempDir
            })

            // console.log(`Sleeping`)
            // await new Promise(r => setTimeout(r, 3000))
            // console.log(`Awake`)

            const nvm = await Nevermined.getInstance({
                nodeUri,
                artifactsFolder: tempDir
            } as Config)

            assert.equal(networkId[0], await nvm.keeper.getNetworkId())
            assert.isDefined(nvm)
            assert.isDefined(nvm.keeper)
            assert.isDefined(nvm.keeper.didRegistry)
            assert.oneOf((await nvm.keeper.getNetworkName()).toLowerCase(), networkName)
            assert.oneOf(await nvm.keeper.getNetworkId(), networkId)
        })
    }
})
