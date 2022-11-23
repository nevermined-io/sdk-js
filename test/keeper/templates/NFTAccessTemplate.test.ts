import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ContractReceipt, Event } from 'ethers'
import { Nevermined, Account, utils, ConditionState } from '../../../src'
import DIDRegistry from '../../../src/keeper/contracts/DIDRegistry'
import {
    AgreementStoreManager,
    ConditionStoreManager,
    TemplateStoreManager
} from '../../../src/keeper/contracts/managers'
import { NFTAccessTemplate } from '../../../src/keeper/contracts/templates'
import { didZeroX, zeroX } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

chai.use(chaiAsPromised)

describe('NFTAccessTemplate', () => {
    let nevermined: Nevermined
    let nftAccessTemplate: NFTAccessTemplate
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
        ;({ nftAccessTemplate } = nevermined.keeper.templates)
        ;({
            templateStoreManager,
            didRegistry,
            conditionStoreManager,
            agreementStoreManager
        } = nevermined.keeper)
        ;[sender, receiver] = await nevermined.accounts.list()
        timeLocks = [0, 0]
        timeOuts = [0, 0]

        await conditionStoreManager.delegateCreateRole(
            agreementStoreManager.getAddress(),
            sender.getId()
        )
    })

    beforeEach(async () => {
        agreementIdSeed = zeroX(utils.generateId())
        agreementId = await agreementStoreManager.agreementId(
            agreementIdSeed,
            sender.getId()
        )
        conditionIdSeeds = [zeroX(utils.generateId()), zeroX(utils.generateId())]
        conditionIds = [
            await nevermined.keeper.conditions.nftHolderCondition.generateId(
                agreementId,
                conditionIdSeeds[0]
            ),
            await nevermined.keeper.conditions.nftAccessCondition.generateId(
                agreementId,
                conditionIdSeeds[1]
            )
        ]
        didSeed = `did:nv:${utils.generateId()}`
        checksum = utils.generateId()
    })

    describe('create agreement', () => {
        it('should fail if template is not approve', async () => {
            const did = await didRegistry.hashDID(didSeed, sender.getId())
            await assert.isRejected(
                nftAccessTemplate.createAgreement(
                    agreementId,
                    didZeroX(did),
                    conditionIds,
                    timeLocks,
                    timeOuts,
                    [receiver.getId()],
                    sender
                ),
                /Template not Approved/
            )
        })

        it('should fail if DID is not registered', async () => {
            // propose and approve template
            await templateStoreManager.proposeTemplate(nftAccessTemplate.getAddress())
            await templateStoreManager.approveTemplate(nftAccessTemplate.getAddress())
            const did = await didRegistry.hashDID(didSeed, sender.getId())

            await assert.isRejected(
                nftAccessTemplate.createAgreement(
                    agreementId,
                    didZeroX(did),
                    conditionIds,
                    timeLocks,
                    timeOuts,
                    [receiver.getId()],
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

            const contractReceipt: ContractReceipt =
                await nftAccessTemplate.createAgreement(
                    agreementIdSeed,
                    didZeroX(did),
                    conditionIdSeeds,
                    timeLocks,
                    timeOuts,
                    [receiver.getId()],
                    sender
                )
            assert.equal(contractReceipt.status, 1)
            assert.isTrue(
                contractReceipt.events.some(e => e.event === 'AgreementCreated')
            )

            const event: Event = contractReceipt.events.find(
                e => e.event === 'AgreementCreated'
            )
            const { _agreementId, _did } = event.args
            assert.equal(_agreementId, zeroX(agreementId))
            assert.equal(_did, didZeroX(did))

            const storedAgreement = await agreementStoreManager.getAgreement(agreementId)
            assert.deepEqual(storedAgreement.conditionIds, conditionIds)

            const conditionTypes = await nftAccessTemplate.getConditionTypes()
            await Promise.all(
                conditionIds.map(async (conditionId, i) => {
                    const storedCondition = await conditionStoreManager.getCondition(
                        conditionId
                    )
                    assert.equal(storedCondition.typeRef, conditionTypes[i])
                    assert.equal(storedCondition.state, ConditionState.Unfulfilled)
                    assert.equal(storedCondition.timeLock, timeLocks[i])
                    assert.equal(storedCondition.timeOut, timeOuts[i])
                })
            )
        })
    })
})
