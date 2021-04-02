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
            lockRewardConditionId,
            escrowRewardId
        } = await this.createFullAgreementData(
            agreementId,
            ddo.shortId(),
            assetRewards,
            consumer
        )
        return [computeExecutionConditionId, lockRewardConditionId, escrowRewardId]
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
            lockRewardConditionId,
            escrowRewardId
        } = await this.createFullAgreementData(agreementId, did, assetRewards, consumer)

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
        assetRewards: AssetRewards,
        consumer: string
    ) {
        const { didRegistry, conditions } = this.nevermined.keeper

        const {
            computeExecutionCondition,
            lockRewardCondition,
            escrowReward
        } = conditions

        const publisher = await didRegistry.getDIDOwner(did)

        const lockRewardConditionId = await lockRewardCondition.generateIdHash(
            agreementId,
            await escrowReward.getAddress(),
            assetRewards.getTotalPrice()
        )
        const computeExecutionConditionId = await computeExecutionCondition.generateIdHash(
            agreementId,
            did,
            consumer
        )
        const escrowRewardId = await escrowReward.generateIdHash(
            agreementId,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
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
