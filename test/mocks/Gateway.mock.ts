import { Gateway } from '../../src/gateway/Gateway'

export default class GatewayMock extends Gateway {
    public async initializeServiceAgreement(
        did: string,
        serviceAgreementId: string,
        index: number,
        signature: string,
        consumerPublicKey: string
    ): Promise<any> {
        return true
    }
}
