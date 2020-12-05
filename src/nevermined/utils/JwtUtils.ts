import parseJwk from 'jose/jwk/parse'
import SignJWT from 'jose/jwt/sign'

import { Instantiable, InstantiableConfig } from "../../Instantiable.abstract";
import { Account } from "../../../src"
import { sign } from 'crypto';

export class JwtUtils extends Instantiable {
    GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:jwt-bearer'
    BASE_AUD = '/api/v1/gateway/services'

    tokenCache: Map<string, string>

    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
        this.tokenCache = new Map()
    }

    public generateCacheKey(...args: string[]): string {
        return args.join()
    }

    public async accountToJwk(account: Account): Promise<any> {
        const address = account.getId().toLowerCase()

        // Currently only works with HDWalletProvider
        // @ts-ignore
        const publicKey = this.web3.currentProvider.wallets[address].getPublicKey()
        // @ts-ignore
        const privateKey = this.web3.currentProvider.wallets[address].getPrivateKey()

        return parseJwk({
            alg: 'ES256K',
            crv: 'secp256k1',
            kty: 'EC',
            d: privateKey.toString('base64'),
            x: publicKey.slice(0, 32).toString('base64'),
            y: publicKey.slice(32, 64).toString('base64')
        })

    }

    public async generateAccessGrantToken(
        account: Account,
        serviceAgreementId: string,
        did: string): Promise<string> {
            const jwk = await this.accountToJwk(account)

            return new SignJWT({
                iss: account.getId(),
                aud: this.BASE_AUD + '/access',
                sub: serviceAgreementId,
                did: did
            })
            .setProtectedHeader({ alg: 'ES256K' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(jwk)
        }

    public async generateDownloadGrantToken(
        account: Account,
        did: string): Promise<string> {
            const jwk = await this.accountToJwk(account)

            return new SignJWT({
                iss: account.getId(),
                aud: this.BASE_AUD + '/download',
                did: did
            })
            .setProtectedHeader({ alg: 'ES256K' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(jwk)
        }

    public async generateExecuteGrantToken(
        account: Account,
        serviceAgreementId: string,
        workflowId: string
    ): Promise<string> {
        const jwk = await this.accountToJwk(account)

        return new SignJWT({
            iss: account.getId(),
            aud: this.BASE_AUD + '/execute',
            sub: serviceAgreementId,
            did: workflowId
        })
        .setProtectedHeader({ alg: 'ES256K' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(jwk)
    }

    public async generateComputeGrantToken(
        account: Account,
        serviceAgreementId: string,
        executionId: string
    ): Promise<string> {
        const jwk = await this.accountToJwk(account)

        return new SignJWT({
            iss: account.getId(),
            aud: this.BASE_AUD + '/compute',
            sub: serviceAgreementId,
            'execution_id': executionId
        })
        .setProtectedHeader({ alg: 'ES256K' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(jwk)
    }
}