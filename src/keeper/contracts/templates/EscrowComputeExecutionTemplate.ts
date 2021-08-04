import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import { findServiceConditionByName, generateId, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

import { escrowComputeExecutionTemplateServiceAgreementTemplate } from './EscrowComputeExecutionTemplate.serviceAgreementTemplate'
import AssetRewards from '../../../models/AssetRewards'
import Account from '../../../nevermined/Account'

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
        from?: Account
    ) {
        return !!(await this.createFullAgreement(
            ddo,
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
            computeExecutionConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        } = await this.createFullAgreementData(agreementId, ddo, assetRewards, consumer)
        return [
            computeExecutionConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        ]
    }

    /**
     * Create a agreement using EscrowAccess____SecretStoreTemplate using only the most important information.
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
        from?: Account,
        agreementId: string = generateId()
    ): Promise<string> {
        const {
            computeExecutionConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        } = await this.createFullAgreementData(agreementId, ddo, assetRewards, consumer)

        await this.createAgreement(
            agreementId,
            ddo.id,
            [
                computeExecutionConditionId,
                lockPaymentConditionId,
                escrowPaymentConditionId
            ],
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
            lockPaymentCondition,
            computeExecutionCondition,
            escrowPaymentCondition
        } = conditions

        const accessService = ddo.findServiceByType('access')

        const payment = findServiceConditionByName(accessService, 'lockPayment')
        if (!payment) throw new Error('Payment Condition not found!')

        const lockPaymentConditionId = await lockPaymentCondition.generateIdHash(
            agreementId,
            ddo.id,
            escrowPaymentCondition.getAddress(),
            payment.parameters.find(p => p.name === '_tokenAddress').value as string,
            assetRewards.getAmounts(),
            assetRewards.getReceivers()
        )

        const computeExecutionConditionId = await computeExecutionCondition.generateIdHash(
            agreementId,
            ddo.id,
            consumer
        )

        const escrow = findServiceConditionByName(accessService, 'escrowPayment')
        if (!escrow) throw new Error('escrow Condition not found!')

        const escrowPaymentConditionId = await escrowPaymentCondition.generateIdHash(
            agreementId,
            ddo.id,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            escrowPaymentCondition.getAddress(),
            escrow.parameters.find(p => p.name === '_tokenAddress').value as string,
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
