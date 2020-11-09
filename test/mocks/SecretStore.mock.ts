import SecretStore from '@nevermined-io/secret-store-client'

export default class SecretStoreMock extends SecretStore {
    public async encryptDocument(documentId, document: any) {
        return '0x283asdgahd1t371t23h'
    }

    public async decryptDocument(documentId, encryptedDocument: any) {
        return {
            doc: 'test'
        }
    }
}
