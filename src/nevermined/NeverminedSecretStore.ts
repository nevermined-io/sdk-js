import SecretStore from '@nevermined-io/secret-store-client'
import SecretStoreConfig from '@nevermined-io/secret-store-client/dist/models/SecretStoreConfig'

import Account from './Account'
import { noDidPrefixed } from '../utils'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

/**
 * SecretStore submodule of Nevermined.
 */
export class NeverminedSecretStore extends Instantiable {
    /**
     * Returns the instance of SecretStore.
     *
     * @returns {@link NeverminedSecretStore}
     */
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NeverminedSecretStore> {
        const instance = new NeverminedSecretStore()
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Encrypt the given text and store the encryption keys using the `did`.
     *
     * @remarks
     * The encrypted text can be decrypted using the same keys identified by the `did`.
     *
     * @param did - Decentralized ID.
     * @param document - Document to be encrypted.
     * @param publisher - Publisher account.
     * @returns Encrypted text.
     */
    public async encrypt(
        did: string,
        document: any,
        publisher: Account
    ): Promise<string> {
        const signature =
            (await publisher.getToken()) ||
            (await this.nevermined.utils.signature.signText(
                noDidPrefixed(did),
                publisher.getId()
            ))

        return this.nevermined.gateway.secretStoreEncrypt(
            noDidPrefixed(did),
            signature,
            document,
            publisher.getId()
        )
    }

    /**
     * Decrypt an encrypted text using the stored encryption keys associated with the `did`.
     *
     * @remarks
     * Decryption requires that the account owner has access permissions for this `did`
     *
     * @param did - Decentralized ID.
     * @param content - Content to be encrypted.
     * @param consumer - Consumer account.
     * @returns Encrypted text.
     */
    public async decrypt(
        did: string,
        content: string,
        consumer?: Account,
        secretStoreUrl?: string
    ): Promise<any> {
        return this.getSecretStoreByAccount(consumer, secretStoreUrl).decryptDocument(
            noDidPrefixed(did),
            content
        )
    }

    private getSecretStoreByAccount(account: Account, secretStoreUrl?: string) {
        const config: any = { ...this.config }
        if (account) {
            config.address = account.getId()
        }
        if (account && account.getPassword()) {
            config.password = account.getPassword()
        }
        if (secretStoreUrl) {
            config.secretStoreUri = secretStoreUrl
        }
        return this.getSecretStore(config)
    }

    private getSecretStore(config: SecretStoreConfig): SecretStore {
        const { secretStoreUri, parityUri, password, address, threshold } = config
        config = { secretStoreUri, parityUri, password, address, threshold }

        return new SecretStore(config)
    }
}
