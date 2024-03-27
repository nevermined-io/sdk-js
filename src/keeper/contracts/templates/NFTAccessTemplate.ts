import {
  ServiceAgreementTemplate,
  ServiceNFTAccess,
  ServiceType,
  ValidationParams,
} from '@/sdk'
import { InstantiableConfig } from '@/Instantiable.abstract'
import {
  NvmAccount,
  DDO,
  NFTServiceAttributes,
  TxParameters,
} from '@/sdk'
import { AgreementTemplate } from '@/keeper/contracts/templates/AgreementTemplate.abstract'
import { BaseTemplate } from '@/keeper/contracts/templates/BaseTemplate.abstract'
import { NFTAccessCondition, NFTHolderCondition } from '@/keeper/contracts/conditions'
import { DynamicCreditsUnderLimit } from '@/sdk'
import { nftAccessCondition, nftHolderTemplate } from '@/keeper/contracts/templates/ConditionTemplates'
import { NeverminedNFT1155Type } from '@/types/GeneralTypes'

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
    return {
      contractName: 'NFTAccessTemplate',
      events: [
        {
          name: 'AgreementCreated',
          actorType: 'consumer',
          handler: {
            moduleName: 'nftAccessTemplate',
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
      conditions: [nftHolderTemplate(), nftAccessCondition()],
    }
  }

  public async process(
    params: ValidationParams,
    from: NvmAccount,
    txparams?: TxParameters,
  ): Promise<void> {
    await this.validateAgreement(
      params.agreement_id,
      params.did,
      await this.paramsGen(params),
      from,
      await this.extraGen(params),
      txparams,
    )
  }

  public async validateAgreement(
    agreement_id: string,
    did: string,
    params: NFTAccessTemplateParams,
    from: NvmAccount,
    extra: any = {},
    txparams?: TxParameters,
  ): Promise<void> {
    const ddo = await this.nevermined.assets.resolve(did)
    const metadataService = ddo.findServiceByType('metadata')
    const isNft1155Credit =
      metadataService.attributes.main.nftType.toString() ===
      NeverminedNFT1155Type.nft1155Credit.toString()
    if (isNft1155Credit) return
    return this.validateAgreement(agreement_id, did, params, from, extra, txparams)
  }

  public async accept(params: ValidationParams): Promise<boolean> {
    const ddo = await this.nevermined.assets.resolve(params.did)

    const metadataService = ddo.findServiceByType('metadata')
    const isNft1155Credit =
      metadataService.attributes.main.nftType.toString() ===
      NeverminedNFT1155Type.nft1155Credit.toString()

    // If is not a NFT Credit and have permissions, access is granted
    if (!isNft1155Credit) {
      if (
        await this.nevermined.keeper.conditions.nftAccessCondition.checkPermissions(
          params.consumer_address,
          params.did,
        )
      )
        return true
    }

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
    from: NvmAccount,
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

    const subscriptionOwner = await this.nevermined.assets.owner(ddo.id)
    const consumerIsOwner =
      params.consumer_address.toLowerCase() === subscriptionOwner.toLowerCase()

    if (consumerIsOwner) {
      // User calling is the asset owner so skipping track()
      return false
    }

    const nftAccessService = (
      params.service_index && params.service_index > 0
        ? ddo.findServiceByIndex(params.service_index)
        : ddo.findServiceByType(this.service())
    ) as ServiceNFTAccess

    const amount = NFTServiceAttributes.getCreditsToCharge(
      nftAccessService.attributes.main.nftAttributes,
    )

    const contractAddress = DDO.getNftContractAddressFromService(nftAccessService)

    const tokenId = DDO.getTokenIdFromService(nftAccessService) || ddo.id

    const nftContract = await this.nevermined.contracts.loadNft1155(contractAddress)

    const balance = await nftContract.balance(tokenId, params.consumer_address)
    if (balance < amount) {
      throw new DynamicCreditsUnderLimit(
        `Balance is under the number of required credits to be burned: ${balance} < ${amount}`,
      )
    }

    await nftContract.burnFromHolder(params.consumer_address, tokenId, amount, from, txparams)
    return true
  }
}
