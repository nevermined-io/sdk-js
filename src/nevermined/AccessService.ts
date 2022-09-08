import { ServiceCommon, ServicePlugin } from '../ddo/Service'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { TxParameters } from '../keeper/contracts/ContractBase'
import { AccessTemplateParams } from '../keeper/contracts/templates/AccessTemplate'
import { Account, MetaData } from '../sdk'

export class AccessService
    extends Instantiable
    implements ServicePlugin<AccessTemplateParams>
{
    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }
    public async createService(
        publisher: Account,
        metadata: MetaData
    ): Promise<ServiceCommon> {
        return this.nevermined.keeper.templates.accessTemplate.createService(
            publisher,
            metadata
        )
    }
    public async validateAgreement(
        agreement_id: string,
        did: string,
        params: AccessTemplateParams,
        from: Account,
        extra: any,
        txparams: TxParameters
    ): Promise<void> {
        return this.nevermined.keeper.templates.accessTemplate.validateAgreement(
            agreement_id,
            did,
            params,
            from,
            extra,
            txparams
        )
    }
}
