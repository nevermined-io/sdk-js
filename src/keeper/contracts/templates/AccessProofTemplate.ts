import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import {
    findServiceConditionByName,
    generateId,
    OrderProgressStep,
    ZeroAddress,
    zeroX
} from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

import { accessTemplateServiceAgreementTemplate } from './AccessProofTemplate.serviceAgreementTemplate'
import AssetRewards from '../../../models/AssetRewards'
import Account from '../../../nevermined/Account'
import { BabyjubPublicKey } from '../../../models/KeyTransfer'
import KeyTransfer from '../../../utils/KeyTransfer'
import { TxParameters } from '../ContractBase'
import { GenericAccess } from './GenericAccess'
import { ServiceType } from '../../../ddo/Service'

export class AccessProofTemplate extends BaseTemplate implements GenericAccess {
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
        const keytransfer = new KeyTransfer()
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
        return !!(await this.createFullAgreement(
            ddo,
            assetRewards,
            consumer.getId(),
            _hash,
            buyerPub,
            providerPub,
            agreementId,
            from,
            params
        ))
    }

    public async createAgreementWithPaymentFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumerAddress: Account,
        serviceType?: ServiceType,
        provider?: Account,
        from?: Account,
        timeOuts?: number[],
        txParams?: TxParameters,
        observer?: (OrderProgressStep) => void
    ): Promise<boolean> {
        observer = observer ? observer : _ => {}

        const {
            ids,
            rewardAddress,
            tokenAddress,
            amounts,
            receivers
        } = await this.getAgreementDataFromDDO(
            agreementId,
            ddo,
            assetRewards,
            consumerAddress,
            serviceType
        )

        observer(OrderProgressStep.ApprovingPayment)
        await this.lockTokens(tokenAddress, amounts, from, txParams)
        observer(OrderProgressStep.ApprovedPayment)

        const totalAmount = AssetRewards.sumAmounts(amounts)
        const value =
            tokenAddress && tokenAddress.toLowerCase() === ZeroAddress
                ? totalAmount.toFixed()
                : undefined

        observer(OrderProgressStep.CreatingAgreement)
        const res = !!(await this.createAgreementAndPay(
            agreementId,
            ddo.shortId(),
            ids,
            [0, 0, 0],
            timeOuts ? timeOuts : [0, 0, 0],
            consumerAddress.getId(),
            1,
            rewardAddress,
            tokenAddress,
            amounts,
            receivers,
            from,
            { ...txParams, value }
        ))
        observer(OrderProgressStep.AgreementInitialized)

        return res
    }

    public async getAgreementDataFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: Account,
        serviceType: ServiceType = 'access-proof'
    ) {
        const { escrowPaymentCondition } = this.nevermined.keeper.conditions
        const keytransfer = new KeyTransfer()
        const service = ddo.findServiceByType(serviceType)
        const { _hash, _providerPub } = service.attributes.main
        const buyerPub: BabyjubPublicKey = keytransfer.makePublic(
            consumer.babyX,
            consumer.babyY
        )
        const providerPub: BabyjubPublicKey = keytransfer.makePublic(
            _providerPub[0],
            _providerPub[1]
        )

        const ids = await this.getAgreementIdsFromDDO(
            agreementId,
            ddo,
            assetRewards,
            _hash,
            buyerPub,
            providerPub
        )
        const accessService = ddo.findServiceByType(serviceType)
        const payment = findServiceConditionByName(accessService, 'lockPayment')
        if (!payment) throw new Error('Payment Condition not found!')

        return {
            ids,
            rewardAddress: escrowPaymentCondition.getAddress(),
            tokenAddress: payment.parameters.find(p => p.name === '_tokenAddress')
                .value as string,
            amounts: assetRewards.getAmounts(),
            receivers: assetRewards.getReceivers()
        }
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
        from?: Account,
        params?: TxParameters
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
            from,
            params
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
