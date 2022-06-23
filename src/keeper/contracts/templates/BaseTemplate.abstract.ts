import { AgreementTemplate } from './AgreementTemplate.abstract'
import { zeroX } from '../../../utils'

export abstract class BaseTemplate<Params> extends AgreementTemplate<Params> {
    public async getAgreementData(
        agreementId: string
    ): Promise<{ accessProvider: string; accessConsumer: string }> {
        return this.call<any>('getAgreementData', [zeroX(agreementId)])
    }
}
