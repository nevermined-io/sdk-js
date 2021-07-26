import parseJwk from 'jose/jwk/parse'
import SignJWT, { JWSHeaderParameters, JWTPayload } from 'jose/jwt/sign'

import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { Account } from '../../../src'
import { SignatureUtils } from './SignatureUtils'
import Web3 from 'web3'
import { ServiceType } from '../../ddo/Service'

class EthSignJWT extends SignJWT {
    protectedHeader: JWSHeaderParameters

    setProtectedHeader(protectedHeader: JWSHeaderParameters) {
        this.protectedHeader = protectedHeader
        return this
    }

    async ethSign(
        account: Account,
        signatureUtils: SignatureUtils,
        web3: Web3
    ): Promise<string> {
        const encoder = new TextEncoder()
        const decoder = new TextDecoder()

        const encodedPayload = encoder.encode(
            this.base64url(JSON.stringify(this._payload))
        )
        const encodedHeader = encoder.encode(
            this.base64url(JSON.stringify(this.protectedHeader))
        )
        const data = this.concat(encodedHeader, encoder.encode('.'), encodedPayload)

        const sign = await signatureUtils.signText(decoder.decode(data), account.getId())
        const signed = this.base64url(
            Uint8Array.from(web3.utils.hexToBytes(sign).slice(0, 64))
        )
        const grantToken = `${decoder.decode(encodedHeader)}.${decoder.decode(
            encodedPayload
        )}.${signed}`

        return grantToken
    }

    base64url(input: Uint8Array | string): string {
        return Buffer.from(input)
            .toString('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
    }

    concat(...buffers: Uint8Array[]): Uint8Array {
        const size = buffers.reduce((acc, { length }) => acc + length, 0)
        const buf = new Uint8Array(size)
        let i = 0
        buffers.forEach(buffer => {
            buf.set(buffer, i)
            i += buffer.length
        })
        return buf
    }
}

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
        did: string
    ): Promise<string> {
        return new EthSignJWT({
            iss: account.getId(),
            aud: this.BASE_AUD + '/access',
            sub: serviceAgreementId,
            did: did,
            eths: 'personal'
        })
            .setProtectedHeader({ alg: 'ES256K' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .ethSign(account, this.nevermined.utils.signature, this.web3)
    }

    public async generateDownloadGrantToken(
        account: Account,
        did: string
    ): Promise<string> {
        return new EthSignJWT({
            iss: account.getId(),
            aud: this.BASE_AUD + '/download',
            did: did,
            eths: 'personal'
        })
            .setProtectedHeader({ alg: 'ES256K' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .ethSign(account, this.nevermined.utils.signature, this.web3)
    }

    public async generateExecuteGrantToken(
        account: Account,
        serviceAgreementId: string,
        workflowId: string
    ): Promise<string> {
        return new EthSignJWT({
            iss: account.getId(),
            aud: this.BASE_AUD + '/execute',
            sub: serviceAgreementId,
            did: workflowId,
            eths: 'personal'
        })
            .setProtectedHeader({ alg: 'ES256K' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .ethSign(account, this.nevermined.utils.signature, this.web3)
    }

    public async generateComputeGrantToken(
        account: Account,
        serviceAgreementId: string,
        executionId: string
    ): Promise<string> {
        return new EthSignJWT({
            iss: account.getId(),
            aud: this.BASE_AUD + '/compute',
            sub: serviceAgreementId,
            eths: 'personal',
            execution_id: executionId // eslint-disable-line
        })
            .setProtectedHeader({ alg: 'ES256K' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .ethSign(account, this.nevermined.utils.signature, this.web3)
    }

    public async generateNftAccessGrantToken(
        agreementId: string,
        did: string,
        serviceType: ServiceType,
        account: Account
    ): Promise<string> {
        return new EthSignJWT({
            iss: account.getId(),
            aud: this.BASE_AUD + '/' + serviceType,
            sub: agreementId,
            did: did,
            eths: 'personal'
        })
            .setProtectedHeader({ alg: 'ES256K' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .ethSign(account, this.nevermined.utils.signature, this.web3)
    }
}
