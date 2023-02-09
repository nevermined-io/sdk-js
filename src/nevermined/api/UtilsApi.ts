import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { Files } from '../Files'
import { TokenUtils } from '../Token'
import { Versions } from '../Versions'
import { JwtUtils, ServiceAgreement, SignatureUtils, WebServiceConnector } from '../utils'

/**
 * Nevermined Utils API
 */
export class UtilsApi extends Instantiable {
  /**
   * Agreement utils.
   */
  public agreements: ServiceAgreement

  /**
   * Fetch utils.
   */
  public fetch: WebServiceConnector

  /**
   * Files utils.
   */
  public files: Files

  /**
   * Jwt utils.
   */
  public jwt: JwtUtils

  /**
   * Signature utils.
   */
  public signature: SignatureUtils

  /**
   * Token utils.
   */
  public token: TokenUtils

  /**
   * Token utils.
   */
  public versions: Versions

  /**
   * Creates a new AssetsApi
   * @param config - Configuration of the Nevermined instance
   * @returns {@link UtilsApi}
   */
  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)

    this.agreements = new ServiceAgreement(config)
    this.fetch = new WebServiceConnector(config)
    this.files = new Files(config)
    this.jwt = new JwtUtils(config)
    this.signature = new SignatureUtils(config)
    this.token = new TokenUtils(config)
    this.versions = new Versions(config)
  }
}
