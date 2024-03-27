import { Condition, ConditionContext, ProviderCondition } from '@/keeper/contracts'
import { zeroX, didZeroX } from '@/utils'
import { InstantiableConfig } from '@/Instantiable.abstract'
import { NvmAccount } from '@/models/NvmAccount'
import { TxParameters } from '@/models/Transactions'

export interface ComputeExecutionConditionContext extends ConditionContext {
  consumerId: string
}

export class ComputeExecutionCondition extends ProviderCondition<ComputeExecutionConditionContext> {
  public async paramsFromDDO({ ddo, consumerId }: ComputeExecutionConditionContext) {
    return this.params(ddo.shortId(), consumerId)
  }

  public static async getInstance(config: InstantiableConfig): Promise<ComputeExecutionCondition> {
    return Condition.getInstance(config, 'ComputeExecutionCondition', ComputeExecutionCondition)
  }

  public params(did: string, computeConsumer: string) {
    return super.params(didZeroX(did), zeroX(computeConsumer))
  }

  public fulfill(
    agreementId: string,
    did: string,
    computeConsumer: string,
    from?: NvmAccount,
    txParams?: TxParameters,
  ) {
    return super.fulfillPlain(
      agreementId,
      [didZeroX(did), computeConsumer].map(zeroX),
      from,
      txParams,
    )
  }

  public wasComputeTriggered(did: string, computeConsumer: string, from?: NvmAccount) {
    return this.call<boolean>(
      'wasComputeTriggered',
      [didZeroX(did), computeConsumer].map(zeroX),
      from && from.getId(),
    )
  }
}
