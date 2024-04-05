import { assert } from 'chai'
import config from '../config'
import { ContractHandler } from '@/keeper/ContractHandler'
import { Nevermined } from '@/nevermined/Nevermined'
import { searchAbiFunction } from '@/nevermined'

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
        './artifacts/',
        networkName,
      )

      const output = searchAbiFunction(solidityABI.abi, 'mint')
      assert(output)
    })

    it('should parse the NeverminedToken contract', async () => {
      const solidityABI = await ContractHandler.getABIArtifact(
        'NeverminedToken',
        './artifacts/',
        networkName,
      )
      const output = searchAbiFunction(solidityABI.abi, 'mint')
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
