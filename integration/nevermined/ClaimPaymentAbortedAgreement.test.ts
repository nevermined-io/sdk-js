import { assert } from 'chai'
import { decodeJwt, JWTPayload } from 'jose'
import { Account, DDO, Nevermined, NFTAttributes, AssetPrice } from '../../src'
import {
  TransferNFT721Condition,
  Token,
  Nft721Contract,
  ConditionState,
  ContractHandler,
} from '../../src/keeper'
import { config } from '../config'
import { getMetadata } from '../utils'
import { ethers } from 'ethers'
import { BigNumber, generateId } from '../../src/utils'
import '../globals'
import { mineBlocks } from '../utils/utils'

describe('Claim aborted agreements End-to-End', () => {
  let publisher: Account
  let collector1: Account
  let other: Account

  let nevermined: Nevermined
  let token: Token
  let transferNft721Condition: TransferNFT721Condition
  let ddo: DDO

  const metadata = getMetadata(Math.random(), generateId())
  let agreementId: string

  // Configuration of First Sale:
  // Publisher -> Collector1, other account get a cut (25%)
  let nftPrice = BigNumber.from(20)
  let amounts = [BigNumber.from(15), BigNumber.from(5)]
  let receivers: string[]
  let assetPrice1: AssetPrice

  let scale: BigNumber
  let neverminedNodeAddress

  let nft: ethers.Contract
  let nftContract: Nft721Contract

  let payload: JWTPayload

  const accessTimeout = 10
  const accessTimelock = 3

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;[, publisher, collector1, , other] = await nevermined.accounts.list()

    const networkName = (await nevermined.keeper.getNetworkName()).toLowerCase()
    const erc721ABI = await ContractHandler.getABI(
      'NFT721Upgradeable',
      config.artifactsFolder,
      networkName,
    )

    nft = await nevermined.utils.contractHandler.deployAbi(erc721ABI, publisher, [
      publisher.getId(),
      nevermined.keeper.didRegistry.address,
      'NFT721',
      'NVM',
      '',
      '0',
    ])

    nftContract = await Nft721Contract.getInstance(
      (nevermined.keeper as any).instanceConfig,
      nft.address,
    )

    await nevermined.contracts.loadNft721(nftContract.address)

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)

    await nevermined.services.marketplace.login(clientAssertion)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    payload = decodeJwt(config.marketplaceAuthToken!)
    neverminedNodeAddress = await nevermined.services.node.getProviderAddress()

    metadata.userId = payload.sub

    // conditions
    ;({ transferNft721Condition } = nevermined.keeper.conditions)

    // components
    ;({ token } = nevermined.keeper)

    scale = BigNumber.from(10).pow(await token.decimals())

    nftPrice = nftPrice.mul(scale)
    amounts = amounts.map((v) => v.mul(scale))
    receivers = [publisher.getId(), other.getId()]
    assetPrice1 = new AssetPrice(
      new Map([
        [receivers[0], amounts[0]],
        [receivers[1], amounts[1]],
      ]),
    )

    await nftContract.grantOperatorRole(transferNft721Condition.address, publisher)
    await collector1.requestTokens(nftPrice.div(scale).mul(10))
  })

  describe('As a publisher I want to register a new asset', () => {
    it('I want to register a new asset and tokenize (via NFT). The sales agreement expires in a few blocks', async () => {
      const nftAttributes = NFTAttributes.getNFT721Instance({
        metadata,
        price: assetPrice1,
        providers: [neverminedNodeAddress],
        serviceTypes: ['nft-sales', 'nft-access'],
        nftContractAddress: nftContract.address,
        fulfillAccessTimeout: accessTimeout,
        fulfillAccessTimelock: accessTimelock,
      })
      ddo = await nevermined.nfts721.create(nftAttributes, publisher)

      assert.isDefined(ddo)

      console.log(ddo.id)
      // Timeout & Timelock should only be set for the access condition
      assert.equal(
        ddo.findServiceByType('nft-sales').attributes.serviceAgreementTemplate?.conditions[0]
          .timeout,
        0,
      )
      assert.equal(
        ddo.findServiceByType('nft-sales').attributes.serviceAgreementTemplate?.conditions[1]
          .timeout,
        accessTimeout,
      )
      assert.equal(
        ddo.findServiceByType('nft-sales').attributes.serviceAgreementTemplate?.conditions[0]
          .timeout,
        0,
      )
      assert.equal(
        ddo.findServiceByType('nft-sales').attributes.serviceAgreementTemplate?.conditions[1]
          .timelock,
        accessTimelock,
      )

      // Timeout & Timelock should not affect access services
      assert.equal(
        ddo.findServiceByType('nft-access').attributes.serviceAgreementTemplate?.conditions[0]
          .timeout,
        0,
      )
      assert.equal(
        ddo.findServiceByType('nft-access').attributes.serviceAgreementTemplate?.conditions[1]
          .timeout,
        0,
      )
      assert.equal(
        ddo.findServiceByType('nft-access').attributes.serviceAgreementTemplate?.conditions[0]
          .timeout,
        0,
      )
      assert.equal(
        ddo.findServiceByType('nft-access').attributes.serviceAgreementTemplate?.conditions[1]
          .timelock,
        0,
      )
    })
  })

  describe('As a user I want to buy a NFT with a timelock', () => {
    it('I can not order the NFT until timelock happens', async () => {
      const collector1BalanceBefore = await token.balanceOf(collector1.getId())

      agreementId = await nevermined.nfts721.order(ddo.id, collector1)
      assert.isDefined(agreementId)

      const agreement = await nevermined.agreements.getAgreement(agreementId)

      // Transfer NFT Condition must be Time Locked
      assert.isFalse(
        await nevermined.keeper.conditionStoreManager.isConditionTimeLocked(
          agreement.conditionIds[0],
        ),
      )
      assert.isTrue(
        await nevermined.keeper.conditionStoreManager.isConditionTimeLocked(
          agreement.conditionIds[1],
        ),
      )
      assert.isFalse(
        await nevermined.keeper.conditionStoreManager.isConditionTimeLocked(
          agreement.conditionIds[2],
        ),
      )

      try {
        assert.isTrue(
          !(await nevermined.nfts721.claim(agreementId, publisher.getId(), collector1.getId())),
        )
      } catch (error) {
        console.debug(`Unable to fullfill condition because timelock`)
      }

      const agreementStatusAfter =
        await nevermined.keeper.templates.nftSalesTemplate.getAgreementStatus(agreementId)

      assert.equal(agreementStatusAfter['lockPayment'].state, ConditionState.Fulfilled)
      assert.equal(agreementStatusAfter['transferNFT'].state, ConditionState.Unfulfilled)
      assert.equal(agreementStatusAfter['escrowPayment'].state, ConditionState.Unfulfilled)

      const collector1BalanceAfter = await token.balanceOf(collector1.getId())

      assert.isTrue(collector1BalanceAfter.add(nftPrice).eq(collector1BalanceBefore))
    })

    it('I can order the NFT after the timelock', async () => {
      await mineBlocks(nevermined, collector1, accessTimelock + 1)

      const publisherBalanceBefore = await token.balanceOf(publisher.getId())
      const collector1BalanceBefore = await token.balanceOf(collector1.getId())

      const agreement = await nevermined.agreements.getAgreement(agreementId)

      // Time Lock expired
      assert.isFalse(
        await nevermined.keeper.conditionStoreManager.isConditionTimeLocked(
          agreement.conditionIds[0],
        ),
      )
      assert.isFalse(
        await nevermined.keeper.conditionStoreManager.isConditionTimeLocked(
          agreement.conditionIds[1],
        ),
      )
      assert.isFalse(
        await nevermined.keeper.conditionStoreManager.isConditionTimeLocked(
          agreement.conditionIds[2],
        ),
      )

      // Transfer NFT Condition is not timed out
      assert.isFalse(
        await nevermined.keeper.conditionStoreManager.isConditionTimedOut(
          agreement.conditionIds[1],
        ),
      )

      await nevermined.nfts721.claim(agreementId, publisher.getId(), collector1.getId())

      const agreementStatusAfter =
        await nevermined.keeper.templates.nftSalesTemplate.getAgreementStatus(agreementId)

      assert.equal(agreementStatusAfter['lockPayment'].state, ConditionState.Fulfilled)
      assert.equal(agreementStatusAfter['transferNFT'].state, ConditionState.Fulfilled)
      assert.equal(agreementStatusAfter['escrowPayment'].state, ConditionState.Fulfilled)

      const publisherBalanceAfter = await token.balanceOf(publisher.getId())
      const collector1BalanceAfter = await token.balanceOf(collector1.getId())

      assert.isTrue(collector1BalanceBefore.eq(collector1BalanceAfter))
      assert.isTrue(publisherBalanceBefore.add(amounts[0]).eq(publisherBalanceAfter))
    })
  })

  describe('As a user I want to buy a NFT with a timeout', () => {
    it('I can not get the NFT after timeout so I claim back my funds', async () => {
      const collector1BalanceBeforeOrder = await token.balanceOf(collector1.getId())

      agreementId = await nevermined.nfts721.order(ddo.id, collector1)
      const agreement = await nevermined.agreements.getAgreement(agreementId)

      assert.isFalse(
        await nevermined.keeper.conditionStoreManager.isConditionTimedOut(
          agreement.conditionIds[1],
        ),
      )

      const collector1BalanceAfter = await token.balanceOf(collector1.getId())
      assert.isTrue(collector1BalanceBeforeOrder.sub(nftPrice).eq(collector1BalanceAfter))

      await mineBlocks(nevermined, collector1, accessTimeout + 1)

      try {
        assert.isTrue(
          !(await nevermined.nfts721.claim(agreementId, publisher.getId(), collector1.getId())),
        )
      } catch (error) {
        console.debug(`Unable to fullfill condition because timeout`)
      }

      // Condition is timed out so the collector aborts it and gets the escrowed amount
      await nevermined.keeper.conditions.transferNft721Condition.abortByTimeOut(
        agreement.conditionIds[1],
        collector1,
      )
      const agreementStatusAfter =
        await nevermined.keeper.templates.nftSalesTemplate.getAgreementStatus(agreementId)

      assert.equal(agreementStatusAfter['lockPayment'].state, ConditionState.Fulfilled)
      assert.equal(agreementStatusAfter['transferNFT'].state, ConditionState.Aborted)
      assert.equal(agreementStatusAfter['escrowPayment'].state, ConditionState.Unfulfilled)

      assert.isTrue(await nevermined.nfts721.releaseRewards(agreementId, ddo.id, collector1))

      const agreementStatusReleased =
        await nevermined.keeper.templates.nftSalesTemplate.getAgreementStatus(agreementId)

      assert.equal(agreementStatusReleased['lockPayment'].state, ConditionState.Fulfilled)
      assert.equal(agreementStatusReleased['transferNFT'].state, ConditionState.Aborted)
      assert.equal(agreementStatusReleased['escrowPayment'].state, ConditionState.Fulfilled)

      const collector1BalanceReleased = await token.balanceOf(collector1.getId())
      assert.isTrue(collector1BalanceBeforeOrder.eq(collector1BalanceReleased))
    })
  })

  /**
 * 
    it.skip('Because the conditions timedout I want my money back', async () => {
      // TODO: wait for timeout

      const collector1BalanceBefore = await token.balanceOf(collector1.getId())      

      // TODO: Abort the Condition
      // TODO: Call the EscrowPayment condition


      const collector1BalanceAfter = await token.balanceOf(collector1.getId())
      assert.isTrue(collector1BalanceBefore.add(nftPrice).eq(collector1BalanceAfter))
    })
 */
})
