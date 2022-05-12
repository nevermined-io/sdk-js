import BigNumber from 'bignumber.js'
import { TransactionReceipt } from 'web3-core'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import Account from './Account'
import GenericContract from '../keeper/contracts/GenericContract'
import { TxParameters } from '../keeper/contracts/ContractBase'
import { AaveConfig } from '../models/AaveConfig'
import { ConditionState } from '../keeper/contracts/conditions/Condition.abstract'
import { Nft721 } from '..'
import { AaveCreditTemplate } from '../keeper/contracts/defi/AaveCreditTemplate'
import { didZeroX, generateId, zeroX } from '../utils'
import { AgreementData } from '../keeper/contracts/managers'
import CustomToken from '../keeper/contracts/CustomToken'
import web3Utils from 'web3-utils'

export class AaveCredit extends Instantiable {
    template: AaveCreditTemplate
    aaveConfig: AaveConfig
    serviceType: 'aave-credit'

    public static async getInstance(config: InstantiableConfig): Promise<AaveCredit> {
        const aaveCredit = new AaveCredit()
        aaveCredit.setInstanceConfig(config)

        aaveCredit.template = await AaveCreditTemplate.getInstance(config)
        aaveCredit.aaveConfig = config.config.aaveConfig
        // console.log(`AaveCredit: aaveConfig=${JSON.stringify(config.config)}`)

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
        txParams?: TxParameters
    ) {
        const agreementIdSeed = zeroX(generateId())
        const ddo = await this.nevermined.assets.resolve(did)
        if (!ddo) {
            throw Error(`Failed to resolve DDO for DID ${did}`)
        }
        const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(
            agreementIdSeed,
            from.getId()
        )

        const [
            txReceipt,
            vaultAddress,
            data
        ] = await this.template.createAgreementAndDeployVault(
            agreementIdSeed,
            ddo,
            nftTokenContract,
            nftAmount,
            collateralToken,
            collateralAmount,
            delegatedToken,
            delegatedAmount,
            interestRateMode,
            borrower,
            lender,
            timeLocks,
            timeOuts,
            txParams,
            from
        )
        this.logger.log(
            `new Aave credit vault is deployed and a service agreement is created:
             status=${txReceipt.status}, vaultAddress=${vaultAddress}, agreementId=${agreementId}`
        )
        return {
            agreementId,
            data
        }
    }

    public async lockNft(
        agreementId: string,
        nftContractAddress: string,
        nftAmount: number,
        from?: Account,
        did?: string,
        vaultAddress?: string
    ): Promise<boolean> {
        const agreementData: AgreementData = await this.nevermined.keeper.agreementStoreManager.getAgreement(
            agreementId
        )
        if (!vaultAddress) {
            vaultAddress = await this.template.getAgreementVaultAddress(
                agreementId,
                from.getId()
            )
        }
        if (!did) {
            did = agreementData.did
        }
        const lockCond = this.nevermined.keeper.conditions.nft721LockCondition
        const nft721 = (await Nft721.getInstance(this.instanceConfig, nftContractAddress))
            .contract
        const approved = await nft721.call('getApproved', [didZeroX(did)])
        if (!approved || approved !== lockCond.address) {
            const approvalTxReceipt = await nft721.send('approve', from.getId(), [
                lockCond.address,
                didZeroX(did)
            ])
            if (!approvalTxReceipt.status) {
                return false
            }
        }
        const txReceipt: TransactionReceipt = await lockCond.fulfill(
            agreementId,
            did,
            vaultAddress,
            nftAmount,
            nftContractAddress,
            from
        )

        const {
            state: stateNftLock
        } = await this.nevermined.keeper.conditionStoreManager.getCondition(
            agreementData.conditionIds[0]
        )
        // console.log(`tx status=${txReceipt.status}, stateNftLock=${stateNftLock}`)
        return txReceipt.status && stateNftLock === ConditionState.Fulfilled
    }

