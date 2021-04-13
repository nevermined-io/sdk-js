import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Account, ConditionState, Nevermined, utils } from '../../../src'
import { TransferDIDOwnershipCondition } from '../../../src/keeper/contracts/conditions'
import DIDRegistry from '../../../src/keeper/contracts/DIDRegistry'

import { ConditionStoreManager } from '../../../src/keeper/contracts/managers/ConditionStoreManager'
import { didZeroX, zeroX } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

chai.use(chaiAsPromised)

describe('TransferDIDOwnershipCondition', () => {
    let transferDidOwnershipCondition: TransferDIDOwnershipCondition
    let conditionStoreManager: ConditionStoreManager
    let didRegistry: DIDRegistry
    let receiver: Account
    let owner: Account

    let agreementId: string
    let checksum: string
    let did: string
    const value = 'https://nevermined.io/did/nevermined/test-attr-example.txt'

    before(async () => {
        await TestContractHandler.prepareContracts()
        const nevermined = await Nevermined.getInstance(config)
        ;({ transferDidOwnershipCondition } = nevermined.keeper.conditions)
        ;({ conditionStoreManager, didRegistry } = nevermined.keeper)
        ;[owner, receiver] = await nevermined.accounts.list()
    })

    beforeEach(async () => {
        agreementId = utils.generateId()
        checksum = utils.generateId()
        did = `did:nv:${utils.generateId()}`
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const hash = await transferDidOwnershipCondition.hashValues(
                did,
                receiver.getId()
            )

            assert.match(hash, /^0x[a-f0-9]{64}$/i)
        })

        describe('#generateId()', () => {
            it('should generate an ID', async () => {
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
            await assert.isRejected(
                transferDidOwnershipCondition.fulfill(
                    agreementId,
                    did,
                    receiver.getId(),
                    receiver.getId()
                ),
                /Only DID Owner allowed/
            )
        })

        it('should not fulfill if condition does not exist', async () => {
            await assert.isRejected(
                transferDidOwnershipCondition.fulfill(agreementId, did, receiver.getId()),
                /Only DID Owner allowed/
            )
        })
    })

    describe('fulfill existing condition', () => {
        it('should fulfill if condition exist', async () => {
            await didRegistry.registerAttribute(did, checksum, [], value, owner.getId())

            const hashValues = await transferDidOwnershipCondition.hashValues(
                did,
                receiver.getId()
            )
            const conditionId = await transferDidOwnershipCondition.generateId(
                agreementId,
                hashValues
            )

            await conditionStoreManager.createCondition(
                conditionId,
                transferDidOwnershipCondition.address,
                owner.getId()
            )

            await assert.isRejected(
                transferDidOwnershipCondition.fulfill(
                    agreementId,
                    did,
                    receiver.getId(),
                    receiver.getId()
                ),
                'Only DID Owner allowed'
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
