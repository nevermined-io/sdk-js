import { ServiceCommon, ServicePlugin, ValidationParams } from '../ddo/Service'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { TxParameters } from '../keeper/contracts/ContractBase'
import { Account, MetaData } from '../sdk'

export interface AccessProofTemplateParams {
    type: 'access-proof'
    consumer: Account
    consumerId: string
}

export class AccessService extends Instantiable implements ServicePlugin {
    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }

    // essential method is to select between two services

    public async createService(
        publisher: Account,
        metadata: MetaData
    ): Promise<ServiceCommon> {
        return this.nevermined.keeper.templates.accessTemplate.createService(
            publisher,
            metadata
        )
    }
    public async process(
        params: ValidationParams,
        from: Account,
        txparams: TxParameters
    ): Promise<void> {
        return this.nevermined.keeper.templates.accessTemplate.process(
            params,
            from,
            txparams
        )
    }
}
