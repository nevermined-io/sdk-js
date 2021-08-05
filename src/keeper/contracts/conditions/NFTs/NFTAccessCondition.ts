import { Condition } from '../Condition.abstract'
import { zeroX, didZeroX } from '../../../../utils'
import { InstantiableConfig } from '../../../../Instantiable.abstract'
import Account from '../../../../nevermined/Account'

export class NFTAccessCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFTAccessCondition> {
        return Condition.getInstance(config, 'NFTAccessCondition', NFTAccessCondition)
    }

    public hashValues(did: string, grantee: string) {
        return super.hashValues(didZeroX(did), zeroX(grantee))
    }

    public fulfill(agreementId: string, did: string, grantee: string, from?: Account) {
        return super.fulfill(agreementId, [didZeroX(did), grantee].map(zeroX), from)
    }
}
