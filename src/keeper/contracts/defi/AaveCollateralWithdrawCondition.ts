import { Condition } from '../conditions/Condition.abstract'
import { zeroX, didZeroX } from '../../../utils/index'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'

export class AaveCollateralWithdrawCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AaveCollateralWithdrawCondition> {
        return Condition.getInstance(
            config,
            'AaveCollateralWithdrawCondition',
            AaveCollateralWithdrawCondition
        )
    }

    public hashValues(did: string, vaultAddress: string, collateralAsset: string) {
        return super.hashValues(
            didZeroX(did),
            ...[vaultAddress, collateralAsset].map(zeroX)
        )
    }

    public fulfill(
        agreementId: string,
        did: string,
        vaultAddress: string,
        collateralAsset: string,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfill(
            agreementId,
            [didZeroX(did), ...[vaultAddress, collateralAsset].map(zeroX)],
            from,
            params
        )
    }
}
