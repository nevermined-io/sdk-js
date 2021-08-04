import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import { findServiceConditionByName, generateId, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

import { accessTemplateServiceAgreementTemplate } from './AccessTemplate.serviceAgreementTemplate'
import AssetRewards from '../../../models/AssetRewards'
import Account from '../../../nevermined/Account'

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
        from?: Account
    ) {
        return !!(await this.createFullAgreement(
            ddo,
            assetRewards,
            consumer,
            agreementId,
            from
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
        } = await this.createFullAgreementData(agreementId, ddo, assetRewards, consumer)
        return [accessConditionId, lockPaymentConditionId, escrowPaymentConditionId]
    }

    /**
     * Create a agreement using AccessTemplate using only the most important information.
     * @param  {DDO}             ddo            Asset DID.
     * @param  {AssetRewards}    assetRewards   Asset rewards
     * @param  {string}          from           Consumer address.
     * @param  {string}          consumer       Consumer address.
     * @param  {string}          agreementId    Consumer address.
     * @return {Promise<string>}                Agreement ID.
     */
    public async createFullAgreement(
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: string,
        agreementId: string = generateId(),
        from?: Account
    ): Promise<string> {
        const {
            accessConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        } = await this.createFullAgreementData(agreementId, ddo, assetRewards, consumer)

        await this.createAgreement(
            agreementId,
            ddo.shortId(),
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
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: string
    ) {
        const { conditions } = this.nevermined.keeper

        const {
            accessCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = conditions

        const accessService = ddo.findServiceByType('access')

        const payment = findServiceConditionByName(accessService, 'lockPayment')
        if (!payment) throw new Error('Payment Condition not found!')

        const lockPaymentConditionId = await lockPaymentCondition.generateIdHash(
            agreementId,
            ddo.shortId(),
            escrowPaymentCondition.getAddress(),
            payment.parameters.find(p => p.name === '_tokenAddress').value as string,
            assetRewards.getAmounts(),
            assetRewards.getReceivers()
        )

        const accessConditionId = await accessCondition.generateIdHash(
            agreementId,
            ddo.shortId(),
            consumer
        )

        const escrow = findServiceConditionByName(accessService, 'escrowPayment')
        if (!escrow) throw new Error('Escrow Condition not found!')

        const escrowPaymentConditionId = await escrowPaymentCondition.generateIdHash(
            agreementId,
            ddo.shortId(),
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            escrowPaymentCondition.getAddress(),
            escrow.parameters.find(p => p.name === '_tokenAddress').value as string,
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
