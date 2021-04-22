import { Condition } from './Condition.abstract'
import { didZeroX, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

export class EscrowPaymentCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<EscrowPaymentCondition> {
        return Condition.getInstance(
            config,
            'EscrowPaymentCondition',
            EscrowPaymentCondition
        )
    }

    public hashValues(
        did: string,
        amounts: number[],
        receivers: string[],
        sender: string,
        tokenAddress: string,
        lockCondition: string,
        releaseCondition: string
    ) {
        const amountsString = amounts.map(v => String(v))
        return super.hashValues(
            didZeroX(did),
            amountsString,
            receivers,
            ...[sender, tokenAddress, lockCondition, releaseCondition].map(zeroX)
        )
    }

    public fulfill(
        agreementId: string,
        did: string,
        amounts: number[],
        receivers: string[],
        lockPaymentAddress: string,
        tokenAddress: string,
        lockCondition: string,
        releaseCondition: string,
        from?: string
    ) {
        const amountsString = amounts.map(v => String(v))
        return super.fulfill(
            agreementId,
            [
                didZeroX(did),
                amountsString,
                receivers,
                ...[
                    lockPaymentAddress,
                    tokenAddress,
                    lockCondition,
                    releaseCondition
                ].map(zeroX)
            ],
            from
        )
    }
}
