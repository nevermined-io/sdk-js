import { assert } from 'chai'
import { mkdtempSync, writeFileSync } from 'fs'
import { NeverminedOptions, Nevermined } from '../../src'
import fetch from 'node-fetch'
import { x } from 'tar'

describe('Artifacts', () => {
  const artifactsRepo = 'https://artifacts.nevermined.network/'
  const tests = [
    {
      web3ProviderUri: 'https://goerli-rollup.arbitrum.io/rpc',
      networkName: ['arbitrum-goerli'],
      networkId: [421613],
      versions: ['v3.2.2'],
      tag: 'public',
    },
  ]

  const downloadFile = async (url, path) => {
    const response = await fetch(url)
    const buffer = await response.buffer()
    writeFileSync(path, buffer)
  }

  for (const test of tests) {
    const { web3ProviderUri, networkId, networkName, versions, tag } = test

    it(`Should get the correct artifacts for ${networkName}-${versions} with tag ${tag}`, async () => {
      const tempDir = mkdtempSync('/tmp/artifacts_')

      const artifactPackageUrl = `${artifactsRepo}${networkId}/${tag}/contracts_${versions}.tar.gz`
      const packageFileName = `${tempDir}/contracts_${versions}.tar.gz`

      await downloadFile(artifactPackageUrl, packageFileName)

      await x({
        file: packageFileName,
        cwd: tempDir,
      })

      const nvm = await Nevermined.getInstance({
        web3ProviderUri: web3ProviderUri,
        artifactsFolder: tempDir,
      } as NeverminedOptions)

      assert.equal(networkId[0], await nvm.keeper.getNetworkId())
      assert.isDefined(nvm)
      assert.isDefined(nvm.keeper)
      assert.isDefined(nvm.keeper.didRegistry)
      assert.oneOf((await nvm.keeper.getNetworkName()).toLowerCase(), networkName)
      assert.oneOf(await nvm.keeper.getNetworkId(), networkId)
    })
  }
})
