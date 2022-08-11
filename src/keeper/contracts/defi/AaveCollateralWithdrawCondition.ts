import { Condition, ConditionContext } from '../conditions/Condition.abstract'
import { zeroX, didZeroX } from '../../../utils/index'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'

export interface AaveCollateralWithdrawConditionContext extends ConditionContext {
    vaultAddress: string
    collateralAsset: string
}

export class AaveCollateralWithdrawCondition extends Condition<AaveCollateralWithdrawConditionContext> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AaveCollateralWithdrawCondition> {
        return Condition.getInstance(
            config,
            'AaveCollateralWithdrawCondition',
            AaveCollateralWithdrawCondition,
            true
        )
    }

    public params(did: string, vaultAddress: string, collateralAsset: string) {
        return super.params(didZeroX(did), ...[vaultAddress, collateralAsset].map(zeroX))
    }

    public async paramsFromDDO({
        ddo,
        vaultAddress,
        collateralAsset
    }: AaveCollateralWithdrawConditionContext) {
        return this.params(ddo.shortId(), vaultAddress, collateralAsset)
    }

    public fulfill(
        agreementId: string,
        did: string,
        vaultAddress: string,
        collateralAsset: string,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfillPlain(
            agreementId,
            [didZeroX(did), ...[vaultAddress, collateralAsset].map(zeroX)],
            from,
            params
        )
    }
}
