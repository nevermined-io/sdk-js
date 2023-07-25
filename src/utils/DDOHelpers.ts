import {
  ServiceAgreementTemplateCondition,
  ServiceAgreementTemplateParameter,
  ServiceType,
} from '../ddo'
import { AssetPrice } from '../models'

// DDO Services including a sales process
const SALES_SERVICES = ['access', 'compute', 'nft-sales']
// Condition Names that are the final dependency for releasing the payment in a service agreement
const DEPENDENCIES_RELEASE_CONDITION = ['access', 'serviceExecution', 'transferNFT']

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
export function getConditionsByParams(
  serviceType: ServiceType,
  conditions: Readonly<ServiceAgreementTemplateCondition[]>,
  owner: string,
  assetPrice: AssetPrice = new AssetPrice(),
  did?: string,
  erc20TokenContract?: string,
  nftTokenContract?: string,
  nftHolder?: string,
  nftAmount = 1n,
  nftTransfer = false,
  duration = 0,
  fulfillAccessTimeout = 0,
  fulfillAccessTimelock = 0,
): ServiceAgreementTemplateCondition[] {
  return conditions
    .map((condition) => {
      if (
        DEPENDENCIES_RELEASE_CONDITION.includes(condition.name) &&
        SALES_SERVICES.includes(serviceType)
      ) {
        condition.timeout = fulfillAccessTimeout
        condition.timelock = fulfillAccessTimelock
      }
      return condition
    })
    .map((condition) => ({
      ...condition,
      parameters: condition.parameters.map((parameter) => ({
        ...getParameter(
          parameter,
          owner,
          assetPrice,
          did,
          erc20TokenContract,
          nftTokenContract,
          nftHolder,
          nftAmount,
          nftTransfer,
          duration,
        ),
      })),
    }))
}

function getParameter(
  parameter: ServiceAgreementTemplateParameter,
  owner: string,
  assetPrice: AssetPrice = new AssetPrice(),
  did?: string,
  erc20TokenContract?: string,
  nftTokenContract?: string,
  nftHolder?: string,
  nftAmount = 1n,
  nftTransfer = false,
  duration = 0,
): ServiceAgreementTemplateParameter {
  const getValue = (name) => {
    switch (name) {
      case 'amounts':
        return Array.from(assetPrice.getAmounts(), (v) => v.toString())
      case 'receivers':
        return assetPrice.getReceivers()
      case 'amount':
      case 'price':
        return String(assetPrice.getTotalPrice())
      case 'did':
      case 'assetId':
      case 'documentId':
      case 'documentKeyId':
        return did || '{DID}'
      case 'rewardAddress':
        return owner
      case 'numberNfts':
        return nftAmount && nftAmount >= 1 ? String(nftAmount) : '1'
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
