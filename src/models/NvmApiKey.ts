import { JWTPayload, decodeJwt } from 'jose'
import { EthSignJWT } from '../nevermined/utils/JwtUtils'
import { SignatureUtils } from '../nevermined/utils/SignatureUtils'
import { getChecksumAddress } from '../nevermined/utils/BlockchainViemUtils'
import { NvmAccount } from './NvmAccount'
import { decryptMessage, encryptMessage } from '../common/helpers'

export class NvmApiKey implements JWTPayload {
  /**
   * The public address of the account issuing the key
   */
  iss: string

  /**
   * The chain id of the network the key is valid for. If zero the key is not having any network limitation
   */
  aud: string

  /**
   * The public address of the account the key is issued for. Typically the address of the Node/Backend who can process the key
   */
  sub: string

  /**
   * The version of the key
   */
  ver: string = 'v1'

  /**
   * The ZeroDev session key
   */
  zsk?: string

  /**
   * The Marketplace auth token
   */
  nvt?: string

  /**
   * JWT Expiration Time
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc7519#section-4.1.4 RFC7519#section-4.1.4}
   */
  exp?: number

  /**
   * JWT Issued At
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc7519#section-4.1.6 RFC7519#section-4.1.6}
   */
  iat?: number;

  /**
   * Additional attributes
   */
  [propName: string]: any

  public constructor() {}

  public static async generate(
    signatureUtils: SignatureUtils,
    issuerAccount: NvmAccount,
    zeroDevSessionKey: string,
    marketplaceAuthToken: string,
    receiverAddress: string,
    expirationTime: string = '1y',
    chainId: number = 0,
    additionalParams = {},
  ): Promise<NvmApiKey> {
    const issuerAddress = getChecksumAddress(issuerAccount.getId())
    const sub = getChecksumAddress(receiverAddress)

    // TODO: Evaluate if eip712Data is needed
    // const eip712Data = {
    //   message: 'Sign this message to generate the API Key',
    //   chainId,
    // }

    const params = {
      iss: issuerAddress,
      aud: chainId.toString(),
      sub,
      ver: 'v1',
      zsk: zeroDevSessionKey,
      nvt: marketplaceAuthToken,
      ...additionalParams,
    }

    const signed = await new EthSignJWT(params)
      .setProtectedHeader({ alg: 'ES256K' })
      .setIssuedAt()
      .setExpirationTime(expirationTime)
      .ethSign(signatureUtils, issuerAccount) //, eip712Data)
    return NvmApiKey.fromJWT(NvmApiKey.decode(signed))
  }

  public static async generateEncrypted(
    signatureUtils: SignatureUtils,
    issuerAccount: NvmAccount,
    zeroDevSessionKey: string,
    marketplaceAuthToken: string,
    receiverAddress: string,
    receiverPublicKey: string,
    expirationTime: string = '1y',
    chainId: number = 0,
    additionalParams = {},
  ): Promise<string> {
    const nvmApiKey = await this.generate(
      signatureUtils,
      issuerAccount,
      zeroDevSessionKey,
      marketplaceAuthToken,
      receiverAddress,
      expirationTime,
      chainId,
      additionalParams,
    )
    return encryptMessage(nvmApiKey.serialize(), receiverPublicKey)
  }

  public static async decryptAndDecode(encryptedJwt: string, privateKey: string) {
    const decrypted = await decryptMessage(encryptedJwt, privateKey)
    return NvmApiKey.deserialize(decrypted)
  }

  public isValid(chainId = 0): boolean {
    if (this.exp) {
      const now = new Date()
      if (now.getTime() > Number(this.exp) * 1000) return false
    }
    if (chainId !== 0 || this.aud !== '0') {
      if (this.aud !== this.client.chain?.id.toString()) return false
    }
    return true
  }

  public static fromJWT(jwt: JWTPayload): NvmApiKey {
    const nvmKey = new NvmApiKey()
    const _obj = JSON.parse(JSON.stringify(jwt))
    Object.keys(_obj)
      .filter((val) => val !== undefined)
      .forEach((key) => {
        nvmKey[key] = _obj[key]
      })
    return nvmKey
  }

  public static deserialize(str: string): NvmApiKey {
    return NvmApiKey.fromJWT(JSON.parse(str))
  }

  public serialize(): string {
    return this.toString()
  }

  public toString(): string {
    return JSON.stringify(this)
  }

  public static decode(str: string) {
    return decodeJwt(str)
  }

  public hash() {
    return SignatureUtils.hash(this.serialize())
  }

  static hash(serialized: string) {
    return SignatureUtils.hash(serialized)
  }
}
