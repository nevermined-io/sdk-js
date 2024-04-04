import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import {
  AgreementStoreManager,
  TemplateStoreManager,
  ConditionStoreManager,
  TransferDIDOwnershipCondition,
  DIDRegistry,
} from '@/keeper'
import TestContractHandler from '../TestContractHandler'
import { NvmAccount } from '@/models/NvmAccount'
import { Nevermined } from '@/nevermined/Nevermined'
import { generateId } from '@/common/helpers'
import { ConditionState } from '@/types/ContractTypes'
import { Log } from 'viem'
import { didZeroX, zeroX } from '@/utils/ConversionTypeHelpers'


chai.use(chaiAsPromised)

describe('TransferDIDOwnershipCondition', () => {
  let nevermined: Nevermined
  let transferDidOwnershipCondition: TransferDIDOwnershipCondition
  let conditionStoreManager: ConditionStoreManager
  let templateStoreManager: TemplateStoreManager
  let agreementStoreManager: AgreementStoreManager
  let didRegistry: DIDRegistry
  let receiver: NvmAccount
  let owner: NvmAccount
  let deployer: NvmAccount
  let templateId: NvmAccount

  let agreementId: string
  let checksum: string
  let didSeed: string
  const value = 'https://nevermined.io/did/nevermined/test-attr-example.txt'

  before(async () => {
    const prepare = await TestContractHandler.prepareContracts()
    nevermined = prepare.nevermined
    deployer = prepare.deployerAccount

    ;({ transferDidOwnershipCondition } = nevermined.keeper.conditions)
    ;({ conditionStoreManager, didRegistry, templateStoreManager, agreementStoreManager } =
      nevermined.keeper)
    ;[owner, receiver, templateId] = await nevermined.accounts.list()

    await conditionStoreManager.delegateCreateRole(agreementStoreManager.address, deployer)

    try {
      await templateStoreManager.proposeTemplate(templateId.getId(), deployer)
      await templateStoreManager.approveTemplate(templateId.getId(), deployer)
    } catch (err) {
      if (!err.toString().includes('Template already exist')) {
        throw err
      }
    }

    await didRegistry.grantRegistryOperatorRole(
      transferDidOwnershipCondition.address,
      deployer,
    )
  })

  beforeEach(async () => {
    agreementId = generateId()
    checksum = generateId()
    didSeed = `did:nv:${generateId()}`
  })

  describe('#hashValues()', () => {
    it('should hash the values', async () => {
      const did = await didRegistry.hashDID(didSeed, receiver.getId())
      const hash = await transferDidOwnershipCondition.hashValues(did, receiver.getId())

      assert.match(hash, /^0x[a-f0-9]{64}$/i)
    })

    describe('#generateId()', () => {
      it('should generate an ID', async () => {
        const did = await didRegistry.hashDID(didSeed, receiver.getId())
        const hash = await transferDidOwnershipCondition.hashValues(did, receiver.getId())
        const id = await transferDidOwnershipCondition.generateId(agreementId, hash)

        assert.match(id, /^0x[a-f0-9]{64}$/i)
      })
    })
  })

  describe('trying to fulfill invalid conditions', () => {
    it('should not fulfill if condition does not exist', async () => {
      const did = await didRegistry.hashDID(didSeed, receiver.getId())
      await assert.isRejected(
        transferDidOwnershipCondition.fulfill(agreementId, did, receiver.getId(), receiver),
        /Only owner/,
      )
    })
  })

  describe('fulfill existing condition', () => {
    it('should fulfill if condition exist', async () => {
      await didRegistry.registerAttribute(didSeed, checksum, [], value, owner)
      const did = await didRegistry.hashDID(didSeed, owner.getId())

      const hashValues = await transferDidOwnershipCondition.hashValues(did, receiver.getId())
      const conditionId = await transferDidOwnershipCondition.generateId(agreementId, hashValues)

      await agreementStoreManager.createAgreement(
        agreementId,
        did,
        [transferDidOwnershipCondition.address],
        [hashValues],
        [0],
        [2],
        templateId,
      )

      await assert.isRejected(
        transferDidOwnershipCondition.fulfill(agreementId, did, receiver.getId(), receiver),
        'Only owner',
      )

      const storedDIDRegister: any = await didRegistry.getDIDRegister(did)
      
      assert.equal(storedDIDRegister[0], owner.getId())

      const txReceipt = await transferDidOwnershipCondition.fulfill(
        agreementId,
        did,
        receiver.getId(),
        owner,
      )

      const { state } = await conditionStoreManager.getCondition(conditionId)
      assert.equal(state, ConditionState.Fulfilled)

      const logs = transferDidOwnershipCondition.getTransactionLogs(txReceipt, 'Fulfilled')
      assert.isTrue(logs.length > 0)

      const event: Log = logs[0]
      // @ts-ignore
      const { _agreementId, _conditionId, _did, _receiver } = event.args

      assert.equal(_agreementId, zeroX(agreementId))
      assert.equal(_conditionId, conditionId)
      assert.equal(_did, didZeroX(did))
      assert.equal(_receiver, receiver.getId())
    })
  })
})
