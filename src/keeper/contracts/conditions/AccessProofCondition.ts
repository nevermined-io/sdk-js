import { Condition } from './Condition.abstract'
import { zeroX, didZeroX, didPrefixed } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { BabyjubPublicKey, MimcCipher } from '../../../models/KeyTransfer'

export class AccessProofCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AccessProofCondition> {
        return Condition.getInstance(config, 'AccessProofCondition', AccessProofCondition)
    }

    public hashValues(
        hash: string,
        grantee: BabyjubPublicKey,
        provider: BabyjubPublicKey
    ) {
        return super.hashValues(zeroX(hash), grantee.param(), provider.param())
    }

    public fulfill(
        agreementId: string,
        did: string,
        grantee: BabyjubPublicKey,
        provider: BabyjubPublicKey,
        cipher: MimcCipher,
        proof: string,
        from?: Account
    ) {
        return super.fulfill(
            agreementId,
            [
                didZeroX(did),
                grantee.param(),
                provider.param(),
                cipher.param(),
                zeroX(proof)
            ],
            from
        )
    }
}
