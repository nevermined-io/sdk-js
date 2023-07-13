import {
  ServiceAgreementTemplate,
  ServiceNFTAccess,
  ServiceType,
  ValidationParams,
} from '../../../ddo'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO, Nft1155Contract } from '../../../sdk'
import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nftAccessTemplateServiceAgreementTemplate } from './NFTAccessTemplate.serviceAgreementTemplate'
import { NFTAccessCondition, NFTHolderCondition } from '../conditions'
import { BigNumber } from '../../../utils'

export interface NFTAccessTemplateParams {
  holderAddress: string
  amount: BigNumber
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

  public params(holderAddress: string, amount?: BigNumber): NFTAccessTemplateParams {
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
    const service = ddo.findServiceByType(this.service())
    const limit = this.nevermined.keeper.conditions.nftHolderCondition.amountFromService(service)
    const contractAddress =
      this.nevermined.keeper.conditions.nftHolderCondition.nftContractFromService(service)
    const nftContract = await Nft1155Contract.getInstance(
      (this.nevermined.keeper as any).instanceConfig,
      contractAddress,
    )
    const balance = await nftContract.balance(params.consumer_address, params.did)
    return balance.gte(limit)
  }
}
