import { Condition, ConditionContext } from './Condition.abstract'
import { zeroX, didZeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'

export interface ComputeExecutionConditionContext extends ConditionContext {
    consumerId: string
}

export class ComputeExecutionCondition extends Condition<
    ComputeExecutionConditionContext
> {
    public async paramsFromDDO({ ddo, consumerId }: ComputeExecutionConditionContext) {
        return this.params(ddo.shortId(), consumerId)
    }

    public static async getInstance(
        config: InstantiableConfig
    ): Promise<ComputeExecutionCondition> {
        return Condition.getInstance(
            config,
            'ComputeExecutionCondition',
            ComputeExecutionCondition
        )
    }

    public params(did: string, computeConsumer: string) {
        return super.params(didZeroX(did), zeroX(computeConsumer))
    }

    public fulfill(
        agreementId: string,
        did: string,
        computeConsumer: string,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfillPlain(
            agreementId,
            [didZeroX(did), computeConsumer].map(zeroX),
            from,
            params
        )
    }

    public wasComputeTriggered(did: string, computeConsumer: string, from?: Account) {
        return this.call<boolean>(
            'wasComputeTriggered',
            [didZeroX(did), computeConsumer].map(zeroX),
            from && from.getId()
        )
    }
}
