import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import { DDO } from '../../../sdk'
import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { didSalesTemplateServiceAgreementTemplate } from './DIDSalesTemplate.serviceAgreementTemplate'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'
import { ServiceType } from '../../../ddo/Service'

export class DIDSalesTemplate extends BaseTemplate<{}> {
    public params(...args: any[]): {} {
        throw new Error('Method not implemented.')
    }
    public instanceFromDDO(agreementId: string, ddo: DDO, creator: string, parameters: {}): Promise<AgreementInstance<{}>> {
        throw new Error('Method not implemented.')
    }
    public service(): ServiceType {
        throw new Error('Method not implemented.')
    }
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<DIDSalesTemplate> {
        return AgreementTemplate.getInstance(config, 'DIDSalesTemplate', DIDSalesTemplate)
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return didSalesTemplateServiceAgreementTemplate
    }
}
