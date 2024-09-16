import { JWTPayload, decodeJwt } from 'jose'
import { EthSignJWT } from '../nevermined/utils/JwtUtils'
import { SignatureUtils } from '../nevermined/utils/SignatureUtils'
import { getChecksumAddress } from '../nevermined/utils/BlockchainViemUtils'
import { NvmAccount } from './NvmAccount'
import { decryptMessage, encryptMessage, urlSafeBase64Decode } from '../common/helpers'
import { bytesToHex } from 'viem/utils'

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
  ver: string = 'v2'

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

  /**
   * It generates a new serialized and encrypted NvmApiKey including the ZeroDev session key and the Marketplace auth token.
   * The string  representing this key can be used to authenticate against the Nevermined API.
   * @param signatureUtils The SignatureUtils instance
   * @param issuerAccount The account issuing the key
   * @param zeroDevSessionKey The ZeroDev session key
   * @param marketplaceAuthToken The Marketplace  Auth Token
   * @param receiverAddress The address of the account the key is issued for
   * @param receiverPublicKey The public key of the account the key is issued for
   * @param expirationTime When the key will expire
   * @param chainId The chain id of the network the key is valid for
   * @param additionalParams Addintional  params to be added to the Key generated
   * @returns The encrypted string representing the @see {@link NvmApiKey}
   */
  public static async generate(
    signatureUtils: SignatureUtils,
    issuerAccount: NvmAccount,
    zeroDevSessionKey: string | undefined,
    marketplaceAuthToken: string,
    receiverAddress: string,
    receiverPublicKey: string,
    expirationTime: string = '1y',
    additionalParams = {},
  ): Promise<string> {
    const issuerAddress = getChecksumAddress(issuerAccount.getId())
    const chainId = signatureUtils.client.chain?.id || 0
    const sub = getChecksumAddress(receiverAddress)

    // const eip712Data = {
    //   message: 'Sign this message to generate the Encrypted Nevermined API Key',
    //   ...(chainId > 0 && { chainId }),
    // }
    const params = {
      iss: issuerAddress,
      aud: chainId.toString(),
      sub,
      ver: 'v2',
      zsk: zeroDevSessionKey,
      nvt: marketplaceAuthToken,
      // eip712Data,
      ...additionalParams,
    }

    const signedJWT = await new EthSignJWT(params)
      .setProtectedHeader({ alg: 'ES256K' })
      .setIssuedAt()
      .setExpirationTime(expirationTime)
      .ethSign(signatureUtils, issuerAccount)

    return encryptMessage(signedJWT, receiverPublicKey)
  }

  public static async generateWithoutSessionKey(
    signatureUtils: SignatureUtils,
    issuerAccount: NvmAccount,
    marketplaceAuthToken: string,
    receiverAddress: string,
    receiverPublicKey: string,
    expirationTime: string = '1y',
    additionalParams = {},
  ): Promise<string> {
    return NvmApiKey.generate(
      signatureUtils,
      issuerAccount,
      undefined,
      marketplaceAuthToken,
      receiverAddress,
      receiverPublicKey,
      expirationTime,
      additionalParams,
    )
  }

  /**
   * Givena an encrypted JWT and a private key, it decrypts and decodes the JWT into a NvmApiKey
   * @param encryptedJwt The encrypted JWT
   * @param privateKey The private key representing the account
   * @returns The @see {@link NvmApiKey}
   */
  public static async decryptAndDecode(encryptedJwt: string, privateKey: string) {
    const decrypted = await decryptMessage(encryptedJwt, privateKey)
    return NvmApiKey.fromJWT(decrypted)
  }

  /**
   * Given a signed JWT, it recovers the signer address
   * @param jwtString The signed JWT
   * @returns The signer address
   */
  public static async getSignerAddress(jwtString: string): Promise<string> {
    try {
      const tokens = jwtString.split('.')
      const signature = bytesToHex(urlSafeBase64Decode(tokens[2]))
      return SignatureUtils.recoverSignerAddress(`${tokens[0]}.${tokens[1]}`, signature)
    } catch (e) {
      throw new Error(`Error recovering signer address: ${e.message}`)
    }
  }

  /**
   * It checks if the NVM API Key attributes are valid
   * @param chainId The chain id of the network the key is valid for
   * @returns true if the key is valid, false otherwise
   */
  public isValid(chainId = 0): boolean {
    if (this.exp) {
      const now = new Date()
      if (now.getTime() > Number(this.exp) * 1000) return false
    }
    if (chainId !== 0) {
      if (Number(this.aud) !== chainId) return false
    }
    return true
  }

  /**
   * It generates a signed JWT from the NvmApiKey
   * @param signatureUtils The SignatureUtils instance
   * @param issuerAccount The account issuing the key
   * @returns the string in JWT format represeting the NvmApiKey
   */
  public async toJWT(signatureUtils: SignatureUtils, issuerAccount: NvmAccount): Promise<string> {
    const params = {}
    Object.keys(this)
      .filter((val) => val !== undefined)
      .forEach((key) => {
        if (!key.startsWith('_')) params[key] = this[key]
      })

    const jwt = new EthSignJWT(params).setProtectedHeader({ alg: 'ES256K' }).setIssuedAt(this.iat)
    if (this.exp) jwt.setExpirationTime(this.exp)
    return jwt.ethSign(signatureUtils, issuerAccount)
  }

  /**
   * It generates the hash in JWT format of the NvmApiKey
   * @param signatureUtils the SignatureUtils instance
   * @param issuerAccount the account  issuing the key
   * @returns a JWT string representing the hash of the NvmApiKey
   */
  public async hashJWT(signatureUtils: SignatureUtils, issuerAccount: NvmAccount): Promise<string> {
    const address = getChecksumAddress(issuerAccount.getId())

    return new EthSignJWT({
      iss: address,
      sub: this.hash(),
      exp: this.exp,
    })
      .setProtectedHeader({ alg: 'ES256K' })
      .setIssuedAt()
      .ethSign(signatureUtils, issuerAccount)
  }

  /**
   * It regenerates the NvmApiKey from a JSON object
   * @param jwt JWTPayload in JSON format
   * @returns the @see {@link NvmApiKey}
   */
  public static fromJSON(jwt: JWTPayload): NvmApiKey {
    const nvmKey = new NvmApiKey()
    const str = JSON.stringify(jwt)
    const _obj = JSON.parse(str)
    Object.keys(_obj)
      .filter((val) => val !== undefined)
      .forEach((key) => {
        nvmKey[key] = _obj[key]
      })
    return nvmKey
  }

  /**
   * It regenerates the NvmApiKey from a JWT
   * @param jwtString the string in JWT format represeting the NvmApiKey
   * @returns the @see {@link NvmApiKey}
   */
  public static fromJWT(jwtString: string): NvmApiKey {
    const jwt = NvmApiKey.decodeJWT(jwtString)
    return NvmApiKey.fromJSON(jwt)
  }

  /**
   * It regenerates the NvmApiKey from a string
   * @param str the string represeting the NvmApiKey
   * @returns the @see {@link NvmApiKey}
   */
  public static deserialize(str: string): NvmApiKey {
    return NvmApiKey.fromJSON(JSON.parse(str))
  }

  /**
   * It serializes the NVM Api Key into a string
   * @returns a string representing the NVM API Key
   */
  public serialize(): string {
    return this.toString()
  }

  /**
   * It serializes the NVM Api Key into a string
   * @returns a string representing the NVM API Key
   */
  public toString(): string {
    return JSON.stringify(this)
  }

  /**
   * It decodes a string JWT into a JWTPayload
   * @param str jwt string
   * @returns the JWTPayload
   */
  public static decodeJWT(str: string) {
    return decodeJwt(str)
  }

  /**
   * It generates the hash of the NvmApiKey
   * @returns a string representing the hash of the NvmApiKey
   */
  public hash() {
    return SignatureUtils.hash(this.serialize())
  }

  /**
   * Given a serialized string, it generates the hash
   * @param serialized the serialized string
   * @returns the hash
   */
  static hash(serialized: string) {
    return SignatureUtils.hash(serialized)
  }
}
