import BigNumber from "bignumber.js";
import {TransactionReceipt} from 'web3-core'
import {Instantiable, InstantiableConfig} from '../Instantiable.abstract'
import Account from './Account'
import GenericContract from '../keeper/contracts/GenericContract'
import {TxParameters} from '../keeper/contracts/ContractBase'
import AaveConfig from "../models/AaveConfig";
import {ConditionState, Nft721} from "..";
import {AaveCreditTemplate} from "../keeper/contracts/defi/AaveCreditTemplate";
import {generateId, zeroX} from "../utils";
import {AgreementData} from "../keeper/contracts/managers";
import AaveCreditVault from "../keeper/contracts/defi/AaveCreditVault";
import CustomToken from "../keeper/contracts/CustomToken";

export class AaveCredit extends Instantiable {
    template: AaveCreditTemplate
    vaultContract: GenericContract
    aaveConfig: AaveConfig
    serviceType: 'aave-credit'

    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AaveCredit> {
        const aaveCredit = new AaveCredit()
        aaveCredit.setInstanceConfig(config)

        aaveCredit.template = await AaveCreditTemplate.getInstance(config)
        // aaveCredit.vaultContract = await GenericContract.getInstance(config, 'AaveCreditVault')
        aaveCredit.aaveConfig = config.config.aaveConfig

        return aaveCredit
    }

    /**
     * Create new Aave agreement where a borrower puts an NFT asset as collateral
     * and the lender uses their own Token as collateral to allow the borrower to
     * use Aave protocol to borrow some other token (the `delegatedToken`). All of
     * this is facilitated via the credit vault contract and the agreement conditions.
     * All interactions with the Aave protocol have to go through the credit vault.
     *
     * @param {String} did: id of DDO/asset that represent the `nftToken`. This is the NFT token id
     * @param {String} nftTokenContract: nft (ERC721) contract address of token to use as collateral by the borrower
     * @param {Number} nftAmount: the nubmer of nft tokens
     * @param {String} collateralToken:  erc20 token address to use as loan-collateral by the
     *                 lender to enable the borrower to take loan
     * @param {Number} collateralAmount: amount of `collateralToken` to lock in the vault
     * @param {String} delegatedToken: address of erc20 token to be borrowed under this agreement
     * @param {Number} delegatedAmount: amount of `delegatedToken` that well be borrowed
     * @param {Number} interestRateMode: the type of interest rate to use when borrowing from Aave
     * @param {String} borrower: wallet address of borrower
     * @param {String} lender: wallet address of lender
     * @param {Account} from: account/wallet of borrower or lender creating this agreement
     * @param {Number[]} timeLocks: (optional) list of time lock values for each agreement condition
     * @param {Number[]} timeOuts: (optional) list of time out values for each agreement condition
     * @param {TxParameters} txParams: (optional) extra transaction parameters can be included here
     * @returns
     */
    public async create(
        did: string,
        nftTokenContract: string,
        nftAmount: number,
        collateralToken: string,
        collateralAmount: number,
        delegatedToken: string,
        delegatedAmount: number,
        interestRateMode: number,
        borrower: string,
        lender: string,
        from: Account,
        timeLocks?: number[],
        timeOuts?: number[],
        txParams?: TxParameters,
        ) {
        // const { agreements } = this.nevermined
        // const { keeper } = this.nevermined
        const agreementId = zeroX(generateId())
        const ddo = await this.nevermined.assets.resolve(did)
        // const service = ddo.findServiceByType(this.serviceType)
        // const templateName = service.attributes.serviceAgreementTemplate.contractName
        // const template = keeper.getTemplateByName(templateName)
        const [txReceipt, vaultAddress] = await this.template.createAgreementAndDeployVault(
            agreementId, ddo, nftTokenContract, nftAmount, collateralToken, collateralAmount, delegatedToken, delegatedAmount,
            interestRateMode, borrower, lender, timeLocks, timeOuts, txParams, from
        )
        this.logger.log(
            `new Aave credit vault is deployed and a service agreement is created:
             status=${txReceipt.status}, vaultAddress=${vaultAddress}, agreementId=${agreementId}`
        )
    }

