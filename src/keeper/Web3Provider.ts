import { ethers } from 'ethers'
import Config from '../models/Config'

export default class Web3Provider {
    /**
     * Returns Web3 instance.
     *
     * @returns web3 instance
     */
    public static getWeb3(
        config: Partial<Config> = {}
    ): ethers.providers.JsonRpcProvider {
        if (config.web3Provider) {
            return new ethers.providers.Web3Provider(config.web3Provider)
        }

        return new ethers.providers.JsonRpcProvider(config.nodeUri)
    }
}
