import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import {
  Account,
  DDO,
  MetaData,
  Nevermined,
  AssetPrice,
  NFTAttributes,
  NeverminedNFT721Type,
} from '../../src'
import { EscrowPaymentCondition, TransferNFT721Condition, Token } from '../../src/keeper'
import { config } from '../config'
import { generateMetadata, getMetadata } from '../utils'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { ethers } from 'ethers'
import { didZeroX } from '../../src/utils'
import { EventOptions } from '../../src/events'
import {
  getRoyaltyAttributes,
  RoyaltyAttributes,
  RoyaltyKind,
  NFT721Api,
  SubscriptionNFTApi,
} from '../../src/nevermined'

describe('Gate-keeping of Dataset using NFT ERC-721 End-to-End', () => {
  let publisher: Account
  let subscriber: Account
  let reseller: Account

  let nevermined: Nevermined
  let token: Token
  let escrowPaymentCondition: EscrowPaymentCondition
  let transferNft721Condition: TransferNFT721Condition
  let subscriptionDDO: DDO
  let datasetDDO: DDO

  let agreementId: string

  // Configuration of First Sale:
  // Editor -> Subscriber, the Reseller get a cut (25%)
  let subscriptionPrice = 20n
  let amounts = [15n, 5n]
  let receivers: string[]
  let assetPrice: AssetPrice
  let royaltyAttributes: RoyaltyAttributes

  let subscriptionMetadata: MetaData
  let datasetMetadata: MetaData

  const preMint = false
  const royalties = 0
  const nftTransfer = false
  const subscriptionDuration = 1000 // in blocks

  // The NVM proxy that will be used to authorize the service requests
  const PROXY_URL = process.env.PROXY_URL || 'http://127.0.0.1:3128'

  // Required because we are dealing with self signed certificates locally
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  let initialBalances: any
  let scale: bigint

  // let nft: ethers.Contract
  let subscriptionNFT: NFT721Api
  let neverminedNodeAddress

  let payload: JWTPayload

  const tagsFilter = [
    {
      nested: {
        path: ['service'],
        query: {
          bool: {
            filter: [
              { match: { 'service.type': 'metadata' } },
              {
                match: {
                  'service.attributes.additionalInformation.tags': 'weather',
                },
              },
            ],
          },
        },
      },
    },
  ]

  const tagsFilter2 = [
    {
      nested: {
        path: ['service'],
        query: {
          bool: {
            filter: [
              { match: { 'service.type': 'metadata' } },
              {
                match: {
                  'service.attributes.additionalInformation.tags': 'nvm',
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
    console.log(`  REQUEST_DATA=${process.env.REQUEST_DATA}`)
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
        nevermined.keeper.didRegistry.address,
        'Subscription Service NFT',
        '',
        '',
        0,
        nevermined.keeper.nvmConfig.address,
      ])

      await nevermined.contracts.loadNft721Api(subscriptionNFT)

      await subscriptionNFT.grantOperatorRole(transferNft721Condition.address, publisher)

      const isOperator = await subscriptionNFT.getContract.isOperator(
        transferNft721Condition.address,
      )
      assert.isTrue(isOperator)

      subscriptionMetadata = getMetadata(undefined, 'Service Subscription NFT')
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

    it('I want to register a new dataset (via NFT)', async () => {
      datasetMetadata = generateMetadata('Nevermined dataset Metadata') as MetaData
      datasetMetadata.userId = payload.sub

      const nftAttributes = NFTAttributes.getNFT721Instance({
        metadata: datasetMetadata,
        services: [
          {
            serviceType: 'nft-access',
            nft: { nftTransfer },
          },
        ],
        providers: [neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint,
        royaltyAttributes: royaltyAttributes,
      })
      datasetDDO = await nevermined.nfts721.create(nftAttributes, publisher)
      console.log(`Using NFT contract address: ${subscriptionNFT.address}`)
      console.log(`Dataset registered with DID: ${datasetDDO.id}`)
      assert.isDefined(datasetDDO)
    })
  })

  describe('As a Subscriber I want to get access to a dataset', () => {
    it('I check the details of the subscription NFT', async () => {
      const details = await nevermined.nfts721.details(subscriptionDDO.id)
      assert.equal(details.owner, publisher.getId())
    })

    it('I am ordering the subscription NFT', async () => {
      await subscriber.requestTokens(subscriptionPrice / scale)

      const subscriberBalanceBefore = await token.balanceOf(subscriber.getId())
      assert.isTrue(subscriberBalanceBefore == initialBalances.subscriber + subscriptionPrice)

      agreementId = await nevermined.nfts721.order(subscriptionDDO.id, subscriber)

      assert.isDefined(agreementId)

      const subscriberBalanceAfter = await token.balanceOf(subscriber.getId())

      assert.equal(subscriberBalanceAfter - initialBalances.subscriber, 0n)
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
      assert.equal(ethers.getAddress(eventValues._receiver), subscriber.getId())
    })

    it('The Subscriber should have an NFT balance', async () => {
      const balance = await subscriptionNFT.balanceOf(subscriber.getId())
      assert.equal(balance, 1n)
    })

    it('The Subscriber should have access to the dataset', async () => {
      const result = await nevermined.nfts721.access(
        datasetDDO.id,
        subscriber,
        '/tmp/',
        undefined,
        agreementId,
      )
      assert.isTrue(result)
    })
  })

  describe('As a user I want to be able to search DDOs by subscriptions', () => {
    it('should be able to retrieve the subscriptionDDO by contractAddress', async () => {
      const result = await nevermined.search.bySubscriptionContractAddress(
        subscriptionNFT.address,
        NeverminedNFT721Type.nft721Subscription,
      )
      assert.equal(result.totalResults.value, 1)
    })

    it('should be able to retrieve subscriptions created', async () => {
      const result = await nevermined.search.subscriptionsCreated(
        publisher,
        NeverminedNFT721Type.nft721Subscription,
      )
      assert.isAbove(result.totalResults.value, 1)

      const dids = result.results.map((ddo) => ddo.id)
      assert.include(dids, subscriptionDDO.id)
    })

    it('should be able to retrieve subscriptions purchased', async () => {
      const result = await nevermined.search.subscriptionsPurchased(
        subscriber,
        NeverminedNFT721Type.nft721Subscription,
      )
      assert.isAbove(result.totalResults.value, 1)

      const dids = result.results.map((ddo) => ddo.id)
      assert.include(dids, subscriptionDDO.id)
    })

    it('should be able to retrieve subscriptions published filtering by tags', async () => {
      const result = await nevermined.search.subscriptionsCreated(
        publisher,
        NeverminedNFT721Type.nft721Subscription,
        tagsFilter,
      )

      assert.isAbove(result.totalResults.value, 1)

      assert.isTrue(
        result.results.every((r) =>
          r
            .findServiceByType('metadata')
            .attributes.additionalInformation.tags.some((t) => t === 'weather'),
        ),
      )
    })

    it('should not be able to retrieve any subscriptions published filtering by tags which not exist', async () => {
      const result = await nevermined.search.subscriptionsCreated(
        publisher,
        NeverminedNFT721Type.nft721Subscription,
        tagsFilter2,
      )

      assert.equal(result.totalResults.value, 0)
    })

    it('should be able to retrieve subscriptions purchased filtering by tags', async () => {
      const result = await nevermined.search.subscriptionsPurchased(
        subscriber,
        NeverminedNFT721Type.nft721Subscription,
        tagsFilter,
      )
      assert.isAbove(result.totalResults.value, 1)

      assert.isTrue(
        result.results.every((r) =>
          r
            .findServiceByType('metadata')
            .attributes.additionalInformation.tags.some((t) => t === 'weather'),
        ),
      )
    })

    it('should not be able to retrieve not subscriptions purchased filtering by tags which do not exist', async () => {
      const result = await nevermined.search.subscriptionsPurchased(
        subscriber,
        NeverminedNFT721Type.nft721Subscription,
        tagsFilter2,
      )
      assert.equal(result.totalResults.value, 0)
    })

    it('should be able to retrieve all datasets associated with a subscription', async () => {
      const result = await nevermined.search.datasetsBySubscription(subscriptionDDO.id)
      assert.equal(result.totalResults.value, 1)

      const ddo = result.results.pop()
      assert.equal(ddo.id, datasetDDO.id)
    })

    it('should be able to retrieve datasets associated with a subscription filtering by tags', async () => {
      const result = await nevermined.search.datasetsBySubscription(subscriptionDDO.id, tagsFilter)
      assert.equal(result.totalResults.value, 1)

      assert.isTrue(
        result.results.every((r) =>
          r
            .findServiceByType('metadata')
            .attributes.additionalInformation.tags.some((t) => t === 'weather'),
        ),
      )
    })

    it('should not be able to retrieve any datasets associated with a subscription filtering by tags which do not exist', async () => {
      const result = await nevermined.search.datasetsBySubscription(subscriptionDDO.id, tagsFilter2)
      assert.equal(result.totalResults.value, 0)
    })
  })
})
