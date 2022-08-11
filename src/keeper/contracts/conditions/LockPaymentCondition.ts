import { Condition, ConditionContext } from './Condition.abstract'
import { didZeroX, findServiceConditionByName, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'
import BigNumber from '../../../utils/BigNumber'

export class LockPaymentCondition extends Condition<ConditionContext> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<LockPaymentCondition> {
        return Condition.getInstance(config, 'LockPaymentCondition', LockPaymentCondition)
    }

    public params(
        did: string,
        rewardAddress: string,
        tokenAddress: string,
        amounts: BigNumber[],
        receivers: string[]
    ) {
        const amountsString = amounts.map((v) => v.toString())

        return super.params(
            didZeroX(did),
            zeroX(rewardAddress),
            zeroX(tokenAddress),
            amountsString,
            receivers
        )
    }

    public async paramsFromDDO({ ddo, service, rewards }: ConditionContext) {
        const payment = findServiceConditionByName(service, 'lockPayment')
        return this.params(
            ddo.shortId(),
            this.nevermined.keeper.conditions.escrowPaymentCondition.getAddress(),
            payment.parameters.find((p) => p.name === '_tokenAddress').value as string,
            rewards.getAmounts(),
            rewards.getReceivers()
        )
    }

    public fulfill(
        agreementId: string,
        did: string,
        rewardAddress: string,
        tokenAddress: string,
        amounts: BigNumber[],
        receivers: string[],
        from?: Account,
        params?: TxParameters
    ) {
        const amountsString = amounts.map((v) => v.toString())
        return super.fulfillPlain(
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