    public async lockNft(
        agreementId: string,
        nftContractAddress: string,
        nftAmount: number,
        did?: string,
        vaultAddress?: string,
        from?: Account
    ): Promise<boolean> {
        const agreementData: AgreementData = await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
        if (!vaultAddress) {
            vaultAddress = await this.template.getAgreementVaultAddress(agreementId, from)
        }
        if (!did) {
            did = agreementData.did
        }
        const nft721 = await Nft721.getInstance(this.instanceConfig, nftContractAddress)
        const approvalTxReceipt = await nft721.setApprovalForAll(this.nevermined.keeper.conditions.nft721LockCondition.address, true, from)
        if (!approvalTxReceipt.status) {
            return false
        }
        this.logger.log(`nft lock approved for nft721LockCondition ${this.nevermined.keeper.conditions.nft721LockCondition.address}`)
        const txReceipt: TransactionReceipt = this.nevermined.keeper.conditions.nft721LockCondition.fulfill(
            agreementId, did, vaultAddress, 1, nftContractAddress, from
        )

        const { state: stateNftLock } = await this.nevermined.keeper.conditionStoreManager.getCondition(agreementData.conditionIds[0])
        // assert.strictEqual(stateNftLock, ConditionState.Fulfilled)
        // assert.strictEqual(vaultAddress, await erc721.ownerOf(did))
        return txReceipt.status && stateNftLock === ConditionState.Fulfilled
    }

    public async depositCollateral(
        agreementId: string,
        collateralAsset: string,
        collateralAmount: number,
        delegatedAsset: string,
        delegatedAmount: number,
        interestRateMode: number,
        did?: string,
        vaultAddress?: string,
        from?: Account
    ): Promise<boolean> {
        const agreementData: AgreementData = await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
        if (!vaultAddress) {
            vaultAddress = await this.template.getAgreementVaultAddress(agreementId, from)
        }
        if (!did) {
            did = agreementData.did
        }
        const txReceipt: TransactionReceipt = this.nevermined.keeper.conditions.aaveCollateralDepositCondition.fulfill(
            agreementId, did, vaultAddress,
            collateralAsset, collateralAmount,
            delegatedAsset, delegatedAmount,
            interestRateMode, from,
            {value: collateralAmount.toString()}
        )
        const { state: stateDeposit } = await this.nevermined.keeper.conditionStoreManager.getCondition(agreementData.conditionIds[1])
        if (stateDeposit !== ConditionState.Fulfilled) {
            return false
        }
        this.logger.log(`aaveCollateralDepositCondition fulfilled at conditionId=${agreementData.conditionIds[1]}`)

        // // Vault instance
        // const vaultContract: GenericContract = await GenericContract.getInstance(
        //     this.instanceConfig, 'AaveCreditVault', vaultAddress
        // )
        // // Get the actual delegated amount for the delgatee in this specific asset
        // const actualAmount = await vaultContract.send(
        //     'delegatedAmount',
        //     from.getId(),
        //     [agreementData.didOwner, delegatedAsset, interestRateMode],
        //     {}
        // )
        // // The delegated borrow amount in the vault should be the same that the
        // // Delegegator allowed on deposit
        // assert.strictEqual(actualAmount.toString(), delegatedAmount)
        return true
    }

    public async borrow(
        agreementId: string,
        delegatedAsset: string,
        delegatedAmount: number,
        interestRateMode: number,
        did?: string,
        vaultAddress?: string,
        from?: Account
    ) {
        const agreementData: AgreementData = await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
        if (!vaultAddress) {
            vaultAddress = await this.template.getAgreementVaultAddress(agreementId, from)
        }
        if (!did) {
            did = agreementData.did
        }
        const txReceipt: TransactionReceipt = this.nevermined.keeper.conditions.aaveBorrowCondition.fulfill(
            agreementId, did, vaultAddress,
            delegatedAsset, delegatedAmount,
            interestRateMode, from,
        )
        const { state: stateBorrow } = await this.nevermined.keeper.conditionStoreManager.getCondition(agreementData.conditionIds[2])
        if (stateBorrow !== ConditionState.Fulfilled) {
            return false
        }
        this.logger.log(`aaveBorrowCondition fulfilled at conditionId=${agreementData.conditionIds[2]}`)
        // const after = await dai.balanceOf(borrower)
        // assert.strictEqual(BigNumber(after).minus(BigNumber(before)).toNumber(), BigNumber(delegatedAmount).toNumber())
        return true
    }

