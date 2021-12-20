import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Account, ConditionState, Nevermined, utils } from '../../../src'
import { NFTLockCondition } from '../../../src/keeper/contracts/conditions'
import { NFTUpgradeable } from '../../../src/keeper/contracts/conditions/NFTs/NFTUpgradable'
import DIDRegistry from '../../../src/keeper/contracts/DIDRegistry'
import { ConditionStoreManager } from '../../../src/keeper/contracts/managers'
import { didZeroX, zeroX } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

chai.use(chaiAsPromised)

describe('NFTLockCondition', () => {
    let nevermined: Nevermined
    let nftLockCondition: NFTLockCondition
    let conditionStoreManager: ConditionStoreManager
    let didRegistry: DIDRegistry
    let nftUpgradeable: NFTUpgradeable
    let rewardAddress: Account
    let owner: Account

    let agreementId: string
    let checksum: string
    let didSeed: string
    const activityId = utils.generateId()
    const value = 'https://nevermined.io/did/nevermined/test-attr-example.txt'
    const amount = 10

    before(async () => {
        await TestContractHandler.prepareContracts()
        nevermined = await Nevermined.getInstance(config)
        ;({ nftLockCondition } = nevermined.keeper.conditions)
        ;({ conditionStoreManager, didRegistry, nftUpgradeable } = nevermined.keeper)
        ;[owner, rewardAddress] = await nevermined.accounts.list()
    })

    beforeEach(async () => {
        agreementId = utils.generateId()
        checksum = utils.generateId()
        didSeed = `did:nv:${utils.generateId()}`
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const did = await didRegistry.hashDID(didSeed, rewardAddress.getId())
            const hash = await nftLockCondition.hashValues(
                did,
                rewardAddress.getId(),
                amount
            )

            assert.match(hash, /^0x[a-f0-9]{64}$/i)
        })
    })

    describe('#generateId()', () => {
        it('should generate an ID', async () => {
            const did = await didRegistry.hashDID(didSeed, rewardAddress.getId())
            const hash = await nftLockCondition.hashValues(
                did,
                rewardAddress.getId(),
                amount
            )
            const id = await nftLockCondition.generateId(agreementId, hash)

            assert.match(id, /^0x[a-f0-9]{64}$/i)
        })
    })

    describe('fulfill correctly', () => {
        it('should fulfill if conditions exist for account address', async () => {
            // register DID
            await didRegistry.registerMintableDID(
                didSeed,
                checksum,
                [],
                value,
                activityId,
                '',
                amount,
                0,
                false,
                owner.getId()
            )
            const did = await didRegistry.hashDID(didSeed, owner.getId())
            await didRegistry.mint(did, amount, owner.getId())

            await nftUpgradeable.setApprovalForAll(
                nftLockCondition.getAddress(),
                true,
                owner
            )

            const hashValues = await nftLockCondition.hashValues(
                did,
                rewardAddress.getId(),
                amount
            )
            const conditionId = await nftLockCondition.generateId(agreementId, hashValues)

            await conditionStoreManager.createCondition(
                conditionId,
                nftLockCondition.address,
                owner
            )

            const result = await nftLockCondition.fulfill(
                agreementId,
                did,
                rewardAddress.getId(),
                amount
            )
            const { state } = await conditionStoreManager.getCondition(conditionId)
            assert.equal(state, ConditionState.Fulfilled)
            const nftBalance = await nftUpgradeable.balance(rewardAddress.getId(), did)
            assert.equal(nftBalance, amount)

            const {
                _agreementId,
                _did,
                _lockAddress,
                _conditionId,
                _amount
            } = result.events.Fulfilled.returnValues

            assert.equal(_agreementId, zeroX(agreementId))
            assert.equal(_did, didZeroX(did))
            assert.equal(_conditionId, conditionId)
            assert.equal(_lockAddress, rewardAddress.getId())
            assert.equal(Number(_amount), amount)
        })
    })

    describe('trying to fulfill but is invalid', () => {
        it('should not fulfill if conditions do not exist', async () => {
            // register DID
            await didRegistry.registerMintableDID(
                didSeed,
                checksum,
                [],
                value,
                activityId,
                '',
                amount,
                0,
                false,
                owner.getId()
            )
            const did = await didRegistry.hashDID(didSeed, owner.getId())
            await didRegistry.mint(did, amount, owner.getId())
            await nftUpgradeable.setApprovalForAll(
                nftLockCondition.getAddress(),
                true,
                owner
            )

            await assert.isRejected(
                nftLockCondition.fulfill(agreementId, did, rewardAddress.getId(), amount),
                /Invalid UpdateRole/
            )
        })

        it('out of balance should fail to fulfill', async () => {
            // register DID
            await didRegistry.registerMintableDID(
                didSeed,
                checksum,
                [],
                value,
                activityId,
                '',
                amount,
                0,
                false,
                owner.getId()
            )
            const did = await didRegistry.hashDID(didSeed, owner.getId())
            await didRegistry.mint(did, amount, owner.getId())
            await nftUpgradeable.setApprovalForAll(
                nftLockCondition.getAddress(),
                true,
                owner
            )

            const hashValues = await nftLockCondition.hashValues(
                did,
                rewardAddress.getId(),
                amount
            )
            const conditionId = await nftLockCondition.generateId(agreementId, hashValues)

            await conditionStoreManager.createCondition(
                conditionId,
                nftLockCondition.address,
                owner
            )

            await assert.isRejected(
                nftLockCondition.fulfill(
                    agreementId,
                    did,
                    rewardAddress.getId(),
                    amount + 1
                ),
                /insufficient balance/
            )
        })

        it('right transfer should fail to fulfill if conditions already fulfilled', async () => {
            // register DID
            await didRegistry.registerMintableDID(
                didSeed,
                checksum,
                [],
                value,
                activityId,
                '',
                amount,
                0,
                false,
                owner.getId()
            )
            const did = await didRegistry.hashDID(didSeed, owner.getId())
            await didRegistry.mint(did, amount, owner.getId())
            await nftUpgradeable.setApprovalForAll(
                nftLockCondition.getAddress(),
                true,
                owner
            )

            const hashValues = await nftLockCondition.hashValues(
                did,
                rewardAddress.getId(),
                amount
            )
            const conditionId = await nftLockCondition.generateId(agreementId, hashValues)

            await conditionStoreManager.createCondition(
                conditionId,
                nftLockCondition.address,
                owner
            )

            await nftLockCondition.fulfill(
                agreementId,
                did,
                rewardAddress.getId(),
                amount
            )
            let { state } = await conditionStoreManager.getCondition(conditionId)
            assert.equal(state, ConditionState.Fulfilled)

            await assert.isRejected(
                nftLockCondition.fulfill(agreementId, did, rewardAddress.getId(), amount),
                undefined
            )
            ;({ state } = await conditionStoreManager.getCondition(conditionId))
            assert.equal(state, ConditionState.Fulfilled)
        })
    })
})
