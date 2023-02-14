import { DDO } from '../../../ddo'
import { Account, OrderProgressStep } from '../../../nevermined'
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
    observer?: (orderProgressStep: OrderProgressStep) => void,
  ): Promise<string>

  params(consumer: any, ...args): any
  contractName: string
}
