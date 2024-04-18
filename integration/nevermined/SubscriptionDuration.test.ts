// @ts-nocheck
import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { NvmAccount } from '../../src/models/NvmAccount'
import { DDO } from '../../src/ddo/DDO'

import TestContractHandler from '../../test/keeper/TestContractHandler'
import config from '../../test/config'
import { getMetadata } from '../utils'
import { SubscriptionNFTApi } from '../../src/nevermined/api/nfts/SubscriptionNFTApi'
import { NFTAttributes } from '../../src/models/NFTAttributes'
import { AssetPrice } from '../../src/models/AssetPrice'

chai.use(chaiAsPromised)

describe('Subscription Durations', () => {
  let publisher: NvmAccount
  let subscriber: NvmAccount
  let nevermined: Nevermined

  before(async () => {
    TestContractHandler.setConfig(config)
    nevermined = await Nevermined.getInstance(config)
    ;[publisher, subscriber] = nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)
    await nevermined.services.marketplace.login(clientAssertion)
  })

  describe('Subscription unlimited (duration = 0)', () => {
    let subscriptionNFT: SubscriptionNFTApi
    let subscriptionDDO: DDO
    let datasetDDO: DDO
    let agreementId: string

    it('The publisher publishes the subscription', async () => {
      const contractABI = await TestContractHandler.getABIArtifact(
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

      await subscriptionNFT.grantOperatorRole(
        nevermined.keeper.conditions.transferNft721Condition.address,
        publisher,
      )

      const nftAttributes = NFTAttributes.getSubscriptionInstance({
        metadata: getMetadata(),
        services: [
          {
            serviceType: 'nft-sales',
            price: new AssetPrice(publisher.getId(), 0n),
            nft: { duration: 0, nftTransfer: false },
          },
        ],
        providers: [config.neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint: false,
      })
      subscriptionDDO = await nevermined.nfts721.create(nftAttributes, publisher)
      assert.isDefined(subscriptionDDO)
      console.log(subscriptionDDO.id)
    })

    it('The publisher creates a dataset to associate to the subscription', async () => {
      const nftAttributes = NFTAttributes.getNFT721Instance({
        metadata: getMetadata(),
        services: [
          {
            serviceType: 'nft-access',
            nft: { nftTransfer: false },
          },
        ],
        providers: [config.neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint: false,
      })
      datasetDDO = await nevermined.nfts721.create(nftAttributes, publisher)
      assert.isDefined(datasetDDO)
    })

    it('The subscriber orders the subscription', async () => {
      agreementId = await nevermined.nfts721.order(subscriptionDDO.id, subscriber)
      assert.isDefined(agreementId)
    })

    it('The node transfers the nft', async () => {
      const receipt = await nevermined.nfts721.claim(
        agreementId,
        publisher.getId(),
        subscriber.getId(),
      )
      assert.isTrue(receipt)
    })

    it('The subscriber should have an nft balance', async () => {
      const balance = await subscriptionNFT.balanceOf(subscriber.getId())
      assert.equal(balance, 1n)
    })

    it('The subscriber should have access to the dataset', async () => {
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

  describe('Subscription limited (duration = 1000)', () => {
    let subscriptionNFT: SubscriptionNFTApi
    let subscriptionDDO: DDO
    let datasetDDO: DDO
    let agreementId: string

    it('The publisher publishes the subscription', async () => {
      const contractABI = await TestContractHandler.getABIArtifact(
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

      await subscriptionNFT.grantOperatorRole(
        nevermined.keeper.conditions.transferNft721Condition.address,
        publisher,
      )

      const nftAttributes = NFTAttributes.getSubscriptionInstance({
        metadata: getMetadata(),
        services: [
          {
            serviceType: 'nft-sales',
            price: new AssetPrice(publisher.getId(), 0n),
            nft: { duration: 1000, nftTransfer: false },
          },
        ],
        providers: [config.neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint: false,
      })
      subscriptionDDO = await nevermined.nfts721.create(nftAttributes, publisher)
      assert.isDefined(subscriptionDDO)
    })

    it('The publisher creates a dataset to associate to the subscription', async () => {
      const nftAttributes = NFTAttributes.getNFT721Instance({
        metadata: getMetadata(),
        services: [
          {
            serviceType: 'nft-access',
            nft: { nftTransfer: false },
          },
        ],
        providers: [config.neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint: false,
      })
      datasetDDO = await nevermined.nfts721.create(nftAttributes, publisher)
      assert.isDefined(datasetDDO)
    })

    it('The subscriber orders the subscription', async () => {
      agreementId = await nevermined.nfts721.order(subscriptionDDO.id, subscriber)
      assert.isDefined(agreementId)
    })

    it('The node transfers the nft', async () => {
      const receipt = await nevermined.nfts721.claim(
        agreementId,
        publisher.getId(),
        subscriber.getId(),
      )
      assert.isTrue(receipt)
    })

    it('The subscriber should have an nft balance', async () => {
      const balance = await subscriptionNFT.balanceOf(subscriber.getId())
      assert.equal(balance, 1n)
    })

    it('The subscriber should have access to the dataset', async () => {
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

  describe('Subscription expired (duration = 1)', () => {
    let subscriptionNFT: SubscriptionNFTApi
    let subscriptionDDO: DDO
    let datasetDDO: DDO
    let agreementId: string

    it('The publisher publishes the subscription', async () => {
      const contractABI = await TestContractHandler.getABIArtifact(
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

      await subscriptionNFT.grantOperatorRole(
        nevermined.keeper.conditions.transferNft721Condition.address,
        publisher,
      )

      const nftAttributes = NFTAttributes.getSubscriptionInstance({
        metadata: getMetadata(),
        services: [
          {
            serviceType: 'nft-sales',
            price: new AssetPrice(publisher.getId(), 0n),
            nft: { duration: 1, nftTransfer: false },
          },
        ],
        providers: [config.neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint: false,
      })
      subscriptionDDO = await nevermined.nfts721.create(nftAttributes, publisher)
      assert.isDefined(subscriptionDDO)
    })

    it('The publisher creates a dataset to associate to the subscription', async () => {
      const nftAttributes = NFTAttributes.getNFT721Instance({
        metadata: getMetadata(),
        services: [
          {
            serviceType: 'nft-access',
            nft: { nftTransfer: false },
          },
        ],
        providers: [config.neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
        preMint: false,
      })
      datasetDDO = await nevermined.nfts721.create(nftAttributes, publisher)
      assert.isDefined(datasetDDO)
    })

    it('The subscriber orders the subscription', async () => {
      agreementId = await nevermined.nfts721.order(subscriptionDDO.id, subscriber)
      assert.isDefined(agreementId)
    })

    it('The node transfers the nft', async () => {
      const receipt = await nevermined.nfts721.claim(
        agreementId,
        publisher.getId(),
        subscriber.getId(),
      )
      assert.isTrue(receipt)
    })

    it('The subscriber should NOT have an nft balance for subscribed subscription', async () => {
      const balance = await subscriptionNFT.balanceOf(subscriber.getId())
      assert.equal(balance, 0n)
    })

    it('The subscriber should NOT have access to the dataset of an expired subscription', async () => {
      await assert.isRejected(
        nevermined.nfts721.access(datasetDDO.id, subscriber, '/tmp/', undefined, agreementId),
        /Http error with code 401/,
      )
    })
  })
})
