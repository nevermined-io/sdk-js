import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Account, ConditionState, Nevermined, utils } from '../../../src'
import { NFTHolderCondition } from '../../../src/keeper/contracts/conditions'
import DIDRegistry from '../../../src/keeper/contracts/DIDRegistry'
import { ConditionStoreManager } from '../../../src/keeper/contracts/managers'
import { didZeroX, zeroX } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

chai.use(chaiAsPromised)

describe('NFTHolderCondition', () => {
    let nftHolderCondition: NFTHolderCondition
    let conditionStoreManager: ConditionStoreManager
    let didRegistry: DIDRegistry
    let holder: Account
    let owner: Account

    let agreementId: string
    let checksum: string
    let didSeed: string
    const activityId = utils.generateId()
    const value = 'https://nevermined.io/did/nevermined/test-attr-example.txt'
    const amount = 10

    before(async () => {
        await TestContractHandler.prepareContracts()
        const nevermined = await Nevermined.getInstance(config)
        ;({ nftHolderCondition } = nevermined.keeper.conditions)
        ;({ conditionStoreManager, didRegistry } = nevermined.keeper)
        ;[owner, holder] = await nevermined.accounts.list()

        await conditionStoreManager.delegateCreateRole(owner.getId(), owner.getId())
    })

    beforeEach(async () => {
        agreementId = utils.generateId()
        checksum = utils.generateId()
        didSeed = `did:nv:${utils.generateId()}`
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const did = await didRegistry.hashDID(didSeed, holder.getId())
            const hash = await nftHolderCondition.hashValues(did, holder.getId(), amount)

            assert.match(hash, /^0x[a-f0-9]{64}$/i)
        })
    })

    describe('#generateId()', () => {
        it('should generate an ID', async () => {
            const did = await didRegistry.hashDID(didSeed, holder.getId())
            const hash = await nftHolderCondition.hashValues(did, holder.getId(), amount)
            const id = await nftHolderCondition.generateId(agreementId, hash)

            assert.match(id, /^0x[a-f0-9]{64}$/i)
        })
    })

    describe('fulfill existing condition', () => {
        it('should fulfill if conditions exist for account address', async () => {
            const did = await didRegistry.hashDID(didSeed, owner.getId())
            const hashValues = await nftHolderCondition.hashValues(
                did,
                holder.getId(),
                amount
            )
            const conditionId = await nftHolderCondition.generateId(
                agreementId,
                hashValues
            )

            await conditionStoreManager.createCondition(
                conditionId,
                nftHolderCondition.getAddress(),
                owner.getId()
            )

            await didRegistry.registerMintableDID(
                didSeed,
                checksum,
                [],
                value,
                activityId,
                '',
                100,
                0,
                owner.getId()
            )
            await didRegistry.mint(did, 10, owner.getId())
            await didRegistry.transferNft(did, holder.getId(), 10, owner.getId())

            const result = await nftHolderCondition.fulfill(
                agreementId,
                did,
                holder.getId(),
                amount
            )
            const { state } = await conditionStoreManager.getCondition(conditionId)
            assert.equal(state, ConditionState.Fulfilled)

            const {
                _agreementId,
                _did,
                _address,
                _conditionId,
                _amount
            } = result.events.Fulfilled.returnValues
            assert.equal(_agreementId, zeroX(agreementId))
            assert.equal(_did, didZeroX(did))
            assert.equal(_address, holder.getId())
            assert.equal(_conditionId, conditionId)
            assert.equal(Number(_amount), amount)
        })
    })

    describe('fulfill non existing condition', () => {
        it('should not fulfill if conditions do not exist', async () => {
            await didRegistry.registerMintableDID(
                didSeed,
                checksum,
                [],
                value,
                activityId,
                '',
                100,
                0,
                owner.getId()
            )
            const did = await didRegistry.hashDID(didSeed, owner.getId())
            await didRegistry.mint(did, 10, owner.getId())
            await didRegistry.transferNft(did, holder.getId(), 10, owner.getId())

            await assert.isRejected(
                nftHolderCondition.fulfill(agreementId, did, holder.getId(), amount),
                /Invalid UpdateRole/
            )
        })
    })

    describe('fail to fulfill existing condition', () => {
        it('out of balance should fail to fulfill if conditions exist', async () => {
            const did = await didRegistry.hashDID(didSeed, owner.getId())
            const hashValues = await nftHolderCondition.hashValues(
                did,
                holder.getId(),
                amount
            )
            const conditionId = await nftHolderCondition.generateId(
                agreementId,
                hashValues
            )

            await conditionStoreManager.createCondition(
                conditionId,
                nftHolderCondition.getAddress(),
                owner.getId()
            )

            await didRegistry.registerMintableDID(
                didSeed,
                checksum,
                [],
                value,
                activityId,
                '',
                100,
                0,
                owner.getId()
            )
            await didRegistry.mint(did, 10, owner.getId())
            await didRegistry.transferNft(did, holder.getId(), 1, owner.getId())

            await assert.isRejected(
                nftHolderCondition.fulfill(agreementId, did, holder.getId(), amount),
                /The holder doesnt have enough NFT balance for the did given/
            )
        })
    })
})
