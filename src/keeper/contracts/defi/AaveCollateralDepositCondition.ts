import { Condition } from '../conditions/Condition.abstract'
import { zeroX, didZeroX, didPrefixed } from '../../../utils/index'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'

export class AaveCollateralDepositCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AaveCollateralDepositCondition> {
        return Condition.getInstance(config, 'AaveCollateralDepositCondition', AaveCollateralDepositCondition)
    }

    public hashValues(
        did: string,
        vaultAddress: string,
        collateralAsset: string,
        collateralAmount: number,
        delegatedAsset: string,
        delegatedAmount: number,
        interestRateMode: number
    ) {
        return super.hashValues(
            didZeroX(did),
            ...[vaultAddress, collateralAsset].map(zeroX),
            collateralAmount,
            zeroX(delegatedAsset),
            delegatedAmount,
            interestRateMode
        )
    }

    public fulfill(
        agreementId: string,
        did: string,
        vaultAddress: string,
        collateralAsset: string,
        collateralAmount: number,
        delegatedAsset: string,
        delegatedAmount: number,
        interestRateMode: number,
        from?: Account,
    ) {
        return super.fulfill(
            agreementId,
            didZeroX(did),
            ...[vaultAddress, collateralAsset].map(zeroX),
            collateralAmount,
            zeroX(delegatedAsset),
            delegatedAmount,
            interestRateMode,
            from
        )
    }
}
