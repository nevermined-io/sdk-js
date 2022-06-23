import { AgreementInstance, AgreementTemplate } from '../templates'
import { BaseTemplate } from '../templates'
import { DDO } from '../../..'
import { didZeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { TransactionReceipt } from 'web3-core'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'
import { aaveCreditTemplateServiceAgreementTemplate } from './AaveCreditTemplate.serviceAgreementTemplate'
import { AaveConfig } from '../../../models/AaveConfig'
import web3Utils from 'web3-utils'
import BigNumber from 'bignumber.js'
import { ServiceType } from '../../../ddo/Service'

export interface AaveCreditTemplateParams {
    vaultAddress: string
    assetToBorrow: string
    amountToBorrow: string
    interestRateMode: number
    collateralAsset: string
    collateralAmount: string
    delegatedAsset: string
    delegatedAmount: string
    assetToRepay: string
    amountToRepay: string
    nftContractAddress: string
    lockAddress: string
    nftAmount: number
}

export class AaveCreditTemplate extends BaseTemplate<AaveCreditTemplateParams> {
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

    public service(): ServiceType {
        return 'aave-credit'
    }

    public params(
        vaultAddress: string,
        nftContractAddress: string,
        nftAmount: number,
        collateralAsset: string,
        collateralAmount: string,
        delegatedAsset: string,
        delegatedAmount: string,
        interestRateMode: number
    ): AaveCreditTemplateParams {
        return {
            vaultAddress,
            assetToBorrow: delegatedAsset,
            amountToBorrow: delegatedAmount,
            interestRateMode,
            collateralAsset,
            collateralAmount,
            delegatedAsset,
            delegatedAmount,
            assetToRepay: delegatedAsset,
            amountToRepay: delegatedAmount,
            nftContractAddress,
            lockAddress: vaultAddress,
            nftAmount
        }
    }

    public async getServiceAgreementTemplate() {
        return aaveCreditTemplateServiceAgreementTemplate
    }

    private async _createAgreement(
        agreementIdSeed: string,
        ddo: DDO,
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
    ): Promise<[TransactionReceipt, AgreementInstance<AaveCreditTemplateParams>]> {
        const _collateralAmount = new BigNumber(
            web3Utils.toWei(collateralAmount.toString(), 'ether')
        )
        const _delegatedAmount = new BigNumber(
            web3Utils.toWei(delegatedAmount.toString(), 'ether')
        )
        const data = await this.instanceFromDDO(
            agreementIdSeed,
            ddo,
            from.getId(),
            this.params(
                vaultAddress,
                nftTokenContract,
                nftAmount,
                collateralToken,
                _collateralAmount.toString(10),
                delegatedToken,
                _delegatedAmount.toString(10),
                interestRateMode
            )
        )

        const txAgreement = await this.send(
            'createVaultAgreement',
            from.getId(),
            [
                agreementIdSeed,
                didZeroX(ddo.shortId()),
                data.instances.map(a => a.seed),
                timeLocks,
                timeOuts,
                vaultAddress
            ],
            txParams
        )

        console.log(`createVaultAgreement:
            status=${txAgreement.status}, txHash=${txAgreement.transactionHash},

            collateralAmount=${_collateralAmount}, delegatedAmount=${_delegatedAmount}`)
        return [txAgreement, data]
    }

    public async createAgreementAndDeployVault(
        agreementIdSeed: string,
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
    ): Promise<[TransactionReceipt, string, AgreementInstance<AaveCreditTemplateParams>]> {
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

        const [txAgreement, data] = await this._createAgreement(
            agreementIdSeed,
            ddo,
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
        return [txAgreement, vaultAddress, data]
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

    public async instanceFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        creator: string,
        parameters: AaveCreditTemplateParams
    ): Promise<AgreementInstance<AaveCreditTemplateParams>> {
        const {
            nft721LockCondition,
            aaveCollateralDepositCondition,
            aaveBorrowCondition,
            aaveRepayCondition,
            aaveCollateralWithdrawCondition,
            distributeNftCollateralCondition
        } = this.nevermined.keeper.conditions

        const agreementId = await this.agreementId(agreementIdSeed, creator)
        const ctx = {
            ...this.standardContext(ddo, creator),
            ...parameters
        }

        const lockNftInstance = await nft721LockCondition.instanceFromDDO(
            agreementId,
            ctx
        )
        const depositCollateralInstance = await aaveCollateralDepositCondition.instanceFromDDO(
            agreementId,
            ctx
        )
        const borrowInstance = await aaveBorrowCondition.instanceFromDDO(agreementId, ctx)
        const repayInstance = await aaveRepayCondition.instanceFromDDO(agreementId, ctx)
        const withdrawInstance = await aaveCollateralWithdrawCondition.instanceFromDDO(
            agreementId,
            ctx
        )
        const distributeInstance = await distributeNftCollateralCondition.instanceFromDDO(
            agreementId,
            ctx
        )

        return {
            instances: [
                lockNftInstance,
                depositCollateralInstance,
                borrowInstance,
                repayInstance,
                withdrawInstance,
                distributeInstance
            ],
            list: parameters,
            agreementId
        }
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
