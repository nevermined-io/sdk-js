import { assert } from 'chai'
import config from '../../test/config'
import { Nevermined } from '@/nevermined/Nevermined'
import { NvmAccount } from '@/models/NvmAccount'
import { DDO } from '@/ddo/DDO'
import { AssetPrice } from '@/models/AssetPrice'
import { getMetadata } from '../utils/ddo-metadata-generator'

import { NFTAttributes } from '@/models/NFTAttributes'
import { generateId } from '@/common/helpers'

import { ConditionStoreManager } from '@/keeper/contracts/managers/ConditionStoreManager'
import {
  EscrowPaymentCondition,
  LockPaymentCondition,
  NFTAccessCondition,
  TransferNFTCondition,
  NFTHolderCondition,
} from '@/keeper/contracts/conditions'
import { RoyaltyAttributes, getRoyaltyAttributes } from '@/nevermined/api/AssetsApi'
import { RoyaltyKind } from '@/types/MetadataTypes'
import { ConditionState } from '@/types/ContractTypes'
import { Nft1155Contract } from '@/keeper/contracts/Nft1155Contract'
import { NFTSalesTemplate } from '@/keeper/contracts/templates/NFTSalesTemplate'
import { NFTAccessTemplate } from '@/keeper/contracts/templates/NFTAccessTemplate'
import { AssetAttributes } from '@/models/AssetAttributes'
import { parseEther } from '@/nevermined/utils/BlockchainViemUtils'
import { ZeroAddress } from '@/constants/AssetConstants'
import { decodeJwt } from 'jose'

