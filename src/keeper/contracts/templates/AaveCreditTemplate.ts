import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import { findServiceConditionByName, generateId, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

import { accessTemplateServiceAgreementTemplate } from './AccessProofTemplate.serviceAgreementTemplate'
import AssetRewards from '../../../models/AssetRewards'
import Account from '../../../nevermined/Account'
import { BabyjubPublicKey } from '../../../models/KeyTransfer'
import KeyTransfer from '../../../utils/KeyTransfer'

const keytransfer = new KeyTransfer()

export class AaveCreditTemplate extends BaseTemplate {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AaveCreditTemplate> {
        return AgreementTemplate.getInstance(
            config,
            'AaveCreditTemplate',
            AaveCreditTemplate,
            true
        )
    }

    public async createAgreementFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: Account,
        from?: Account
    ): Promise<boolean> {
        throw new Error('Not implemented')
    }

    public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: string
    ): Promise<string[]> {
        throw new Error('Not implemented')
    }

    public async getServiceAgreementTemplate() {
        return accessTemplateServiceAgreementTemplate
    }

    /**
     * Create a agreement using AccessTemplate using only the most important information.
     * @param  {DDO}             ddo            Asset DID.
     * @param  {AssetRewards}    assetRewards   Asset rewards
     * @param  {string}          from           Consumer address.
     * @param  {string}          consumer       Consumer address.
     * @param  {string}          agreementId    Consumer address.
     * @return {Promise<string>}                Agreement ID.
     */
    public async createFullAgreement(
        agreementId: string,
        lendingPoolAddress: string,
        dataProviderAddress: string,
        wethAddress: string,
        agreementFee: number,
        treasuryAddress: string,
        did: string,
        conditionsIds: string[],
        timelocks: number[],
        timeOuts: number[],
        lender: string,
        from?: Account
    ): Promise<string> {

        //DeployVault
        //createVaultAgreement returns agreementId

        return zeroX(agreementId)
    }

    private async createFullAgreementData(
        agreementId: string,
        vaultAddress: string,
        collateralAsset: string,
        collateralAmount: number,
        delegatedAsset: string,
        delegatedAmount: number,
        interestRateMode: number,
        nftTokenAdress: string,
    ) {

        const { conditions } = this.nevermined.keeper

        const {
            aaveBorrowCondition,
            aaveCollateralDepositCondition,
            aaveCollateralWithdrawCondition,
            aaveRepayCondition
        } = conditions

        const aaveBorrowConditionId = await aaveBorrowCondition.generateIdHash(
            agreementId,
            vaultAddress,
            delegatedAsset,
            delegatedAmount,
            interestRateMode
        )

        const aaveCollateralDepositConditionId = await aaveCollateralDepositCondition.generateIdHash(
            agreementId,
            vaultAddress,
            collateralAsset,
            collateralAmount,
            delegatedAsset,
            delegatedAmount,
            interestRateMode
        )

        const aaveCollateralWithdrawConditionId = await aaveCollateralWithdrawCondition.generateIdHash(
            agreementId,
            vaultAddress,
            collateralAsset
        )

        const aaveRepayConditionId = await aaveRepayCondition.generateIdHash(
            agreementId,
            vaultAddress,
            delegatedAsset,
            delegatedAmount,
            interestRateMode
        )


        return {
            aaveBorrowConditionId,
            aaveCollateralDepositConditionId,
            aaveCollateralWithdrawConditionId,
            aaveRepayConditionId
        }
    }
}
