import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import { InstantiableConfig } from '../../../Instantiable.abstract'

import { escrowComputeExecutionTemplateServiceAgreementTemplate } from './EscrowComputeExecutionTemplate.serviceAgreementTemplate'
import { ServiceType } from '../../../ddo/Service'
import { Account } from '../../../sdk'

export interface EscrowComputeExecutionParams {
    consumerId: string, 
}

export class EscrowComputeExecutionTemplate extends BaseTemplate<EscrowComputeExecutionParams> {
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

    public params(consumer: Account): EscrowComputeExecutionParams {
        return { consumerId: consumer.getId() }
    }

    public async instanceFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        creator: string,
        parameters: EscrowComputeExecutionParams
    ): Promise<AgreementInstance<EscrowComputeExecutionParams>> {

        const {
            computeExecutionCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = this.nevermined.keeper.conditions

        const agreementId = await this.agreementId(agreementIdSeed, creator)
        const ctx = {
            ...this.standardContext(ddo, creator),
            ...parameters,
        }

        const lockPaymentConditionInstance = await lockPaymentCondition.instanceFromDDO(agreementId, ctx)
        const computeConditionInstance = await computeExecutionCondition.instanceFromDDO(agreementId, ctx)
        const escrowPaymentConditionInstance = await escrowPaymentCondition.instanceFromDDO(
            agreementId, ctx, computeConditionInstance, lockPaymentConditionInstance
        )

        return {
            instances: [computeConditionInstance, lockPaymentConditionInstance, escrowPaymentConditionInstance],
            list: parameters,
            agreementId,
        }
    }
}
