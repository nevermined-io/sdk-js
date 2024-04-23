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
import { english, generateMnemonic, mnemonicToAccount } from 'viem/accounts'
import { Instantiable, InstantiableConfig, Web3Clients } from '../../Instantiable.abstract'
import { _sleep } from '../../common/helpers'
import { KeeperError } from '../../errors/NeverminedErrors'
import { NvmAccount } from '../../models/NvmAccount'
import { didZeroX } from '../../utils/ConversionTypeHelpers'
import { EntryPoint } from 'permissionless/types'
import { signerToEcdsaValidator } from '@zerodev/ecdsa-validator'
import {
  KernelAccountClient,
  SponsorUserOperationParameters,
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from '@zerodev/sdk'
import { getChain } from '../../utils/Network'

export class BlockchainViemUtils extends Instantiable {
  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  public async deployAbi(
    artifact: { name?: string; abi: Abi; bytecode: `0x${string}` },
    from: NvmAccount,
    args: string[] = [],
  ) {
    return await deployContractInstance(artifact, from, args, this.client)
  }

  public async loadContract(contractAddress: string, abi: Abi) {
    await this.checkExists(contractAddress)
    const contract = getContract({
      abi: abi,
      address: contractAddress as `0x${string}`,
      client: { wallet: this.client.wallet, public: this.client.public },
    })
    return contract
  }

  public async getTransactionReceipt(txHash: `0x${string}`, iteration = 1) {
    if (iteration < 5) {
      try {
        return await this.client.public.getTransactionReceipt({ hash: txHash })
      } catch (error) {
        if (error instanceof TransactionReceiptNotFoundError) {
          this.logger.log(
            `Unable to get transaction receipt from hash ${txHash} on iteration ${iteration}. Sleeping and retrying.`,
          )
          await _sleep(100)
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
  // const nonce = await client.public.getTransactionCount({ address: from.getAddress() })
  // console.log(`Getting contract address from ${from.getAddress()} and nonce: ${nonce}`)
  // console.log(` |----> but from transaction: ${tx.contractAddress}`)

  // const contractAddress = getContractAddress({
  //   from: from.getAddress(),
  //   nonce: BigInt(nonce),
  // }) as `0x${string}`

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
      // const { request } = await client.public.simulateContract({
      //   address: contractAddress,
      //   abi: artifact.abi,
      //   functionName: 'initialize',
      //   account: from.getAccountSigner() as Account,
      //   args,
      // })
      // const initHash = await client.wallet.writeContract(request)

      const initTx = await client.public.waitForTransactionReceipt({ hash: initHash })
      // console.log(`Initializeing contract with status: ${initTx.status}`)
      if (initTx.status !== 'success') throw new KeeperError(`Unable to initialize contract`)
    }
  } catch (error) {
    throw new KeeperError(`Initialization Error: ${error}`)
  }

  return contract
}

export async function getContractInstance(address: string, abi: Abi, client: Web3Clients) {
  return getContract({
    abi,
    address: address as `0x${string}`,
    client: { wallet: client.wallet, public: client.public },
  })
}

export async function checkContractExists(address: string, client: PublicClient): Promise<boolean> {
  const storage = await client.getStorageAt({ address: address as `0x${string}`, slot: toHex(0) })
  // check if storage is 0x0 at position 0, this is the case most of the cases
  if (storage === '0x0000000000000000000000000000000000000000000000000000000000000000') {
    // if the storage is empty, check if there is no code for this contract,
    // if so we can be sure it does not exist
    const code = await client.getBytecode({ address: address as `0x${string}` })
    if (code === '0x0' || code === '0x') {
      // no contract in the blockchain dude
      //throw new Error(`No contract deployed at address ${address}, sorry.`)
      return false
    }
  }

  return true
}

///// ABIs

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

export function getSignatureOfFunction(abi: Abi, funcName: string, args: any[] = []): AbiFunction {
  return searchAbiFunction(abi, funcName, args)
}

export function getInputsOfFunction(abi: Abi, funcName: string, args: any[] = []) {
  return searchAbiFunction(abi, funcName, args).inputs
}

export function getInputsOfFunctionFormatted(abi: Abi, funcName: string, args: any[] = []) {
  return searchAbiFunction(abi, funcName, args).inputs.map((input, i) => {
    return {
      name: input.name,
      value: args[i],
    }
  })
}

//////// UTILS

export function didToTokenId(did: string): bigint {
  return hexToBigInt(didZeroX(did), { size: 32 })
}

export function getChecksumAddress(address: string): string {
  return getAddress(address)
}

export function isValidAddress(address: string): boolean {
  return isAddress(address)
}

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

export async function getKernelClient(
  signer: any,
  chainId: number,
  entryPointAddress: EntryPoint,
  zeroDevProjectId: string,
): KernelAccountClient<any, any, any, any> {
  const publicClient = createPublicClient({
    transport: http(`https://rpc.zerodev.app/api/v2/bundler/${zeroDevProjectId}`),
  })

  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer,
    entryPoint: entryPointAddress,
  })

  const account = await createKernelAccount(publicClient, {
    plugins: {
      sudo: ecdsaValidator,
    },
    entryPoint: entryPointAddress,
  })
  console.log('My account:', account.address)

  return createKernelAccountClient({
    account,
    entryPoint: entryPointAddress,
    chain: getChain(chainId),
    bundlerTransport: http(`https://rpc.zerodev.app/api/v2/bundler/${zeroDevProjectId}`),
    middleware: {
      sponsorUserOperation: async ({ userOperation }) => {
        const paymasterClient = createZeroDevPaymasterClient({
          chain: getChain(chainId),
          transport: http(`https://rpc.zerodev.app/api/v2/paymaster/${zeroDevProjectId}`),
          entryPoint: entryPointAddress,
        })
        const _userOperation =
          userOperation as SponsorUserOperationParameters<EntryPoint>['userOperation']
        return paymasterClient.sponsorUserOperation({
          userOperation: _userOperation,
          entryPoint: entryPointAddress,
        })
      },
    },
  })
}

// zerodev ethersV6 compatibility
// export function convertEthersV6SignerToAccountSigner(signer: Signer | Wallet): SmartAccountSigner {
//   return {
//     signerType: '',
//     getAddress: async () => Promise.resolve((await signer.getAddress()) as `0x${string}`),
//     signMessage: async (msg: Uint8Array | string) =>
//       (await signer.signMessage(msg)) as `0x${string}`,
//     signTypedData: async (params: SignTypedDataParams) => {
//       if (!isWalletEthersV6(signer)) {
//         throw Error('signTypedData method not implemented in signer')
//       }
//       return (await signer.signTypedData(
//         params.domain!,
//         params.types as unknown as Record<string, TypedDataField[]>,
//         params.message,
//       )) as Hex
//     },
//   }
// }

// const isWalletEthersV6 = (signer: any): signer is Wallet =>
//   signer && signer.signTypedData !== undefined

// export const estimateGas = async (
//   contract: ethers.BaseContract,
//   methodSignature: string,
//   args: any[],
//   from: string,
//   value: string,
//   gasMultiplier?: number,
// ): Promise<bigint> => {
//   let gasLimit: bigint = await contract[methodSignature].estimateGas(...args, {
//     from,
//     value,
//   })
//   if (value) gasLimit = gasLimit + 21500n

//   if (gasMultiplier) {
//     const gasMultiplierParsed = parseUnits(gasMultiplier.toString(), 2)
//     gasLimit = (gasLimit * gasMultiplierParsed) / 100n
//   }

//   return gasLimit
// }
