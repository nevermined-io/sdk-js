import { AgreementTemplate } from './AgreementTemplate.abstract'
import { zeroX } from '../../../utils'
import { ServiceCommon, serviceIndex, ServiceType } from '../../../ddo/Service'
import { Account, MetaData } from '../../../sdk'

export abstract class BaseTemplate<Params> extends AgreementTemplate<Params> {
    public async getAgreementData(
        agreementId: string
    ): Promise<{ accessProvider: string; accessConsumer: string }> {
        return this.call<any>('getAgreementData', [zeroX(agreementId)])
    }
    public abstract name(): string
    public abstract description(): string
    public serviceEndpoint(): ServiceType {
        return this.service()        
    }
    public async createService(
        publisher: Account,
        metadata: MetaData
    ): Promise<ServiceCommon> {
        const serviceAgreementTemplate = await this.getServiceAgreementTemplate()
        return {
            type: this.service(),
            index: serviceIndex[this.service()],
            serviceEndpoint: this.nevermined.gateway.getServiceEndpoint(this.serviceEndpoint()),
            templateId: this.getAddress(),
            attributes: {
                main: {
                    creator: publisher.getId(),
                    datePublished: metadata.main.datePublished,
                    name: this.name(),
                    timeout: 0
                },
                additionalInformation: {
                    description: this.description()
                },
                serviceAgreementTemplate
            }
        } as ServiceCommon
    }
}