    public async depositCollateral(
        agreementId: string,
        collateralAsset: string,
        collateralAmount: number,
        delegatedAsset: string,
        delegatedAmount: number,
        interestRateMode: number,
        from: Account,
        useWethGateway: boolean=false,
        did?: string,
        vaultAddress?: string
    ): Promise<boolean> {
        const agreementData: AgreementData = await this.nevermined.keeper.agreementStoreManager.getAgreement(
            agreementId
        )
        if (!vaultAddress) {
            vaultAddress = await this.template.getAgreementVaultAddress(
                agreementId,
                from.getId()
            )
        }
        if (!did) {
            did = agreementData.did
        }
        const _collateralAmount = web3Utils.toWei(collateralAmount.toString(), 'ether').toString()
        const _delegatedAmount = web3Utils.toWei(delegatedAmount.toString(), 'ether').toString()
        // console.log(`aaveCollateralDepositCondition.fulfill: ${_collateralAmount}, ${_collateralAmount.toString()}, ${collateralAmount}`)
        const _value = useWethGateway ? _collateralAmount.toString() : '0'
        if (!useWethGateway) {
            this.logger.log(`sending erc20Token.approve for token ${collateralAsset} because we are not using the WethGateway.`)
            const erc20Token = await CustomToken.getInstanceByAddress(
                this.instanceConfig,
                collateralAsset
            )
            await erc20Token.approve(
                this.nevermined.keeper.conditions.aaveCollateralDepositCondition.address,
                new BigNumber(web3Utils.toWei(collateralAmount.toString(), 'ether')),
                from
            )
        }

        const txReceipt: TransactionReceipt = await this.nevermined.keeper.conditions.aaveCollateralDepositCondition.fulfill(
            agreementId,
            did,
            vaultAddress,
            collateralAsset,
            _collateralAmount,
            delegatedAsset,
            _delegatedAmount,
            interestRateMode,
            from,
            { value: _value }
        )
        const {
            state: stateDeposit
        } = await this.nevermined.keeper.conditionStoreManager.getCondition(
            agreementData.conditionIds[1]
        )
        if (stateDeposit !== ConditionState.Fulfilled) {
            return false
        }
        // this.logger.log(`aaveCollateralDepositCondition fulfilled at conditionId=${agreementData.conditionIds[1]}`)

        return txReceipt.status
    }

    public async borrow(
        agreementId: string,
        delegatedAsset: string,
        delegatedAmount: number,
        interestRateMode: number,
        from: Account,
        did?: string,
        vaultAddress?: string
    ): Promise<boolean> {
        const agreementData: AgreementData = await this.nevermined.keeper.agreementStoreManager.getAgreement(
            agreementId
        )
        if (!vaultAddress) {
            vaultAddress = await this.template.getAgreementVaultAddress(
                agreementId,
                from.getId()
            )
        }
        if (!did) {
            did = agreementData.did
        }
        const amount = web3Utils.toWei(delegatedAmount.toString(), 'ether')
        console.log(
            `about to borrow ${delegatedAsset}: amountWei=${amount}, delegatedAmount=${delegatedAmount}`
        )
        const txReceipt: TransactionReceipt = await this.nevermined.keeper.conditions.aaveBorrowCondition.fulfill(
            agreementId,
            did,
            vaultAddress,
            delegatedAsset,
            amount,
            interestRateMode,
            from
        )
        const {
            state: stateBorrow
        } = await this.nevermined.keeper.conditionStoreManager.getCondition(
            agreementData.conditionIds[2]
        )
        if (stateBorrow !== ConditionState.Fulfilled) {
            return false
        }
        // this.logger.log(`aaveBorrowCondition fulfilled at conditionId=${agreementData.conditionIds[2]}`)
        return txReceipt.status
    }

