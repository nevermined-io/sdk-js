import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import {
  DIDRegistry,
  NFTLockCondition,
  Nft1155Contract,
  ConditionStoreManager,
} from '../../../src/keeper'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'
import { Nevermined } from '../../../src/nevermined/Nevermined'
import { NvmAccount } from '../../../src/models/NvmAccount'
import { generateId } from '../../../src/common/helpers'
import { NFTAttributes } from '../../../src/models/NFTAttributes'
import { NeverminedNFT1155Type } from '../../../src/types/GeneralTypes'
import { ConditionState } from '../../../src/types/ContractTypes'
import { Log } from 'viem'
import { didZeroX, zeroX } from '../../../src/utils/ConversionTypeHelpers'

chai.use(chaiAsPromised)

describe('NFTLockCondition', () => {
  let nevermined: Nevermined
  let nftLockCondition: NFTLockCondition
  let conditionStoreManager: ConditionStoreManager
  let didRegistry: DIDRegistry
  let nftUpgradeable: Nft1155Contract
  let rewardAddress: NvmAccount
  let owner: NvmAccount

  let agreementId: string
  let checksum: string
  let didSeed: string
  const activityId = generateId()
  const value = 'https://nevermined.io/did/nevermined/test-attr-example.txt'
  const amount = 10n

  before(async () => {
    await TestContractHandler.prepareContracts()
    nevermined = await Nevermined.getInstance(config)
    ;({ nftLockCondition } = nevermined.keeper.conditions)
    ;({ conditionStoreManager, didRegistry, nftUpgradeable } = nevermined.keeper)
    ;[owner, rewardAddress] = nevermined.accounts.list()
  })

  beforeEach(async () => {
    agreementId = generateId()
    checksum = generateId()
    didSeed = `did:nv:${generateId()}`
  })

  describe('#hashValues()', () => {
    it('should hash the values', async () => {
      const did = await didRegistry.hashDID(didSeed, rewardAddress.getId())
      const hash = await nftLockCondition.hashValues(did, rewardAddress.getId(), amount)

      assert.match(hash, /^0x[a-f0-9]{64}$/i)
    })
  })

  describe('#generateId()', () => {
    it('should generate an ID', async () => {
      const did = await didRegistry.hashDID(didSeed, rewardAddress.getId())
      const hash = await nftLockCondition.hashValues(did, rewardAddress.getId(), amount)
      const id = await nftLockCondition.generateId(agreementId, hash)

      assert.match(id, /^0x[a-f0-9]{64}$/i)
    })
  })

  describe('fulfill correctly', () => {
    it('should fulfill if conditions exist for account address', async () => {
      // register DID
      const nftAttributes = NFTAttributes.getInstance({
        metadata: undefined,
        ercType: 1155,
        nftType: NeverminedNFT1155Type.nft1155,
        nftContractAddress: nftUpgradeable.address,
        cap: 100n,
        services: [
          {
            serviceType: 'nft-sales',
            nft: { amount },
          },
          {
            serviceType: 'nft-access',
            nft: { amount },
          },
        ],
        preMint: true,
      })

      await didRegistry.registerMintableDID(
        didSeed,
        nftUpgradeable.address,
        checksum,
        [],
        owner,
        nftAttributes,
        value,
        '',
        activityId,
      )
      const did = await didRegistry.hashDID(didSeed, owner.getId())

      const hashValues = await nftLockCondition.hashValues(did, rewardAddress.getId(), amount)
      const conditionId = await nftLockCondition.generateId(agreementId, hashValues)

      await conditionStoreManager.createCondition(conditionId, nftLockCondition.address, owner)

      const txReceipt = await nftLockCondition.fulfill(
        agreementId,
        did,
        rewardAddress.getId(),
        amount,
        owner,
      )

      const { state } = await conditionStoreManager.getCondition(conditionId)
      assert.equal(state, ConditionState.Fulfilled)

      const nftBalance = await nftUpgradeable.balance(rewardAddress.getId(), did)
      assert.equal(nftBalance, amount)
      const logs = nftLockCondition.getTransactionLogs(txReceipt, 'Fulfilled')
      assert.isTrue(logs.length > 0)

      const event: Log = logs[0]

      // @ts-ignore
      const { _agreementId, _did, _lockAddress, _conditionId, _amount } = event.args

      assert.equal(_agreementId, zeroX(agreementId))
      assert.equal(_did, didZeroX(did))
      assert.equal(_conditionId, conditionId)
      assert.equal(_lockAddress, rewardAddress.getId())
      assert.equal(BigInt(_amount), amount)
    })
  })

  describe('trying to fulfill but is invalid', () => {
    it('should not fulfill if conditions do not exist', async () => {
      // register DID
      const nftAttributes = NFTAttributes.getInstance({
        metadata: undefined,
        ercType: 1155,
        nftType: NeverminedNFT1155Type.nft1155,
        nftContractAddress: nftUpgradeable.address,
        cap: 100n,
        services: [
          {
            serviceType: 'nft-sales',
            nft: { amount },
          },
          {
            serviceType: 'nft-access',
            nft: { amount },
          },
        ],
        preMint: true,
      })

      await didRegistry.registerMintableDID(
        didSeed,
        nftUpgradeable.address,
        checksum,
        [],
        owner,
        nftAttributes,
        value,
        '',
        activityId,
      )

      const did = await didRegistry.hashDID(didSeed, owner.getId())

      await assert.isRejected(
        nftLockCondition.fulfill(agreementId, did, rewardAddress.getId(), amount, owner),
        /Condition doesnt exist/,
      )
    })

    it('out of balance should fail to fulfill', async () => {
      // register DID
      const nftAttributes = NFTAttributes.getInstance({
        metadata: undefined,
        ercType: 1155,
        nftType: NeverminedNFT1155Type.nft1155,
        nftContractAddress: nftUpgradeable.address,
        cap: 100n,
        services: [
          {
            serviceType: 'nft-sales',
            nft: { amount },
          },
          {
            serviceType: 'nft-access',
            nft: { amount },
          },
        ],
        preMint: false,
      })

      await didRegistry.registerMintableDID(
        didSeed,
        nftUpgradeable.address,
        checksum,
        [],
        owner,
        nftAttributes,
        value,
        '',
        activityId,
      )
      const did = await didRegistry.hashDID(didSeed, owner.getId())
      await nftUpgradeable.mint(owner.getId(), did, 1n, owner)

      const hashValues = await nftLockCondition.hashValues(did, rewardAddress.getId(), amount)
      const conditionId = await nftLockCondition.generateId(agreementId, hashValues)

      await conditionStoreManager.createCondition(conditionId, nftLockCondition.address, owner)

      await assert.isRejected(
        nftLockCondition.fulfill(agreementId, did, rewardAddress.getId(), amount + 1n, owner),
        /insufficient balance/,
      )
    })

    it('right transfer should fail to fulfill if conditions already fulfilled', async () => {
      // register DID
      const nftAttributes = NFTAttributes.getInstance({
        metadata: undefined,
        ercType: 1155,
        nftType: NeverminedNFT1155Type.nft1155,
        nftContractAddress: nftUpgradeable.address,
        cap: 100n,
        services: [
          {
            serviceType: 'nft-sales',
            nft: { amount },
          },
          {
            serviceType: 'nft-access',
            nft: { amount },
          },
        ],
        preMint: true,
      })

      await didRegistry.registerMintableDID(
        didSeed,
        nftUpgradeable.address,
        checksum,
        [],
        owner,
        nftAttributes,
        value,
        '',
        activityId,
      )
      const did = await didRegistry.hashDID(didSeed, owner.getId())

      const hashValues = await nftLockCondition.hashValues(did, rewardAddress.getId(), amount)
      const conditionId = await nftLockCondition.generateId(agreementId, hashValues)

      await conditionStoreManager.createCondition(conditionId, nftLockCondition.address, owner)

      await nftLockCondition.fulfill(agreementId, did, rewardAddress.getId(), amount, owner)
      let { state } = await conditionStoreManager.getCondition(conditionId)
      assert.equal(state, ConditionState.Fulfilled)

      await assert.isRejected(
        nftLockCondition.fulfill(agreementId, did, rewardAddress.getId(), amount, owner),
        undefined,
      )
      ;({ state } = await conditionStoreManager.getCondition(conditionId))
      assert.equal(state, ConditionState.Fulfilled)
    })
  })
})
