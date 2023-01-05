import { ethers } from 'ethers'
import Config from '../models/Config'
import { isValidWeb3Provider } from "./utils";

export default class Web3Provider {
    /**
     * Returns ethers.Provider instance.
     *
     * @returns web3 instance
     */
    public static getWeb3(
        config: Partial<Config> = {}
    ): ethers.providers.JsonRpcProvider {
        if (config.web3Provider) {
            return new ethers.providers.Web3Provider(config.web3Provider)
        }
        const web3 =  new ethers.providers.JsonRpcProvider(config.web3ProviderUri)
        isValidWeb3Provider(web3).then(r => r)
    }
}
