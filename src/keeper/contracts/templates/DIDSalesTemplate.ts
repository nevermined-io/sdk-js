import { InstantiableConfig } from '@/Instantiable.abstract'
import { DDO } from '@/ddo/DDO'
import { AgreementInstance } from '@/types/ContractTypes'
import { ValidationParams, ServiceType, ServiceAgreementTemplate } from '@/types/DDOTypes'
import { EscrowPaymentCondition } from '../conditions/EscrowPaymentCondition'
import { LockPaymentCondition } from '../conditions/LockPaymentCondition'
import { TransferDIDOwnershipCondition } from '../conditions/TransferDIDOwnershipCondition'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { lockPaymentTemplate, didTransferTemplate, escrowTemplate } from './ConditionTemplates'

export interface DIDSalesTemplateParams {
  receiverId: string
  consumerId: string
}

export class DIDSalesTemplate extends BaseTemplate<DIDSalesTemplateParams, any> {
  public async paramsGen(params: ValidationParams): Promise<DIDSalesTemplateParams> {
    return this.params(params.consumer_address)
  }
  public params(receiverId: string): DIDSalesTemplateParams {
    return { receiverId, consumerId: receiverId }
  }
  public name(): string {
    return 'didSalesAgreement'
  }
  public description(): string {
    return 'DID sales Agreement'
  }

  public conditions(): [
    LockPaymentCondition,
    TransferDIDOwnershipCondition,
    EscrowPaymentCondition,
  ] {
    const { lockPaymentCondition, transferDidOwnershipCondition, escrowPaymentCondition } =
      this.nevermined.keeper.conditions
    return [lockPaymentCondition, transferDidOwnershipCondition, escrowPaymentCondition]
  }

  public async instanceFromDDO(
    agreementIdSeed: string,
    ddo: DDO,
    creator: string,
    parameters: DIDSalesTemplateParams,
  ): Promise<AgreementInstance<DIDSalesTemplateParams>> {
    const { transferDidOwnershipCondition, lockPaymentCondition, escrowPaymentCondition } =
      this.nevermined.keeper.conditions

    const agreementId = await this.agreementId(agreementIdSeed, creator)
    const ctx = {
      ...this.standardContext(ddo, creator),
      ...parameters,
    }

    const lockPaymentConditionInstance = await lockPaymentCondition.instanceFromDDO(
      agreementId,
      ctx,
    )
    const transferConditionInstance = await transferDidOwnershipCondition.instanceFromDDO(
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
  public service(): ServiceType {
    throw new Error('Method not implemented.')
  }
  public static async getInstance(config: InstantiableConfig): Promise<DIDSalesTemplate> {
    return AgreementTemplate.getInstance(config, 'DIDSalesTemplate', DIDSalesTemplate)
  }

  public getServiceAgreementTemplate(): ServiceAgreementTemplate {
    return {
      contractName: 'DIDSalesTemplate',
      events: [
        {
          name: 'AgreementCreated',
          actorType: 'consumer',
          handler: {
            moduleName: 'didSalesTemplate',
            functionName: 'fulfillLockPaymentCondition',
            version: '0.1',
          },
        },
      ],
      fulfillmentOrder: ['lockPayment.fulfill', 'transferDID.fulfill', 'escrowPayment.fulfill'],
      conditionDependency: {
        lockPayment: [],
        transferDID: [],
        escrowPayment: ['lockPayment', 'transferNFT'],
      },
      conditions: [lockPaymentTemplate(), didTransferTemplate(), escrowTemplate()],
    }
  }
}
