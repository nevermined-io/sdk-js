import { Condition, ConditionContext } from '../conditions/Condition.abstract'
import { zeroX, didZeroX } from '../../../utils/index'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'

export interface AaveRepayConditionContext extends ConditionContext {
    vaultAddress: string
    assetToRepay: string
    amountToRepay: string
    interestRateMode: number
}

export class AaveRepayCondition extends Condition<AaveRepayConditionContext> {
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

    public params(
        did: string,
        vaultAddress: string,
        assetToRepay: string,
        amountToRepay: string,
        interestRateMode: number
    ) {
        return super.params(
            didZeroX(did),
            ...[vaultAddress, assetToRepay].map(zeroX),
            amountToRepay,
            interestRateMode
        )
    }

    public async paramsFromDDO({
        ddo,
        vaultAddress,
        assetToRepay,
        amountToRepay,
        interestRateMode
    }: AaveRepayConditionContext) {
        return this.params(
            ddo.shortId(),
            vaultAddress,
            assetToRepay,
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
