import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ContractReceipt, Event } from 'ethers'
import { Account, ConditionState, Nevermined } from '../../../src'
import {
  DIDRegistry,
  AgreementStoreManager,
  ConditionStoreManager,
  TemplateStoreManager,
  NFT721SalesTemplate,
} from '../../../src/keeper'
import { didZeroX, zeroX, generateId } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

chai.use(chaiAsPromised)

describe('NFT721SalesTemplate', () => {
  let nevermined: Nevermined
  let nft721SalesTemplate: NFT721SalesTemplate
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
  let sender: Account
  let receiver: Account
  let didSeed: string
  let checksum: string
  const url = 'https://nevermined.io/did/nevermined/test-attr-example.txt'

  before(async () => {
    await TestContractHandler.prepareContracts()
    nevermined = await Nevermined.getInstance(config)
    ;({ nft721SalesTemplate } = nevermined.keeper.templates)
    ;({ templateStoreManager, didRegistry, conditionStoreManager, agreementStoreManager } =
      nevermined.keeper)
    ;[sender, receiver] = await nevermined.accounts.list()
    timeLocks = [0, 0, 0]
    timeOuts = [0, 0, 0]

    await conditionStoreManager.delegateCreateRole(
      agreementStoreManager.getAddress(),
      sender.getId(),
    )
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
      await nevermined.keeper.conditions.transferNft721Condition.generateId(
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
        nft721SalesTemplate.createAgreement(
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
      await templateStoreManager.proposeTemplate(nft721SalesTemplate.getAddress())
      await templateStoreManager.approveTemplate(nft721SalesTemplate.getAddress())
      const did = await didRegistry.hashDID(didSeed, sender.getId())

      await assert.isRejected(
        nft721SalesTemplate.createAgreement(
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

      const contractReceipt: ContractReceipt = await nft721SalesTemplate.createAgreement(
        agreementIdSeed,
        didZeroX(did),
        conditionIdSeeds,
        timeLocks,
        timeOuts,
        [receiver.getId()],
        sender,
      )
      assert.equal(contractReceipt.status, 1)
      assert.isTrue(contractReceipt.events.some((e) => e.event === 'AgreementCreated'))

      const event: Event = contractReceipt.events.find((e) => e.event === 'AgreementCreated')
      const { _agreementId, _did } = event.args
      assert.equal(_agreementId, zeroX(agreementId))
      assert.equal(_did, didZeroX(did))

      const storedAgreement = await agreementStoreManager.getAgreement(agreementId)
      assert.deepEqual(storedAgreement.conditionIds, conditionIds)

      const conditionTypes = await nft721SalesTemplate.getConditionTypes()
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
