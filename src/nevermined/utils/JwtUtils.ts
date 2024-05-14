import { JWSHeaderParameters, SignJWT, decodeJwt, importJWK } from 'jose'
import { Account, Hash, LocalAccount, hexToBytes, toHex } from 'viem'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { NvmAccount } from '../../models/NvmAccount'
import { getChecksumAddress } from '../../nevermined/utils/BlockchainViemUtils'
import { SignatureUtils } from '../../nevermined/utils/SignatureUtils'
import { Babysig, Eip712Data } from '../../types/GeneralTypes'
import { deflateSync, inflateSync } from 'fflate'
import {
  decryptMessage,
  encryptMessage,
  urlSafeBase64Decode,
  urlSafeBase64Encode,
} from '../../common/helpers'

export class EthSignJWT extends SignJWT {
  protectedHeader: JWSHeaderParameters

  setProtectedHeader(protectedHeader: JWSHeaderParameters) {
    this.protectedHeader = protectedHeader
    return this
  }

  public async ethSign(
    signatureUtils: SignatureUtils,
    account: NvmAccount,
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
    let sign: Hash
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
        from: account.getId(),
        message: eip712Data.message,
        token: decoder.decode(data),
      }

      sign = await signatureUtils.signTypedData(domain, types, value, account)
    } else {
      sign = await signatureUtils.signText(decoder.decode(data), account)
    }

    const input = hexToBytes(sign)

    const signed = this.base64url(input)
    const grantToken = `${decoder.decode(encodedHeader)}.${decoder.decode(
      encodedPayload,
    )}.${signed}`

    return grantToken
  }

  public static async signText(
    text: string | Uint8Array,
    account: Account,
  ): Promise<string | undefined> {
    try {
      const message = typeof text === 'string' ? text : toHex(text)
      return (account as LocalAccount).signMessage({ message: { raw: message as `0x${string}` } })
    } catch (e) {
      // Possibly the provider does not support personal_sign
      // Fallback to eth_sign
      //return (signer as any)._legacySignMessage(text)
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
    buffers.forEach((buffer) => {
      buf.set(buffer, i)
      i += buffer.length
    })
    return buf
  }
}

export class JwtUtils extends Instantiable {
  static CLIENT_ASSERTION_TYPE = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
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

