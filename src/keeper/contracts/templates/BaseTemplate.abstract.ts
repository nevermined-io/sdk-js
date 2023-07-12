import { AgreementTemplate } from './AgreementTemplate.abstract'
import { getConditionsByParams, zeroX } from '../../../utils'
import {
  PricedMetadataInformation,
  Service,
  serviceIndex,
  ServicePlugin,
  ServiceType,
  ValidationParams,
} from '../../../ddo'
import { Account, Condition, MetaData, AssetPrice, NFTAttributes } from '../../../sdk'
import { TxParameters } from '../ContractBase'
import { ConditionInstance, ConditionState } from '../conditions'

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

  public serviceEndpoint(): ServiceType {
    return this.service()
  }

  public createService(
    publisher: Account,
    metadata: MetaData,
    nftAttributes?: NFTAttributes,
    assetPrice?: AssetPrice,
    priceData?: PricedMetadataInformation,
  ): S {
    const serviceAgreementTemplate = this.getServiceAgreementTemplate()
    const _conds = getConditionsByParams(
      this.service(),
      serviceAgreementTemplate.conditions,
      publisher.getId(),
      assetPrice,
      assetPrice?.getTokenAddress() || this.nevermined.utils.token.getAddress(),
      nftAttributes?.nftContractAddress,
      publisher.getId(),
      assetPrice.getTotalPrice(),
      nftAttributes?.nftTransfer,
      nftAttributes?.duration,
      nftAttributes?.fulfillAccessTimeout,
      nftAttributes?.fulfillAccessTimelock,
    )
    serviceAgreementTemplate.conditions = _conds

    return {
      type: this.service(),
      index: serviceIndex[this.service()],
      serviceEndpoint: this.nevermined.services.node.getServiceEndpoint(this.serviceEndpoint()),
      templateId: this.getAddress(),
      attributes: {
        main: {
          creator: publisher.getId(),
          datePublished: metadata.main.datePublished,
          name: this.name(),
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
    return {}
  }

  public async accept(_params: ValidationParams): Promise<boolean> {
    return false
  }

  public async process(
    params: ValidationParams,
    from: Account,
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
    from: Account,
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
          `In agreement ${agreement_id}, condition ${condInstance.id} is not fulfilled`,
        )
      }
    }
  }
}
