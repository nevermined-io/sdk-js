import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { AccessTemplate } from '../keeper/contracts/templates/AccessTemplate'
import { NFT721AccessTemplate } from '../keeper/contracts/templates/NFT721AccessTemplate'
import { NFT721SalesTemplate } from '../keeper/contracts/templates/NFT721SalesTemplate'
import { NFTAccessTemplate } from '../keeper/contracts/templates/NFTAccessTemplate'
import { NFTSalesTemplate } from '../keeper/contracts/templates/NFTSalesTemplate'
import { NFTAttributes } from '../models/NFTAttributes'
import { NvmAccount } from '../models/NvmAccount'
import { TxParameters } from '../models/Transactions'
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
} from '../types/DDOTypes'

export interface AccessProofTemplateParams {
  type: 'access-proof'
  consumer: NvmAccount
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
    publisher: NvmAccount,
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
    from: NvmAccount,
    txparams?: TxParameters,
  ): Promise<void | { [key: string]: any }> {
    return this.normal.process(params, from, txparams)
  }
  public async accept(params: ValidationParams): Promise<boolean> {
    return this.normal.accept(params)
  }
  public async track(
    params: ValidationParams,
    from: NvmAccount,
    txparams?: TxParameters,
  ): Promise<boolean> {
    return this.normal.track(params, from, txparams)
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
    publisher: NvmAccount,
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
    from: NvmAccount,
    txparams?: TxParameters,
  ): Promise<void | { [key: string]: any }> {
    const ddo = await this.nevermined.assets.resolve(params.did)
    const metadata = ddo.findServiceByType('metadata').attributes.main
    return this.select(metadata).process(params, from, txparams)
  }
  public async accept(params: ValidationParams): Promise<boolean> {
    const ddo = await this.nevermined.assets.resolve(params.did)
    const metadata = ddo.findServiceByType('metadata').attributes.main
    return this.select(metadata).accept(params)
  }
  public async track(
    params: ValidationParams,
    from: NvmAccount,
    txparams?: TxParameters,
  ): Promise<boolean> {
    const ddo = await this.nevermined.assets.resolve(params.did)
    const metadata = ddo.findServiceByType('metadata').attributes.main
    return this.select(metadata).track(params, from, txparams)
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
    publisher: NvmAccount,
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
    from: NvmAccount,
    txparams?: TxParameters,
  ): Promise<void | { [key: string]: any }> {
    const ddo = await this.nevermined.assets.resolve(params.did)
    const metadata = ddo.findServiceByType('metadata').attributes.main
    return this.select(metadata).process(params, from, txparams)
  }
  public async accept(params: ValidationParams): Promise<boolean> {
    const ddo = await this.nevermined.assets.resolve(params.did)
    const metadata = ddo.findServiceByType('metadata').attributes.main
    return this.select(metadata).accept(params)
  }
  public async track(
    params: ValidationParams,
    from: NvmAccount,
    txparams?: TxParameters,
  ): Promise<boolean> {
    const ddo = await this.nevermined.assets.resolve(params.did)
    const metadata = ddo.findServiceByType('metadata').attributes.main
    return this.select(metadata).track(params, from, txparams)
  }
}
