import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import {Account, ConditionState, DDO, Nevermined, Nft721, utils} from '../../../src'
import {
    EscrowPaymentCondition,
    LockPaymentCondition,
    DistributeNFTCollateralCondition
} from '../../../src/keeper/contracts/conditions'
import DIDRegistry from '../../../src/keeper/contracts/DIDRegistry'
import { ConditionStoreManager } from '../../../src/keeper/contracts/managers'
import Token from '../../../src/keeper/contracts/Token'
import { didZeroX, ZeroAddress, zeroX } from '../../../src/utils'
import config from '../../config'
import TestContractHandler from '../TestContractHandler'
import {getMetadata} from "../../../integration/utils";
import AssetRewards from "../../../src/models/AssetRewards";
import {Contract} from "web3-eth-contract";
import {AaveCreditTemplate} from "../../../src/keeper/contracts/templates";

chai.use(chaiAsPromised)

describe('DistributeNFTCollateralCondition', () => {
    let nevermined: Nevermined
    let distributeNft721CollateralCondition: DistributeNFTCollateralCondition
    let conditionStoreManager: ConditionStoreManager
    let aaveCreditTemplate: AaveCreditTemplate
    let didRegistry: DIDRegistry
    let token: Token
    let nft721Contract: Nft721
    let _nftContract: Contract
    let ddo: DDO

    let nftReceiver: Account
    let owner: Account
    let lender: Account
    let borrower: Account

    let agreementId: string
    let checksum: string
    let didSeed: string
    let did: string
    let nftContractAddress: string
    let receivers: string[]

    const activityId = utils.generateId()
    const url = 'https://nevermined.io/did/nevermined/test-attr-example.txt'
    const nftAmount = 2
    const amounts = [10]

    before(async () => {
        await TestContractHandler.prepareContracts()
        nevermined = await Nevermined.getInstance(config)
        ;({ distributeNft721CollateralCondition } = nevermined.keeper.conditions)
        ;({ conditionStoreManager, didRegistry, token } = nevermined.keeper)
        ;({ aaveCreditTemplate } = nevermined.keeper.templates)
        ;[borrower, lender, nftReceiver] = await nevermined.accounts.list()
        receivers = [nftReceiver.getId()]

        checksum = utils.generateId()
        didSeed = `did:nv:${utils.generateId()}`

        ;_nftContract = await TestContractHandler.deployArtifact(ERC721)
        ;nft721Contract = await nevermined.contracts.loadNft721(_nftContract.options.address)
        ;nftContractAddress = nft721Contract.address

        await conditionStoreManager.delegateCreateRole(owner.getId(), owner.getId())

        // Create a NFT/DDO
        ddo = await nevermined.nfts.create721(
            getMetadata(),
            owner,
            new AssetRewards(),
            nft721Contract.address
        )
        assert.isDefined(ddo)
        await didRegistry.registerAttribute(didSeed, checksum, [], url, owner.getId())
        await nft721Contract.mint(zeroX(ddo.shortId()), owner)
        did = await didRegistry.hashDID(didSeed, owner.getId())

        // Create an Aave credit vault
        const result = await aaveCreditTemplate.deployVault(
            lendingPoolAddress,
            dataProviderAddress,
            wethAddress,
            agreementFee,
            treasuryAddress,
            borrower,
            lender,
            { from: lender }
        )
        const eventArgs = testUtils.getEventArgsFromTx(result, 'VaultCreated')
        vaultAddress = eventArgs._vaultAddress


        // Create a repay condition

    })

    beforeEach(async () => {
        agreementId = utils.generateId()
    })

    describe('#hashValues()', () => {
        it('should hash the values', async () => {
            const conditionId = utils.generateId()
            const did = await didRegistry.hashDID(didSeed, nftReceiver.getId())
            const hash = await distributeNftCondition.hashValues(
                did,
                owner.getId(),
                nftReceiver.getId(),
                nftAmount,
                zeroX(conditionId)
            )

            assert.match(hash, /^0x[a-f0-9]{64}$/i)
        })
    })

    describe('#generateId()', () => {
        it('should generate an ID', async () => {
            const conditionId = utils.generateId()
            const did = await didRegistry.hashDID(didSeed, nftReceiver.getId())
            const hash = await distributeNftCondition.hashValues(
                did,
                owner.getId(),
                nftReceiver.getId(),
                nftAmount,
                zeroX(conditionId)
            )
            const id = await distributeNftCondition.generateId(agreementId, hash)

            assert.match(id, /^0x[a-f0-9]{64}$/i)
        })
    })

    describe('fulfill correctly', () => {
        it('should fulfill if condition exist', async () => {
            const did = await didRegistry.hashDID(didSeed, owner.getId())
            const hashValuesPayment = await lockPaymentCondition.hashValues(
                did,
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                amounts,
                receivers
            )

            const conditionIdPayment = await lockPaymentCondition.generateId(
                agreementId,
                hashValuesPayment
            )

            await conditionStoreManager.createCondition(
                conditionIdPayment,
                lockPaymentCondition.address,
                owner
            )

            await didRegistry.registerMintableDID(
                didSeed,
                checksum,
                [],
                value,
                activityId,
                '',
                nftAmount,
                0,
                true, // Minting during registration
                owner.getId()
            )
            // await didRegistry.mint(did, nftAmount, owner.getId())

            await nftReceiver.requestTokens(10)
            await nevermined.keeper.token.approve(
                lockPaymentCondition.getAddress(),
                10,
                nftReceiver
            )

            await lockPaymentCondition.fulfill(
                agreementId,
                did,
                escrowPaymentCondition.address,
                token.getAddress(),
                amounts,
                receivers,
                nftReceiver
            )

            let { state } = await conditionStoreManager.getCondition(conditionIdPayment)
            assert.equal(state, ConditionState.Fulfilled)

            const hashValues = await distributeNftCondition.hashValues(
                did,
                owner.getId(),
                nftReceiver.getId(),
                nftAmount,
                conditionIdPayment
            )
            const conditionId = await distributeNftCondition.generateId(
                agreementId,
                hashValues
            )

            await conditionStoreManager.createCondition(
                conditionId,
                distributeNftCondition.address,
                owner
            )

            const result = await distributeNftCondition.fulfill(
                agreementId,
                did,
                nftReceiver.getId(),
                nftAmount,
                conditionIdPayment
            )
            ;({ state } = await conditionStoreManager.getCondition(conditionId))
            assert.equal(state, ConditionState.Fulfilled)

            const {
                _agreementId,
                _did,
                _receiver,
                _conditionId,
                _amount
            } = result.events.Fulfilled.returnValues

            assert.equal(_agreementId, zeroX(agreementId))
            assert.equal(_did, didZeroX(did))
            assert.equal(_conditionId, conditionId)
            assert.equal(_receiver, nftReceiver.getId())
            assert.equal(Number(_amount), nftAmount)
        })
    })

    describe('fulfill correctly with ether', () => {
        it('should fulfill if condition exist', async () => {
            const did = await didRegistry.hashDID(didSeed, owner.getId())
            const hashValuesPayment = await lockPaymentCondition.hashValues(
                did,
                escrowPaymentCondition.getAddress(),
                ZeroAddress,
                amounts,
                receivers
            )
            const conditionIdPayment = await lockPaymentCondition.generateId(
                agreementId,
                hashValuesPayment
            )

            await conditionStoreManager.createCondition(
                conditionIdPayment,
                lockPaymentCondition.address,
                owner
            )

            await didRegistry.registerMintableDID(
                didSeed,
                checksum,
                [],
                value,
                activityId,
                '',
                nftAmount,
                0,
                false,
                owner.getId()
            )
            await didRegistry.mint(did, nftAmount, owner.getId())

            await lockPaymentCondition.fulfill(
                agreementId,
                did,
                escrowPaymentCondition.address,
                ZeroAddress,
                amounts,
                receivers,
                nftReceiver,
                { value: String(amounts[0]) }
            )

            let { state } = await conditionStoreManager.getCondition(conditionIdPayment)
            assert.equal(state, ConditionState.Fulfilled)

            const hashValues = await distributeNftCondition.hashValues(
                did,
                owner.getId(),
                nftReceiver.getId(),
                nftAmount,
                conditionIdPayment
            )

            const conditionId = await distributeNftCondition.generateId(
                agreementId,
                hashValues
            )

            await conditionStoreManager.createCondition(
                conditionId,
                distributeNftCondition.address,
                owner
            )

            const result = await distributeNftCondition.fulfill(
                agreementId,
                did,
                nftReceiver.getId(),
                nftAmount,
                conditionIdPayment
            )
            ;({ state } = await conditionStoreManager.getCondition(conditionId))
            assert.equal(state, ConditionState.Fulfilled)

            const {
                _agreementId,
                _did,
                _receiver,
                _conditionId,
                _amount
            } = result.events.Fulfilled.returnValues

            assert.equal(_agreementId, zeroX(agreementId))
            assert.equal(_did, didZeroX(did))
            assert.equal(_conditionId, conditionId)
            assert.equal(_receiver, nftReceiver.getId())
            assert.equal(Number(_amount), nftAmount)
        })
    })

    describe('trying to fulfill invalid conditions', () => {
        it('should not fulfill if condition does not exist or account is invalid', async () => {
            const did = await didRegistry.hashDID(didSeed, owner.getId())
            const hashValuesPayment = await lockPaymentCondition.hashValues(
                did,
                lockPaymentCondition.address,
                token.getAddress(),
                amounts,
                receivers
            )
            const conditionIdPayment = await lockPaymentCondition.generateId(
                agreementId,
                hashValuesPayment
            )

            await conditionStoreManager.createCondition(
                conditionIdPayment,
                lockPaymentCondition.address,
                owner
            )

            await didRegistry.registerMintableDID(
                didSeed,
                checksum,
                [],
                value,
                activityId,
                '',
                nftAmount,
                0,
                false,
                owner.getId()
            )
            await didRegistry.mint(did, nftAmount, owner.getId())

            await nftReceiver.requestTokens(10)
            await nevermined.keeper.token.approve(
                lockPaymentCondition.getAddress(),
                10,
                nftReceiver
            )

            await lockPaymentCondition.fulfill(
                agreementId,
                did,
                lockPaymentCondition.address,
                token.getAddress(),
                amounts,
                receivers,
                nftReceiver
            )
            const { state } = await conditionStoreManager.getCondition(conditionIdPayment)
            assert.equal(state, ConditionState.Fulfilled)

            const hashValues = await distributeNftCondition.hashValues(
                did,
                owner.getId(),
                nftReceiver.getId(),
                nftAmount,
                conditionIdPayment
            )
            const conditionId = await distributeNftCondition.generateId(
                agreementId,
                hashValues
            )

            await conditionStoreManager.createCondition(
                conditionId,
                distributeNftCondition.address,
                owner
            )

            // Invalid user executing the fulfill
            await assert.isRejected(
                distributeNftCondition.fulfill(
                    agreementId,
                    did,
                    nftReceiver.getId(),
                    nftAmount,
                    conditionIdPayment,
                    other
                )
            )

            // Invalid reward address
            await assert.isRejected(
                distributeNftCondition.fulfill(
                    agreementId,
                    did,
                    other.getId(),
                    nftAmount,
                    conditionIdPayment
                )
            )

            // Invalid conditionId
            const invalidConditionId = zeroX(utils.generateId())
            await assert.isRejected(
                distributeNftCondition.fulfill(
                    agreementId,
                    did,
                    nftReceiver.getId(),
                    nftAmount,
                    invalidConditionId
                )
            )

            // Invalid agreementID
            const invalidAgreementId = zeroX(utils.generateId())
            await assert.isRejected(
                distributeNftCondition.fulfill(
                    invalidAgreementId,
                    did,
                    nftReceiver.getId(),
                    nftAmount,
                    conditionIdPayment
                )
            )
        })
    })
})
