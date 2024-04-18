import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { DDO } from '../../ddo/DDO'
import { NvmAccount } from '../../models/NvmAccount'
import { getBytes, keccak256Packed } from '../../nevermined/utils/BlockchainViemUtils'
import { ServiceType, ServiceAccess, ServiceAgreementTemplateCondition } from '../../types/DDOTypes'
import { zeroX } from '../../utils/ConversionTypeHelpers'

export class ServiceAgreement extends Instantiable {
  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  public async signServiceAgreement(
    ddo: DDO,
    serviceType: ServiceType,
    serviceAgreementId: string,
    agreementConditionsIds: string[],
    consumer: NvmAccount,
  ): Promise<string> {
    const service = ddo.findServiceByType(serviceType) as ServiceAccess
    const timelockValues: number[] = this.getTimeValuesFromService(service, 'timelock')
    const timeoutValues: number[] = this.getTimeValuesFromService(service, 'timeout')

    if (!service.templateId) {
      throw new Error('TemplateId not found in DDO.')
    }

    console.log(`Signing service agreement`)
    const serviceAgreementHashSignature = await this.createHashSignature(
      service.templateId,
      serviceAgreementId,
      agreementConditionsIds,
      timelockValues,
      timeoutValues,
      consumer,
    )

    this.logger.debug('SA hash signature:', serviceAgreementHashSignature)

    return zeroX(serviceAgreementHashSignature)
  }

  public async createHashSignature(
    templateId: string,
    serviceAgreementId: string,
    valueHashes: string[],
    timelockValues: number[],
    timeoutValues: number[],
    consumer: NvmAccount,
  ): Promise<string> {
    const serviceAgreementHash = this.hashServiceAgreement(
      templateId,
      serviceAgreementId,
      valueHashes,
      timelockValues,
      timeoutValues,
    )

    console.log(`Signing text using agreement: ${serviceAgreementHash}`)
    const serviceAgreementHashSignature = await this.nevermined.utils.signature.signText(
      getBytes(serviceAgreementHash),
      consumer,
    )

    return serviceAgreementHashSignature
  }

  public hashServiceAgreement(
    serviceAgreementTemplateId: string,
    serviceAgreementId: string,
    valueHashes: string[],
    timelocks: number[],
    timeouts: number[],
  ): string {
    const _types = [
      { type: 'address' },
      { type: 'bytes32[]' },
      { type: 'uint256[]' },
      { type: 'uint256[]' },
      { type: 'bytes32' },
    ]
    const _values = [
      zeroX(serviceAgreementTemplateId),
      valueHashes.map(zeroX),
      timelocks,
      timeouts,
      zeroX(serviceAgreementId),
    ]
    return keccak256Packed(_types, _values)
  }

  private getTimeValuesFromService(service: ServiceAccess, type: 'timeout' | 'timelock'): number[] {
    const timeoutValues: number[] =
      service.attributes.serviceAgreementTemplate?.conditions?.map(
        (condition: ServiceAgreementTemplateCondition) => condition[type],
      ) || []

    return timeoutValues
  }
}