    public async repayDebt(
        agreementId: string,
        delegatedAsset: string,
        delegatedAmount: number,
        interestRateMode: number,
        from?: Account,
        did?: string,
        vaultAddress?: string
    ): Promise<boolean> {
        const agreementData: AgreementData = await this.nevermined.keeper.agreementStoreManager.getAgreement(
            agreementId
        )
        if (!did) {
            did = agreementData.did
        }
        const vaultContract: GenericContract = await this.getVaultContract(
            agreementId,
            from.getId(),
            vaultAddress
        )
        vaultAddress = vaultContract.address

        const erc20Token = await CustomToken.getInstanceByAddress(
            this.instanceConfig,
            delegatedAsset
        )
        const totalDebt = await this.getTotalActualDebt(agreementId, from, vaultAddress)
        const allowanceAmount = totalDebt + (totalDebt / 10000) * 10
        const weiAllowanceAmount = new BigNumber(
            web3Utils.toWei(allowanceAmount.toString(), 'ether')
        )

        // Verify that the borrower has sufficient balance for the repayment
        const weiBalance = await erc20Token.balanceOf(from.getId())
        if (weiBalance.comparedTo(weiAllowanceAmount) === -1) {
            this.logger.warn(
                `borrower does not have enough balance to repay the debt:
                token=${delegatedAsset}, weiBalance=${weiBalance}, totalDebt(wei)=${weiAllowanceAmount}`
            )
            return false
        }
        // Delegatee allows Nevermined contracts spend DAI to repay the loan
        await erc20Token.approve(
            this.nevermined.keeper.conditions.aaveRepayCondition.address,
            weiAllowanceAmount,
            from
        )

        const weiAmount = web3Utils.toWei(delegatedAmount.toString(), 'ether')
        // use the aaveRepayCondition to apply the repayment
        const txReceipt: TransactionReceipt = await this.nevermined.keeper.conditions.aaveRepayCondition.fulfill(
            agreementId,
            did,
            vaultAddress,
            delegatedAsset,
            weiAmount,
            interestRateMode,
            from
        )
        const {
            state: stateRepay
        } = await this.nevermined.keeper.conditionStoreManager.getCondition(
            agreementData.conditionIds[3]
        )
        if (stateRepay !== ConditionState.Fulfilled) {
            return false
        }
        // this.logger.log(`aaveRepayCondition fulfilled at conditionId=${agreementData.conditionIds[3]}`)

        // const vaultBalancesAfter: number = await this.getActualCreditDebt(agreementId, from)
        // Compare the vault debt after repayment
        // this.logger.log(`owned debt after repayment is: ${vaultBalancesAfter.toString()}`)
        return txReceipt.status
    }

    public async withdrawCollateral(
        agreementId: string,
        collateralAsset: string,
        collateralAmount: number,
        delegatedAsset: string,
        delegatedAmount: number,
        interestRateMode: number,
        from?: Account,
        did?: string,
        vaultAddress?: string
    ): Promise<boolean> {
        const agreementData: AgreementData = await this.nevermined.keeper.agreementStoreManager.getAgreement(
            agreementId
        )
        if (!did) {
            did = agreementData.did
        }
        if (!vaultAddress) {
            vaultAddress = (
                await this.getVaultContract(agreementId, from.getId(), vaultAddress)
            ).address
        }

        const txReceipt: TransactionReceipt = await this.nevermined.keeper.conditions.aaveCollateralWithdrawCondition.fulfill(
            agreementId,
            did,
            vaultAddress,
            collateralAsset,
            from
        )
        const {
            state: stateWithdraw
        } = await this.nevermined.keeper.conditionStoreManager.getCondition(
            agreementData.conditionIds[4]
        )
        if (stateWithdraw !== ConditionState.Fulfilled) {
            return false
        }
        // this.logger.log(`aaveCollateralWithdrawCondition fulfilled at conditionId=${agreementData.conditionIds[4]}`)

        return txReceipt.status
    }

