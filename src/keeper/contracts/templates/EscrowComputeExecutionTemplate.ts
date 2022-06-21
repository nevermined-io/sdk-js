import { AgreementInstance, AgreementParameters, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import { getAssetRewardsFromService } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

import { escrowComputeExecutionTemplateServiceAgreementTemplate } from './EscrowComputeExecutionTemplate.serviceAgreementTemplate'
import { ServiceType } from '../../../ddo/Service'

export class EscrowComputeExecutionTemplate extends BaseTemplate {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<EscrowComputeExecutionTemplate> {
        return AgreementTemplate.getInstance(
            config,
            'EscrowComputeExecutionTemplate',
            EscrowComputeExecutionTemplate
        )
    }

    public async getServiceAgreementTemplate() {
        return escrowComputeExecutionTemplateServiceAgreementTemplate
    }

    public service(): ServiceType {
        return 'compute'
    }

    public params(consumer: string): AgreementParameters {
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
        let consumer: string
        [consumer] = parameters.list as any

        const {
            computeExecutionCondition,
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
        const computeConditionInstance = await computeExecutionCondition.instance(
            agreementId,
            await computeExecutionCondition.paramsFromDDO(ddo, accessService, assetRewards, consumer)
        )
        const escrowPaymentConditionInstance = await escrowPaymentCondition.instance(
            agreementId,
            await escrowPaymentCondition.paramsFromDDO(ddo, accessService, assetRewards, consumer, computeConditionInstance, lockPaymentConditionInstance)
        )

        return {
            instances: [lockPaymentConditionInstance, computeConditionInstance, escrowPaymentConditionInstance],
            list: parameters.list,
            agreementId,
        }
    }
}
