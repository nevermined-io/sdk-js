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

  const PLAN_DID = process.env.PLAN_DID || undefined
  const USE_EXISTING_PLAN = PLAN_DID && PLAN_DID.startsWith('did:nv')

  let IS_NATIVE_TOKEN = false

  // 10000
  // const AMOUNT_OLAS_FEE = 10000n
  // const AMOUNT_PLAN_PRICE = 98000n
  let PLAN_FEE_NVM: bigint
  let PLAN_FEE_MKT: bigint
  let PLAN_PRICE_MECHS: bigint
  let AMOUNT_TOTAL: bigint

  let RECEIVER_NVM_FEE: string
  const RECEIVER_OLAS_FEE = OLAS_MARKETPLACE_ADDRESS
  const RECEIVER_PLAN = process.env.RECEIVER_PLAN || ZeroAddress

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

  let planPrice: AssetPrice

  let subscriptionMetadata: MetaData
  let subsSalesService

  const preMint = false
  const nftTransfer = false

  let initialBalances: any

  let subscriptionNFT: NFT1155Api
  let neverminedNodeAddress

  before(async () => {
    TestContractHandler.setConfig(config)

    nevermined = await Nevermined.getInstance(config)
    ;[publisher, subscriber] = nevermined.accounts.list()

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)
    await nevermined.services.marketplace.login(clientAssertion)

    subscriptionMetadata = getMetadata(undefined, 'OLAS Plan')
    subscriptionMetadata.main.type = 'subscription'

    neverminedNodeAddress = await nevermined.services.node.getProviderAddress()

    // conditions
    ;({ escrowPaymentCondition } = nevermined.keeper.conditions)

    console.log(`Using Token Address: ${TOKEN_ADDRESS}`)
    console.log(`Publisher: ${publisher.getId()}`)
    console.log(`Subscriber: ${subscriber.getId()}`)

    RECEIVER_NVM_FEE = await nevermined.keeper.nvmConfig.getFeeReceiver()

    PLAN_FEE_NVM = BigInt(process.env.PLAN_FEE_NVM || '0')
    PLAN_FEE_MKT = BigInt(process.env.PLAN_FEE_MKT || '0')
    PLAN_PRICE_MECHS = BigInt(process.env.PLAN_PRICE_MECHS || '0')

    console.log(`PLAN_FEES: ${PLAN_FEE_NVM} - ${PLAN_FEE_MKT} - ${PLAN_PRICE_MECHS}`)

    const distPayments = new Map()
    if (PLAN_FEE_NVM > 0n) distPayments.set(RECEIVER_NVM_FEE, PLAN_FEE_NVM)
    if (PLAN_FEE_MKT > 0n) distPayments.set(RECEIVER_OLAS_FEE, PLAN_FEE_MKT)
    if (PLAN_PRICE_MECHS > 0n) distPayments.set(RECEIVER_PLAN, PLAN_PRICE_MECHS)

    console.log(distPayments)
    assert.isTrue(distPayments.size > 0)

    planPrice = new AssetPrice(distPayments).setTokenAddress(TOKEN_ADDRESS)

    console.log(`Distribution of payments: ${JSON.stringify(distPayments.values(), jsonReplacer)}`)
    console.log(`Plan Price: ${JSON.stringify(planPrice, jsonReplacer)}`)

    AMOUNT_TOTAL = planPrice.getTotalPrice()
    IS_NATIVE_TOKEN = TOKEN_ADDRESS === ZeroAddress

    if (!IS_NATIVE_TOKEN) {
      token = await nevermined.contracts.loadErc20(TOKEN_ADDRESS)
      initialBalances = {
        publisher: await token.balanceOf(publisher.getId()),
        subscriber: await token.balanceOf(subscriber.getId()),
        olas: await token.balanceOf(OLAS_MARKETPLACE_ADDRESS),
        escrowPaymentCondition: await token.balanceOf(escrowPaymentCondition.address),
      }
    } else {
      initialBalances = {
        publisher: await nevermined.client.public.getBalance({ address: publisher.getId() }),
        subscriber: await nevermined.client.public.getBalance({ address: subscriber.getId() }),
        olas: await nevermined.client.public.getBalance({
          address: OLAS_MARKETPLACE_ADDRESS as `0x${string}`,
        }),
        escrowPaymentCondition: nevermined.client.public.getBalance({
          address: escrowPaymentCondition.address,
        }),
      }
    }
    console.log(`Initial Balances: ${JSON.stringify(initialBalances, jsonReplacer)}`)
    console.log(`Asset Price: ${JSON.stringify(planPrice, jsonReplacer)}`)
  })

  describe('As PUBLISHER I want to register a new Plan', () => {
    it('I want to register the Plan', async () => {
      // Deploy NFT
      TestContractHandler.setConfig(config)

      subscriptionNFT = await nevermined.contracts.loadNft1155(SUBSCRIPTION_NFT_ADDRESS)

      console.debug(`Using Subscription NFT address: ${subscriptionNFT.address}`)
      assert.equal(nevermined.nfts1155.getContract.address, subscriptionNFT.address)

      if (USE_EXISTING_PLAN) {
        console.log(`USING PLAN DID PASS BY PARAMETER: ${PLAN_DID}`)
        subscriptionDDO = await nevermined.assets.resolve(PLAN_DID)
      } else {
        console.log(`PUBLISHING NEW PLAN`)
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
        })
        subscriptionDDO = await nevermined.nfts1155.create(nftAttributes, publisher)
        assert.equal(await subscriptionNFT.balance(subscriptionDDO.id, publisher.getId()), 0n)
      }

      assert.isDefined(subscriptionDDO)
      console.log(`OLAS Plan DID: ${subscriptionDDO.id}`)
      console.log(`  DID Providers: ${neverminedNodeAddress} - ${OLAS_MARKETPLACE_ADDRESS}`)
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
      if (USE_EXISTING_PLAN) assert.isDefined(details.owner)
      else assert.equal(details.owner, publisher.getId())
    })

    it('I am ordering the subscription NFT', async () => {
      subsSalesService = subscriptionDDO.findServiceByType('nft-sales')
      console.debug(`Ordering service with index ${subsSalesService.index}`)
      agreementId = await nevermined.nfts1155.order(
        subscriptionDDO.id,
        SUBSCRIPTION_CREDITS,
        subscriber,
      )

      assert.isDefined(agreementId)
      console.debug(`Agreement ID: ${agreementId}`)
      const subscriberBalanceAfter = IS_NATIVE_TOKEN
        ? await nevermined.client.public.getBalance({ address: subscriber.getId() })
        : await token.balanceOf(subscriber.getId())

      if (IS_NATIVE_TOKEN) {
        assert.isTrue(subscriberBalanceAfter < initialBalances.subscriber)
      } else {
        assert.equal(subscriberBalanceAfter, initialBalances.subscriber - AMOUNT_TOTAL)
      }
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
      if (!USE_EXISTING_PLAN) assert.isTrue(creditsBalanceBefore === 0n)

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
      assert.isTrue(balanceAfter >= SUBSCRIPTION_CREDITS)
    })

    it('the editor and reseller can receive their payment', async () => {
      const tokenBalance = IS_NATIVE_TOKEN
        ? await nevermined.client.public.getBalance({
            address: OLAS_MARKETPLACE_ADDRESS as `0x${string}`,
          })
        : await token.balanceOf(OLAS_MARKETPLACE_ADDRESS)

      console.log(`OLAS Marketplace Token Balance: ${tokenBalance}`)
      console.log('Initial Balances: ', initialBalances)
      console.log('Amounts OLAS FEE: ', PLAN_FEE_MKT)

      assert.isTrue(tokenBalance > initialBalances.olas)
    })
  })
})
