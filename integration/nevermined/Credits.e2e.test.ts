import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { decodeJwt, JWTPayload } from 'jose'
import {
  Account,
  DDO,
  MetaData,
  Nevermined,
  AssetPrice,
  NFTAttributes,
  jsonReplacer,
} from '../../src'
import { EscrowPaymentCondition, Token, TransferNFTCondition } from '../../src/keeper'
import { config } from '../config'
import { getMetadata } from '../utils'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { didZeroX } from '../../src/utils'
import { EventOptions } from '../../src/events'
import {
  getRoyaltyAttributes,
  RoyaltyAttributes,
  RoyaltyKind,
  SubscriptionCreditsNFTApi,
  NFT1155Api,
  getAddress,
} from '../../src/nevermined'
import { sleep } from '../utils/utils'

chai.use(chaiAsPromised)

describe('Credit Subscriptions using NFT ERC-1155 End-to-End', () => {
  let editor: Account
  let subscriber: Account
  let reseller: Account

  let nevermined: Nevermined
  let token: Token
  let escrowPaymentCondition: EscrowPaymentCondition
  let transferNftCondition: TransferNFTCondition
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
  let subsSalesService

  const preMint = false
  const royalties = 0
  const nftTransfer = false
  const subscriptionDuration = 1000 // in blocks

  // This is the number of credits that the subscriber will get when purchase the subscription
  // In the DDO this will be added in the `_numberNFTs` value of the `nft-sales` service of the subscription
  const subscriptionCredits = 5n

  // This is the number of credits that cost get access to the service attached to the subscription
  // In the DDO this will be added in the `_numberNFTs` value of the `nft-access` service of the asset associated to the subscription
  const accessCostInCredits = 2n

  let initialBalances: any
  let scale: bigint

  let subscriptionNFT: NFT1155Api
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
    subscriptionMetadata = getMetadata(undefined, 'Subscription NFT1155')
    subscriptionMetadata.main.type = 'subscription'

    assetMetadata.userId = payload.sub
    neverminedNodeAddress = await nevermined.services.node.getProviderAddress()

    // conditions
    ;({ escrowPaymentCondition, transferNftCondition } = nevermined.keeper.conditions)

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
      console.log(`Running first test`)
      // Deploy NFT
      TestContractHandler.setConfig(config)

      const contractABI = await TestContractHandler.getABIArtifact(
        'NFT1155SubscriptionUpgradeable',
        './test/resources/artifacts/',
      )
      subscriptionNFT = await SubscriptionCreditsNFTApi.deployInstance(
        config,
        contractABI,
        editor,
        [
          editor.getId(),
          nevermined.keeper.didRegistry.address,
          'Credits Subscription NFT',
          'CRED',
          '',
          nevermined.keeper.nvmConfig.address,
        ],
      )

      console.debug(`Deployed ERC-1155 Subscription NFT on address: ${subscriptionNFT.address}`)

      await nevermined.contracts.loadNft1155Api(subscriptionNFT)

      await subscriptionNFT.grantOperatorRole(transferNftCondition.address, editor)
      console.debug(`Granting operator role to Nevermined Node Address: ${neverminedNodeAddress}`)
      await subscriptionNFT.grantOperatorRole(neverminedNodeAddress, editor)

      assert.equal(nevermined.nfts1155.getContract.address, subscriptionNFT.address)

      const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({
        metadata: subscriptionMetadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: assetPrice1,
            nft: { duration: subscriptionDuration, amount: subscriptionCredits, nftTransfer },
          },
        ],
        providers: [neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint,
        royaltyAttributes: royaltyAttributes,
      })
      subscriptionDDO = await nevermined.nfts1155.create(nftAttributes, editor)

      assert.equal(await subscriptionNFT.balance(subscriptionDDO.id, editor.getId()), 0n)
      assert.isDefined(subscriptionDDO)
      console.log(`Subscription DID: ${subscriptionDDO.id}`)
    })

    it('should grant Nevermined the operator role', async () => {
      assert.isTrue(
        await nevermined.nfts1155.isOperatorOfDID(
          subscriptionDDO.id,
          nevermined.keeper.conditions.transferNftCondition.address,
        ),
      )
    })

    it('I want to register a new asset and tokenize (via NFT)', async () => {
      const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({
        metadata: assetMetadata,
        services: [
          {
            serviceType: 'nft-access',
            nft: {
              tokenId: subscriptionDDO.shortId(),
              duration: subscriptionDuration,
              amount: accessCostInCredits,
              nftTransfer,
            },
          },
        ],
        providers: [neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint,
        royaltyAttributes: royaltyAttributes,
      })
      assetDDO = await nevermined.nfts1155.create(nftAttributes, editor)
      assert.isDefined(assetDDO)
      console.log(`Asset DID: ${assetDDO.id}`)

      const accessService = assetDDO.findServiceByType('nft-access')
      const tokenId = DDO.getTokenIdFromService(accessService)
      assert.equal(tokenId, subscriptionDDO.shortId())
    })
  })

  describe('As a subscriber I want to get access to some contents', () => {
    it('I check the details of the subscription NFT', async () => {
      const details = await nevermined.nfts1155.details(subscriptionDDO.id)
      assert.equal(details.owner, editor.getId())
    })

    it('I am ordering the subscription NFT', async () => {
      await subscriber.requestTokens(subscriptionPrice / scale)

      const subscriberBalanceBefore = await token.balanceOf(subscriber.getId())
      assert.equal(subscriberBalanceBefore, initialBalances.subscriber + subscriptionPrice)

      subsSalesService = subscriptionDDO.findServiceByType('nft-sales')
      console.debug(`Ordering service with index ${subsSalesService.index}`)
      agreementId = await nevermined.nfts1155.order(
        subscriptionDDO.id,
        subscriptionCredits,
        subscriber,
        subsSalesService.index,
      )

      assert.isDefined(agreementId)
      console.debug(`Agreement ID: ${agreementId}`)
      const subscriberBalanceAfter = await token.balanceOf(subscriber.getId())

      assert.equal(subscriberBalanceAfter, initialBalances.subscriber)
    })

    it('The credits seller can check the payment and transfer the NFT to the subscriber', async () => {
      // Let's use the Node to mint the subscription and release the payments

      const balanceBefore = await subscriptionNFT.balance(subscriptionDDO.id, subscriber.getId())
      console.log(`Balance Before: ${balanceBefore}`)
      console.log(`Balance Before (JSON): ${JSON.stringify(balanceBefore.toString())}`)
      assert.isTrue(balanceBefore === 0n)

      try {
        const receipt = await nevermined.nfts1155.claim(
          agreementId,
          editor.getId(),
          subscriber.getId(),
          subscriptionCredits,
          subscriptionDDO.id,
          subsSalesService.index,
        )
        assert.isTrue(receipt)
      } catch (e) {
        console.error(e.message)
        assert.fail(e.message)
      }

      console.log(`Got the receipt`)

      const minted = await subscriptionNFT.getContract.getMintedEntries(
        subscriber.getId(),
        subscriptionDDO.shortId(),
      )
      console.log(`Minted: ${minted.length}`)
    })

    it('the editor and reseller can receive their payment', async () => {
      const receiver0Balance = await token.balanceOf(assetPrice1.getReceivers()[0])
      const receiver1Balance = await token.balanceOf(assetPrice1.getReceivers()[1])

      assert.isTrue(receiver0Balance === initialBalances.editor + assetPrice1.getAmounts()[0])
      assert.isTrue(receiver1Balance === initialBalances.reseller + assetPrice1.getAmounts()[1])
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

      console.debug(`EVENTS: ${JSON.stringify(eventValues, jsonReplacer)}`)

      assert.equal(eventValues._agreementId, agreementId)
      assert.equal(eventValues._did, didZeroX(subscriptionDDO.id))

      // thegraph stores the addresses in lower case
      assert.equal(getAddress(eventValues._receiver), subscriber.getId())
    })

    it('the subscriber can check the balance with the new NFTs received', async () => {
      console.log(
        `Checking the balance of DID [${
          subscriptionDDO.id
        }] of the subscriber ${subscriber.getId()}`,
      )
      const balanceAfter = await subscriptionNFT.balance(subscriptionDDO.id, subscriber.getId())
      console.log(`Balance After Purchase is completed: ${balanceAfter}`)
      assert.isTrue(balanceAfter === subscriptionCredits)
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

    it('The balance of the subscriber should be lower because credits got used', async () => {
      const balanceAfter = await subscriptionNFT.balance(subscriptionDDO.id, subscriber.getId())
      console.log(`Balance After Burn: ${balanceAfter}`)
      assert.isTrue(balanceAfter === subscriptionCredits - accessCostInCredits)
    })

    it('The tokens are burned and the subscriber cant get access anymore', async () => {
      let balance
      try {
        for (let i = 0; i < 5; i++) {
          await nevermined.nfts1155.access(assetDDO.id, subscriber, '/tmp/', undefined, agreementId)
          await sleep(1000)
          balance = await subscriptionNFT.balance(subscriptionDDO.id, subscriber.getId())
          console.log(`Balance After Access: ${balance}`)
        }
        assert.fail('Should not get here')
      } catch (error) {
        console.log(`User cant get access anymore: ${error.message}`)
      }

      const balanceAfter = await subscriptionNFT.balance(subscriptionDDO.id, subscriber.getId())
      console.log(`Balance After Burn: ${balanceAfter}`)
      assert.isTrue(balanceAfter < accessCostInCredits)
    })

    it('The subscriber can top-up', async () => {
      await subscriber.requestTokens(subscriptionPrice / scale)

      agreementId = await nevermined.nfts1155.order(
        subscriptionDDO.id,
        subscriptionCredits,
        subscriber,
        subsSalesService.index,
      )
      assert.isDefined(agreementId)

      const receipt = await nevermined.nfts1155.claim(
        agreementId,
        editor.getId(),
        subscriber.getId(),
        subscriptionCredits,
        subscriptionDDO.id,
        subsSalesService.index,
      )
      assert.isTrue(receipt)

      const balanceAfterTopUp = await subscriptionNFT.balance(
        subscriptionDDO.id,
        subscriber.getId(),
      )
      console.log(`Balance After TopUp: ${balanceAfterTopUp}`)
      assert.isTrue(balanceAfterTopUp > accessCostInCredits)
    })
  })
})
