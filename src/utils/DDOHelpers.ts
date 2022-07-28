import BigNumber from 'bignumber.js'
import { DDO } from '../ddo/DDO'
import { ConditionType, Service, ServiceType } from '../ddo/Service'
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
    nftHolder?: string,
    nftAmount: number = 1,
    nftTransfer: boolean = false,
    duration: number = 0
): ServiceAgreementTemplateParameter {
    const getValue = name => {
        switch (name) {
            case 'amounts':
                return Array.from(assetRewards.getAmounts(), v => v.toFixed())
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
            case 'nftHolder':
                return nftHolder ? nftHolder : ''
            case 'nftTransfer':
                return String(nftTransfer)
            case 'duration':
                return String(duration)
        }

        return ''
    }
    const value = getValue(parameter.name.replace(/^_/, ''))

    return { ...parameter, value }
}

/**
 * Fill some static parameters that depends on the metadata.
 * @param  {ServiceAgreementTemplateCondition[]} conditions         Conditions to fill.
 * @param  {DDO}                                 ddo                DDO related to this conditions.
 * @param  {AssetRewards}                        assetRewards       Rewards distribution
 * @param  {number}                              nftAmount          Number of nfts to handle
 * @param  {string}                              erc20TokenContract Number of nfts to handle
 * @param  {string}                              nftTokenContract   Number of nfts to handle
 * @return {ServiceAgreementTemplateCondition[]}                    Filled conditions.
 */
export function fillConditionsWithDDO(
    conditions: ServiceAgreementTemplateCondition[],
    ddo: DDO,
    assetRewards: AssetRewards = new AssetRewards(),
    erc20TokenContract?: string,
    nftTokenContract?: string,
    nftHolder?: string,
    nftAmount?: number,
    nftTransfer: boolean = false,
    duration: number = 0
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
                nftHolder,
                nftAmount,
                nftTransfer,
                duration
            )
        }))
    }))
}

export function findServiceConditionByName(
    service: Service,
    name: ConditionType
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

export function setNFTRewardsFromDDOByService(
    ddo: DDO,
    serviceType: ServiceType,
    rewards: AssetRewards,
    holderAddress: string
) {
    setAssetRewardsFromDDOByService(ddo, serviceType, rewards)
    const service = ddo.findServiceByType(serviceType)
    const transferCondition = findServiceConditionByName(service, 'transferNFT')
    if (!transferCondition) {
        return
    }
    const holder = transferCondition.parameters.find(p => p.name === '_nftHolder')
    holder.value = holderAddress
}

export function setAssetRewardsFromDDOByService(
    ddo: DDO,
    serviceType: ServiceType,
    rewards: AssetRewards
) {
    const service = ddo.findServiceByType(serviceType)
    const escrowPaymentCondition = findServiceConditionByName(service, 'escrowPayment')
    if (!escrowPaymentCondition) {
        return
    }
    const amounts = escrowPaymentCondition.parameters.find(p => p.name === '_amounts')
    const receivers = escrowPaymentCondition.parameters.find(p => p.name === '_receivers')
    amounts.value = Array.from(rewards.getAmounts(), v => v.toFixed())
    receivers.value = rewards.getReceivers()
}

export function getAssetRewardsFromService(service: Service): AssetRewards {
    const escrowPaymentCondition = findServiceConditionByName(service, 'escrowPayment')
    if (!escrowPaymentCondition) {
        return
    }

    const amounts = escrowPaymentCondition.parameters.find(p => p.name === '_amounts')
        .value as string[]
    const receivers = escrowPaymentCondition.parameters.find(p => p.name === '_receivers')
        .value as string[]

    const rewardsMap = new Map<string, BigNumber>()

    for (let i = 0; i < amounts.length; i++)
        rewardsMap.set(receivers[i], new BigNumber(amounts[i]))

    return new AssetRewards(rewardsMap)
}

export function getDIDFromService(service: Service): string {
    const escrowPaymentCondition = findServiceConditionByName(service, 'escrowPayment')
    return ('did:nv:' +
        escrowPaymentCondition.parameters.find(p => p.name === '_did').value) as string
}

export function getNftHolderFromService(service: Service): string {
    const nftTransferCondition = findServiceConditionByName(service, 'transferNFT')
    return nftTransferCondition.parameters.find(p => p.name === '_nftHolder')
        .value as string
}

export function getNftAmountFromService(service: Service): number {
    const nftTransferCondition = findServiceConditionByName(service, 'transferNFT')
    return nftTransferCondition.parameters.find(p => p.name === '_numberNfts')
        .value as number
}