    public async repayDebt(
        agreementId: string,
        delegatedAsset: string,
        delegatedAmount: number,
        interestRateMode: number,
        did?: string,
        vaultAddress?: string,
        from?: Account
    ) {
        const agreementData: AgreementData = await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
        if (!vaultAddress) {
            vaultAddress = await this.template.getAgreementVaultAddress(agreementId, from)
        }
        if (!did) {
            did = agreementData.did
        }


        // calculate debt to pay using the vault
        const vaultContract: GenericContract = await GenericContract.getInstance(
            this.instanceConfig, 'AaveCreditVault', vaultAddress
        )

        const totalDebt = await vaultContract.call('getTotalActualDebt', [], from.getId())
        const erc20Token = await  CustomToken.getInstanceByAddress(this.instanceConfig, delegatedAsset)
        const allowanceAmount = Number(totalDebt) + (Number(totalDebt) / 10000 * 10)

        // Verify that the borrower has sufficient balance for the repayment
        const balance: number = await erc20Token.balanceOf(from.getId())
        if (balance < allowanceAmount) {
            this.logger.warn(
                `borrower does not have enough balance to repay the debt: 
                token=${delegatedAsset}, balance=${balance}, totalDebt=${allowanceAmount}`)
            return false
        }
        // Delegatee allows Nevermined contracts spend DAI to repay the loan
        await erc20Token.approve(
            this.nevermined.keeper.conditions.aaveRepayCondition.address, allowanceAmount.toString(), from
        )

        // use the aaveRepayCondition to apply the repayment
        const txReceipt: TransactionReceipt = this.nevermined.keeper.conditions.aaveRepayCondition.fulfill(
            agreementId, did, vaultAddress,
            delegatedAsset, delegatedAmount,
            interestRateMode, from,
        )
        const { state: stateRepay } = await this.nevermined.keeper.conditionStoreManager.getCondition(agreementData.conditionIds[3])
        if (stateRepay !== ConditionState.Fulfilled) {
            return false
        }
        this.logger.log(`aaveRepayCondition fulfilled at conditionId=${agreementData.conditionIds[3]}`)

        const vaultBalancesAfter: number = await vaultContract.call('getActualCreditDebt', [], from.getId())
        // Compare the vault debt after repayment
        this.logger.log(`owned debt after repayment is: ${new BigNumber(vaultBalancesAfter).toString()}`)
        return true
    }

    public async withdrawCollateral(
        agreementId: string,
        collateralAsset: string,
        collateralAmount: number,
        delegatedAsset: string,
        delegatedAmount: number,
        interestRateMode: number,
        did?: string,
        vaultAddress?: string,
        from?: Account
    ) {
        const agreementData: AgreementData = await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
        if (!vaultAddress) {
            vaultAddress = await this.template.getAgreementVaultAddress(agreementId, from)
        }
        if (!did) {
            did = agreementData.did
        }

        // calculate debt to pay using the vault
        const vaultContract: GenericContract = await GenericContract.getInstance(
            this.instanceConfig, 'AaveCreditVault', vaultAddress
        )

        const totalDebt = await vaultContract.call('getTotalActualDebt', [], from.getId())
        const erc20Delegated = await CustomToken.getInstanceByAddress(this.instanceConfig, delegatedAsset)
        const erc20Collateral = await CustomToken.getInstanceByAddress(this.instanceConfig, collateralAsset)

        const delegatedBalanceBefore = await erc20Delegated.balanceOf(from.getId())
        const collateralBalanceBefore = await erc20Collateral.balanceOf(from.getId())
        // use the aaveCollateralWithdrawCondition to withdraw the lender's collateral
        const txReceipt: TransactionReceipt = this.nevermined.keeper.conditions.aaveCollateralWithdrawCondition.fulfill(
            agreementId, did, vaultAddress, collateralAsset, from
        )
        const {state: stateWithdraw} = await this.nevermined.keeper.conditionStoreManager.getCondition(agreementData.conditionIds[4])
        if (stateWithdraw !== ConditionState.Fulfilled) {
            return false
        }
        this.logger.log(`aaveCollateralWithdrawCondition fulfilled at conditionId=${agreementData.conditionIds[4]}`)

        // const delegatedBalanceAfter = await erc20Delegated.balanceOf(from.getId())
        // const collateralBalanceAfter = await erc20Collateral.balanceOf(from.getId())
        // const delegatedFee = (delegatedAmount / 10000) * this.aaveConfig.agreementFee.toNumber()

        return true
    }

    public async unlockNft(
        agreementId: string,
        nftContractAddress: string,
        did?: string,
        vaultAddress?: string,
        from?: Account
    ) {
        const agreementData: AgreementData = await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
        if (!vaultAddress) {
            vaultAddress = await this.template.getAgreementVaultAddress(agreementId, from)
        }
        if (!did) {
            did = agreementData.did
        }

        // calculate debt to pay using the vault
        const vaultContract: GenericContract = await GenericContract.getInstance(
            this.instanceConfig, 'AaveCreditVault', vaultAddress
        )

        // use the distributeNft721CollateralCondition to withdraw the lender's collateral
        const txReceipt: TransactionReceipt = this.nevermined.keeper.conditions.distributeNft721CollateralCondition.fulfill(
            agreementId, did, vaultAddress, nftContractAddress, from
        )
        const {state: stateUnlock} = await this.nevermined.keeper.conditionStoreManager.getCondition(agreementData.conditionIds[5])
        if (stateUnlock !== ConditionState.Fulfilled) {
            return false
        }
        this.logger.log(`distributeNft721CollateralCondition fulfilled at conditionId=${agreementData.conditionIds[5]}`)

        return true
    }
}
