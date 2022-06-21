import { Condition } from './Condition.abstract'
import { zeroX, didZeroX, didPrefixed } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'
import { EventOptions } from '../../../events/NeverminedEvent'
import { DDO } from '../../../ddo/DDO'
import { Service } from '../../../ddo/Service'
import AssetRewards from '../../../models/AssetRewards'

export class AccessCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AccessCondition> {
        return Condition.getInstance(config, 'AccessCondition', AccessCondition)
    }

    public params(did: string, grantee: string) {
        return super.params([didZeroX(did), zeroX(grantee)])
    }

    public async paramsFromDDO(ddo: DDO, _service: Service, _rewards: AssetRewards, creator: string) {
        return this.params(ddo.shortId(), creator)
    }

    public fulfill(
        agreementId: string,
        did: string,
        grantee: string,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfill(
            agreementId,
            [didZeroX(did), grantee].map(zeroX),
            from,
            params
        )
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
        const evOptions: EventOptions = {
            eventName: 'Fulfilled',
            methodName: 'getFulfilleds',
            filterJsonRpc: { _grantee: zeroX(consumer) },
            filterSubgraph: { where: { _grantee: zeroX(consumer) } },
            result: {
                _agreementId: true,
                _documentId: true,
                _grantee: true,
                _conditionId: true
            }
        }
        return (await this.events.getPastEvents(evOptions)).map(({ returnValues }) => ({
            did: didPrefixed(returnValues._documentId),
            agreementId: zeroX(returnValues._agreementId)
        }))
    }
}
