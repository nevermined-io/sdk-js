import { JWTPayload, decodeJwt } from 'jose'

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
}
