import { DDO } from '../ddo/DDO'
import { Service } from '../ddo/Service'
import {
    ServiceAgreementTemplateCondition,
    ServiceAgreementTemplateParameter
} from '../ddo/ServiceAgreementTemplate'
import AssetRewards from '../models/AssetRewards'
// import { Service } from './Service'

function fillParameterWithDDO(
    parameter: ServiceAgreementTemplateParameter,
    ddo: DDO,
    assetRewards: AssetRewards=new AssetRewards()
): ServiceAgreementTemplateParameter {
    const getValue = name => {
        switch (name) {
            case 'amounts':
                return Array.from(assetRewards.getAmounts(), v => String(v))
            case 'receivers':
                return assetRewards.getReceivers()
            case 'amount':
            case 'price':
                return String(assetRewards.getTotalPrice())
                // return String(ddo.findServiceByType('metadata').attributes.main.price)
            case 'assetId':
            case 'documentId':
            case 'documentKeyId':
                return ddo.shortId()
            case 'rewardAddress':
                return ddo.publicKey[0].owner
        }

        return ''
    }
    const value = getValue(parameter.name.replace(/^_/, ''))

    return { ...parameter, value }
}

/**
 * Fill some static parameters that depends on the metadata.
 * @param  {ServiceAgreementTemplateCondition[]} conditions Conditions to fill.
 * @param  {DDO}                                 ddo        DDO related to this conditions.
 * @param  {AssetRewards}                      assetRewards Rewards distribution
 * @return {ServiceAgreementTemplateCondition[]}            Filled conditions.
 */
export function fillConditionsWithDDO(
    conditions: ServiceAgreementTemplateCondition[],
    ddo: DDO,
    assetRewards: AssetRewards=new AssetRewards()
): ServiceAgreementTemplateCondition[] {
    return conditions.map(condition => ({
        ...condition,
        parameters: condition.parameters.map(parameter => ({
            ...fillParameterWithDDO(parameter, ddo, assetRewards)
        }))
    }))
}

function findServiceConditionByName(
    service: Service,
    name: string
): ServiceAgreementTemplateCondition {
    return service.attributes.serviceAgreementTemplate
                .conditions.find(c => c.name === name)
}

export function getLockPaymentTotalAmount(
    ddo: DDO,
    index: number
): string {

    try {
        const lockPaymentCondition = findServiceConditionByName(
            ddo.findServiceById(index), 'lockPayment')
        return String(
            lockPaymentCondition.parameters.find(p => p.name === '_amount').value)
    } catch (error) {
        return "0"
    }
}

export function getAssetRewardsFromDDO(
    ddo: DDO,
    index: number
): AssetRewards {

    try {
        const escrowPaymentCondition = findServiceConditionByName(
            ddo.findServiceById(index), 'escrowPayment')
        const amounts = escrowPaymentCondition.parameters.find(p => p.name === '_amounts').value as string[]
        const receivers = escrowPaymentCondition.parameters.find(p => p.name === '_receivers').value as string[]

        const rewardsMap = new Map()
        let i = 0
        for (i=0; i<amounts.length; i++)
            rewardsMap.set(receivers[i], amounts[i])
        return new AssetRewards(rewardsMap)
    // TODO: Let the error propagate
    } catch (error) {
        return new AssetRewards()
    }

}