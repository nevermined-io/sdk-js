import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import { DDO } from '../../../sdk'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { didSalesTemplateServiceAgreementTemplate } from './DIDSalesTemplate.serviceAgreementTemplate'
import Account from '../../../nevermined/Account'

export class DIDSalesTemplate extends BaseTemplate {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<DIDSalesTemplate> {
        return AgreementTemplate.getInstance(config, 'DIDSalesTemplate', DIDSalesTemplate)
    }

    public async createAgreementFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: Account,
        from?: Account
    ): Promise<boolean> {
        throw new Error('Not implemented')
    }

    public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: string
    ): Promise<string[]> {
        throw new Error('Not implemented')
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return didSalesTemplateServiceAgreementTemplate
    }
}
