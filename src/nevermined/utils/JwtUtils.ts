import { SessionKeyProvider, ZeroDevAccountSigner } from '@zerodev/sdk'
import { ethers } from 'ethers'
import { JWSHeaderParameters, SignJWT, decodeJwt, importJWK } from 'jose'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { Babysig } from '../../models'
import { Account } from '../Account'

export interface Eip712Data {
  message: string
  chainId: number
}

export interface TypedDataDomain {
  name: string
  version: string
  chainId: number
}

export interface TypedDataTypes {
  Nevermined: {
    name: string
    type: string
  }[]
}

export class EthSignJWT extends SignJWT {
  protectedHeader: JWSHeaderParameters

  setProtectedHeader(protectedHeader: JWSHeaderParameters) {
    this.protectedHeader = protectedHeader
    return this
  }

  public async ethSign(
    signer: ethers.Signer | ZeroDevAccountSigner<'ECDSA'> | SessionKeyProvider,
    eip712Data?: Eip712Data,
  ): Promise<string> {
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    let payload = this._payload
    if (eip712Data) {
      payload = {
        ...payload,
        eip712Data,
      }
    }

    const encodedPayload = encoder.encode(this.base64url(JSON.stringify(payload)))
    const encodedHeader = encoder.encode(this.base64url(JSON.stringify(this.protectedHeader)))
    const data = this.concat(encodedHeader, encoder.encode('.'), encodedPayload)

    // EIP-712 signature
    let sign: string
    if (eip712Data) {
      const domain = {
        name: 'Nevermined',
        version: '1',
        chainId: eip712Data.chainId,
      }

      const types = {
        Nevermined: [
          { name: 'from', type: 'address' },
          { name: 'message', type: 'string' },
          { name: 'token', type: 'string' },
        ],
      }

      const value = {
        from: await signer.getAddress(),
        message: eip712Data.message,
        token: decoder.decode(data),
      }
      sign = await EthSignJWT.signTypedMessage(domain, types, value, signer)
    } else {
      sign = await EthSignJWT.signMessage(decoder.decode(data), signer)
    }

    const input = ethers.getBytes(sign)

    const signed = this.base64url(input)
    const grantToken = `${decoder.decode(encodedHeader)}.${decoder.decode(
      encodedPayload,
    )}.${signed}`

    return grantToken
  }

  public static async signText(text: string | Uint8Array, signer: ethers.Signer): Promise<string> {
    try {
      return await signer.signMessage(text)
    } catch (e) {
      // Possibly the provider does not support personal_sign
      // Fallback to eth_sign
      return (signer as any)._legacySignMessage(text)
    }
  }

  private static async signMessage(
    message: string | Uint8Array,
    signer: ethers.Signer | ZeroDevAccountSigner<'ECDSA'> | SessionKeyProvider,
  ): Promise<string> {
    if ((signer as ZeroDevAccountSigner<'ECDSA'>).signMessageWith6492) {
      return (signer as ZeroDevAccountSigner<'ECDSA'>).signMessageWith6492(message)
    }

    return EthSignJWT.signText(message, signer as ethers.Signer)
  }

  private static async signTypedMessage(
    domain: TypedDataDomain,
    types: TypedDataTypes,
    value: Record<string, any>,
    signer: ethers.Signer | ZeroDevAccountSigner<'ECDSA'> | SessionKeyProvider,
  ): Promise<string> {
    if ((signer as ZeroDevAccountSigner<'ECDSA'>).signTypedDataWith6492) {
      return (signer as ZeroDevAccountSigner<'ECDSA'>).signTypedDataWith6492({
        domain,
        types: types as any,
        message: value,
        primaryType: '',
      })
    }
    return signer.signTypedData(domain as any, types as any, value)
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
    buffers.forEach((buffer) => {
      buf.set(buffer, i)
      i += buffer.length
    })
    return buf
  }
}

export class JwtUtils extends Instantiable {
  CLIENT_ASSERTION_TYPE = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
  BASE_AUD = '/api/v1/node/services'

