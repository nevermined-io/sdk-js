import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { ContractHandler } from '../../keeper'
import { NeverminedInitializationOptions } from '../../models'
import { Files } from '../Files'
import { TokenUtils } from '../Token'
import { Versions } from '../Versions'
import { JwtUtils, ServiceAgreement, SignatureUtils, WebServiceConnector } from '../utils'
import { BlockchainEthersUtils } from '../utils/BlockchainEthersUtils'

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
   * Blockchain utils.
   */
  public blockchain: BlockchainEthersUtils

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
   * Contract utils
   */
  public contractHandler: ContractHandler

  /**
   * Creates a new AssetsApi
   * @param config - Configuration of the Nevermined instance
   * @returns {@link UtilsApi}
   */
  constructor(config: InstantiableConfig, initOptions: NeverminedInitializationOptions) {
    super()
    this.setInstanceConfig(config)

    this.agreements = new ServiceAgreement(config)
    this.fetch = new WebServiceConnector(config)
    this.files = new Files(config)
    this.jwt = new JwtUtils(config)
    this.versions = new Versions(config)
    this.signature = new SignatureUtils(config)
    if (initOptions.loadCore) {
      this.token = new TokenUtils(config)
      this.contractHandler = new ContractHandler(config)
      this.blockchain = new BlockchainEthersUtils(config)
    }
  }
}
