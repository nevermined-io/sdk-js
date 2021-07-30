import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import { DDO } from '../../../sdk'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nftSalesTemplateServiceAgreementTemplate } from './NFTSalesTemplate.serviceAgreementTemplate'
import Account from '../../../nevermined/Account'

export class NFTSalesTemplate extends BaseTemplate {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFTSalesTemplate> {
        return AgreementTemplate.getInstance(config, 'NFTSalesTemplate', NFTSalesTemplate)
    }

    public async createAgreementFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: string,
        from?: Account,
        nftAmount?: number
    ): Promise<boolean> {
        const [
            lockPaymentConditionId,
            transferNftConditionId,
            escrowPaymentConditionId
        ] = await this.getAgreementIdsFromDDO(
            agreementId,
            ddo,
            assetRewards,
            consumer,
            from,
            nftAmount
        )
        return !!(await this.createAgreement(
            agreementId,
            ddo.shortId(),
            [lockPaymentConditionId, transferNftConditionId, escrowPaymentConditionId],
            [0, 0, 0],
            [0, 0, 0],
            consumer,
            from
        ))
    }

    public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: string,
        from?: Account,
        nftAmount?: number
    ): Promise<string[]> {
        const {
            lockPaymentCondition,
            transferNftCondition,
            escrowPaymentCondition
        } = this.nevermined.keeper.conditions
        const { token } = this.nevermined.keeper

        const lockPaymentConditionId = await lockPaymentCondition.generateId(
            agreementId,
            await lockPaymentCondition.hashValues(
                ddo.shortId(),
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                assetRewards.getAmounts(),
                assetRewards.getReceivers()
            )
        )
        const transferNftConditionId = await transferNftCondition.generateId(
            agreementId,
            await transferNftCondition.hashValues(
                ddo.shortId(),
                consumer,
                nftAmount,
                lockPaymentConditionId
            )
        )
        const escrowPaymentConditionId = await escrowPaymentCondition.generateId(
            agreementId,
            await escrowPaymentCondition.hashValues(
                ddo.shortId(),
                assetRewards.getAmounts(),
                assetRewards.getReceivers(),
                escrowPaymentCondition.getAddress(),
                token.getAddress(),
                lockPaymentConditionId,
                transferNftConditionId
            )
        )

        return [lockPaymentConditionId, transferNftConditionId, escrowPaymentConditionId]
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nftSalesTemplateServiceAgreementTemplate
    }
}
