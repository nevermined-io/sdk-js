import { assert } from 'chai'
import config from '../config'
import { ContractHandler } from '../../src/keeper/ContractHandler'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { searchAbiFunction } from '../../src/nevermined'
import { NeverminedOptions } from '../../src'

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

describe('ContractHandler with artifacts remote', () => {
  let contractHandler: ContractHandler
  let nevermined: Nevermined
  let networkName: string

  const configBase: NeverminedOptions = {
    chainId: 421614,
    web3ProviderUri: `https://arbitrum-sepolia.infura.io/v3/${process.env['INFURA_TOKEN']}`,
    marketplaceUri: 'https://marketplace-api.staging.nevermined.app',
    neverminedNodeUri: 'https://node.staging.nevermined.app',
    neverminedNodeAddress: '0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc',
    marketplaceAuthToken: undefined,
    contractsVersion: 'v3.5.7',
    circuitsFolder: './circuits',
    graphHttpUri: 'https://api.thegraph.com/subgraphs/name/nevermined-io/public',
    gasMultiplier: 1.1,
  }

  before(async () => {
    nevermined = await Nevermined.getInstance(configBase)
    const { instanceConfig } = nevermined as any
    contractHandler = new ContractHandler(instanceConfig)
    networkName = await nevermined.keeper.getNetworkName()
    console.log('networkName', networkName)
  })

  describe('ABIs parsing', () => {
    it('should parse a Subscription NFT contract', async () => {
      const solidityABI = await ContractHandler.getABIArtifact(
        'NFT721SubscriptionUpgradeable',
        undefined,
        networkName,
        configBase.chainId,
        'v3.5.7',
      )

      const output = searchAbiFunction(solidityABI.abi, 'mint')
      assert(output)
    })

    it('should parse the NeverminedToken contract', async () => {
      const solidityABI = await ContractHandler.getABIArtifact(
        'NeverminedToken',
        undefined,
        networkName,
        configBase.chainId,
        'v3.5.7',
      )
      const output = searchAbiFunction(solidityABI.abi, 'mint')
      assert(output)
    })

    it('should parse the NeverminedToken contract without passing the version and picking the latests artifacts', async () => {
      const solidityABI = await ContractHandler.getABIArtifact(
        'NeverminedToken',
        undefined,
        networkName,
        configBase.chainId,
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
          undefined,
          undefined,
          'v3.5.7',
        ),
      )
    })

    it('should load and get NeverminedToken correctly without passing version', async () => {
      assert(await contractHandler.getContractFromArtifacts('NeverminedToken', false))
    })

    it('should fail to load an unknown contract', (done) => {
      contractHandler
        .getContractFromArtifacts('NeverminedXXX', false, undefined, undefined, 'v3.5.7')
        .catch(() => {
          done()
        })
    })
  })
})
