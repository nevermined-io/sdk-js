import { InstantiableConfig } from '@/Instantiable.abstract'
import { DDO, ServiceAgreementTemplate, ServiceType, ValidationParams } from '@/sdk'
import { AgreementTemplate } from '@/keeper/contracts/templates/AgreementTemplate.abstract'
import { BaseTemplate } from '@/keeper/contracts/templates/BaseTemplate.abstract'
import {
  EscrowPaymentCondition,
  LockPaymentCondition,
  TransferDIDOwnershipCondition,
} from '@/keeper/contracts/conditions'
import { lockPaymentTemplate, didTransferTemplate, escrowTemplate } from '@/keeper/contracts/templates/ConditionTemplates'

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
