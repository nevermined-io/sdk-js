import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import { generateId, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

import { accessTemplateServiceAgreementTemplate } from './AccessTemplate.serviceAgreementTemplate'
import AssetRewards from '../../../models/AssetRewards'

export class AccessTemplate extends BaseTemplate {
    public static async getInstance(config: InstantiableConfig): Promise<AccessTemplate> {
        return AgreementTemplate.getInstance(config, 'AccessTemplate', AccessTemplate)
    }

    public async getServiceAgreementTemplate() {
        return accessTemplateServiceAgreementTemplate
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
        consumer: string
    ) {
        const {
            accessConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        } = await this.createFullAgreementData(
            agreementId,
            ddo.shortId(),
            assetRewards,
            consumer
        )
        return [accessConditionId, lockPaymentConditionId, escrowPaymentConditionId]
    }

    /**
     * Create a agreement using AccessTemplate using only the most important information.
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
            accessConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        } = await this.createFullAgreementData(agreementId, did, assetRewards, consumer)

        await this.createAgreement(
            agreementId,
            did,
            [accessConditionId, lockPaymentConditionId, escrowPaymentConditionId],
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
        const { conditions, token } = this.nevermined.keeper

        const {
            accessCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = conditions

        const lockPaymentConditionId = await lockPaymentCondition.generateIdHash(
            agreementId,
            did,
            escrowPaymentCondition.getAddress(),
            token.getAddress(),
            assetRewards.getAmounts(),
            assetRewards.getReceivers()
        )
        const accessConditionId = await accessCondition.generateIdHash(
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
            token.getAddress(),
            lockPaymentConditionId,
            accessConditionId
        )

        return {
            accessConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        }
    }
}
