import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO } from '../../../sdk'
import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { didSalesTemplateServiceAgreementTemplate } from './DIDSalesTemplate.serviceAgreementTemplate'
import { ServiceType } from '../../../ddo/Service'

export class DIDSalesTemplate extends BaseTemplate<Record<string, unknown>> {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    public params(...args: any[]): Record<string, unknown> {
        throw new Error('Method not implemented.')
    }

    public instanceFromDDO(
        agreementId: string,
        ddo: DDO,
        creator: string,
        parameters: Record<string, unknown>
    ): Promise<AgreementInstance<Record<string, unknown>>> {
        throw new Error('Method not implemented.')
    }
    public service(): ServiceType {
        throw new Error('Method not implemented.')
    }
    /* eslint-enable @typescript-eslint/no-unused-vars */
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<DIDSalesTemplate> {
        return AgreementTemplate.getInstance(config, 'DIDSalesTemplate', DIDSalesTemplate)
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return didSalesTemplateServiceAgreementTemplate
    }
}
