import { ethers } from 'ethers'
import { NeverminedOptions } from '../models'

export class Web3Provider {
  /**
   * Returns ethers.Provider instance.
   *
   * @returns web3 instance
   */
  public static async getWeb3(
    config: Partial<NeverminedOptions> = {},
  ): Promise<ethers.JsonRpcProvider | ethers.BrowserProvider> {
    if (config.web3Provider) {
      return new ethers.BrowserProvider(config.web3Provider)
    }

    // disabling the cache since this will lead to duplicated nonces on test networks
    // See https://docs.ethers.org/v6/api/providers/abstract-provider/#AbstractProviderOptions
    let provider = new ethers.JsonRpcProvider(config.web3ProviderUri, undefined, {
      cacheTimeout: -1,
    })

    // Adding the static network prevents ethers from calling eth_chainId with every call
    const network = await provider.getNetwork()
    console.log('network', network.chainId, network.name)
    provider = new ethers.JsonRpcProvider(config.web3ProviderUri, undefined, {
      cacheTimeout: -1,
      staticNetwork: network,
    })

    // provider.addListener('debug', (event) => {
    //   if (event.payload) {
    //     if (Array.isArray(event.payload)) {
    //       console.log(event.payload.map((e) => e.method))
    //     } else {
    //       console.log(event.payload.method)
    //     }
    //   }
    // })

    return provider
  }
}
