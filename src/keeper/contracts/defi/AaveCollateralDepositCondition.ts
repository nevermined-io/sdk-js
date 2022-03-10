import { Condition } from '../conditions/Condition.abstract'
import { zeroX, didZeroX } from '../../../utils/index'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'
import BigNumber from 'bignumber.js'

export class AaveCollateralDepositCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AaveCollateralDepositCondition> {
        return Condition.getInstance(
            config,
            'AaveCollateralDepositCondition',
            AaveCollateralDepositCondition
        )
    }

    public hashValues(
        did: string,
        vaultAddress: string,
        collateralAsset: string,
        collateralAmount: BigNumber,
        delegatedAsset: string,
        delegatedAmount: BigNumber,
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
        collateralAmount: BigNumber,
        delegatedAsset: string,
        delegatedAmount: BigNumber,
        interestRateMode: number,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfill(
            agreementId,
            [
                didZeroX(did),
                ...[vaultAddress, collateralAsset].map(zeroX),
                collateralAmount,
                zeroX(delegatedAsset),
                delegatedAmount,
                interestRateMode
            ],
            from,
            params
        )
    }
}
