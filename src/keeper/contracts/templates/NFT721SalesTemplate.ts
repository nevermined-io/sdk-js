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
import { TransferNFT721Condition } from '../conditions/NFTs/TransferNFT721Condition'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { lockPaymentTemplate, transferNFT721Template, escrowTemplate } from './ConditionTemplates'

export interface NFT721SalesTemplateParams {
  consumerId: string
  expiration: number
}

export class NFT721SalesTemplate extends BaseTemplate<NFT721SalesTemplateParams, ServiceNFTSales> {
  public static async getInstance(config: InstantiableConfig): Promise<NFT721SalesTemplate> {
    return AgreementTemplate.getInstance(config, 'NFT721SalesTemplate', NFT721SalesTemplate, true)
  }

  public service(): ServiceType {
    return 'nft-sales'
  }
  public serviceEndpoint(): ServiceType | string {
    return 'nft-transfer'
  }

  public name(): string {
    return 'nft721SalesAgreement'
  }
  public description(): string {
    return 'Sales Agreement with NFT-721 token'
  }

  public params(consumerId: string, expiration = 0): NFT721SalesTemplateParams {
    return { consumerId, expiration }
  }
  public async paramsGen({
    consumer_address,
    expiration = 0,
  }: ValidationParams): Promise<NFT721SalesTemplateParams> {
    return this.params(consumer_address, expiration)
  }

  public lockConditionIndex(): number {
    return 0
  }

  public conditions(): [LockPaymentCondition, TransferNFT721Condition, EscrowPaymentCondition] {
    const { lockPaymentCondition, transferNft721Condition, escrowPaymentCondition } =
      this.nevermined.keeper.conditions
    return [lockPaymentCondition, transferNft721Condition, escrowPaymentCondition]
  }

  public async instanceFromDDO(
    agreementIdSeed: string,
    ddo: DDO,
    creator: string,
    parameters: NFT721SalesTemplateParams,
    serviceReference?: number,
  ): Promise<AgreementInstance<NFT721SalesTemplateParams>> {
    const { transferNft721Condition, lockPaymentCondition, escrowPaymentCondition } =
      this.nevermined.keeper.conditions

    const agreementId = await this.agreementId(agreementIdSeed, creator)
    const ctx = {
      ...this.standardContext(ddo, creator, serviceReference),
      ...parameters,
    }

    const lockPaymentConditionInstance = await lockPaymentCondition.instanceFromDDO(
      agreementId,
      ctx,
    )
    const transferConditionInstance = await transferNft721Condition.instanceFromDDO(
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
      contractName: 'NFT721SalesTemplate',
      events: [
        {
          name: 'AgreementCreated',
          actorType: 'consumer',
          handler: {
            moduleName: 'nft721SalesTemplate',
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
      conditions: [lockPaymentTemplate(), transferNFT721Template(), escrowTemplate()],
    }
  }
}
