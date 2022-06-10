import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { ApiError, HttpError } from '../errors'

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
    public async login(clientAssertion: string): Promise<string> {

      const payload = {
          'client_assertion_type':
              'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
          'client_assertion': clientAssertion
      };

      try {
          const response = await this.nevermined.utils.fetch.post(`${this.url}${authPath}/login`, JSON.stringify(payload));

          if (!response.ok) {
              throw new HttpError(`Error Login - ${response.statusText} ${response.url}`, response.status)
          }

          this.config.marketplaceAuthToken = (await response.json()).access_token

          return this.config.marketplaceAuthToken
      } catch (error) {
          throw new ApiError(error)
      }
    }

    // prettier-ignore
    public async addNewAddress(clientAssertion: string): Promise<string> {
        const payload = {
            'client_assertion_type':
                'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            'client_assertion': clientAssertion
        }

        try {
            const response = await this.nevermined.utils.fetch.post(
                `${this.url}${authPath}/address`,
                JSON.stringify(payload),
                {
                    Authorization: `Bearer ${this.config.marketplaceAuthToken}`
                }
            )

            if (!response.ok) {
                throw new HttpError(
                    `Error add address - ${response.statusText} ${response.url}`,
                    response.status
                )
            }

            this.config.marketplaceAuthToken = (await response.json()).access_token

            return this.config.marketplaceAuthToken
        } catch (error) {
            throw new ApiError(error)
        }
    }
}
