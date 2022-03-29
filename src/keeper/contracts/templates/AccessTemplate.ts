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

import { accessTemplateServiceAgreementTemplate } from './AccessTemplate.serviceAgreementTemplate'
import AssetRewards from '../../../models/AssetRewards'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'
import { ServiceType } from '../../../ddo/Service'
import { GenericAccess } from './GenericAccess'

export class AccessTemplate extends BaseTemplate implements GenericAccess {
    public static async getInstance(config: InstantiableConfig): Promise<AccessTemplate> {
        return AgreementTemplate.getInstance(config, 'AccessTemplate', AccessTemplate)
    }

    public async getServiceAgreementTemplate() {
        return accessTemplateServiceAgreementTemplate
    }

    public async createAgreementFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: Account,
        from?: Account,
        params?: TxParameters
    ) {
        return await this.createFullAgreement(
            ddo,
            assetRewards,
            consumer.getId(),
            agreementIdSeed,
            from,
            params
        )
    }

    public async createAgreementWithPaymentFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumerAddress: Account,
        serviceType?: ServiceType,
        provider?: Account,
        from?: Account,
        timeOuts?: number[],
        txParams?: TxParameters,
        observer?: (OrderProgressStep) => void
    ): Promise<string> {
        observer = observer ? observer : _ => {}

        const {
            ids,
            agreementId,
            rewardAddress,
            tokenAddress,
            amounts,
            receivers
        } = await this.getAgreementDataFromDDO(
            agreementIdSeed,
            ddo,
            assetRewards,
            consumerAddress.getId(),
            from.getId(),
            serviceType
        )

        observer(OrderProgressStep.ApprovingPayment)
        await this.lockTokens(tokenAddress, amounts, from, txParams)
        observer(OrderProgressStep.ApprovedPayment)

        const totalAmount = amounts.reduce((a, b) => a + b, 0)
        const value =
            tokenAddress && tokenAddress.toLowerCase() === ZeroAddress
                ? String(totalAmount)
                : undefined

        observer(OrderProgressStep.CreatingAgreement)
        await this.createAgreementAndPay(
            agreementIdSeed,
            ddo.shortId(),
            ids.map(a => a[0]),
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
        )
        observer(OrderProgressStep.AgreementInitialized)

        return agreementId
    }

    public async getAgreementDataFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: string,
        creator: string,
        serviceType: ServiceType = 'access'
    ) {
        const { escrowPaymentCondition } = this.nevermined.keeper.conditions

        const { ids, agreementId } = await this.createFullAgreementData(
            agreementIdSeed,
            ddo,
            assetRewards,
            consumer,
            creator
        )
        const accessService = ddo.findServiceByType(serviceType)
        const payment = findServiceConditionByName(accessService, 'lockPayment')
        if (!payment) throw new Error('Payment Condition not found!')

        return {
            ids,
            agreementId,
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
        consumer: string,
        creator: string
    ): Promise<any> {
        const {
            accessConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        } = await this.createFullAgreementData(
            agreementId,
            ddo,
            assetRewards,
            consumer,
            creator
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
        agreementIdSeed: string = generateId(),
        from?: Account,
        params?: TxParameters
    ): Promise<string> {
        const {
            accessConditionId,
            lockPaymentConditionId,
            agreementId,
            escrowPaymentConditionId
        } = await this.createFullAgreementData(
            agreementIdSeed,
            ddo,
            assetRewards,
            consumer,
            from.getId()
        )

        await this.createAgreement(
            agreementIdSeed,
            ddo.shortId(),
            [
                accessConditionId[0],
                lockPaymentConditionId[0],
                escrowPaymentConditionId[0]
            ],
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
        consumer: string,
        creator: string
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

        const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(
            agreementIdSeed,
            creator
        )
        console.log('create', agreementId, "seed", agreementIdSeed, "creator", creator)
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

        const accessConditionId = await accessCondition.generateId2(
            agreementId,
            await accessCondition.hashValues(ddo.shortId(), consumer)
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
            ids: [accessConditionId, lockPaymentConditionId, escrowPaymentConditionId],
            agreementId,
            accessConditionId,
            lockPaymentConditionId,
            escrowPaymentConditionId
        }
    }
}
