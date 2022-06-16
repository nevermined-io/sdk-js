import { AgreementInstance, AgreementParameters, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO } from '../../../ddo/DDO'
import {
    findServiceConditionByName,
    generateId,
    getAssetRewardsFromService,
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
import BigNumber from 'bignumber.js'

export class AccessTemplate extends BaseTemplate {
    public static async getInstance(config: InstantiableConfig): Promise<AccessTemplate> {
        return AgreementTemplate.getInstance(config, 'AccessTemplate', AccessTemplate)
    }

    public async getServiceAgreementTemplate() {
        return accessTemplateServiceAgreementTemplate
    }

    public params(consumer: Account, from: Account, serviceType: ServiceType = 'access'): AgreementParameters {
        return {
            list: [consumer, from, serviceType]
        }
    }

    public async instanceFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        parameters: AgreementParameters
    ): Promise<AgreementInstance> {
        let consumer: string
        let creator: string
        let serviceType: ServiceType
        [consumer, creator, serviceType] = parameters.list as any

        const {
            accessCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = this.nevermined.keeper.conditions

        const accessService = ddo.findServiceByType('access')
        const assetRewards = getAssetRewardsFromService(accessService)

        const payment = findServiceConditionByName(accessService, 'lockPayment')
        if (!payment) throw new Error('Payment Condition not found!')

        const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(
            agreementIdSeed,
            creator
        )
        const lockPaymentConditionInstance = await lockPaymentCondition.instance(
            agreementId,
            await lockPaymentCondition.params(
                ddo.shortId(),
                escrowPaymentCondition.getAddress(),
                payment.parameters.find(p => p.name === '_tokenAddress').value as string,
                assetRewards.getAmounts(),
                assetRewards.getReceivers()
            )
        )

        const accessConditionInstance = await accessCondition.instance(
            agreementId,
            await accessCondition.params(ddo.shortId(), consumer)
        )

        const escrow = findServiceConditionByName(accessService, 'escrowPayment')
        if (!escrow) throw new Error('Escrow Condition not found!')

        const escrowPaymentConditionInstance = await escrowPaymentCondition.instance(
            agreementId,
            await escrowPaymentCondition.params(
                ddo.shortId(),
                assetRewards.getAmounts(),
                assetRewards.getReceivers(),
                consumer,
                escrowPaymentCondition.getAddress(),
                escrow.parameters.find(p => p.name === '_tokenAddress').value as string,
                lockPaymentConditionInstance.id,
                accessConditionInstance.id
            )
        )

        return {
            instances: [lockPaymentConditionInstance, accessConditionInstance, escrowPaymentConditionInstance],
            list: parameters.list,
            agreementId,
            rewardAddress: escrowPaymentCondition.getAddress(),
            tokenAddress: payment.parameters.find(p => p.name === '_tokenAddress').value as string,
            amounts: assetRewards.getAmounts(),
            receivers: assetRewards.getReceivers()
        }
    }

}
