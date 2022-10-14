import {
    ServiceAccess,
    ServiceNFTAccess,
    ServiceNFTSales,
    ServicePlugin,
    ValidationParams
} from '../ddo/Service'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { TxParameters } from '../keeper/contracts/ContractBase'
import {
    AccessTemplate,
    NFT721AccessTemplate,
    NFT721SalesTemplate,
    NFTAccessTemplate,
    NFTSalesTemplate
} from '../keeper/contracts/templates'
import AssetRewards from '../models/AssetRewards'
import { Account, MetaData, MetaDataMain } from '../sdk'

export interface AccessProofTemplateParams {
    type: 'access-proof'
    consumer: Account
    consumerId: string
}

export class AccessService extends Instantiable implements ServicePlugin<ServiceAccess> {
    normal: AccessTemplate
    proof?: AccessTemplate

    constructor(config: InstantiableConfig, normal: AccessTemplate) {
        super()
        this.setInstanceConfig(config)
        this.normal = normal
    }

    // essential method is to select between two services
    public select(main: MetaDataMain): ServicePlugin<ServiceAccess> {
        return this.isDTP(main) ? this.proof : this.normal
    }

    public async createService(
        publisher: Account,
        metadata: MetaData,
        assetRewards: AssetRewards,
        erc20TokenAddress: string
    ): Promise<ServiceAccess> {
        return this.select(metadata.main).createService(
            publisher,
            metadata,
            assetRewards,
            erc20TokenAddress,
            true
        )
    }
    public async process(
        params: ValidationParams,
        from: Account,
        txparams?: TxParameters
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

    private isDTP(main: MetaDataMain): boolean {
        return main.files && main.files.some(f => f.encryption === 'dtp')
    }
}

export class NFTAccessService
    extends Instantiable
    implements ServicePlugin<ServiceNFTAccess>
{
    normal: NFTAccessTemplate
    proof: NFTAccessTemplate
    normal721: NFT721AccessTemplate
    proof721?: NFT721AccessTemplate

    constructor(
        config: InstantiableConfig,
        normal: NFTAccessTemplate,
        normal721: NFT721AccessTemplate
    ) {
        super()
        this.setInstanceConfig(config)
        this.normal = normal
        this.normal721 = normal721
    }

    public async createService(
        publisher: Account,
        metadata: MetaData,
        assetRewards: AssetRewards,
        erc20TokenAddress: string
    ): Promise<ServiceNFTAccess> {
        return this.select(metadata.main).createService(
            publisher,
            metadata,
            assetRewards,
            erc20TokenAddress
        )
    }

    // essential method is to select between two services
    public select(main: MetaDataMain): ServicePlugin<ServiceNFTAccess> {
        if (main.ercType == 1155) {
            return this.isDTP(main) ? this.proof : this.normal
        } else {
            return this.isDTP(main) ? this.proof721 : this.normal721
        }
    }

    public async process(
        params: ValidationParams,
        from: Account,
        txparams?: TxParameters
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

    private isDTP(main: MetaDataMain): boolean {
        return main.files && main.files.some(f => f.encryption === 'dtp')
    }
}

export class NFTSalesService
    extends Instantiable
    implements ServicePlugin<ServiceNFTSales>
{
    normal: NFTSalesTemplate
    proof: NFTSalesTemplate
    normal721: NFT721SalesTemplate
    proof721?: NFT721SalesTemplate

    constructor(
        config: InstantiableConfig,
        normal: NFTSalesTemplate,
        normal721: NFT721SalesTemplate
    ) {
        super()
        this.setInstanceConfig(config)
        this.normal = normal
        this.normal721 = normal721
    }

    public async createService(
        publisher: Account,
        metadata: MetaData,
        assetRewards: AssetRewards,
        erc20TokenAddress: string
    ): Promise<ServiceNFTSales> {
        return this.select(metadata.main).createService(
            publisher,
            metadata,
            assetRewards,
            erc20TokenAddress,
            true
        )
    }

    // essential method is to select between two services
    public select(main: MetaDataMain): ServicePlugin<ServiceNFTSales> {
        console.log(main)
        if (main.ercType == 1155) {
            return this.isDTP(main) ? this.proof : this.normal
        } else {
            return this.isDTP(main) ? this.proof721 : this.normal721
        }
    }

    public async process(
        params: ValidationParams,
        from: Account,
        txparams?: TxParameters
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

    private isDTP(main: MetaDataMain): boolean {
        return main.files && main.files.some(f => f.encryption === 'dtp')
    }
}
