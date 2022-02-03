import { Condition } from '../conditions/Condition.abstract'
import { zeroX, didZeroX, didPrefixed } from '../../../utils/index'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'

export class AaveRepayCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AaveRepayCondition> {
        return Condition.getInstance(config, 'AaveRepayCondition', AaveRepayCondition)
    }

    public hashValues(
        did: string,
        vaultAddress: string,
        assetToRepay: string,
        amountToRepay: number,
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
        amountToRepay: number,
        interestRateMode: number,
        from?: Account,
    ) {
        return super.fulfill(
            agreementId,
            didZeroX(did),
            ...[vaultAddress, assetToRepay].map(zeroX),
            amountToRepay,
            interestRateMode,
            from
        )
    }
}
