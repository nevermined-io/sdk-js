import { Condition } from './Condition.abstract'
import { didZeroX, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

export class LockPaymentCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<LockPaymentCondition> {
        return Condition.getInstance(config, 'LockPaymentCondition', LockPaymentCondition)
    }

    public hashValues(did: string, rewardAddress: string, amount: string[], receivers: string[]) {
        return super.hashValues(didZeroX(did), zeroX(rewardAddress), amount, receivers)
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
