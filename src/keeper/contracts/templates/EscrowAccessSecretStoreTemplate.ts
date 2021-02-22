import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseEscrowTemplate } from './BaseEscrowTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import { generateId, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

import { escrowAccessSecretStoreTemplateServiceAgreementTemplate } from './EscrowAccessSecretStoreTemplate.serviceAgreementTemplate'
import AssetRewards from '../../../models/AssetRewards'

export class EscrowAccessSecretStoreTemplate extends BaseEscrowTemplate {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<EscrowAccessSecretStoreTemplate> {
        return AgreementTemplate.getInstance(
            config,
            'EscrowAccessSecretStoreTemplate',
            EscrowAccessSecretStoreTemplate
        )
    }

    public async getServiceAgreementTemplate() {
        return escrowAccessSecretStoreTemplateServiceAgreementTemplate
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
            accessSecretStoreConditionId,
            lockRewardConditionId,
            escrowRewardId
        } = await this.createFullAgreementData(
            agreementId,
            ddo.shortId(),
            assetRewards,
            consumer
        )
        return [accessSecretStoreConditionId, lockRewardConditionId, escrowRewardId]
    }

    /**
     * Create a agreement using EscrowAccessSecretStoreTemplate using only the most important information.
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
            accessSecretStoreConditionId,
            lockRewardConditionId,
            escrowRewardId
        } = await this.createFullAgreementData(agreementId, did, assetRewards, consumer)

        await this.createAgreement(
            agreementId,
            did,
            [accessSecretStoreConditionId, lockRewardConditionId, escrowRewardId],
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
            accessSecretStoreCondition,
            lockRewardCondition,
            escrowReward
        } = conditions

        const publisher = await didRegistry.getDIDOwner(did)

        const lockRewardConditionId = await lockRewardCondition.generateIdHash(
            agreementId,
            await escrowReward.getAddress(),
            assetRewards.getTotalPrice()
        )
        const accessSecretStoreConditionId = await accessSecretStoreCondition.generateIdHash(
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
            accessSecretStoreConditionId
        )

        return {
            lockRewardConditionId,
            accessSecretStoreConditionId,
            escrowRewardId
        }
    }
}
