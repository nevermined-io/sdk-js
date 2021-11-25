import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import { findServiceConditionByName, generateId, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

import { accessTemplateServiceAgreementTemplate } from './AccessProofTemplate.serviceAgreementTemplate'
import AssetRewards from '../../../models/AssetRewards'
import Account from '../../../nevermined/Account'
import { BabyjubPublicKey } from '../../../models/KeyTransfer'
import KeyTransfer from '../../../utils/KeyTransfer'

const keytransfer = new KeyTransfer()

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

    public async createAgreementFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: Account,
        from?: Account
    ) {
        let service = ddo.findServiceByType('access-proof')
        let {_hash, _providerPub} = service.attributes.main
        let buyerPub: BabyjubPublicKey = keytransfer.makePublic(consumer.babyX, consumer.babyY)
        let providerPub: BabyjubPublicKey = keytransfer.makePublic(_providerPub[0], _providerPub[1])
        return !!(await this.createFullAgreement(
            ddo,
            assetRewards,
            consumer.getId(),
            _hash,
            buyerPub,
            providerPub,
            agreementId,
            from
        ))
    }

    public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        hash: string,
        buyerPub: BabyjubPublicKey,
        providerPub: BabyjubPublicKey
    ) {
        const {
            accessConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        } = await this.createFullAgreementData(
            agreementId,
            ddo,
            assetRewards,
            hash,
            buyerPub,
            providerPub
        )
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
        hash: string,
        buyerPub: BabyjubPublicKey,
        providerPub: BabyjubPublicKey,
        agreementId: string = generateId(),
        from?: Account
    ): Promise<string> {
        const {
            accessConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        } = await this.createFullAgreementData(
            agreementId,
            ddo,
            assetRewards,
            hash,
            buyerPub,
            providerPub
        )

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
        hash: string,
        buyerPub: BabyjubPublicKey,
        providerPub: BabyjubPublicKey
    ) {
        const { conditions } = this.nevermined.keeper

        const {
            accessProofCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = conditions

        const accessService = ddo.findServiceByType('access-proof')

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

        const accessConditionId = await accessProofCondition.generateIdHash(
            agreementId,
            hash,
            buyerPub,
            providerPub
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
