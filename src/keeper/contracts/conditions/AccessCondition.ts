import { Condition } from './Condition.abstract'
import { zeroX, didZeroX, didPrefixed } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

export class AccessCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AccessCondition> {
        return Condition.getInstance(config, 'AccessCondition', AccessCondition)
    }

    public hashValues(did: string, grantee: string) {
        return super.hashValues(didZeroX(did), zeroX(grantee))
    }

    public fulfill(agreementId: string, did: string, grantee: string, from?: string) {
        return super.fulfill(agreementId, [didZeroX(did), grantee].map(zeroX), from)
    }

    public checkPermissions(grantee: string, did: string, from?: string) {
        return this.call<boolean>(
            'checkPermissions',
            [grantee, didZeroX(did)].map(zeroX),
            from
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
