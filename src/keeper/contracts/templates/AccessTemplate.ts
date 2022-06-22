import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { accessTemplateServiceAgreementTemplate } from './AccessTemplate.serviceAgreementTemplate'
import { ServiceType } from '../../../ddo/Service'
import { Account } from '../../../sdk'

export interface AccessTemplateParams {
    consumerId: string, 
    creator: string,
    serviceType: ServiceType
}

export class AccessTemplate extends BaseTemplate<AccessTemplateParams> {
    public static async getInstance(config: InstantiableConfig): Promise<AccessTemplate> {
        return AgreementTemplate.getInstance(config, 'AccessTemplate', AccessTemplate)
    }

    public service(): ServiceType {
        return 'access'
    }

    public async getServiceAgreementTemplate() {
        return accessTemplateServiceAgreementTemplate
    }

    public params(consumer: Account, serviceType: ServiceType = 'access'): AccessTemplateParams {
        return { consumerId: consumer.getId(), serviceType, creator: consumer.getId() }
    }

    public async instanceFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        creator: string,
        parameters: AccessTemplateParams
    ): Promise<AgreementInstance<AccessTemplateParams>> {
        const {
            accessCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = this.nevermined.keeper.conditions

        const agreementId = await this.agreementId(agreementIdSeed, creator)

        const ctx = {
            ...this.standardContext(ddo, creator),
            ...parameters,
        }
        // console.log("here", ctx)

        const lockPaymentConditionInstance = await lockPaymentCondition.instanceFromDDO(agreementId, ctx)
        // console.log("hmmmm", lockPaymentConditionInstance.id, await lockPaymentCondition.generateIdWithSeed(agreementId, lockPaymentConditionInstance.seed))
        const accessConditionInstance = await accessCondition.instanceFromDDO(agreementId, ctx)
        // console.log(accessConditionInstance)
        const escrowPaymentConditionInstance = await escrowPaymentCondition.instanceFromDDO(
            agreementId, ctx, accessConditionInstance, lockPaymentConditionInstance
        )

        return {
            instances: [accessConditionInstance, lockPaymentConditionInstance, escrowPaymentConditionInstance],
            list: parameters,
            agreementId,
        }
    }

}
