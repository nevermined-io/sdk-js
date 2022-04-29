import { Condition } from '../conditions/Condition.abstract'
import { zeroX, didZeroX } from '../../../utils/index'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import BigNumber from 'bignumber.js'
import { TxParameters } from '../ContractBase'

export class AaveRepayCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AaveRepayCondition> {
        return Condition.getInstance(
            config,
            'AaveRepayCondition',
            AaveRepayCondition,
            true
        )
    }

    public hashValues(
        did: string,
        vaultAddress: string,
        assetToRepay: string,
        amountToRepay: string,
        interestRateMode: number
    ) {
        return super.hashValues(
            didZeroX(did),
            ...[vaultAddress, assetToRepay].map(zeroX),
            amountToRepay,
            interestRateMode
        )
    }

    public fulfill(
        agreementId: string,
        did: string,
        vaultAddress: string,
        assetToRepay: string,
        amountToRepay: string,
        interestRateMode: number,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfill(
            agreementId,
            [
                didZeroX(did),
                ...[vaultAddress, assetToRepay].map(zeroX),
                amountToRepay,
                interestRateMode
            ],
            from,
            params
        )
    }
}
