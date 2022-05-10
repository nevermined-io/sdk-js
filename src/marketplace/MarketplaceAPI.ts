import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

const authPath = '/api/v1/auth'

export class MarketplaceApi extends Instantiable {
    protected get url() {
        return this.config.marketplaceUri
    }

    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }

    // prettier-ignore
    public async login(clientAssertion: string): Promise<void> {

      const payload = {
          'client_assertion_type':
              'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
          'client_assertion': clientAssertion
      };

      try {
          const response = await this.nevermined.utils.fetch.post(`${this.url}${authPath}/login`, JSON.stringify(payload));

          this.config.marketplaceAuthToken = (await response.json()).access_token
      } catch (error) {
          this.logger.error( 'Error login:', error)
      }
    }
}
