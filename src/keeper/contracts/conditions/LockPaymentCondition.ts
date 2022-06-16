import { Condition } from './Condition.abstract'
import { didZeroX, findServiceConditionByName, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'
import BigNumber from 'bignumber.js'
import { DDO } from '../../../ddo/DDO'
import { Service } from '../../../ddo/Service'
import AssetRewards from '../../../models/AssetRewards'

export class LockPaymentCondition extends Condition {
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
        const amountsString = amounts.map(v => v.toFixed())
        return {list: [
            didZeroX(did),
            zeroX(rewardAddress),
            zeroX(tokenAddress),
            amountsString,
            receivers
        ]}
    }

    public async paramsFromDDO(ddo: DDO, service: Service, rewards: AssetRewards) {
        const payment = findServiceConditionByName(service, 'lockPayment')
        return this.params(
            ddo.shortId(),
            this.nevermined.keeper.conditions.escrowPaymentCondition.getAddress(),
            payment.parameters.find(p => p.name === '_tokenAddress').value as string,
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
        const amountsString = amounts.map(v => v.toFixed())
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
