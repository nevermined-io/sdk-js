import { Condition } from '../conditions/Condition.abstract'
import { zeroX, didZeroX } from '../../../utils/index'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import BigNumber from 'bignumber.js'
import { TxParameters } from '../ContractBase'

export class AaveBorrowCondition extends Condition {
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

    public hashValues(
        did: string,
        vaultAddress: string,
        assetToBorrow: string,
        amount: BigNumber,
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
        amount: BigNumber,
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
