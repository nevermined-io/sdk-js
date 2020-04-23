import { Condition } from './Condition.abstract'
import { zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

export class EscrowReward extends Condition {
    public static async getInstance(config: InstantiableConfig): Promise<EscrowReward> {
        return Condition.getInstance(config, 'EscrowReward', EscrowReward)
    }

    public hashValues(
        amount: number,
        receiver: string,
        sender: string,
        lockCondition: string,
        releaseCondition: string
    ) {
        return super.hashValues(
            amount,
            ...[receiver, sender, lockCondition, releaseCondition].map(zeroX)
        )
    }

    public fulfill(
        agreementId: string,
        amount: number,
        receiver: string,
        sender: string,
        lockCondition: string,
        releaseCondition: string,
        from?: string
    ) {
        return super.fulfill(
            agreementId,
            [amount, ...[receiver, sender, lockCondition, releaseCondition].map(zeroX)],
            from
        )
    }
}
