import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Account, ConditionState, DDO, Nevermined, utils } from '../../../src'
import { NFT721LockCondition } from '../../../src/keeper/contracts/conditions'
import DIDRegistry from '../../../src/keeper/contracts/DIDRegistry'
import { ConditionStoreManager } from '../../../src/keeper/contracts/managers'
import { didZeroX, zeroX } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'
import ERC721 from '../../../src/artifacts/ERC721.json'
import { Contract } from 'web3-eth-contract'
import AssetRewards from '../../../src/models/AssetRewards'
import { Nft721 } from '../../../src'
import { getMetadata } from '../../../integration/utils'

chai.use(chaiAsPromised)

describe('NFT721LockCondition', () => {
    let nevermined: Nevermined
    let nft721LockCondition: NFT721LockCondition
    let conditionStoreManager: ConditionStoreManager
    let didRegistry: DIDRegistry
    // let token: Token
    let nftContractAddress: string
    let _nftContract: Contract
    let nft721Wrapper: Nft721
    let lockAddress: Account
    let owner: Account
    let ddo: DDO
    let did: string

    let agreementId: string
    let checksum: string
    let didSeed: string
    const url = 'https://nevermined.io/did/nevermined/test-attr-example.txt'
    const amount = 10

    before(async () => {
        await TestContractHandler.prepareContracts()
        nevermined = await Nevermined.getInstance(config)
        ;({ nft721LockCondition } = nevermined.keeper.conditions)
        ;({ conditionStoreManager, didRegistry } = nevermined.keeper)
        ;[owner, lockAddress] = await nevermined.accounts.list()
        _nftContract = await TestContractHandler.deployArtifact(ERC721)
        nft721Wrapper = await nevermined.contracts.loadNft721(
            _nftContract.options.address
        )
        nftContractAddress = nft721Wrapper.address

        checksum = utils.generateId()
        didSeed = `did:nv:${utils.generateId()}`
        ddo = await nevermined.nfts.create721(
            getMetadata(),
            owner,
            new AssetRewards(),
            nft721Wrapper.address
        )
        assert.isDefined(ddo)

        await didRegistry.registerAttribute(didSeed, checksum, [], url, owner.getId())
        await nft721Wrapper.mint(zeroX(ddo.shortId()), owner)
        did = await didRegistry.hashDID(didSeed, owner.getId())
        await nft721Wrapper.setApprovalForAll(
            nft721LockCondition.getAddress(),
            true,
            owner
        )
    })

    beforeEach(async () => {
        agreementId = utils.generateId()
    })

    describe('#hashValues()', () => {
        it('should hash the values and generate an ID', async () => {
            const _did = await didRegistry.hashDID(didSeed, lockAddress.getId())
            const hash = await nft721LockCondition.hashValues(
                _did,
                lockAddress.getId(),
                amount,
                nftContractAddress
            )
            assert.match(hash, /^0x[a-f0-9]{64}$/i)

            const id = await nft721LockCondition.generateId(agreementId, hash)
            assert.match(id, /^0x[a-f0-9]{64}$/i)
        })
    })

    describe('fulfill correctly', () => {
        it('should fulfill if conditions exist for account address', async () => {
            const hashValues = await nft721LockCondition.hashValues(
                did,
                lockAddress.getId(),
                1,
                nftContractAddress
            )
            const conditionId = await nft721LockCondition.generateId(
                agreementId,
                hashValues
            )
            await conditionStoreManager.createCondition(
                conditionId,
                nft721LockCondition.address,
                owner
            )

            const result = await nft721LockCondition.fulfill(
                agreementId,
                did,
                lockAddress.getId(),
                1,
                nftContractAddress
            )
            const { state } = await conditionStoreManager.getCondition(conditionId)
            assert.equal(state, ConditionState.Fulfilled)
            const nftBalance = await nft721Wrapper.balanceOf(lockAddress)
            assert.equal(nftBalance, 1)

            const {
                _agreementId,
                _did,
                _lockAddress,
                _conditionId,
                _amount,
                _nftContractAddress
            } = result.events.Fulfilled.returnValues

            assert.equal(_agreementId, zeroX(agreementId))
            assert.equal(_did, didZeroX(did))
            assert.equal(_conditionId, conditionId)
            assert.equal(_lockAddress, lockAddress.getId())
            assert.equal(Number(_amount), amount)
            assert.equal(_nftContractAddress, nftContractAddress)
        })
    })

    describe('trying to fulfill but is invalid', () => {
        it('should not fulfill if conditions do not exist', async () => {
            await nft721LockCondition.hashValues(
                did,
                lockAddress.getId(),
                1,
                nftContractAddress
            )
            // await nft721LockCondition.generateId(agreementId, hashValues)
            await assert.isRejected(
                nft721LockCondition.fulfill(
                    agreementId,
                    did,
                    lockAddress.getId(),
                    1,
                    nftContractAddress
                ),
                /Invalid UpdateRole/
            )
        })

        it('out of balance should fail to fulfill', async () => {
            const hashValues = await nft721LockCondition.hashValues(
                did,
                lockAddress.getId(),
                amount + 1,
                nftContractAddress
            )
            const conditionId = await nft721LockCondition.generateId(
                agreementId,
                hashValues
            )
            await conditionStoreManager.createCondition(
                conditionId,
                nft721LockCondition.address,
                owner
            )

            await assert.isRejected(
                nft721LockCondition.fulfill(
                    agreementId,
                    did,
                    lockAddress.getId(),
                    amount + 1,
                    nftContractAddress
                ),
                /insufficient balance/
            )
        })

        it('correct transfer should fail to fulfill if conditions already fulfilled', async () => {
            const hashValues = await nft721LockCondition.hashValues(
                did,
                lockAddress.getId(),
                amount + 1,
                nftContractAddress
            )
            const conditionId = await nft721LockCondition.generateId(
                agreementId,
                hashValues
            )
            await conditionStoreManager.createCondition(
                conditionId,
                nft721LockCondition.address,
                owner
            )

            await nft721LockCondition.fulfill(
                agreementId,
                did,
                lockAddress.getId(),
                amount,
                nftContractAddress
            )
            let { state } = await conditionStoreManager.getCondition(conditionId)
            assert.equal(state, ConditionState.Fulfilled)

            await assert.isRejected(
                nft721LockCondition.fulfill(
                    agreementId,
                    did,
                    lockAddress.getId(),
                    amount,
                    nftContractAddress
                ),
                undefined
            )
            ;({ state } = await conditionStoreManager.getCondition(conditionId))
            assert.equal(state, ConditionState.Fulfilled)
        })
    })
})
