import { importJWK, SignJWT, JWSHeaderParameters } from 'jose'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { Account } from '../Account'
import { Bytes, ethers } from 'ethers'
import { Babysig } from '../../models'

export class EthSignJWT extends SignJWT {
    protectedHeader: JWSHeaderParameters

    setProtectedHeader(protectedHeader: JWSHeaderParameters) {
        this.protectedHeader = protectedHeader
        return this
    }

    public async ethSign(signer: ethers.Signer): Promise<string> {
        const encoder = new TextEncoder()
        const decoder = new TextDecoder()

        const encodedPayload = encoder.encode(
            this.base64url(JSON.stringify(this._payload))
        )
        const encodedHeader = encoder.encode(
            this.base64url(JSON.stringify(this.protectedHeader))
        )
        const data = this.concat(encodedHeader, encoder.encode('.'), encodedPayload)

        const sign = await EthSignJWT.signText(decoder.decode(data), signer)

        const input = ethers.utils.arrayify(sign)

        const signed = this.base64url(input)
        const grantToken = `${decoder.decode(encodedHeader)}.${decoder.decode(
            encodedPayload
        )}.${signed}`

        return grantToken
    }

    public static async signText(
        text: string | Bytes,
        signer: ethers.Signer
    ): Promise<string> {
        try {
            return await signer.signMessage(text)
        } catch (e) {
            // Possibly the provider does not support personal_sign
            // Fallback to eth_sign
            return (signer as any)._legacySignMessage(text)
        }
    }

    private base64url(input: Uint8Array | string): string {
        return Buffer.from(input)
            .toString('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
    }

    private concat(...buffers: Uint8Array[]): Uint8Array {
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
    BASE_AUD = '/api/v1/node/services'

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const publicKey = this.web3.currentProvider.wallets[address].getPublicKey()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const privateKey = this.web3.currentProvider.wallets[address].getPrivateKey()

        return importJWK({
            alg: 'ES256K',
            crv: 'secp256k1',
            kty: 'EC',
            d: privateKey.toString('base64'),
            x: publicKey.slice(0, 32).toString('base64'),
            y: publicKey.slice(32, 64).toString('base64')
        })
    }

    public async generateClientAssertion(account: Account) {
        const address = ethers.utils.getAddress(account.getId())
        const signer = await this.nevermined.accounts.findSigner(address)
        return new EthSignJWT({
            iss: address
        })
            .setProtectedHeader({ alg: 'ES256K' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .ethSign(signer)
    }

    public async generateAccessGrantToken(
        account: Account,
        serviceAgreementId: string,
        did: string,
        buyer?: string,
        babysig?: Babysig
    ): Promise<string> {
        const address = ethers.utils.getAddress(account.getId())
        const signer = await this.nevermined.accounts.findSigner(address)

        return new EthSignJWT({
            iss: address,
            aud: this.BASE_AUD + '/access',
            sub: serviceAgreementId,
            did: did,
            eths: 'personal',
            buyer,
            babysig
        })
            .setProtectedHeader({ alg: 'ES256K' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .ethSign(signer)
    }

    public async generateToken(
        account: Account,
        serviceAgreementId: string,
        did: string,
        aud: string,
        obj: any
    ): Promise<string> {
        const address = ethers.utils.getAddress(account.getId())
        const signer = await this.nevermined.accounts.findSigner(address)

        return new EthSignJWT({
            iss: address,
            aud: this.BASE_AUD + aud,
            sub: serviceAgreementId,
            did: did,
            ...obj,
            eths: 'personal'
        })
            .setProtectedHeader({ alg: 'ES256K' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .ethSign(signer)
    }

    public async generateDownloadGrantToken(
        account: Account,
        did: string,
        buyer?: string,
        babysig?: Babysig
    ): Promise<string> {
        const address = ethers.utils.getAddress(account.getId())
        const signer = await this.nevermined.accounts.findSigner(address)

        return new EthSignJWT({
            iss: address,
            aud: this.BASE_AUD + '/download',
            did: did,
            eths: 'personal',
            buyer,
            babysig
        })
            .setProtectedHeader({ alg: 'ES256K' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .ethSign(signer)
    }

    public async getDownloadGrantToken(
        did: string,
        account: Account,
        buyer?: string,
        babysig?: Babysig
    ): Promise<string> {
        const cacheKey = this.generateCacheKey(account.getId(), did)

        if (!this.tokenCache.has(cacheKey)) {
            const grantToken = await this.generateDownloadGrantToken(
                account,
                did,
                buyer,
                babysig
            )
            const accessToken = await this.nevermined.services.node.fetchToken(grantToken)
            this.tokenCache.set(cacheKey, accessToken)

            return accessToken
        } else {
            return this.nevermined.utils.jwt.tokenCache.get(cacheKey)
        }
    }

    public async generateExecuteGrantToken(
        account: Account,
        serviceAgreementId: string,
        workflowId: string
    ): Promise<string> {
        const address = ethers.utils.getAddress(account.getId())
        const signer = await this.nevermined.accounts.findSigner(address)

        return new EthSignJWT({
            iss: address,
            aud: this.BASE_AUD + '/execute',
            sub: serviceAgreementId,
            did: workflowId,
            eths: 'personal'
        })
            .setProtectedHeader({ alg: 'ES256K' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .ethSign(signer)
    }

    public async generateComputeGrantToken(
        account: Account,
        serviceAgreementId: string,
        executionId: string
    ): Promise<string> {
        const address = ethers.utils.getAddress(account.getId())
        const signer = await this.nevermined.accounts.findSigner(address)

        return new EthSignJWT({
            iss: address,
            aud: this.BASE_AUD + '/compute',
            sub: serviceAgreementId,
            eths: 'personal',
            execution_id: executionId // eslint-disable-line
        })
            .setProtectedHeader({ alg: 'ES256K' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .ethSign(signer)
    }

    public async generateNftAccessGrantToken(
        agreementId: string,
        did: string,
        account: Account,
        buyer?: string,
        babysig?: Babysig
    ): Promise<string> {
        const address = ethers.utils.getAddress(account.getId())
        const signer = await this.nevermined.accounts.findSigner(address)

        const params = {
            iss: address,
            aud: this.BASE_AUD + '/nft-access',
            sub: agreementId,
            did,
            eths: 'personal',
            buyer,
            babysig
        }

        return new EthSignJWT(params)
            .setProtectedHeader({ alg: 'ES256K' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .ethSign(signer)
    }

    public async getNftAccessGrantToken(
        agreementId: string,
        did: string,
        account: Account,
        buyer?: string,
        babysig?: Babysig
    ): Promise<string> {
        const cacheKey = this.generateCacheKey(agreementId, account.getId(), did)

        if (!this.tokenCache.has(cacheKey)) {
            const grantToken = await this.generateNftAccessGrantToken(
                agreementId,
                did,
                account,
                buyer,
                babysig
            )
            const accessToken = await this.nevermined.services.node.fetchToken(grantToken)
            this.tokenCache.set(cacheKey, accessToken)

            return accessToken
        } else {
            return this.nevermined.utils.jwt.tokenCache.get(cacheKey)
        }
    }
}
