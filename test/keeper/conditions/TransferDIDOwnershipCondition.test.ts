import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Account, ConditionState, Nevermined, utils } from '../../../src'
import { TransferDIDOwnershipCondition } from '../../../src/keeper/contracts/conditions'
import DIDRegistry from '../../../src/keeper/contracts/DIDRegistry'
import {
    AgreementStoreManager,
    TemplateStoreManager
} from '../../../src/keeper/contracts/managers'

import { ConditionStoreManager } from '../../../src/keeper/contracts/managers/ConditionStoreManager'
import { didZeroX, zeroX } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

chai.use(chaiAsPromised)

describe('TransferDIDOwnershipCondition', () => {
    let transferDidOwnershipCondition: TransferDIDOwnershipCondition
    let conditionStoreManager: ConditionStoreManager
    let templateStoreManager: TemplateStoreManager
    let agreementStoreManager: AgreementStoreManager
    let didRegistry: DIDRegistry
    let receiver: Account
    let owner: Account
    let templateId: Account

    let agreementId: string
    let checksum: string
    let didSeed: string
    const value = 'https://nevermined.io/did/nevermined/test-attr-example.txt'

    before(async () => {
        await TestContractHandler.prepareContracts()
        const nevermined = await Nevermined.getInstance(config)
        ;({ transferDidOwnershipCondition } = nevermined.keeper.conditions)
        ;({
            conditionStoreManager,
            didRegistry,
            templateStoreManager,
            agreementStoreManager
        } = nevermined.keeper)
        ;[owner, receiver, templateId] = await nevermined.accounts.list()

        await conditionStoreManager.delegateCreateRole(
            agreementStoreManager.getAddress(),
            owner.getId()
        )

        try {
            await templateStoreManager.proposeTemplate(templateId.getId())
            await templateStoreManager.approveTemplate(templateId.getId())
        } catch (err) {
            if (!err.toString().includes('Template already exist')) {
                throw err
            }
        }

        await didRegistry.setManager(
            transferDidOwnershipCondition.getAddress(),
            owner.getId()
        )
    })

    beforeEach(async () => {
        agreementId = utils.generateId()
        checksum = utils.generateId()
        didSeed = `did:nv:${utils.generateId()}`
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const did = await didRegistry.hashDID(didSeed, receiver.getId())
            const hash = await transferDidOwnershipCondition.hashValues(
                did,
                receiver.getId()
            )

            assert.match(hash, /^0x[a-f0-9]{64}$/i)
        })

        describe('#generateId()', () => {
            it('should generate an ID', async () => {
                const did = await didRegistry.hashDID(didSeed, receiver.getId())
                const hash = await transferDidOwnershipCondition.hashValues(
                    did,
                    receiver.getId()
                )
                const id = await transferDidOwnershipCondition.generateId(
                    agreementId,
                    hash
                )

                assert.match(id, /^0x[a-f0-9]{64}$/i)
            })
        })
    })

    describe('trying to fulfill invalid conditions', () => {
        it('should not fulfill if condition does not exist', async () => {
            const did = await didRegistry.hashDID(didSeed, receiver.getId())
            await assert.isRejected(
                transferDidOwnershipCondition.fulfill(
                    agreementId,
                    did,
                    receiver.getId(),
                    receiver.getId()
                ),
                /Only owner/
            )
        })
    })

    describe('fulfill existing condition', () => {
        it('should fulfill if condition exist', async () => {
            await didRegistry.registerAttribute(
                didSeed,
                checksum,
                [],
                value,
                owner.getId()
            )
            const did = await didRegistry.hashDID(didSeed, owner.getId())

            const hashValues = await transferDidOwnershipCondition.hashValues(
                did,
                receiver.getId()
            )
            const conditionId = await transferDidOwnershipCondition.generateId(
                agreementId,
                hashValues
            )

            await agreementStoreManager.createAgreement(
                agreementId,
                did,
                [transferDidOwnershipCondition.getAddress()],
                [conditionId],
                [0],
                [2],
                templateId.getId()
            )

            await assert.isRejected(
                transferDidOwnershipCondition.fulfill(
                    agreementId,
                    did,
                    receiver.getId(),
                    receiver.getId()
                ),
                'Only owner'
            )

            const storedDIDRegister: any = await didRegistry.getDIDRegister(did)
            assert.equal(storedDIDRegister.owner, owner.getId())

            const result = await transferDidOwnershipCondition.fulfill(
                agreementId,
                did,
                receiver.getId(),
                owner.getId()
            )

            const { state } = await conditionStoreManager.getCondition(conditionId)
            assert.equal(state, ConditionState.Fulfilled)

            const {
                _agreementId,
                _conditionId,
                _did,
                _receiver
            } = result.events.Fulfilled.returnValues

            assert.equal(_agreementId, zeroX(agreementId))
            assert.equal(_conditionId, conditionId)
            assert.equal(_did, didZeroX(did))
            assert.equal(_receiver, receiver.getId())
        })
    })
})
