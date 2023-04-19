import { assert } from 'chai'
import { Account, DDO, NFTAttributes, Nevermined, SubscriptionNFTApi } from '../../src'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { config } from '../config'
import { getMetadata } from '../utils'

describe('Subscription Durations', () => {
  let publisher: Account
  let subscriber: Account
  let nevermined: Nevermined

  before(async () => {
    TestContractHandler.setConfig(config)
    nevermined = await Nevermined.getInstance(config)
    ;[publisher, subscriber] = await nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)
    await nevermined.services.marketplace.login(clientAssertion)
  })

  describe('Subscription unlimited (duration = 0)', () => {
    let subscriptionNFT: SubscriptionNFTApi
    let subscriptionDDO: DDO
    let datasetDDO: DDO
    let agreementId: string

    it('The publisher publishes the subscription', async () => {
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

      await subscriptionNFT.grantOperatorRole(
        nevermined.keeper.conditions.transferNft721Condition.address,
        publisher,
      )

      const nftAttributes = NFTAttributes.getSubscriptionInstance({
        metadata: getMetadata(),
        serviceTypes: ['nft-sales'],
        providers: [config.neverminedNodeAddress],
        duration: 0,
        nftContractAddress: subscriptionNFT.address,
      })
      subscriptionDDO = await nevermined.nfts721.create(nftAttributes, publisher)
      assert.isDefined(subscriptionDDO)
    })

    it('The publisher creates a dataset to associate to the subscription', async () => {
      const nftAttributes = NFTAttributes.getNFT721Instance({
        metadata: getMetadata(),
        serviceTypes: ['nft-access'],
        providers: [config.neverminedNodeAddress],
        nftContractAddress: subscriptionNFT.address,
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

    it.skip('The subscriber should have an nft balance', async () => {
      console.log(await nevermined.web3.getBlockNumber())
      const balance = await subscriptionNFT.balanceOf(subscriber.getId())
      assert.equal(balance.toNumber(), 1)
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
})
