import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { Account, DDO, MetaData, Nevermined, AssetPrice, NFTAttributes } from '../../src'
import { EscrowPaymentCondition, TransferNFT721Condition, Token } from '../../src/keeper'
import { config } from '../config'
import { getMetadata } from '../utils'
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

describe('Subscriptions using NFT ERC-721 End-to-End', () => {
  let editor: Account
  let subscriber: Account
  let reseller: Account

  let nevermined: Nevermined
  let token: Token
  let escrowPaymentCondition: EscrowPaymentCondition
  let transferNft721Condition: TransferNFT721Condition
  let subscriptionDDO: DDO
  let assetDDO: DDO

  let agreementId: string

  // Configuration of First Sale:
  // Editor -> Subscriber, the Reseller get a cut (25%)
  let subscriptionPrice = BigNumber.from(20)
  let amounts = [BigNumber.from(15), BigNumber.from(5)]
  let receivers: string[]
  let assetPrice1: AssetPrice
  let royaltyAttributes: RoyaltyAttributes

  let subscriptionMetadata: MetaData
  let assetMetadata: MetaData

  const preMint = false
  const royalties = 0
  const nftTransfer = false
  const subscriptionDuration = 1000 // in blocks

  let initialBalances: any
  let scale: BigNumber

  // let nft: ethers.Contract
  let subscriptionNFT: NFT721Api
  let neverminedNodeAddress

  let payload: JWTPayload

  before(async () => {
    TestContractHandler.setConfig(config)

    nevermined = await Nevermined.getInstance(config)
    ;[, editor, subscriber, , reseller] = await nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(editor)

    await nevermined.services.marketplace.login(clientAssertion)
    payload = decodeJwt(config.marketplaceAuthToken)

    assetMetadata = getMetadata()
    subscriptionMetadata = getMetadata(undefined, 'Subscription NFT')
    subscriptionMetadata.main.type = 'subscription'

    assetMetadata.userId = payload.sub
    neverminedNodeAddress = await nevermined.services.node.getProviderAddress()

    // conditions
    ;({ escrowPaymentCondition, transferNft721Condition } = nevermined.keeper.conditions)

    // components
    ;({ token } = nevermined.keeper)

    scale = BigNumber.from(10).pow(await token.decimals())

    subscriptionPrice = subscriptionPrice.mul(scale)
    amounts = amounts.map((v) => v.mul(scale))
    receivers = [editor.getId(), reseller.getId()]
    assetPrice1 = new AssetPrice(
      new Map([
        [receivers[0], amounts[0]],
        [receivers[1], amounts[1]],
      ]),
    ).setTokenAddress(token.address)

    royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, royalties)

    initialBalances = {
      editor: await token.balanceOf(editor.getId()),
      subscriber: await token.balanceOf(subscriber.getId()),
      reseller: await token.balanceOf(reseller.getId()),
      escrowPaymentCondition: Number(await token.balanceOf(escrowPaymentCondition.getAddress())),
    }
  })

  describe('As an editor I want to register new content and provide a subscriptions to my content', () => {
    it('I want to register a subscriptions NFT that gives access to exclusive contents to the holders', async () => {
      // Deploy NFT
      TestContractHandler.setConfig(config)

      const contractABI = await TestContractHandler.getABI(
        'NFT721SubscriptionUpgradeable',
        './test/resources/artifacts/',
      )
      subscriptionNFT = await SubscriptionNFTApi.deployInstance(config, contractABI, editor, [
        editor.getId(),
        nevermined.keeper.didRegistry.getAddress(),
        'Subscription NFT',
        '',
        '',
        0,
      ])

      await nevermined.contracts.loadNft721Api(subscriptionNFT)

      await subscriptionNFT.grantOperatorRole(transferNft721Condition.address, editor)

      assert.isTrue(BigNumber.from(0).eq(await subscriptionNFT.balanceOf(editor.getId())))

      const isOperator = await subscriptionNFT.getContract.isOperator(
        transferNft721Condition.address,
      )
      assert.isTrue(isOperator)
      const nftAttributes = NFTAttributes.getSubscriptionInstance({
        metadata: subscriptionMetadata,
        price: assetPrice1,
        serviceTypes: ['nft-sales'],
        providers: [neverminedNodeAddress],
        duration: subscriptionDuration,
        nftContractAddress: subscriptionNFT.address,
        preMint,
        nftTransfer,
        royaltyAttributes: royaltyAttributes,
      })
      subscriptionDDO = await nevermined.nfts721.create(nftAttributes, editor)

      assert.isTrue(BigNumber.from(0).eq(await subscriptionNFT.balanceOf(editor.getId())))

      assert.isDefined(subscriptionDDO)
    })

    it('I want to register a new asset and tokenize (via NFT)', async () => {
      const nftAttributes = NFTAttributes.getSubscriptionInstance({
        metadata: assetMetadata,
        serviceTypes: ['nft-access'],
        providers: [neverminedNodeAddress],
        duration: subscriptionDuration,
        nftContractAddress: subscriptionNFT.address,
        preMint,
        nftTransfer,
        royaltyAttributes: royaltyAttributes,
      })
      assetDDO = await nevermined.nfts721.create(nftAttributes, editor)
      console.log(`Using NFT contract address: ${subscriptionNFT.address}`)
      assert.isDefined(assetDDO)
    })
  })

  describe('As a subscriber I want to get access to some contents', () => {
    it('I check the details of the subscription NFT', async () => {
      const details = await nevermined.nfts721.details(subscriptionDDO.id)
      assert.equal(details.owner, editor.getId())
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

    it('The seller can check the payment and transfer the NFT to the subscriber', async () => {
      // Let's use the Node to mint the subscription and release the payments

      assert.isTrue(BigNumber.from(0).eq(await subscriptionNFT.balanceOf(subscriber.getId())))

      const receipt = await nevermined.nfts721.claim(
        agreementId,
        editor.getId(),
        subscriber.getId(),
      )
      assert.isTrue(receipt)

      assert.equal(
        await nevermined.nfts721.ownerOfAssetByAgreement(subscriptionDDO.shortId(), agreementId),
        subscriber.getId(),
      )

      const minted = await subscriptionNFT.getContract.getMintedEntries(subscriber.getId())
      console.log(`Minted: ${JSON.stringify(minted)}`)

      assert.isTrue(BigNumber.from(1).eq(await subscriptionNFT.balanceOf(subscriber.getId())))
    })

    it('the editor and reseller can receive their payment', async () => {
      const receiver0Balance = await token.balanceOf(assetPrice1.getReceivers()[0])
      const receiver1Balance = await token.balanceOf(assetPrice1.getReceivers()[1])

      assert.isTrue(receiver0Balance.eq(initialBalances.editor.add(assetPrice1.getAmounts()[0])))

      assert.isTrue(receiver1Balance.eq(initialBalances.reseller.add(assetPrice1.getAmounts()[1])))
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

  describe('As subscriber I want to get access to assets include as part of my subscription', () => {
    it('The collector access the files', async () => {
      const result = await nevermined.nfts1155.access(
        assetDDO.id,
        subscriber,
        '/tmp/',
        undefined,
        agreementId,
      )
      assert.isTrue(result)
    })
  })
})
