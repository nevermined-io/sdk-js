import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import {
  Account,
  DDO,
  MetaData,
  Nevermined,
  AssetPrice,
  NFTAttributes,
  ResourceAuthentication,
} from '../../src'
import { EscrowPaymentCondition, TransferNFT721Condition, Token } from '../../src/keeper'
import { config } from '../config'
import { generateWebServiceMetadata, getMetadata } from '../utils'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { ethers } from 'ethers'
import { BigNumber } from '../../src/utils'
import { didZeroX } from '../../src/utils'
import { EventOptions } from '../../src/events'
import {
  getRoyaltyAttributes,
  RoyaltyAttributes,
  RoyaltyKind,
  NFT721Api,
  SubscriptionNFTApi,
  DID,
} from '../../src/nevermined'
import { RequestInit } from 'node-fetch'
import fetch from 'node-fetch'
import { sleep } from '../utils/utils'

describe('Gate-keeping of Web Services using NFT ERC-721 End-to-End', () => {
  let publisher: Account
  let subscriber: Account
  let reseller: Account

  let nevermined: Nevermined
  let token: Token
  let escrowPaymentCondition: EscrowPaymentCondition
  let transferNft721Condition: TransferNFT721Condition
  let subscriptionDDO: DDO
  let serviceDDO: DDO

  let agreementId: string

  // Configuration of First Sale:
  // Editor -> Subscriber, the Reseller get a cut (25%)
  let subscriptionPrice = BigNumber.from(20)
  let amounts = [BigNumber.from(15), BigNumber.from(5)]
  let receivers: string[]
  let assetPrice: AssetPrice
  let royaltyAttributes: RoyaltyAttributes

  let subscriptionMetadata: MetaData
  let serviceMetadata: MetaData

  const preMint = false
  const royalties = 0
  const nftTransfer = false
  const subscriptionDuration = 1000 // in blocks

  // The service to register into Nevermined and attach to a subscription
  const SERVICE_ENDPOINT = process.env.SERVICE_ENDPOINT || 'http://127.0.0.1:3000'

  // The path of the SERVICE_ENDPOINT open that can be accessed via Proxy without authentication
  const OPEN_PATH = process.env.OPEN_PATH || '/openapi.json'

  const SKIP_OPEN_ENDPOINT = process.env.SKIP_OPEN_ENDPOINT === 'true'

  // The URL of the OPEN API endpoint that can be accessed via Proxy without authentication
  const OPEN_ENDPOINT = process.env.OPEN_ENDPOINT || `${SERVICE_ENDPOINT}${OPEN_PATH}`

  // We separate how the authorization of the service is done.
  // If oauth we will use the AUTHORIZATION_TOKEN env
  // If basic we will use the AUTHORIZATION_USER and AUTHORIZATION_PASSWORD envs
  const AUTHORIZATION_TYPE = (process.env.AUTHORIZATION_TYPE ||
    'oauth') as ResourceAuthentication['type']

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
  let scale: BigNumber

  // let nft: ethers.Contract
  let subscriptionNFT: NFT721Api
  let neverminedNodeAddress

  let payload: JWTPayload

  let accessToken: string

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

  before(async () => {
    TestContractHandler.setConfig(config)

    nevermined = await Nevermined.getInstance(config)
    ;[, publisher, subscriber, , reseller] = await nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)
    payload = decodeJwt(config.marketplaceAuthToken)

    neverminedNodeAddress = await nevermined.services.node.getProviderAddress()

    // conditions
    ;({ escrowPaymentCondition, transferNft721Condition } = nevermined.keeper.conditions)

    // components
    ;({ token } = nevermined.keeper)

    scale = BigNumber.from(10).pow(await token.decimals())

    subscriptionPrice = subscriptionPrice.mul(scale)
    amounts = amounts.map((v) => v.mul(scale))
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
      escrowPaymentCondition: Number(await token.balanceOf(escrowPaymentCondition.getAddress())),
    }

    console.log(`USING CONFIG:`)
    console.log(`  PROXY_URL=${PROXY_URL}`)
    console.log(`  SERVICE_ENDPOINT=${SERVICE_ENDPOINT}`)
    console.log(`  OPEN_ENDPOINT=${OPEN_ENDPOINT}`)
    console.log(`  AUTHORIZATION_TYPE=${AUTHORIZATION_TYPE}`)
    if (AUTHORIZATION_TYPE === 'oauth') console.log(`  AUTHORIZATION_TOKEN=${AUTHORIZATION_TOKEN}`)
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

      const contractABI = await TestContractHandler.getABI(
        'NFT721SubscriptionUpgradeable',
        './test/resources/artifacts/',
      )
      subscriptionNFT = await SubscriptionNFTApi.deployInstance(config, contractABI, publisher, [
        publisher.getId(),
        nevermined.keeper.didRegistry.getAddress(),
        'Subscription Service NFT',
        '',
        '',
        0,
      ])

      await nevermined.contracts.loadNft721Api(subscriptionNFT)

      await subscriptionNFT.grantOperatorRole(transferNft721Condition.address, publisher)

      const isOperator = await subscriptionNFT.getContract.isOperator(
        transferNft721Condition.address,
      )
      assert.isTrue(isOperator)

      subscriptionMetadata = getMetadata(undefined, 'Service Subscription NFT')
      subscriptionMetadata.main.type = 'subscription'
      const nftAttributes = NFTAttributes.getSubscriptionInstance({
        metadata: subscriptionMetadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: assetPrice,
            nft: {
              duration: subscriptionDuration,
              nftTransfer,
            },
          },
        ],
        providers: [neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint,
        royaltyAttributes: royaltyAttributes,
      })
      subscriptionDDO = await nevermined.nfts721.create(nftAttributes, publisher)
      console.log(`Subscription registered with DID: ${subscriptionDDO.id}`)
      assert.isDefined(subscriptionDDO)
    })

    it('I want to register a new web service and tokenize (via NFT)', async () => {
      serviceMetadata = generateWebServiceMetadata(
        'Nevermined Web Service Metadata',
        // regex to match the service endpoints
        // works with: https://www.npmjs.com/package/path-to-regexp
        // Example of regex: `https://api.openai.com/v1/(.*)`,
        `${SERVICE_ENDPOINT}(.*)`,
        [OPEN_ENDPOINT],
        AUTHORIZATION_TYPE,
        AUTHORIZATION_TOKEN,
        AUTHORIZATION_USER,
        AUTHORIZATION_PASSWORD,
      ) as MetaData
      serviceMetadata.userId = payload.sub

      console.log(`Registering service with metadata: ${JSON.stringify(serviceMetadata)}`)

      const nftAttributes = NFTAttributes.getNFT721Instance({
        metadata: serviceMetadata,
        services: [
          {
            serviceType: 'nft-access',
            nft: {
              nftTransfer,
            },
          },
        ],
        providers: [neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint,
        royaltyAttributes: royaltyAttributes,
      })
      serviceDDO = await nevermined.nfts721.create(nftAttributes, publisher)
      console.log(`Using NFT contract address: ${subscriptionNFT.address}`)
      console.log(`Service registered with DID: ${serviceDDO.id}`)
      assert.isDefined(serviceDDO)
    })
  })

  describe('As random user I want to get access to the OPEN endpoints WITHOUT a subscription', () => {
    it('The user can access the open service endpoints directly', async function () {
      if (SKIP_OPEN_ENDPOINT) {
        console.log(`Skipping Open Endpoints test because SKIP_OPEN_ENDPOINT is set to true`)
        this.skip()
      }
      console.log(`Using Open Endpoint: ${OPEN_ENDPOINT}`)

      const result = await fetch(OPEN_ENDPOINT, opts)

      assert.isTrue(result.ok)
      assert.isTrue(result.status === 200)
    })

    it('The subscriber can access the open service endpoints through the proxy', async function () {
      if (SKIP_OPEN_ENDPOINT) {
        console.log(`Skipping Open Endpoints test because SKIP_OPEN_ENDPOINT is set to true`)
        this.skip()
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
      const details = await nevermined.nfts721.details(subscriptionDDO.id)
      assert.equal(details.owner, publisher.getId())
    })

    it('I am ordering the subscription NFT', async () => {
      await subscriber.requestTokens(subscriptionPrice.div(scale))

      const subscriberBalanceBefore = await token.balanceOf(subscriber.getId())
      assert.isTrue(subscriberBalanceBefore.eq(initialBalances.subscriber.add(subscriptionPrice)))

      agreementId = await nevermined.nfts721.order(subscriptionDDO.id, subscriber)

      assert.isDefined(agreementId)

      const subscriberBalanceAfter = await token.balanceOf(subscriber.getId())

      assert.isTrue(subscriberBalanceAfter.sub(initialBalances.subscriber).eq(0))
    })

    it('The Publisher can check the payment and transfer the NFT to the Subscriber', async () => {
      // Let's use the Node to mint the subscription and release the payments

      const receipt = await nevermined.nfts721.claim(
        agreementId,
        publisher.getId(),
        subscriber.getId(),
      )
      assert.isTrue(receipt)

      assert.equal(
        await nevermined.nfts721.ownerOfAssetByAgreement(subscriptionDDO.shortId(), agreementId),
        subscriber.getId(),
      )
    })

    it('the Publisher and reseller can receive their payment', async () => {
      const receiver0Balance = await token.balanceOf(assetPrice.getReceivers()[0])
      const receiver1Balance = await token.balanceOf(assetPrice.getReceivers()[1])

      assert.isTrue(receiver0Balance.eq(initialBalances.editor.add(assetPrice.getAmounts()[0])))

      assert.isTrue(receiver1Balance.eq(initialBalances.reseller.add(assetPrice.getAmounts()[1])))
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
      await nevermined.keeper.conditions.transferNft721Condition.events.once((e) => e, eventOptions)
      const [event] =
        await nevermined.keeper.conditions.transferNft721Condition.events.getPastEvents(
          eventOptions,
        )

      // subgraph event or json-rpc event?
      const eventValues = event.args || event

      assert.equal(eventValues._agreementId, agreementId)
      assert.equal(eventValues._did, didZeroX(subscriptionDDO.id))

      // thegraph stores the addresses in lower case
      assert.equal(ethers.utils.getAddress(eventValues._receiver), subscriber.getId())
    })
  })

  describe('As a subscriber I want to get an access token for the web service', () => {
    before(async () => {
      // wait for elasticsearch
      await sleep(5000)
    })

    it('Nevermined One issues an access token', async () => {
      const response = await nevermined.nfts721.getSubscriptionToken(serviceDDO.id, subscriber)
      accessToken = response.accessToken

      assert.isDefined(accessToken)
    })
  })

  describe('As Subscriber I want to get access to the web service as part of my subscription', () => {
    it('The subscriber access the service endpoints available', async () => {
      const url = new URL(SERVICE_ENDPOINT)
      const proxyEndpoint = `${PROXY_URL}${url.pathname}`

      console.log(accessToken)
      opts.headers = {
        // The proxy expects the `HTTP Authorization` header with the JWT
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
        // Host header is not required anymore from the proxy, it picks this up from the JWT
        // host: url.port ? url.hostname.concat(`:${url.port}`) : url.hostname,
      }

      if (process.env.REQUEST_DATA) {
        opts.method = 'POST'
        opts.body = JSON.stringify(JSON.parse(process.env.REQUEST_DATA))
      }

      // console.debug(JSON.stringify(opts))
      const result = await fetch(proxyEndpoint, opts)

      console.debug(` ${result.status} - ${await result.text()}`)

      assert.isTrue(result.ok)
      assert.equal(result.status, 200)
    })
  })

  describe('As a user I want to be able to search DDOs by subscriptions', () => {
    it('should be able to retrieve the subscriptionDDO by contractAddress', async () => {
      const result = await nevermined.search.bySubscriptionContractAddress(subscriptionNFT.address)
      assert.equal(result.totalResults.value, 1)
    })

    it('should be able to retrieve subscriptions created', async () => {
      const result = await nevermined.search.subscriptionsCreated(publisher)
      assert.isAbove(result.totalResults.value, 1)

      const dids = result.results.map((ddo) => ddo.id)
      assert.include(dids, subscriptionDDO.id)
    })

    it('should be able to retrieve subscriptions purchased', async () => {
      const result = await nevermined.search.subscriptionsPurchased(subscriber)
      assert.isAbove(result.totalResults.value, 1)

      const dids = result.results.map((ddo) => ddo.id)
      assert.include(dids, subscriptionDDO.id)
    })

    it('should be able to retrieve all services associated with a subscription', async () => {
      const result = await nevermined.search.servicesBySubscription(subscriptionDDO.id)
      assert.equal(result.totalResults.value, 1)

      const ddo = result.results.pop()
      assert.equal(ddo.id, serviceDDO.id)
    })

    it('should be able to retrieve services associated with a subscription filtering by endpoints', async () => {
      const result = await nevermined.search.servicesBySubscription(
        subscriptionDDO.id,
        endpointsFilter,
      )
      assert.equal(result.totalResults.value, 1)

      assert.isTrue(
        result.results.every((r) =>
          r
            .findServiceByType('metadata')
            .attributes.main.webService.openEndpoints.some((e) => e === '/openapi.json'),
        ),
      )
    })

    it('should not be able to retrieve any services associated with a subscription filtering by endpoints which do not exist', async () => {
      const result = await nevermined.search.servicesBySubscription(
        subscriptionDDO.id,
        endpointsFilter2,
      )
      assert.equal(result.totalResults.value, 0)
    })
  })
})