  tokenCache: Map<string, string>

  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
    this.tokenCache = new Map()
  }

  public async getSigner(
    account: Account,
  ): Promise<ethers.Signer | ZeroDevAccountSigner<'ECDSA'> | SessionKeyProvider> {
    const address = ethers.getAddress(account.getId())
    return account.isZeroDev()
      ? account.zeroDevSigner
      : await this.nevermined.accounts.findSigner(address)
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
      y: publicKey.slice(32, 64).toString('base64'),
    })
  }

  public async generateClientAssertion(account: Account, message?: string) {
    let eip712Data: Eip712Data
    if (message) {
      eip712Data = {
        message,
        chainId: await this.nevermined.keeper.getNetworkId(),
      }
    }

    const address = ethers.getAddress(account.getId())
    const signer = await this.getSigner(account)
    return new EthSignJWT({
      iss: address,
    })
      .setProtectedHeader({ alg: 'ES256K' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .ethSign(signer, eip712Data)
  }

  public async generateAccessGrantToken(
    account: Account,
    serviceAgreementId: string,
    did: string,
    buyer?: string,
    babysig?: Babysig,
  ): Promise<string> {
    const address = ethers.getAddress(account.getId())
    const signer = await this.getSigner(account)

    return new EthSignJWT({
      iss: address,
      aud: this.BASE_AUD + '/access',
      sub: serviceAgreementId,
      did: did,
      eths: 'personal',
      buyer,
      babysig,
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
    obj: any,
  ): Promise<string> {
    const address = ethers.getAddress(account.getId())
    const signer = await this.getSigner(account)

    return new EthSignJWT({
      iss: address,
      aud: this.BASE_AUD + aud,
      sub: serviceAgreementId,
      did: did,
      ...obj,
      eths: 'personal',
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
    babysig?: Babysig,
  ): Promise<string> {
    const address = ethers.getAddress(account.getId())
    const signer = await this.getSigner(account)
    return new EthSignJWT({
      iss: address,
      aud: this.BASE_AUD + '/download',
      did: did,
      eths: 'personal',
      buyer,
      babysig,
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
    babysig?: Babysig,
  ): Promise<string> {
    const cacheKey = this.generateCacheKey(account.getId(), did)

    if (!this.tokenCache.has(cacheKey)) {
      const grantToken = await this.generateDownloadGrantToken(account, did, buyer, babysig)
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
    workflowId: string,
  ): Promise<string> {
    const address = ethers.getAddress(account.getId())
    const signer = await this.getSigner(account)

    return new EthSignJWT({
      iss: address,
      aud: this.BASE_AUD + '/execute',
      sub: serviceAgreementId,
      did: workflowId,
      eths: 'personal',
    })
      .setProtectedHeader({ alg: 'ES256K' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .ethSign(signer)
  }

  public async generateComputeGrantToken(
    account: Account,
    serviceAgreementId: string,
    executionId: string,
  ): Promise<string> {
    const address = ethers.getAddress(account.getId())
    const signer = await this.getSigner(account)

    return new EthSignJWT({
      iss: address,
      aud: this.BASE_AUD + '/compute',
      sub: serviceAgreementId,
      eths: 'personal',
      execution_id: executionId, // eslint-disable-line
    })
      .setProtectedHeader({ alg: 'ES256K' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .ethSign(signer)
  }

  public async generateNftAccessGrantToken(
    agreementId: string,
    did: string,
    serviceIndex: number,
    account: Account,
    buyer?: string,
    babysig?: Babysig,
  ): Promise<string> {
    const address = ethers.getAddress(account.getId())
    const signer = await this.getSigner(account)
    const params = {
      iss: address,
      aud: this.BASE_AUD + '/nft-access',
      sub: agreementId,
      did,
      eths: 'personal',
      buyer,
      babysig,
      service_index: serviceIndex,
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
    serviceIndex: number,
    account: Account,
    buyer?: string,
    babysig?: Babysig,
  ): Promise<string> {
    const cacheKey = this.generateCacheKey(agreementId, account.getId(), did)

    if (!this.tokenCache.has(cacheKey)) {
      const grantToken = await this.generateNftAccessGrantToken(
        agreementId,
        did,
        serviceIndex,
        account,
        buyer,
        babysig,
      )
      const accessToken = await this.nevermined.services.node.fetchToken(grantToken, 1)
      // TODO: enable the cache back when this issue is fixed in the Node: https://github.com/nevermined-io/node/issues/225
      // this.tokenCache.set(cacheKey, accessToken)

      return accessToken
    } else {
      return this.nevermined.utils.jwt.tokenCache.get(cacheKey)
    }
  }

  public isTokenValid(token: string): boolean {
    const decodedToken = decodeJwt(token)
    if (!decodedToken) {
      return false
    }
    const expiry = decodedToken.exp
    if (expiry) {
      const now = new Date()
      return now.getTime() < Number(expiry) * 1000
    }
  }
}
