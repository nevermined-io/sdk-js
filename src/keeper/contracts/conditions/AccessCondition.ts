import { Condition, ConditionContext } from './Condition.abstract'
import { zeroX, didZeroX, didPrefixed } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'
import { EventOptions } from '../../../events/NeverminedEvent'

export interface AccessConditionContext extends ConditionContext {
    creator: string
}

export class AccessCondition extends Condition<AccessConditionContext> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AccessCondition> {
        return Condition.getInstance(config, 'AccessCondition', AccessCondition)
    }

    public params(did: string, grantee: string) {
        return super.params(didZeroX(did), zeroX(grantee))
    }

    public async paramsFromDDO({ ddo, creator }: AccessConditionContext) {
        return this.params(ddo.shortId(), creator)
    }

    public fulfill(
        agreementId: string,
        did: string,
        grantee: string,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfillPlain(
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
