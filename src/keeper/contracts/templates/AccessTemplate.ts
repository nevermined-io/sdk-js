import { AgreementInstance, AgreementParameters, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import {
    getAssetRewardsFromService,
} from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

import { accessTemplateServiceAgreementTemplate } from './AccessTemplate.serviceAgreementTemplate'
import Account from '../../../nevermined/Account'
import { ServiceType } from '../../../ddo/Service'

export class AccessTemplate extends BaseTemplate {
    public static async getInstance(config: InstantiableConfig): Promise<AccessTemplate> {
        return AgreementTemplate.getInstance(config, 'AccessTemplate', AccessTemplate)
    }

    public service(): ServiceType {
        return 'access'
    }

    public async getServiceAgreementTemplate() {
        return accessTemplateServiceAgreementTemplate
    }

    public params(consumer: Account, from: Account, serviceType: ServiceType = 'access'): AgreementParameters {
        return {
            list: [consumer, from, serviceType]
        }
    }

    public async instanceFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        parameters: AgreementParameters
    ): Promise<AgreementInstance> {
        let consumer: string
        let creator: string
        let serviceType: ServiceType
        [consumer, creator, serviceType] = parameters.list as any

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

        const lockPaymentConditionInstance = await lockPaymentCondition.instance(
            agreementId,
            await lockPaymentCondition.paramsFromDDO(ddo, accessService, assetRewards)
        )
        const accessConditionInstance = await accessCondition.instance(
            agreementId,
            await accessCondition.paramsFromDDO(ddo, accessService, assetRewards, consumer)
        )
        const escrowPaymentConditionInstance = await escrowPaymentCondition.instance(
            agreementId,
            await escrowPaymentCondition.paramsFromDDO(ddo, accessService, assetRewards, consumer, accessConditionInstance, lockPaymentConditionInstance)
        )

        return {
            instances: [lockPaymentConditionInstance, accessConditionInstance, escrowPaymentConditionInstance],
            list: parameters.list,
            agreementId,
        }
    }

}
