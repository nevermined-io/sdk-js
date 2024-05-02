import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { NeverminedInitializationOptions } from '../../types/GeneralTypes'
import { TokenUtils } from '../../nevermined/Token'
import { Versions } from '../../nevermined/Versions'
import { BlockchainViemUtils } from '../../nevermined/utils/BlockchainViemUtils'
import { ContractHandler } from '../../keeper/ContractHandler'
import { JwtUtils } from '../utils/JwtUtils'
import { ServiceAgreement } from '../utils/ServiceAgreement'
import { SignatureUtils } from '../utils/SignatureUtils'
import { WebServiceConnector } from '../utils/WebServiceConnector'

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
   * Jwt utils.
   */
  public jwt: JwtUtils

  /**
   * Blockchain utils.
   */
  public blockchain: BlockchainViemUtils

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

    this.jwt = new JwtUtils(config)
    this.versions = new Versions(config)
    this.signature = new SignatureUtils(config)
    if (initOptions.loadCore) {
      this.token = new TokenUtils(config)
      this.contractHandler = new ContractHandler(config)
      this.blockchain = new BlockchainViemUtils(config)
    }
  }
}
