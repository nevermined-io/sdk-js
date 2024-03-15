import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import {
  BigNumberish,
  FunctionFragment,
  HDNodeWallet,
  Mnemonic,
  Numeric,
  ParamType,
  ethers,
  getIndexedAccountPath,
} from 'ethers'
import { KeeperError } from '../../sdk'

export class BlockchainEthersUtils extends Instantiable {
  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  /**
   * Returns true of contract exists else it throws.
   * @returns {@link true} if the contract exists.
   */
  public async checkExists(address: string): Promise<boolean> {
    const storage = await this.web3.getStorage(address, 0)
    // check if storage is 0x0 at position 0, this is the case most of the cases
    if (storage === '0x0000000000000000000000000000000000000000000000000000000000000000') {
      // if the storage is empty, check if there is no code for this contract,
      // if so we can be sure it does not exist
      const code = await this.web3.getCode(address)
      if (code === '0x0') {
        // no contract in the blockchain dude
        throw new Error(`No contract deployed at address ${address}, sorry.`)
      }
    }

    return true
  }
}

//////////////////////////
///// UTILITIES //////////
//////////////////////////

export function searchAbiFunction(
  iface: ethers.Interface,
  funcName: string,
  args: any[] = [],
): FunctionFragment {
  const methods = (iface.fragments as FunctionFragment[]).filter(
    (f: FunctionFragment) => f.name === funcName,
  )
  const foundMethod = methods.find((f) => f.inputs.length === args.length) || methods[0]
  if (!foundMethod) {
    throw new KeeperError(`Method "${funcName}" is not part of contract`)
  }
  return foundMethod
}

export function getSignatureOfMethod(
  iface: ethers.Interface,
  funcName: string,
  args: any[] = [],
): string {
  const foundMethod = searchAbiFunction(iface, funcName, args)
  return foundMethod.format()
}

export function getInputsOfMethod(
  iface: ethers.Interface,
  funcName: string,
): ReadonlyArray<ethers.ParamType> {
  return searchAbiFunction(iface, funcName).inputs
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

////// ACCOUNTS

export function makeAccounts(seedphrase: string, numAccounts = 10): ethers.Wallet[] {
  const mnemonic = Mnemonic.fromPhrase(seedphrase)
  const node = ethers.HDNodeWallet.fromSeed(mnemonic.computeSeed())
  return getAccountsFromWallets(node, numAccounts)
}

export function makeAccount(seedphrase: string, accountIndex: number = 0): ethers.Wallet {
  const mnemonic = Mnemonic.fromPhrase(seedphrase)
  const node = ethers.HDNodeWallet.fromSeed(mnemonic.computeSeed())

  const acc = node.derivePath(getIndexedAccountPath(accountIndex))
  return new ethers.Wallet(acc.privateKey)
}

export function makeRandomAccounts(numAccounts = 10): ethers.Wallet[] {
  const node = ethers.Wallet.createRandom()
  return getAccountsFromWallets(node, numAccounts)
}

function getAccountsFromWallets(node: HDNodeWallet, numAccounts: number): ethers.Wallet[] {
  const accounts: ethers.Wallet[] = []

  for (let i = 0; i < numAccounts; i++) {
    // console.log(`Creating account ${i}`)
    const acc = node.derivePath(getIndexedAccountPath(i))
    const wallet = new ethers.Wallet(acc.privateKey)
    accounts.push(wallet)
  }
  return accounts
}

/////// HASHES

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

//// UNITS

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
