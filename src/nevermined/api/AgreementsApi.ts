import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { generateId } from '../../common/helpers'
import { NvmAccount } from '../../models/NvmAccount'
import { TxParameters } from '../../models/Transactions'
import { ConditionsApi } from '../../nevermined/api/ConditionsApi'
import { ServiceType } from '../../types/DDOTypes'
import { zeroX } from '../../utils/ConversionTypeHelpers'

export interface AgreementPrepareResult {
  agreementIdSeed: string
  signature: string
}

/**
 * Nevermined Agreements API. It allows the integration with Nevermined Service Execution Agreements
 */
export class AgreementsApi extends Instantiable {
  /**
   * Agreements Conditions submodule.
   */
  public conditions: ConditionsApi

  /**
   * Creates a new AgreementsApi
   * @param config - Configuration of the Nevermined instance
   * @returns {@link AgreementsApi}
   */
  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
    this.conditions = new ConditionsApi(config)
  }

  /**
   * Creates a consumer signature for the specified asset service.
   *
   * @privateRemarks
   * TODO: Only works for access service?
   *
   * @param did - Decentralized ID.
   * @param serviceType - Service.
   * @param  from - Consumer account.
   * @returns The agreement ID and signature.
   */
  public async prepareSignature(
    did: string,
    serviceType: ServiceType,
    from: NvmAccount,
  ): Promise<AgreementPrepareResult> {
    const ddo = await this.nevermined.assets.resolve(did)
    const agreementIdSeed: string = zeroX(generateId())

    const { accessTemplate } = this.nevermined.keeper.templates
    const agreementConditionsIds =
      await this.nevermined.keeper.templates.accessTemplate.getAgreementIdsFromDDO(
        agreementIdSeed,
        ddo,
        from.getId(),
        accessTemplate.params(from),
      )

    const signature = await this.nevermined.utils.agreements.signServiceAgreement(
      ddo,
      serviceType,
      agreementIdSeed,
      agreementConditionsIds,
      from,
    )

    return { agreementIdSeed, signature }
  }

  /**
   * Create a service agreement on-chain. This should be called by the publisher of the asset.
   *
   * @remarks
   * Consumer signature will be verified on-chain, but it is recommended to verify the signature
   * in this method before submitting on-chain.
   *
   * @param did -  Decentralized ID.
   * @param agreementIdSeed - Service agreement ID seed.
   * @param serviceType - Service.
   * @param agreementParams - Agreement parameters.
   * @param from - The account of the user creating the service agreement
   * @param txParams - Transaction parameters.
   * @returns The service agreement id
   */
  public async create(
    did: string,
    agreementIdSeed: string,
    serviceType: ServiceType,
    agreementParams: any,
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    const ddo = await this.nevermined.assets.resolve(did)

    const templateName =
      ddo.findServiceByType(serviceType).attributes.serviceAgreementTemplate.contractName

    const agreementId = await this.nevermined.keeper
      .getTemplateByName(templateName)
      ?.createAgreementFromDDO(agreementIdSeed, ddo, agreementParams, from, undefined, txParams)

    return agreementId as string
  }

  /**
   * Get the status of a service agreement.
   * @param agreementId - Service agreement ID.
   * @param extended - If true returns a complete status with dependencies.
   * @returns status of the agreement
   */
  public async status(agreementId: string, extended = false) {
    const { templateId } = await this.nevermined.keeper.agreementStoreManager.getAgreement(
      agreementId,
    )
    const fullStatus = await this.nevermined.keeper
      .getTemplateByAddress(templateId)
      ?.getAgreementStatus(agreementId)

    if (!fullStatus) {
      return
    }
    if (extended) {
      return fullStatus
    }
    const simpleStatus = {}
    Object.entries(fullStatus).forEach(([condition, { state }]) => {
      simpleStatus[condition] = state
    })
    return simpleStatus as any
  }

  /**
   * It returns the details of one agreement
   * @param agreementId The unique agreement id
   * @returns the details of the agreement
   */
  public async getAgreement(agreementId: string) {
    return this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
  }

  /**
   * Gets the list of agreements created about an asset
   * @param did the unique identifier of the asset
   * @returns the list of agreements
   */
  public async getAgreements(did: string) {
    return this.nevermined.keeper.agreementStoreManager.getAgreements(did)
  }

  /**
   * Checks if a consumer has permissions for a certain DID and Agreement Id
   * @param agreementId the agreement id
   * @param did the unique identifier of the asset
   * @param consumerAddress the address of the consumer
   * @param from the user account
   * @returns true if the user has permissions
   */
  public async isAccessGranted(
    agreementId: string,
    did: string,
    consumerAddress: string,
    from: NvmAccount,
  ): Promise<boolean> {
    const { accessConsumer } =
      await this.nevermined.keeper.templates.accessTemplate.getAgreementData(agreementId)
    if (!consumerAddress.includes(accessConsumer)) {
      this.logger.log(`This address [${consumerAddress}] has not access granted`)
      return false
    }
    return await this.nevermined.keeper.conditions.accessCondition.checkPermissions(
      accessConsumer,
      did,
      from,
    )
  }
}
