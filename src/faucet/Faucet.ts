import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { HttpError, FaucetError } from '../errors'

/**
 * Provides a interface with Faucet.
 * Faucet provides an off-chain database store for metadata about data assets.
 */
export class Faucet extends Instantiable {
    private get url() {
        return this.config.faucetUri
    }

    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }

    public async requestEth(address: string): Promise<string> {
        const args = {
            address: address,
            agent: 'sdk-js'
        }

        try {
            const response = await this.nevermined.utils.fetch.post(
                this.getFaucetEndpoint(),
                decodeURI(JSON.stringify(args))
            )
            if (!response.ok) {
                throw new HttpError(
                    `${response.statusText} ${response.url}`,
                    response.status
                )
            }
            return await response.text()
        } catch (e) {
            throw new FaucetError(e)
        }
    }

    public getFaucetEndpoint() {
        return `${this.url}/faucet`
    }
}
