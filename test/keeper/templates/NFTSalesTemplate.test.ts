import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Nevermined, NvmAccount, ConditionState } from '../../../src'
import {
  DIDRegistry,
  AgreementStoreManager,
  ConditionStoreManager,
  TemplateStoreManager,
  NFTSalesTemplate,
} from '../../../src/keeper'
import { didZeroX, zeroX, generateId } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

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
  let sender: NvmAccount
  let receiver: NvmAccount
  let didSeed: string
  let checksum: string
  const url = 'https://nevermined.io/did/nevermined/test-attr-example.txt'

  before(async () => {
    await TestContractHandler.prepareContracts()
    nevermined = await Nevermined.getInstance(config)
    ;({ nftSalesTemplate } = nevermined.keeper.templates)
    ;({ templateStoreManager, didRegistry, conditionStoreManager, agreementStoreManager } =
      nevermined.keeper)
    ;[sender, receiver] = await nevermined.accounts.list()
    timeLocks = [0, 0, 0]
    timeOuts = [0, 0, 0]

    await conditionStoreManager.delegateCreateRole(agreementStoreManager.address, sender.getId())
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
      await templateStoreManager.proposeTemplate(nftSalesTemplate.address)
      await templateStoreManager.approveTemplate(nftSalesTemplate.address)
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
      await didRegistry.registerAttribute(didSeed, checksum, [], url, sender.getId())
      const did = await didRegistry.hashDID(didSeed, sender.getId())

      const txHash = await nftSalesTemplate.createAgreement(
        agreementIdSeed,
        didZeroX(did),
        conditionIdSeeds,
        timeLocks,
        timeOuts,
        [receiver.getId()],
        sender,
      )
      const tx = await nevermined.client.public.waitForTransactionReceipt({
        hash: txHash.transactionHash,
      })
      assert.equal(tx.status, 'success')

      const logs = nftSalesTemplate.getTransactionLogs(tx, 'AgreementCreated')
      assert.isTrue(logs.length > 0)
      const e = nftSalesTemplate.someLog(logs)
      const _agreementId = e.args['_agreementId']
      const _did = e.args['_did']
      // logs.some((log) => {
      //   // @ts-expect-error "viem, wtf?"
      //   assert.equal(log.args['_agreementId'], zeroX(agreementId))
      //   // @ts-expect-error "viem, wtf?"
      //   assert.equal(log.args['_did'], didZeroX(did))
      // })
      // nftSalesTemplate.decodeLog(tx.logs)
      // const event = tx.logs[0]
      // event.
      // const _agreementId = event.args['_agreementId']
      //assert.isTrue(contractReceipt.logs.some((e: EventLog) => e.eventName === 'AgreementCreated'))

      // const event: EventLog = contractReceipt.logs.find(
      //   (e: EventLog) => e.eventName === 'AgreementCreated',
      // ) as EventLog
      // const { _agreementId, _did } = event.args
      assert.equal(_agreementId, zeroX(agreementId))
      assert.equal(_did, didZeroX(did))

      const storedAgreement = await agreementStoreManager.getAgreement(agreementId)
      assert.deepEqual(storedAgreement.conditionIds, conditionIds)

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
