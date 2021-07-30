import { DDO } from '../ddo/DDO'
import { Service, ServiceType } from '../ddo/Service'
import {
    ServiceAgreementTemplateCondition,
    ServiceAgreementTemplateParameter
} from '../ddo/ServiceAgreementTemplate'
import AssetRewards from '../models/AssetRewards'

function fillParameterWithDDO(
    parameter: ServiceAgreementTemplateParameter,
    ddo: DDO,
    assetRewards: AssetRewards = new AssetRewards(),
    erc20TokenContract?: string,
    nftTokenContract?: string,
    nftAmount: number = 1
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
            case 'assetId':
            case 'documentId':
            case 'documentKeyId':
            case 'did':
                return ddo.shortId()
            case 'rewardAddress':
                return ddo.publicKey[0].owner
            case 'numberNfts':
                return String(nftAmount)
            case 'tokenAddress':
                return erc20TokenContract ? erc20TokenContract : ''
            case 'contract':
            case 'contractAddress':
                return nftTokenContract ? nftTokenContract : ''
        }

        return ''
    }
    const value = getValue(parameter.name.replace(/^_/, ''))

    return { ...parameter, value }
}

/**
 * Fill some static parameters that depends on the metadata.
 * @param  {ServiceAgreementTemplateCondition[]} conditions     Conditions to fill.
 * @param  {DDO}                                 ddo            DDO related to this conditions.
 * @param  {AssetRewards}                        assetRewards   Rewards distribution
 * @param  {number}                              nftAmount      Number of nfts to handle
 * @return {ServiceAgreementTemplateCondition[]}                Filled conditions.
 */
export function fillConditionsWithDDO(
    conditions: ServiceAgreementTemplateCondition[],
    ddo: DDO,
    assetRewards: AssetRewards = new AssetRewards(),
    erc20TokenContract?: string,
    nftTokenContract?: string,
    nftAmount?: number
): ServiceAgreementTemplateCondition[] {
    return conditions.map(condition => ({
        ...condition,
        parameters: condition.parameters.map(parameter => ({
            ...fillParameterWithDDO(
                parameter,
                ddo,
                assetRewards,
                erc20TokenContract,
                nftTokenContract,
                nftAmount
            )
        }))
    }))
}

export function findServiceConditionByName(
    service: Service,
    name: string
): ServiceAgreementTemplateCondition {
    return service.attributes.serviceAgreementTemplate.conditions.find(
        c => c.name === name
    )
}

export function getAssetRewardsFromDDOByService(
    ddo: DDO,
    service: ServiceType
): AssetRewards {
    return getAssetRewardsFromService(ddo.findServiceByType(service))
}

function getAssetRewardsFromService(service: Service): AssetRewards {
    const escrowPaymentCondition = findServiceConditionByName(service, 'escrowPayment')

    const amounts = escrowPaymentCondition.parameters.find(p => p.name === '_amounts')
        .value as string[]
    const receivers = escrowPaymentCondition.parameters.find(p => p.name === '_receivers')
        .value as string[]

    const rewardsMap = new Map<string, number>()

    for (let i = 0; i < amounts.length; i++)
        rewardsMap.set(receivers[i], Number(amounts[i]))

    return new AssetRewards(rewardsMap)
}
