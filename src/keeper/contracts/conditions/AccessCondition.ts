import { Condition, ConditionContext, ProviderCondition } from './Condition.abstract'
import { zeroX, didZeroX, didPrefixed } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { NvmAccount } from '../../../nevermined'
import { TxParameters } from '../ContractBase'
import { EventOptions } from '../../../events/NeverminedEvent'

export interface AccessConditionContext extends ConditionContext {
  creator: string
}

export class AccessCondition extends ProviderCondition<AccessConditionContext> {
  public static async getInstance(config: InstantiableConfig): Promise<AccessCondition> {
    return Condition.getInstance(config, 'AccessCondition', AccessCondition)
  }

  public params(did: string, grantee: string) {
    return super.params(didZeroX(did), zeroX(grantee))
  }

  public async paramsFromDDO({ ddo, creator }: AccessConditionContext) {
    return this.params(ddo.shortId(), creator)
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

  public async getGrantedDidByConsumer(
    consumer: string,
  ): Promise<{ did: string; agreementId: string }[]> {
    const evOptions: EventOptions = {
      eventName: 'Fulfilled',
      filterJsonRpc: { _grantee: zeroX(consumer) },
      filterSubgraph: { where: { _grantee: zeroX(consumer) } },
      result: {
        _agreementId: true,
        _documentId: true,
        _grantee: true,
        _conditionId: true,
      },
    }
    const events = await this.events.getPastEvents(evOptions)
    const values = events.map((e) => e.args || e)

    return values.map((v) => ({
      did: didPrefixed(v._documentId),
      agreementId: zeroX(v._agreementId),
    }))
  }
}
