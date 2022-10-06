import {
    Condition,
    ConditionContext,
    ConditionInstanceSmall,
    ProviderCondition
} from './Condition.abstract'
import { didZeroX, findConditionParameter, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'
import BigNumber from '../../../utils/BigNumber'

export interface EscrowPaymentConditionContext extends ConditionContext {
    consumerId: string
}

export class EscrowPaymentCondition extends ProviderCondition<EscrowPaymentConditionContext> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<EscrowPaymentCondition> {
        return Condition.getInstance(
            config,
            'EscrowPaymentCondition',
            EscrowPaymentCondition
        )
    }

    public params(
        did: string,
        amounts: BigNumber[],
        receivers: string[],
        returnAddress: string,
        sender: string,
        tokenAddress: string,
        lockCondition: string,
        releaseCondition: string
    ) {
        const amountsString = amounts.map(v => v.toString())
        return super.params(
            didZeroX(did),
            amountsString,
            receivers,
            ...[returnAddress, sender, tokenAddress, lockCondition, releaseCondition].map(
                zeroX
            )
        )
    }

    public async paramsFromDDO(
        { ddo, service, rewards, consumerId }: EscrowPaymentConditionContext,
        access: ConditionInstanceSmall,
        lock: ConditionInstanceSmall
    ) {
        return this.params(
            ddo.shortId(),
            rewards.getAmounts(),
            rewards.getReceivers(),
            consumerId,
            this.nevermined.keeper.conditions.escrowPaymentCondition.getAddress(),
            findConditionParameter(service, 'escrowPayment', '_tokenAddress') as string,
            lock.id,
            access.id
        )
    }

    public fulfill(
        agreementId: string,
        did: string,
        amounts: BigNumber[],
        receivers: string[],
        returnAddress: string,
        lockPaymentAddress: string,
        tokenAddress: string,
        lockCondition: string,
        releaseCondition: string,
        from?: Account,
        txParams?: TxParameters
    ) {
        const amountsString = amounts.map(v => v.toString())
        return super.fulfillPlain(
            agreementId,
            [
                didZeroX(did),
                amountsString,
                receivers,
                ...[
                    returnAddress,
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
