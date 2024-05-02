import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import TestContractHandler from '../TestContractHandler'
import { Nevermined } from '../../../src/nevermined/Nevermined'
import { NFT721AccessTemplate } from '../../../src/keeper/contracts/templates'
import {
  AgreementStoreManager,
  ConditionStoreManager,
  TemplateStoreManager,
} from '../../../src/keeper/contracts/managers'
import { DIDRegistry } from '../../../src/keeper/contracts/DIDRegistry'
import { NvmAccount } from '../../../src/models/NvmAccount'
import { generateId } from '../../../src/common/helpers'
import { didZeroX, zeroX } from '../../../src/utils/ConversionTypeHelpers'
import { Log } from 'viem'
import { ConditionState } from '../../../src/types/ContractTypes'

chai.use(chaiAsPromised)

describe('NFT721AccessTemplate', () => {
  let nevermined: Nevermined
  let nft721AccessTemplate: NFT721AccessTemplate
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
    ;({ nft721AccessTemplate } = nevermined.keeper.templates)
    ;({ templateStoreManager, didRegistry, conditionStoreManager, agreementStoreManager } =
      nevermined.keeper)
    ;[sender, receiver] = nevermined.accounts.list()
    timeLocks = [0, 0]
    timeOuts = [0, 0]

    await conditionStoreManager.delegateCreateRole(agreementStoreManager.address, deployer)
  })

  beforeEach(async () => {
    agreementIdSeed = zeroX(generateId())
    agreementId = await agreementStoreManager.agreementId(agreementIdSeed, sender.getId())
    conditionIdSeeds = [zeroX(generateId()), zeroX(generateId())]
    conditionIds = [
      await nevermined.keeper.conditions.nft721HolderCondition.generateId(
        agreementId,
        conditionIdSeeds[0],
      ),
      await nevermined.keeper.conditions.nftAccessCondition.generateId(
        agreementId,
        conditionIdSeeds[1],
      ),
    ]
    didSeed = `did:nv:${generateId()}`
    checksum = generateId()
  })

  describe('create agreement', () => {
    it('should fail if template is not approve', async () => {
      const did = await didRegistry.hashDID(didSeed, sender.getId())
      await assert.isRejected(
        nft721AccessTemplate.createAgreement(
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
      await templateStoreManager.proposeTemplate(nft721AccessTemplate.address, deployer)
      await templateStoreManager.approveTemplate(nft721AccessTemplate.address, deployer)
      const did = await didRegistry.hashDID(didSeed, sender.getId())

      await assert.isRejected(
        nft721AccessTemplate.createAgreement(
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

      const txReceipt = await nft721AccessTemplate.createAgreement(
        agreementIdSeed,
        didZeroX(did),
        conditionIdSeeds,
        timeLocks,
        timeOuts,
        [receiver.getId()],
        sender,
      )

      const logs = nft721AccessTemplate.getTransactionLogs(txReceipt, 'AgreementCreated')
      assert.isTrue(logs.length > 0)
      const event: Log = logs[0]

      // @ts-ignore
      const { _agreementId, _did } = event.args
      assert.equal(_agreementId, zeroX(agreementId))
      assert.equal(_did, didZeroX(did))

      const storedAgreement = await agreementStoreManager.getAgreement(agreementId)
      assert.deepEqual(storedAgreement.conditionIdSeeds, conditionIdSeeds)

      const conditionTypes = await nft721AccessTemplate.getConditionTypes()
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