  public async accountToJwk(account: NvmAccount): Promise<any> {
    const address = account.getId().toLowerCase()

    // Currently only works with HDWalletProvider
    // eslint-disable-next-line
    // @ts-ignore
    const publicKey = this.web3.currentProvider.wallets[address].getPublicKey()
    // eslint-disable-next-line
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

  public async generateClientAssertion(account: NvmAccount, message?: string) {
    let eip712Data
    if (message) {
      eip712Data = {
        message,
        chainId: await this.nevermined.keeper.getNetworkId(),
      }
    }
    /// USE nevermined.accounts

    const address = getChecksumAddress(account.getId())

    return new EthSignJWT({
      iss: address,
    })
      .setProtectedHeader({ alg: 'ES256K' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .ethSign(this.nevermined.utils.signature, account, eip712Data)
  }

  public async generateAccessGrantToken(
    account: NvmAccount,
    serviceAgreementId: string,
    did: string,
    buyer?: string,
    babysig?: Babysig,
  ): Promise<string> {
    const address = getChecksumAddress(account.getId())

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
      .ethSign(this.nevermined.utils.signature, account)
  }

  public async generateToken(
    account: NvmAccount,
    serviceAgreementId: string,
    did: string,
    aud: string,
    obj: any,
  ): Promise<string> {
    const address = getChecksumAddress(account.getId())

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
      .ethSign(this.nevermined.utils.signature, account)
  }

  public async generateDownloadGrantToken(
    account: NvmAccount,
    did: string,
    buyer?: string,
    babysig?: Babysig,
  ): Promise<string> {
    const address = getChecksumAddress(account.getId())

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
      .ethSign(this.nevermined.utils.signature, account)
  }

  public async getDownloadGrantToken(
    did: string,
    account: NvmAccount,
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
      return this.nevermined.utils.jwt.tokenCache.get(cacheKey) as string
    }
  }

  public async generateExecuteGrantToken(
    account: NvmAccount,
    serviceAgreementId: string,
    workflowId: string,
  ): Promise<string> {
    const address = getChecksumAddress(account.getId())

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
      .ethSign(this.nevermined.utils.signature, account)
  }

  public async generateComputeGrantToken(
    account: NvmAccount,
    serviceAgreementId: string,
    executionId: string,
  ): Promise<string> {
    const address = getChecksumAddress(account.getId())

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
      .ethSign(this.nevermined.utils.signature, account)
  }

  public async generateNftAccessGrantToken(
    agreementId: string,
    did: string,
    serviceIndex: number,
    account: NvmAccount,
    buyer?: string,
    babysig?: Babysig,
  ): Promise<string> {
    const address = getChecksumAddress(account.getId())

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
      .ethSign(this.nevermined.utils.signature, account)
  }

  public async getNftAccessGrantToken(
    agreementId: string,
    did: string,
    serviceIndex: number,
    account: NvmAccount,
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
      return this.nevermined.utils.jwt.tokenCache.get(cacheKey) as string
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

    return false
  }

  public async generateNeverminedApiKey(
    issuerAccount: NvmAccount,
    zeroDevSessionKey: string,
    marketplaceAuthToken: string,
    receiverAddress: string,
    expirationTime: string = '1y',
    chainId: number = 0,
  ): Promise<string> {
    const issuerAddress = getChecksumAddress(issuerAccount.getId())
    const sub = getChecksumAddress(receiverAddress)

    const eip712Data = {
      message: 'Sign this message to generate the API Key',
      chainId,
    }

    const params = {
      iss: issuerAddress,
      aud: chainId.toString(),
      sub,
      ver: 'v1',
      zsk: zeroDevSessionKey,
      nvt: marketplaceAuthToken,
    }

    const signed = await new EthSignJWT(params)
      .setProtectedHeader({ alg: 'ES256K' })
      .setIssuedAt()
      .setExpirationTime(expirationTime)
      .ethSign(this.nevermined.utils.signature, issuerAccount, eip712Data)
    return JwtUtils.createCompressedJwt(signed)
  }

  public async generateEncryptedNeverminedApiKey(
    issuerAccount: NvmAccount,
    zeroDevSessionKey: string,
    marketplaceAuthToken: string,
    receiverAddress: string,
    receiverPublicKey: string,
    expirationTime: string = '1y',
    chainId: number = 0,
  ): Promise<string> {
    const nvmApiKey = await this.generateNeverminedApiKey(
      issuerAccount,
      zeroDevSessionKey,
      marketplaceAuthToken,
      receiverAddress,
      expirationTime,
      chainId,
    )
    return encryptMessage(nvmApiKey, receiverPublicKey)
  }

  public async decryptAndDecodeNeverminedApiKey(encryptedJwt: string, privateKey: string) {
    const decryptedJwt = await decryptMessage(encryptedJwt, privateKey)
    return JwtUtils.decodeNeverminedApiKey(decryptedJwt)
  }

  public isNeverminedApiKeyValid(compressedJwt: string): boolean {
    let decodedToken
    try {
      const token = JwtUtils.decompressJwt(compressedJwt)
      decodedToken = decodeJwt(token)
    } catch {
      // Token might be already decompressed
      decodedToken = compressedJwt
    }

    if (!decodedToken) {
      return false
    }
    const expiry = decodedToken.exp
    if (expiry) {
      const now = new Date()
      return now.getTime() < Number(expiry) * 1000
    }
    if (decodedToken.aud !== '0' && decodedToken.aud !== this.client.chain?.id) {
      return false
    }
    return false
  }

  static decodeNeverminedApiKey(compressedJwt: string) {
    const token = JwtUtils.decompressJwt(compressedJwt)
    return decodeJwt(token)
  }

  static createCompressedJwt(token: string) {
    const compressed = deflateSync(new TextEncoder().encode(token))
    return urlSafeBase64Encode(compressed)
  }

  static decompressJwt(compressedJwt: string) {
    const decoded = urlSafeBase64Decode(compressedJwt)
    const decompressed = inflateSync(decoded)
    return new TextDecoder().decode(decompressed)
  }

  static hashNeverminedApiKey(nvmApiKey: string) {
    return SignatureUtils.hash(nvmApiKey)
  }
}
