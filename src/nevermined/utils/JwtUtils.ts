import parseJwk from 'jose/jwk/parse'
import SignJWT from 'jose/jwt/sign'

import { Instantiable, InstantiableConfig } from "../../Instantiable.abstract"
import { Account } from "../../../src"

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
            // const jwk = await this.accountToJwk(account)

            const encoder = new TextEncoder()

            const header = JSON.stringify({ alg: 'ES256K' })
            const jwt = JSON.stringify({
                iss: account.getId(),
                aud: this.BASE_AUD + '/access',
                sub: serviceAgreementId,
                did: did,
                exp: Math.floor(new Date().getTime() / 1000),
                iat: Math.floor(new Date().getTime() / 1000)
            })

            const encodedPayload = Buffer.from(jwt).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
            const encodedHeader = Buffer.from(header).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
            // const data = concat(encodedHeader, encoder.encode('.'), encodedPayload)

            const sign = await this.nevermined.utils.signature.signText(`${encodedHeader}.${encodedPayload}`, account.getId())
   
            const signed = Buffer.from(this.web3.utils.hexToBytes(sign)).slice(0,64).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

            console.log(`${encodedHeader}.${encodedPayload}.${signed}`)

            return `${encodedHeader}.${encodedPayload}.${signed}`
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