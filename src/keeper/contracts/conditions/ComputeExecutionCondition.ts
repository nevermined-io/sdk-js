import { Condition } from './Condition.abstract'
import { zeroX, didZeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'

export class ComputeExecutionCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<ComputeExecutionCondition> {
        return Condition.getInstance(
            config,
            'ComputeExecutionCondition',
            ComputeExecutionCondition
        )
    }

    public hashValues(did: string, computeConsumer: string) {
        return super.hashValues(didZeroX(did), zeroX(computeConsumer))
    }

    public fulfill(
        agreementId: string,
        did: string,
        computeConsumer: string,
        from?: Account
    ) {
        return super.fulfill(
            agreementId,
            [didZeroX(did), computeConsumer].map(zeroX),
            from
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
