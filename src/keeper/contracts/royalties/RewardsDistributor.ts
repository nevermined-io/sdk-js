import ContractBase, { TxParameters } from '../ContractBase'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { didZeroX, zeroX } from '../../../utils'
import BigNumber from '../../../utils/BigNumber'

export class RewardsDistributor extends ContractBase {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<RewardsDistributor> {
        try {
            const instance: RewardsDistributor = new RewardsDistributor(
                'RewardsDistributor'
            )
            await instance.init(config, true)
            return instance
        } catch (e) {
            config.logger.warn('Cannot load optional contract RewardsDistributor')
        }
    }
    public setReceivers(
        did: string,
        addr: string[],
        from?: Account,
        params?: TxParameters
    ) {
        return this.sendFrom('setReceivers', [didZeroX(did), addr], from, params)
    }
    public claimReward(
        agreementId: string,
        did: string,
        amounts: BigNumber[],
        receivers: string[],
        returnAddress: string,
        lockPaymentAddress: string,
        tokenAddress: string,
        lockCondition: string,
        releaseConditions: string[],
        from?: Account,
        txParams?: TxParameters
    ) {
        const amountsString = amounts.map(v => v.toString())
        return this.sendFrom(
            'claimReward',
            [
                agreementId,
                didZeroX(did),
                amountsString,
                receivers,
                ...[returnAddress, lockPaymentAddress, tokenAddress, lockCondition].map(
                    zeroX
                ),
                releaseConditions.map(zeroX)
            ],
            from,
            txParams
        )
    }
}
