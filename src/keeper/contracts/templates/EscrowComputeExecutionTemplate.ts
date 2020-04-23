import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseEscrowTemplate } from './BaseEscrowTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import { generateId, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

import { escrowComputeExecutionTemplateServiceAgreementTemplate } from './EscrowComputeExecutionTemplate.serviceAgreementTemplate'

export class EscrowComputeExecutionTemplate extends BaseEscrowTemplate {
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

    public async createAgreementFromDDO(
        agreementId: string,
        ddo: DDO,
        consumer: string,
        from?: string
    ) {
        return !!(await this.createFullAgreement(
            ddo.shortId(),
            ddo.findServiceByType('metadata').attributes.main.price,
            consumer,
            from,
            agreementId
        ))
    }

    public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        consumer: string,
        from?: string
    ) {
        const {
            computeExecutionConditionId,
            lockRewardConditionId,
            escrowRewardId
        } = await this.createFullAgreementData(
            agreementId,
            ddo.shortId(),
            ddo.findServiceByType('metadata').attributes.main.price,
            consumer
        )
        return [computeExecutionConditionId, lockRewardConditionId, escrowRewardId]
    }

    /**
     * Create a agreement using EscrowAccess____SecretStoreTemplate using only the most important information.
     * @param  {string}          did    Asset DID.
     * @param  {number}          amount Asset price.
     * @param  {string}          from   Consumer address.
     * @return {Promise<string>}        Agreement ID.
     */
    public async createFullAgreement(
        did: string,
        amount: number | string,
        consumer: string,
        from?: string,
        agreementId: string = generateId()
    ): Promise<string> {
        const {
            computeExecutionConditionId,
            lockRewardConditionId,
            escrowRewardId
        } = await this.createFullAgreementData(agreementId, did, amount, consumer)

        await this.createAgreement(
            agreementId,
            did,
            [computeExecutionConditionId, lockRewardConditionId, escrowRewardId],
            [0, 0, 0],
            [0, 0, 0],
            consumer,
            from
        )

        return zeroX(agreementId)
    }

    private async createFullAgreementData(
        agreementId: string,
        did: string,
        amount: number | string,
        consumer: string
    ) {
        const { didRegistry, conditions } = this.ocean.keeper

        const {
            computeExecutionCondition,
            lockRewardCondition,
            escrowReward
        } = conditions

        const publisher = await didRegistry.getDIDOwner(did)

        const lockRewardConditionId = await lockRewardCondition.generateIdHash(
            agreementId,
            await escrowReward.getAddress(),
            amount
        )
        const computeExecutionConditionId = await computeExecutionCondition.generateIdHash(
            agreementId,
            did,
            consumer
        )
        const escrowRewardId = await escrowReward.generateIdHash(
            agreementId,
            String(amount),
            publisher,
            consumer,
            lockRewardConditionId,
            computeExecutionConditionId
        )

        return {
            lockRewardConditionId,
            computeExecutionConditionId,
            escrowRewardId
        }
    }
}
