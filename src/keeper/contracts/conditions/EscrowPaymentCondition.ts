import { Condition } from './Condition.abstract'
import { didZeroX, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'
import BigNumber from 'bignumber.js'

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
        amounts: BigNumber[],
        receivers: string[],
        sender: string,
        tokenAddress: string,
        lockCondition: string,
        releaseCondition: string
    ) {
        const amountsString = amounts.map(v => v.toFixed())
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
        amounts: BigNumber[],
        receivers: string[],
        lockPaymentAddress: string,
        tokenAddress: string,
        lockCondition: string,
        releaseCondition: string,
        from?: Account,
        txParams?: TxParameters
    ) {
        const amountsString = amounts.map(v => v.toFixed())
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
            from,
            txParams
        )
    }
}
