import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { JwtUtils } from './JwtUtils'

import { ServiceAgreement } from './ServiceAgreement'
import { SignatureUtils } from './SignatureUtils'
import { WebServiceConnector } from './WebServiceConnector'

/**
 * Utils internal submodule of Nevermined.
 */
export class Utils extends Instantiable {
    /**
     * Returns the instance of Utils.
     * @return {Promise<Utils>}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Utils> {
        const instance = new Utils()
        instance.setInstanceConfig(config)

        instance.agreements = new ServiceAgreement(config)
        instance.signature = new SignatureUtils(config)
        instance.fetch = new WebServiceConnector(config)
        instance.jwt = new JwtUtils(config)

        return instance
    }

    /**
     * Agreement utils.
     * @type {ServiceAgreement}
     */
    public agreements: ServiceAgreement

    /**
     * Signature utils.
     * @type {SignatureUtils}
     */
    public signature: SignatureUtils

    /**
     * Fetch utils.
     * @type {WebServiceConnector}
     */
    public fetch: WebServiceConnector

    /**
     * Jwt utils.
     * @type {JwtUtils}
     */
    public jwt: JwtUtils
}
