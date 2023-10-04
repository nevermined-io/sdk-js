import {
  ServiceAgreementTemplate,
  ServiceNFTSales,
  ServiceType,
  ValidationParams,
} from '../../../ddo'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO } from '../../../sdk'
import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nftSalesTemplateServiceAgreementTemplate } from './NFTSalesTemplate.serviceAgreementTemplate'
import { EscrowPaymentCondition, LockPaymentCondition, TransferNFTCondition } from '../conditions'

export interface NFTSalesTemplateParams {
  consumerId: string
  providerId: string
  nftAmount: bigint
  duration: number
  expiration: number
  nftTransfer: boolean
}

export class NFTSalesTemplate extends BaseTemplate<NFTSalesTemplateParams, ServiceNFTSales> {
  public static getInstance(config: InstantiableConfig): Promise<NFTSalesTemplate> {
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
    return { consumerId, providerId, nftAmount, duration, expiration, nftTransfer }
  }

  public async getParamsFromService(
    consumerId: string,
    nftAmount: bigint,
    service: ServiceNFTSales,
  ): Promise<NFTSalesTemplateParams> {
    const duration = DDO.getDurationFromService(service) || 0
    const expiration = duration > 0 ? (await this.nevermined.web3.getBlockNumber()) + duration : 0
    const nftTransfer = DDO.getNFTTransferFromService(service)
    return {
      consumerId,
      nftAmount,
      duration,
      expiration,
      nftTransfer,
      providerId: undefined,
    }
  }

  public paramsGen({
    consumer_address,
    nft_amount,
    duration = 0,
    expiration = 0,
  }: ValidationParams): NFTSalesTemplateParams {
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
    return { ...nftSalesTemplateServiceAgreementTemplate() }
  }
}
