import parseJwk from 'jose/jwk/parse'
import SignJWT, { JWSHeaderParameters, JWTPayload } from 'jose/jwt/sign'

import { Instantiable, InstantiableConfig } from "../../Instantiable.abstract"
import { Account } from "../../../src"
import { Nevermined } from '../../sdk'
import { SignatureUtils } from './SignatureUtils'
import Web3 from 'web3'


class EthSignJWT extends SignJWT {
    protectedHeader: JWSHeaderParameters

    // constructor(payload: JWTPayload) {
    //     super(payload)
    // }

    setProtectedHeader(protectedHeader: JWSHeaderParameters) {
        this.protectedHeader = protectedHeader
        return this
    }

    async ethSign(account: Account, signatureUtils: SignatureUtils, web3: Web3): Promise<string> {
        const encoder = new TextEncoder()
        const decoder = new TextDecoder()

        const encodedPayload = encoder.encode(this.base64url(JSON.stringify(this._payload)))
        const encodedHeader = encoder.encode(this.base64url(JSON.stringify(this.protectedHeader)))
        const data = this.concat(encodedHeader, encoder.encode('.'), encodedPayload)

        const sign = await signatureUtils.signText(decoder.decode(data), account.getId())
        const signed = this.base64url(Uint8Array.from(web3.utils.hexToBytes(sign).slice(0, 64)))
        const grantToken = `${decoder.decode(encodedHeader)}.${decoder.decode(encodedPayload)}.${signed}`

        return grantToken
    }

    base64url(input: Uint8Array | string) : string {
        return Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
    }

    concat(...buffers: Uint8Array[]): Uint8Array {
        const size = buffers.reduce((acc, { length }) => acc + length, 0)
        const buf = new Uint8Array(size)
        let i = 0
        buffers.forEach((buffer) => {
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
        did: string): Promise<string> {
            // const jwk = await this.accountToJwk(account)

            // const encoder = new TextEncoder()
            // const decoder = new TextDecoder()

            // const header = JSON.stringify({ alg: 'ES256K' })
            // const jwt = JSON.stringify({
            //     iss: account.getId(),
            //     aud: this.BASE_AUD + '/access',
            //     sub: serviceAgreementId,
            //     did: did,
            //     eths: 'personal',
            //     exp: Math.floor((new Date().getTime() + 3600) / 1000),
            //     iat: Math.floor(new Date().getTime() / 1000)
            // })

            // const base64url = (input: Uint8Array | string) =>
            //     Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

            // // const encodedPayload = Buffer.from(jwt).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
            // // const encodedHeader = Buffer.from(header).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
            // // // const data = concat(encodedHeader, encoder.encode('.'), encodedPayload)

            // // const sign = await this.nevermined.utils.signature.signText(`${encodedHeader}.${encodedPayload}`, account.getId())

            // // const signed = Buffer.from(this.web3.utils.hexToBytes(sign).slice(1,65)).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

            // // console.log(`${encodedHeader}.${encodedPayload}.${signed}`)

            // const encodedPayload = encoder.encode(base64url(jwt))
            // console.log(encodedPayload)
            // const encodedHeader = encoder.encode(base64url(header))
            // console.log(encodedHeader)
            // const data = concat(encodedHeader, encoder.encode('.'), encodedPayload)
            // console.log(data)
            // const sign = await this.nevermined.utils.signature.signText(decoder.decode(data), account.getId())
            // console.log(Uint8Array.from(this.web3.utils.hexToBytes(sign)))
            // const signed = base64url(Uint8Array.from(this.web3.utils.hexToBytes(sign).slice(0, 64)))

            // const grantToken = `${decoder.decode(encodedHeader)}.${decoder.decode(encodedPayload)}.${signed}`
            // console.log(grantToken)

            // const jwk = await this.accountToJwk(account)

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

            // const grantToken2 = await jwt2.sign(jwk)
            // console.log(grantToken2)

            // return grantToken
        }

    public async generateDownloadGrantToken(
        account: Account,
        did: string): Promise<string> {
            const jwk = await this.accountToJwk(account)

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