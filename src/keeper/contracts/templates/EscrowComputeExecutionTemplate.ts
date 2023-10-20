import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { DDO, ServiceCompute, ServiceType, ValidationParams } from '../../../ddo'
import { InstantiableConfig } from '../../../Instantiable.abstract'

import { escrowComputeExecutionTemplateServiceAgreementTemplate } from './EscrowComputeExecutionTemplate.serviceAgreementTemplate'
import { Account } from '../../../sdk'
import {
  ComputeExecutionCondition,
  EscrowPaymentCondition,
  LockPaymentCondition,
} from '../conditions'

export interface EscrowComputeExecutionParams {
  consumerId: string
}

export class EscrowComputeExecutionTemplate extends BaseTemplate<
  EscrowComputeExecutionParams,
  ServiceCompute
> {
  public async paramsGen(params: ValidationParams): Promise<EscrowComputeExecutionParams> {
    return {
      consumerId: params.consumer_address,
    }
  }
  public static async getInstance(
    config: InstantiableConfig,
  ): Promise<EscrowComputeExecutionTemplate> {
    return AgreementTemplate.getInstance(
      config,
      'EscrowComputeExecutionTemplate',
      EscrowComputeExecutionTemplate,
    )
  }
  public name(): string {
    return 'EscrowComputeExecutionAgreement'
  }
  public description(): string {
    return 'Compute execution agreement'
  }

  public async providerConfig() {
    return {
      type: 'Azure',
      description: '',
      environment: {
        cluster: {
          type: 'Kubernetes',
          url: 'http://10.0.0.17/xxx',
        },
        supportedContainers: [
          {
            image: 'tensorflow/tensorflow',
            tag: 'latest',
            checksum: 'sha256:cb57ecfa6ebbefd8ffc7f75c0f00e57a7fa739578a429b6f72a0df19315deadc',
          },
          {
            image: 'tensorflow/tensorflow',
            tag: 'latest',
            checksum: 'sha256:cb57ecfa6ebbefd8ffc7f75c0f00e57a7fa739578a429b6f72a0df19315deadc',
          },
        ],
        supportedServers: [
          {
            serverId: '1',
            serverType: 'xlsize',
            price: '50',
            cpu: '16',
            gpu: '0',
            memory: '128gb',
            disk: '160gb',
            maxExecutionTime: 86400,
          },
          {
            serverId: '2',
            serverType: 'medium',
            price: '10',
            cpu: '2',
            gpu: '0',
            memory: '8gb',
            disk: '80gb',
            maxExecutionTime: 86400,
          },
        ],
      },
    }
  }

  public getServiceAgreementTemplate() {
    return { ...escrowComputeExecutionTemplateServiceAgreementTemplate() }
  }

  public service(): ServiceType {
    return 'compute'
  }

  public params(consumer: Account): EscrowComputeExecutionParams {
    return { consumerId: consumer.getId() }
  }

  public conditions(): [ComputeExecutionCondition, LockPaymentCondition, EscrowPaymentCondition] {
    const { computeExecutionCondition, lockPaymentCondition, escrowPaymentCondition } =
      this.nevermined.keeper.conditions
    return [computeExecutionCondition, lockPaymentCondition, escrowPaymentCondition]
  }

  public async instanceFromDDO(
    agreementIdSeed: string,
    ddo: DDO,
    creator: string,
    parameters: EscrowComputeExecutionParams,
  ): Promise<AgreementInstance<EscrowComputeExecutionParams>> {
    const { computeExecutionCondition, lockPaymentCondition, escrowPaymentCondition } =
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
    const computeConditionInstance = await computeExecutionCondition.instanceFromDDO(
      agreementId,
      ctx,
    )
    const escrowPaymentConditionInstance = await escrowPaymentCondition.instanceFromDDO(
      agreementId,
      ctx,
      computeConditionInstance,
      lockPaymentConditionInstance,
    )

    return {
      instances: [
        computeConditionInstance,
        lockPaymentConditionInstance,
        escrowPaymentConditionInstance,
      ],
      list: parameters,
      agreementId,
    }
  }
}
