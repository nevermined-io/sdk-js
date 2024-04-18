import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO } from '../../../ddo/DDO'
import { AgreementInstance } from '../../../types/ContractTypes'
import {
  ServiceNFTSales,
  ServiceType,
  ValidationParams,
  ServiceAgreementTemplate,
} from '../../../types/DDOTypes'
import { EscrowPaymentCondition } from '../conditions/EscrowPaymentCondition'
import { LockPaymentCondition } from '../conditions/LockPaymentCondition'
import { TransferNFTCondition } from '../conditions/NFTs/TransferNFTCondition'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { lockPaymentTemplate, transferNftTemplate, escrowTemplate } from './ConditionTemplates'

export interface NFTSalesTemplateParams {
  consumerId: string
  providerId: string
  nftAmount: bigint
  duration: number
  expiration: number
  nftTransfer: boolean
}

export class NFTSalesTemplate extends BaseTemplate<NFTSalesTemplateParams, ServiceNFTSales> {
  public static async getInstance(config: InstantiableConfig): Promise<NFTSalesTemplate> {
    return AgreementTemplate.getInstance(config, 'NFTSalesTemplate', NFTSalesTemplate)
  }

  public service(): ServiceType {
    return 'nft-sales'
  }

  public serviceEndpoint(): ServiceType | string {
    return 'nft-transfer'
  }

  public name(): string {
    return 'nft1155SalesAgreement'
  }
  public description(): string {
    return 'Sales Agreement with NFT-1155 token'
  }

  public params(
    consumerId: string,
    nftAmount: bigint,
    duration?: number,
    expiration?: number,
    providerId?: string,
    nftTransfer?: boolean,
  ): NFTSalesTemplateParams {
    return {
      consumerId,
      providerId: providerId as string,
      nftAmount,
      duration: duration as number,
      expiration: expiration as number,
      nftTransfer: nftTransfer as boolean,
    }
  }

  public async getParamsFromService(
    consumerId: string,
    nftAmount: bigint,
    service: ServiceNFTSales,
  ): Promise<NFTSalesTemplateParams> {
    const duration = DDO.getDurationFromService(service) || 0
    const expiration =
      duration > 0 ? Number(await this.nevermined.client.public.getBlockNumber()) + duration : 0
    const nftTransfer = DDO.getNFTTransferFromService(service)
    return {
      consumerId,
      nftAmount,
      duration,
      expiration,
      nftTransfer,
      providerId: '',
    }
  }

  public async paramsGen({
    consumer_address,
    nft_amount = 0n,
    duration = 0,
    expiration = 0,
  }: ValidationParams): Promise<NFTSalesTemplateParams> {
    return this.params(consumer_address, nft_amount, duration, expiration)
  }

  public lockConditionIndex(): number {
    return 0
  }

  public conditions(): [LockPaymentCondition, TransferNFTCondition, EscrowPaymentCondition] {
    const { lockPaymentCondition, transferNftCondition, escrowPaymentCondition } =
      this.nevermined.keeper.conditions
    return [lockPaymentCondition, transferNftCondition, escrowPaymentCondition]
  }

  public async instanceFromDDO(
    agreementIdSeed: string,
    ddo: DDO,
    creator: string,
    parameters: NFTSalesTemplateParams,
    serviceIndex?: number,
  ): Promise<AgreementInstance<NFTSalesTemplateParams>> {
    const { transferNftCondition, lockPaymentCondition, escrowPaymentCondition } =
      this.nevermined.keeper.conditions

    const agreementId = await this.agreementId(agreementIdSeed, creator)
    const ctx = {
      ...this.standardContext(ddo, creator, serviceIndex),
      ...parameters,
    }

    const lockPaymentConditionInstance = await lockPaymentCondition.instanceFromDDO(
      agreementId,
      ctx,
    )

    const transferConditionInstance = await transferNftCondition.instanceFromDDO(
      agreementId,
      ctx,
      lockPaymentConditionInstance,
    )

    const escrowPaymentConditionInstance = await escrowPaymentCondition.instanceFromDDO(
      agreementId,
      ctx,
      transferConditionInstance,
      lockPaymentConditionInstance,
    )

    return {
      instances: [
        lockPaymentConditionInstance,
        transferConditionInstance,
        escrowPaymentConditionInstance,
      ],
      list: parameters,
      agreementId,
    }
  }

  public getServiceAgreementTemplate(): ServiceAgreementTemplate {
    return {
      contractName: 'NFTSalesTemplate',
      events: [
        {
          name: 'AgreementCreated',
          actorType: 'consumer',
          handler: {
            moduleName: 'nftSalesTemplate',
            functionName: 'fulfillLockPaymentCondition',
            version: '0.1',
          },
        },
      ],
      fulfillmentOrder: ['lockPayment.fulfill', 'transferNFT.fulfill', 'escrowPayment.fulfill'],
      conditionDependency: {
        lockPayment: [],
        transferNFT: [],
        escrowPayment: ['lockPayment', 'transferNFT'],
      },
      conditions: [lockPaymentTemplate(), transferNftTemplate(), escrowTemplate()],
    }
  }
}
