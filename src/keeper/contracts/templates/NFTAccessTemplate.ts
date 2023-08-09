import {
  ServiceAgreementTemplate,
  ServiceNFTAccess,
  ServiceType,
  ValidationParams,
} from '../../../ddo'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { Account, DDO, NeverminedNFT1155Type, TxParameters } from '../../../sdk'
import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nftAccessTemplateServiceAgreementTemplate } from './NFTAccessTemplate.serviceAgreementTemplate'
import { NFTAccessCondition, NFTHolderCondition } from '../conditions'

export interface NFTAccessTemplateParams {
  holderAddress: string
  amount: bigint
  grantee: string
}

export class NFTAccessTemplate extends BaseTemplate<NFTAccessTemplateParams, ServiceNFTAccess> {
  public static async getInstance(config: InstantiableConfig): Promise<NFTAccessTemplate> {
    return AgreementTemplate.getInstance(config, 'NFTAccessTemplate', NFTAccessTemplate)
  }

  public service(): ServiceType {
    return 'nft-access'
  }
  public name(): string {
    return 'nft1155AccessAgreement'
  }
  public description(): string {
    return 'Access Agreement with NFT-1155 token'
  }

  public params(holderAddress: string, amount?: bigint): NFTAccessTemplateParams {
    return { holderAddress, amount, grantee: holderAddress }
  }
  public async paramsGen({ consumer_address }: ValidationParams): Promise<NFTAccessTemplateParams> {
    return this.params(consumer_address)
  }

  public conditions(): [NFTHolderCondition, NFTAccessCondition] {
    const { nftHolderCondition, nftAccessCondition } = this.nevermined.keeper.conditions
    return [nftHolderCondition, nftAccessCondition]
  }

  public async instanceFromDDO(
    agreementIdSeed: string,
    ddo: DDO,
    creator: string,
    parameters: NFTAccessTemplateParams,
  ): Promise<AgreementInstance<NFTAccessTemplateParams>> {
    const { nftHolderCondition, nftAccessCondition } = this.nevermined.keeper.conditions

    const agreementId = await this.agreementId(agreementIdSeed, creator)
    const ctx = {
      ...this.standardContext(ddo, creator),
      ...parameters,
    }

    const holderConditionInstance = await nftHolderCondition.instanceFromDDO(agreementId, ctx)
    const accessConditionInstance = await nftAccessCondition.instanceFromDDO(agreementId, ctx)

    return {
      instances: [holderConditionInstance, accessConditionInstance],
      list: parameters,
      agreementId,
    }
  }

  public getServiceAgreementTemplate(): ServiceAgreementTemplate {
    return { ...nftAccessTemplateServiceAgreementTemplate() }
  }

  public async accept(params: ValidationParams): Promise<boolean> {
    if (
      await this.nevermined.keeper.conditions.nftAccessCondition.checkPermissions(
        params.consumer_address,
        params.did,
      )
    ) {
      return true
    }

    const ddo = await this.nevermined.assets.resolve(params.did)
    const service =
      params.service_index && params.service_index > 0
        ? ddo.findServiceByIndex(params.service_index)
        : ddo.findServiceByType(this.service())

    const contractAddress = DDO.getNftContractAddressFromService(service as ServiceNFTAccess)
    const limit = this.nevermined.keeper.conditions.nftHolderCondition.amountFromService(service)

    const tokenId = DDO.getTokenIdFromService(service) || ddo.id

    const nftContract = await this.nevermined.contracts.loadNft1155(contractAddress)

    const balance = await nftContract.balance(tokenId, params.consumer_address)

    return balance >= limit
  }

  public async track(
    params: ValidationParams,
    from: Account,
    txparams?: TxParameters,
  ): Promise<boolean> {
    const ddo = await this.nevermined.assets.resolve(params.did)
    const metadataService = ddo.findServiceByType('metadata')

    const isNft1155Credit =
      metadataService.attributes.main.nftType.toString() ===
      NeverminedNFT1155Type.nft1155Credit.toString()
    if (!isNft1155Credit) {
      // Service is not NFT1155Credit, skipping track()
      return false
    }

    const nftAccessService =
      params.service_index && params.service_index > 0
        ? ddo.findServiceByIndex(params.service_index)
        : ddo.findServiceByType(this.service())

    const contractAddress = DDO.getNftContractAddressFromService(
      nftAccessService as ServiceNFTAccess,
    )

    const amount = DDO.getNftAmountFromService(nftAccessService)
    const tokenId = DDO.getTokenIdFromService(nftAccessService) || ddo.id

    const nftContract = await this.nevermined.contracts.loadNft1155(contractAddress)

    await nftContract.burnFromHolder(params.consumer_address, tokenId, amount, from, txparams)

    return true
  }
}
