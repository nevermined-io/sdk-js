import { assert } from 'chai'
import { ContractHandler } from '../../src/keeper'
import { Nevermined } from '../../src/nevermined'
import config from '../config'
import { ethers } from 'ethers'

describe('ContractHandler', () => {
  let contractHandler: ContractHandler
  let nevermined: Nevermined
  let networkName: string

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    const { instanceConfig } = nevermined as any
    contractHandler = new ContractHandler(instanceConfig)
    networkName = await nevermined.keeper.getNetworkName()
  })

  describe('ABIs parsing', () => {
    it('should parse a Subscription NFT contract', async () => {
      const solidityABI = await ContractHandler.getABIArtifact(
        'NFT721SubscriptionUpgradeable',
        './test/resources/artifacts/',
      )
      const iface = new ethers.Interface(solidityABI.abi)
      const output = iface.format()
      assert(output)
    })

    it('should parse the NeverminedToken contract', async () => {
      const solidityABI = await ContractHandler.getABIArtifact(
        'NeverminedToken',
        './artifacts/',
        networkName,
      )
      const iface = new ethers.Interface(solidityABI.abi)
      const output = iface.format()
      assert(output)
    })
  })

  describe('#get()', () => {
    it('should load and get NeverminedToken correctly', async () => {
      assert(
        await contractHandler.getContractFromArtifacts(
          'NeverminedToken',
          false,
          './node_modules/@neverminde-io/contracts/artifacts',
        ),
      )
    })

    it('should fail to load an unknown contract', (done) => {
      contractHandler
        .getContractFromArtifacts(
          'NeverminedXXX',
          false,
          './node_modules/@neverminde-io/contracts/artifacts',
        )
        .catch(() => {
          done()
        })
    })
  })
})
