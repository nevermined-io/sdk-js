import chai, { assert } from 'chai'
import { decodeJwt } from 'jose'
import chaiAsPromised from 'chai-as-promised'
import {
  Account,
  DDO,
  Nevermined,
  generateId,
  AssetPrice,
  AssetAttributes,
  NFTAttributes,
} from '../../src'
import { Service } from '../../src/ddo'
import {
  ConditionState,
  EscrowPaymentCondition,
  LockPaymentCondition,
  TransferNFTCondition,
  Nft1155Contract,
  NFTAccessTemplate,
  NFTSalesTemplate,
  Token,
} from '../../src/keeper'
import { formatUnits, getConditionsByParams, parseUnits } from '../../src/utils'
import { config } from '../config'
import { getMetadata } from '../utils'
import { getRoyaltyAttributes, RoyaltyAttributes, RoyaltyKind } from '../../src/nevermined'

chai.use(chaiAsPromised)

describe('Secondary Markets', () => {
  let owner: Account
  let artist: Account
  let collector1: Account
  let collector2: Account
  let gallery: Account

  let nevermined: Nevermined
  let token: Token
  let nftUpgradeable: Nft1155Contract
  let transferNftCondition: TransferNFTCondition
  let lockPaymentCondition: LockPaymentCondition
  let escrowPaymentCondition: EscrowPaymentCondition
  let nftSalesTemplate: NFTSalesTemplate
  let nftAccessTemplate: NFTAccessTemplate

  let ddo: DDO

  const royalties = 10 // 10% of royalties in the secondary market
  const cappedAmount = 5n
  let royaltyAttributes: RoyaltyAttributes
  let agreementId: string
  let agreementId2: string
  let agreementId3: string
  let agreementAccessId: string
  let agreementAccessId2: string
  let agreementIdSeed: string
  let agreementId2Seed: string
  let agreementAccessIdSeed: string
  let agreementAccessId2Seed: string
  let nftSalesServiceAgreement: Service

  // Configuration of First Sale:
  // Artist -> Collector1, the gallery get a cut (25%)
  const numberNFTs = 1n
  let nftPrice = 20n
  let amounts = [15n, 5n]
  let receivers: string[]
  let assetPrice1: AssetPrice

  // Configuration of Sale in secondary market:
  // Collector1 -> Collector2, the artist get 10% royalties
  const numberNFTs2 = 1n
  const nftTransfer = true
  let nftPrice2 = 100n
  let amounts2 = [90n, 10n]
  let receivers2: string[]
  let receivers3: string[]
  let assetPrice2: AssetPrice
  let assetPrice3: AssetPrice

  let initialBalances: any
  let decimals: number

  let nftBalanceCollector1Before: bigint
  let nftBalanceCollector2Before: bigint

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;[owner, artist, collector1, collector2, gallery] = await nevermined.accounts.list()

    receivers = [artist.getId(), gallery.getId()]
    receivers2 = [collector1.getId(), artist.getId()]
    receivers3 = [collector2.getId(), artist.getId()]

    // components
    ;({ token, nftUpgradeable } = nevermined.keeper)

    // conditions
    ;({ transferNftCondition, lockPaymentCondition, escrowPaymentCondition } =
      nevermined.keeper.conditions)

    // templates
    ;({ nftSalesTemplate, nftAccessTemplate } = nevermined.keeper.templates)

    decimals = await token.decimals()

    nftPrice = parseUnits(nftPrice.toString(), decimals)
    amounts = amounts.map((v) => parseUnits(v.toString(), decimals))
    nftPrice2 = parseUnits(nftPrice2.toString(), decimals)
    amounts2 = amounts2.map((v) => parseUnits(v.toString(), decimals))

    assetPrice1 = new AssetPrice(
      new Map([
        [receivers[0], amounts[0]],
        [receivers[1], amounts[1]],
      ]),
    ).setTokenAddress(token.address)

    assetPrice2 = new AssetPrice(
      new Map([
        [receivers2[0], amounts2[0]],
        [receivers2[1], amounts2[1]],
      ]),
    ).setTokenAddress(token.address)

    assetPrice3 = new AssetPrice(
      new Map([
        [receivers3[0], amounts2[0]],
        [receivers3[1], amounts2[1]],
      ]),
    ).setTokenAddress(token.address)
  })

  describe('Collector1 initiates the sales agreement', () => {
    before(async () => {
      // initial balances
      initialBalances = {
        artist: await token.balanceOf(artist.getId()),
        collector1: await token.balanceOf(collector1.getId()),
        collector2: await token.balanceOf(collector2.getId()),
        gallery: await token.balanceOf(gallery.getId()),
        escrowPaymentCondition: await token.balanceOf(escrowPaymentCondition.address),
      }
      agreementIdSeed = generateId()
      agreementId2Seed = generateId()
      agreementAccessIdSeed = generateId()
      agreementAccessId2Seed = generateId()

      agreementId = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementIdSeed,
        collector1.getId(),
      )
      agreementId2 = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementId2Seed,
        collector2.getId(),
      )
      agreementAccessId = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementAccessIdSeed,
        collector1.getId(),
      )
      agreementAccessId2 = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementAccessId2Seed,
        collector2.getId(),
      )

      const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

      await nevermined.services.marketplace.login(clientAssertion)

      const payload = decodeJwt(config.marketplaceAuthToken)
      const metadata = getMetadata()
      metadata.userId = payload.sub

      royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, royalties)

      const assetAttributes = AssetAttributes.getInstance({
        metadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: assetPrice1,
            nft: { amount: numberNFTs, nftTransfer },
          },
          {
            serviceType: 'nft-access',
            nft: { amount: numberNFTs },
          },
        ],
      })
      const nftAttributes = NFTAttributes.getNFT1155Instance({
        ...assetAttributes,
        nftContractAddress: nftUpgradeable.address,
        cap: cappedAmount,
        royaltyAttributes,
      })
      ddo = await nevermined.nfts1155.create(nftAttributes, artist)
    })

    describe('As an artist I want to register a new artwork', () => {
      it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
        await nftUpgradeable.setApprovalForAll(transferNftCondition.address, true, artist)

        const balance = await nftUpgradeable.balance(artist.getId(), ddo.id)
        assert.equal(balance, 5n)
      })
    })

    describe('As a collector I want to buy some art', () => {
      it('I am setting an agreement for buying a NFT', async () => {
        const result = await nftSalesTemplate.createAgreementFromDDO(
          agreementIdSeed,
          ddo,
          nftSalesTemplate.params(collector1.getId(), numberNFTs),
          collector1,
          collector1,
        )
        assert.isDefined(result)

        const status = await nftSalesTemplate.getAgreementStatus(agreementId)
        assert.equal(status && status.lockPayment.state, ConditionState.Unfulfilled)
        assert.equal(status && status.transferNFT.state, ConditionState.Unfulfilled)
        assert.equal(status && status.escrowPayment.state, ConditionState.Unfulfilled)
      })

      it('I am locking the payment', async () => {
        await collector1.requestTokens(formatUnits(nftPrice, decimals))

        const collector1BalanceBefore = await token.balanceOf(collector1.getId())
        assert.equal(collector1BalanceBefore, initialBalances.collector1 + nftPrice)

        const receipt = await nevermined.agreements.conditions.lockPayment(
          agreementId,
          ddo.id,
          assetPrice1.getAmounts(),
          assetPrice1.getReceivers(),
          token.address,
          collector1,
        )
        assert.isTrue(receipt)

        const collector1BalanceAfter = await token.balanceOf(collector1.getId())
        const escrowPaymentConditionBalance = await token.balanceOf(escrowPaymentCondition.address)
        assert.equal(collector1BalanceAfter, initialBalances.collector1)
        assert.equal(
          escrowPaymentConditionBalance - initialBalances.escrowPaymentCondition,
          nftPrice,
        )
      })

      it('The artist can check the payment and transfer the NFT to the collector', async () => {
        const nftBalanceArtistBefore = await nftUpgradeable.balance(artist.getId(), ddo.id)
        const nftBalanceCollectorBefore = await nftUpgradeable.balance(collector1.getId(), ddo.id)

        const service = ddo.findServiceByType('nft-sales')

        const receipt = await nevermined.agreements.conditions.transferNft(
          agreementId,
          ddo,
          service.index,
          numberNFTs,
          artist,
        )
        assert.isTrue(receipt)

        const nftBalanceArtistAfter = await nftUpgradeable.balance(artist.getId(), ddo.id)
        const nftBalanceCollectorAfter = await nftUpgradeable.balance(collector1.getId(), ddo.id)

        assert.equal(nftBalanceArtistAfter, nftBalanceArtistBefore - numberNFTs)
        assert.equal(nftBalanceCollectorAfter, nftBalanceCollectorBefore + numberNFTs)
      })

      it('the artist asks and receives the payment', async () => {
        const receipt = await nevermined.agreements.conditions.releaseNftReward(
          agreementId,
          ddo,
          'nft-sales',
          numberNFTs,
          artist,
        )
        assert.isTrue(receipt)

        const escrowPaymentConditionBalance = await token.balanceOf(escrowPaymentCondition.address)
        const receiver0Balance = await token.balanceOf(receivers[0])
        const receiver1Balance = await token.balanceOf(receivers[1])
        const collectorBalance = await token.balanceOf(collector1.getId())

        assert.equal(receiver0Balance, initialBalances.artist + amounts[0])
        assert.equal(receiver1Balance, initialBalances.gallery + amounts[1])
        assert.equal(collectorBalance, initialBalances.collector1)
        assert.equal(escrowPaymentConditionBalance, initialBalances.escrowPaymentCondition)
      })
    })

    describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
      it('The collector sets up the NFT access agreement', async () => {
        // Collector1: Create NFT access agreement
        const result = await nftAccessTemplate.createAgreementFromDDO(
          agreementAccessIdSeed,
          ddo,
          nftAccessTemplate.params(collector1.getId(), numberNFTs),
          collector1,
          collector1,
        )
        assert.isDefined(result)

        const status = await nftAccessTemplate.getAgreementStatus(agreementAccessId)
        assert.equal(status && status.nftHolder.state, ConditionState.Unfulfilled)
        assert.equal(status && status.nftAccess.state, ConditionState.Unfulfilled)
      })

      it('The collector demonstrates it owns the NFT', async function () {
        // TODO: Not sure why we need to wait here but without this the
        // the fulfillment will fail
        await new Promise((r) => setTimeout(r, 10000))
        const result = await nevermined.agreements.conditions.holderNft(
          agreementAccessId,
          ddo.id,
          collector1.getId(),
          numberNFTs,
        )
        assert.isTrue(result)
      })

      it(' The artist gives access to the collector to the content', async function () {
        const result = await nevermined.agreements.conditions.grantNftAccess(
          agreementAccessId,
          ddo.id,
          collector1.getId(),
          artist,
        )
        assert.isTrue(result)
      })
    })

    describe('As collector1 I want to sell my NFT to collector2 for a higher price', () => {
      before(async () => {
        // initial balances
        initialBalances = {
          artist: await token.balanceOf(artist.getId()),
          collector1: await token.balanceOf(collector1.getId()),
          collector2: await token.balanceOf(collector2.getId()),
          gallery: await token.balanceOf(gallery.getId()),
          owner: await token.balanceOf(owner.getId()),
          lockPaymentCondition: await token.balanceOf(lockPaymentCondition.address),
          escrowPaymentCondition: await token.balanceOf(escrowPaymentCondition.address),
        }
        ddo.setNFTRewardsFromService('nft-sales', assetPrice2, collector1.getId())
      })

      it('As collector1 I create and store an off-chain service agreement', async () => {
        const nftSalesServiceAgreementTemplate = nftSalesTemplate.getServiceAgreementTemplate()
        const nftSalesTemplateConditions = nftSalesTemplate.getServiceAgreementTemplateConditions()

        nftSalesServiceAgreementTemplate.conditions = getConditionsByParams(
          'nft-sales',
          nftSalesTemplateConditions,
          collector1.getId(),
          assetPrice2,
          ddo.id,
          token.address,
          undefined,
          collector1.getId(),
          numberNFTs2,
          true,
        )

        nftSalesServiceAgreement = {
          type: 'nft-sales',
          index: 6,
          serviceEndpoint: nevermined.services.node.getNftEndpoint(),
          templateId: nftSalesTemplate.address,
          attributes: {
            main: {
              name: 'nftSalesAgreement',
              creator: collector1.getId(),
              datePublished: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
              timeout: 86400,
            },
            additionalInformation: {
              description: '',
            },
            serviceAgreementTemplate: nftSalesServiceAgreementTemplate,
          },
        }

        console.log('nftSalesServiceAgreement', JSON.stringify(nftSalesServiceAgreement))
        // This Service agreement is stored on elasticsearch through the metadata api
      })

      it('As collector2 I am setting an agreement up for buying an NFT', async () => {
        const result = await nftSalesTemplate.createAgreementFromDDO(
          agreementId2Seed,
          ddo,
          nftSalesTemplate.params(collector2.getId(), numberNFTs2),
          collector2,
          collector2,
        )
        assert.isDefined(result)

        const status = await nftSalesTemplate.getAgreementStatus(agreementId2)
        assert.equal(status && status.lockPayment.state, ConditionState.Unfulfilled)
        assert.equal(status && status.transferNFT.state, ConditionState.Unfulfilled)
        assert.equal(status && status.escrowPayment.state, ConditionState.Unfulfilled)
      })

      it('As collector2 I am locking the payment', async () => {
        // Collector2 gets the price from some marketplace
        // (query the service agreements from the metadata)
        await collector2.requestTokens(formatUnits(nftPrice2, decimals))

        const collector2BalanceBefore = await token.balanceOf(collector2.getId())
        assert.equal(collector2BalanceBefore, initialBalances.collector2 + nftPrice2)

        // After fetching the previously created sales agreement
        const assetPriceFromServiceAgreement =
          DDO.getAssetPriceFromService(nftSalesServiceAgreement)
        const payment = DDO.findServiceConditionByName(nftSalesServiceAgreement, 'lockPayment')

        const receipt = await nevermined.agreements.conditions.lockPayment(
          agreementId2,
          ddo.id,
          assetPriceFromServiceAgreement.getAmounts(),
          assetPriceFromServiceAgreement.getReceivers(),
          payment.parameters.find((p) => p.name === '_tokenAddress').value as string,
          collector2,
        )
        assert.isTrue(receipt)

        const collector2BalanceAfter = await token.balanceOf(collector2.getId())
        const escrowPaymentConditionBalance = await token.balanceOf(escrowPaymentCondition.address)

        assert.equal(collector2BalanceAfter, initialBalances.collector2)
        assert.equal(
          escrowPaymentConditionBalance - initialBalances.escrowPaymentCondition,
          nftPrice2,
        )
      })

      it('As collector1 I can check the payment and transfer the NFT to collector2', async () => {
        const nftBalanceCollector1Before = await nftUpgradeable.balance(collector1.getId(), ddo.id)
        const nftBalanceCollector2Before = await nftUpgradeable.balance(collector2.getId(), ddo.id)

        const service = ddo.findServiceByType('nft-sales')

        const receipt = await nevermined.agreements.conditions.transferNft(
          agreementId2,
          ddo,
          service.index,
          numberNFTs2,
          collector1,
        )

        assert.isTrue(receipt)

        const nftBalanceCollector1After = await nftUpgradeable.balance(collector1.getId(), ddo.id)
        const nftBalanceCollector2After = await nftUpgradeable.balance(collector2.getId(), ddo.id)

        assert.equal(
          Number(nftBalanceCollector1After),
          Number(nftBalanceCollector1Before) - Number(numberNFTs2),
        )
        assert.equal(
          Number(nftBalanceCollector2After),
          Number(nftBalanceCollector2Before) + Number(numberNFTs2),
        )
      })

      it('Collector1 and Artist get the payment', async () => {
        // After fetching the previously created sales agreement
        const assetPriceFromServiceAgreement =
          DDO.getAssetPriceFromService(nftSalesServiceAgreement)

        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.address,
        )

        const receipt = await nevermined.agreements.conditions.releaseNftReward(
          agreementId2,
          ddo,
          'nft-sales',
          numberNFTs2,
          collector1,
        )
        assert.isTrue(receipt)

        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.address,
        )
        const receiver0Balance = await token.balanceOf(receivers2[0])
        const receiver1Balance = await token.balanceOf(receivers2[1])
        const collectorBalance = await token.balanceOf(collector2.getId())

        assert.equal(receiver0Balance, initialBalances.collector1 + amounts2[0])
        assert.equal(receiver1Balance, initialBalances.artist + amounts2[1])
        assert.equal(collectorBalance, initialBalances.collector2)

        assert.equal(
          escrowPaymentConditionBalanceBefore - assetPriceFromServiceAgreement.getTotalPrice(),
          escrowPaymentConditionBalanceAfter,
        )
      })
    })

    describe('As collector1 I want to give exclusive access to the collectors owning a specific NFT', () => {
      before(async () => {
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(collector2)
        ddo.setNFTRewardsFromService('nft-sales', assetPrice3, collector2.getId())

        await nevermined.services.marketplace.login(clientAssertion)
      })

      it('The collector2 sets up the NFT access agreement', async () => {
        // Collector1: Create NFT access agreement
        const result = await nftAccessTemplate.createAgreementFromDDO(
          agreementAccessId2Seed,
          ddo,
          nftAccessTemplate.params(collector2.getId(), numberNFTs),
          collector2,
          collector2,
        )
        assert.isDefined(result)

        const status = await nftAccessTemplate.getAgreementStatus(agreementAccessId2)
        assert.equal(status && status.nftHolder.state, ConditionState.Unfulfilled)
        assert.equal(status && status.nftAccess.state, ConditionState.Unfulfilled)
      })

      it('The collector2 demonstrates it owns the NFT', async function () {
        // TODO: Not sure why we need to wait here but without this the
        // the fulfillment will fail
        await new Promise((r) => setTimeout(r, 10000))
        const result = await nevermined.agreements.conditions.holderNft(
          agreementAccessId2,
          ddo.id,
          collector2.getId(),
          numberNFTs,
        )
        assert.isTrue(result)
      })

      it('The artist gives access to the collector2 to the content', async function () {
        const result = await nevermined.agreements.conditions.grantNftAccess(
          agreementAccessId2,
          ddo.id,
          collector2.getId(),
          artist,
        )
        assert.isTrue(result)
      })

      it('Collector 1 no longer has access the to the content', async () => {
        // Not the best way to do this but on localnet we don't get the revert reasons
        await assert.isRejected(
          nevermined.agreements.conditions.holderNft(
            agreementAccessId,
            ddo.id,
            collector1.getId(),
            numberNFTs,
          ),
        )
      })

      it('As collector2 I setup an agreement for selling my NFT', async () => {
        agreementId3 = await nevermined.nfts1155.listOnSecondaryMarkets(
          ddo,
          assetPrice3,
          numberNFTs2,
          nftTransfer,
          collector2.getId(),
          token,
          collector2,
        )
        assert.isNotNull(agreementId3)

        const service = await nevermined.services.metadata.retrieveService(agreementId3)
        assert.isDefined(service)
      })

      it('As collector1 I buy the secondary market NFT', async () => {
        await collector1.requestTokens(formatUnits(nftPrice2, decimals))

        nftBalanceCollector1Before = await nftUpgradeable.balance(collector1.getId(), ddo.id)
        nftBalanceCollector2Before = await nftUpgradeable.balance(collector2.getId(), ddo.id)

        const result = await nevermined.nfts1155.buySecondaryMarketNft(collector1, 1n, agreementId3)

        assert.isTrue(result)
      })

      it('As collector2 I see the bid locked and trigger the reward release', async () => {
        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.address,
        )

        const result = await nevermined.nfts1155.releaseSecondaryMarketRewards(
          collector2,
          collector1,
          agreementId3,
        )
        assert.isTrue(result)

        const nftBalanceCollector1After = await nftUpgradeable.balance(collector1.getId(), ddo.id)
        const nftBalanceCollector2After = await nftUpgradeable.balance(collector2.getId(), ddo.id)

        assert.equal(nftBalanceCollector1After, nftBalanceCollector1Before + numberNFTs2)
        assert.equal(nftBalanceCollector2After, nftBalanceCollector2Before - numberNFTs2)

        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.address,
        )
        const receiver0Balance = await token.balanceOf(receivers3[0])
        const receiver1Balance = await token.balanceOf(receivers3[1])
        const artistBalance = await token.balanceOf(artist.getId())
        const collector1Balance = await token.balanceOf(collector1.getId())

        assert.equal(receiver0Balance, initialBalances.collector2 + amounts2[0])
        assert.equal(receiver1Balance, artistBalance)
        assert.isTrue(collector1Balance >= nftPrice2)
        assert.equal(
          escrowPaymentConditionBalanceBefore - AssetPrice.sumAmounts(amounts2),
          escrowPaymentConditionBalanceAfter,
        )
      })
    })
  })
})
