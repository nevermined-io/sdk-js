import {
    Condition,
    ConditionContext,
    ProviderCondition
} from '../conditions/Condition.abstract'
import { zeroX, didZeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { Account } from '../../../nevermined'
import { TxParameters } from '../ContractBase'

export interface AaveCollateralDepositConditionContext extends ConditionContext {
    vaultAddress: string
    collateralAsset: string
    collateralAmount: string
    delegatedAsset: string
    delegatedAmount: string
    interestRateMode: number
}

export class AaveCollateralDepositCondition extends ProviderCondition<AaveCollateralDepositConditionContext> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AaveCollateralDepositCondition> {
        return Condition.getInstance(
            config,
            'AaveCollateralDepositCondition',
            AaveCollateralDepositCondition,
            true
        )
    }

    public params(
        did: string,
        vaultAddress: string,
        collateralAsset: string,
        collateralAmount: string,
        delegatedAsset: string,
        delegatedAmount: string,
        interestRateMode: number
    ) {
        return super.params(
            didZeroX(did),
            ...[vaultAddress, collateralAsset].map(zeroX),
            collateralAmount,
            zeroX(delegatedAsset),
            delegatedAmount,
            interestRateMode
        )
    }

    public async paramsFromDDO({
        ddo,
        vaultAddress,
        collateralAsset,
        collateralAmount,
        delegatedAsset,
        delegatedAmount,
        interestRateMode
    }: AaveCollateralDepositConditionContext) {
        return this.params(
            ddo.shortId(),
            vaultAddress,
            collateralAsset,
            collateralAmount,
            delegatedAsset,
            delegatedAmount,
            interestRateMode
        )
    }

    public fulfill(
        agreementId: string,
        did: string,
        vaultAddress: string,
        collateralAsset: string,
        collateralAmount: string,
        delegatedAsset: string,
        delegatedAmount: string,
        interestRateMode: number,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfillPlain(
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
