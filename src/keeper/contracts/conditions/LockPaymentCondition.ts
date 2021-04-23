import { Condition } from './Condition.abstract'
import { didZeroX, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

export class LockPaymentCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<LockPaymentCondition> {
        return Condition.getInstance(config, 'LockPaymentCondition', LockPaymentCondition)
    }

    public hashValues(
        did: string,
        rewardAddress: string,
        tokenAddress: string,
        amounts: number[],
        receivers: string[]
    ) {
        const amountsString = amounts.map(v => String(v))
        return super.hashValues(
            didZeroX(did),
            zeroX(rewardAddress),
            zeroX(tokenAddress),
            amountsString,
            receivers
        )
    }

    public fulfill(
        agreementId: string,
        did: string,
        rewardAddress: string,
        tokenAddress: string,
        amounts: number[],
        receivers: string[],
        from?: string
    ) {
        const amountsString = amounts.map(v => String(v))
        return super.fulfill(
            agreementId,
            [
                didZeroX(did),
                zeroX(rewardAddress),
                zeroX(tokenAddress),
                amountsString,
                receivers
            ],
            from
        )
    }
}
