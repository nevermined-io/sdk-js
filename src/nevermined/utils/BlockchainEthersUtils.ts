import { InstantiableConfig } from '../../Instantiable.abstract'
import { BigNumberish, Numeric, ParamType, ethers } from 'ethers'
import { NeverminedOptions } from '../../sdk'

export class BlockchainEthersUtils {
  config: InstantiableConfig

  constructor(_config: InstantiableConfig) {
    this.config = _config
  }

  public static async getWeb3Provider(
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
    provider = new ethers.JsonRpcProvider(config.web3ProviderUri, undefined, {
      cacheTimeout: -1,
      staticNetwork: network,
    })

    return provider
  }
}

export function getAddress(address: string): string {
  return ethers.getAddress(address)
}

export function isAddress(address: string): boolean {
  return ethers.isAddress(address)
}

export function getBytes(message: string): Uint8Array {
  return ethers.getBytes(message)
}

export function zeroPadValue(value: ethers.BytesLike, length: number): string {
  return ethers.zeroPadValue(value, length)
}

export function keccak256(message: string): string {
  return ethers.keccak256(ethers.toUtf8Bytes(message))
}

export function keccak256WithEncode(
  types: ReadonlyArray<string | ParamType>,
  values: ReadonlyArray<any>,
): string {
  const abiCoder = ethers.AbiCoder.defaultAbiCoder()
  return ethers.keccak256(abiCoder.encode(types, values))
}

/**
 * Returns a BigInt representation of value, parsed with _decimal_ digits.
 *
 * @param value - The string value to convert
 * @param decimals - The number of decimals
 * @returns The BigInt representation of _value_ parsed with _decimals_
 *
 * @example
 * ```ts
 * parseUnits("1.0", 18)
 * // 1000000000000000000n
 *
 * parseUnits("121.0", 9);
 * // 121000000000n
 * ```
 */
export const parseUnits = (value: string, decimals: string | Numeric = 18): bigint => {
  return ethers.parseUnits(value, decimals)
}

/**
 * Converts a ether _value_ into _wei_.
 *
 * @param value - The string value to convert
 * @returns The BigInt representation of _value_ in _wei_
 *
 * @example
 * ```ts
 * parseEther("1.0")
 * // 1000000000000000000n
 *
 * parseEther("-0.5")
 * // -500000000000000000n
 * ```
 */
export const parseEther = (value: string): bigint => {
  return ethers.parseEther(value)
}

/**
 * Converts a _wei_ value into _ether_.
 *
 * @param value - The value to format.
 * @returns The string of the formatted value
 *
 * @example
 * ```ts
 * const value = 1000000000000000000n
 *
 * formatEther(value)
 * // '1.0'
 * ```
 */
export const formatEther = (value: BigNumberish): string => {
  return ethers.formatEther(value)
}

/**
 * Returns a string representation of value formatted with _decimal_ digits.
 *
 * @param value - The value to format.
 * @returns The string of the formatted value
 *
 * @example
 * ```ts
 * const oneEther = 1000000000000000000n
 *
 * formatUnits(oneEther, 18)
 * // '1.0'
 * ```
 */
export const formatUnits = (value: BigNumberish, decimals = 18): string => {
  return ethers.formatUnits(value, decimals)
}