describe('NFTTemplates With Ether E2E', async () => {
  let artist: NvmAccount
  let collector1: NvmAccount
  let collector2: NvmAccount
  let gallery: NvmAccount
  let sender: NvmAccount
  let governor: NvmAccount

  let nevermined: Nevermined
  let conditionStoreManager: ConditionStoreManager
  let nftUpgradeable: Nft1155Contract
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
  let ddo: DDO

  const royalties = 10 // 10% of royalties in the secondary market
  const cappedAmount = 5n

  let agreementId: string
  let agreementAccessId: string
  let agreementIdSeed: string
  let agreementAccessIdSeed: string

  const networkFee = 200000
  // Configuration of First Sale:
  // Artist -> Collector1, the gallery get a cut (25%)
  const numberNFTs = 1n
  const amounts = [parseEther('0.3'), parseEther('0.1'), parseEther('0.1')]

  let receivers: string[]
  let assetPrice: AssetPrice
  let royaltyAttributes: RoyaltyAttributes

  let initialBalances: any

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;[sender, artist, collector1, collector2, gallery, , , , , governor] =
      nevermined.accounts.list()

    console.debug(`ACCOUNT GOVERNOR = ${governor.getId()}`)

    await nevermined.keeper.nvmConfig.setNetworkFees(networkFee, governor.getId(), governor)
    const feeReceiver = await nevermined.keeper.nvmConfig.getFeeReceiver()
    console.debug(`FEE RECEIVER = ${feeReceiver}`)

    const fee = await nevermined.keeper.nvmConfig.getNetworkFee()
    console.debug(`NETWORK FEE = ${fee}`)

    receivers = [artist.getId(), gallery.getId(), governor.getId()]

    // components
    ;({ conditionStoreManager, nftUpgradeable } = nevermined.keeper)

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

    // ether
    assetPrice = new AssetPrice(
      new Map([
        [receivers[0], amounts[0]],
        [receivers[1], amounts[1]],
        [receivers[2], amounts[2]],
      ]),
    ).setTokenAddress(ZeroAddress)
  })

  after(async () => {
    await nevermined.keeper.nvmConfig.setNetworkFees(0, ZeroAddress, governor)
    console.debug(` --- Resetting Network Fees after the test`)
    const feeReceiver = await nevermined.keeper.nvmConfig.getFeeReceiver()
    console.debug(`FEE RECEIVER = ${feeReceiver}`)

    const fee = await nevermined.keeper.nvmConfig.getNetworkFee()
    console.debug(`NETWORK FEE = ${fee}`)
  })

  describe('Full flow', async () => {
    before(async () => {
      // initial balances
      initialBalances = {
        artist: await nevermined.accounts.getEtherBalance(artist),
        collector1: await nevermined.accounts.getEtherBalance(collector1),
        collector2: await nevermined.accounts.getEtherBalance(collector2),
        gallery: await nevermined.accounts.getEtherBalance(gallery),
        governor: await nevermined.accounts.getEtherBalance(governor),
        escrowPaymentCondition: await nevermined.accounts.getEtherBalance(
          escrowPaymentCondition.address,
        ),
      }

      agreementIdSeed = generateId()
      agreementAccessIdSeed = generateId()

      agreementId = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementIdSeed,
        sender.getId(),
      )
      agreementAccessId = await nevermined.keeper.agreementStoreManager.agreementId(
        agreementAccessIdSeed,
        collector1.getId(),
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
            price: assetPrice,
            nft: { amount: numberNFTs },
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

    describe('As an artist I want to register a new artwork', async () => {
      it('I want to register a new artwork and tokenize (via NFT). I want to get 10% royalties', async () => {
        await nftUpgradeable.setApprovalForAll(transferNftCondition.address, true, artist)

        const balance = await nftUpgradeable.balance(artist.getId(), ddo.shortId())
        assert.deepEqual(balance, 5n)
      })
    })

    describe('As a collector I want to buy some art', async () => {
      it('I am setting an agreement for buying a NFT', async () => {
        conditionIdLockPayment = await lockPaymentCondition.generateIdWithSeed(
          agreementId,
          await lockPaymentCondition.hashValues(
            ddo.shortId(),
            escrowPaymentCondition.address,
            ZeroAddress,
            assetPrice.getAmounts(),
            assetPrice.getReceivers(),
          ),
        )

        conditionIdTransferNFT = await transferNftCondition.generateIdWithSeed(
          agreementId,
          await transferNftCondition.hashValues(
            ddo.shortId(),
            artist.getId(),
            collector1.getId(),
            numberNFTs,
            conditionIdLockPayment[1],
          ),
        )

        conditionIdEscrow = await escrowPaymentCondition.generateIdWithSeed(
          agreementId,
          await escrowPaymentCondition.hashValues(
            ddo.shortId(),
            assetPrice.getAmounts(),
            assetPrice.getReceivers(),
            collector1.getId(),
            escrowPaymentCondition.address,
            ZeroAddress,
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
          sender,
        )

        assert.equal(result.status, 'success')
        const logs = nftSalesTemplate.getTransactionLogs(result, 'AgreementCreated')
        assert.isTrue(logs.length > 0)

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
        await lockPaymentCondition.fulfill(
          agreementId,
          ddo.shortId(),
          escrowPaymentCondition.address,
          ZeroAddress,
          assetPrice.getAmounts(),
          assetPrice.getReceivers(),
          collector1,
          { value: assetPrice.getTotalPrice() },
        )

        const { state } = await conditionStoreManager.getCondition(conditionIdLockPayment[1])
        assert.equal(state, ConditionState.Fulfilled)
      })

      it('The artist can check the payment and transfer the NFT to the collector', async () => {
        const nftBalanceArtistBefore = await nftUpgradeable.balance(artist.getId(), ddo.shortId())
        const nftBalanceCollectorBefore = await nftUpgradeable.balance(
          collector1.getId(),
          ddo.shortId(),
        )

        await transferNftCondition.fulfill(
          agreementId,
          ddo.shortId(),
          collector1.getId(),
          numberNFTs,
          nevermined.keeper.nftUpgradeable.address,
          conditionIdLockPayment[1],
          artist,
          true,
          TransferNFTCondition.NO_EXPIRY,
        )

        const { state } = await conditionStoreManager.getCondition(conditionIdTransferNFT[1])
        assert.equal(state, ConditionState.Fulfilled)

        const nftBalanceArtistAfter = await nftUpgradeable.balance(artist.getId(), ddo.shortId())
        const nftBalanceCollectorAfter = await nftUpgradeable.balance(
          collector1.getId(),
          ddo.shortId(),
        )

        assert.equal(nftBalanceArtistAfter, nftBalanceArtistBefore - numberNFTs)
        assert.equal(nftBalanceCollectorAfter, nftBalanceCollectorBefore + numberNFTs)
      })

      it('the artist asks and receives the payment', async function () {
        await escrowPaymentCondition.fulfill(
          agreementId,
          ddo.shortId(),
          assetPrice.getAmounts(),
          assetPrice.getReceivers(),
          collector1.getId(),
          escrowPaymentCondition.address,
          ZeroAddress,
          conditionIdLockPayment[1],
          conditionIdTransferNFT[1],
          artist,
        )

        const { state } = await conditionStoreManager.getCondition(conditionIdEscrow[1])
        assert.equal(state, ConditionState.Fulfilled)

        const escrowPaymentConditionBalance = await nevermined.accounts.getEtherBalance(
          escrowPaymentCondition.address,
        )
        const receiver0Balance = await nevermined.accounts.getEtherBalance(receivers[0])
        const receiver1Balance = await nevermined.accounts.getEtherBalance(receivers[1])
        const receiver2Balance = await nevermined.accounts.getEtherBalance(receivers[2])

        // for this assert we use a delta to account for the transaction fees
        // of all the transactions from the artist
        const delta = 10n ** 16n
        assert.isTrue(receiver0Balance >= initialBalances.artist + amounts[0] - delta)

        assert.equal(receiver1Balance, initialBalances.gallery + amounts[1])
        assert.equal(receiver2Balance, initialBalances.governor + amounts[2])
        assert.equal(escrowPaymentConditionBalance, initialBalances.escrowPaymentCondition)
      })
    })

    describe('As an artist I want to give exclusive access to the collectors owning a specific NFT', async () => {
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
        assert.equal(result.status, 'success')
        const logs = nftAccessTemplate.getTransactionLogs(result, 'AgreementCreated')
        assert.isTrue(logs.length > 0)

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
        await nftHolderCondition.fulfill(
          agreementAccessId,
          ddo.shortId(),
          collector1.getId(),
          numberNFTs,
          nevermined.keeper.nftUpgradeable.address,
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
  })
})
