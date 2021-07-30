import { Condition } from './Condition.abstract'
import { zeroX, didZeroX, didPrefixed } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'

export class AccessCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AccessCondition> {
        return Condition.getInstance(config, 'AccessCondition', AccessCondition)
    }

    public hashValues(did: string, grantee: string) {
        return super.hashValues(didZeroX(did), zeroX(grantee))
    }

    public fulfill(agreementId: string, did: string, grantee: string, from?: Account) {
        return super.fulfill(agreementId, [didZeroX(did), grantee].map(zeroX), from)
    }

    public checkPermissions(grantee: string, did: string, from?: Account) {
        return this.call<boolean>(
            'checkPermissions',
            [grantee, didZeroX(did)].map(zeroX),
            from && from.getId()
        )
    }

    public async getGrantedDidByConsumer(
        consumer: string
    ): Promise<{ did: string; agreementId: string }[]> {
        return (
            await this.getPastEvents('Fulfilled', {
                _grantee: zeroX(consumer)
            })
        ).map(({ returnValues }) => ({
            did: didPrefixed(returnValues._documentId),
            agreementId: zeroX(returnValues._agreementId)
        }))
    }
}
