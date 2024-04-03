import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import TestContractHandler from '../TestContractHandler'
import { Nevermined } from '@/nevermined/Nevermined'
import { NFTAccessCondition } from '@/keeper/contracts/conditions'
import { AgreementStoreManager, ConditionStoreManager, TemplateStoreManager } from '@/keeper/contracts/managers'
import { DIDRegistry } from '@/keeper/contracts/DIDRegistry'
import { NvmAccount } from '@/models/NvmAccount'
import { generateId } from '@/common/helpers'
import { ConditionState } from '@/types/ContractTypes'

chai.use(chaiAsPromised)

describe('NFTAccessCondition', () => {
  let nevermined: Nevermined
  let nftAccessCondition: NFTAccessCondition
  let conditionStoreManager: ConditionStoreManager
  let agreementStoreManager: AgreementStoreManager
  let templateStoreManager: TemplateStoreManager
  let didRegistry: DIDRegistry
  let grantee: NvmAccount
  let owner: NvmAccount
  let templateId: NvmAccount
  let other: NvmAccount
  let deployer: NvmAccount

  let agreementId: string
  let agreementIdSeed: string
  let checksum: string
  let didSeed: string
  const url = 'https://nevermined.io/did/nevermined/test-attr-example.txt'

  before(async () => {
    const prepare = await TestContractHandler.prepareContracts()
    nevermined = prepare.nevermined
    deployer = prepare.deployerAccount

    ;({ nftAccessCondition } = nevermined.keeper.conditions)
    ;({ conditionStoreManager, didRegistry, agreementStoreManager, templateStoreManager } =
      nevermined.keeper)
    ;[owner, grantee, templateId, other] = await nevermined.accounts.list()

    await conditionStoreManager.delegateCreateRole(agreementStoreManager.address, owner)

    try {
      await templateStoreManager.proposeTemplate(templateId.getId(), deployer)
      await templateStoreManager.approveTemplate(templateId.getId(), deployer)
    } catch (error) {
      console.log(`Error proposing template: ${error}`)
    }
    
  })

  beforeEach(async () => {
    agreementIdSeed = generateId()
    agreementId = await agreementStoreManager.agreementId(agreementIdSeed, owner.getId())

    checksum = generateId()
    didSeed = `did:nv:${generateId()}`
  })

  describe('#hashValues()', () => {
    it('should hash the values', async () => {
      const did = await didRegistry.hashDID(didSeed, grantee.getId())
      const hash = await nftAccessCondition.hashValues(did, grantee.getId())

      assert.match(hash, /^0x[a-f0-9]{64}$/i)
    })
  })

  describe('#generateId()', () => {
    it('should generate an ID', async () => {
      const did = await didRegistry.hashDID(didSeed, grantee.getId())
      const hash = await nftAccessCondition.hashValues(did, grantee.getId())
      const id = await nftAccessCondition.generateId(agreementId, hash)

      assert.match(id, /^0x[a-f0-9]{64}$/i)
    })
  })

  describe('fulfill non existing condition', () => {
    it('should not fulfill if condition does not exist', async () => {
      const did = await didRegistry.hashDID(didSeed, grantee.getId())
      console.log(`DID Hash: ${did}`)

      await assert.isRejected(
        nftAccessCondition.fulfill(agreementId, did, grantee.getId(), owner),
        'Invalid DID owner/provider',
      )
    })
  })

  describe('fulfill existing condition', () => {
    it('should fulfill if condition exist', async () => {
      await didRegistry.registerAttribute(didSeed, checksum, [], url, owner)
      const did = await didRegistry.hashDID(didSeed, owner.getId())

      const hashValues = await nftAccessCondition.hashValues(did, grantee.getId())
      const conditionId = await nftAccessCondition.generateId(agreementId, hashValues)

      await agreementStoreManager.createAgreement(
        agreementId,
        did,
        [nftAccessCondition.address],
        [hashValues],
        [0],
        [2],
        grantee,
      )

      const contractReceipt = await nftAccessCondition.fulfill(agreementId, did, grantee.getId(), owner)

      const { state } = await conditionStoreManager.getCondition(conditionId)
      assert.equal(state, ConditionState.Fulfilled)
      const logs = nftAccessCondition.getTransactionLogs(contractReceipt, 'Fulfilled')
      // const event: EventLog = logs.find(
      //   (e) => e.eventName === 'Fulfilled',
      // ) as EventLog

      assert.isTrue(logs.length > 0)
      const event = logs.pop()
      console.log(JSON.stringify(event))
      // const { _agreementId, _documentId, _grantee, _conditionId } = event.args

      // assert.equal(_agreementId, zeroX(agreementId))
      // assert.equal(_documentId, didZeroX(did))
      // assert.equal(_conditionId, conditionId)
      // assert.equal(_grantee, grantee.getId())
    })
  })

  describe('fail to fulfill existing condition', () => {
    it('wrong did owner should fail to fulfill if conditions exist', async () => {
      await didRegistry.registerAttribute(didSeed, checksum, [], url, owner)
      const did = await didRegistry.hashDID(didSeed, owner.getId())

      const hashValues = await nftAccessCondition.hashValues(did, grantee.getId())
      await nftAccessCondition.generateId(agreementId, hashValues)

      await agreementStoreManager.createAgreement(
        agreementId,
        did,
        [nftAccessCondition.address],
        [hashValues],
        [0],
        [2],
        templateId,
      )

      await assert.isRejected(
        nftAccessCondition.fulfill(agreementId, did, grantee.getId(), other),
        /Invalid DID owner\/provider/,
      )
    })

    it('right did owner should fail to fulfill if conditions already fulfilled', async () => {
      await didRegistry.registerAttribute(didSeed, checksum, [], url, owner)
      const did = await didRegistry.hashDID(didSeed, owner.getId())

      const hashValues = await nftAccessCondition.hashValues(did, grantee.getId())
      await nftAccessCondition.generateId(agreementId, hashValues)

      await agreementStoreManager.createAgreement(
        agreementId,
        did,
        [nftAccessCondition.address],
        [hashValues],
        [0],
        [2],
        templateId,
      )

      await nftAccessCondition.fulfill(agreementId, did, grantee.getId(), owner)
      await assert.isRejected(
        nftAccessCondition.fulfill(agreementId, did, grantee.getId(), owner),
        /Invalid state transition/,
      )
    })
  })
})
