import { Gateway } from '../../src/gateway/Gateway'

export default class GatewayMock extends Gateway {
    public async initializeServiceAgreement(
        _did: string,
        _serviceAgreementId: string,
        _index: number,
        _signature: string,
        _consumerPublicKey: string
    ): Promise<any> {
        return true
    }
}
