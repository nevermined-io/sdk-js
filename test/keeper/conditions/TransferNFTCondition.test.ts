import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import {
  DIDRegistry,
  ConditionStoreManager,
  TransferNFTCondition,
  LockPaymentCondition,
  EscrowPaymentCondition,
  Nft1155Contract,
  Token,
} from '@/keeper'
import { didZeroX, zeroX } from '@/utils'
import TestContractHandler from '../TestContractHandler'
import { Nevermined } from '@/nevermined/Nevermined'
import { NvmAccount } from '@/models/NvmAccount'
import { generateId } from '@/common/helpers'
import { Log } from 'viem'
import { ConditionState } from '@/types/ContractTypes'
import { NFTAttributes } from '@/models/NFTAttributes'
import { NeverminedNFT1155Type } from '@/types/GeneralTypes'
import { ZeroAddress } from '@/constants/AssetConstants'
chai.use(chaiAsPromised)

describe('TransferNFTCondition', () => {
  let nevermined: Nevermined
  let transferNftCondition: TransferNFTCondition
  let lockPaymentCondition: LockPaymentCondition
  let escrowPaymentCondition: EscrowPaymentCondition
  let conditionStoreManager: ConditionStoreManager
  let didRegistry: DIDRegistry
  let nftUpgradeable: Nft1155Contract
  let token: Token

  let deployer: NvmAccount
  let nftReceiver: NvmAccount
  let owner: NvmAccount
  let other: NvmAccount

  let agreementId: string
  let checksum: string
  let didSeed: string
  let receivers: string[]

  const activityId = generateId()
  const value = 'https://nevermined.io/did/nevermined/test-attr-example.txt'
  const nftAmount = 2n
  const amounts = [10n]

  before(async () => {
    const prepare = await TestContractHandler.prepareContracts()
    nevermined = prepare.nevermined
    deployer = prepare.deployerAccount
    ;({ transferNftCondition, lockPaymentCondition, escrowPaymentCondition } =
      nevermined.keeper.conditions)
    ;({ conditionStoreManager, didRegistry, token, nftUpgradeable } = nevermined.keeper)
    ;[owner, nftReceiver, other] = nevermined.accounts.list()
    receivers = [nftReceiver.getId()]

    await conditionStoreManager.delegateCreateRole(owner.getId(), deployer)
  })

  beforeEach(async () => {
    agreementId = generateId()
    checksum = generateId()
    didSeed = `did:nv:${generateId()}`
  })

  describe('#hashValues()', () => {
    it('should hash the values', async () => {
      const conditionId = generateId()
      const did = await didRegistry.hashDID(didSeed, nftReceiver.getId())
      console.log(`DID: ${did}`)
      console.log(`owner: ${owner.getId()}`)
      console.log(`nftReceiver: ${nftReceiver.getId()}`)
      console.log(`nftAmount: ${nftAmount}`)
      console.log(`conditionId: ${zeroX(conditionId)}`)

      const hash = await transferNftCondition.hashValues(
        did,
        owner.getId(),
        nftReceiver.getId(),
        nftAmount,
        zeroX(conditionId),
      )

      assert.match(hash, /^0x[a-f0-9]{64}$/i)
    })
  })

  describe('#generateId()', () => {
    it('should generate an ID', async () => {
      const conditionId = generateId()
      const did = await didRegistry.hashDID(didSeed, nftReceiver.getId())
      const hash = await transferNftCondition.hashValues(
        did,
        owner.getId(),
        nftReceiver.getId(),
        nftAmount,
        zeroX(conditionId),
      )
      const id = await transferNftCondition.generateId(agreementId, hash)

      assert.match(id, /^0x[a-f0-9]{64}$/i)
    })
  })

  describe('fulfill correctly', () => {
    it('should fulfill if condition exist', async () => {
      const did = await didRegistry.hashDID(didSeed, owner.getId())
      const hashValuesPayment = await lockPaymentCondition.hashValues(
        did,
        escrowPaymentCondition.address,
        token.address,
        amounts,
        receivers,
      )

      const conditionIdPayment = await lockPaymentCondition.generateId(
        agreementId,
        hashValuesPayment,
      )

      await conditionStoreManager.createCondition(
        conditionIdPayment,
        lockPaymentCondition.address,
        owner,
      )

      const nftAttributes = NFTAttributes.getInstance({
        metadata: undefined,
        ercType: 1155,
        nftType: NeverminedNFT1155Type.nft1155,
        nftContractAddress: nftUpgradeable.address,
        cap: 100n,
        services: [
          {
            serviceType: 'nft-sales',
            nft: { amount: nftAmount },
          },
          {
            serviceType: 'nft-access',
            nft: { amount: nftAmount },
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
      await nevermined.nfts1155.mint(did, nftAmount, owner.getId(), owner)

      await nevermined.accounts.requestTokens(nftReceiver, 10n)
      await nevermined.keeper.token.approve(lockPaymentCondition.address, 10n, nftReceiver)

      await lockPaymentCondition.fulfill(
        agreementId,
        did,
        escrowPaymentCondition.address,
        token.address,
        amounts,
        receivers,
        nftReceiver,
      )

      let { state } = await conditionStoreManager.getCondition(conditionIdPayment)
      assert.equal(state, ConditionState.Fulfilled)

      const hashValues = await transferNftCondition.hashValues(
        did,
        owner.getId(),
        nftReceiver.getId(),
        nftAmount,
        conditionIdPayment,
      )
      const conditionId = await transferNftCondition.generateId(agreementId, hashValues)

      await conditionStoreManager.createCondition(conditionId, transferNftCondition.address, owner)

      const txReceipt = await transferNftCondition.fulfill(
        agreementId,
        did,
        nftReceiver.getId(),
        nftAmount,
        nftUpgradeable.address,
        conditionIdPayment,
        owner,
      )
      ;({ state } = await conditionStoreManager.getCondition(conditionId))
      assert.equal(state, ConditionState.Fulfilled)

      const logs = transferNftCondition.getTransactionLogs(txReceipt, 'Fulfilled')
      assert.isTrue(logs.length > 0)

      const event: Log = logs[0]

      // @ts-ignore
      const { _agreementId, _did, _receiver, _conditionId, _amount } = event.args

      assert.equal(_agreementId, zeroX(agreementId))
      assert.equal(_did, didZeroX(did))
      assert.equal(_conditionId, conditionId)
      assert.equal(_receiver, nftReceiver.getId())
      assert.equal(BigInt(_amount), nftAmount)
    })
  })

  describe('fulfill correctly with ether', () => {
    it('should fulfill if condition exist', async () => {
      const did = await didRegistry.hashDID(didSeed, owner.getId())
      const hashValuesPayment = await lockPaymentCondition.hashValues(
        did,
        escrowPaymentCondition.address,
        ZeroAddress,
        amounts,
        receivers,
      )
      const conditionIdPayment = await lockPaymentCondition.generateId(
        agreementId,
        hashValuesPayment,
      )

      await conditionStoreManager.createCondition(
        conditionIdPayment,
        lockPaymentCondition.address,
        owner,
      )

      const nftAttributes = NFTAttributes.getInstance({
        metadata: undefined,
        ercType: 1155,
        nftType: NeverminedNFT1155Type.nft1155,
        nftContractAddress: nftUpgradeable.address,
        cap: 0n,
        services: [
          {
            serviceType: 'nft-sales',
            nft: { amount: nftAmount },
          },
          {
            serviceType: 'nft-access',
            nft: { amount: nftAmount },
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
      await nevermined.nfts1155.mint(did, nftAmount, owner.getId(), owner)

      console.log('Locking Amount: ', amounts)

      const condReceipt = await lockPaymentCondition.fulfill(
        agreementId,
        did,
        escrowPaymentCondition.address,
        ZeroAddress,
        amounts,
        receivers,
        nftReceiver,
        { value: amounts[0] },
      )

      console.log('Lock Condition Receipt: ', condReceipt)
      assert.equal(condReceipt.status, 'success')

      let { state } = await conditionStoreManager.getCondition(conditionIdPayment)
      assert.equal(state, ConditionState.Fulfilled)

      const hashValues = await transferNftCondition.hashValues(
        did,
        owner.getId(),
        nftReceiver.getId(),
        nftAmount,
        conditionIdPayment,
      )

      const conditionId = await transferNftCondition.generateId(agreementId, hashValues)

      await conditionStoreManager.createCondition(conditionId, transferNftCondition.address, owner)

      const txReceipt = await transferNftCondition.fulfill(
        agreementId,
        did,
        nftReceiver.getId(),
        nftAmount,
        nftUpgradeable.address,
        conditionIdPayment,
        owner,
      )
      ;({ state } = await conditionStoreManager.getCondition(conditionId))
      assert.equal(state, ConditionState.Fulfilled)

      // const event: EventLog = txReceipt.logs.find(
      //   (e: EventLog) => e.eventName === 'Fulfilled',
      // ) as EventLog
      const logs = transferNftCondition.getTransactionLogs(txReceipt, 'Fulfilled')
      assert.isTrue(logs.length > 0)
      // console.log(JSON.stringify(logs, jsonReplacer))
      const event: Log = logs[0]
      // @ts-ignore
      const { _agreementId, _did, _receiver, _conditionId, _amount } = event.args

      assert.equal(_agreementId, zeroX(agreementId))
      assert.equal(_did, didZeroX(did))
      assert.equal(_conditionId, conditionId)
      assert.equal(_receiver, nftReceiver.getId())
      assert.equal(Number(_amount), Number(nftAmount))
    })
  })

  describe('trying to fulfill invalid conditions', () => {
    it('should not fulfill if condition does not exist or account is invalid', async () => {
      const did = await didRegistry.hashDID(didSeed, owner.getId())
      const hashValuesPayment = await lockPaymentCondition.hashValues(
        did,
        lockPaymentCondition.address,
        token.address,
        amounts,
        receivers,
      )
      const conditionIdPayment = await lockPaymentCondition.generateId(
        agreementId,
        hashValuesPayment,
      )

      await conditionStoreManager.createCondition(
        conditionIdPayment,
        lockPaymentCondition.address,
        owner,
      )

      const nftAttributes = NFTAttributes.getInstance({
        metadata: undefined,
        ercType: 1155,
        nftType: NeverminedNFT1155Type.nft1155,
        nftContractAddress: nftUpgradeable.address,
        cap: 0n,
        services: [
          {
            serviceType: 'nft-sales',
            nft: { amount: nftAmount },
          },
          {
            serviceType: 'nft-access',
            nft: { amount: nftAmount },
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
      await nevermined.nfts1155.mint(did, nftAmount, owner.getId(), owner)

      await nevermined.accounts.requestTokens(nftReceiver, 10n)
      await nevermined.keeper.token.approve(lockPaymentCondition.address, 10n, nftReceiver)

      await lockPaymentCondition.fulfill(
        agreementId,
        did,
        lockPaymentCondition.address,
        token.address,
        amounts,
        receivers,
        nftReceiver,
      )
      const { state } = await conditionStoreManager.getCondition(conditionIdPayment)
      assert.equal(state, ConditionState.Fulfilled)

      const hashValues = await transferNftCondition.hashValues(
        did,
        owner.getId(),
        nftReceiver.getId(),
        nftAmount,
        conditionIdPayment,
      )
      const conditionId = await transferNftCondition.generateId(agreementId, hashValues)

      await conditionStoreManager.createCondition(conditionId, transferNftCondition.address, owner)

      // Invalid user executing the fulfill
      await assert.isRejected(
        transferNftCondition.fulfill(
          agreementId,
          did,
          nftReceiver.getId(),
          nftAmount,
          nftUpgradeable.address,
          conditionIdPayment,
          other,
          true,
          0,
        ),
      )

      // Invalid reward address
      await assert.isRejected(
        transferNftCondition.fulfill(
          agreementId,
          did,
          other.getId(),
          nftAmount,
          nftUpgradeable.address,
          conditionIdPayment,
          owner,
        ),
      )

      // Invalid conditionId
      const invalidConditionId = zeroX(generateId())
      await assert.isRejected(
        transferNftCondition.fulfill(
          agreementId,
          did,
          nftReceiver.getId(),
          nftAmount,
          nftUpgradeable.address,
          invalidConditionId,
          owner,
        ),
      )

      // Invalid agreementID
      const invalidAgreementId = zeroX(generateId())
      await assert.isRejected(
        transferNftCondition.fulfill(
          invalidAgreementId,
          did,
          nftReceiver.getId(),
          nftAmount,
          nftUpgradeable.address,
          conditionIdPayment,
          owner,
        ),
      )
    })
  })
})
