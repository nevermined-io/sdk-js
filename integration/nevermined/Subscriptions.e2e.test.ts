import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { decodeJwt, JWTPayload } from 'jose'
import { Account, DDO, MetaData, Nevermined, AssetPrice, NFTAttributes } from '../../src'
import { EscrowPaymentCondition, TransferNFT721Condition, Token } from '../../src/keeper'
import { config } from '../config'
import { getMetadata } from '../utils'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { ethers, ZeroAddress } from 'ethers'
import { didZeroX } from '../../src/utils'
import { EventOptions } from '../../src/events'
import {
  getRoyaltyAttributes,
  RoyaltyAttributes,
  RoyaltyKind,
  NFT721Api,
  SubscriptionNFTApi,
} from '../../src/nevermined'

chai.use(chaiAsPromised)

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
  let subscriptionPrice = 20n
  let amounts = [15n, 5n]
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
  let scale: bigint

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

    scale = 10n ** BigInt(await token.decimals())

    subscriptionPrice = subscriptionPrice * scale
    amounts = amounts.map((v) => v * scale)
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
      escrowPaymentCondition: Number(await token.balanceOf(escrowPaymentCondition.address)),
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
        nevermined.keeper.didRegistry.address,
        'Subscription NFT',
        '',
        '',
        0,
        nevermined.keeper.nvmConfig.address,
      ])

      await nevermined.contracts.loadNft721Api(subscriptionNFT)

      await subscriptionNFT.grantOperatorRole(transferNft721Condition.address, editor)

      assert.equal(await subscriptionNFT.balanceOf(editor.getId()), 0n)

      const nftAttributes = NFTAttributes.getSubscriptionInstance({
        metadata: subscriptionMetadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: assetPrice1,
            nft: { duration: subscriptionDuration, nftTransfer },
          },
        ],
        providers: [neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint,
        royaltyAttributes: royaltyAttributes,
      })
      subscriptionDDO = await nevermined.nfts721.create(nftAttributes, editor)

      assert.equal(await subscriptionNFT.balanceOf(editor.getId()), 0n)
      assert.isDefined(subscriptionDDO)
    })

    it('should grant Nevermined the operator role', async () => {
      assert.isTrue(
        await nevermined.nfts721.isOperator(
          subscriptionDDO.id,
          nevermined.keeper.conditions.transferNft721Condition.address,
        ),
      )
    })

    it('I want to register a new asset and tokenize (via NFT)', async () => {
      const nftAttributes = NFTAttributes.getSubscriptionInstance({
        metadata: assetMetadata,
        services: [
          {
            serviceType: 'nft-access',
            nft: { duration: subscriptionDuration, nftTransfer },
          },
        ],
        providers: [neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint,
        royaltyAttributes: royaltyAttributes,
      })
      assetDDO = await nevermined.nfts721.create(nftAttributes, editor)
      assert.isDefined(assetDDO)
    })
  })

  describe('As a subscriber I want to get access to some contents', () => {
    it('I check the details of the subscription NFT', async () => {
      const details = await nevermined.nfts721.details(subscriptionDDO.id)
      assert.equal(details.owner, editor.getId())
    })

    it('I am ordering the subscription NFT', async () => {
      await subscriber.requestTokens(subscriptionPrice / scale)

      const subscriberBalanceBefore = await token.balanceOf(subscriber.getId())
      assert.equal(subscriberBalanceBefore, initialBalances.subscriber + subscriptionPrice)

      agreementId = await nevermined.nfts721.order(subscriptionDDO.id, subscriber)

      assert.isDefined(agreementId)

      const subscriberBalanceAfter = await token.balanceOf(subscriber.getId())

      assert.equal(subscriberBalanceAfter, initialBalances.subscriber)
    })

    it('The seller can check the payment and transfer the NFT to the subscriber', async () => {
      // Let's use the Node to mint the subscription and release the payments

      assert.equal(await subscriptionNFT.balanceOf(subscriber.getId()), 0n)

      const receipt = await nevermined.nfts721.claim(
        agreementId,
        editor.getId(),
        subscriber.getId(),
        subscriptionDDO.id,
      )
      assert.isTrue(receipt)

      assert.equal(
        await nevermined.nfts721.ownerOfAssetByAgreement(subscriptionDDO.shortId(), agreementId),
        subscriber.getId(),
      )

      const minted = await subscriptionNFT.getContract.getMintedEntries(subscriber.getId())
      console.log(`Minted: ${JSON.stringify(minted)}`)

      assert.equal(await subscriptionNFT.balanceOf(subscriber.getId()), 1n)
    })

    it('the editor and reseller can receive their payment', async () => {
      const receiver0Balance = await token.balanceOf(assetPrice1.getReceivers()[0])
      const receiver1Balance = await token.balanceOf(assetPrice1.getReceivers()[1])

      assert.equal(receiver0Balance, initialBalances.editor + assetPrice1.getAmounts()[0])
      assert.equal(receiver1Balance, initialBalances.reseller + assetPrice1.getAmounts()[1])
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
  })

  describe('As subscriber I want to get access to assets include as part of my subscription', () => {
    it('The Subscriber should have an NFT balance', async () => {
      const balance = await subscriptionNFT.balanceOf(subscriber.getId())
      assert.equal(balance, 1n)
    })

    it('The collector access the files', async () => {
      const result = await nevermined.nfts721.access(
        assetDDO.id,
        subscriber,
        '/tmp/',
        undefined,
        agreementId,
      )
      assert.isTrue(result)
    })
  })

  describe('Node should not be able to transfer the nft without the operator role', () => {
    it('should create the subscription NFT without granting Nevermined the operator role', async () => {
      // Deploy NFT
      TestContractHandler.setConfig(config)

      const contractABI = await TestContractHandler.getABI(
        'NFT721SubscriptionUpgradeable',
        './test/resources/artifacts/',
      )
      subscriptionNFT = await SubscriptionNFTApi.deployInstance(config, contractABI, editor, [
        editor.getId(),
        nevermined.keeper.didRegistry.address,
        'Subscription NFT',
        '',
        '',
        0,
        ZeroAddress,
      ])

      await nevermined.contracts.loadNft721Api(subscriptionNFT)

      const nftAttributes = NFTAttributes.getSubscriptionInstance({
        metadata: getMetadata(),
        services: [
          {
            serviceType: 'nft-sales',
            price: new AssetPrice(editor.getId(), 0n),
            nft: { duration: subscriptionDuration, nftTransfer },
          },
        ],
        providers: [neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint,
        royaltyAttributes: royaltyAttributes,
      })
      subscriptionDDO = await nevermined.nfts721.create(nftAttributes, editor)
      assert.isDefined(subscriptionDDO)
    })

    it('subscriber should be able to order the nft', async () => {
      agreementId = await nevermined.nfts721.order(subscriptionDDO.id, subscriber)
      assert.isDefined(agreementId)
    })

    it('nevermined should not allow the subscriber to claim through the node', async () => {
      await assert.isRejected(
        nevermined.nfts721.claim(
          agreementId,
          editor.getId(),
          subscriber.getId(),
          subscriptionDDO.id,
        ),
        /Nevermined does not have operator role/,
      )
    })
  })
})
