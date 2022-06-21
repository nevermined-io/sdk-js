import { AgreementInstance, AgreementParameters, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import {
    getAssetRewardsFromService,
} from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

import { accessTemplateServiceAgreementTemplate } from './AccessProofTemplate.serviceAgreementTemplate'
import Account from '../../../nevermined/Account'
import { ServiceType } from '../../../ddo/Service'

export class AccessProofTemplate extends BaseTemplate {
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

    public params(consumer: Account): AgreementParameters {
        return {
            list: [consumer]
        }
    }

    public async instanceFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        creator: string,
        parameters: AgreementParameters
    ): Promise<AgreementInstance> {
        let consumer: Account
        [consumer] = parameters.list as any

        const {
            accessProofCondition,
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
        const accessConditionInstance = await accessProofCondition.instance(
            agreementId,
            await accessProofCondition.paramsFromDDO(ddo, accessService, assetRewards, consumer)
        )
        const escrowPaymentConditionInstance = await escrowPaymentCondition.instance(
            agreementId,
            await escrowPaymentCondition.paramsFromDDO(ddo, accessService, assetRewards, consumer.getId(), accessConditionInstance, lockPaymentConditionInstance)
        )

        return {
            instances: [lockPaymentConditionInstance, accessConditionInstance, escrowPaymentConditionInstance],
            list: parameters.list,
            agreementId,
        }
    }
}
