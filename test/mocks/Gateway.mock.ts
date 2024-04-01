import { NeverminedNode } from '../../src/'

export class NodeMock extends NeverminedNode {
  public async initializeServiceAgreement(
    _did: string,
    _serviceAgreementId: string,
    _index: number,
    _signature: string,
    _consumerPublicKey: string,
  ): Promise<any> {
    return true
  }
}
