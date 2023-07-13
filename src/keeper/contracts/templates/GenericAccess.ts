import { DDO, ServiceType } from '../../../ddo'
import { Account, OrderProgressStep } from '../../../nevermined'
import { TxParameters } from '../ContractBase'

export interface GenericAccess {
  createAgreementWithPaymentFromDDO(
    agreementIdSeed: string,
    ddo: DDO,
    serviceReference: ServiceType | number,
    parameters: any,
    consumer: Account,
    from: Account,
    timeOuts?: number[],
    txParams?: TxParameters,
    observer?: (orderProgressStep: OrderProgressStep) => void,
  ): Promise<string>

  getAgreementData(agreementId: string): Promise<{ accessProvider: string; accessConsumer: string }>

  params(consumer: any, ...args): any
  contractName: string
}
