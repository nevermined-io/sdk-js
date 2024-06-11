import { signerToEcdsaValidator } from '@zerodev/ecdsa-validator'
import {
  SponsorUserOperationParameters,
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from '@zerodev/sdk'
import {
  deserializeSessionKeyAccount,
  oneAddress,
  serializeSessionKeyAccount,
  signerToSessionKeyValidator,
} from '@zerodev/session-key'
import { ENTRYPOINT_ADDRESS_V06 } from 'permissionless'
import { EntryPoint } from 'permissionless/types'
import {
  Abi,
  AbiEvent,
  AbiFunction,
  PublicClient,
  TransactionReceiptNotFoundError,
  createPublicClient,
  encodeAbiParameters,
  getAbiItem,
  getAddress,
  getContract,
  hexToBigInt,
  http,
  isAddress,
  pad,
  stringToBytes,
  stringToHex,
  toBytes,
  toHex,
  formatEther as viemFormatEther,
  formatUnits as viemFormatUnits,
  keccak256 as viemKeccak256,
  parseEther as viemParseEther,
  parseUnits as viemParseUnits,
} from 'viem'
import {
  english,
  generateMnemonic,
  generatePrivateKey,
  mnemonicToAccount,
  privateKeyToAccount,
} from 'viem/accounts'
import { Instantiable, InstantiableConfig, Web3Clients } from '../../Instantiable.abstract'
import { _sleep } from '../../common/helpers'
import { KeeperError } from '../../errors/NeverminedErrors'
import { NvmAccount } from '../../models/NvmAccount'
import { didZeroX } from '../../utils/ConversionTypeHelpers'
import { getChain } from '../../utils/Network'

/**
 * Utility class with methods that allow the interaction with the blockchain.
 * This class uses Viem library to interact with the blockchain.
 */
export class BlockchainViemUtils extends Instantiable {
  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  /**
   * Given an artifact, it deploys the contract and returns the contract instance.
   * @param artifact - the contract artifact
   * @param from - the deployer account
   * @param args - parameters to be passed to the contract during the initialization
   * @returns a contract instance
   */
  public async deployAbi(
    artifact: { name?: string; abi: Abi; bytecode: `0x${string}` },
    from: NvmAccount,
    args: string[] = [],
  ) {
    return await deployContractInstance(artifact, from, args, this.client)
  }

  /**
   * Given an already deployed contract address and the ABI, it returns the contract instance.
   * @param contractAddress - the contract address
   * @param abi - the contract artifact
   * @returns a contract instance
   */
  public async loadContract(contractAddress: string, abi: Abi) {
    await this.checkExists(contractAddress)
    const contract = getContract({
      abi: abi,
      address: contractAddress as `0x${string}`,
      client: { wallet: this.client.wallet, public: this.client.public },
    })
    return contract
  }

  /**
   * Given a transaction hash, it returns the transaction receipt.
   * If this function is called before the transaction is mined, it will iterate a few times in order to wait for the transaction to be mined.
   * @param txHash - the transaction hash
   * @param iteration - the iteration number
   * @returns the transaction receipt
   */
  public async getTransactionReceipt(txHash: `0x${string}`, iteration = 1) {
    if (iteration < 10) {
      try {
        return await this.client.public.getTransactionReceipt({ hash: txHash })
      } catch (error) {
        if (error instanceof TransactionReceiptNotFoundError) {
          this.logger.log(
            `Unable to get transaction receipt from hash ${txHash} on iteration ${iteration}. Sleeping and retrying.`,
          )
          await _sleep(150)
          return this.getTransactionReceipt(txHash, iteration++)
        } else {
          const errorMessage = `Unknown error getting transaction receipt with hash: ${txHash}. Error: ${error}`
          this.logger.error(errorMessage)
          throw new KeeperError(errorMessage)
        }
      }
    } else {
      const errorMessage = `Unable to get transaction receipt with hash: ${txHash} after ${iteration} iterations.`
      this.logger.error(errorMessage)
      throw new KeeperError(errorMessage)
    }
  }

  /**
   * Returns true of contract exists else it throws.
   * @returns {@link true} if the contract exists.
   */
  public async checkExists(address: string): Promise<boolean> {
    return checkContractExists(address, this.client.public)
  }
}

//////////////////////////
///// UTILITIES //////////
//////////////////////////

///// CONTRACTS

/**
 * Given an artifact, it deploys the contract and returns the contract instance.
 * @param artifact - the contract artifact
 * @param from - the deployer account
 * @param args - parameters to be passed to the contract during the initialization
 * @param client - the client to interact with the blockchain
 * @returns a contract instance
 */
export async function deployContractInstance(
  artifact: { name?: string; abi: Abi; bytecode: `0x${string}` },
  from: NvmAccount,
  args: string[] = [],
  client: Web3Clients,
) {
  const txHash = await client.wallet.deployContract({
    abi: artifact.abi,
    account: from.getAccountSigner(),
    bytecode: artifact.bytecode,
    chain: client.chain,
  })

  const tx = await client.public.waitForTransactionReceipt({ hash: txHash })
  const contractAddress = tx.contractAddress

  const contract = getContract({
    abi: artifact.abi,
    address: contractAddress as `0x${string}`,
    client,
  })

  let isZos
  try {
    const initializeFunc = searchAbiFunction(artifact.abi, 'initialize')
    isZos = initializeFunc ? true : false

    if (isZos) {
      // @ts-expect-error "viem, wtf?"
      const initHash = await contract.write.initialize({ args, account: from.getAccountSigner() })

      const initTx = await client.public.waitForTransactionReceipt({ hash: initHash })
      if (initTx.status !== 'success') throw new KeeperError(`Unable to initialize contract`)
    }
  } catch (error) {
    throw new KeeperError(`Initialization Error: ${error}`)
  }

  return contract
}

/**
 * Given an already deployed contract address and the ABI, it returns the contract instance.
 *
 * @param contractAddress - the contract address
 * @param abi - the contract artifact
 * @param client - the client to interact with the blockchain
 * @returns a contract instance
 */
export async function getContractInstance(contractAddress: string, abi: Abi, client: Web3Clients) {
  return getContract({
    abi,
    address: contractAddress as `0x${string}`,
    client: { wallet: client.wallet, public: client.public },
  })
}

/**
 * Given a contract address it checks if the contract exists on the blockchain.
 * @param contractAddress - the contract address
 * @param client - the client to interact with the blockchain
 * @returns true if the contract exists and false otherwise
 */
export async function checkContractExists(
  contractAddress: string,
  client: PublicClient,
): Promise<boolean> {
  const storage = await client.getStorageAt({
    address: contractAddress as `0x${string}`,
    slot: toHex(0),
  })
  // check if storage is 0x0 at position 0, this is the case most of the cases
  if (storage === '0x0000000000000000000000000000000000000000000000000000000000000000') {
    // if the storage is empty, check if there is no code for this contract,
    // if so we can be sure it does not exist
    const code = await client.getBytecode({ address: contractAddress as `0x${string}` })
    if (code === '0x0' || code === '0x') {
      // no contract in the blockchain dude
      //throw new Error(`No contract deployed at address ${address}, sorry.`)
      return false
    }
  }

  return true
}

///// ABIs

/**
 * It searchs an ABI function in the ABI.
 * @param abi the ABI of the contract
 * @param funcName the function name
 * @param args the args of the function
 * @returns the function found
 */
export function searchAbiFunction(abi: Abi, funcName: string, args: any[] = []): AbiFunction {
  const func = getAbiItem({ abi, name: funcName, args })
  if (!func || func.type !== 'function') {
    throw new KeeperError(`Function "${funcName}" is not part of contract`)
  }
  // if (funcName === 'XXXXXXX') {
  //   console.log('ABI FUNCTION', func)
  //   console.log('ARGS', args)
  // }
  return func as AbiFunction
}

/**
 * It searchs an ABI event in the ABI.
 * @param abi the ABI of the contract
 * @param funcName the event name
 * @returns the event found
 */
export function searchAbiEvent(abi: Abi, eventName: string): AbiEvent {
  const event = getAbiItem({
    abi,
    name: eventName,
  })
  if (!event || event.type !== 'event') {
    throw new KeeperError(`Event "${event}" is not part of contract`)
  }
  return event as AbiEvent
}

/**
 * It searchs an ABI function in the ABI.
 * @param abi the ABI of the contract
 * @param funcName the function name
 * @param args the args of the function
 * @returns the function found
 */
export function getSignatureOfFunction(abi: Abi, funcName: string, args: any[] = []): AbiFunction {
  return searchAbiFunction(abi, funcName, args)
}

/**
 * It searchs an ABI function in the ABI and return the inputs.
 * @param abi the ABI of the contract
 * @param funcName the function name
 * @param args the args of the function
 * @returns the function found
 */
export function getInputsOfFunction(abi: Abi, funcName: string, args: any[] = []) {
  return searchAbiFunction(abi, funcName, args).inputs
}

/**
 * It searchs an ABI function in the ABI and return the inputs formatted.
 * @param abi the ABI of the contract
 * @param funcName the function name
 * @param args the args of the function
 * @returns the function found
 */
export function getInputsOfFunctionFormatted(abi: Abi, funcName: string, args: any[] = []) {
  return searchAbiFunction(abi, funcName, args).inputs.map((input, i) => {
    return {
      name: input.name,
      value: args[i],
    }
  })
}

//////// UTILS

/**
 * It converts a DID to a Token ID.
 * This is useful because in the Solidity Smart contracts the tokenId is a uint256.
 * @param did the unique identifier of the asset
 * @returns the token id in a bigint format
 */
export function didToTokenId(did: string): bigint {
  return hexToBigInt(didZeroX(did), { size: 32 })
}

/**
 * Given an address it returns that address in checksum format.
 * @param address the address
 * @returns the same address in checksum format
 */
export function getChecksumAddress(address: string): string {
  return getAddress(address)
}

/**
 * It checks if the address is a valid address.
 * @param address the address to check
 * @returns true of the address is valid
 */
export function isValidAddress(address: string): boolean {
  return isAddress(address)
}

/**
 * Encodes a UTF-8 string into a byte array.

 * @param message the string to encode
 * @returns the encoded byte array
 */
export function getBytes(message: string): Uint8Array {
  return stringToBytes(message)
}

export function zeroPadValue(value: `0x${string}` | Uint8Array, length: number): string {
  return pad(value, { size: length }) as `0x${string}`
}

export function encodeBytes32String(message: string) {
  return stringToHex(message, { size: 32 })
}
////// ACCOUNTS

export function makeWallet(seedphrase: string, addressIndex: number = 0) {
  return mnemonicToAccount(seedphrase, { addressIndex })
}

export function makeWallets(seedphrase: string, numAccounts = 10) {
  const accounts: any[] = []
  for (let i = 0; i < numAccounts; i++) {
    accounts.push(makeWallet(seedphrase, i))
  }
  return accounts
}

export function makeRandomWallet() {
  const mnemonic = generateMnemonic(english)
  return makeWallet(mnemonic)
}

export function makeRandomWallets(numAccounts = 10) {
  const mnemonic = generateMnemonic(english)
  return makeWallets(mnemonic, numAccounts)
}

/////// HASHES

export function keccak256(seed: string): string {
  return viemKeccak256(toBytes(seed))
}

export function keccak256WithEncode(types: any[], values: any[]): string {
  const encoded = encodeAbiParameters(types, values as never)
  return keccak256(encoded)
}

export function keccak256Packed(types: any[], values: any[]): string {
  return keccak256WithEncode(types, values)
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
export const parseUnits = (value: string, decimals = 18): bigint => {
  return viemParseUnits(value, decimals)
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
export const formatUnits = (value: bigint, decimals = 18): string => {
  return viemFormatUnits(value, decimals)
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
  return viemParseEther(value)
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
export const formatEther = (value: bigint): string => {
  return viemFormatEther(value)
}

/////// ZERO DEV

export async function createKernelClient(signer: any, chainId: number, zeroDevProjectId: string) {
  const publicClient = createPublicClient({
    chain: getChain(chainId),
    transport: http(`https://rpc.zerodev.app/api/v2/bundler/${zeroDevProjectId}`),
  })

  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer,
    entryPoint: ENTRYPOINT_ADDRESS_V06,
  })

  const account = await createKernelAccount(publicClient, {
    plugins: {
      sudo: ecdsaValidator,
    },
    entryPoint: ENTRYPOINT_ADDRESS_V06,
  })

  return createKernelAccountClient({
    account,
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    chain: getChain(chainId),
    bundlerTransport: http(`https://rpc.zerodev.app/api/v2/bundler/${zeroDevProjectId}`),
    middleware: {
      sponsorUserOperation: async ({ userOperation }) => {
        const paymasterClient = createZeroDevPaymasterClient({
          chain: getChain(chainId),
          transport: http(`https://rpc.zerodev.app/api/v2/paymaster/${zeroDevProjectId}`),
          entryPoint: ENTRYPOINT_ADDRESS_V06,
        })
        const _userOperation =
          userOperation as SponsorUserOperationParameters<EntryPoint>['userOperation']
        return paymasterClient.sponsorUserOperation({
          userOperation: _userOperation,
          entryPoint: ENTRYPOINT_ADDRESS_V06,
        })
      },
    },
  })
}

export async function createSessionKey(signer: any, publicClient: any, permissions: any[]) {
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    signer,
  })
  const sessionPrivateKey = generatePrivateKey()
  const sessionKeySigner = privateKeyToAccount(sessionPrivateKey)

  const sessionKeyValidator = await signerToSessionKeyValidator(publicClient, {
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    signer: sessionKeySigner,
    validatorData: {
      paymaster: oneAddress,
      validAfter: 0,
      validUntil: 0,
      permissions,
    },
  })
  const sessionKeyAccount = await createKernelAccount(publicClient, {
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    plugins: {
      sudo: ecdsaValidator,
      regular: sessionKeyValidator,
    },
  })
  return serializeSessionKeyAccount(sessionKeyAccount, sessionPrivateKey)
}

export async function getSessionKey(
  serializedSessionKey: string,
  zeroDevProjectId: string,
  publicClient: any,
) {
  const chainId = await publicClient.getChainId()
  const sessionKeyAccount = await deserializeSessionKeyAccount(
    publicClient,
    ENTRYPOINT_ADDRESS_V06,
    serializedSessionKey,
  )
  const kernelPaymaster = createZeroDevPaymasterClient({
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    chain: getChain(chainId),
    transport: http(`https://rpc.zerodev.app/api/v2/paymaster/${zeroDevProjectId}`),
  })
  const kernelClient = createKernelAccountClient({
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    account: sessionKeyAccount,
    chain: getChain(chainId),
    bundlerTransport: http(`https://rpc.zerodev.app/api/v2/bundler/${zeroDevProjectId}`),
    middleware: {
      sponsorUserOperation: kernelPaymaster.sponsorUserOperation,
    },
  })
  return NvmAccount.fromZeroDevSessionKey(kernelClient)
}
