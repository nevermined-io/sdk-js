import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import {
  NvmAccount,
  ConditionState,
  Nevermined,
  NeverminedNFT1155Type,
  NFTAttributes,
} from '../../../src'
import {
  NFTHolderCondition,
  Nft1155Contract,
  DIDRegistry,
  ConditionStoreManager,
} from '../../../src/keeper'
import { didZeroX, zeroX, generateId } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'
import { ContractTransactionReceipt, EventLog } from 'ethers'

chai.use(chaiAsPromised)

describe('NFTHolderCondition', () => {
  let nftHolderCondition: NFTHolderCondition
  let conditionStoreManager: ConditionStoreManager
  let didRegistry: DIDRegistry
  let nftUpgradeable: Nft1155Contract
  let holder: NvmAccount
  let owner: NvmAccount

  let agreementId: string
  let checksum: string
  let didSeed: string
  const activityId = generateId()
  const value = 'https://nevermined.io/did/nevermined/test-attr-example.txt'
  const amount = 10n

  before(async () => {
    await TestContractHandler.prepareContracts()
    const nevermined = await Nevermined.getInstance(config)
    ;({ nftHolderCondition } = nevermined.keeper.conditions)
    ;({ conditionStoreManager, didRegistry, nftUpgradeable } = nevermined.keeper)
    ;[owner, holder] = await nevermined.accounts.list()

    await conditionStoreManager.delegateCreateRole(owner.getId(), owner.getId())
  })

  beforeEach(async () => {
    agreementId = generateId()
    checksum = generateId()
    didSeed = `did:nv:${generateId()}`
  })

  describe('#hashValues()', () => {
    it('should hash the values', async () => {
      const did = await didRegistry.hashDID(didSeed, holder.getId())
      const hash = await nftHolderCondition.hashValues(did, holder.getId(), amount)

      assert.match(hash, /^0x[a-f0-9]{64}$/i)
    })
  })

  describe('#generateId()', () => {
    it('should generate an ID', async () => {
      const did = await didRegistry.hashDID(didSeed, holder.getId())
      const hash = await nftHolderCondition.hashValues(did, holder.getId(), amount)
      const id = await nftHolderCondition.generateId(agreementId, hash)

      assert.match(id, /^0x[a-f0-9]{64}$/i)
    })
  })

  describe('fulfill existing condition', () => {
    it('should fulfill if conditions exist for account address', async () => {
      const did = await didRegistry.hashDID(didSeed, owner.getId())
      const hashValues = await nftHolderCondition.hashValues(did, holder.getId(), amount)
      const conditionId = await nftHolderCondition.generateId(agreementId, hashValues)

      await conditionStoreManager.createCondition(conditionId, nftHolderCondition.address, owner)

      const nftAttributes = NFTAttributes.getInstance({
        metadata: undefined,
        ercType: 1155,
        nftType: NeverminedNFT1155Type.nft1155,
        nftContractAddress: nftUpgradeable.address,
        cap: 100n,
        preMint: false,
      })

      await didRegistry.registerMintableDID(
        didSeed,
        nftUpgradeable.address,
        checksum,
        [],
        owner.getId(),
        nftAttributes,
        value,
        '',
        activityId,
      )

      await nftUpgradeable.mint(holder.getId(), did, 10n, owner.getId())

      const contractReceipt: ContractTransactionReceipt = await nftHolderCondition.fulfill(
        agreementId,
        did,
        holder.getId(),
        amount,
        nftUpgradeable.address,
      )
      const { state } = await conditionStoreManager.getCondition(conditionId)
      assert.equal(state, ConditionState.Fulfilled)

      const event: EventLog = contractReceipt.logs.find(
        (e: EventLog) => e.eventName === 'Fulfilled',
      ) as EventLog
      const { _agreementId, _did, _address, _conditionId, _amount } = event.args
      assert.equal(_agreementId, zeroX(agreementId))
      assert.equal(_did, didZeroX(did))
      assert.equal(_address, holder.getId())
      assert.equal(_conditionId, conditionId)
      assert.equal(Number(_amount), Number(amount))
    })
  })

  describe('fulfill non existing condition', () => {
    it('should not fulfill if conditions do not exist', async () => {
      const nftAttributes = NFTAttributes.getInstance({
        metadata: undefined,
        ercType: 1155,
        nftType: NeverminedNFT1155Type.nft1155,
        nftContractAddress: nftUpgradeable.address,
        cap: 100n,
        preMint: false,
      })
      await didRegistry.registerMintableDID(
        didSeed,
        nftUpgradeable.address,
        checksum,
        [],
        owner.getId(),
        nftAttributes,
        value,
        '',
        activityId,
      )
      const did = await didRegistry.hashDID(didSeed, owner.getId())
      await nftUpgradeable.mint(holder.getId(), did, 10n, owner.getId())

      await assert.isRejected(
        nftHolderCondition.fulfill(
          agreementId,
          did,
          holder.getId(),
          amount,
          nftUpgradeable.address,
        ),
        /Condition doesnt exist/,
      )
    })
  })

  describe('fail to fulfill existing condition', () => {
    it('out of balance should fail to fulfill if conditions exist', async () => {
      const did = await didRegistry.hashDID(didSeed, owner.getId())
      const hashValues = await nftHolderCondition.hashValues(did, holder.getId(), amount)
      const conditionId = await nftHolderCondition.generateId(agreementId, hashValues)

      await conditionStoreManager.createCondition(conditionId, nftHolderCondition.address, owner)

      const nftAttributes = NFTAttributes.getInstance({
        metadata: undefined,
        ercType: 1155,
        nftType: NeverminedNFT1155Type.nft1155,
        nftContractAddress: nftUpgradeable.address,
        cap: 100n,
        preMint: false,
      })

      await didRegistry.registerMintableDID(
        didSeed,
        nftUpgradeable.address,
        checksum,
        [],
        owner.getId(),
        nftAttributes,
        value,
        '',
        activityId,
      )

      await nftUpgradeable.mint(holder.getId(), did, 1n, owner.getId())

      await assert.isRejected(
        nftHolderCondition.fulfill(
          agreementId,
          did,
          holder.getId(),
          amount,
          nftUpgradeable.address,
        ),
        /The holder doesnt have enough NFT balance for the did given/,
      )
    })
  })
})
