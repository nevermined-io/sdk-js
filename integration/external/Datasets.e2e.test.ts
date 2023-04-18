import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { Account, DDO, MetaData, Nevermined, AssetPrice, NFTAttributes } from '../../src'
import { EscrowPaymentCondition, TransferNFT721Condition, Token } from '../../src/keeper'
import { config } from '../config'
import { generateMetadata, getMetadata } from '../utils'
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
  let subscriptionPrice = BigNumber.from(20)
  let amounts = [BigNumber.from(15), BigNumber.from(5)]
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
  let scale: BigNumber

  // let nft: ethers.Contract
  let subscriptionNFT: NFT721Api
  let neverminedNodeAddress

  let payload: JWTPayload

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
      const nftAttributes = NFTAttributes.getSubscriptionInstance({
        metadata: subscriptionMetadata,
        price: assetPrice,
        serviceTypes: ['nft-sales'],
        providers: [neverminedNodeAddress],
        duration: subscriptionDuration,
        nftContractAddress: subscriptionNFT.address,
        preMint,
        nftTransfer,
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
        serviceTypes: ['nft-access'],
        providers: [neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint,
        nftTransfer,
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
        methodName: 'getFulfilleds',
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

    it('should be able to retrieve all datasets associated with a subscription', async () => {
      const result = await nevermined.search.datasetsBySubscription(subscriptionDDO.id)
      assert.equal(result.totalResults.value, 1)

      const ddo = result.results.pop()
      assert.equal(ddo.id, datasetDDO.id)
    })
  })
})