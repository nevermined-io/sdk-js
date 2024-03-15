import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import {
  AssetPrice,
  ResourceAuthentication,
  SubscriptionToken,
  convertEthersV6SignerToAccountSigner,
  makeRandomWallet,
} from '../../src'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { NVMAppEnvironments, NvmApp } from '../../src/nevermined/NvmApp'
import { NvmAppMetadata } from '../../src/ddo/NvmAppMetadata'
import { AppDeploymentStaging } from '../../src/nevermined/resources/AppNetworks'
import { ZeroDevAccountSigner, ZeroDevEthersProvider } from '@zerodev/sdk'
import { sleep } from '@opengsn/provider'

chai.use(chaiAsPromised)

describe('E2E flow for interacting with OpenAI proxified assistants', () => {
  let nvmAppPublisher: NvmApp
  let nvmAppSubscriber: NvmApp
  let publisherAddress: string
  let subscriberAddress: string
  let subscriptionNFTAddress: string
  let subscriptionDid: string
  let agentDid: string
  let _agreementId
  let subscriptionPrice: AssetPrice
  let subscriptionPriceWithFees: AssetPrice
  let publisherAccountSigner: ZeroDevAccountSigner<'ECDSA'>
  let subscriberAccountSigner: ZeroDevAccountSigner<'ECDSA'>

  const projectId = process.env.PROJECT_ID!
  let zerodevProviderPublisher: ZeroDevEthersProvider<'ECDSA'>
  let zerodevProviderSubscriber: ZeroDevEthersProvider<'ECDSA'>

  const PROXY_URL = process.env.PROXY_URL || 'https://127.0.0.1:443'
  // Required because we are dealing with self signed certificates locally
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  // OpenAI assistant configuration
  const ASSISTANT_ID = process.env.ASSISTANT_ID || 'asst_m3hDiBSEScF4vTyeGGJ8JI8T'
  const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'
  const ASSISTANT_QUERY_URL = `${BACKEND_URL}/api/v1/workflows/assistant/${ASSISTANT_ID}/query`
  const ASSISTANT_RUN_URL = `${BACKEND_URL}/api/v1/workflows/assistant/${ASSISTANT_ID}/run/`
  const ASSISTANT_STATUS_URL = `${BACKEND_URL}/api/v1/workflows/assistant/${ASSISTANT_ID}/status`
  // const SERVICE_ENDPOINT =
  //   process.env.SERVICE_ENDPOINT ||
  //   `http://localhost:3001/api/v1/workflows/assistant/${ASSISTANT_ID}/query`
  const OPEN_API_ENDPOINT =
    process.env.OPEN_ENDPOINT || `http://localhost:3001/api/v1/rest/docs-json`
  const AUTHORIZATION_TYPE = 'bearer' as ResourceAuthentication['type']
  const AUTHORIZATION_TOKEN = process.env.AUTHORIZATION_TOKEN || 'openai_authorization_token'
  const AUTHORIZATION_USER = undefined
  const AUTHORIZATION_PASSWORD = undefined

  const QUERY_REQUEST_DATA =
    process.env.QUERY_REQUEST_DATA ||
    `{"did": "__DID__", "assistantId": "${ASSISTANT_ID}", "query": "Why Elvis was so important?", "threadId": "", file_ids: []}`
  // const RUN_REQUEST_DATA = process.env.RUN_REQUEST_DATA || `{"did": "__DID__", "assistantId": "${ASSISTANT_ID}", "query": "Why Elvis was so important?", "threadId": "", file_ids: []}`

  let subscriptionToken: SubscriptionToken

  before(async () => {
    const owner = makeRandomWallet()
    const subscriber = makeRandomWallet()

    zerodevProviderPublisher = await ZeroDevEthersProvider.init('ECDSA', {
      projectId,
      owner: convertEthersV6SignerToAccountSigner(owner),
    })

    zerodevProviderSubscriber = await ZeroDevEthersProvider.init('ECDSA', {
      projectId,
      owner: convertEthersV6SignerToAccountSigner(subscriber),
    })

    const contractABI = await TestContractHandler.getABIArtifact(
      `NFT1155SubscriptionUpgradeable.arbitrum-sepolia`,
      './artifacts/',
    )

    subscriptionNFTAddress = contractABI.address
    console.debug(`Using ERC-1155 Subscription NFT on address: ${subscriptionNFTAddress}`)

    publisherAccountSigner = zerodevProviderPublisher.getAccountSigner()
    publisherAddress = await publisherAccountSigner.getAddress()

    subscriberAccountSigner = zerodevProviderSubscriber.getAccountSigner()
    subscriberAddress = await subscriberAccountSigner.getAddress()

    // Using USDC token address
    // WARN: Make sure the subscriber account has balance to pay the gas and the subscription
    subscriptionPrice = new AssetPrice(publisherAddress, 0n).setTokenAddress(
      new AppDeploymentStaging().tokenAddress,
    )
  })

  describe('PUBLISHER: As a OpenAI developer I want to monetize my assistant', () => {
    it('As Publisher I want to connect my account', async () => {
      nvmAppPublisher = await NvmApp.getInstance(NVMAppEnvironments.Staging, {
        artifactsFolder: './artifacts',
      })

      assert.isFalse(nvmAppPublisher.isWeb3Connected())

      console.log(`Publisher address: ${publisherAddress}`)
      await nvmAppPublisher.connect(publisherAccountSigner)

      assert.isTrue(nvmAppPublisher.isWeb3Connected())
    })

    it('I can calculate and include network fees', async () => {
      subscriptionPriceWithFees = nvmAppPublisher.addNetworkFee(subscriptionPrice)
      console.log(`Asset Price with fees: ${subscriptionPriceWithFees.toString()}`)

      assert.isTrue(nvmAppPublisher.isNetworkFeeIncluded(subscriptionPriceWithFees))
    })

    it('I want to create a credits subscription', async () => {
      const creditsSubscriptionMetadata = NvmAppMetadata.getCreditsSubscriptionMetadataTemplate(
        'Assistants Credits Subscription test',
        'Nevermined',
      )

      const ddo = await nvmAppPublisher.createCreditsSubscription(
        creditsSubscriptionMetadata,
        subscriptionPrice,
        5000n, // number of credits
      )

      assert.isDefined(ddo)
      const ddoFound = await nvmAppPublisher.search.byDID(ddo.id)
      assert.equal(ddo.id, ddoFound.id)
      subscriptionDid = ddo.id
    })

    it('Before publishing it, I can check the assistant is okay', async function () {
      console.log(`Query assistant status endpoint: ${ASSISTANT_STATUS_URL}`)
      const opts: RequestInit = {}
      opts.headers = {
        authorization: `Bearer ${AUTHORIZATION_TOKEN}`, // Using OpenAI API Key here
      }
      console.log(`Options: ${JSON.stringify(opts)}`)
      const result = await fetch(ASSISTANT_STATUS_URL, opts)

      assert.isTrue(result.ok)
      assert.isTrue(result.status === 200)
    })

    it('I want to register an Assistant', async () => {
      const agentMetadata = NvmAppMetadata.getServiceMetadataTemplate(
        'Nevermined Assistant',
        'Nevermined Corp',
        [{ POST: `${ASSISTANT_QUERY_URL}` }, { POST: `${ASSISTANT_RUN_URL}(.*)` }],
        [ASSISTANT_STATUS_URL],
        OPEN_API_ENDPOINT,
        'RESTful',
        AUTHORIZATION_TYPE,
        AUTHORIZATION_TOKEN,
        AUTHORIZATION_USER,
        AUTHORIZATION_PASSWORD,
        false,
      )
      agentMetadata.additionalInformation.customData = {
        ...agentMetadata.additionalInformation.customData,
        agentType: 'assistant',
        provider: 'openai',
        assistantId: ASSISTANT_ID,
      }

      const ddo = await nvmAppPublisher.registerServiceAsset(
        agentMetadata,
        subscriptionDid,
        // We are gonna configure the agent usage costs in a dynamic manner:
        // The cost in credits for every succesful query to the agent will be between 1 and 5 credits being 2 credits the default cost
        2n, // default cost in credits for every succesful query to the agent
        1n, // min amount of credits to be consumed
        5n, // max amount of credits to be consumed
      )

      assert.isDefined(ddo)
      const ddoFound = await nvmAppPublisher.search.byDID(ddo.id)
      assert.equal(ddo.id, ddoFound.id)
      agentDid = ddo.id

      console.log(`Assistant registered with DID: ${agentDid}`)
    })

    it('I can disconnect', async () => {
      await nvmAppPublisher.disconnect()
      const results = await nvmAppPublisher.search.query({})
      assert.isTrue(results.totalResults.value > 0)
    })
  })

  describe('SUBSCRIBER: As a subscriber I want to order and use an Assistant', () => {
    let queryResponse
    let runResponse

    it('As Subscriber I want to connect too', async () => {
      nvmAppSubscriber = await NvmApp.getInstance(NVMAppEnvironments.Staging, {
        artifactsFolder: './artifacts',
      })

      console.log(`Subscriber address: ${subscriberAddress}`)
      await nvmAppSubscriber.connect(subscriberAccountSigner)

      assert.isTrue(nvmAppSubscriber.isWeb3Connected())
    })

    it('I want to order a subscription', async () => {
      if (process.env.AGENT_DID && process.env.SUBSCRIPTION_DID) {
        agentDid = process.env.AGENT_DID
        subscriptionDid = process.env.SUBSCRIPTION_DID
        console.log(`Using Subscription DID from ENV variable: ${subscriptionDid}`)
        console.log(`Using Agent DID from ENV variable: ${agentDid}`)
      }

      const orderResult = await nvmAppSubscriber.orderSubscription(subscriptionDid)
      assert.isDefined(orderResult)
      assert.isTrue(orderResult.success)
      assert.isTrue(orderResult.agreementId.length > 0)
      _agreementId = orderResult.agreementId
    })

    it('I want to get the token giving access to a remote agent', async () => {
      subscriptionToken = await nvmAppSubscriber.getServiceAccessToken(agentDid)
      assert.isDefined(subscriptionToken)
      assert.isTrue(subscriptionToken.accessToken.length > 0)
      assert.isTrue(subscriptionToken.neverminedProxyUri.length > 0)

      console.log(`Proxy Url: ${subscriptionToken.neverminedProxyUri}`)
      console.log(`Token: ${subscriptionToken.accessToken}`)
    })

    it('I want make an Assistant query through the proxy', async () => {
      const url = new URL(ASSISTANT_QUERY_URL)
      const proxyEndpoint = `${PROXY_URL}${url.pathname}`

      const opts: RequestInit = {}
      opts.method = 'POST'
      const query = QUERY_REQUEST_DATA.replace('__DID__', agentDid)
      opts.body = JSON.stringify(JSON.parse(query))
      opts.headers = {
        // The proxy expects the `HTTP Authorization` header with the JWT
        authorization: `Bearer ${subscriptionToken.accessToken}`,
        'content-type': 'application/json',
      }

      console.debug(JSON.stringify(opts))
      console.log(`Proxy Endpoint: ${proxyEndpoint}`)
      console.debug(JSON.stringify(opts))

      const result = await fetch(proxyEndpoint, opts)
      queryResponse = await result.text()
      console.debug(` ${result.status} - ${queryResponse}`)

      assert.isTrue(result.ok)
      assert.isTrue(result.status === 200 || result.status === 201)
    })

    it('I want make an Assistant query through the proxy', async () => {
      if (!queryResponse) {
        assert.fail('Query response is empty')
      }

      console.log(`Waiting for Job to be executed. Sleeping for 10 seconds...\n\n`)
      await sleep(10_000)

      const queryObj = JSON.parse(queryResponse)
      const url = new URL(`${ASSISTANT_RUN_URL}${queryObj.runId}`)
      const proxyEndpoint = `${PROXY_URL}${url.pathname}`

      const runBody = {
        runId: queryObj.runId,
        did: agentDid,
        threadId: queryObj.threadId,
        messageId: queryObj.messageId,
      }

      const opts: RequestInit = {}
      opts.method = 'POST'
      opts.body = JSON.stringify(runBody)
      opts.headers = {
        // The proxy expects the `HTTP Authorization` header with the JWT
        authorization: `Bearer ${subscriptionToken.accessToken}`,
        'content-type': 'application/json',
      }

      console.debug(JSON.stringify(opts))
      console.log(`Proxy Endpoint: ${proxyEndpoint}`)
      console.debug(JSON.stringify(opts))

      const result = await fetch(proxyEndpoint, opts)
      runResponse = await result.text()
      console.debug(` ${result.status} - ${runResponse}`)

      assert.isTrue(result.ok)
      assert.isTrue(result.status === 200 || result.status === 201)
    })

    it('I can disconnect', async () => {
      await nvmAppSubscriber.disconnect()
      const results = await nvmAppSubscriber.search.query({})
      assert.isTrue(results.totalResults.value > 0)
    })
  })
})
