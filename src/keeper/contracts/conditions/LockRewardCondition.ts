import { Condition } from './Condition.abstract'
import { zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

export class LockRewardCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<LockRewardCondition> {
        return Condition.getInstance(config, 'LockRewardCondition', LockRewardCondition)
    }

    public hashValues(rewardAddress: string, amount: number | string) {
        return super.hashValues(zeroX(rewardAddress), String(amount))
    }

    public fulfill(
        agreementId: string,
        rewardAddress: string,
        amount: number | string,
        from?: string
    ) {
        return super.fulfill(agreementId, [zeroX(rewardAddress), String(amount)], from)
    }
}
