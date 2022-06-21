import { Condition, ConditionInstance, ConditionParameters } from './Condition.abstract'
import { didZeroX, findServiceConditionByName, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'
import BigNumber from 'bignumber.js'
import { DDO } from '../../../ddo/DDO'
import { ServiceCommon } from '../../../ddo/Service'
import AssetRewards from '../../../models/AssetRewards'

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
        const amountsString = amounts.map(v => v.toFixed())
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
        ddo: DDO,
        service: ServiceCommon,
        rewards: AssetRewards,
        consumer: string,
        access: ConditionInstance, 
        lock: ConditionInstance
    ): Promise<ConditionParameters> {
        const escrow = findServiceConditionByName(service, 'escrowPayment')
        if (!escrow) throw new Error('Escrow Condition not found!')
        return this.params(
            ddo.shortId(),
            rewards.getAmounts(),
            rewards.getReceivers(),
            consumer,
            this.nevermined.keeper.conditions.escrowPaymentCondition.getAddress(),
            escrow.parameters.find(p => p.name === '_tokenAddress').value as string,
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
        const amountsString = amounts.map(v => v.toFixed())
        return super.fulfill(
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
