import { ethers } from 'ethers'
import { NeverminedOptions } from '../models'

export class Web3Provider {
  /**
   * Returns ethers.Provider instance.
   *
   * @returns web3 instance
   */
  public static getWeb3(
    config: Partial<NeverminedOptions> = {},
  ): ethers.JsonRpcProvider | ethers.BrowserProvider {
    if (config.web3Provider) {
      return new ethers.BrowserProvider(config.web3Provider)
    }

    return new ethers.JsonRpcProvider(config.web3ProviderUri)
  }
}
