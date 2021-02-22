import { Condition } from './Condition.abstract'
import { zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

export class EscrowReward extends Condition {
    public static async getInstance(config: InstantiableConfig): Promise<EscrowReward> {
        return Condition.getInstance(config, 'EscrowReward', EscrowReward)
    }

    public hashValues(
        amounts: number[],
        receivers: string[],
        sender: string,
        lockCondition: string,
        releaseCondition: string
    ) {
        return super.hashValues(
            amounts, receivers, 
            ...[sender, lockCondition, releaseCondition].map(zeroX)
        )
    }

    public fulfill(
        agreementId: string,
        amounts: number[],
        receivers: string[],
        sender: string,
        lockCondition: string,
        releaseCondition: string,
        from?: string
    ) {
        return super.fulfill(
            agreementId,
            [amounts, receivers, ...[sender, lockCondition, releaseCondition].map(zeroX)],
            from
        )
    }
}
