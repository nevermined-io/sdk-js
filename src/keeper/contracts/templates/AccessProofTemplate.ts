import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { accessTemplateServiceAgreementTemplate } from './AccessProofTemplate.serviceAgreementTemplate'
import Account from '../../../nevermined/Account'
import { ServiceType } from '../../../ddo/Service'

export interface AccessProofTemplateParams {
    consumer: Account
    consumerId: string
}

export class AccessProofTemplate extends BaseTemplate<AccessProofTemplateParams> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AccessProofTemplate> {
        return AgreementTemplate.getInstance(
            config,
            'AccessProofTemplate',
            AccessProofTemplate,
            true
        )
    }

    public async getServiceAgreementTemplate() {
        return accessTemplateServiceAgreementTemplate
    }

    public service(): ServiceType {
        return 'access-proof'
    }

    public params(consumer: Account): AccessProofTemplateParams {
        return { consumer, consumerId: consumer.getId() }
    }

    public async instanceFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        creator: string,
        parameters: AccessProofTemplateParams
    ): Promise<AgreementInstance<AccessProofTemplateParams>> {
        const {
            accessProofCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = this.nevermined.keeper.conditions

        const agreementId = await this.agreementId(agreementIdSeed, creator)

        const ctx = {
            ...this.standardContext(ddo, creator),
            ...parameters,
        }

        const lockPaymentConditionInstance = await lockPaymentCondition.instanceFromDDO(agreementId, ctx)
        const accessConditionInstance = await accessProofCondition.instanceFromDDO(agreementId, ctx)
        const escrowPaymentConditionInstance = await escrowPaymentCondition.instanceFromDDO(
            agreementId, ctx, accessConditionInstance, lockPaymentConditionInstance
        )

        return {
            instances: [lockPaymentConditionInstance, accessConditionInstance, escrowPaymentConditionInstance],
            list: parameters,
            agreementId,
        }
    }
}
