import { Condition, ConditionContext, ProviderCondition } from '../conditions/Condition.abstract'
import { zeroX, didZeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { Account } from '../../../nevermined'
import { TxParameters } from '../ContractBase'

export interface AaveRepayConditionContext extends ConditionContext {
  vaultAddress: string
  assetToRepay: string
  amountToRepay: string
  interestRateMode: number
}

export class AaveRepayCondition extends ProviderCondition<AaveRepayConditionContext> {
  public static async getInstance(config: InstantiableConfig): Promise<AaveRepayCondition> {
    return Condition.getInstance(config, 'AaveRepayCondition', AaveRepayCondition, true)
  }

  public params(
    did: string,
    vaultAddress: string,
    assetToRepay: string,
    amountToRepay: string,
    interestRateMode: number,
  ) {
    return super.params(
      didZeroX(did),
      ...[vaultAddress, assetToRepay].map(zeroX),
      amountToRepay,
      interestRateMode,
    )
  }

  public async paramsFromDDO({
    ddo,
    vaultAddress,
    assetToRepay,
    amountToRepay,
    interestRateMode,
  }: AaveRepayConditionContext) {
    return this.params(ddo.shortId(), vaultAddress, assetToRepay, amountToRepay, interestRateMode)
  }

  public fulfill(
    agreementId: string,
    did: string,
    vaultAddress: string,
    assetToRepay: string,
    amountToRepay: string,
    interestRateMode: number,
    from?: Account,
    txParams?: TxParameters,
  ) {
    return super.fulfillPlain(
      agreementId,
      [didZeroX(did), ...[vaultAddress, assetToRepay].map(zeroX), amountToRepay, interestRateMode],
      from,
      txParams,
    )
  }
}
