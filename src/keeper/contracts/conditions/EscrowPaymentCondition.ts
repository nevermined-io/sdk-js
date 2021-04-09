import { Condition } from './Condition.abstract'
import { didZeroX, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

export class EscrowPaymentCondition extends Condition {
    public static async getInstance(config: InstantiableConfig): Promise<EscrowPaymentCondition> {
        return Condition.getInstance(config, 'EscrowPaymentCondition', EscrowPaymentCondition)
    }

    public hashValues(
        did: string,
        amounts: number[],
        receivers: string[],
        sender: string,
        lockCondition: string,
        releaseCondition: string
    ) {
        return super.hashValues(
            didZeroX(did), amounts, receivers,
            ...[sender, lockCondition, releaseCondition].map(zeroX)
        )
    }

    public fulfill(
        agreementId: string,
        did: string,
        amounts: number[],
        receivers: string[],
        lockPaymentAddress: string,
        lockCondition: string,
        releaseCondition: string,
        from?: string
    ) {
        const amountsString = amounts.map(v => String(v))
        return super.fulfill(
            agreementId,
            [didZeroX(did), amountsString, receivers, ...[lockPaymentAddress, lockCondition, releaseCondition].map(zeroX)],
            from
        )
    }
}
