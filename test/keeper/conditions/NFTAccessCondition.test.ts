import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Nevermined } from '../../../src/nevermined/Nevermined'
import { Account, ConditionState, utils } from '../../../src'
import { NFTAccessCondition } from '../../../src/keeper/contracts/conditions'
import DIDRegistry from '../../../src/keeper/contracts/DIDRegistry'
import {
    AgreementStoreManager,
    ConditionStoreManager,
    TemplateStoreManager
} from '../../../src/keeper/contracts/managers'
import { didZeroX, zeroX } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'

chai.use(chaiAsPromised)

describe('NFTAccessCondition', () => {
    let nevermined: Nevermined
    let nftAccessCondition: NFTAccessCondition
    let conditionStoreManager: ConditionStoreManager
    let agreementStoreManager: AgreementStoreManager
    let templateStoreManager: TemplateStoreManager
    let didRegistry: DIDRegistry
    let grantee: Account
    let owner: Account
    let templateId: Account
    let other: Account

    let agreementId: string
    let agreementIdSeed: string
    let checksum: string
    let didSeed: string
    const url = 'https://nevermined.io/did/nevermined/test-attr-example.txt'

    before(async () => {
        await TestContractHandler.prepareContracts()
        nevermined = await Nevermined.getInstance(config)
        ;({ nftAccessCondition } = nevermined.keeper.conditions)
        ;({
            conditionStoreManager,
            didRegistry,
            agreementStoreManager,
            templateStoreManager
        } = nevermined.keeper)
        ;[owner, grantee, templateId, other] = await nevermined.accounts.list()

        await conditionStoreManager.delegateCreateRole(
            agreementStoreManager.getAddress(),
            owner.getId()
        )

        await templateStoreManager.proposeTemplate(templateId.getId())
        await templateStoreManager.approveTemplate(templateId.getId())
    })

    beforeEach(async () => {
        agreementIdSeed = utils.generateId()
        agreementId = await agreementStoreManager.agreementId(agreementIdSeed, owner.getId())

        checksum = utils.generateId()
        didSeed = `did:nv:${utils.generateId()}`
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

            await assert.isRejected(
                nftAccessCondition.fulfill(agreementId, did, grantee.getId()),
                'Invalid DID owner/provider'
            )
        })
    })

    describe('fulfill existing condition', () => {
        it('should fulfill if condition exist', async () => {
            await didRegistry.registerAttribute(didSeed, checksum, [], url, owner.getId())
            const did = await didRegistry.hashDID(didSeed, owner.getId())

            const hashValues = await nftAccessCondition.hashValues(did, grantee.getId())
            const conditionId = await nftAccessCondition.generateId(
                agreementId,
                hashValues
            )

            await agreementStoreManager.createAgreement(
                agreementId,
                did,
                [nftAccessCondition.getAddress()],
                [hashValues],
                [0],
                [2],
                templateId
            )

            const result = await nftAccessCondition.fulfill(
                agreementId,
                did,
                grantee.getId()
            )

            const { state } = await conditionStoreManager.getCondition(conditionId)
            assert.equal(state, ConditionState.Fulfilled)

            const {
                _agreementId,
                _documentId,
                _grantee,
                _conditionId
            } = result.events.Fulfilled.returnValues

            assert.equal(_agreementId, zeroX(agreementId))
            assert.equal(_documentId, didZeroX(did))
            assert.equal(_conditionId, conditionId)
            assert.equal(_grantee, grantee.getId())
        })
    })

    describe('fail to fulfill existing condition', () => {
        it('wrong did owner should fail to fulfill if conditions exist', async () => {
            await didRegistry.registerAttribute(didSeed, checksum, [], url, owner.getId())
            const did = await didRegistry.hashDID(didSeed, owner.getId())

            const hashValues = await nftAccessCondition.hashValues(did, grantee.getId())
            const conditionId = await nftAccessCondition.generateId(
                agreementId,
                hashValues
            )

            await agreementStoreManager.createAgreement(
                agreementId,
                did,
                [nftAccessCondition.getAddress()],
                [hashValues],
                [0],
                [2],
                templateId
            )

            await assert.isRejected(
                nftAccessCondition.fulfill(agreementId, did, grantee.getId(), other),
                /Invalid DID owner\/provider/
            )
        })

        it('right did owner should fail to fulfill if conditions already fulfilled', async () => {
            await didRegistry.registerAttribute(didSeed, checksum, [], url, owner.getId())
            const did = await didRegistry.hashDID(didSeed, owner.getId())

            const hashValues = await nftAccessCondition.hashValues(did, grantee.getId())
            const conditionId = await nftAccessCondition.generateId(
                agreementId,
                hashValues
            )

            await agreementStoreManager.createAgreement(
                agreementId,
                did,
                [nftAccessCondition.getAddress()],
                [hashValues],
                [0],
                [2],
                templateId
            )

            await nftAccessCondition.fulfill(agreementId, did, grantee.getId())
            await assert.isRejected(
                nftAccessCondition.fulfill(agreementId, did, grantee.getId()),
                /Invalid state transition/
            )
        })
    })
})
