import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { DDO } from '../../src/ddo/DDO'
import { NvmAccount } from '../../src/models/NvmAccount'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { MetaData } from '../../src/types/DDOTypes'
import config from '../../test/config'

import { jsonReplacer } from '../../src/common/helpers'
import { EscrowPaymentCondition } from '../../src/keeper/contracts/conditions'
import { Token } from '../../src/keeper/contracts/Token'
import { AssetPrice } from '../../src/models/AssetPrice'
import { NFTAttributes } from '../../src/models/NFTAttributes'
import { NFT1155Api } from '../../src/nevermined/api'
// import { getRoyaltyAttributes, RoyaltyAttributes } from '../../src/nevermined/api/AssetsApi'
// import { RoyaltyKind } from '../../src/types/MetadataTypes'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { getMetadata } from '../utils/ddo-metadata-generator'
import { ZeroAddress } from '../../src'

chai.use(chaiAsPromised)

describe('OLAS e2e tests', () => {
  const SUBSCRIPTION_NFT_ADDRESS: string = process.env.SUBSCRIPTION_NFT_ADDRESS || ZeroAddress
  const OLAS_MARKETPLACE_ADDRESS: string = process.env.OLAS_MARKETPLACE_ADDRESS || ZeroAddress
  const TOKEN_ADDRESS: string = process.env.TOKEN_ADDRESS || ZeroAddress

  // 10000
  let AMOUNT_NVM_FEE: bigint
  const AMOUNT_OLAS_FEE = 400n
  const AMOUNT_PLAN_PRICE = 9600n
  let AMOUNT_TOTAL: bigint

  let RECEIVER_NVM_FEE: string
  const RECEIVER_OLAS_FEE = OLAS_MARKETPLACE_ADDRESS
  const RECEIVER_PLAN_PRICE = process.env.RECEIVER_PLAN_PRICE || ZeroAddress

  // This is the number of credits that the subscriber will get when purchase the subscription
  // In the DDO this will be added in the `_numberNFTs` value of the `nft-sales` service of the subscription
  const SUBSCRIPTION_CREDITS = BigInt(process.env.SUBSCRIPTION_CREDITS || '100')

  let publisher: NvmAccount
  let subscriber: NvmAccount

  let nevermined: Nevermined
  let token: Token
  let escrowPaymentCondition: EscrowPaymentCondition
  let subscriptionDDO: DDO

  let agreementId: string

  // Configuration of First Sale:
  // Editor -> Subscriber, the Reseller get a cut (25%)
  let amounts: bigint[] = []
  let receivers: string[] = []
  let planPrice: AssetPrice
  // let royaltyAttributes: RoyaltyAttributes

  let subscriptionMetadata: MetaData
  let subsSalesService

  const preMint = false
  // const royalties = 0
  const nftTransfer = false

  let initialBalances: any
  // let scale: bigint

  let subscriptionNFT: NFT1155Api
  let neverminedNodeAddress

  before(async () => {
    // console.log(JSON.stringify(config, jsonReplacer))
    TestContractHandler.setConfig(config)

    nevermined = await Nevermined.getInstance(config)
    ;[, publisher, subscriber] = nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)
    await nevermined.services.marketplace.login(clientAssertion)

    subscriptionMetadata = getMetadata(undefined, 'OLAS Plan')
    subscriptionMetadata.main.type = 'subscription'

    neverminedNodeAddress = await nevermined.services.node.getProviderAddress()

    // conditions
    ;({ escrowPaymentCondition } = nevermined.keeper.conditions)

    // components
    // ;({ token } = nevermined.keeper)
    token = await nevermined.contracts.loadErc20(TOKEN_ADDRESS)
    console.log(`Using Token Address: ${token.address}`)

    // scale = 10n ** BigInt(await token.decimals())

    // subscriptionPrice = subscriptionPrice * scale
    // amounts = amounts.map((v) => v * scale)
    // receivers = [publisher.getId(), reseller.getId()]

    RECEIVER_NVM_FEE = await nevermined.keeper.nvmConfig.getFeeReceiver()
    AMOUNT_NVM_FEE = await nevermined.keeper.nvmConfig.getNetworkFee()
    receivers = [RECEIVER_OLAS_FEE, RECEIVER_PLAN_PRICE]
    amounts = [AMOUNT_OLAS_FEE, AMOUNT_PLAN_PRICE]

    planPrice = new AssetPrice(
      new Map([
        [receivers[0], amounts[0]],
        [receivers[1], amounts[1]],
      ]),
    )
      .setTokenAddress(TOKEN_ADDRESS)
      .adjustToIncludeNetworkFees(RECEIVER_NVM_FEE, AMOUNT_NVM_FEE)

    AMOUNT_TOTAL = planPrice.getTotalPrice()
    // royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, royalties)

    initialBalances = {
      publisher: await token.balanceOf(publisher.getId()),
      subscriber: await token.balanceOf(subscriber.getId()),
      olas: await token.balanceOf(OLAS_MARKETPLACE_ADDRESS),
      escrowPaymentCondition: await token.balanceOf(escrowPaymentCondition.address),
    }

    console.log(`Initial Balances: ${JSON.stringify(initialBalances, jsonReplacer)}`)
    console.log(`Asset Price: ${JSON.stringify(planPrice, jsonReplacer)}`)
  })

  describe('As PUBLISHER I want to register a new Plan', () => {
    it('I want to register the Plan', async () => {
      // Deploy NFT
      TestContractHandler.setConfig(config)

      // const networkName = await nevermined.keeper.getNetworkName()
      // const contractABI = await TestContractHandler.getABIArtifact(
      //   'NFT1155SubscriptionUpgradeable',
      //   config.artifactsFolder,
      //   networkName,
      // )
      // subscriptionNFT = await SubscriptionCreditsNFTApi.deployInstance(
      //   config,
      //   contractABI,
      //   publisher,
      //   [
      //     publisher.getId(),
      //     nevermined.keeper.didRegistry.address,
      //     'Credits Subscription NFT',
      //     'CRED',
      //     '',
      //     nevermined.keeper.nvmConfig.address,
      //   ] as any,
      // )

      // console.debug(`Deployed ERC-1155 Subscription NFT on address: ${subscriptionNFT.address}`)

      // await nevermined.contracts.loadNft1155Api(subscriptionNFTAddress)
      subscriptionNFT = await nevermined.contracts.loadNft1155(SUBSCRIPTION_NFT_ADDRESS)

      console.debug(`Using Subscription NFT address: ${subscriptionNFT.address}`)

      // await subscriptionNFT.grantOperatorRole(transferNftCondition.address, publisher)
      // console.debug(`Granting operator role to Nevermined Node Address: ${neverminedNodeAddress}`)
      // await subscriptionNFT.grantOperatorRole(neverminedNodeAddress, publisher)
      // console.debug(`Granting operator role to OLAS Marketplace Address: ${OLAS_MARKETPLACE_ADDRESS}`)
      // await subscriptionNFT.grantOperatorRole(OLAS_MARKETPLACE_ADDRESS, publisher)

      assert.equal(nevermined.nfts1155.getContract.address, subscriptionNFT.address)

      const nftAttributes = NFTAttributes.getCreditsSubscriptionInstance({
        metadata: subscriptionMetadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: planPrice,
            nft: { amount: SUBSCRIPTION_CREDITS, nftTransfer },
          },
        ],
        providers: [neverminedNodeAddress, OLAS_MARKETPLACE_ADDRESS],
        nftContractAddress: subscriptionNFT.address,
        preMint,
        // royaltyAttributes: royaltyAttributes,
      })
      subscriptionDDO = await nevermined.nfts1155.create(nftAttributes, publisher)

      assert.equal(await subscriptionNFT.balance(subscriptionDDO.id, publisher.getId()), 0n)
      assert.isDefined(subscriptionDDO)
      console.log(`OLAS Plan DID: ${subscriptionDDO.id}`)
      console.log(`  DID Providerss: ${neverminedNodeAddress} - ${OLAS_MARKETPLACE_ADDRESS}`)
    })

    it('should grant Nevermined the operator role', async () => {
      assert.isTrue(
        await nevermined.nfts1155.isOperatorOfDID(
          subscriptionDDO.id,
          nevermined.keeper.conditions.transferNftCondition.address,
        ),
      )
    })
  })

  describe('As a subscriber I want to buy the OLAS plan', () => {
    it('I check the details of the subscription NFT', async () => {
      const details = await nevermined.nfts1155.details(subscriptionDDO.id)
      assert.equal(details.owner, publisher.getId())
    })

    it('I am ordering the subscription NFT', async () => {
      //await nevermined.accounts.requestTokens(subscriber, subscriptionPrice / scale)

      // const subscriberBalanceBefore = await token.balanceOf(subscriber.getId())
      // assert.equal(subscriberBalanceBefore, initialBalances.subscriber + subscriptionPrice)

      subsSalesService = subscriptionDDO.findServiceByType('nft-sales')
      console.debug(`Ordering service with index ${subsSalesService.index}`)
      agreementId = await nevermined.nfts1155.order(
        subscriptionDDO.id,
        SUBSCRIPTION_CREDITS,
        subscriber,
      )

      assert.isDefined(agreementId)
      console.debug(`Agreement ID: ${agreementId}`)
      const subscriberBalanceAfter = await token.balanceOf(subscriber.getId())

      assert.equal(subscriberBalanceAfter, initialBalances.subscriber - AMOUNT_TOTAL)
    })

    it('The credits seller can check the payment and transfer the NFT to the subscriber', async () => {
      // Let's use the Node to mint the subscription and release the payments

      const creditsBalanceBefore = await subscriptionNFT.balance(
        subscriptionDDO.id,
        subscriber.getId(),
      )
      console.log(`Credits Balance Before: ${creditsBalanceBefore}`)
      console.log(
        `Credits Balance Before (JSON): ${JSON.stringify(creditsBalanceBefore.toString())}`,
      )
      assert.isTrue(creditsBalanceBefore === 0n)

      try {
        const receipt = await nevermined.nfts1155.claim(
          agreementId,
          publisher.getId(),
          subscriber.getId(),
          SUBSCRIPTION_CREDITS,
          subscriptionDDO.id,
        )
        assert.isTrue(receipt)
      } catch (e) {
        console.error(e.message)
        assert.fail(e.message)
      }

      console.log(`Got the receipt`)
      const creditsBalanceAfter = await subscriptionNFT.balance(
        subscriptionDDO.id,
        subscriber.getId(),
      )
      console.log(`Credits Balance After: ${creditsBalanceAfter}`)

      assert.equal(creditsBalanceAfter, creditsBalanceBefore + SUBSCRIPTION_CREDITS)
    })

    it('the subscriber can check the balance with the new NFTs received', async () => {
      console.log(
        `Checking the balance of DID [${
          subscriptionDDO.id
        }] of the subscriber ${subscriber.getId()}`,
      )
      const balanceAfter = await subscriptionNFT.balance(subscriptionDDO.id, subscriber.getId())
      console.log(`Balance After Purchase is completed: ${balanceAfter}`)
      assert.isTrue(balanceAfter === SUBSCRIPTION_CREDITS)
    })

    it('the editor and reseller can receive their payment', async () => {
      const tokenBalance = await token.balanceOf(OLAS_MARKETPLACE_ADDRESS)
      console.log(`OLAS Marketplace Token Balance: ${tokenBalance}`)
      console.log('Initial Balances: ', initialBalances)
      console.log('Amounts OLAS FEE: ', AMOUNT_OLAS_FEE)

      assert.isTrue(tokenBalance > initialBalances.olas)
    })
  })
})
