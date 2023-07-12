import { assert } from 'chai'
import { decodeJwt } from 'jose'
import {
  Account,
  DDO,
  Nevermined,
  generateId,
  AssetPrice,
  NFTAttributes,
  AssetAttributes,
} from '../../src'
import {
  ConditionState,
  EscrowPaymentCondition,
  LockPaymentCondition,
  NFTAccessCondition,
  NFTHolderCondition,
  TransferNFTCondition,
  Nft1155Contract,
  ConditionStoreManager,
  NFTAccessTemplate,
  NFTSalesTemplate,
  Token,
} from '../../src/keeper'
import { getRoyaltyAttributes, RoyaltyAttributes, RoyaltyKind } from '../../src/nevermined'
import { BigNumber } from '../../src/utils'
import { config } from '../config'
import { getMetadata } from '../utils'

describe('NFTTemplates E2E', () => {
  let owner: Account
  let artist: Account
  let collector1: Account
  let collector2: Account
  let gallery: Account

  let nevermined: Nevermined
  let token: Token
  let nftUpgradeable: Nft1155Contract
  let conditionStoreManager: ConditionStoreManager
  let transferNftCondition: TransferNFTCondition
  let lockPaymentCondition: LockPaymentCondition
  let escrowPaymentCondition: EscrowPaymentCondition
  let nftHolderCondition: NFTHolderCondition
  let nftAccessCondition: NFTAccessCondition
  let nftSalesTemplate: NFTSalesTemplate
  let nftAccessTemplate: NFTAccessTemplate

  let conditionIdLockPayment: [string, string]
  let conditionIdTransferNFT: [string, string]
  let conditionIdEscrow: [string, string]
  let conditionIdNFTHolder: [string, string]
  let conditionIdNFTAccess: [string, string]
  let conditionIdLockPayment2: [string, string]
  let conditionIdTransferNFT2: [string, string]
  let conditionIdEscrow2: [string, string]
  let ddo: DDO

  const royalties = 10 // 10% of royalties in the secondary market
  const cappedAmount = BigNumber.from(5)
  let agreementId: string
  let agreementAccessId: string
  let agreementId2: string
  let agreementIdSeed: string
  let agreementAccessIdSeed: string
  let agreementId2Seed: string

  // Configuration of First Sale:
  // Artist -> Collector1, the gallery get a cut (25%)
  const numberNFTs = BigNumber.from(1)
  let nftPrice = BigNumber.from(20)
  let amounts = [BigNumber.from(15), BigNumber.from(5)]
  let receivers: string[]
  let assetPrice1: AssetPrice

  // Configuration of Sale in secondary market:
  // Collector1 -> Collector2, the artist get 10% royalties
  const numberNFTs2 = BigNumber.from(1)
  let nftPrice2 = BigNumber.from(100)
  let amounts2 = [BigNumber.from(90), BigNumber.from(10)]
  let receivers2: string[]
  let assetPrice2: AssetPrice

  let initialBalances: any
  let scale: BigNumber
  let royaltyAttributes: RoyaltyAttributes

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;[owner, artist, collector1, collector2, gallery] = await nevermined.accounts.list()

    receivers = [artist.getId(), gallery.getId()]
    receivers2 = [collector1.getId(), artist.getId()]

    // components
    ;({ conditionStoreManager, token, nftUpgradeable } = nevermined.keeper)

    // conditions
    ;({
      transferNftCondition,
      lockPaymentCondition,
      escrowPaymentCondition,
      nftHolderCondition,
      nftAccessCondition,
    } = nevermined.keeper.conditions)

    // templates
    ;({ nftSalesTemplate, nftAccessTemplate } = nevermined.keeper.templates)

    scale = BigNumber.from(10).pow(await token.decimals())

    nftPrice = nftPrice.mul(scale)
    amounts = amounts.map((v) => v.mul(scale))
    nftPrice2 = nftPrice2.mul(scale)
    amounts2 = amounts2.map((v) => v.mul(scale))

    assetPrice1 = new AssetPrice(
      new Map([
        [receivers[0], amounts[0]],
        [receivers[1], amounts[1]],
      ]),
    ).setTokenAddress(token.getAddress())

    assetPrice2 = new AssetPrice(
      new Map([
        [receivers2[0], amounts2[0]],
        [receivers2[1], amounts2[1]],
      ]),
    ).setTokenAddress(token.getAddress())
  })

  describe('Full flow', () => {
    before(async () => {
      // initial balances
      initialBalances = {
        artist: await token.balanceOf(artist.getId()),
        collector1: await token.balanceOf(collector1.getId()),
        collector2: await token.balanceOf(collector2.getId()),
        gallery: await token.balanceOf(gallery.getId()),
        escrowPaymentCondition: Number(await token.balanceOf(escrowPaymentCondition.getAddress())),
      }

      agreementIdSeed = generateId()
      agreementAccessIdSeed = generateId()
      agreementId2Seed = generateId()

      agreementId = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementIdSeed,
        collector1.getId(),
      )
      agreementAccessId = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementAccessIdSeed,
        collector1.getId(),
      )
      agreementId2 = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementId2Seed,
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
          },
          {
            serviceType: 'nft-access',
          },
        ],
      })
      const nftAttributes = NFTAttributes.getNFT1155Instance({
        ...assetAttributes,
        nftContractAddress: nftUpgradeable.address,
        cap: cappedAmount,
        amount: numberNFTs,
        royaltyAttributes,
      })
      ddo = await nevermined.nfts1155.create(nftAttributes, artist)
    })

    describe('As an artist I want to register a new artwork', () => {
      it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
        await nftUpgradeable.setApprovalForAll(transferNftCondition.getAddress(), true, artist)

        const balance = await nftUpgradeable.balance(artist.getId(), ddo.id)
        assert.deepEqual(balance, BigNumber.from(5))
      })
    })

    describe('As a collector I want to buy some art', () => {
      it('I am setting an agreement for buying a NFT', async () => {
        conditionIdLockPayment = await lockPaymentCondition.generateIdWithSeed(
          agreementId,
          await lockPaymentCondition.hashValues(
            ddo.id,
            escrowPaymentCondition.address,
            token.getAddress(),
            amounts,
            receivers,
          ),
        )
        conditionIdTransferNFT = await transferNftCondition.generateIdWithSeed(
          agreementId,
          await transferNftCondition.hashValues(
            ddo.id,
            artist.getId(),
            collector1.getId(),
            numberNFTs,
            conditionIdLockPayment[1],
          ),
        )
        conditionIdEscrow = await escrowPaymentCondition.generateIdWithSeed(
          agreementId,
          await escrowPaymentCondition.hashValues(
            ddo.id,
            amounts,
            receivers,
            collector1.getId(),
            escrowPaymentCondition.getAddress(),
            token.getAddress(),
            conditionIdLockPayment[1],
            conditionIdTransferNFT[1],
          ),
        )

        const result = await nftSalesTemplate.createAgreement(
          agreementIdSeed,
          ddo.shortId(),
          [conditionIdLockPayment[0], conditionIdTransferNFT[0], conditionIdEscrow[0]],
          [0, 0, 0],
          [0, 0, 0],
          [collector1.getId()],
          collector1,
        )
        assert.equal(result.status, 1)
        assert.isTrue(result.events.some((e) => e.event === 'AgreementCreated'))

        assert.equal(
          (await conditionStoreManager.getCondition(conditionIdLockPayment[1])).state,
          ConditionState.Unfulfilled,
        )
        assert.equal(
          (await conditionStoreManager.getCondition(conditionIdEscrow[1])).state,
          ConditionState.Unfulfilled,
        )
        assert.equal(
          (await conditionStoreManager.getCondition(conditionIdTransferNFT[1])).state,
          ConditionState.Unfulfilled,
        )
      })

      it('I am locking the payment', async () => {
        await collector1.requestTokens(nftPrice.div(scale))
        const escrowPaymentConditionBefore = await token.balanceOf(escrowPaymentCondition.address)
        const collector1BalanceBefore = await token.balanceOf(collector1.getId())
        assert.isTrue(collector1BalanceBefore.eq(initialBalances.collector1.add(nftPrice)))

        await token.approve(lockPaymentCondition.getAddress(), nftPrice, collector1)
        await token.approve(escrowPaymentCondition.getAddress(), nftPrice, collector1)
        await lockPaymentCondition.fulfill(
          agreementId,
          ddo.id,
          escrowPaymentCondition.getAddress(),
          token.getAddress(),
          amounts,
          receivers,
          collector1,
        )

        const { state } = await conditionStoreManager.getCondition(conditionIdLockPayment[1])
        assert.equal(state, ConditionState.Fulfilled)

        const collector1BalanceAfter = await token.balanceOf(collector1.getId())
        const escrowPaymentConditionBalance = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        assert.equal(collector1BalanceAfter.sub(initialBalances.collector1).toNumber(), 0)

        assert.isTrue(escrowPaymentConditionBefore.add(nftPrice).eq(escrowPaymentConditionBalance))
      })

      it('The artist can check the payment and transfer the NFT to the collector', async () => {
        const nftBalanceArtistBefore = await nftUpgradeable.balance(artist.getId(), ddo.id)
        const nftBalanceCollectorBefore = await nftUpgradeable.balance(collector1.getId(), ddo.id)

        await transferNftCondition.fulfill(
          agreementId,
          ddo.id,
          collector1.getId(),
          numberNFTs,
          nevermined.keeper.nftUpgradeable.address,
          conditionIdLockPayment[1],
          true,
          artist,
        )

        const { state } = await conditionStoreManager.getCondition(conditionIdTransferNFT[1])
        assert.equal(state, ConditionState.Fulfilled)

        const nftBalanceArtistAfter = await nftUpgradeable.balance(artist.getId(), ddo.id)
        const nftBalanceCollectorAfter = await nftUpgradeable.balance(collector1.getId(), ddo.id)

        assert.equal(
          Number(nftBalanceArtistAfter),
          Number(nftBalanceArtistBefore) - Number(numberNFTs),
        )
        assert.equal(
          Number(nftBalanceCollectorAfter),
          Number(nftBalanceCollectorBefore) + Number(numberNFTs),
        )
      })

      it('the artist asks and receives the payment', async () => {
        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )

        await escrowPaymentCondition.fulfill(
          agreementId,
          ddo.id,
          amounts,
          receivers,
          collector1.getId(),
          escrowPaymentCondition.getAddress(),
          token.getAddress(),
          conditionIdLockPayment[1],
          conditionIdTransferNFT[1],
          artist,
        )

        const { state } = await conditionStoreManager.getCondition(conditionIdEscrow[1])
        assert.equal(state, ConditionState.Fulfilled)

        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        const receiver0Balance = await token.balanceOf(receivers[0])
        const receiver1Balance = await token.balanceOf(receivers[1])
        const collectorBalance = await token.balanceOf(collector1.getId())

        assert.isTrue(receiver0Balance.eq(initialBalances.artist.add(amounts[0])))
        assert.isTrue(receiver1Balance.eq(initialBalances.gallery.add(amounts[1])))
        assert.isTrue(collectorBalance.sub(initialBalances.collector1).isZero())
        assert.isTrue(
          escrowPaymentConditionBalanceBefore
            .sub(AssetPrice.sumAmounts(amounts))
            .eq(escrowPaymentConditionBalanceAfter),
        )
      })
    })

    describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
      it('The collector sets up the NFT access agreement', async () => {
        // Collector1: Create NFT access agreement
        conditionIdNFTHolder = await nftHolderCondition.generateIdWithSeed(
          agreementAccessId,
          await nftHolderCondition.hashValues(ddo.id, collector1.getId(), numberNFTs),
        )
        conditionIdNFTAccess = await nftAccessCondition.generateIdWithSeed(
          agreementAccessId,
          await nftAccessCondition.hashValues(ddo.id, collector1.getId()),
        )

        const result = await nftAccessTemplate.createAgreement(
          agreementAccessIdSeed,
          ddo.shortId(),
          [conditionIdNFTHolder[0], conditionIdNFTAccess[0]],
          [0, 0],
          [0, 0],
          [collector1.getId()],
          collector1,
        )
        assert.equal(result.status, 1)
        assert.isTrue(result.events.some((e) => e.event === 'AgreementCreated'))

        assert.equal(
          (await conditionStoreManager.getCondition(conditionIdNFTAccess[1])).state,
          ConditionState.Unfulfilled,
        )
        assert.equal(
          (await conditionStoreManager.getCondition(conditionIdNFTHolder[1])).state,
          ConditionState.Unfulfilled,
        )
      })

      it('The collector demonstrates it owns the NFT', async function () {
        // TODO: Not sure why we need to wait here but without this the
        // the fulfillment will fail
        await new Promise((r) => setTimeout(r, 10000))
        await nftHolderCondition.fulfill(
          agreementAccessId,
          ddo.id,
          collector1.getId(),
          numberNFTs,
          nevermined.keeper.nftUpgradeable.address,
        )

        assert.equal(
          (await conditionStoreManager.getCondition(conditionIdNFTHolder[1])).state,
          ConditionState.Fulfilled,
        )
      })

      it(' The artist gives access to the collector to the content', async function () {
        await nftAccessCondition.fulfill(agreementAccessId, ddo.id, collector1.getId(), artist)

        assert.equal(
          (await conditionStoreManager.getCondition(conditionIdNFTAccess[1])).state,
          ConditionState.Fulfilled,
        )
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
          lockPaymentCondition: Number(await token.balanceOf(lockPaymentCondition.getAddress())),
          escrowPaymentCondition: Number(
            await token.balanceOf(escrowPaymentCondition.getAddress()),
          ),
        }
      })

      it('As collector2 I setup an agreement for buying an NFT from collector1', async () => {
        conditionIdLockPayment2 = await lockPaymentCondition.generateIdWithSeed(
          agreementId2,
          await lockPaymentCondition.hashValues(
            ddo.id,
            escrowPaymentCondition.address,
            token.getAddress(),
            amounts2,
            receivers2,
          ),
        )
        conditionIdTransferNFT2 = await transferNftCondition.generateIdWithSeed(
          agreementId2,
          await transferNftCondition.hashValues(
            ddo.id,
            collector1.getId(),
            collector2.getId(),
            numberNFTs2,
            conditionIdLockPayment2[1],
          ),
        )
        conditionIdEscrow2 = await escrowPaymentCondition.generateIdWithSeed(
          agreementId2,
          await escrowPaymentCondition.hashValues(
            ddo.id,
            amounts2,
            receivers2,
            collector2.getId(),
            escrowPaymentCondition.getAddress(),
            token.getAddress(),
            conditionIdLockPayment2[1],
            conditionIdTransferNFT2[1],
          ),
        )

        const result = await nftSalesTemplate.createAgreement(
          agreementId2Seed,
          ddo.shortId(),
          [conditionIdLockPayment2[0], conditionIdTransferNFT2[0], conditionIdEscrow2[0]],
          [0, 0, 0],
          [0, 0, 0],
          [collector2.getId()],
          collector2,
        )
        assert.equal(result.status, 1)
        assert.isTrue(result.events.some((e) => e.event === 'AgreementCreated'))

        assert.equal(
          (await conditionStoreManager.getCondition(conditionIdLockPayment2[1])).state,
          ConditionState.Unfulfilled,
        )
        assert.equal(
          (await conditionStoreManager.getCondition(conditionIdEscrow2[1])).state,
          ConditionState.Unfulfilled,
        )
        assert.equal(
          (await conditionStoreManager.getCondition(conditionIdTransferNFT2[1])).state,
          ConditionState.Unfulfilled,
        )
      })

      it('As collector2 I am locking the payment', async () => {
        await collector2.requestTokens(nftPrice2.div(scale))
        const escrowPaymentConditionBefore = await token.balanceOf(escrowPaymentCondition.address)
        const collector2BalanceBefore = await token.balanceOf(collector2.getId())
        assert.isTrue(collector2BalanceBefore.eq(initialBalances.collector2.add(nftPrice2)))

        await token.approve(lockPaymentCondition.getAddress(), nftPrice2, collector2)
        await lockPaymentCondition.fulfill(
          agreementId2,
          ddo.id,
          escrowPaymentCondition.getAddress(),
          token.getAddress(),
          amounts2,
          receivers2,
          collector2,
        )

        const { state } = await conditionStoreManager.getCondition(conditionIdLockPayment2[1])
        assert.equal(state, ConditionState.Fulfilled)

        const collector2BalanceAfter = await token.balanceOf(collector2.getId())
        const escrowPaymentConditionBalance = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        assert.equal(collector2BalanceAfter.sub(initialBalances.collector2).toNumber(), 0)
        assert.isTrue(escrowPaymentConditionBefore.add(nftPrice2).eq(escrowPaymentConditionBalance))
      })

      it('As collector1 I can check the payment and transfer the NFT to collector2', async () => {
        const nftBalanceCollector1Before = await nftUpgradeable.balance(collector1.getId(), ddo.id)
        const nftBalanceCollector2Before = await nftUpgradeable.balance(collector2.getId(), ddo.id)

        await transferNftCondition.fulfill(
          agreementId2,
          ddo.id,
          collector2.getId(),
          numberNFTs2,
          nevermined.keeper.nftUpgradeable.address,
          conditionIdLockPayment2[1],
          true,
          collector1,
        )

        const { state } = await conditionStoreManager.getCondition(conditionIdTransferNFT2[1])
        assert.equal(state, ConditionState.Fulfilled)

        const nftBalanceCollector1After = await nftUpgradeable.balance(collector1.getId(), ddo.id)
        const nftBalanceCollector2After = await nftUpgradeable.balance(collector2.getId(), ddo.id)

        assert.equal(
          Number(nftBalanceCollector1After),
          Number(nftBalanceCollector1Before) - Number(numberNFTs2),
        )
        assert.equal(
          Number(nftBalanceCollector2After),
          Number(nftBalanceCollector2Before) + Number(numberNFTs),
        )
      })

      it('Collector1 and Artist get the payment', async () => {
        const escrowPaymentConditionBefore = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )

        await escrowPaymentCondition.fulfill(
          agreementId2,
          ddo.id,
          amounts2,
          receivers2,
          collector2.getId(),
          escrowPaymentCondition.getAddress(),
          token.getAddress(),
          conditionIdLockPayment2[1],
          conditionIdTransferNFT2[1],
          collector1,
        )

        const { state } = await conditionStoreManager.getCondition(conditionIdEscrow2[1])
        assert.equal(state, ConditionState.Fulfilled)

        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        const receiver0Balance = await token.balanceOf(receivers2[0])
        const receiver1Balance = await token.balanceOf(receivers2[1])
        const collectorBalance = await token.balanceOf(collector2.getId())

        assert.isTrue(receiver0Balance.eq(initialBalances.collector1.add(amounts2[0])))
        assert.isTrue(receiver1Balance.eq(initialBalances.artist.add(amounts2[1])))
        assert.isTrue(collectorBalance.sub(initialBalances.collector2).isZero())
        assert.isTrue(
          escrowPaymentConditionBefore
            .sub(AssetPrice.sumAmounts(amounts2))
            .eq(escrowPaymentConditionBalanceAfter),
        )
      })
    })
  })

  describe('Short flow', () => {
    before(async () => {
      // initial balances
      initialBalances = {
        artist: await token.balanceOf(artist.getId()),
        collector1: await token.balanceOf(collector1.getId()),
        collector2: await token.balanceOf(collector2.getId()),
        gallery: await token.balanceOf(gallery.getId()),
        escrowPaymentCondition: Number(await token.balanceOf(escrowPaymentCondition.getAddress())),
      }
      agreementIdSeed = generateId()
      agreementAccessIdSeed = generateId()
      agreementId2Seed = generateId()

      agreementId = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementIdSeed,
        collector1.getId(),
      )
      agreementAccessId = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementAccessIdSeed,
        collector1.getId(),
      )
      agreementId2 = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementId2Seed,
        collector2.getId(),
      )

      const payload = decodeJwt(config.marketplaceAuthToken)
      const metadata = getMetadata()
      metadata.userId = payload.sub

      const assetAttributes = AssetAttributes.getInstance({
        metadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: assetPrice1,
          },
          {
            serviceType: 'nft-access',
          },
        ],
      })
      const nftAttributes = NFTAttributes.getNFT1155Instance({
        ...assetAttributes,
        nftContractAddress: nftUpgradeable.address,
        cap: cappedAmount,
        amount: numberNFTs,
        royaltyAttributes,
      })
      ddo = await nevermined.nfts1155.create(nftAttributes, artist)

      await collector1.requestTokens(nftPrice.div(scale))
    })

    describe('As an artist I want to register a new artwork', () => {
      it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
        await nftUpgradeable.setApprovalForAll(transferNftCondition.getAddress(), true, artist)

        const balance = await nftUpgradeable.balance(artist.getId(), ddo.id)
        assert.deepEqual(balance, BigNumber.from(5))
      })
    })

    describe('As a collector I want to buy some art', () => {
      it('I am setting an agreement for buying a NFT', async () => {
        const escrowPaymentConditionBefore = await token.balanceOf(escrowPaymentCondition.address)
        const collector1BalanceBefore = await token.balanceOf(collector1.getId())
        assert.isTrue(collector1BalanceBefore.eq(initialBalances.collector1.add(nftPrice)))
        const result = await nftSalesTemplate.createAgreementWithPaymentFromDDO(
          agreementIdSeed,
          ddo,
          nftSalesTemplate.params(collector1.getId(), numberNFTs),
          collector1,
          collector1,
        )
        assert.isDefined(result)

        const status = await nftSalesTemplate.getAgreementStatus(agreementId)
        assert.equal(status && status.lockPayment.state, ConditionState.Fulfilled)
        assert.equal(status && status.transferNFT.state, ConditionState.Unfulfilled)
        assert.equal(status && status.escrowPayment.state, ConditionState.Unfulfilled)

        const collector1BalanceAfter = await token.balanceOf(collector1.getId())
        const escrowPaymentConditionBalance = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        assert.equal(collector1BalanceAfter.sub(initialBalances.collector1).toNumber(), 0)
        assert.isTrue(escrowPaymentConditionBalance.sub(nftPrice).eq(escrowPaymentConditionBefore))
      })

      it('The artist can check the payment and transfer the NFT to the collector', async () => {
        const nftBalanceArtistBefore = await nftUpgradeable.balance(artist.getId(), ddo.id)
        const nftBalanceCollectorBefore = await nftUpgradeable.balance(collector1.getId(), ddo.id)

        const receipt = await nevermined.agreements.conditions.transferNft(
          agreementId,
          ddo,
          numberNFTs,
          artist,
        )
        assert.isTrue(receipt)

        const nftBalanceArtistAfter = await nftUpgradeable.balance(artist.getId(), ddo.id)
        const nftBalanceCollectorAfter = await nftUpgradeable.balance(collector1.getId(), ddo.id)

        assert.equal(
          Number(nftBalanceArtistAfter),
          Number(nftBalanceArtistBefore) - Number(numberNFTs),
        )
        assert.equal(
          Number(nftBalanceCollectorAfter),
          Number(nftBalanceCollectorBefore) + Number(numberNFTs),
        )
      })

      it('the artist asks and receives the payment', async () => {
        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        const receipt = await nevermined.agreements.conditions.releaseNftReward(
          agreementId,
          ddo,
          numberNFTs,
          artist,
        )
        assert.isTrue(receipt)

        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        const receiver0Balance = await token.balanceOf(receivers[0])
        const receiver1Balance = await token.balanceOf(receivers[1])
        const collectorBalance = await token.balanceOf(collector1.getId())

        assert.isTrue(receiver0Balance.eq(initialBalances.artist.add(amounts[0])))
        assert.isTrue(receiver1Balance.eq(initialBalances.gallery.add(amounts[1])))
        assert.isTrue(collectorBalance.sub(initialBalances.collector1).isZero())
        assert.isTrue(
          escrowPaymentConditionBalanceBefore
            .sub(assetPrice1.getTotalPrice())
            .eq(escrowPaymentConditionBalanceAfter),
        )
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
          lockPaymentCondition: Number(await token.balanceOf(lockPaymentCondition.getAddress())),
          escrowPaymentCondition: Number(
            await token.balanceOf(escrowPaymentCondition.getAddress()),
          ),
        }
        ddo.setNFTRewardsFromService('nft-sales', assetPrice2, collector1.getId())
      })

      it('As collector2 I setup an agreement for buying an NFT from collector1', async () => {
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
        await collector2.requestTokens(nftPrice2.div(scale))

        const collector2BalanceBefore = await token.balanceOf(collector2.getId())
        assert.isTrue(collector2BalanceBefore.eq(initialBalances.collector2.add(nftPrice2)))

        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        const receipt = await nevermined.agreements.conditions.lockPayment(
          agreementId2,
          ddo.id,
          assetPrice2.getAmounts(),
          assetPrice2.getReceivers(),
          token.getAddress(),
          collector2,
        )
        assert.isTrue(receipt)

        const collector2BalanceAfter = await token.balanceOf(collector2.getId())
        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        assert.isTrue(collector2BalanceAfter.sub(initialBalances.collector2).isZero())
        assert.isTrue(
          escrowPaymentConditionBalanceBefore
            .add(assetPrice2.getTotalPrice())
            .eq(escrowPaymentConditionBalanceAfter),
        )
      })

      it('As collector1 I can check the payment and transfer the NFT to collector2', async () => {
        const nftBalanceCollector1Before = await nftUpgradeable.balance(collector1.getId(), ddo.id)
        const nftBalanceCollector2Before = await nftUpgradeable.balance(collector2.getId(), ddo.id)

        const receipt = await nevermined.agreements.conditions.transferNft(
          agreementId2,
          ddo,
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
          Number(nftBalanceCollector2Before) + Number(numberNFTs),
        )
      })

      it('Collector1 and Artist get the payment', async () => {
        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        const receipt = await nevermined.agreements.conditions.releaseNftReward(
          agreementId2,
          ddo,
          numberNFTs2,
          collector1,
        )
        assert.isTrue(receipt)

        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        const receiver0Balance = await token.balanceOf(receivers2[0])
        const receiver1Balance = await token.balanceOf(receivers2[1])
        const collectorBalance = await token.balanceOf(collector2.getId())

        assert.isTrue(receiver0Balance.eq(initialBalances.collector1.add(amounts2[0])))
        assert.isTrue(receiver1Balance.eq(initialBalances.artist.add(amounts2[1])))
        assert.isTrue(collectorBalance.sub(initialBalances.collector2).isZero())
        assert.isTrue(
          escrowPaymentConditionBalanceBefore
            .sub(assetPrice2.getTotalPrice())
            .eq(escrowPaymentConditionBalanceAfter),
        )
      })
    })
  })

  describe('Market flow', () => {
    before(async () => {
      // initial balances
      initialBalances = {
        artist: await token.balanceOf(artist.getId()),
        collector1: await token.balanceOf(collector1.getId()),
        gallery: await token.balanceOf(gallery.getId()),
        escrowPaymentCondition: Number(await token.balanceOf(escrowPaymentCondition.getAddress())),
      }
      agreementIdSeed = generateId()
      agreementAccessIdSeed = generateId()
      agreementId2Seed = generateId()

      agreementId = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementIdSeed,
        collector1.getId(),
      )
      agreementAccessId = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementAccessIdSeed,
        collector1.getId(),
      )
      agreementId2 = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementId2Seed,
        collector2.getId(),
      )

      const payload = decodeJwt(config.marketplaceAuthToken)
      const metadata = getMetadata()
      metadata.userId = payload.sub

      const assetAttributes = AssetAttributes.getInstance({
        metadata,
        services: [
          {
            serviceType: 'nft-sales',
            price: assetPrice1,
          },
          {
            serviceType: 'nft-access',
          },
        ],
      })
      const nftAttributes = NFTAttributes.getNFT1155Instance({
        ...assetAttributes,
        nftContractAddress: nftUpgradeable.address,
        cap: cappedAmount,
        amount: numberNFTs,
        royaltyAttributes,
      })
      ddo = await nevermined.nfts1155.create(nftAttributes, artist)
    })

    describe('As an artist I want to register a new artwork', () => {
      it('I want to register a new artwork and give a Marketplace permissions to transfer it', async () => {
        const balance = await nftUpgradeable.balance(artist.getId(), ddo.id)
        assert.deepEqual(balance, BigNumber.from(5))

        await nevermined.nfts1155.setApprovalForAll(gallery.getId(), true, artist)
      })
    })

    describe('As a collector I want to buy some art on a Marketplace', () => {
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
        await collector1.requestTokens(nftPrice.div(scale))

        const collector1BalanceBefore = await token.balanceOf(collector1.getId())
        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        assert.isTrue(collector1BalanceBefore.eq(initialBalances.collector1.add(nftPrice)))

        const receipt = await nevermined.agreements.conditions.lockPayment(
          agreementId,
          ddo.id,
          assetPrice1.getAmounts(),
          assetPrice1.getReceivers(),
          token.getAddress(),
          collector1,
        )
        assert.isTrue(receipt)

        const collector1BalanceAfter = await token.balanceOf(collector1.getId())
        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        assert.equal(collector1BalanceAfter.sub(initialBalances.collector1).toNumber(), 0)
        assert.isTrue(
          escrowPaymentConditionBalanceBefore
            .add(assetPrice1.getTotalPrice())
            .eq(escrowPaymentConditionBalanceAfter),
        )
      })

      it('The Market can check the payment and transfer the NFT to the collector', async () => {
        const nftBalanceArtistBefore = await nftUpgradeable.balance(artist.getId(), ddo.id)
        const nftBalanceCollectorBefore = await nftUpgradeable.balance(collector1.getId(), ddo.id)

        const receipt = await nevermined.agreements.conditions.transferNftForDelegate(
          agreementId,
          ddo,
          numberNFTs,
          gallery,
        )
        assert.isTrue(receipt)

        const nftBalanceArtistAfter = await nftUpgradeable.balance(artist.getId(), ddo.id)
        const nftBalanceCollectorAfter = await nftUpgradeable.balance(collector1.getId(), ddo.id)

        assert.equal(
          Number(nftBalanceArtistAfter),
          Number(nftBalanceArtistBefore) - Number(numberNFTs),
        )
        assert.equal(
          Number(nftBalanceCollectorAfter),
          Number(nftBalanceCollectorBefore) + Number(numberNFTs),
        )
      })

      it('The Market releases the rewards to the artist', async () => {
        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        const receipt = await nevermined.agreements.conditions.releaseNftReward(
          agreementId,
          ddo,
          numberNFTs,
          artist,
          gallery,
        )
        assert.isTrue(receipt)

        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.getAddress(),
        )
        const receiver0Balance = await token.balanceOf(receivers[0])
        const receiver1Balance = await token.balanceOf(receivers[1])
        const collectorBalance = await token.balanceOf(collector1.getId())

        assert.isTrue(receiver0Balance.eq(initialBalances.artist.add(amounts[0])))
        assert.isTrue(receiver1Balance.eq(initialBalances.gallery.add(amounts[1])))
        assert.isTrue(collectorBalance.sub(initialBalances.collector1).isZero())
        assert.isTrue(
          escrowPaymentConditionBalanceBefore
            .sub(assetPrice1.getTotalPrice())
            .eq(escrowPaymentConditionBalanceAfter),
        )
      })
    })
  })
})
