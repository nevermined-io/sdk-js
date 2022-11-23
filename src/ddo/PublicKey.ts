/**
 * Public key data.
 */
export interface PublicKey {
    /**
     * ID of the key.
     * @example "did:nv:123456789abcdefghi#keys-1"
     */
    id: string

    /**
     * Type of key.
     */
    type:
        | 'Ed25519VerificationKey2018'
        | 'RsaVerificationKey2018'
        | 'EdDsaSAPublicKeySecp256k1'
        | 'EthereumECDSAKey'

    /**
     * Key owner.
     * @example "did:nv:123456789abcdefghi"
     */
    owner: string

    publicKeyPem?: string
    publicKeyBase58?: string
    publicKeyHex?: string
}
