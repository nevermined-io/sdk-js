import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import { getAssetRewardsFromService } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { accessTemplateServiceAgreementTemplate } from './AccessTemplate.serviceAgreementTemplate'
import { ServiceType } from '../../../ddo/Service'

export interface AccessTemplateParams {
    consumer: string, 
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

    public params(consumer: string, serviceType: ServiceType = 'access'): AccessTemplateParams {
        return { consumer, serviceType }
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

        const accessService = ddo.findServiceByType(this.service())
        const assetRewards = getAssetRewardsFromService(accessService)
        const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(
            agreementIdSeed,
            creator
        )

        const ctx = {
            ddo,
            service: accessService,
            rewards: assetRewards,
            creator: parameters.consumer,
            consumer: parameters.consumer
        }

        const lockPaymentConditionInstance = await lockPaymentCondition.instance(
            agreementId,
            await lockPaymentCondition.paramsFromDDO(ctx)
        )
        const accessConditionInstance = await accessCondition.instance(
            agreementId,
            await accessCondition.paramsFromDDO(ctx)
        )
        const escrowPaymentConditionInstance = await escrowPaymentCondition.instance(
            agreementId,
            await escrowPaymentCondition.paramsFromDDO(ctx, accessConditionInstance, lockPaymentConditionInstance)
        )

        return {
            instances: [lockPaymentConditionInstance, accessConditionInstance, escrowPaymentConditionInstance],
            list: parameters,
            agreementId,
        }
    }

}
