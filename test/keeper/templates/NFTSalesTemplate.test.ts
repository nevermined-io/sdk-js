import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import {
  AgreementStoreManager,
  ConditionStoreManager,
  TemplateStoreManager,
  DIDRegistry,
  NFTSalesTemplate,
} from '@/keeper'
import { didZeroX, zeroX } from '@/utils'
import TestContractHandler from '../TestContractHandler'
import { Nevermined } from '@/nevermined/Nevermined'
import { NvmAccount } from '@/models/NvmAccount'
import { generateId } from '@/common/helpers'
import { Log } from 'viem'
import { ConditionState } from '@/types/ContractTypes'

chai.use(chaiAsPromised)

describe('NFTSalesTemplate', () => {
  let nevermined: Nevermined
  let nftSalesTemplate: NFTSalesTemplate
  let templateStoreManager: TemplateStoreManager
  let didRegistry: DIDRegistry
  let conditionStoreManager: ConditionStoreManager
  let agreementStoreManager: AgreementStoreManager
  let agreementId: string
  let conditionIds: string[]
  let agreementIdSeed: string
  let conditionIdSeeds: string[]
  let timeLocks: number[]
  let timeOuts: number[]
  let deployer: NvmAccount
  let sender: NvmAccount
  let receiver: NvmAccount
  let didSeed: string
  let checksum: string
  const url = 'https://nevermined.io/did/nevermined/test-attr-example.txt'

  before(async () => {
    const prepare = await TestContractHandler.prepareContracts()
    nevermined = prepare.nevermined
    deployer = prepare.deployerAccount
    ;({ nftSalesTemplate } = nevermined.keeper.templates)
    ;({ templateStoreManager, didRegistry, conditionStoreManager, agreementStoreManager } =
      nevermined.keeper)
    ;[sender, receiver] = nevermined.accounts.list()
    timeLocks = [0, 0, 0]
    timeOuts = [0, 0, 0]

    await conditionStoreManager.delegateCreateRole(agreementStoreManager.address, deployer)
  })

  beforeEach(async () => {
    agreementIdSeed = zeroX(generateId())
    conditionIdSeeds = [zeroX(generateId()), zeroX(generateId()), zeroX(generateId())]
    agreementId = await agreementStoreManager.agreementId(agreementIdSeed, sender.getId())
    conditionIds = [
      await nevermined.keeper.conditions.lockPaymentCondition.generateId(
        agreementId,
        conditionIdSeeds[0],
      ),
      await nevermined.keeper.conditions.transferNftCondition.generateId(
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
        nftSalesTemplate.createAgreement(
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
      await templateStoreManager.proposeTemplate(nftSalesTemplate.address, deployer)
      await templateStoreManager.approveTemplate(nftSalesTemplate.address, deployer)
      const did = await didRegistry.hashDID(didSeed, sender.getId())

      await assert.isRejected(
        nftSalesTemplate.createAgreement(
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
      await didRegistry.registerAttribute(didSeed, checksum, [], url, sender)
      const did = await didRegistry.hashDID(didSeed, sender.getId())

      const txReceipt = await nftSalesTemplate.createAgreement(
        agreementIdSeed,
        didZeroX(did),
        conditionIdSeeds,
        timeLocks,
        timeOuts,
        [receiver.getId()],
        sender,
      )
      assert.equal(txReceipt.status, 'success')

      const logs = nftSalesTemplate.getTransactionLogs(txReceipt, 'AgreementCreated')
      assert.isTrue(logs.length > 0)
      const event: Log = logs[0]

      // @ts-ignore
      const { _agreementId, _did } = event.args
      assert.equal(_agreementId, zeroX(agreementId))
      assert.equal(_did, didZeroX(did))

      const storedAgreement = await agreementStoreManager.getAgreement(agreementId)
      assert.deepEqual(storedAgreement.conditionIdSeeds, conditionIdSeeds)

      const conditionTypes = await nftSalesTemplate.getConditionTypes()
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
