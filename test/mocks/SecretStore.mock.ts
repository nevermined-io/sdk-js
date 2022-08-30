import SecretStore from '@nevermined-io/secret-store-client'

export default class SecretStoreMock extends SecretStore {
    public async encryptDocument(_documentId, _document: any) {
        return '0x283asdgahd1t371t23h'
    }

    public async decryptDocument(_documentId, _encryptedDocument: any) {
        return {
            doc: 'test'
        }
    }
}
