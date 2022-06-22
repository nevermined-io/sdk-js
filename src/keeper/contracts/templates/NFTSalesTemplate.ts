import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO } from '../../../sdk'
import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nftSalesTemplateServiceAgreementTemplate } from './NFTSalesTemplate.serviceAgreementTemplate'
import { ServiceType } from '../../../ddo/Service'

export interface NFTSalesTemplateParams {
    consumerId: string
    providerId: string
    nftAmount: number
}

export class NFTSalesTemplate extends BaseTemplate<NFTSalesTemplateParams> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFTSalesTemplate> {
        return AgreementTemplate.getInstance(config, 'NFTSalesTemplate', NFTSalesTemplate)
    }

    public service(): ServiceType {
        return 'nft-sales'
    }

    public params(consumerId: string, providerId: string, nftAmount: number): NFTSalesTemplateParams {
        return { consumerId, providerId, nftAmount }
    }

    public async instanceFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        creator: string,
        parameters: NFTSalesTemplateParams
    ): Promise<AgreementInstance<NFTSalesTemplateParams>> {
        const {
            transferNftCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = this.nevermined.keeper.conditions

        const agreementId = await this.agreementId(agreementIdSeed, creator)
        const ctx = {
            ...this.standardContext(ddo),
            ...parameters,
        }

        const lockPaymentConditionInstance = await lockPaymentCondition.instanceFromDDO(agreementId, ctx)
        const transferConditionInstance = await transferNftCondition.instanceFromDDO(
            agreementId, ctx, lockPaymentConditionInstance
        )
        const escrowPaymentConditionInstance = await escrowPaymentCondition.instanceFromDDO(
            agreementId, ctx, transferConditionInstance, lockPaymentConditionInstance
        )

        return {
            instances: [lockPaymentConditionInstance, transferConditionInstance, escrowPaymentConditionInstance],
            list: parameters,
            agreementId,
        }
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nftSalesTemplateServiceAgreementTemplate
    }
}
