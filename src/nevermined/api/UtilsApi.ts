import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { Auth } from '../Auth'
import { Files } from '../Files'
import { Token } from '../Token'
import { Versions } from '../Versions'
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
     * Auth utils.
     */
     public auth: Auth

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
      public token: Token

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
        this.auth = new Auth(config)        
        this.fetch = new WebServiceConnector(config)
        this.files = new Files(config)
        this.jwt = new JwtUtils(config)
        this.signature = new SignatureUtils(config)
        this.token = new Token(config)
        this.versions = new Versions(config)
    }

}
