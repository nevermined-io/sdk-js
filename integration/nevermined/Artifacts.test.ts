import { assert } from 'chai'
import { mkdtempSync, writeFileSync } from 'fs'
import { Config, Nevermined } from '../../src'
import fetch from 'node-fetch'
import { x } from 'tar'
import { LogLevel } from '../../src/utils'

describe('Artifacts', () => {
    const artifactsRepo = 'https://artifacts.nevermined.rocks/'
    const tests = [
        {
            nodeUri: 'https://matic-mumbai.chainstacklabs.com',
            networkName: ['mumbai'],
            networkId: [80001],
            versions: ['v1.3.8'],
            tag: 'common'
        },
        {
            nodeUri: 'https://matic-mumbai.chainstacklabs.com',
            networkName: ['mumbai'],
            networkId: [80001],
            versions: ['v2.0.0-rc3'],
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

    for(const test of tests) {
        const { nodeUri, networkId, networkName, versions, tag } = test;

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
                nodeUri: nodeUri,
                verbose: LogLevel.Verbose,
                artifactsFolder: tempDir
            } as Config)

            assert.isDefined(nvm)
            assert.isDefined(nvm.keeper)
            assert.isDefined(nvm.keeper.didRegistry)
            assert.oneOf((await nvm.keeper.getNetworkName()).toLowerCase(), networkName)
            assert.oneOf(await nvm.keeper.getNetworkId(), networkId)
        })
    }
})
