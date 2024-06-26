import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import config from '../../test/config'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { NvmAccount } from '../../src/models/NvmAccount'
import { DDO } from '../../src/ddo/DDO'
import { AssetPrice } from '../../src/models/AssetPrice'
import { getRoyaltyAttributes, RoyaltyAttributes } from '../../src/nevermined/api/AssetsApi'
import {
  PublishMetadataOptions,
  PublishOnChainOptions,
  RoyaltyKind,
} from '../../src/types/MetadataTypes'
import { NFTAttributes } from '../../src/models/NFTAttributes'
import { Token } from '../../src/keeper/contracts/Token'
import { EscrowPaymentCondition, TransferNFTCondition } from '../../src/keeper/contracts/conditions'
import { MetaData, ResourceAuthentication } from '../../src/types/DDOTypes'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { EventOptions } from '../../src/types/EventTypes'
import { didZeroX } from '../../src/utils/ConversionTypeHelpers'
import { getChecksumAddress } from '../../src/nevermined/utils/BlockchainViemUtils'
import { RequestInit } from 'node-fetch'
import fetch from 'node-fetch'
import { sleep } from '../utils/utils'
import { NvmAppMetadata } from '../../src/ddo/NvmAppMetadata'
import { NFT1155Api } from '../../src/nevermined/api/nfts/NFT1155Api'
import { SubscriptionCreditsNFTApi } from '../../src/nevermined/api/nfts/SubscriptionCreditsNFTApi'
import { DID } from '../../src/nevermined/DID'
import { NeverminedNFT1155Type } from '../../src/types/GeneralTypes'
import { skip } from 'node:test'

