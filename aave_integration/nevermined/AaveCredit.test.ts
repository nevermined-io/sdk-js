import { getMetadata } from '../../integration/utils/index'
import TestContractHandler from '../../test/keeper/TestContractHandler'
import { Account, ConditionState, DDO, utils } from '../../src/index'
import ERC721 from '../../test/resources/artifacts/ERC721.json'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { didZeroX, zeroX } from '../../src/utils/index'
import {
    AgreementStoreManager,
    ConditionStoreManager
} from '../../src/keeper/contracts/managers/index'
import DIDRegistry from '../../src/keeper/contracts/DIDRegistry'
import CustomToken from '../../src/keeper/contracts/CustomToken'
import { AaveCreditTemplate } from '../../src/keeper/contracts/templates/index'
import { NFT721LockCondition } from '../../src/keeper/contracts/defi/NFT721LockCondition'
import { AaveRepayCondition } from '../../src/keeper/contracts/defi/AaveRepayCondition'
import config from '../config'
import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { decodeJwt } from 'jose'
import { Contract } from 'ethers'
import BigNumber from '../../src/utils/BigNumber'
import Nft721Contract from '../../src/keeper/contracts/Nft721Contract'
import { AssetAttributes } from '../../src/models/AssetAttributes'
import { NFTAttributes } from '../../src/models/NFTAttributes'

chai.use(chaiAsPromised)

