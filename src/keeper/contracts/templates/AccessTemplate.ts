import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { InstantiableConfig } from '@/Instantiable.abstract'
import { NvmAccount, DDO, ServiceAccess, ServiceType, ValidationParams } from '@/sdk'
import { AccessCondition, EscrowPaymentCondition, LockPaymentCondition } from '@/keeper/contracts/conditions'
import { lockPaymentTemplate, accessTemplate, escrowTemplate } from '@/keeper/contracts/templates/ConditionTemplates'

export interface AccessTemplateParams {
  type: 'access'
  consumerId: string
  creator: string
  serviceType: ServiceType
}

export class AccessTemplate extends BaseTemplate<AccessTemplateParams, ServiceAccess> {
  public async paramsGen({ consumer_address }: ValidationParams): Promise<AccessTemplateParams> {
    return {
      consumerId: consumer_address,
      serviceType: 'access',
      creator: consumer_address,
      type: 'access',
    }
  }
  public name(): string {
    return 'AccessAgreement'
  }
  public description(): string {
    return 'Access Agreement'
  }
  public static async getInstance(config: InstantiableConfig): Promise<AccessTemplate> {
    return AgreementTemplate.getInstance(config, 'AccessTemplate', AccessTemplate)
  }

  public service(): ServiceType {
    return 'access'
  }

  public getServiceAgreementTemplate() {
    return {
      contractName: 'AccessTemplate',
      events: [
        {
          name: 'AgreementCreated',
          actorType: 'consumer',
          handler: {
            moduleName: 'escrowAccessTemplate',
            functionName: 'fulfillLockPaymentCondition',
            version: '0.1',
          },
        },
      ],
      fulfillmentOrder: ['access.fulfill', 'lockPayment.fulfill', 'escrowPayment.fulfill'],
      conditionDependency: {
        lockPayment: [],
        access: [],
        escrowPayment: ['lockPayment', 'access'],
      },
      conditions: [lockPaymentTemplate(), accessTemplate(), escrowTemplate()],
    }
  }

  public params(consumer: NvmAccount, serviceType: ServiceType = 'access'): AccessTemplateParams {
    return {
      consumerId: consumer.getId(),
      serviceType,
      creator: consumer.getId(),
      type: 'access',
    }
  }

  public conditions(): [AccessCondition, LockPaymentCondition, EscrowPaymentCondition] {
    const { accessCondition, lockPaymentCondition, escrowPaymentCondition } =
      this.nevermined.keeper.conditions
    return [accessCondition, lockPaymentCondition, escrowPaymentCondition]
  }

  public async instanceFromDDO(
    agreementIdSeed: string,
    ddo: DDO,
    creator: string,
    parameters: AccessTemplateParams,
  ): Promise<AgreementInstance<AccessTemplateParams>> {
    const { accessCondition, lockPaymentCondition, escrowPaymentCondition } =
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
    const accessConditionInstance = await accessCondition.instanceFromDDO(agreementId, ctx)
    const escrowPaymentConditionInstance = await escrowPaymentCondition.instanceFromDDO(
      agreementId,
      ctx,
      accessConditionInstance,
      lockPaymentConditionInstance,
    )

    return {
      instances: [
        accessConditionInstance,
        lockPaymentConditionInstance,
        escrowPaymentConditionInstance,
      ],
      list: parameters,
      agreementId,
    }
  }

  // accept for asset owner
  public async accept(params: ValidationParams): Promise<boolean> {
    return this.nevermined.keeper.conditions.accessCondition.checkPermissions(
      params.consumer_address,
      params.did,
    )
  }
}
