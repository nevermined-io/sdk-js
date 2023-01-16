import {
    Condition,
    ConditionContext,
    ProviderCondition
} from '../conditions/Condition.abstract'
import { zeroX, didZeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { Account } from '../../../nevermined'
import { TxParameters } from '../ContractBase'

export interface AaveCollateralWithdrawConditionContext extends ConditionContext {
    vaultAddress: string
    collateralAsset: string
}

export class AaveCollateralWithdrawCondition extends ProviderCondition<AaveCollateralWithdrawConditionContext> {
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
        txParams?: TxParameters
    ) {
        return super.fulfillPlain(
            agreementId,
            [didZeroX(did), ...[vaultAddress, collateralAsset].map(zeroX)],
            from,
            txParams
        )
    }
}
