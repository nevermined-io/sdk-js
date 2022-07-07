import { DDO } from '../../../ddo/DDO'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'

export interface GenericAccess {
    createAgreementWithPaymentFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        parameters: any,
        consumer: Account,
        from: Account,
        timeOuts?: number[],
        txParams?: TxParameters,
        observer?: (OrderProgressStep) => void
    ): Promise<string>

    params(consumer: any): any
}
