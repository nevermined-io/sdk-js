import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import { generateId, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

import { escrowComputeExecutionTemplateServiceAgreementTemplate } from './EscrowComputeExecutionTemplate.serviceAgreementTemplate'
import AssetRewards from '../../../models/AssetRewards'

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

    public async createAgreementFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: string,
        from?: string
    ) {
        return !!(await this.createFullAgreement(
            ddo.shortId(),
            assetRewards,
            consumer,
            from,
            agreementId
        ))
    }

    public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: string,
        from?: string
    ) {
        const {
            computeExecutionConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        } = await this.createFullAgreementData(
            agreementId,
            ddo.shortId(),
            assetRewards,
            consumer
        )
        return [computeExecutionConditionId, lockPaymentConditionId, escrowPaymentConditionId]
    }

    /**
     * Create a agreement using EscrowAccess____SecretStoreTemplate using only the most important information.
     * @param  {string}          did    Asset DID.
     * @param  {AssetRewards}    assetRewards Asset rewards
     * @param  {string}          from   Consumer address.
     * @return {Promise<string>}        Agreement ID.
     */
    public async createFullAgreement(
        did: string,
        assetRewards: AssetRewards,
        consumer: string,
        from?: string,
        agreementId: string = generateId()
    ): Promise<string> {
        const {
            computeExecutionConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        } = await this.createFullAgreementData(agreementId, did, assetRewards, consumer)

        await this.createAgreement(
            agreementId,
            did,
            [computeExecutionConditionId, lockPaymentConditionId, escrowPaymentConditionId],
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
        assetRewards: AssetRewards,
        consumer: string
    ) {
        const { conditions } = this.nevermined.keeper

        const {
            computeExecutionCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = conditions

        const lockPaymentConditionId = await lockPaymentCondition.generateIdHash(
            agreementId,
            did,
            escrowPaymentCondition.getAddress(),
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
        )
        const computeExecutionConditionId = await computeExecutionCondition.generateIdHash(
            agreementId,
            did,
            consumer
        )
        const escrowPaymentConditionId = await escrowPaymentCondition.generateIdHash(
            agreementId,
            did,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            escrowPaymentCondition.getAddress(),
            lockPaymentConditionId,
            computeExecutionConditionId
        )

        return {
            lockPaymentConditionId,
            computeExecutionConditionId,
            escrowPaymentConditionId
        }
    }
}
