import { InstantiableConfig } from '../../Instantiable.abstract'
import { Auth } from '../Auth'
import { Files } from '../Files'
import { Token } from '../Token'
import { Versions } from '../Versions'
import { JwtUtils } from '../utils/JwtUtils'

import { ServiceAgreement } from '../utils/ServiceAgreement'
import { SignatureUtils } from '../utils/SignatureUtils'
import { WebServiceConnector } from '../utils/WebServiceConnector'
import { NVMBaseApi } from './NVMBaseApi'

/**
 * Nevermined Utils API
 */
export class UtilsApi extends NVMBaseApi {

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
     * Returns the instance of the UtilsApi.
     * @param config - Configuration of the Nevermined instance
     * @returns {@link UtilsApi}
     */ 
    public static async getInstance(config: InstantiableConfig): Promise<UtilsApi> {
        const instance = new UtilsApi()
        instance.setInstanceConfig(config)

        instance.agreements = new ServiceAgreement(config)
        instance.auth = new Auth(config)        
        instance.fetch = new WebServiceConnector(config)
        instance.files = new Files(config)
        instance.jwt = new JwtUtils(config)
        instance.signature = new SignatureUtils(config)
        instance.token = new Token(config)
        instance.versions = await Versions.getInstance(config)

        return instance
    }

}
