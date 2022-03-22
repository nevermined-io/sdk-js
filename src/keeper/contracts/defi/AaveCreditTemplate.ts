import { AgreementTemplate } from '../templates'
import { BaseTemplate } from '../templates'
import { DDO } from '../../..'
import { didZeroX, findServiceConditionByName, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { TransactionReceipt } from 'web3-core'
import Account from '../../../nevermined/Account'
import BigNumber from 'bignumber.js'
import { TxParameters } from '../ContractBase'
import { aaveCreditTemplateServiceAgreementTemplate } from './AaveCreditTemplate.serviceAgreementTemplate'
import { AaveConfig } from '../../../models/AaveConfig'
import AssetRewards from '../../../models/AssetRewards'
import web3Utils from 'web3-utils'

export class AaveCreditTemplate extends BaseTemplate {
    aaveConfig: AaveConfig

    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AaveCreditTemplate> {
        const templateInst = await AgreementTemplate.getInstance(
            config,
            'AaveCreditTemplate',
            AaveCreditTemplate,
            true
        )
        templateInst.aaveConfig = config.config.aaveConfig
        return templateInst
    }

    /*
     * WARNING: THIS IS A NO-OP FUNCTION to appease the base class, please do not use
     */
    public async createAgreementFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards | null
    ): Promise<boolean> {
        throw Error('This function is not supported.')
    }

    /*
     * WARNING: THIS IS A NO-OP FUNCTION to appease the base class, please do not use
     */
    public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO
    ): Promise<string[]> {
        throw Error('This function is not supported.')
    }

    public async getAgreementIds(
        agreementId: string,
        ddo: DDO,
        vaultAddress: string,
        nftTokenContract: string,
        nftAmount: number,
        collateralToken: string,
        collateralAmount: number,
        delegatedToken: string,
        delegatedAmount: number,
        interestRateMode: number
    ): Promise<string[]> {
        const aaveService = ddo.findServiceByType('aave-credit')
        if (!aaveService) throw new Error('aave-credit service not found in this DDO!')

        const lockNft = findServiceConditionByName(aaveService, 'lockNft')
        const depositCollateral = findServiceConditionByName(
            aaveService,
            'depositCollateral'
        )
        const borrow = findServiceConditionByName(aaveService, 'borrowCredit')
        const repay = findServiceConditionByName(aaveService, 'repayCredit')
        const withdraw = findServiceConditionByName(aaveService, 'withdrawCollateral')
        const distributeNft = findServiceConditionByName(aaveService, 'distributeNft')
        if (!lockNft) throw new Error('lockNft Condition not found!')
        if (!depositCollateral) throw new Error('depositCollateral Condition not found!')
        if (!borrow) throw new Error('borrow credit Condition not found!')
        if (!repay) throw new Error('repay credit Condition not found!')
        if (!withdraw) throw new Error('withdraw collateral Condition not found!')
        if (!distributeNft) throw new Error('distributeNft Condition not found!')

        const _collateralAmount = new BigNumber(
            web3Utils.toWei(collateralAmount.toString(), 'ether')
        )
        const _delegatedAmount = new BigNumber(
            web3Utils.toWei(delegatedAmount.toString(), 'ether')
        )
        return this.createFullAgreementData(
            agreementId,
            ddo.shortId(),
            vaultAddress,
            nftTokenContract,
            nftAmount,
            collateralToken,
            _collateralAmount,
            delegatedToken,
            _delegatedAmount,
            interestRateMode
        )
    }

    public async getServiceAgreementTemplate() {
        return aaveCreditTemplateServiceAgreementTemplate
    }

    private async _createAgreement(
        agreementId: string,
        did: string,
        vaultAddress: string,
        nftTokenContract: string,
        nftAmount: number,
        collateralToken: string,
        collateralAmount: number,
        delegatedToken: string,
        delegatedAmount: number,
        interestRateMode: number,
        timeLocks: number[],
        timeOuts: number[],
        txParams?: TxParameters,
        from?: Account
    ): Promise<TransactionReceipt> {
        const _collateralAmount = new BigNumber(
            web3Utils.toWei(collateralAmount.toString(), 'ether')
        )
        const _delegatedAmount = new BigNumber(
            web3Utils.toWei(delegatedAmount.toString(), 'ether')
        )
        const conditionIds = await this.createFullAgreementData(
            agreementId,
            did,
            vaultAddress,
            nftTokenContract,
            nftAmount,
            collateralToken,
            _collateralAmount,
            delegatedToken,
            _delegatedAmount,
            interestRateMode
        )

        const txAgreement = await this.send(
            'createVaultAgreement',
            from.getId(),
            [agreementId, didZeroX(did), conditionIds, timeLocks, timeOuts, vaultAddress],
            txParams
        )

        console.log(`createVaultAgreement: 
            status=${txAgreement.status}, txHash=${txAgreement.transactionHash},
            
            collateralAmount=${_collateralAmount}, delegatedAmount=${_delegatedAmount}`)
        return txAgreement
    }

    public async createAgreementAndDeployVault(
        agreementId: string,
        ddo: DDO,
        nftTokenContract: string,
        nftAmount: number,
        collateralToken: string,
        collateralAmount: number,
        delegatedToken: string,
        delegatedAmount: number,
        interestRateMode: number,
        borrower: string,
        lender: string,
        timeLocks: number[],
        timeOuts: number[],
        txParams?: TxParameters,
        from?: Account
    ): Promise<[TransactionReceipt, string]> {
        const vaultAddress = await this.deployVault(
            this.aaveConfig.lendingPoolAddress,
            this.aaveConfig.dataProviderAddress,
            this.aaveConfig.wethAddress,
            this.aaveConfig.agreementFee,
            this.aaveConfig.treasuryAddress,
            borrower,
            lender,
            from.getId()
        )

        console.log(`Deployed credit vault: 
            vaultAddress=${vaultAddress}, lendingPool=${this.aaveConfig.lendingPoolAddress}. 
            weth=${this.aaveConfig.wethAddress}. agreementFee=${this.aaveConfig.agreementFee}`)

        const txAgreement = await this._createAgreement(
            agreementId,
            ddo.shortId(),
            vaultAddress,
            nftTokenContract,
            nftAmount,
            collateralToken,
            collateralAmount,
            delegatedToken,
            delegatedAmount,
            interestRateMode,
            timeLocks,
            timeOuts,
            txParams,
            from
        )
        return [txAgreement, vaultAddress]
    }

    /**
     * Create agreement and credit vault
     *
     * @return {Promise<string>}                Agreement ID.
     */
    public async createFullAgreement(
        agreementId: string,
        did: string,
        vaultAddress: string,
        nftTokenContract: string,
        nftAmount: number,
        collateralToken: string,
        collateralAmount: number,
        delegatedToken: string,
        delegatedAmount: number,
        interestRateMode: number,
        timeLocks: number[],
        timeOuts: number[],
        txParams?: TxParameters,
        from?: Account
    ): Promise<string> {
        await this._createAgreement(
            agreementId,
            did,
            vaultAddress,
            nftTokenContract,
            nftAmount,
            collateralToken,
            collateralAmount,
            delegatedToken,
            delegatedAmount,
            interestRateMode,
            timeLocks,
            timeOuts,
            txParams,
            from
        )
        return zeroX(agreementId)
    }

    /**
     * Deploy a new credit vault that is required to facilitate an Aave credit agreement
     *
     * @return {Promise<string>}                Agreement ID.
     */
    public async deployVault(
        lendingPool: string,
        dataProvider: string,
        weth: string,
        agreementFee: number,
        treasuryAddress: string,
        borrower: string,
        lender: string,
        from: string
    ): Promise<string> {
        // console.log(`deployVault: ${lendingPool}, ${dataProvider}, ${weth}, ${agreementFee}, ${treasuryAddress}, ${borrower}, ${lender}, ${from}, `)
        // console.log(`\n\npastEvents=${JSON.stringify(await this.getEventData('VaultCreated', {}))}`)
        const tx = await this.send('deployVault', from, [
            lendingPool,
            dataProvider,
            weth,
            agreementFee,
            treasuryAddress,
            borrower,
            lender
        ])
        // console.log(`events: ${tx}, ${JSON.stringify(tx.events)}, ${tx.events.VaultCreated}`)
        const { _vaultAddress } = tx.events.VaultCreated.returnValues
        return _vaultAddress
    }

    private async createFullAgreementData(
        agreementId: string,
        did: string,
        vaultAddress: string,
        nftTokenContract: string,
        nftAmount: number,
        collateralToken: string,
        collateralAmount: BigNumber,
        delegatedToken: string,
        delegatedAmount: BigNumber,
        interestRateMode: number
    ) {
        const {
            nft721LockCondition,
            aaveCollateralDepositCondition,
            aaveBorrowCondition,
            aaveRepayCondition,
            aaveCollateralWithdrawCondition,
            distributeNftCollateralCondition
        } = this.nevermined.keeper.conditions

        const lockNftId = await nft721LockCondition.generateId(
            agreementId,
            await nft721LockCondition.hashValues(
                did,
                vaultAddress,
                nftAmount,
                nftTokenContract
            )
        )
        console.log(`createFullAgreementData: 
            nft721LockCondition.address=${nft721LockCondition.address}, 
            lockNftId=${lockNftId}, 
            `)

        const depositCollateralId = await aaveCollateralDepositCondition.generateId(
            agreementId,
            await aaveCollateralDepositCondition.hashValues(
                did,
                vaultAddress,
                collateralToken,
                collateralAmount,
                delegatedToken,
                delegatedAmount,
                interestRateMode
            )
        )
        const borrowId = await aaveBorrowCondition.generateId(
            agreementId,
            await aaveBorrowCondition.hashValues(
                did,
                vaultAddress,
                delegatedToken,
                delegatedAmount,
                interestRateMode
            )
        )
        const repayId = await aaveRepayCondition.generateId(
            agreementId,
            await aaveRepayCondition.hashValues(
                did,
                vaultAddress,
                delegatedToken,
                delegatedAmount,
                interestRateMode
            )
        )
        const withdrawId = await aaveCollateralWithdrawCondition.generateId(
            agreementId,
            await aaveCollateralWithdrawCondition.hashValues(
                did,
                vaultAddress,
                collateralToken
            )
        )
        const distributeId = await distributeNftCollateralCondition.generateId(
            agreementId,
            await distributeNftCollateralCondition.hashValues(
                did,
                vaultAddress,
                nftTokenContract
            )
        )

        return [
            lockNftId,
            depositCollateralId,
            borrowId,
            repayId,
            withdrawId,
            distributeId
        ]
    }

    public async getAgreementVaultAddress(
        agreementId: string,
        from: string
    ): Promise<string> {
        return this.call('getVaultForAgreement', [agreementId], from)
    }

    public async getAgreementDid(agreementId: string): Promise<string> {
        const { did } = await this.nevermined.keeper.agreementStoreManager.getAgreement(
            agreementId
        )
        return did
    }
}
