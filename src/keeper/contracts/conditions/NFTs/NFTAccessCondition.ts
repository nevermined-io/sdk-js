import {
  Condition,
  ConditionContext,
  ProviderCondition,
} from '@/keeper/contracts/conditions/Condition.abstract'
import { InstantiableConfig } from '@/Instantiable.abstract'
import { NvmAccount } from '@/models/NvmAccount'
import { TxParameters } from '@/models/Transactions'
import { didZeroX, zeroX } from '@/utils/ConversionTypeHelpers'

export interface NFTAccessConditionContext extends ConditionContext {
  grantee: string
}

export class NFTAccessCondition extends ProviderCondition<NFTAccessConditionContext> {
  public static async getInstance(config: InstantiableConfig): Promise<NFTAccessCondition> {
    return Condition.getInstance(config, 'NFTAccessCondition', NFTAccessCondition)
  }

  public params(did: string, grantee: string) {
    return super.params(didZeroX(did), zeroX(grantee))
  }

  public async paramsFromDDO({ ddo, grantee }: NFTAccessConditionContext) {
    return this.params(ddo.shortId(), grantee)
  }

  public fulfill(
    agreementId: string,
    did: string,
    grantee: string,
    from?: NvmAccount,
    txParams?: TxParameters,
  ) {
    return super.fulfillPlain(agreementId, [didZeroX(did), grantee].map(zeroX), from, txParams)
  }

  public checkPermissions(grantee: string, did: string, from?: NvmAccount) {
    return this.call<boolean>(
      'checkPermissions',
      [grantee, didZeroX(did)].map(zeroX),
      from && from.getId(),
    )
  }
}