    public async unlockNft(
        agreementId: string,
        nftContractAddress: string,
        from?: Account,
        did?: string,
        vaultAddress?: string
    ): Promise<boolean> {
        const agreementData: AgreementData = await this.nevermined.keeper.agreementStoreManager.getAgreement(
            agreementId
        )
        if (!did) {
            did = agreementData.did
        }
        const vaultContract: GenericContract = await this.getVaultContract(
            agreementId,
            from.getId(),
            vaultAddress
        )
        vaultAddress = vaultContract.address

        // use the distributeNftCollateralCondition to withdraw the lender's collateral
        const txReceipt: TransactionReceipt = await this.nevermined.keeper.conditions.distributeNftCollateralCondition.fulfill(
            agreementId,
            did,
            vaultAddress,
            nftContractAddress,
            from
        )
        const {
            state: stateUnlock
        } = await this.nevermined.keeper.conditionStoreManager.getCondition(
            agreementData.conditionIds[5]
        )
        if (stateUnlock !== ConditionState.Fulfilled) {
            return false
        }
        // this.logger.log(`distributeNftCollateralCondition fulfilled at conditionId=${agreementData.conditionIds[5]}`)

        return txReceipt.status
    }

    public async getVaultContract(
        agreementId: string,
        from: string,
        vaultAddress?: string
    ): Promise<GenericContract> {
        if (!vaultAddress) {
            vaultAddress = await this.template.getAgreementVaultAddress(agreementId, from)
        }
        return GenericContract.getInstance(
            this.instanceConfig,
            'AaveCreditVault',
            vaultAddress
        )
    }

    /**
     * Returned value is already converted from Wei
     * @param agreementId
     * @param from
     * @param vaultAddress (optional)
     */
    public async getTotalActualDebt(
        agreementId: string,
        from: Account,
        vaultAddress?: string
    ): Promise<number> {
        const vault: GenericContract = await this.getVaultContract(
            agreementId,
            from.getId(),
            vaultAddress
        )
        const totalDebt = await vault.call('getTotalActualDebt', [], from.getId())
        return Number(web3Utils.fromWei(totalDebt.toString()))
    }

    /**
     * Returned value is already converted from Wei
     * @param agreementId
     * @param from
     * @param vaultAddress (optional)
     */
    public async getActualCreditDebt(
        agreementId: string,
        from: Account,
        vaultAddress?: string
    ): Promise<number> {
        const vault: GenericContract = await this.getVaultContract(
            agreementId,
            from.getId(),
            vaultAddress
        )
        return Number(
            web3Utils.fromWei(await vault.call('getActualCreditDebt', [], from.getId()))
        )
    }

    /**
     * Returned value is already converted from Wei
     * @param agreementId
     * @param from
     * @param vaultAddress (optional)
     */
    public async getCreditAssetDebt(
        agreementId: string,
        from: Account,
        vaultAddress?: string
    ): Promise<number> {
        const vault: GenericContract = await this.getVaultContract(
            agreementId,
            from.getId(),
            vaultAddress
        )
        return Number(
            web3Utils.fromWei(await vault.call('getCreditAssetDebt', [], from.getId()))
        )
    }

    public async getAssetPrice(
        agreementId: string,
        tokenAddress: string,
        from: Account,
        vaultAddress?: string
    ): Promise<number> {
        const vault: GenericContract = await this.getVaultContract(
            agreementId,
            from.getId(),
            vaultAddress
        )
        return vault.call('getAssetPrice', [tokenAddress], from.getId())
    }

    /**
     * Returned value is already converted from Wei
     * @param agreementId
     * @param from
     * @param vaultAddress (optional)
     */
    public async getBorrowedAmount(
        agreementId: string,
        from: Account,
        vaultAddress?: string
    ): Promise<number> {
        const vault: GenericContract = await this.getVaultContract(
            agreementId,
            from.getId(),
            vaultAddress
        )
        return Number(
            web3Utils.fromWei(await vault.call('getBorrowedAmount', [], from.getId()))
        )
    }

    /**
     * Returned value is already converted from Wei
     * @param agreementId
     * @param from
     * @param vaultAddress (optional)
     */
    public async delegatedAmount(
        agreementId: string,
        borrower: string,
        delegatedToken: string,
        interestRateMode: number,
        from: Account,
        vaultAddress?: string
    ): Promise<number> {
        const vault: GenericContract = await this.getVaultContract(
            agreementId,
            from.getId(),
            vaultAddress
        )
        return Number(
            web3Utils.fromWei(
                await vault.call(
                    'delegatedAmount',
                    [borrower, delegatedToken, interestRateMode],
                    from.getId()
                )
            )
        )
    }
}
