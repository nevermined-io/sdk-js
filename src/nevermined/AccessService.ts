import { ServiceCommon, ServicePlugin, ValidationParams } from '../ddo/Service'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { TxParameters } from '../keeper/contracts/ContractBase'
import { Account, MetaData, MetaDataMain } from '../sdk'

export interface AccessProofTemplateParams {
    type: 'access-proof'
    consumer: Account
    consumerId: string
}

export class AccessService extends Instantiable implements ServicePlugin {
    normal: ServicePlugin
    proof?: ServicePlugin

    constructor(config: InstantiableConfig, normal: ServicePlugin) {
        super()
        this.setInstanceConfig(config)
        this.normal = normal
    }

    // essential method is to select between two services
    public select(main: MetaDataMain): ServicePlugin {
        return main.isDTP ? this.proof : this.normal
    }

    public async createService(
        publisher: Account,
        metadata: MetaData
    ): Promise<ServiceCommon> {
        return this.select(metadata.main).createService(publisher, metadata)
    }
    public async process(
        params: ValidationParams,
        from: Account,
        txparams: TxParameters
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

export class NFTAccessService extends AccessService implements ServicePlugin {
    normal721: ServicePlugin
    proof721?: ServicePlugin

    constructor(
        config: InstantiableConfig,
        normal: ServicePlugin,
        normal721: ServicePlugin
    ) {
        super(config, normal)
        this.normal721 = normal721
    }

    // essential method is to select between two services
    public select(main: MetaDataMain): ServicePlugin {
        if (main.nftType == 1155) {
            return main.isDTP ? this.proof : this.normal
        } else {
            return main.isDTP ? this.proof721 : this.normal721
        }
    }
}
