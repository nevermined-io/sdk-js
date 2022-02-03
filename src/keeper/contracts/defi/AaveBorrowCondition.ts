import { Condition } from '../conditions/Condition.abstract'
import { zeroX, didZeroX, didPrefixed } from '../../../utils/index'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'

export class AaveBorrowCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AaveBorrowCondition> {
        return Condition.getInstance(config, 'AaveBorrowCondition', AaveBorrowCondition)
    }

    public hashValues(
        did: string,
        vaultAddress: string,
        assetToBorrow: string,
        amount: number,
        interestRateMode: number
    ) {
        return super.hashValues(
            didZeroX(did),
            zeroX(vaultAddress),
            zeroX(assetToBorrow),
            amount,
            interestRateMode
        )
    }

    public fulfill(
        agreementId: string,
        did: string,
        vaultAddress: string,
        assetToBorrow: string,
        amount: number,
        interestRateMode: number,
        from?: Account,
    ) {
        return super.fulfill(
            agreementId,
            didZeroX(did),
            ...[vaultAddress, assetToBorrow].map(zeroX),
            amount,
            interestRateMode,
            from
        )
    }
}
