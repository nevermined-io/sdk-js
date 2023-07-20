import {
  ServiceAccess,
  ServiceNFTAccess,
  ServiceNFTSales,
  ServicePlugin,
  ValidationParams,
  MetaData,
  MetaDataMain,
  PricedMetadataInformation,
  ServiceAttributes,
} from '../ddo'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import {
  TxParameters,
  AccessTemplate,
  NFT721AccessTemplate,
  NFT721SalesTemplate,
  NFTAccessTemplate,
  NFTSalesTemplate,
} from '../keeper'
import { Account } from './Account'
import { NFTAttributes } from '../models'

export interface AccessProofTemplateParams {
  type: 'access-proof'
  consumer: Account
  consumerId: string
}

export class AccessService extends Instantiable implements ServicePlugin<ServiceAccess> {
  normal: AccessTemplate

  constructor(config: InstantiableConfig, normal: AccessTemplate) {
    super()
    this.setInstanceConfig(config)
    this.normal = normal
  }

  public createService(
    publisher: Account,
    metadata: MetaData,
    serviceAttributes: ServiceAttributes,
    nftAttributes?: NFTAttributes,
    pricedData?: PricedMetadataInformation,
  ): ServiceAccess {
    return this.normal.createService(
      publisher,
      metadata,
      serviceAttributes,
      nftAttributes,
      pricedData,
    )
  }

  public async process(
    params: ValidationParams,
    from: Account,
    txparams?: TxParameters,
  ): Promise<void> {
    return this.normal.process(params, from, txparams)
  }
  public async accept(params: ValidationParams): Promise<boolean> {
    return this.normal.accept(params)
  }
}

export class NFTAccessService extends Instantiable implements ServicePlugin<ServiceNFTAccess> {
  normal: NFTAccessTemplate
  normal721: NFT721AccessTemplate

  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
    this.normal = config.nevermined.keeper.templates.nftAccessTemplate
    this.normal721 = config.nevermined.keeper.templates.nft721AccessTemplate
  }

  public createService(
    publisher: Account,
    metadata: MetaData,
    serviceAttributes: ServiceAttributes,
    nftAttributes?: NFTAttributes,
    pricedData?: PricedMetadataInformation,
  ): ServiceNFTAccess {
    return this.select(metadata.main).createService(
      publisher,
      metadata,
      serviceAttributes,
      nftAttributes,
      pricedData,
    )
  }

  // essential method is to select between two services
  public select(main: MetaDataMain): ServicePlugin<ServiceNFTAccess> {
    return main.ercType === 1155 ? this.normal : this.normal721
  }

  public async process(
    params: ValidationParams,
    from: Account,
    txparams?: TxParameters,
  ): Promise<void> {
    const ddo = await this.nevermined.assets.resolve(params.did)
    const metadata = ddo.findServiceByType('metadata').attributes.main
    return this.select(metadata).process(params, from, txparams)
  }
  public async accept(params: ValidationParams): Promise<boolean> {
    const ddo = await this.nevermined.assets.resolve(params.did)
    const metadata = ddo.findServiceByType('metadata').attributes.main
    return this.select(metadata).accept(params)
  }
}

export class NFTSalesService extends Instantiable implements ServicePlugin<ServiceNFTSales> {
  normal: NFTSalesTemplate
  normal721: NFT721SalesTemplate

  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
    this.normal = config.nevermined.keeper.templates.nftSalesTemplate
    this.normal721 = config.nevermined.keeper.templates.nft721SalesTemplate
  }

  public createService(
    publisher: Account,
    metadata: MetaData,
    serviceAttributes: ServiceAttributes,
    nftAttributes?: NFTAttributes,
    pricedData?: PricedMetadataInformation,
  ): ServiceNFTSales {
    return this.select(metadata.main).createService(
      publisher,
      metadata,
      serviceAttributes,
      nftAttributes,
      pricedData,
    )
  }

  // essential method is to select between two services
  public select(main: MetaDataMain): ServicePlugin<ServiceNFTSales> {
    return main.ercType === 1155 ? this.normal : this.normal721
  }

  public async process(
    params: ValidationParams,
    from: Account,
    txparams?: TxParameters,
  ): Promise<void> {
    const ddo = await this.nevermined.assets.resolve(params.did)
    const metadata = ddo.findServiceByType('metadata').attributes.main
    return this.select(metadata).process(params, from, txparams)
  }
  public async accept(params: ValidationParams): Promise<boolean> {
    const ddo = await this.nevermined.assets.resolve(params.did)
    const metadata = ddo.findServiceByType('metadata').attributes.main
    return this.select(metadata).accept(params)
  }
}
