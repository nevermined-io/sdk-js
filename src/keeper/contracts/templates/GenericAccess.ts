import { DDO } from '@/ddo/DDO'
import { NvmAccount } from '@/models/NvmAccount'
import { TxParameters } from '@/models/Transactions'
import { OrderProgressStep } from '@/nevermined/ProgressSteps'
import { ServiceType } from '@/types/DDOTypes'

export interface GenericAccess {
  createAgreementWithPaymentFromDDO(
    agreementIdSeed: string,
    ddo: DDO,
    serviceReference: ServiceType | number,
    parameters: any,
    consumer: NvmAccount,
    from: NvmAccount,
    txParams?: TxParameters,
    observer?: (orderProgressStep: OrderProgressStep) => void,
  ): Promise<string>

  getAgreementData(agreementId: string): Promise<{ accessProvider: string; accessConsumer: string }>

  params(consumer: any, ...args): any
  contractName: string
}
