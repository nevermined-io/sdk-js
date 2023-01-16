import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Nevermined } from '../../../src/nevermined'
import { Account, ConditionState } from '../../../src'
import { NFT721LockCondition, ConditionStoreManager } from '../../../src/keeper'
import { didZeroX, zeroX, generateId } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'
import { NFT721Api } from '../../../src'
import { DIDRegistry } from '../../../src/keeper'
import { Contract, ContractReceipt, Event } from 'ethers'
import { BigNumber } from '../../../src/utils'

chai.use(chaiAsPromised)

describe('NFT721LockCondition', () => {
    let nevermined: Nevermined
    let nft721LockCondition: NFT721LockCondition
    let conditionStoreManager: ConditionStoreManager
    let didRegistry: DIDRegistry
    let nftContractAddress: string
    let _nftContract: Contract
    let nft721Wrapper: NFT721Api
    let lockAddress: Account
    let owner: Account
    let did: string
    let didSeed: string

    let agreementId: string
    const amount = 10

    before(async () => {
        await TestContractHandler.prepareContracts()
        nevermined = await Nevermined.getInstance(config)
        ;({ nft721LockCondition } = nevermined.keeper.conditions)
        ;({ conditionStoreManager, didRegistry } = nevermined.keeper)
        ;[owner, lockAddress] = await nevermined.accounts.list()

        const networkName = (await nevermined.keeper.getNetworkName()).toLowerCase()

        const erc721ABI = await TestContractHandler.getABI(
            'NFT721Upgradeable',
            config.artifactsFolder,
            networkName
        )

        _nftContract = await TestContractHandler.deployArtifact(
            erc721ABI, 
            owner.getId(),
            [ owner.getId(), didRegistry.address, 'NFT721', 'NVM', '', 0 ]
        )
        nft721Wrapper = await nevermined.contracts.loadNft721(_nftContract.address)
        nftContractAddress = nft721Wrapper.address
        await nft721Wrapper.nftContract.grantOperatorRole(nft721LockCondition.address)
    })

    beforeEach(async () => {
        agreementId = generateId()
        didSeed = `did:nv:${generateId()}`
        did = await didRegistry.hashDID(didSeed, owner.getId())

        await nft721Wrapper.mint(didZeroX(did), owner)
        await nft721Wrapper.setApprovalForAll(
            nft721LockCondition.getAddress(),
            true,
            owner
        )
    })

    describe('#hashValues()', () => {
        it('should hash the values and generate an ID', async () => {
            const hash = await nft721LockCondition.hashValues(
                did,
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
            const contractReceipt: ContractReceipt = await nft721LockCondition.fulfill(
                agreementId,
                did,
                lockAddress.getId(),
                1,
                nftContractAddress,
                owner
            )
            const { state } = await conditionStoreManager.getCondition(conditionId)
            assert.equal(state, ConditionState.Fulfilled)
            const nftBalance = await nft721Wrapper.balanceOf(lockAddress)
            assert.deepEqual(nftBalance, BigNumber.from(1))

            const event: Event = contractReceipt.events.find(e => e.event === 'Fulfilled')
            const {
                _agreementId,
                _did,
                _lockAddress,
                _conditionId,
                _amount,
                _nftContractAddress
            } = event.args

            assert.equal(_agreementId, zeroX(agreementId))
            assert.equal(_did, didZeroX(did))
            assert.equal(_conditionId, conditionId)
            assert.equal(_lockAddress, lockAddress.getId())
            assert.equal(Number(_amount), 1)
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
            await assert.isRejected(
                nft721LockCondition.fulfill(
                    agreementId,
                    did,
                    lockAddress.getId(),
                    1,
                    nftContractAddress
                ),
                /Condition doesnt exist/
            )
        })

        it('correct transfer should fail to fulfill if conditions already fulfilled', async () => {
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

            await nft721LockCondition.fulfill(
                agreementId,
                did,
                lockAddress.getId(),
                1,
                nftContractAddress
            )
            let { state } = await conditionStoreManager.getCondition(conditionId)
            assert.equal(state, ConditionState.Fulfilled)

            await assert.isRejected(
                nft721LockCondition.fulfill(
                    agreementId,
                    did,
                    lockAddress.getId(),
                    1,
                    nftContractAddress
                ),
                undefined
            )
            ;({ state } = await conditionStoreManager.getCondition(conditionId))
            assert.equal(state, ConditionState.Fulfilled)
        })
    })
})
