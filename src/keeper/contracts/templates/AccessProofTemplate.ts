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
import { TxParameters } from '../ContractBase'

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
        from?: Account,
        params?: TxParameters
    ) {
        const service = ddo.findServiceByType('access-proof')
        const { _hash, _providerPub } = service.attributes.main
        const buyerPub: BabyjubPublicKey = keytransfer.makePublic(
            consumer.babyX,
            consumer.babyY
        )
        const providerPub: BabyjubPublicKey = keytransfer.makePublic(
            _providerPub[0],
            _providerPub[1]
        )
        return await this.createFullAgreement(
            ddo,
            assetRewards,
            consumer.getId(),
            _hash,
            buyerPub,
            providerPub,
            agreementId,
            from,
            params
        )
    }

    public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        hash: string,
        buyerPub: BabyjubPublicKey,
        providerPub: BabyjubPublicKey,
        creator: string,
        consumer: string
    ): Promise<any> {
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
            providerPub,
            creator,
            consumer
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
        agreementIdSeed: string = generateId(),
        from?: Account,
        params?: TxParameters
    ): Promise<string> {
        const {
            agreementId,
            accessConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        } = await this.createFullAgreementData(
            agreementIdSeed,
            ddo,
            assetRewards,
            hash,
            buyerPub,
            providerPub,
            from.getId(),
            consumer
        )

        await this.createAgreement(
            agreementIdSeed,
            ddo.shortId(),
            [accessConditionId[0], lockPaymentConditionId[0], escrowPaymentConditionId[0]],
            [0, 0, 0],
            [0, 0, 0],
            consumer,
            from,
            params
        )

        return zeroX(agreementId)
    }

    private async createFullAgreementData(
        agreementIdSeed: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        hash: string,
        buyerPub: BabyjubPublicKey,
        providerPub: BabyjubPublicKey,
        creator: string,
        consumer: string
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

        const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(agreementIdSeed, creator)
        const lockPaymentConditionId = await lockPaymentCondition.generateId2(
            agreementId,
            await lockPaymentCondition.hashValues(
                ddo.shortId(),
                escrowPaymentCondition.getAddress(),
                payment.parameters.find(p => p.name === '_tokenAddress').value as string,
                assetRewards.getAmounts(),
                assetRewards.getReceivers()
            )
        )

        const accessConditionId = await accessProofCondition.generateId2(
            agreementId,
            await accessProofCondition.hashValues(
                hash,
                buyerPub,
                providerPub
            )
        )

        const escrow = findServiceConditionByName(accessService, 'escrowPayment')
        if (!escrow) throw new Error('Escrow Condition not found!')

        const escrowPaymentConditionId = await escrowPaymentCondition.generateId2(
            agreementId,
            await escrowPaymentCondition.hashValues(
                ddo.shortId(),
                assetRewards.getAmounts(),
                assetRewards.getReceivers(),
                consumer,
                escrowPaymentCondition.getAddress(),
                escrow.parameters.find(p => p.name === '_tokenAddress').value as string,
                lockPaymentConditionId[1],
                accessConditionId[1]
            )
        )

        return {
            agreementId,
            accessConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        }
    }
}
