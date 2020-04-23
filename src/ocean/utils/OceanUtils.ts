import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'

import { ServiceAgreement } from './ServiceAgreement'
import { SignatureUtils } from './SignatureUtils'
import { WebServiceConnector } from './WebServiceConnector'

/**
 * Utils internal submodule of Ocean Protocol.
 */
export class OceanUtils extends Instantiable {
    /**
     * Returns the instance of OceanUtils.
     * @return {Promise<OceanUtils>}
     */
    public static async getInstance(config: InstantiableConfig): Promise<OceanUtils> {
        const instance = new OceanUtils()
        instance.setInstanceConfig(config)

        instance.agreements = new ServiceAgreement(config)
        instance.signature = new SignatureUtils(config)
        instance.fetch = new WebServiceConnector(config)

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
}
