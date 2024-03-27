import { AgreementTemplate } from './AgreementTemplate.abstract'
import { zeroX } from '@/utils'
import { 
  getConditionsByParams,
  PricedMetadataInformation,
  Service,
  ServiceAttributes,
  serviceIndex,
  ServicePlugin,
  ServiceType,
  ValidationParams,
  NvmAccount, Condition, MetaData, NFTAttributes, isValidAddress, TxParameters } from '@/sdk'
import { ConditionInstance } from '@/keeper/contracts/conditions'

export abstract class BaseTemplate<Params, S extends Service>
  extends AgreementTemplate<Params>
  implements ServicePlugin<S>
{
  public async getAgreementData(
    agreementId: string,
  ): Promise<{ accessProvider: string; accessConsumer: string }> {
    return this.call<any>('getAgreementData', [zeroX(agreementId)])
  }

  public abstract name(): string
  public abstract description(): string
  public abstract conditions(): Condition<any, any>[]

  public serviceEndpoint(): ServiceType | string {
    return this.service()
  }

  public createService(
    publisher: NvmAccount,
    metadata: MetaData,
    serviceAttributes: ServiceAttributes,
    nftAttributes?: NFTAttributes,
    priceData?: PricedMetadataInformation,
  ): S {
    const assetPrice = serviceAttributes.price
    let tokenAddress = undefined
    if (assetPrice && isValidAddress(assetPrice.getTokenAddress()))
      tokenAddress = assetPrice.getTokenAddress()
    else if (this.nevermined.keeper.token) {
      tokenAddress = this.nevermined.keeper.token.address
    }

    const serviceAgreementTemplate = this.getServiceAgreementTemplate()
    const _conds = getConditionsByParams(
      this.service(),
      serviceAgreementTemplate.conditions,
      publisher.getId(),
      assetPrice,
      undefined, // we don't know the DID yet
      tokenAddress,
      nftAttributes?.nftContractAddress,
      publisher.getId(),
      serviceAttributes?.nft?.amount,
      serviceAttributes?.nft?.nftTransfer,
      serviceAttributes?.nft?.duration,
      nftAttributes?.fulfillAccessTimeout,
      nftAttributes?.fulfillAccessTimelock,
      serviceAttributes?.nft?.tokenId,
    )
    serviceAgreementTemplate.conditions = _conds

    return {
      type: this.service(),
      index: serviceIndex[this.service()],
      serviceEndpoint: this.nevermined.services.node.getServiceEndpoint(this.serviceEndpoint()),
      templateId: this.address,
      attributes: {
        main: {
          creator: publisher.getId(),
          datePublished: metadata.main.datePublished,
          name: this.name(),
          ...(serviceAttributes.nft && { nftAttributes: serviceAttributes.nft }),
          ...(priceData && priceData.attributes.main),
        },
        additionalInformation: {
          description: this.description(),
          ...(priceData && priceData.attributes.additionalInformation),
        },
        serviceAgreementTemplate,
      },
    } as S
  }

  /**
   * Specialize params
   * @param params - Generic parameters
   */
  public abstract paramsGen(params: ValidationParams): Promise<Params>

  public async extraGen(_params: ValidationParams): Promise<any> {
    return { service_index: _params.service_index }
  }

  public async accept(_params: ValidationParams): Promise<boolean> {
    return false
  }

  public async track(
    _params: ValidationParams,
    _from: NvmAccount,
    _txparams?: TxParameters,
  ): Promise<boolean> {
    return false
  }

  public async process(
    params: ValidationParams,
    from: NvmAccount,
    txparams?: TxParameters,
  ): Promise<void> {
    await this.validateAgreement(
      params.agreement_id,
      params.did,
      await this.paramsGen(params),
      from,
      await this.extraGen(params),
      txparams,
    )
  }

  public async validateAgreement(
    agreement_id: string,
    did: string,
    params: Params,
    from: NvmAccount,
    extra: any = {},
    txparams?: TxParameters,
  ): Promise<void> {
    const ddo = await this.nevermined.assets.resolve(did)
    const agreement = await this.nevermined.keeper.agreementStoreManager.getAgreement(agreement_id)

    const agreementData = await this.instanceFromDDO(
      agreement.agreementIdSeed,
      ddo,
      agreement.creator,
      params,
      extra.service_index,
    )
    if (agreementData.agreementId !== agreement_id) {
      throw new Error(
        `Agreement doesn't match ${agreement_id} should be ${agreementData.agreementId}`,
      )
    }

    for (const a of this.conditions()) {
      const condInstance = agreementData.instances.find(
        (c) => c.condition === a.contractName,
      ) as ConditionInstance<any>

      await a.fulfillWithNode(condInstance, extra, from, txparams)
      const lock_state = await this.nevermined.keeper.conditionStoreManager.getCondition(
        condInstance.id,
      )

      if (lock_state.state !== ConditionState.Fulfilled) {
        throw new Error(
          `In agreement ${agreement_id}, condition [${a.contractName}] ${condInstance.id} is not fulfilled`,
        )
      }
    }
  }
}
