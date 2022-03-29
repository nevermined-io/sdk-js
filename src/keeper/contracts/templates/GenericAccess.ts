import { DDO } from '../../../ddo/DDO'
import AssetRewards from '../../../models/AssetRewards'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'
import { ServiceType } from '../../../ddo/Service'

export interface GenericAccess {
    createAgreementWithPaymentFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumerAddress: Account,
        serviceType?: ServiceType,
        provider?: Account,
        from?: Account,
        timeOuts?: number[],
        txParams?: TxParameters,
        observer?: (OrderProgressStep) => void
    ): Promise<string>
}
