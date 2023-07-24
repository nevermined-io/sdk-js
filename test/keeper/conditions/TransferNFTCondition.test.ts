import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ContractReceipt, Event } from 'ethers'
import {
  Account,
  ConditionState,
  Nevermined,
  NeverminedNFT1155Type,
  NFTAttributes,
} from '../../../src'
import {
  DIDRegistry,
  Token,
  Nft1155Contract,
  EscrowPaymentCondition,
  LockPaymentCondition,
  TransferNFTCondition,
  ConditionStoreManager,
} from '../../../src/keeper'
import { didZeroX, ZeroAddress, zeroX, generateId, BigNumber } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

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

  let nftReceiver: Account
  let owner: Account
  let other: Account

  let agreementId: string
  let checksum: string
  let didSeed: string
  let receivers: string[]

  const activityId = generateId()
  const value = 'https://nevermined.io/did/nevermined/test-attr-example.txt'
  const nftAmount = BigNumber.from(2)
  const amounts = [BigNumber.from(10)]

  before(async () => {
    await TestContractHandler.prepareContracts()
    nevermined = await Nevermined.getInstance(config)
    ;({ transferNftCondition, lockPaymentCondition, escrowPaymentCondition } =
      nevermined.keeper.conditions)
    ;({ conditionStoreManager, didRegistry, token, nftUpgradeable } = nevermined.keeper)
    ;[owner, nftReceiver, other] = await nevermined.accounts.list()
    receivers = [nftReceiver.getId()]

    await conditionStoreManager.delegateCreateRole(owner.getId(), owner.getId())
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
        escrowPaymentCondition.getAddress(),
        token.getAddress(),
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
        cap: BigNumber.from(100),
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
        owner.getId(),
        nftAttributes,
        value,
        '',
        activityId,
      )
      await nevermined.nfts1155.mint(did, nftAmount, owner.getId(), owner)

      await nftReceiver.requestTokens(10)
      await nevermined.keeper.token.approve(
        lockPaymentCondition.getAddress(),
        BigNumber.from(10),
        nftReceiver,
      )

      await lockPaymentCondition.fulfill(
        agreementId,
        did,
        escrowPaymentCondition.address,
        token.getAddress(),
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

      const contractReceipt: ContractReceipt = await transferNftCondition.fulfill(
        agreementId,
        did,
        nftReceiver.getId(),
        nftAmount,
        nftUpgradeable.address,
        conditionIdPayment,
      )
      ;({ state } = await conditionStoreManager.getCondition(conditionId))
      assert.equal(state, ConditionState.Fulfilled)

      const event: Event = contractReceipt.events.find((e) => e.event === 'Fulfilled')
      const { _agreementId, _did, _receiver, _conditionId, _amount } = event.args

      assert.equal(_agreementId, zeroX(agreementId))
      assert.equal(_did, didZeroX(did))
      assert.equal(_conditionId, conditionId)
      assert.equal(_receiver, nftReceiver.getId())
      assert.equal(Number(_amount), Number(nftAmount))
    })
  })

  describe('fulfill correctly with ether', () => {
    it('should fulfill if condition exist', async () => {
      const did = await didRegistry.hashDID(didSeed, owner.getId())
      const hashValuesPayment = await lockPaymentCondition.hashValues(
        did,
        escrowPaymentCondition.getAddress(),
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
        cap: BigNumber.from(0),
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
        owner.getId(),
        nftAttributes,
        value,
        '',
        activityId,
      )
      await nevermined.nfts1155.mint(did, nftAmount, owner.getId(), owner)

      await lockPaymentCondition.fulfill(
        agreementId,
        did,
        escrowPaymentCondition.address,
        ZeroAddress,
        amounts,
        receivers,
        nftReceiver,
        { value: amounts[0].toString() },
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

      const contractReceipt: ContractReceipt = await transferNftCondition.fulfill(
        agreementId,
        did,
        nftReceiver.getId(),
        nftAmount,
        nftUpgradeable.address,
        conditionIdPayment,
      )
      ;({ state } = await conditionStoreManager.getCondition(conditionId))
      assert.equal(state, ConditionState.Fulfilled)

      const event: Event = contractReceipt.events.find((e) => e.event === 'Fulfilled')
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
        token.getAddress(),
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
        cap: BigNumber.from(0),
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
        owner.getId(),
        nftAttributes,
        value,
        '',
        activityId,
      )
      await nevermined.nfts1155.mint(did, nftAmount, owner.getId(), owner)

      await nftReceiver.requestTokens(10)
      await nevermined.keeper.token.approve(
        lockPaymentCondition.getAddress(),
        BigNumber.from(10),
        nftReceiver,
      )

      await lockPaymentCondition.fulfill(
        agreementId,
        did,
        lockPaymentCondition.address,
        token.getAddress(),
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
          true,
          other,
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
        ),
      )
    })
  })
})
