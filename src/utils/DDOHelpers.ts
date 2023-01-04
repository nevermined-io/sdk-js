import { DDO } from '../ddo/DDO'
import { ConditionType, Service, ServiceType } from '../ddo/Service'
import {
    ServiceAgreementTemplateCondition,
    ServiceAgreementTemplateParameter
} from '../ddo/ServiceAgreementTemplate'
import { AssetPrice } from '..'
import BigNumber from './BigNumber'

function fillParameterWithDDO(
    parameter: ServiceAgreementTemplateParameter,
    ddo: DDO,
    assetPrice: AssetPrice = new AssetPrice(),
    erc20TokenContract?: string,
    nftTokenContract?: string,
    nftHolder?: string,
    nftAmount: BigNumber = BigNumber.from(1),
    nftTransfer = false,
    duration = 0
): ServiceAgreementTemplateParameter {
    const getValue = name => {
        switch (name) {
            case 'amounts':
                return Array.from(assetPrice.getAmounts(), v => v.toString())
            case 'receivers':
                return assetPrice.getReceivers()
            case 'amount':
            case 'price':
                return String(assetPrice.getTotalPrice())
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
                return erc20TokenContract
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
 *
 * @param conditions - Conditions to fill.
 * @param ddo - DDO related to this conditions.
 * @param assetPrice -Rewards distribution
 * @param nftAmount - Number of nfts to handle
 * @param erc20TokenContract - Number of nfts to handle
 * @param nftTokenContract - Number of nfts to handle
 *
 * @returns Filled conditions.
 */
export function fillConditionsWithDDO(
    conditions: ServiceAgreementTemplateCondition[],
    ddo: DDO,
    assetPrice: AssetPrice = new AssetPrice(),
    erc20TokenContract?: string,
    nftTokenContract?: string,
    nftHolder?: string,
    nftAmount?: BigNumber,
    nftTransfer = false,
    duration = 0
): ServiceAgreementTemplateCondition[] {
    return conditions.map(condition => ({
        ...condition,
        parameters: condition.parameters.map(parameter => ({
            ...fillParameterWithDDO(
                parameter,
                ddo,
                assetPrice,
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

export function getAssetPriceFromDDOByService(
    ddo: DDO,
    service: ServiceType
): AssetPrice {
    return getAssetPriceFromService(ddo.findServiceByType(service))
}

export function setNFTRewardsFromDDOByService(
    ddo: DDO,
    serviceType: ServiceType,
    rewards: AssetPrice,
    holderAddress: string
) {
    setAssetPriceFromDDOByService(ddo, serviceType, rewards)
    const service = ddo.findServiceByType(serviceType)
    const transferCondition = findServiceConditionByName(service, 'transferNFT')
    if (!transferCondition) {
        return
    }
    const holder = transferCondition.parameters.find(p => p.name === '_nftHolder')
    holder.value = holderAddress
}

export function setAssetPriceFromDDOByService(
    ddo: DDO,
    serviceType: ServiceType,
    rewards: AssetPrice
) {
    const service = ddo.findServiceByType(serviceType)
    const escrowPaymentCondition = findServiceConditionByName(service, 'escrowPayment')
    if (!escrowPaymentCondition) {
        return
    }
    const amounts = escrowPaymentCondition.parameters.find(p => p.name === '_amounts')
    const receivers = escrowPaymentCondition.parameters.find(p => p.name === '_receivers')
    amounts.value = Array.from(rewards.getAmounts(), v => v.toString())
    receivers.value = rewards.getReceivers()
}

export function getAssetPriceFromService(service: Service): AssetPrice {
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
        rewardsMap.set(receivers[i], BigNumber.from(amounts[i]))

    return new AssetPrice(rewardsMap)
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

export function getNftAmountFromService(service: Service): BigNumber {
    const nftTransferCondition = findServiceConditionByName(service, 'transferNFT')
    return BigNumber.from(
        nftTransferCondition.parameters.find(p => p.name === '_numberNfts').value
    )
}
