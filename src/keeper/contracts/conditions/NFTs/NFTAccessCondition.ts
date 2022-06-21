import { Condition, ConditionParameters } from '../Condition.abstract'
import { zeroX, didZeroX, findServiceConditionByName } from '../../../../utils'
import { InstantiableConfig } from '../../../../Instantiable.abstract'
import Account from '../../../../nevermined/Account'
import { TxParameters } from '../../ContractBase'
import { ServiceCommon } from '../../../../ddo/Service'
import AssetRewards from '../../../../models/AssetRewards'
import { DDO } from '../../../../sdk'

export class NFTAccessCondition extends Condition {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFTAccessCondition> {
        return Condition.getInstance(config, 'NFTAccessCondition', NFTAccessCondition)
    }

    public params(did: string, grantee: string) {
        return super.params(didZeroX(did), zeroX(grantee))
    }

    public async paramsFromDDO(ddo: DDO, _service: ServiceCommon, _rewards: AssetRewards, grantee: string): Promise<ConditionParameters> {
        return this.params(ddo.shortId(), grantee)
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
}
