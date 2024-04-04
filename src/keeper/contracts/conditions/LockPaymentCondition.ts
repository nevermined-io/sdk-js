import { InstantiableConfig } from '@/Instantiable.abstract'
import { DDO } from '@/ddo/DDO'
import { NvmAccount } from '@/models/NvmAccount'
import { TxParameters } from '@/models/Transactions'
import { didZeroX, zeroX } from '@/utils/ConversionTypeHelpers'
import { ConsumerCondition, ConditionContext, Condition } from './Condition.abstract'

export class LockPaymentCondition extends ConsumerCondition<ConditionContext> {
  public static async getInstance(config: InstantiableConfig): Promise<LockPaymentCondition> {
    return Condition.getInstance(config, 'LockPaymentCondition', LockPaymentCondition)
  }

  public params(
    did: string,
    rewardAddress: string,
    tokenAddress: string,
    amounts: bigint[],
    receivers: string[],
  ) {
    const amountsString = amounts.map((v) => v.toString())

    return super.params(
      didZeroX(did),
      zeroX(rewardAddress),
      zeroX(tokenAddress),
      amountsString,
      receivers,
    )
  }

  public async paramsFromDDO({ ddo, service, price: rewards }: ConditionContext) {
    const payment = DDO.findServiceConditionByName(service, 'lockPayment')
    return this.params(
      ddo.shortId(),
      this.nevermined.keeper.conditions.escrowPaymentCondition.address,
      payment.parameters.find((p) => p.name === '_tokenAddress').value as string,
      rewards.getAmounts(),
      rewards.getReceivers(),
    )
  }

  public fulfill(
    agreementId: string,
    did: string,
    rewardAddress: string,
    tokenAddress: string,
    amounts: bigint[],
    receivers: string[],
    from?: NvmAccount,
    txParams?: TxParameters,
  ) {
    // const amountsString = amounts.map((v) => v.toString())
    return super.fulfillPlain(
      agreementId,
      [didZeroX(did), zeroX(rewardAddress), zeroX(tokenAddress), amounts, receivers],
      from,
      txParams,
    )
  }
}
