import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import {
  Account,
  AssetPrice,
  Nevermined,
  ResourceAuthentication,
  SubscriptionCreditsNFTApi,
  Web3Error,
  ZeroAddress,
} from '../../src'
import { config } from '../config'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { NVMAppEnvironments, NvmApp } from '../../src/nevermined/NvmApp'
import { Signer } from 'ethers'
import { NvmAppMetadata } from '../../src/ddo/NvmAppMetadata'

chai.use(chaiAsPromised)

describe('NVM App API', () => {
  describe('LOCAL: As NVM App integrator I want to initialize the api in different ways', () => {
    let nvmApp: NvmApp
    let signerAddress: string
    let defaultSigner: Signer
    let publisher: Account
    let subscriptionNFTAddress: string
    let subscriptionDid: string
    let agentDid: string
    let datasetDid: string
    let agreementId
    let subscriptionPrice: AssetPrice
    let subscriptionPriceWithFees: AssetPrice

    // Agent/Service test configuration
    const SERVICE_ENDPOINT = process.env.SERVICE_ENDPOINT || 'http://127.0.0.1:3000'
    const OPEN_PATH = process.env.OPEN_PATH || '/openapi.json'
    const OPEN_ENDPOINT = process.env.OPEN_ENDPOINT || `${SERVICE_ENDPOINT}${OPEN_PATH}`
    const AUTHORIZATION_TYPE = (process.env.AUTHORIZATION_TYPE ||
      'oauth') as ResourceAuthentication['type']
    const AUTHORIZATION_TOKEN = process.env.AUTHORIZATION_TOKEN || 'new_authorization_token'
    const AUTHORIZATION_USER = process.env.AUTHORIZATION_USER || 'user'
    const AUTHORIZATION_PASSWORD = process.env.AUTHORIZATION_PASSWORD || 'password'

    before(async () => {
      TestContractHandler.setConfig(config)

      const nevermined = await Nevermined.getInstance(config)
      ;[, publisher] = await nevermined.accounts.list()

      const contractABI = await TestContractHandler.getABI(
        `NFT1155SubscriptionUpgradeable.geth-localnet`,
        './artifacts/',
      )
      const subscriptionNFT = await SubscriptionCreditsNFTApi.deployInstance(
        config,
        contractABI,
        publisher,
        [
          publisher.getId(),
          nevermined.keeper.didRegistry.address,
          'App Subscription NFT',
          'CRED',
          '',
          nevermined.keeper.nvmConfig.address,
        ],
      )

      subscriptionNFTAddress = subscriptionNFT.address
      console.debug(`Deployed ERC-1155 Subscription NFT on address: ${subscriptionNFTAddress}`)

      await nevermined.contracts.loadNft1155Api(subscriptionNFT)
      const neverminedNodeAddress = await nevermined.services.node.getProviderAddress()

      await subscriptionNFT.grantOperatorRole(
        nevermined.keeper.conditions.transferNftCondition.address,
        publisher,
      )
      console.debug(`Granting operator role to Nevermined Node Address: ${neverminedNodeAddress}`)
      await subscriptionNFT.grantOperatorRole(neverminedNodeAddress, publisher)

      assert.equal(nevermined.nfts1155.getContract.address, subscriptionNFTAddress)
      subscriptionPrice = new AssetPrice(publisher.getId(), 1000n).setTokenAddress(ZeroAddress)
    })

    it('I want to search content from the app', async () => {
      nvmApp = await NvmApp.getInstance(NVMAppEnvironments.Local)
      const results = await nvmApp.search.query({})
      console.log(JSON.stringify(results.totalResults))

      assert.isDefined(results)
    })

    it('Get the default configuration used', async () => {
      const appConfig = nvmApp.config
      assert.isDefined(appConfig)
    })

    it('Overwrite the default config with some parameters', async () => {
      assert.notEqual(nvmApp.config.artifactsFolder, './artifacts')
      nvmApp = await NvmApp.getInstance(NVMAppEnvironments.Local, config)
      assert.equal(nvmApp.config.artifactsFolder, './artifacts')
    })

    it('I want to connect my account', async () => {
      assert.isFalse(nvmApp.isWeb3Connected())

      assert.throws(() => nvmApp.sdk.accounts.list(), Web3Error)

      defaultSigner = config.accounts[0]
      signerAddress = await defaultSigner.getAddress()
      console.log(`Account address: ${signerAddress}`)
      await nvmApp.connect(signerAddress)

      assert.isTrue(nvmApp.isWeb3Connected())

      assert.doesNotThrow(() => nvmApp.sdk.accounts.list(), Web3Error)
    })

    it('I can calculate and include network fees', async () => {
      subscriptionPriceWithFees = nvmApp.addNetworkFee(subscriptionPrice)
      console.log(`Asset Price with fees: ${subscriptionPriceWithFees.toString()}`)

      assert.isTrue(nvmApp.isNetworkFeeIncluded(subscriptionPriceWithFees))
    })

    it('I want to create a time subscription', async () => {
      const timeSubscriptionMetadata = NvmAppMetadata.getTimeSubscriptionMetadataTemplate(
        'NVM App Time only Subscription test',
        'Nevermined',
        'hours',
      )

      const ddo = await nvmApp.createTimeSubscription(
        timeSubscriptionMetadata,
        subscriptionPrice,
        100, // 100 blocks duration
      )

      assert.isDefined(ddo)
      const ddoFound = await nvmApp.search.byDID(ddo.id)
      assert.equal(ddo.id, ddoFound.id)
    })

    it('I want to create a credits subscription', async () => {
      const creditsSubscriptionMetadata = NvmAppMetadata.getCreditsSubscriptionMetadataTemplate(
        'NVM App Credits Subscription test',
        'Nevermined',
      )

      const ddo = await nvmApp.createCreditsSubscription(
        creditsSubscriptionMetadata,
        subscriptionPrice,
        50n, // blocks duration
      )

      assert.isDefined(ddo)
      const ddoFound = await nvmApp.search.byDID(ddo.id)
      assert.equal(ddo.id, ddoFound.id)
      subscriptionDid = ddo.id
    })

    it('I want to register an Agent', async () => {
      const agentMetadata = NvmAppMetadata.getServiceMetadataTemplate(
        'Nevermined Ageeeent',
        'Nevermined',
        [
          {
            GET: `${SERVICE_ENDPOINT}(.*)`,
          },
        ],
        [OPEN_ENDPOINT],
        OPEN_ENDPOINT,
        'RESTful',
        AUTHORIZATION_TYPE,
        AUTHORIZATION_TOKEN,
        AUTHORIZATION_USER,
        AUTHORIZATION_PASSWORD,
        true,
      )

      const ddo = await nvmApp.registerServiceAsset(
        agentMetadata,
        subscriptionDid,
        // We are gonna configure the agent usage costs in a dynamic manner:
        // The cost in credits for every succesful query to the agent will be between 1 and 5 credits being 2 credits the default cost
        2n, // default cost in credits for every succesful query to the agent
        1n, // min amount of credits to be consumed
        5n, // max amount of credits to be consumed
      )

      assert.isDefined(ddo)
      const ddoFound = await nvmApp.search.byDID(ddo.id)
      assert.equal(ddo.id, ddoFound.id)
      agentDid = ddo.id
    })

    it('I want to register a Dataset', async () => {
      const datasetMetadata = NvmAppMetadata.getFileMetadataTemplate(
        'NVM App Dataset test',
        'Nevermined',
      )
      datasetMetadata.main.files = [
        {
          index: 0,
          contentType: 'application/json',
          url: 'https://storage.googleapis.com/nvm-static-assets/files/ci/ddo-example.json',
        },
        {
          index: 1,
          contentType: 'text/plain',
          url: 'https://storage.googleapis.com/nvm-static-assets/files/ci/README.md',
        },
      ]

      const ddo = await nvmApp.registerFileAsset(
        datasetMetadata,
        subscriptionDid,
        1n, // every file download costs 1 credit to the subscriber
      )

      assert.isDefined(ddo)
      const ddoFound = await nvmApp.search.byDID(ddo.id)
      assert.equal(ddo.id, ddoFound.id)
      datasetDid = ddo.id
    })

    it('I want to order a subscription', async () => {
      const orderResult = await nvmApp.orderSubscription(subscriptionDid)
      assert.isDefined(orderResult)
      assert.isTrue(orderResult.success)
      assert.isTrue(orderResult.agreementId.length > 0)
      agreementId = orderResult.agreementId
    })

    it('I want to get the token giving access to a remote agent', async () => {
      const token = await nvmApp.getServiceAccessToken(agentDid)
      assert.isDefined(token)
      assert.isTrue(token.accessToken.length > 0)
      assert.isTrue(token.neverminedProxyUri.length > 0)
    })

    it('I want to download a file asset', async () => {
      const results = await nvmApp.downloadFiles(
        datasetDid,
        agreementId,
        `/tmp/.nevermined/downloads/${datasetDid}/`,
      )

      assert.isDefined(results)
      assert.isTrue(results.success)
    })

    it('I can disconnect and still search', async () => {
      await nvmApp.disconnect()
      const results = await nvmApp.search.query({})
      assert.isTrue(results.totalResults.value > 0)
    })
  })
})
