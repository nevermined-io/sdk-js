import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import { DDO } from '../../../sdk'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nftSalesTemplateServiceAgreementTemplate } from './NFTSalesTemplate.serviceAgreementTemplate'
import Account from '../../../nevermined/Account'
import { findServiceConditionByName } from '../../../utils'

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
        nftAmount?: number,
        from?: Account
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
        nftAmount?: number
    ): Promise<string[]> {
        const {
            lockPaymentCondition,
            transferNftCondition,
            escrowPaymentCondition
        } = this.nevermined.keeper.conditions

        const salesService = ddo.findServiceByType('nft-sales')

        const payment = findServiceConditionByName(salesService, 'lockPayment')
        if (!payment) throw new Error('Payment Condition not found!')

        const lockPaymentConditionId = await lockPaymentCondition.generateId(
            agreementId,
            await lockPaymentCondition.hashValues(
                ddo.shortId(),
                escrowPaymentCondition.getAddress(),
                payment.parameters.find(p => p.name === '_tokenAddress').value as string,
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

        const escrow = findServiceConditionByName(salesService, 'escrowPayment')
        if (!escrow) throw new Error('Escrow Condition not found!')

        const escrowPaymentConditionId = await escrowPaymentCondition.generateId(
            agreementId,
            await escrowPaymentCondition.hashValues(
                ddo.shortId(),
                assetRewards.getAmounts(),
                assetRewards.getReceivers(),
                escrowPaymentCondition.getAddress(),
                escrow.parameters.find(p => p.name === '_tokenAddress').value as string,
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
