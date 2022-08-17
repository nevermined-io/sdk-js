import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO } from '../../../sdk'
import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nft721SalesTemplateServiceAgreementTemplate } from './NFT721SalesTemplate.serviceAgreementTemplate'
import { ServiceType } from '../../../ddo/Service'

export interface NFT721SalesTemplateParams {
    consumerId: string
    expiration: number
}

export class NFT721SalesTemplate extends BaseTemplate<NFT721SalesTemplateParams> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFT721SalesTemplate> {
        return AgreementTemplate.getInstance(
            config,
            'NFT721SalesTemplate',
            NFT721SalesTemplate,
            true
        )
    }

    public service(): ServiceType {
        return 'nft721-sales'
    }

    public params(consumerId: string, expiration: number = 0): NFT721SalesTemplateParams {
        return { consumerId, expiration }
    }

    public lockConditionIndex(): number {
        return 0
    }

    public async instanceFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        creator: string,
        parameters: NFT721SalesTemplateParams
    ): Promise<AgreementInstance<NFT721SalesTemplateParams>> {
        const { transferNft721Condition, lockPaymentCondition, escrowPaymentCondition } =
            this.nevermined.keeper.conditions

        const agreementId = await this.agreementId(agreementIdSeed, creator)
        const ctx = {
            ...this.standardContext(ddo, creator),
            ...parameters
        }

        const lockPaymentConditionInstance = await lockPaymentCondition.instanceFromDDO(
            agreementId,
            ctx
        )
        const transferConditionInstance = await transferNft721Condition.instanceFromDDO(
            agreementId,
            ctx,
            lockPaymentConditionInstance
        )
        const escrowPaymentConditionInstance =
            await escrowPaymentCondition.instanceFromDDO(
                agreementId,
                ctx,
                transferConditionInstance,
                lockPaymentConditionInstance
            )

        return {
            instances: [
                lockPaymentConditionInstance,
                transferConditionInstance,
                escrowPaymentConditionInstance
            ],
            list: parameters,
            agreementId
        }
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nft721SalesTemplateServiceAgreementTemplate
    }
}
