import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Nevermined, Account, ConditionState } from '../../../src'
import { DIDRegistry } from '../../../src/keeper'
import {
  AgreementStoreManager,
  ConditionStoreManager,
  TemplateStoreManager,
  DIDSalesTemplate,
} from '../../../src/keeper'
import { didZeroX, zeroX, generateId } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'
import { ContractTransactionReceipt, EventLog } from 'ethers'

chai.use(chaiAsPromised)

describe('DIDSalesTemplate', () => {
  let nevermined: Nevermined
  let didSalesTemplate: DIDSalesTemplate
  let templateStoreManager: TemplateStoreManager
  let didRegistry: DIDRegistry
  let conditionStoreManager: ConditionStoreManager
  let agreementStoreManager: AgreementStoreManager
  let agreementId: string
  let agreementIdSeed: string
  let conditionIds: string[]
  let conditionIdSeeds: string[]
  let timeLocks: number[]
  let timeOuts: number[]
  let sender: Account
  let receiver: Account
  let didSeed: string
  let checksum: string
  const url = 'https://nevermined.io/did/nevermined/test-attr-example.txt'

  before(async () => {
    await TestContractHandler.prepareContracts()
    nevermined = await Nevermined.getInstance(config)
    ;({ didSalesTemplate } = nevermined.keeper.templates)
    ;({ templateStoreManager, didRegistry, conditionStoreManager, agreementStoreManager } =
      nevermined.keeper)
    ;[sender, receiver] = await nevermined.accounts.list()
    timeLocks = [0, 0, 0]
    timeOuts = [0, 0, 0]

    await conditionStoreManager.delegateCreateRole(agreementStoreManager.address, sender.getId())
  })

  beforeEach(async () => {
    agreementIdSeed = zeroX(generateId())
    agreementId = await agreementStoreManager.agreementId(agreementIdSeed, sender.getId())
    conditionIdSeeds = [zeroX(generateId()), zeroX(generateId()), zeroX(generateId())]
    conditionIds = [
      await nevermined.keeper.conditions.lockPaymentCondition.generateId(
        agreementId,
        conditionIdSeeds[0],
      ),
      await nevermined.keeper.conditions.transferDidOwnershipCondition.generateId(
        agreementId,
        conditionIdSeeds[1],
      ),
      await nevermined.keeper.conditions.escrowPaymentCondition.generateId(
        agreementId,
        conditionIdSeeds[2],
      ),
    ]
    didSeed = `did:nv:${generateId()}`
    checksum = generateId()
  })

  describe('create agreement', () => {
    it('should fail if template is not approve', async () => {
      const did = await didRegistry.hashDID(didSeed, sender.getId())
      await assert.isRejected(
        didSalesTemplate.createAgreement(
          agreementId,
          didZeroX(did),
          conditionIds,
          timeLocks,
          timeOuts,
          [receiver.getId()],
          sender,
        ),
        /Template not Approved/,
      )
    })

    it('should fail if DID is not registered', async () => {
      // propose and approve template
      await templateStoreManager.proposeTemplate(didSalesTemplate.address)
      await templateStoreManager.approveTemplate(didSalesTemplate.address)
      const did = await didRegistry.hashDID(didSeed, sender.getId())

      await assert.isRejected(
        didSalesTemplate.createAgreement(
          agreementId,
          didZeroX(did),
          conditionIds,
          timeLocks,
          timeOuts,
          [receiver.getId()],
          sender,
        ),
        /DID not registered/,
      )
    })

    it('should create agreement', async () => {
      await didRegistry.registerAttribute(didSeed, checksum, [], url, sender.getId())
      const did = await didRegistry.hashDID(didSeed, sender.getId())

      const contractReceipt: ContractTransactionReceipt = await didSalesTemplate.createAgreement(
        agreementIdSeed,
        didZeroX(did),
        conditionIdSeeds,
        timeLocks,
        timeOuts,
        [receiver.getId()],
        sender,
      )
      assert.equal(contractReceipt.status, 1)
      assert.isTrue(contractReceipt.logs.some((e: EventLog) => e.eventName === 'AgreementCreated'))

      const event: EventLog = contractReceipt.logs.find(
        (e: EventLog) => e.eventName === 'AgreementCreated',
      ) as EventLog
      const { _agreementId, _did } = event.args
      assert.equal(_agreementId, zeroX(agreementId))
      assert.equal(_did, didZeroX(did))

      const storedAgreement = await agreementStoreManager.getAgreement(agreementId)
      assert.deepEqual(storedAgreement.conditionIdSeeds, conditionIdSeeds)

      const conditionTypes = await didSalesTemplate.getConditionTypes()
      await Promise.all(
        conditionIds.map(async (conditionId, i) => {
          const storedCondition = await conditionStoreManager.getCondition(conditionId)
          assert.equal(storedCondition.typeRef, conditionTypes[i])
          assert.equal(storedCondition.state, ConditionState.Unfulfilled)
          assert.equal(storedCondition.timeLock, timeLocks[i])
          assert.equal(storedCondition.timeOut, timeOuts[i])
        }),
      )
    })
  })
})
