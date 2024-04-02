import { AgreementTemplate } from '@/keeper/contracts/templates/AgreementTemplate.abstract'
import { BaseTemplate } from '@/keeper/contracts/templates/BaseTemplate.abstract'
import { InstantiableConfig } from '@/Instantiable.abstract'
import {
  nft721HolderTemplate,
  nftAccessCondition,
} from '@/keeper/contracts/templates/ConditionTemplates'
import { AgreementInstance } from '@/types/ContractTypes'
import { DDO } from '@/ddo/DDO'
import {
  ServiceNFTAccess,
  ValidationParams,
  ServiceType,
  ServiceAgreementTemplate,
} from '@/types/DDOTypes'
import { NFT721HolderCondition } from '../conditions/NFTs/NFT721HolderCondition'
import { NFTAccessCondition } from '../conditions/NFTs/NFTAccessCondition'

export interface NFT721AccessTemplateParams {
  holderAddress: string
  grantee: string
}

export class NFT721AccessTemplate extends BaseTemplate<
  NFT721AccessTemplateParams,
  ServiceNFTAccess
> {
  public async paramsGen({
    consumer_address,
  }: ValidationParams): Promise<NFT721AccessTemplateParams> {
    return this.params(consumer_address)
  }
  public static async getInstance(config: InstantiableConfig): Promise<NFT721AccessTemplate> {
    return AgreementTemplate.getInstance(config, 'NFT721AccessTemplate', NFT721AccessTemplate, true)
  }
  public name(): string {
    return 'nft721AccessAgreement'
  }
  public description(): string {
    return 'Access Agreement with NFT-721 token'
  }

  public service(): ServiceType {
    return 'nft-access'
  }
  public serviceEndpoint(): ServiceType {
    return 'nft-access'
  }

  public params(holderAddress: string): NFT721AccessTemplateParams {
    return { holderAddress, grantee: holderAddress }
  }

  public conditions(): [NFT721HolderCondition, NFTAccessCondition] {
    const { nft721HolderCondition, nftAccessCondition } = this.nevermined.keeper.conditions
    return [nft721HolderCondition, nftAccessCondition]
  }

  public async instanceFromDDO(
    agreementIdSeed: string,
    ddo: DDO,
    creator: string,
    parameters: NFT721AccessTemplateParams,
  ): Promise<AgreementInstance<NFT721AccessTemplateParams>> {
    const { nft721HolderCondition, nftAccessCondition } = this.nevermined.keeper.conditions

    const agreementId = await this.agreementId(agreementIdSeed, creator)
    const ctx = {
      ...this.standardContext(ddo, creator),
      ...parameters,
    }

    const holderConditionInstance = await nft721HolderCondition.instanceFromDDO(agreementId, ctx)
    const accessConditionInstance = await nftAccessCondition.instanceFromDDO(agreementId, ctx)

    return {
      instances: [holderConditionInstance, accessConditionInstance],
      list: parameters,
      agreementId,
    }
  }

  public getServiceAgreementTemplate(): ServiceAgreementTemplate {
    return {
      contractName: 'NFT721AccessTemplate',
      events: [
        {
          name: 'AgreementCreated',
          actorType: 'consumer',
          handler: {
            moduleName: 'nft721AccessTemplate',
            functionName: 'fulfillNFTHolderCondition',
            version: '0.1',
          },
        },
      ],
      fulfillmentOrder: ['nftHolder.fulfill', 'nftAccess.fulfill'],
      conditionDependency: {
        nftHolder: [],
        nftAccess: [],
      },
      conditions: [nft721HolderTemplate(), nftAccessCondition()],
    }
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

    const contractAddress =
      this.nevermined.keeper.conditions.nft721HolderCondition.nftContractFromService(service)

    const nftContract = await this.nevermined.contracts.loadNft721(contractAddress)
    return (await nftContract.balanceOf(params.consumer_address)) > 0n
  }
}
