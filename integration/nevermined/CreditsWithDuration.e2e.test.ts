import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { decodeJwt, JWTPayload } from 'jose'
import { NvmAccount, DDO, MetaData, Nevermined, AssetPrice, NFTAttributes } from '../../src'
import { EscrowPaymentCondition, Token, TransferNFTCondition } from '../../src/keeper'
import { config } from '../config'
import { getMetadata } from '../utils'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import {
  getRoyaltyAttributes,
  RoyaltyAttributes,
  RoyaltyKind,
  SubscriptionCreditsNFTApi,
} from '../../src/nevermined'
import { mineBlocks } from '../utils/utils'

chai.use(chaiAsPromised)

describe('Credit and Duration Subscriptions with Multiple services using NFT ERC-1155 End-to-End', () => {
  let editor: NvmAccount
  let subscriber: NvmAccount
  let reseller: NvmAccount

  let nevermined: Nevermined
  let token: Token
  let escrowPaymentCondition: EscrowPaymentCondition
  let transferNftCondition: TransferNFTCondition
  let subscriptionDDO: DDO
  let assetDDO: DDO

  let agreementId: string

  const subscriptionDuration1 = 10 // in blocks
  const subscriptionDuration2 = 20 // in blocks
  // Configuration of First Sale:
  // Editor -> Subscriber, the Reseller get a cut (25%)
  const subscriptionPrice1 = 20n
  const subscriptionPrice2 = 40n

  const amounts1 = [15n, 5n]
  const amounts2 = [30n, 10n]
  let receivers: string[]
  let assetPrice1: AssetPrice
  let assetPrice2: AssetPrice
  let royaltyAttributes: RoyaltyAttributes

  let subscriptionMetadata: MetaData
  let assetMetadata: MetaData
  let subsSalesService

  const preMint = false
  const royalties = 0
  const nftTransfer = false

  // This is the number of credits that the subscriber will get when purchase the subscription
  // In the DDO this will be added in the `_numberNFTs` value of the `nft-sales` service of the subscription
  const subscriptionCredits1 = 10n
  const subscriptionCredits2 = 50n
  // This is the number of credits that cost get access to the service attached to the subscription
  // In the DDO this will be added in the `_numberNFTs` value of the `nft-access` service of the asset associated to the subscription
  const accessCostInCredits1 = 2n

  let salesServices
  let accessServices
  let initialBalances: any

  let subscriptionNFT: SubscriptionCreditsNFTApi
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
    subscriptionMetadata = getMetadata(undefined, 'Subscription Duration NFT1155')
    subscriptionMetadata.main.type = 'subscription'

    assetMetadata.userId = payload.sub
    neverminedNodeAddress = await nevermined.services.node.getProviderAddress()

    // conditions
    ;({ escrowPaymentCondition, transferNftCondition } = nevermined.keeper.conditions)

    // components
    ;({ token } = nevermined.keeper)

    // scale = 10n ** BigInt(await token.decimals())
    receivers = [editor.getId(), reseller.getId()]

    // subscriptionPrice1 = subscriptionPrice1 * scale
    // amounts1 = amounts1.map((v) => v * scale)
    assetPrice1 = new AssetPrice(
      new Map([
        [receivers[0], amounts1[0]],
        [receivers[1], amounts1[1]],
      ]),
    ).setTokenAddress(token.address)

    // subscriptionPrice2 = subscriptionPrice2 * scale
    // amounts2 = amounts2.map((v) => v * scale)

    assetPrice2 = new AssetPrice(
      new Map([
        [receivers[0], amounts2[0]],
        [receivers[1], amounts2[1]],
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

  describe('As an editor I want to register new content and provide multiple subscriptions to access my content', () => {
    it('I want to register a subscriptions NFT with multiple plans attached', async () => {
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
            nft: { duration: subscriptionDuration1, amount: subscriptionCredits1, nftTransfer },
          },
          {
            serviceType: 'nft-sales',
            price: assetPrice2,
            nft: { duration: subscriptionDuration2, amount: subscriptionCredits2, nftTransfer },
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

      salesServices = subscriptionDDO.getServicesByType('nft-sales')
      assert.equal(salesServices.length, 2)
      assert.equal(
        salesServices[0].attributes.main.price.toString(),
        assetPrice1.getTotalPrice().toString(),
      )
      assert.equal(
        salesServices[1].attributes.main.price.toString(),
        assetPrice2.getTotalPrice().toString(),
      )
    })

    it('should grant Nevermined the operator role', async () => {
      assert.isTrue(
        await nevermined.nfts1155.isOperatorOfDID(
          subscriptionDDO.id,
          nevermined.keeper.conditions.transferNftCondition.address,
        ),
      )
    })

    it('I want to register a new asset where access is granted to subscription holders', async () => {
      const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({
        metadata: assetMetadata,
        services: [
          {
            serviceType: 'nft-access',
            nft: {
              tokenId: subscriptionDDO.shortId(),
              duration: subscriptionDuration1,
              amount: accessCostInCredits1,
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

      accessServices = assetDDO.getServicesByType('nft-access')
      assert.equal(accessServices.length, 1)

      const tokenId = DDO.getTokenIdFromService(accessServices[0])
      assert.equal(tokenId, subscriptionDDO.shortId())
    })
  })

  describe('As a subscriber I want to purchase the cheaper subscription option', () => {
    it('I check the details of the subscription NFT', async () => {
      const details = await nevermined.nfts1155.details(subscriptionDDO.id)
      assert.equal(details.owner, editor.getId())
    })

    it('I am ordering the subscription NFT', async () => {
      await nevermined.accounts.requestTokens(subscriber, subscriptionPrice1)

      subsSalesService = accessServices[0]
      console.debug(`Ordering with index ${subsSalesService.index}`)
      agreementId = await nevermined.nfts1155.order(
        subscriptionDDO.id,
        subscriptionCredits1,
        subscriber,
        subsSalesService.index,
      )

      assert.isDefined(agreementId)
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
          subscriptionCredits1,
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
      minted.map((m) =>
        console.log(
          `Minted ${m.amountMinted} tokens and expiration ${m.expirationBlock} minted on block ${m.mintBlock}`,
        ),
      )
      // getMintedEntries
    })

    it('The editor and reseller can receive their payment', async () => {
      const receiver0Balance = await token.balanceOf(assetPrice1.getReceivers()[0])
      const receiver1Balance = await token.balanceOf(assetPrice1.getReceivers()[1])

      assert.isTrue(receiver0Balance === initialBalances.editor + assetPrice1.getAmounts()[0])
      assert.isTrue(receiver1Balance === initialBalances.reseller + assetPrice1.getAmounts()[1])
    })

    it('The subscriber can check the balance with the new NFTs received', async () => {
      console.log(
        `Checking the balance of DID [${
          subscriptionDDO.id
        }] of the subscriber ${subscriber.getId()}`,
      )

      const blockNumber = await nevermined.client.public.getBlockNumber()
      console.log(`Block Number: ${blockNumber}`)
      const balanceAfter = await subscriptionNFT.getContract.balance(
        subscriber.getId(),
        subscriptionDDO.shortId(),
      )

      console.log(`Balance After Purchase is completed: ${balanceAfter}`)
      assert.isTrue(balanceAfter === subscriptionCredits1)
    })

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
      assert.isTrue(balanceAfter === subscriptionCredits1 - accessCostInCredits1)
    })

    it('After the credits expire the user can not get access', async () => {
      await mineBlocks(nevermined, subscriber, subscriptionDuration1 + 1)

      const balanceAfter = await subscriptionNFT.balance(subscriptionDDO.id, subscriber.getId())
      console.log(`Balance After Expiring duration: ${balanceAfter}`)
      assert.isTrue(balanceAfter === 0n)
    })

    describe('As a subscriber now Im interested in the more expensive service', () => {
      it('I am ordering the subscription NFT', async () => {
        await nevermined.accounts.requestTokens(subscriber, subscriptionPrice2)

        const balanceBeforeTopup = await subscriptionNFT.balance(
          subscriptionDDO.id,
          subscriber.getId(),
        )

        subsSalesService = salesServices[1]
        console.debug(`Ordering with index ${subsSalesService.index}`)
        agreementId = await nevermined.nfts1155.order(
          subscriptionDDO.id,
          subscriptionCredits2,
          subscriber,
          subsSalesService.index,
        )

        assert.isDefined(agreementId)

        const receipt = await nevermined.nfts1155.claim(
          agreementId,
          editor.getId(),
          subscriber.getId(),
          subscriptionCredits2,
          subscriptionDDO.id,
          subsSalesService.index,
        )
        assert.isTrue(receipt)

        const balanceAfterTopup = await subscriptionNFT.balance(
          subscriptionDDO.id,
          subscriber.getId(),
        )
        assert.equal(balanceBeforeTopup + subscriptionCredits2, balanceAfterTopup)
      })
    })
  })
})
