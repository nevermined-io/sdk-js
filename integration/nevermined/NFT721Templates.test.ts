import { assert } from 'chai'
import { decodeJwt } from 'jose'
import {
  NvmAccount,
  DDO,
  Nevermined,
  generateId,
  NeverminedNFT721Type,
  NFTAttributes,
  AssetPrice,
} from '../../src'
import {
  ConditionState,
  EscrowPaymentCondition,
  LockPaymentCondition,
  NFT721HolderCondition,
  NFTAccessCondition,
  TransferNFT721Condition,
  ConditionStoreManager,
  Token,
  NFT721AccessTemplate,
  NFT721SalesTemplate,
  ContractHandler,
} from '../../src/keeper'
import { config } from '../config'
import { NFT721Api } from '../../src'
import { getMetadata } from '../utils'
import { getRoyaltyAttributes, RoyaltyAttributes, RoyaltyKind } from '../../src/nevermined'
import { EventLog } from 'ethers'
import { repeat } from '../utils/utils'

describe('NFT721Templates E2E', () => {
  let nftContractOwner: NvmAccount
  let owner: NvmAccount
  let artist: NvmAccount
  let collector1: NvmAccount
  let collector2: NvmAccount
  let gallery: NvmAccount

  let nevermined: Nevermined
  let token: Token
  let nft: NFT721Api
  let conditionStoreManager: ConditionStoreManager
  let lockPaymentCondition: LockPaymentCondition
  let escrowPaymentCondition: EscrowPaymentCondition

  let nftAccessCondition: NFTAccessCondition

  let transferNft721Condition: TransferNFT721Condition
  let nft721HolderCondition: NFT721HolderCondition
  let nft721SalesTemplate: NFT721SalesTemplate
  let nft721AccessTemplate: NFT721AccessTemplate

  let conditionIdLockPayment: [string, string]
  let conditionIdTransferNFT: [string, string]
  let conditionIdEscrow: [string, string]
  let conditionIdNFTHolder: [string, string]
  let conditionIdNFTAccess: [string, string]
  let conditionIdLockPayment2: [string, string]
  let conditionIdTransferNFT2: [string, string]
  let conditionIdEscrow2: [string, string]
  let ddo: DDO

  let royaltyAttributes: RoyaltyAttributes
  const royalties = 10 // 10% of royalties in the secondary market
  let agreementId: string
  let agreementAccessId: string
  let agreementId2: string
  let agreementIdSeed: string
  let agreementAccessIdSeed: string
  let agreementId2Seed: string
  // Configuration of First Sale:
  // Artist -> Collector1, the gallery get a cut (25%)
  let nftPrice = 20n
  let amounts = [15n, 5n]
  let receivers: string[]
  let assetPrice1: AssetPrice

  // Configuration of Sale in secondary market:
  // Collector1 -> Collector2, the artist get 10% royalties
  let nftPrice2 = 100n
  let amounts2 = [90n, 10n]
  let receivers2: string[]
  let assetPrice2: AssetPrice

  let initialBalances: any
  let scale: bigint

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;[owner, artist, collector1, collector2, gallery] = await nevermined.accounts.list()

    const networkName = await nevermined.keeper.getNetworkName()
    const erc721ABI = await ContractHandler.getABIArtifact(
      'NFT721Upgradeable',
      config.artifactsFolder,
      networkName,
    )

    // deploy a nft contract we can use
    const nftContract = await nevermined.utils.blockchain.deployAbi(erc721ABI, artist, [
      artist.getId(),
      nevermined.keeper.didRegistry.address,
      'NFT721',
      'NVM',
      '',
      '0',
      nevermined.keeper.nvmConfig.address,
    ])

    const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(artist)

    await nevermined.services.marketplace.login(clientAssertion)

    receivers = [artist.getId(), gallery.getId()]
    receivers2 = [collector1.getId(), artist.getId()]

    // load the nft contract at given address
    nft = await nevermined.contracts.loadNft721(await nftContract.getAddress())
    nftContractOwner = new NvmAccount((await nft.nftContract.owner()) as string)

    // components
    ;({ conditionStoreManager, token } = nevermined.keeper)

    // conditions
    ;({
      transferNft721Condition,
      lockPaymentCondition,
      escrowPaymentCondition,
      nft721HolderCondition,
      nftAccessCondition,
    } = nevermined.keeper.conditions)

    await nft.nftContract.grantOperatorRole(transferNft721Condition.address, nftContractOwner)

    // templates
    ;({ nft721SalesTemplate, nft721AccessTemplate } = nevermined.keeper.templates)

    scale = 10n ** BigInt(await token.decimals())

    nftPrice = nftPrice * scale
    amounts = amounts.map((v) => v * scale)
    nftPrice2 = nftPrice2 * scale
    amounts2 = amounts2.map((v) => v * scale)

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
  })

  describe('Full flow', () => {
    before(async () => {
      // initial balances
      initialBalances = {
        artist: await token.balanceOf(artist.getId()),
        collector1: await token.balanceOf(collector1.getId()),
        collector2: await token.balanceOf(collector2.getId()),
        gallery: await token.balanceOf(gallery.getId()),
        escrowPaymentCondition: Number(await token.balanceOf(escrowPaymentCondition.address)),
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
    })

    describe('As an artist I want to register a new artwork', () => {
      it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
        const payload = decodeJwt(config.marketplaceAuthToken)
        const metadata = getMetadata()
        metadata.userId = payload.sub

        royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, royalties)

        const nftAttributes = NFTAttributes.getInstance({
          metadata,
          services: [
            {
              serviceType: 'nft-sales',
              price: assetPrice1,
              nft: { nftTransfer: false },
            },
            {
              serviceType: 'nft-access',
            },
          ],
          ercType: 721,
          nftType: NeverminedNFT721Type.nft721,
          nftContractAddress: nft.address,
          preMint: true,
          royaltyAttributes: getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, 10000),
        })
        ddo = await nevermined.nfts721.create(nftAttributes, artist)
      })
    })

    describe('As a collector I want to buy some art', () => {
      it('I am setting an agreement for buying a NFT', async () => {
        conditionIdLockPayment = await lockPaymentCondition.generateIdWithSeed(
          agreementId,
          await lockPaymentCondition.hashValues(
            ddo.shortId(),
            escrowPaymentCondition.address,
            token.address,
            amounts,
            receivers,
          ),
        )
        conditionIdTransferNFT = await transferNft721Condition.generateIdWithSeed(
          agreementId,
          await transferNft721Condition.hashValues(
            ddo.shortId(),
            artist.getId(),
            collector1.getId(),
            conditionIdLockPayment[1],
            nft.address,
          ),
        )
        conditionIdEscrow = await escrowPaymentCondition.generateIdWithSeed(
          agreementId,
          await escrowPaymentCondition.hashValues(
            ddo.shortId(),
            amounts,
            receivers,
            collector1.getId(),
            escrowPaymentCondition.address,
            token.address,
            conditionIdLockPayment[1],
            conditionIdTransferNFT[1],
          ),
        )

        await collector1.requestTokens(nftPrice / scale)
        const collector1BalanceBefore = await token.balanceOf(collector1.getId())
        assert.equal(initialBalances.collector1 + nftPrice, collector1BalanceBefore)

        await token.approve(lockPaymentCondition.address, nftPrice, collector1)
        await token.approve(escrowPaymentCondition.address, nftPrice, collector1)
        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.address,
        )

        const result = await nft721SalesTemplate.createAgreementAndPay(
          agreementIdSeed,
          ddo.shortId(),
          [conditionIdLockPayment[0], conditionIdTransferNFT[0], conditionIdEscrow[0]],
          [0, 0, 0],
          [0, 0, 0],
          collector1.getId(),
          0,
          escrowPaymentCondition.address,
          token.address,
          amounts,
          receivers,
          collector1,
        )
        assert.equal(result.status, 1)
        assert.isTrue(
          (result.logs as EventLog[]).some((e: EventLog) => e.eventName === 'AgreementCreated'),
        )
        assert.equal(
          (await conditionStoreManager.getCondition(conditionIdEscrow[1])).state,
          ConditionState.Unfulfilled,
        )
        assert.equal(
          (await conditionStoreManager.getCondition(conditionIdTransferNFT[1])).state,
          ConditionState.Unfulfilled,
        )

        const { state } = await conditionStoreManager.getCondition(conditionIdLockPayment[1])
        assert.equal(state, ConditionState.Fulfilled)

        const collector1BalanceAfter = await token.balanceOf(collector1.getId())
        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.address,
        )
        assert.equal(collector1BalanceAfter, initialBalances.collector1)
        assert.equal(
          escrowPaymentConditionBalanceBefore + AssetPrice.sumAmounts(amounts),
          escrowPaymentConditionBalanceAfter,
        )
      })

      it('The artist can check the payment and transfer the NFT to the collector', async () => {
        await nft.setApprovalForAll(transferNft721Condition.address, true, artist)

        const params = {
          agreementId,
          did: ddo.shortId(),
          nftReceiver: collector1.getId(),
          lockPaymentCondition: conditionIdLockPayment[1],
          nftTokenAddress: nft.address,
          willBeTransferred: true,
        }
        console.log(JSON.stringify(params))

        await transferNft721Condition.fulfill(
          agreementId,
          ddo.shortId(),
          collector1.getId(),
          conditionIdLockPayment[1],
          nft.address,
          true,
          artist,
        )
        await nft.setApprovalForAll(transferNft721Condition.address, false, artist)

        const { state } = await conditionStoreManager.getCondition(conditionIdTransferNFT[1])
        assert.equal(state, ConditionState.Fulfilled)

        const ownerAfter = await nft.ownerOf(ddo.shortId())
        assert.equal(ownerAfter, collector1.getId())
      })

      it('the artist asks and receives the payment', async () => {
        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.address,
        )
        await escrowPaymentCondition.fulfill(
          agreementId,
          ddo.shortId(),
          amounts,
          receivers,
          collector1.getId(),
          escrowPaymentCondition.address,
          token.address,
          conditionIdLockPayment[1],
          conditionIdTransferNFT[1],
          artist,
        )

        const { state } = await conditionStoreManager.getCondition(conditionIdEscrow[1])
        assert.equal(state, ConditionState.Fulfilled)

        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.address,
        )
        const receiver0Balance = await token.balanceOf(receivers[0])
        const receiver1Balance = await token.balanceOf(receivers[1])
        const collectorBalance = await token.balanceOf(collector1.getId())

        assert.equal(initialBalances.artist + amounts[0], receiver0Balance)
        assert.equal(initialBalances.gallery + amounts[1], receiver1Balance)
        assert.equal(collectorBalance, initialBalances.collector1)
        assert.equal(
          escrowPaymentConditionBalanceBefore - AssetPrice.sumAmounts(amounts),
          escrowPaymentConditionBalanceAfter,
        )
      })
    })

    describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
      it('The collector sets up the NFT access agreement', async () => {
        // Collector1: Create NFT access agreement
        conditionIdNFTHolder = await nft721HolderCondition.generateIdWithSeed(
          agreementAccessId,
          await nft721HolderCondition.hashValues(ddo.shortId(), collector1.getId(), nft.address),
        )
        conditionIdNFTAccess = await nftAccessCondition.generateIdWithSeed(
          agreementAccessId,
          await nftAccessCondition.hashValues(ddo.shortId(), collector1.getId()),
        )

        const result = await nft721AccessTemplate.createAgreement(
          agreementAccessIdSeed,
          ddo.shortId(),
          [conditionIdNFTHolder[0], conditionIdNFTAccess[0]],
          [0, 0],
          [0, 0],
          [collector1.getId()],
          collector1,
        )
        assert.equal(result.status, 1)
        assert.isTrue(
          (result.logs as EventLog[]).some((e: EventLog) => e.eventName === 'AgreementCreated'),
        )

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
        await nft721HolderCondition.fulfill(
          agreementAccessId,
          ddo.shortId(),
          collector1.getId(),
          nft.address,
          collector1,
        )

        assert.equal(
          (await conditionStoreManager.getCondition(conditionIdNFTHolder[1])).state,
          ConditionState.Fulfilled,
        )
      })

      it(' The artist gives access to the collector to the content', async function () {
        await nftAccessCondition.fulfill(
          agreementAccessId,
          ddo.shortId(),
          collector1.getId(),
          artist,
        )

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
          lockPaymentCondition: await token.balanceOf(lockPaymentCondition.address),
          escrowPaymentCondition: await token.balanceOf(escrowPaymentCondition.address),
        }
      })
      it('As collector2 I setup an agreement for buying an NFT from collector1', async () => {
        conditionIdLockPayment2 = await lockPaymentCondition.generateIdWithSeed(
          agreementId2,
          await lockPaymentCondition.hashValues(
            ddo.shortId(),
            escrowPaymentCondition.address,
            token.address,
            amounts2,
            receivers2,
          ),
        )
        conditionIdTransferNFT2 = await transferNft721Condition.generateIdWithSeed(
          agreementId2,
          await transferNft721Condition.hashValues(
            ddo.shortId(),
            collector1.getId(),
            collector2.getId(),
            conditionIdLockPayment2[1],
            nft.address,
          ),
        )
        conditionIdEscrow2 = await escrowPaymentCondition.generateIdWithSeed(
          agreementId2,
          await escrowPaymentCondition.hashValues(
            ddo.shortId(),
            amounts2,
            receivers2,
            collector2.getId(),
            escrowPaymentCondition.address,
            token.address,
            conditionIdLockPayment2[1],
            conditionIdTransferNFT2[1],
          ),
        )

        const result = await nft721SalesTemplate.createAgreement(
          agreementId2Seed,
          ddo.shortId(),
          [conditionIdLockPayment2[0], conditionIdTransferNFT2[0], conditionIdEscrow2[0]],
          [0, 0, 0],
          [0, 0, 0],
          [collector2.getId()],
          collector2,
        )
        assert.equal(result.status, 1)
        assert.isTrue(
          (result.logs as EventLog[]).some((e: EventLog) => e.eventName === 'AgreementCreated'),
        )

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
        await collector2.requestTokens(nftPrice2 / scale)
        const collector2BalanceBefore = await token.balanceOf(collector2.getId())
        assert.equal(collector2BalanceBefore, initialBalances.collector2 + nftPrice2)

        await token.approve(lockPaymentCondition.address, nftPrice2, collector2)
        await lockPaymentCondition.fulfill(
          agreementId2,
          ddo.shortId(),
          escrowPaymentCondition.address,
          token.address,
          amounts2,
          receivers2,
          collector2,
        )

        const { state } = await conditionStoreManager.getCondition(conditionIdLockPayment2[1])
        assert.equal(state, ConditionState.Fulfilled)

        const collector2BalanceAfter = await token.balanceOf(collector2.getId())
        const escrowPaymentConditionBalance = await token.balanceOf(escrowPaymentCondition.address)
        assert.equal(collector2BalanceAfter, initialBalances.collector2)
        assert.equal(
          escrowPaymentConditionBalance - initialBalances.escrowPaymentCondition,
          nftPrice2,
        )
      })

      it('As collector1 I can check the payment and transfer the NFT to collector2', async () => {
        const ownerBefore = await nft.ownerOf(ddo.shortId())
        assert.equal(ownerBefore, collector1.getId())

        await nft.setApprovalForAll(transferNft721Condition.address, true, collector1)

        await transferNft721Condition.fulfill(
          agreementId2,
          ddo.shortId(),
          collector2.getId(),
          conditionIdLockPayment2[1],
          nft.address,
          true,
          collector1,
        )

        await nft.setApprovalForAll(transferNft721Condition.address, false, collector1)

        const { state } = await conditionStoreManager.getCondition(conditionIdTransferNFT2[1])
        assert.equal(state, ConditionState.Fulfilled)

        const ownerAfter = await nft.ownerOf(ddo.shortId())
        assert.equal(ownerAfter, collector2.getId())
      })

      it('Collector1 and Artist get the payment', async () => {
        await escrowPaymentCondition.fulfill(
          agreementId2,
          ddo.shortId(),
          amounts2,
          receivers2,
          collector2.getId(),
          escrowPaymentCondition.address,
          token.address,
          conditionIdLockPayment2[1],
          conditionIdTransferNFT2[1],
          collector1,
        )

        const { state } = await conditionStoreManager.getCondition(conditionIdEscrow2[1])
        assert.equal(state, ConditionState.Fulfilled)

        const escrowPaymentConditionBalance = await token.balanceOf(escrowPaymentCondition.address)
        const receiver0Balance = await token.balanceOf(receivers2[0])
        const receiver1Balance = await token.balanceOf(receivers2[1])
        const collectorBalance = await token.balanceOf(collector2.getId())

        assert.equal(receiver0Balance, initialBalances.collector1 + amounts2[0])
        assert.equal(receiver1Balance, initialBalances.artist + amounts2[1])
        assert.equal(collectorBalance, initialBalances.collector2)
        assert.equal(escrowPaymentConditionBalance, initialBalances.escrowPaymentCondition)
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
        escrowPaymentCondition: Number(token.balanceOf(escrowPaymentCondition.address)),
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

      const networkName = await nevermined.keeper.getNetworkName()
      const erc721ABI = await ContractHandler.getABIArtifact(
        'NFT721Upgradeable',
        config.artifactsFolder,
        networkName,
      )

      const nftContract = await nevermined.utils.blockchain.deployAbi(erc721ABI, artist, [
        artist.getId(),
        nevermined.keeper.didRegistry.address,
        'NFT721',
        'NVM',
        '',
        '0',
        nevermined.keeper.nvmConfig.address,
      ])
      nft = await nevermined.contracts.loadNft721(await nftContract.getAddress())

      nftContractOwner = new NvmAccount((await nft.nftContract.owner()) as string)
      await nft.nftContract.grantOperatorRole(transferNft721Condition.address, nftContractOwner)

      await collector1.requestTokens(nftPrice / scale)
    })

    describe('As an artist I want to register a new artwork', () => {
      it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
        const payload = decodeJwt(config.marketplaceAuthToken)
        const metadata = getMetadata()
        metadata.userId = payload.sub

        const nftAttributes = NFTAttributes.getInstance({
          metadata,
          services: [
            {
              serviceType: 'nft-sales',
              price: assetPrice1,
              nft: { nftTransfer: true },
            },
            {
              serviceType: 'nft-access',
            },
          ],
          ercType: 721,
          nftType: NeverminedNFT721Type.nft721,
          nftContractAddress: nft.address,
          preMint: true,
          royaltyAttributes,
        })
        ddo = await nevermined.nfts721.create(nftAttributes, artist)
      })
    })

    describe('As a collector I want to buy some art', () => {
      it('I am setting an agreement for buying a NFT and paying it in the same transaction', async () => {
        const collector1BalanceBefore = await token.balanceOf(collector1.getId())
        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.address,
        )
        assert.equal(collector1BalanceBefore, initialBalances.collector1 + nftPrice)
        const result = await nft721SalesTemplate.createAgreementWithPaymentFromDDO(
          agreementIdSeed,
          ddo,
          'nft-sales',
          nft721SalesTemplate.params(collector1.getId()),
          collector1,
          collector1,
        )
        assert.isDefined(result)

        const status = await nft721SalesTemplate.getAgreementStatus(agreementId)
        assert.equal(status && status.lockPayment.state, ConditionState.Fulfilled)
        assert.equal(status && status.transferNFT.state, ConditionState.Unfulfilled)
        assert.equal(status && status.escrowPayment.state, ConditionState.Unfulfilled)

        const collector1BalanceAfter = await token.balanceOf(collector1.getId())
        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.address,
        )
        assert.equal(collector1BalanceAfter, initialBalances.collector1)
        assert.equal(
          escrowPaymentConditionBalanceBefore + assetPrice1.getTotalPrice(),
          escrowPaymentConditionBalanceAfter,
        )
      })

      it('The artist can check the payment and transfer the NFT to the collector', async () => {
        const ownerBefore = await nft.ownerOf(ddo.shortId())
        assert.equal(ownerBefore, artist.getId())

        const service = ddo.findServiceByType('nft-sales')
        const receipt = await nevermined.agreements.conditions.transferNft721(
          agreementId,
          ddo,
          service.index,
          artist,
        )
        assert.isTrue(receipt)

        const ownerAfter = await nft.ownerOf(ddo.shortId())

        const status = await repeat(3, nevermined.agreements.status(agreementId))

        assert.deepEqual(status, {
          lockPayment: ConditionState.Fulfilled,
          transferNFT: ConditionState.Fulfilled,
          escrowPayment: ConditionState.Unfulfilled,
        })

        assert.equal(ownerAfter, collector1.getId())
      })

      it('the artist asks and receives the payment', async () => {
        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.address,
        )

        const receipt = await nevermined.agreements.conditions.releaseNft721Reward(
          agreementId,
          ddo,
          'nft-sales',
          artist,
        )
        assert.isTrue(receipt)

        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.address,
        )
        const receiver0Balance = await token.balanceOf(receivers[0])
        const receiver1Balance = await token.balanceOf(receivers[1])
        const collectorBalance = await token.balanceOf(collector1.getId())

        assert.equal(receiver0Balance, initialBalances.artist + amounts[0])
        assert.equal(receiver1Balance, initialBalances.gallery + amounts[1])
        assert.equal(collectorBalance, initialBalances.collector1)
        assert.equal(
          escrowPaymentConditionBalanceBefore - assetPrice1.getTotalPrice(),
          escrowPaymentConditionBalanceAfter,
        )
      })
    })

    describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', () => {
      it('The collector sets up the NFT access agreement', async () => {
        // Collector1: Create NFT access agreement
        const result = await nft721AccessTemplate.createAgreementFromDDO(
          agreementAccessIdSeed,
          ddo,
          nft721AccessTemplate.params(collector1.getId()),
          collector1,
          collector1,
        )
        assert.isDefined(result)

        const status = await nft721AccessTemplate.getAgreementStatus(agreementAccessId)
        assert.equal(status && status.nftHolder.state, ConditionState.Unfulfilled)
        assert.equal(status && status.nftAccess.state, ConditionState.Unfulfilled)
      })

      it('The collector demonstrates it owns the NFT', async function () {
        const result = await nevermined.agreements.conditions.holderNft721(
          agreementAccessId,
          ddo,
          collector1.getId(),
          collector1,
        )
        assert.isTrue(result)
      })

      it(' The artist gives access to the collector to the content', async function () {
        const result = await nevermined.agreements.conditions.grantNftAccess(
          agreementAccessId,
          ddo.shortId(),
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
          lockPaymentCondition: Number(await token.balanceOf(lockPaymentCondition.address)),
          escrowPaymentCondition: Number(await token.balanceOf(escrowPaymentCondition.address)),
        }
        ddo.setNFTRewardsFromService('nft-sales', assetPrice2, collector1.getId())
      })
      it('As collector2 I setup an agreement for buying an NFT from collector1', async () => {
        const result = await nft721SalesTemplate.createAgreementFromDDO(
          agreementId2Seed,
          ddo,
          nft721SalesTemplate.params(collector2.getId()),
          collector2,
          collector2,
        )
        assert.isDefined(result)

        const status = await nft721SalesTemplate.getAgreementStatus(agreementId2)
        assert.equal(status && status.lockPayment.state, ConditionState.Unfulfilled)
        assert.equal(status && status.transferNFT.state, ConditionState.Unfulfilled)
        assert.equal(status && status.escrowPayment.state, ConditionState.Unfulfilled)
      })

      it('As collector2 I am locking the payment', async () => {
        await collector2.requestTokens(nftPrice2 / scale)

        const collector2BalanceBefore = await token.balanceOf(collector2.getId())
        assert.equal(collector2BalanceBefore, initialBalances.collector2 + nftPrice2)

        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.address,
        )

        const receipt = await nevermined.agreements.conditions.lockPayment(
          agreementId2,
          ddo.shortId(),
          assetPrice2.getAmounts(),
          assetPrice2.getReceivers(),
          token.address,
          collector2,
        )
        assert.isTrue(receipt)

        const collector2BalanceAfter = await token.balanceOf(collector2.getId())
        const escrowPaymentConditionBalanceAfter = await token.balanceOf(
          escrowPaymentCondition.address,
        )
        assert.equal(collector2BalanceAfter, initialBalances.collector2)
        assert.equal(
          escrowPaymentConditionBalanceBefore + assetPrice2.getTotalPrice(),
          escrowPaymentConditionBalanceAfter,
        )
      })

      it('As collector1 I can check the payment and transfer the NFT to collector2', async () => {
        const ownerBefore = await nft.ownerOf(ddo.shortId())
        assert.equal(ownerBefore, collector1.getId())

        const service = ddo.findServiceByType('nft-sales')

        const receipt = await nevermined.agreements.conditions.transferNft721(
          agreementId2,
          ddo,
          service.index,
          collector1,
        )
        assert.isTrue(receipt)

        const ownerAfter = await nft.ownerOf(ddo.shortId())
        assert.equal(ownerAfter, collector2.getId())
      })

      it('Collector1 and Artist get the payment', async () => {
        const escrowPaymentConditionBalanceBefore = await token.balanceOf(
          escrowPaymentCondition.address,
        )

        const receipt = await nevermined.agreements.conditions.releaseNft721Reward(
          agreementId2,
          ddo,
          'nft-sales',
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
          escrowPaymentConditionBalanceBefore - assetPrice2.getTotalPrice(),
          escrowPaymentConditionBalanceAfter,
        )
      })
    })
  })
})
