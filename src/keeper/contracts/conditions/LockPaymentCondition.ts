import BigNumber from 'bignumber.js'
import { Condition } from './Condition.abstract'
import { didZeroX, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'

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
        const amountsString = amounts.map(v => (new BigNumber(v)).toString(10))
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
        from?: Account,
        params?: TxParameters
    ) {
        const amountsString = amounts.map(v => (new BigNumber(v)).toString(10))
        return super.fulfill(
            agreementId,
            [
                didZeroX(did),
                zeroX(rewardAddress),
                zeroX(tokenAddress),
                amountsString,
                receivers
            ],
            from,
            params
        )
    }
}
