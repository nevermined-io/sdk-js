import { AccessSelector, ServiceCommon, ServicePlugin, ServiceType, ValidationParams } from '../ddo/Service'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { TxParameters } from '../keeper/contracts/ContractBase'
import { Account, MetaData } from '../sdk'

export class AccessService extends Instantiable implements ServicePlugin {
    normal: ServicePlugin
    proof?: ServicePlugin

    constructor(config: InstantiableConfig, normal: ServicePlugin) {
        super()
        this.setInstanceConfig(config)
        this.normal = normal
    }

    // essential method is to select between two services
    public select(selector: AccessSelector): ServicePlugin {
        return selector.isDTP ? this.proof : this.normal
    }

    public async createService(
        publisher: Account,
        metadata: MetaData,
        selector: AccessSelector
    ): Promise<ServiceCommon> {
        return this.select(selector).createService(publisher, metadata, selector)
    }
    public async process(
        params: ValidationParams,
        from: Account,
        txparams?: TxParameters
    ): Promise<void> {
        const ddo = await this.nevermined.assets.resolve(params.did)
        const metadata = ddo.findServiceByType(this.service()).attributes.main
        return this.select(metadata).process(params, from, txparams)
    }
    public async accept(params: ValidationParams): Promise<boolean> {
        const ddo = await this.nevermined.assets.resolve(params.did)
        const metadata = ddo.findServiceByType(this.service()).attributes.main
        return this.select(metadata).accept(params)
    }
    public service(): ServiceType {
        return this.normal.service()
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
    public select(selector: AccessSelector): ServicePlugin {
        if (selector.ercType == 1155) {
            return selector.isDTP ? this.proof : this.normal
        } else {
            return selector.isDTP ? this.proof721 : this.normal721
        }
    }
}
