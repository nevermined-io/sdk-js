import { Condition, ConditionParameters } from './Condition.abstract'
import { zeroX, didZeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'
import { DDO } from '../../../ddo/DDO'
import { ServiceCommon } from '../../../ddo/Service'
import AssetRewards from '../../../models/AssetRewards'

export class ComputeExecutionCondition extends Condition {

    public async paramsFromDDO(ddo: DDO, _service: ServiceCommon, _rewards: AssetRewards, consumer: string): Promise<ConditionParameters> {
        return this.params(ddo.shortId(), consumer)
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
        return super.fulfill(
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
