import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Nevermined } from '../../../src/nevermined/Nevermined'
import { Account, utils, ConditionState } from '../../../src'
import DIDRegistry from '../../../src/keeper/contracts/DIDRegistry'
import {
    AgreementStoreManager,
    ConditionStoreManager,
    TemplateStoreManager
} from '../../../src/keeper/contracts/managers'
import { NFTSalesTemplate } from '../../../src/keeper/contracts/templates'
import { didZeroX, zeroX } from '../../../src/utils'
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
        ;({ nftSalesTemplate } = nevermined.keeper.templates)
        ;({
            templateStoreManager,
            didRegistry,
            conditionStoreManager,
            agreementStoreManager
        } = nevermined.keeper)
        ;[sender, receiver] = await nevermined.accounts.list()
        timeLocks = [0, 0, 0]
        timeOuts = [0, 0, 0]

        await conditionStoreManager.delegateCreateRole(
            agreementStoreManager.getAddress(),
            sender.getId()
        )
    })

    beforeEach(async () => {
        agreementId = zeroX(utils.generateId())
        conditionIds = [
            zeroX(utils.generateId()),
            zeroX(utils.generateId()),
            zeroX(utils.generateId())
        ]
        didSeed = `did:nv:${utils.generateId()}`
        checksum = utils.generateId()
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
                    receiver.getId(),
                    sender
                ),
                /Template not Approved/
            )
        })

        it('should fail if DID is not registered', async () => {
            // propose and approve template
            await templateStoreManager.proposeTemplate(nftSalesTemplate.getAddress())
            await templateStoreManager.approveTemplate(nftSalesTemplate.getAddress())
            const did = await didRegistry.hashDID(didSeed, sender.getId())

            await assert.isRejected(
                nftSalesTemplate.createAgreement(
                    agreementId,
                    didZeroX(did),
                    conditionIds,
                    timeLocks,
                    timeOuts,
                    receiver.getId(),
                    sender
                ),
                /DID not registered/
            )
        })

        it('should create agreement', async () => {
            await didRegistry.registerAttribute(
                didSeed,
                checksum,
                [],
                url,
                sender.getId()
            )
            const did = await didRegistry.hashDID(didSeed, sender.getId())

            const agreement = await nftSalesTemplate.createAgreement(
                agreementId,
                didZeroX(did),
                conditionIds,
                timeLocks,
                timeOuts,
                receiver.getId(),
                sender
            )
            assert.isTrue(agreement.status)
            assert.nestedProperty(agreement, 'events.AgreementCreated')

            const {
                _agreementId,
                _did,
                _accessProvider,
                _accessConsumer
            } = agreement.events.AgreementCreated.returnValues
            assert.equal(_agreementId, zeroX(agreementId))
            assert.equal(_did, didZeroX(did))
            assert.equal(_accessProvider, sender.getId())
            assert.equal(_accessConsumer, receiver.getId())

            const storedAgreementData = await nftSalesTemplate.getAgreementData(
                agreementId
            )
            assert.equal(storedAgreementData.accessConsumer, receiver.getId())
            assert.equal(storedAgreementData.accessProvider, sender.getId())

            const storedAgreement = await agreementStoreManager.getAgreement(agreementId)
            assert.deepEqual(storedAgreement.conditionIds, conditionIds)
            assert.deepEqual(storedAgreement.lastUpdatedBy, nftSalesTemplate.getAddress())

            const conditionTypes = await nftSalesTemplate.getConditionTypes()
            conditionIds.forEach(async (conditionId, i) => {
                const storedCondition = await conditionStoreManager.getCondition(
                    conditionId
                )
                assert.equal(storedCondition.typeRef, conditionTypes[i])
                assert.equal(storedCondition.state, ConditionState.Unfulfilled)
                assert.equal(storedCondition.timeLock, timeLocks[i])
                assert.equal(storedCondition.timeOut, timeOuts[i])
            })
        })
    })
})
