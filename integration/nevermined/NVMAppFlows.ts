import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { decodeJwt, JWTPayload } from 'jose'
import { Account, DDO, MetaData, Nevermined, AssetPrice, NFTAttributes } from '../../src'
import { Token, TransferNFTCondition } from '../../src/keeper'
import { config } from '../config'
import { getMetadata } from '../utils'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import {
  getRoyaltyAttributes,
  PublishMetadataOptions,
  PublishOnChainOptions,
  RoyaltyAttributes,
  RoyaltyKind,
  SubscriptionCreditsNFTApi,
} from '../../src/nevermined'
import { mineBlocks } from '../utils/utils'

chai.use(chaiAsPromised)

describe('NVM App main flows using Credit NFTs (ERC-1155)', () => {
  let publisher: Account
  let subscriber: Account
  let reseller: Account

  let nevermined: Nevermined
  let token: Token
  let transferNftCondition: TransferNFTCondition
  let subscriptionDDO: DDO
  let datasetDDO: DDO

  let agreementId: string

  const amounts1 = [15n, 5n]
  const amounts2 = [30n, 10n]
  let receivers: string[]
  let subsSilverPrice: AssetPrice
  let subsGoldPrice: AssetPrice
  let royaltyAttributes: RoyaltyAttributes

  let subscriptionMetadata: MetaData
  let datasetMetadata: MetaData

  const preMint = false
  const royalties = 0
  const nftTransfer = false

  const subscriptionSilverDuration = 10 // in blocks
  const subscriptionGoldDuration = 20 // in blocks

  const subscriptionSilverPrice = 20n
  const subscriptionGoldPrice = 40n
  // This is the number of credits that the subscriber will get when purchase the subscription
  // In the DDO this will be added in the `_numberNFTs` value of the `nft-sales` service of the subscription
  const subscriptionSilverCredits = 15n
  const subscriptionGoldCredits = 50n
  // This is the number of credits that cost get access to the service attached to the subscription
  // In the DDO this will be added in the `_numberNFTs` value of the `nft-access` service of the asset associated to the subscription
  const accessCostInCreditsDataset = 2n
  const _accessCostInCreditsService = 5n

  let salesServices
  let accessServices

  // let nft: ethers.Contract
  let subscriptionNFT: SubscriptionCreditsNFTApi
  let neverminedNodeAddress

  let payload: JWTPayload

  before(async () => {
    TestContractHandler.setConfig(config)

    nevermined = await Nevermined.getInstance(config)
    ;[, publisher, subscriber, , reseller] = await nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)
    payload = decodeJwt(config.marketplaceAuthToken)

    datasetMetadata = getMetadata()
    subscriptionMetadata = getMetadata(undefined, 'NVM App Credits Subscription')
    subscriptionMetadata.main.type = 'subscription'

    datasetMetadata.userId = payload.sub
    neverminedNodeAddress = await nevermined.services.node.getProviderAddress()

    // conditions
    ;({ transferNftCondition } = nevermined.keeper.conditions)

    // components
    ;({ token } = nevermined.keeper)

    // scale = 10n ** BigInt(await token.decimals())
    receivers = [publisher.getId(), reseller.getId()]

    subsSilverPrice = new AssetPrice(
      new Map([
        [receivers[0], amounts1[0]],
        [receivers[1], amounts1[1]],
      ]),
    ).setTokenAddress(token.address)

    subsGoldPrice = new AssetPrice(
      new Map([
        [receivers[0], amounts2[0]],
        [receivers[1], amounts2[1]],
      ]),
    ).setTokenAddress(token.address)

    royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, royalties)
  })

  describe('As NVM Admin I want to setup a factory contract for subscriptions', () => {
    it('As NVM admin I can deploy a `NFT1155SubscriptionUpgradeable` contract (NFT1155)', async () => {
      console.log(`Running first test`)
      // Deploy NFT
      TestContractHandler.setConfig(config)

      const contractABI = await TestContractHandler.getABI(
        `NFT1155SubscriptionUpgradeable.${await nevermined.keeper.getNetworkName()}`,
        './artifacts/',
      )
      subscriptionNFT = await SubscriptionCreditsNFTApi.deployInstance(
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

      console.debug(`Deployed ERC-1155 Subscription NFT on address: ${subscriptionNFT.address}`)

      await nevermined.contracts.loadNft1155Api(subscriptionNFT)

      await subscriptionNFT.grantOperatorRole(transferNftCondition.address, publisher)
      console.debug(`Granting operator role to Nevermined Node Address: ${neverminedNodeAddress}`)
      await subscriptionNFT.grantOperatorRole(neverminedNodeAddress, publisher)

      assert.equal(nevermined.nfts1155.getContract.address, subscriptionNFT.address)
    })

    it('I should grant Nevermined the operator role', async () => {
      assert.isTrue(
        await nevermined.nfts1155.isOperator(
          subscriptionNFT.address,
          nevermined.keeper.conditions.transferNftCondition.address,
          1155,
        ),
      )
    })
  })

  describe('As publisher I can register a time based Smart Subscription', () => {
    it('As publisher I can register a time based Smart Subscription as part of the NFT1155', async () => {
      const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({
        metadata: subscriptionMetadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: subsSilverPrice,
            nft: {
              duration: subscriptionSilverDuration,
              amount: subscriptionSilverCredits,
              nftTransfer,
            },
          },
          {
            serviceType: 'nft-sales',
            price: subsGoldPrice,
            nft: {
              duration: subscriptionGoldDuration,
              amount: subscriptionGoldCredits,
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

      assert.equal(await subscriptionNFT.balance(subscriptionDDO.id, publisher.getId()), 0n)
      assert.isDefined(subscriptionDDO)
      console.log(`Subscription DID: ${subscriptionDDO.id}`)

      salesServices = subscriptionDDO.getServicesByType('nft-sales')
      assert.equal(salesServices.length, 2)
      assert.equal(
        salesServices[0].attributes.main.price.toString(),
        subsSilverPrice.getTotalPrice().toString(),
      )
      assert.equal(
        salesServices[1].attributes.main.price.toString(),
        subsGoldPrice.getTotalPrice().toString(),
      )
    })

    it('As publisher I can register an off-chain dataset associated to a time subscription', async () => {
      const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({
        metadata: datasetMetadata,
        services: [
          {
            serviceType: 'nft-access',
            nft: {
              tokenId: subscriptionDDO.shortId(),
              // TODO: Review
              duration: subscriptionSilverDuration,
              amount: accessCostInCreditsDataset,
              nftTransfer,
            },
          },
        ],
        providers: [neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint,
        royaltyAttributes: royaltyAttributes,
      })
      datasetDDO = await nevermined.nfts1155.create(nftAttributes, publisher, {
        metadata: PublishMetadataOptions.OnlyMetadataAPI,
        did: PublishOnChainOptions.OnlyOffchain,
      })
      assert.isDefined(datasetDDO)
      console.log(`Asset DID: ${datasetDDO.id}`)

      accessServices = datasetDDO.getServicesByType('nft-access')
      assert.equal(accessServices.length, 1)

      const tokenId = DDO.getTokenIdFromService(accessServices[0])
      assert.equal(tokenId, subscriptionDDO.shortId())
    })

    it.skip('As a publisher I can register an off-chain webservice associated to a time subscription', async () => {})
  })

  describe('As a subscriber I can purchase a time based Smart Subscription based on NFT1155', () => {
    let agreementId: string

    it('I can order and claim the subscription', async () => {
      await subscriber.requestTokens(subscriptionSilverPrice)

      const silverSalesService = subscriptionDDO.getServicesByType('nft-sales')[0]
      console.log(
        `Silver Sales Service with index ${silverSalesService.index} and Price ${silverSalesService.attributes.main.price}`,
      )
      agreementId = await nevermined.nfts1155.order(
        subscriptionDDO.id,
        subscriptionSilverCredits,
        subscriber,
        silverSalesService.index,
      )
      assert.isDefined(agreementId)

      try {
        const receipt = await nevermined.nfts1155.claim(
          agreementId,
          publisher.getId(),
          subscriber.getId(),
          subscriptionSilverCredits,
          subscriptionDDO.id,
          silverSalesService.index,
        )
        assert.isTrue(receipt)
      } catch (e) {
        console.error(e.message)
        assert.fail(e.message)
      }
    })

    it('I can download a dataset using my subscription', async () => {
      const balanceBefore = await subscriptionNFT.balance(subscriptionDDO.id, subscriber.getId())
      console.log(`Balance Before: ${balanceBefore}`)

      console.log(`First AgreementId: ${agreementId}`)
      const result = await nevermined.nfts1155.access(
        datasetDDO.id,
        subscriber,
        '/tmp/.nevermined/downloads/1/',
        undefined,
        agreementId,
      )
      assert.isTrue(result)

      const balanceAfter = await subscriptionNFT.balance(subscriptionDDO.id, subscriber.getId())
      console.log(`Balance After: ${balanceAfter}`)

      assert.equal(balanceBefore - accessCostInCreditsDataset, balanceAfter)
    })

    it.skip('I can access a service using my subscription ', async () => {})
  })

  describe('Subscriptions expires', () => {
    it('When subscription expires my balance is back to 0', async () => {
      await mineBlocks(nevermined, subscriber, subscriptionSilverDuration + 1)
      const balanceAfter = await subscriptionNFT.balance(subscriptionDDO.id, subscriber.getId())
      console.log(`Balance After Expiring duration: ${balanceAfter}`)
      assert.isTrue(balanceAfter === 0n)
    })

    it('As a subscriber I can not access to the dataset using my expired subscription', async () => {
      try {
        await nevermined.nfts1155.access(
          datasetDDO.id,
          subscriber,
          '/tmp/.nevermined/downloads/1/',
          undefined,
          agreementId,
        )
        assert.fail('Should not be able to access the dataset')
      } catch (e) {
        assert.isTrue(true)
      }
    })

    it.skip('As a subscriber I can not access to the service using my expired subscription ', async () => {})
  })

  describe('As a subscriber I want to topup my subscription purchasing a GOLD plan', () => {
    it('I check the details of the subscription NFT', async () => {
      const details = await nevermined.nfts1155.details(subscriptionDDO.id)
      assert.equal(details.owner, publisher.getId())
    })

    it('I am ordering the GOLD plan associated to the subscription NFT', async () => {
      const balanceBeforeTopup = await subscriptionNFT.balance(
        subscriptionDDO.id,
        subscriber.getId(),
      )

      console.log(`Balance Before Topup: ${balanceBeforeTopup}`)

      await subscriber.requestTokens(subscriptionGoldPrice)

      const goldSalesService = subscriptionDDO.getServicesByType('nft-sales')[1]
      console.log(
        `Gold Sales Service with index ${goldSalesService.index} and Price ${goldSalesService.attributes.main.price}`,
      )
      agreementId = await nevermined.nfts1155.order(
        subscriptionDDO.id,
        subscriptionGoldCredits,
        subscriber,
        goldSalesService.index,
      )
      assert.isDefined(agreementId)
      console.log(`Ordered Agreement Id ${agreementId}`)

      try {
        const receipt = await nevermined.nfts1155.claim(
          agreementId,
          publisher.getId(),
          subscriber.getId(),
          subscriptionGoldCredits,
          subscriptionDDO.id,
          goldSalesService.index,
        )
        assert.isTrue(receipt)
      } catch (e) {
        console.error(e.message)
        assert.fail(e.message)
      }

      const balanceAfterTopup = await subscriptionNFT.balance(
        subscriptionDDO.id,
        subscriber.getId(),
      )
      console.log(`Balance After Topup: ${balanceAfterTopup}`)

      const minted = await subscriptionNFT.getContract.getMintedEntries(
        subscriber.getId(),
        subscriptionDDO.shortId(),
      )
      console.log(`Current Block Number: ${await nevermined.web3.getBlockNumber()}`)
      console.log(`Minted entries: ${minted.length}`)
      minted.map((m) =>
        console.log(
          `Minted ${m.amountMinted} tokens on block ${m.mintBlock} and expiring on ${m.expirationBlock} block`,
        ),
      )

      assert.equal(balanceBeforeTopup + subscriptionGoldCredits, balanceAfterTopup)
    })

    it('I can download again using my toped up subscription', async () => {
      const balanceBefore = await subscriptionNFT.balance(subscriptionDDO.id, subscriber.getId())
      console.log(`Balance Before: ${balanceBefore}`)

      console.log(`Using Agreement Id ${agreementId}`)
      const result = await nevermined.nfts1155.access(
        datasetDDO.id,
        subscriber,
        '/tmp/.nevermined/downloads/2/',
        undefined,
        agreementId,
      )
      // for (let i = 0; i < 5; i++) {
      //   await nevermined.nfts1155.access(datasetDDO.id, subscriber, '/tmp/', undefined, agreementId)
      //   await sleep(1000)
      //   console.log(`Balance After Access: ${await subscriptionNFT.balance(subscriptionDDO.id, subscriber.getId())}`)
      // }

      assert.isTrue(result)

      const balanceAfter = await subscriptionNFT.balance(subscriptionDDO.id, subscriber.getId())
      console.log(`Balance After: ${balanceAfter}`)

      const minted = await subscriptionNFT.getContract.getMintedEntries(
        subscriber.getId(),
        subscriptionDDO.shortId(),
      )
      console.log(`Current Block Number: ${await nevermined.web3.getBlockNumber()}`)
      console.log(`Minted entries: ${minted.length}`)
      minted.map((m) =>
        console.log(
          `Minted ${m.amountMinted} tokens on block ${m.mintBlock} and expiring on ${m.expirationBlock} block`,
        ),
      )

      assert.equal(balanceBefore - accessCostInCreditsDataset, balanceAfter)
    })
  })
})
