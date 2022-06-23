import {
    Condition,
    ConditionContext,
    ConditionInstanceSmall,
    ConditionParameters
} from '../conditions/Condition.abstract'
import { zeroX, didZeroX } from '../../../utils/index'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'

export interface AaveBorrowConditionContext extends ConditionContext {
    vaultAddress: string
    assetToBorrow: string
    amountToBorrow: string
    interestRateMode: number
}

export class AaveBorrowCondition extends Condition<AaveBorrowConditionContext> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AaveBorrowCondition> {
        return Condition.getInstance(
            config,
            'AaveBorrowCondition',
            AaveBorrowCondition,
            true
        )
    }

    public params(
        did: string,
        vaultAddress: string,
        assetToBorrow: string,
        amount: string,
        interestRateMode: number
    ) {
        return super.params(
            didZeroX(did),
            zeroX(vaultAddress),
            zeroX(assetToBorrow),
            amount,
            interestRateMode
        )
    }

    public async paramsFromDDO({
        ddo,
        vaultAddress,
        assetToBorrow,
        amountToBorrow,
        interestRateMode
    }: AaveBorrowConditionContext) {
        return this.params(
            ddo.shortId(),
            vaultAddress,
            assetToBorrow,
            amountToBorrow,
            interestRateMode
        )
    }

    public fulfill(
        agreementId: string,
        did: string,
        vaultAddress: string,
        assetToBorrow: string,
        amount: string,
        interestRateMode: number,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfill(
            agreementId,
            [
                didZeroX(did),
                ...[vaultAddress, assetToBorrow].map(zeroX),
                amount,
                interestRateMode
            ],
            from,
            params
        )
    }
}
