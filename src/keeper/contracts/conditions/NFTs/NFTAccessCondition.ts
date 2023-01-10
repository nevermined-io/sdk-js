import { Condition, ConditionContext, ProviderCondition } from '../Condition.abstract'
import { zeroX, didZeroX } from '../../../../utils'
import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { Account } from '../../../../nevermined'
import { TxParameters } from '../../ContractBase'

export interface NFTAccessConditionContext extends ConditionContext {
    grantee: string
}

export class NFTAccessCondition extends ProviderCondition<NFTAccessConditionContext> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFTAccessCondition> {
        return Condition.getInstance(config, 'NFTAccessCondition', NFTAccessCondition)
    }

    public params(did: string, grantee: string) {
        return super.params(didZeroX(did), zeroX(grantee))
    }

    public async paramsFromDDO({ ddo, grantee }: NFTAccessConditionContext) {
        return this.params(ddo.shortId(), grantee)
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
}