describe('AaveCredit', () => {
    let nevermined: Nevermined

    let aaveCreditTemplate: AaveCreditTemplate
    let nft721LockCondition: NFT721LockCondition
    let aaveRepayCondition: AaveRepayCondition

    let dai: CustomToken
    let weth: CustomToken
    let agreementId: string
    let conditionIds: string[]
    let vaultAddress: string
    let nftContractAddress: string
    let nftContract: Contract
    let nft721Wrapper: Nft721Contract
    let ddo: DDO
    let did: string
    let isTemplateApproved: boolean

    let didRegistry: DIDRegistry
    let agreementStoreManager: AgreementStoreManager
    let conditionStoreManager: ConditionStoreManager

    let deployer: Account
    let lender: Account // = accounts[1]
    let borrower: Account // = accounts[2]
    let otherAccount: Account // = accounts[7]
    let timeLocks: number[]
    let timeOuts: number[]

    // ### These values come from the config (AaveConfig)
    // const lendingPoolAddress = '0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe' // Kovan
    // const dataProviderAddress = '0x744C1aaA95232EeF8A9994C4E0b3a89659D9AB79' // Kovan
    // const wethAddress = '0xA61ca04DF33B72b235a8A28CfB535bb7A5271B70' // Kovan
    // const wethAddress = '0xd0A1E359811322d97991E03f863a0C30C2cF029C' // Kovan

    const collateralAsset = '0xd0A1E359811322d97991E03f863a0C30C2cF029C' // WETH
    // const strCollateralAmount = '10' + '000000000000000000' // 10 ETH
    const collateralAmount = 10

    const delegatedAsset = '0xff795577d9ac8bd7d90ee22b6c1703490b6512fd' // DAI
    // const strDelegatedAmount = '500' + '000000000000000000' // 500 DAI
    const delegatedAmount = 500
    // daiProvider account holding Dai to allow borrower to pay back the loan
    const daiProvider = '0xAFD49D613467c0DaBf47B8f5C841089d96Cf7167'

    let agreementFee = 0
    const INTEREST_RATE_MODE = 1
    const nftAmount = 1

    before(async () => {
        // startBlock = await web3.eth.getBlockNumber()
        // await TestContractHandler.prepareContracts()

        nevermined = await Nevermined.getInstance(config)
        ;({ agreementFee } = config.aaveConfig)
        ;({ aaveCreditTemplate } = nevermined.keeper.templates)
        ;({ conditionStoreManager, didRegistry, agreementStoreManager } =
            nevermined.keeper)
        ;({ nft721LockCondition, aaveRepayCondition } = nevermined.keeper.conditions)
        ;[deployer, lender, borrower, otherAccount] = await nevermined.accounts.list()
        timeLocks = [0, 0, 0, 0, 0, 0]
        timeOuts = [0, 0, 0, 0, 0, 0]
        // await nevermined.keeper.conditionStoreManager.delegateCreateRole(
        //     nevermined.keeper.agreementStoreManager.getAddress(),
        //     deployer.getId()
        // )

        // agreementId = '0xf2f7338941f5469cb8bbf8b2e600ecb8d53e6755ec5d45658cf1a764e0d40f0e'
        // did = 'did:nv:1af704df5b61eea09af8f327a0453480d5a218f4c4f8a7c6d4145c7b7b52d7b8'
        // const nftAddress: string = '0xb17527F1D07cD919a3290e8faC330319aB92abdC'
        const nftAddress = ''
        // nft721Wrapper is instance of Nft721Contract -> ContractBase
        if (nftAddress.toString() !== '') {
            nft721Wrapper = (await nevermined.contracts.loadNft721(nftAddress)).getContract
        } else {
            nftContract = await TestContractHandler.deployArtifact(
                ERC721,
                deployer.getId()
            )
            nft721Wrapper = (await nevermined.contracts.loadNft721(nftContract.address))
                .getContract
        }
        nftContractAddress = nft721Wrapper.address

        // console.log(`borrower=${borrower.getId()}, nft721=${nft721Wrapper.address}`)
        if (did) {
            ddo = await nevermined.assets.resolve(did)
        } else {
            const [account1] = await nevermined.accounts.list()
            const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
                account1
            )
            await nevermined.services.marketplace.login(clientAssertion)
            const payload = decodeJwt(config.marketplaceAuthToken)
            const metadata = getMetadata()
            metadata.userId = payload.sub

            const assetAttributes = AssetAttributes.getInstance({
                metadata,
                serviceTypes: ['nft-sales', 'nft-access']
            })
            const nftAttributes = NFTAttributes.getNFT721Instance({
                nftContractAddress: nft721Wrapper.address
            })            
            ddo = await nevermined.nfts721.create(
                assetAttributes,
                nftAttributes,
                borrower
            )
        }
        assert.isDefined(ddo)
        did = ddo.id

        const _owner = agreementId ? await nft721Wrapper.ownerOf(did) : null
        if (!_owner) {
            await nft721Wrapper.mint(did, borrower.getId())
        }
        assert.equal(await nft721Wrapper.balanceOf(borrower.getId()), 1 as unknown)

        const _config = {
            nevermined,
            web3: (nevermined as any).web3,
            logger: (nevermined as any).logger,
            config: (nevermined as any).config
        }
        dai = await CustomToken.getInstanceByAddress(_config, delegatedAsset)
        weth = await CustomToken.getInstanceByAddress(_config, collateralAsset)
        isTemplateApproved = await nevermined.keeper.templateStoreManager.isApproved(
            aaveCreditTemplate.getAddress()
        )
    })

    describe('Create a credit NFT collateral agreement', function () {
        this.timeout(100000)
        it('should propose the AaveCreditTemplate', async () => {
            if (!isTemplateApproved) {
                await nevermined.keeper.templateStoreManager.proposeTemplate(
                    aaveCreditTemplate.getAddress(),
                    otherAccount,
                    true
                )
            }
        })

        it('should approve the AaveCreditTemplate', async () => {
            if (!isTemplateApproved) {
                await nevermined.keeper.templateStoreManager.approveTemplate(
                    aaveCreditTemplate.getAddress(),
                    deployer,
                    true
                )
            }
        })

        it('Create a credit agreement', async () => {
            const didRegAddress = await agreementStoreManager.call(
                'getDIDRegistryAddress',
                []
            )
            assert.equal(didRegAddress, didRegistry.address)
            const didBlockNumber = await didRegistry.getBlockNumberUpdated(did)
            // console.log(`didReg: ${didRegAddress}, ${didRegistry.address}, didBlock=${didBlockNumber.toString()}`)
            if (
                didBlockNumber === null ||
                didBlockNumber === undefined ||
                didBlockNumber === 0
            ) {
                throw Error('did is not registered: ' + did)
            }
            // Create agreement
            if (!agreementId) {
                const res = await nevermined.services.aave.create(
                    did,
                    nftContractAddress,
                    nftAmount,
                    collateralAsset,
                    collateralAmount,
                    delegatedAsset,
                    delegatedAmount,
                    INTEREST_RATE_MODE,
                    borrower.getId(),
                    lender.getId(),
                    borrower,
                    timeLocks,
                    timeOuts
                )
                ;({ agreementId } = res)
                conditionIds = res.data.instances.map(a => a.id)
            }

            vaultAddress = await aaveCreditTemplate.getAgreementVaultAddress(
                agreementId,
                borrower.getId()
            )
        })

        it('The borrower locks the NFT', async () => {
            // const ownerOfNft: string = await nft721Wrapper.ownerOf(did)
            // const balance = await nft721Wrapper.balanceOf(borrower.getId())
            // const approvedBefore = await nft721Wrapper.call('getApproved', [didZeroX(did)])
            // console.log(`approvedBefore=${approvedBefore}`)
            // console.log(`vault balance: ${await nft721Wrapper.balanceOf(vaultAddress)}`)
            const _condition = await conditionStoreManager.getCondition(conditionIds[0])
            // console.log(`_stateNftLock=${_condition.state}, condition=${JSON.stringify(_condition)}`)
            if (_condition.state !== ConditionState.Fulfilled) {
                const nftApproveStatus = (
                    await nft721Wrapper.send('approve', borrower.getId(), [
                        nft721LockCondition.address,
                        didZeroX(did)
                    ])
                ).status
                assert.isTrue(nftApproveStatus)
                // console.log(`approve nft status: ${nftApproveStatus}, nft721LockCondition.address=${nft721LockCondition.address}, did=${did}`)
                const approved = await nft721Wrapper.call('getApproved', [didZeroX(did)])
                assert.equal(approved, nft721LockCondition.address)
                // console.log(`nft owner is: ${ownerOfNft}, borrower=${borrower.getId()}, balance=${balance}, approved=${approved}`)

                // const txReceipt = await nft721LockCondition.fulfill(
                //     agreementId, did, vaultAddress, nftAmount, nftContractAddress, borrower
                // )
                // console.log(`lockNft: status=${txReceipt.status}, ${agreementId}, ${vaultAddress}, ${did}, ${nftContractAddress}`)
                await nevermined.services.aave.lockNft(
                    agreementId,
                    nftContractAddress,
                    nftAmount,
                    borrower
                )
                assert.equal(await nft721Wrapper.balanceOf(vaultAddress), 1 as unknown)
                assert.equal(await nft721Wrapper.balanceOf(borrower.getId()), 0 as unknown)
                assert.equal(await nft721Wrapper.ownerOf(did), vaultAddress)
                const { state: stateNftLock } = await conditionStoreManager.getCondition(
                    conditionIds[0]
                )
                assert.strictEqual(stateNftLock, ConditionState.Fulfilled)
            }
        })

        it('A second NFT cant be locked into the Vault', async () => {
            const didSeed = `did:nv:${utils.generateId()}`
            const _did = await didRegistry.hashDID(didSeed, borrower.getId())
            await nft721Wrapper.mint(_did, borrower.getId())
            await nft721Wrapper.send('approve', borrower.getId(), [
                vaultAddress,
                zeroX(_did)
            ])
            await assert.isRejected(
                nft721Wrapper.send('safeTransferFrom', borrower.getId(), [
                    borrower.getId(),
                    vaultAddress,
                    zeroX(_did)
                ]),
                'NFT already locked'
            )
        })

        it('Lender deposits ETH as collateral in Aave and approves borrower to borrow DAI', async () => {
            const { state: _stateDeposit } = await conditionStoreManager.getCondition(
                conditionIds[1]
            )
            // console.log(`depositing collateral: colAmount=${collateralAmount}, delAmount=${delegatedAmount}`)
            if (_stateDeposit !== ConditionState.Fulfilled) {
                // const wethBalance = await weth.balanceOfConverted(lender.getId())
                // const ethBalance = await lender.getEtherBalance()
                // console.log(`lender balance: wethBalance=${wethBalance}, collateralAmount=${collateralAmount}, etherBalance=${ethBalance}`)
                // if (wethBalance < collateralAmount) {
                //      console.warn(`lender weth balance ${wethBalance} is less than the required deposit ${collateralAmount}.`)
                // }
                const success = await nevermined.services.aave.depositCollateral(
                    agreementId,
                    collateralAsset,
                    collateralAmount,
                    delegatedAsset,
                    delegatedAmount,
                    INTEREST_RATE_MODE,
                    lender,
                    true
                )
                assert.isTrue(success)
                const { state: stateDeposit } = await conditionStoreManager.getCondition(
                    conditionIds[1]
                )
                assert.strictEqual(stateDeposit, ConditionState.Fulfilled)
            }
            // Get the actual delegated amount for the delgatee in this specific asset
            const actualAmount = await nevermined.services.aave.delegatedAmount(
                agreementId,
                borrower.getId(),
                delegatedAsset,
                INTEREST_RATE_MODE,
                lender
            )

            // The delegated borrow amount in the vault should be the same that the
            // Delegator allowed on deposit
            assert.strictEqual(actualAmount.toString(), delegatedAmount.toString())
        })

        it('Borrower/Delegatee borrows DAI from Aave on behalf of Delegator', async () => {
            const { state: _stateBorrow } = await conditionStoreManager.getCondition(
                conditionIds[2]
            )
            if (_stateBorrow !== ConditionState.Fulfilled) {
                const before = await dai.balanceOfConverted(borrower.getId())
                // console.log(`dai balance = ${before.toString()}`)
                // Fullfill the aaveBorrowCredit condition
                // Delegatee borrows DAI from Aave on behalf of Delegator
                const success = await nevermined.services.aave.borrow(
                    agreementId,
                    delegatedAsset,
                    delegatedAmount,
                    INTEREST_RATE_MODE,
                    borrower
                )
                assert.isTrue(success)
                const { state: stateCredit } = await conditionStoreManager.getCondition(
                    conditionIds[2]
                )
                assert.strictEqual(stateCredit, ConditionState.Fulfilled)

                const after = await dai.balanceOfConverted(borrower.getId())
                // console.log(`borrower balances: before=${before}, after=${after}, delegatedAmount${delegatedAmount}`)
                assert.isTrue(after.sub(before).eq(delegatedAmount))
            }
        })

        it('Borrower/Delegatee can not get back the NFT without repaying the loan', async () => {
            await assert.isRejected(
                nevermined.services.aave.unlockNft(agreementId, nftContractAddress, borrower)
            )
            const { state: stateTransfer } = await conditionStoreManager.getCondition(
                conditionIds[5]
            )
            assert.strictEqual(stateTransfer, ConditionState.Unfulfilled)
            assert.equal(await nft721Wrapper.balanceOf(vaultAddress), 1 as unknown)
        })

        it('Borrower/Delegatee repays the loan with DAI', async () => {
            const { state: _stateRepay } = await conditionStoreManager.getCondition(
                conditionIds[3]
            )
            if (_stateRepay !== ConditionState.Fulfilled) {
                const totalDebt = await nevermined.services.aave.getTotalActualDebt(
                    agreementId,
                    borrower
                )
                const allowanceAmount = totalDebt + (totalDebt / 10000) * 10

                // Delegatee allows Nevermined contracts spend DAI to repay the loan
                await dai.approve(
                    aaveRepayCondition.address,
                    BigNumber.parseEther(allowanceAmount.toString()),
                    borrower
                )
                // Send some DAI to borrower to pay the debt + fees
                const transferAmount = BigNumber.parseEther(
                    (2 * (allowanceAmount - delegatedAmount)).toString()
                )
                await dai.send('transfer', daiProvider, [
                    borrower.getId(),
                    transferAmount
                ])

                // repayDebt, fullfills the aaveRepayCredit condition
                await nevermined.services.aave.repayDebt(
                    agreementId,
                    delegatedAsset,
                    delegatedAmount,
                    INTEREST_RATE_MODE,
                    borrower
                )
                const { state: stateRepay } = await conditionStoreManager.getCondition(
                    conditionIds[3]
                )
                assert.strictEqual(stateRepay, ConditionState.Fulfilled)

                const vaultBalancesAfter =
                    await nevermined.services.aave.getActualCreditDebt(agreementId, borrower)
                // Compare the vault debt after repayment
                assert.strictEqual(vaultBalancesAfter, 0)
            }
        })

        it('Delegator withdraw collateral and fees', async () => {
            const { state: _stateWithdraw } = await conditionStoreManager.getCondition(
                conditionIds[4]
            )
            if (_stateWithdraw !== ConditionState.Fulfilled) {
                const daiBefore = await dai.balanceOfConverted(lender.getId())
                const ethBalanceBefore = await weth.balanceOfConverted(lender.getId())

                // Fullfill the AaveCollateralWithdraw condition
                const success = await nevermined.services.aave.withdrawCollateral(
                    agreementId,
                    collateralAsset,
                    collateralAmount,
                    delegatedAsset,
                    delegatedAmount,
                    INTEREST_RATE_MODE,
                    lender
                )
                assert.isTrue(success)

                const { state: stateWithdraw } = await conditionStoreManager.getCondition(
                    conditionIds[4]
                )
                assert.strictEqual(stateWithdraw, ConditionState.Fulfilled)

                const daiAfter = await dai.balanceOfConverted(lender.getId())
                const ethBalanceAfter = await weth.balanceOfConverted(lender.getId())
                const daiFee = (delegatedAmount / 10000) * agreementFee

                // Compare the lender fees after withdraw
                assert.strictEqual(daiFee, daiAfter.sub(daiBefore).toNumber())

                assert.isTrue(
                    ethBalanceAfter.sub(ethBalanceBefore).sub(collateralAmount).gt(0)
                )
            }
        })

        it('Borrower/Delegatee paid the credit so will get back the NFT', async () => {
            assert.isTrue(
                await nevermined.services.aave.unlockNft(
                    agreementId,
                    nftContractAddress,
                    borrower
                )
            )

            const { state: stateTransfer } = await conditionStoreManager.getCondition(
                conditionIds[5]
            )
            assert.strictEqual(stateTransfer, ConditionState.Fulfilled)
            assert.equal(await nft721Wrapper.balanceOf(borrower.getId()), 2 as unknown)
            assert.equal(await nft721Wrapper.ownerOf(did), borrower.getId())
        })
    })
})