describe('Gate-keeping of Web Services using NFT ERC-1155 End-to-End', () => {
  let publisher: NvmAccount
  let subscriber: NvmAccount
  let reseller: NvmAccount

  let nevermined: Nevermined
  let token: Token
  let escrowPaymentCondition: EscrowPaymentCondition
  let transferNftCondition: TransferNFTCondition
  let subscriptionDDO: DDO
  let serviceDDO: DDO

  let agreementId: string

  // Configuration of First Sale:
  // Editor -> Subscriber, the Reseller get a cut (25%)
  let subscriptionPrice = 20n
  let amounts = [15n, 5n]
  let receivers: string[]
  let assetPrice: AssetPrice
  let royaltyAttributes: RoyaltyAttributes

  let subscriptionMetadata: MetaData
  let serviceMetadata: MetaData

  const preMint = false
  const royalties = 0
  const nftTransfer = false
  const subscriptionDuration = 1000 // in blocks
  const subscriptionCredits = 10n // How much credits are giving purchasing the subscription
  const costServiceInCredits = 10n // How many credits cost every access to the service
  const maxCreditsToCharge = 10n
  const minCreditsToCharge = 10n

  // The service to register into Nevermined and attach to a subscription
  const SERVICE_ENDPOINT = process.env.SERVICE_ENDPOINT || 'http://127.0.0.1:3005'

  // The path of the SERVICE_ENDPOINT open that can be accessed via Proxy without authentication
  const OPEN_PATH = process.env.OPEN_PATH || '/openapi.json'

  const SKIP_OPEN_ENDPOINT = process.env.SKIP_OPEN_ENDPOINT === 'true'

  // The URL of the OPEN API endpoint that can be accessed via Proxy without authentication
  const OPEN_ENDPOINT = process.env.OPEN_ENDPOINT || `${SERVICE_ENDPOINT}${OPEN_PATH}`

  // We separate how the authorization of the service is done.
  // If oauth or bearer we will use the AUTHORIZATION_TOKEN env
  // If basic we will use the AUTHORIZATION_USER and AUTHORIZATION_PASSWORD envs
  const AUTHORIZATION_TYPE = (process.env.AUTHORIZATION_TYPE ||
    'bearer') as ResourceAuthentication['type']

  // The http authorization bearer token required by the service
  const AUTHORIZATION_TOKEN = process.env.AUTHORIZATION_TOKEN || 'new_authorization_token'

  // If the Authe
  const AUTHORIZATION_USER = process.env.AUTHORIZATION_USER || 'user'

  const AUTHORIZATION_PASSWORD = process.env.AUTHORIZATION_PASSWORD || 'password'

  // The NVM proxy that will be used to authorize the service requests
  const PROXY_URL = process.env.PROXY_URL || 'http://127.0.0.1:3128'

  // Required because we are dealing with self signed certificates locally
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  // let proxyAgent
  const opts: RequestInit = {}

  let initialBalances: any
  let scale: bigint

  let subscriptionNFT: NFT1155Api
  let neverminedNodeAddress

  let payload: JWTPayload

  let accessToken: string

  before(async () => {
    TestContractHandler.setConfig(config)

    nevermined = await Nevermined.getInstance(config)
    ;[, publisher, subscriber, , reseller] = nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)
    payload = decodeJwt(config.marketplaceAuthToken)

    neverminedNodeAddress = await nevermined.services.node.getProviderAddress()

    // conditions
    ;({ escrowPaymentCondition, transferNftCondition } = nevermined.keeper.conditions)

    // components
    ;({ token } = nevermined.keeper)

    scale = 10n ** BigInt(await token.decimals())

    subscriptionPrice = subscriptionPrice * scale
    amounts = amounts.map((v) => v * scale)
    receivers = [publisher.getId(), reseller.getId()]
    assetPrice = new AssetPrice(
      new Map([
        [receivers[0], amounts[0]],
        [receivers[1], amounts[1]],
      ]),
    ).setTokenAddress(token.address)

    royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, royalties)

    initialBalances = {
      editor: await token.balanceOf(publisher.getId()),
      subscriber: await token.balanceOf(subscriber.getId()),
      reseller: await token.balanceOf(reseller.getId()),
      escrowPaymentCondition: Number(await token.balanceOf(escrowPaymentCondition.address)),
    }

    console.log(`USING CONFIG:`)
    console.log(`  PROXY_URL=${PROXY_URL}`)
    console.log(`  SERVICE_ENDPOINT=${SERVICE_ENDPOINT}`)
    console.log(`  OPEN_ENDPOINT=${OPEN_ENDPOINT}`)
    console.log(`  AUTHORIZATION_TYPE=${AUTHORIZATION_TYPE}`)
    if (AUTHORIZATION_TYPE === 'oauth' || AUTHORIZATION_TYPE === 'bearer')
      console.log(`  AUTHORIZATION_TOKEN=${AUTHORIZATION_TOKEN}`)
    else {
      console.log(`  AUTHORIZATION_USER=${AUTHORIZATION_USER}`)
      console.log(`  AUTHORIZATION_PASSWORD=${AUTHORIZATION_PASSWORD}`)
    }
    console.log(`  REQUEST_DATA=${process.env.REQUEST_DATA}`)
  })

  describe('As Subscriber I want to get access to a web service I am not subscribed', () => {
    it('The subscriber can not access the service endpoints because does not have a subscription yet', async () => {
      const result = await fetch(SERVICE_ENDPOINT, opts)

      assert.isFalse(result.ok)
      assert.isTrue(result.status >= 400)
    })
  })

  describe('As Publisher I want to register new web service and provide access via subscriptions to it', () => {
    it('I want to register a subscription NFT that gives access to a web service to the holders', async () => {
      // Deploy NFT
      TestContractHandler.setConfig(config)

      const contractABI = await TestContractHandler.getABIArtifact(
        'NFT1155SubscriptionUpgradeable',
        './artifacts/',
        await nevermined.keeper.getNetworkName(),
      )

      subscriptionNFT = await SubscriptionCreditsNFTApi.deployInstance(
        config,
        contractABI,
        publisher,
        [
          publisher.getId(),
          nevermined.keeper.didRegistry.address,
          'Subscription Service NFT1155',
          'NVM',
          '',
          nevermined.keeper.nvmConfig.address,
        ] as any,
      )

      await nevermined.contracts.loadNft1155(subscriptionNFT.address)

      await subscriptionNFT.grantOperatorRole(transferNftCondition.address, publisher)

      const isOperator = await subscriptionNFT.getContract.isOperator(transferNftCondition.address)
      assert.isTrue(isOperator)

      subscriptionMetadata = NvmAppMetadata.getCreditsSubscriptionMetadataTemplate(
        'NVM App Credits Subscription test',
        'Nevermined',
      )

      const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({
        metadata: subscriptionMetadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: assetPrice,
            nft: {
              duration: subscriptionDuration,
              amount: subscriptionCredits,
              nftTransfer,
            },
          },
        ],
        providers: [neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint,
        royaltyAttributes: royaltyAttributes,
      })
      subscriptionDDO = await nevermined.nfts1155.create(nftAttributes, publisher)
      console.log(`Subscription registered with DID: ${subscriptionDDO.id}`)
      assert.isDefined(subscriptionDDO)
    })

    it('I want to register a new web service and tokenize (via NFT)', async () => {
      serviceMetadata = NvmAppMetadata.getServiceMetadataTemplate(
        'Nevermined Web Service Metadata',
        'Nevermined',
        [{ POST: `${SERVICE_ENDPOINT}(.*)` }, { POST: `http://tijuana(.*)` }],
        [OPEN_ENDPOINT],
        OPEN_ENDPOINT,
        'RESTful',
        AUTHORIZATION_TYPE,
        AUTHORIZATION_TOKEN,
        AUTHORIZATION_USER,
        AUTHORIZATION_PASSWORD,
        false,
      )

      serviceMetadata.userId = payload.sub

      console.log(`Registering service with metadata: ${JSON.stringify(serviceMetadata)}`)

      const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({
        metadata: serviceMetadata,
        services: [
          {
            serviceType: 'nft-access',
            nft: {
              tokenId: subscriptionDDO.shortId(),
              duration: 0, // Doesnt expire
              amount: costServiceInCredits, // The cost of accessing the service
              maxCreditsToCharge,
              minCreditsToCharge,
              nftTransfer,
            },
          },
        ],
        providers: [neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint,
        royaltyAttributes: royaltyAttributes,
      })
      serviceDDO = await nevermined.nfts1155.create(nftAttributes, publisher, {
        metadata: PublishMetadataOptions.OnlyMetadataAPI,
        did: PublishOnChainOptions.DIDRegistry,
      })
      console.log(`Using NFT contract address: ${subscriptionNFT.address}`)
      console.log(`Service registered with DID: ${serviceDDO.id}`)
      assert.isDefined(serviceDDO)
    })
  })

  describe('As random user I want to get access to the OPEN endpoints WITHOUT a subscription', () => {
    it('The user can access the open service endpoints directly', async () => {
      if (SKIP_OPEN_ENDPOINT) {
        console.log(`Skipping Open Endpoints test because SKIP_OPEN_ENDPOINT is set to true`)
        skip()
      }
      console.log(`Using Open Endpoint: ${OPEN_ENDPOINT}`)

      const result = await fetch(OPEN_ENDPOINT, opts)

      assert.isTrue(result.ok)
      assert.isTrue(result.status === 200)
    })

    it('The subscriber can access the open service endpoints through the proxy', async () => {
      if (SKIP_OPEN_ENDPOINT) {
        console.log(`Skipping Open Endpoints test because SKIP_OPEN_ENDPOINT is set to true`)
        skip()
      }

      const proxyUrl = new URL(PROXY_URL)
      const serviceDID = DID.parse(serviceDDO.id)
      const subdomain = serviceDID.getEncoded()

      const OPEN_PROXY_URL = `${proxyUrl.protocol}//${subdomain}.${proxyUrl.host}${OPEN_PATH}`

      console.log(`Using Proxied Open Endpoint: ${OPEN_PROXY_URL} for DID: ${serviceDDO.id}`)

      const didFromEncoded = DID.fromEncoded(subdomain)

      console.log(`DID from encoded: ${didFromEncoded.getDid()}`)

      const result = await fetch(OPEN_PROXY_URL, opts)

      assert.isTrue(result.ok)
      assert.isTrue(result.status === 200)
    })
  })

  describe('As a Subscriber I want to get access to a web service', () => {
    it('I check the details of the subscription NFT', async () => {
      const details = await nevermined.nfts1155.details(subscriptionDDO.id)
      assert.equal(details.owner, publisher.getId())
    })

    it('I am ordering the subscription NFT', async () => {
      await nevermined.accounts.requestTokens(subscriber, subscriptionPrice / scale)

      const subscriberBalanceBefore = await token.balanceOf(subscriber.getId())
      assert.equal(subscriberBalanceBefore, initialBalances.subscriber + subscriptionPrice)

      console.log(`Subscriber balance before: ${subscriberBalanceBefore}`)

      agreementId = await nevermined.nfts1155.order(
        subscriptionDDO.id,
        subscriptionCredits,
        subscriber,
      )

      assert.isDefined(agreementId)

      const subscriberBalanceAfter = await token.balanceOf(subscriber.getId())

      console.log(`Subscriber balance after: ${subscriberBalanceAfter}`)

      assert.isTrue(subscriberBalanceAfter < subscriberBalanceBefore)
    })

    it('The Publisher can check the payment and transfer the NFT to the Subscriber', async () => {
      // Let's use the Node to mint the subscription and release the payments

      const receipt = await nevermined.nfts1155.claim(
        agreementId,
        publisher.getId(),
        subscriber.getId(),
        subscriptionCredits,
      )
      assert.isTrue(receipt)
    })

    it('the Publisher and reseller can receive their payment', async () => {
      const receiver0Balance = await token.balanceOf(assetPrice.getReceivers()[0])
      const receiver1Balance = await token.balanceOf(assetPrice.getReceivers()[1])

      assert.equal(receiver0Balance, initialBalances.editor + assetPrice.getAmounts()[0])
      assert.equal(receiver1Balance, initialBalances.reseller + assetPrice.getAmounts()[1])
    })

    it('the subscription can be checked on chain', async () => {
      const eventOptions: EventOptions = {
        eventName: 'Fulfilled',
        filterSubgraph: {
          where: {
            _did: didZeroX(subscriptionDDO.id),
            _receiver: subscriber.getId(),
          },
        },
        filterJsonRpc: {
          _did: didZeroX(subscriptionDDO.id),
          _receiver: subscriber.getId(),
        },
        result: {
          _agreementId: true,
          _did: true,
          _receiver: true,
        },
      }
      // wait for the event to be picked by the subgraph
      await nevermined.keeper.conditions.transferNftCondition.events.once((e) => e, eventOptions)
      const [event] = await nevermined.keeper.conditions.transferNftCondition.events.getPastEvents(
        eventOptions,
      )

      // subgraph event or json-rpc event?
      const eventValues = event.args || event

      assert.equal(eventValues._agreementId, agreementId)
      assert.equal(eventValues._did, didZeroX(subscriptionDDO.id))

      // thegraph stores the addresses in lower case
      assert.equal(getChecksumAddress(eventValues._receiver), subscriber.getId())
    })

    it('The publisher can access the service endpoints available', async () => {
      const response = await nevermined.nfts1155.getSubscriptionToken(serviceDDO.id, publisher)
      const publisherAccessToken = response.accessToken

      assert.isDefined(publisherAccessToken)

      if (process.env.REQUEST_DATA) {
        opts.method = 'POST'
        opts.body = JSON.stringify(JSON.parse(process.env.REQUEST_DATA))
      }

      opts.headers = {
        // The proxy expects the `HTTP Authorization` header with the JWT
        authorization: `Bearer ${publisherAccessToken}`,
        'content-type': 'application/json',
        // Host header is not required anymore from the proxy, it picks this up from the JWT
        // host: url.port ? url.hostname.concat(`:${url.port}`) : url.hostname,
      }

      console.debug(JSON.stringify(opts))
      console.log(`Proxy Endpoint: ${response.neverminedProxyUri} but using ${PROXY_URL}`)
      const result = await fetch(PROXY_URL, opts)

      console.debug(` ${result.status} - ${await result.text()}`)

      assert.isTrue(result.ok)
      assert.equal(result.status, 200)
    })
  })

  describe('As a subscriber I want to get an access token for the web service', () => {
    it('Nevermined One issues an access token', async () => {
      const response = await nevermined.nfts1155.getSubscriptionToken(serviceDDO.id, subscriber)
      accessToken = response.accessToken

      assert.isDefined(accessToken)
    })
  })

  describe('As Subscriber I want to get access to the web service as part of my subscription', () => {
    let creditsBalanceBefore: bigint
    const url = new URL(SERVICE_ENDPOINT)
    const proxyEndpoint = `${PROXY_URL}${url.pathname}`

    it('As subscriber I can see my credits balance', async () => {
      creditsBalanceBefore = await subscriptionNFT.balance(subscriptionDDO.id, subscriber.getId())

      console.log(`Credits balance before: ${creditsBalanceBefore}`)
      assert.equal(creditsBalanceBefore, subscriptionCredits)
    })

    it('The subscriber access the service endpoints available', async () => {
      if (process.env.REQUEST_DATA) {
        opts.method = 'POST'
        opts.body = JSON.stringify(JSON.parse(process.env.REQUEST_DATA))
      }

      opts.headers = {
        // The proxy expects the `HTTP Authorization` header with the JWT
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
        // Host header is not required anymore from the proxy, it picks this up from the JWT
        // host: url.port ? url.hostname.concat(`:${url.port}`) : url.hostname,
      }

      console.debug(JSON.stringify(opts))
      console.log(`Proxy Endpoint: ${proxyEndpoint}`)
      const result = await fetch(proxyEndpoint, opts)

      console.debug(` ${result.status} - ${await result.text()}`)

      assert.isTrue(result.ok)
      assert.equal(result.status, 200)
    })

    it('As subscriber I can see my credits are burned after accessing the service', async () => {
      console.log(`Waiting 5 seconds to check the credits are burned`)
      await sleep(5000)

      const creditsBalanceAfter = await subscriptionNFT.balance(
        subscriptionDDO.id,
        subscriber.getId(),
      )

      console.log(`Credits balance after: ${creditsBalanceAfter}`)
      assert.isTrue(creditsBalanceBefore > creditsBalanceAfter)
    })

    it('After the credits are burned, I can not access to the service anymore', async () => {
      if (process.env.REQUEST_DATA_2) {
        opts.method = 'POST'
        opts.body = JSON.stringify(JSON.parse(process.env.REQUEST_DATA_2))
      }

      // console.debug(JSON.stringify(opts))
      const result = await fetch(proxyEndpoint, opts)

      console.debug(` ${result.status} - ${await result.text()}`)

      assert.isFalse(result.ok)
      assert.notEqual(result.status, 200)
    })
  })

  describe.skip('As a user I want to be able to search DDOs by subscriptions', () => {
    const endpointsFilter = [
      {
        nested: {
          path: ['service'],
          query: {
            bool: {
              filter: [
                { match: { 'service.type': 'metadata' } },
                {
                  match: {
                    'service.attributes.main.webService.openEndpoints': '/openapi.json',
                  },
                },
              ],
            },
          },
        },
      },
    ]

    const endpointsFilter2 = [
      {
        nested: {
          path: ['service'],
          query: {
            bool: {
              filter: [
                { match: { 'service.type': 'metadata' } },
                {
                  match: {
                    'service.attributes.main.webService.openEndpoints': '/nvm.json',
                  },
                },
              ],
            },
          },
        },
      },
    ]

    it('should be able to retrieve the subscriptionDDO by contractAddress', async () => {
      const result = await nevermined.search.bySubscriptionContractAddress(
        subscriptionNFT.address,
        NeverminedNFT1155Type.nft1155Credit,
      )
      assert.equal(result.totalResults.value, 1)
    })

    it('should be able to retrieve subscriptions created', async () => {
      const result = await nevermined.search.subscriptionsCreated(publisher)
      assert.isAbove(result.totalResults.value, 1)

      const dids = result.results.map((ddo) => ddo.id)
      assert.include(dids, subscriptionDDO.id)
    })

    it('should be able to retrieve subscriptions purchased', async () => {
      const result = await nevermined.search.subscriptionsPurchased(
        subscriber,
        NeverminedNFT1155Type.nft1155Credit,
        1155,
      )
      assert.isAbove(result.totalResults.value, 1)

      const dids = result.results.map((ddo) => ddo.id)
      assert.include(dids, subscriptionDDO.id)
    })

    it('should be able to retrieve all services associated with a subscription', async () => {
      const result = await nevermined.search.servicesBySubscription(subscriptionDDO.id)
      assert.equal(result.totalResults.value, 1)

      const ddo = result.results.pop()
      assert.equal(ddo?.id, serviceDDO.id)
    })

    it('should be able to retrieve services associated with a subscription filtering by endpoints', async () => {
      const result = await nevermined.search.servicesBySubscription(
        subscriptionDDO.id,
        NeverminedNFT1155Type.nft1155Credit,
        endpointsFilter,
      )
      assert.equal(result.totalResults.value, 1)

      assert.isTrue(
        result.results?.every((r) =>
          // @ts-ignore
          r
            .findServiceByType('metadata')
            .attributes.main.webService.openEndpoints.some((e) => e.includes('.json')),
        ),
      )
    })

    it('should not be able to retrieve any services associated with a subscription filtering by endpoints which do not exist', async () => {
      const result = await nevermined.search.servicesBySubscription(
        subscriptionDDO.id,
        NeverminedNFT1155Type.nft1155Credit,
        endpointsFilter2,
      )
      assert.equal(result.totalResults.value, 0)
    })
  })
})
