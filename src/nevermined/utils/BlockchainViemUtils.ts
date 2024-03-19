import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import {
  BigNumberish,
  BrowserProvider,
  HDNodeWallet,
  InterfaceAbi,
  JsonRpcProvider,
  Mnemonic,
  Numeric,
  ParamType,
  Signer,
  TypedDataField,
  Wallet,
  ethers,
  getIndexedAccountPath,
} from 'ethers'
import { NvmAccount, KeeperError } from '../../sdk'
import { Hex, SignTypedDataParams, SmartAccountSigner } from '@alchemy/aa-core'
import { Abi, AbiFunction, getAbiItem, getContract, getContractAddress } from 'viem'


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
    
    this.logger.debug(`Deploying abi using account: ${from.getId()}`)
    let isZos
    try {
      const initializeFunc = searchAbiFunction(artifact.abi, 'initialize')
      isZos = initializeFunc ? true : false
    } catch (error) {
      isZos = false
    }
    

    const txHash = await this.client.wallet.deployContract({
      abi: artifact.abi,
      account: from.getId(),
      bytecode: artifact.bytecode,
      chain: this.client.chain,
      // args
    })
    const tx = await this.client.public.waitForTransactionReceipt({ hash: txHash})
    const nonce = await this.client.public.getTransactionCount({address: tx.from})
    const contractAddress = getContractAddress({
      from: tx.from,
      nonce: BigInt(nonce),
    }) as `0x${string}`


    const contract = getContract({ 
      abi: artifact.abi, 
      address: contractAddress,      
      client: { wallet: this.client.wallet } //{ wallet: this.client.wallet , public: this.client.public }
    })


    
    const initArgs = isZos ? [] : args
    if (isZos) {
      await contract.write.initialize(...initArgs)

    }
    // const signer = await this.nevermined.accounts.findSigner(from.getId())
    // const contract = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer)
    // const isZos = contract.interface.hasFunction('initialize')

    
    // let baseContract: ethers.BaseContract

    // try {
    //   const feeData = await this.getFeeData()
    //   const extraParams = {
    //     ...feeData,
    //     gasLimit: 10000000n,
    //   }

    //   baseContract = await contract.deploy(...argument, extraParams)
    //   await baseContract.waitForDeployment()
    // } catch (error) {
    //   console.error(JSON.stringify(error))
    //   throw new Error(error.message)
    // }

    // if (isZos) {
    //   const methodSignature = getSignatureOfFunction(baseContract.interface, 'initialize', args)

    //   const contract = baseContract.connect(signer)

    //   // estimate gas
    //   const gasLimit = await contract[methodSignature].estimateGas(...args, {
    //     from: from.getId(),
    //   })
    //   const feeData = await this.getFeeData()
    //   const extraParams = {
    //     ...feeData,
    //     gasLimit,
    //   }

    //   const contractTransactionResponse: ContractTransactionResponse = await contract[
    //     methodSignature
    //   ](...args, extraParams)

    //   const transactionReceipt: ContractTransactionReceipt =
    //     await contractTransactionResponse.wait()
    //   if (transactionReceipt.status !== 1) {
    //     throw new Error(`Error deploying contract ${artifact.name}`)
    //   }
    // }
    // return baseContract
  }

  public async loadContract(
    contractAddress: string,
    abi: ethers.InterfaceAbi,
  ): Promise<ethers.Contract> {
    await this.checkExists(contractAddress)
    return new ethers.Contract(contractAddress, abi, this.web3)
  }

  /**
   * Returns true of contract exists else it throws.
   * @returns {@link true} if the contract exists.
   */
  public async checkExists(address: string): Promise<boolean> {
    return checkContractExists(address, this.web3)
  }

  // NETWORK FEEs
  public async getFeeData(gasPrice?: bigint, maxFeePerGas?: bigint, maxPriorityFeePerGas?: bigint) {
    // Custom gas fee for polygon networks
    const chainId = await this.nevermined.keeper.getNetworkId()
    if (chainId === 137 || chainId === 80001) {
      return this.getFeeDataPolygon(chainId)
    }

    // arbitrum
    if (chainId === 42161 || chainId === 421613 || chainId === 421614) {
      return this.getFeeDataArbitrum()
    }

    const feeData = await this.web3.getFeeData()

    // EIP-1559 fee parameters
    if (feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
      return {
        maxFeePerGas: maxFeePerGas || feeData.maxFeePerGas,
        maxPriorityFeePerGas: maxPriorityFeePerGas || feeData.maxPriorityFeePerGas,
        type: 2,
      }
    }

    // Non EIP-1559 fee parameters
    return {
      gasPrice: gasPrice || feeData.gasPrice,
    }
  }

  private async getFeeDataPolygon(networkId: number) {
    // Calculating the right fees in polygon networks has always been a problem
    // This workaround is based on https://github.com/ethers-io/ethers.js/issues/2828#issuecomment-1073423774
    let gasStationUri = this.config.gasStationUri
    if (!gasStationUri) {
      if (networkId === 137) {
        gasStationUri = 'https://gasstation.polygon.technology/v2'
      } else if (networkId === 80001) {
        gasStationUri = 'https://gasstation-testnet.polygon.technology/v2'
      } else {
        throw new KeeperError(
          'Using polygon gas station is only available in networks with id `137` and `80001`',
        )
      }
    }

    // get max fees from gas station
    let maxFeePerGas = 40000000000n // fallback to 40 gwei
    let maxPriorityFeePerGas = 40000000000n // fallback to 40 gwei
    try {
      const response = await this.nevermined.utils.fetch.get(gasStationUri)
      const data = await response.json()
      maxFeePerGas = parseUnits(Math.ceil(data.fast.maxFee) + '', 'gwei')
      maxPriorityFeePerGas = parseUnits(Math.ceil(data.fast.maxPriorityFee) + '', 'gwei')
    } catch (error) {
      this.logger.warn(`Failed to ges gas price from gas station ${gasStationUri}: ${error}`)
    }

    return {
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      type: 2,
    }
  }

  private async getFeeDataArbitrum() {
    /**
     * See https://docs.arbitrum.io/arbos/gas
     *
     * The sequencer prioritizes transactions on a first-come first-served basis.
     * Because tips do not make sense in this model, they are ignored.
     * Arbitrum users always just pay the basefee regardless of the tip they choose.
     */
    const feeData = await this.web3.getFeeData()

    return {
      gasPrice: feeData.gasPrice,
    }
  }
}

//////////////////////////
///// UTILITIES //////////
//////////////////////////

///// CONTRACTS
export async function getContractInstance(
  address: string,
  abi: InterfaceAbi,
  web3Provider: JsonRpcProvider | BrowserProvider,
): Promise<ethers.Contract> {
  await checkContractExists(address, web3Provider)
  return new ethers.Contract(address, abi, web3Provider)
}

export async function checkContractExists(
  address: string,
  web3Provider: JsonRpcProvider | BrowserProvider,
): Promise<boolean> {
  const storage = await web3Provider.getStorage(address, 0)
  // check if storage is 0x0 at position 0, this is the case most of the cases
  if (storage === '0x0000000000000000000000000000000000000000000000000000000000000000') {
    // if the storage is empty, check if there is no code for this contract,
    // if so we can be sure it does not exist
    const code = await web3Provider.getCode(address)
    if (code === '0x0' || code === '0x') {
      // no contract in the blockchain dude
      //throw new Error(`No contract deployed at address ${address}, sorry.`)
      return false
    }
  }

  return true
}

///// ABIs

export function searchAbiFunction(
  abi: Abi,
  funcName: string,
  args: any[] = [],
): AbiFunction {
  const func = getAbiItem({ abi, name: funcName, args }) 
  if (!func) {
    throw new KeeperError(`Method "${funcName}" is not part of contract`)
  }
  return func as AbiFunction
}

export function getSignatureOfFunction(
  abi: Abi,
  funcName: string,
  args: any[] = [],
): AbiFunction {
  return searchAbiFunction(abi, funcName, args)
}

export function getInputsOfFunction(
  abi: Abi,
  funcName: string,
  args: any[] = [],
) {
  return searchAbiFunction(abi, funcName, args).inputs
}

export function getInputsOfFunctionFormatted(
  abi: Abi,
  funcName: string,
  args: any[] = [],
) {
  return searchAbiFunction(abi, funcName, args).inputs.map((input, i) => {
    return {
      name: input.name,
      value: args[i],
    }
  })
}

//////// UTILS

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

export function makeWallets(seedphrase: string, numAccounts = 10): ethers.Wallet[] {
  const mnemonic = Mnemonic.fromPhrase(seedphrase)
  const node = ethers.HDNodeWallet.fromSeed(mnemonic.computeSeed())
  return getWalletsFromHDNode(node, numAccounts)
}

export function makeWalletFromEncryptedJson(json: string, password: string): ethers.Wallet {
  return ethers.Wallet.fromEncryptedJsonSync(json, password) as ethers.Wallet
}

export function makeWallet(seedphrase: string, accountIndex: number = 0): ethers.Wallet {
  const mnemonic = Mnemonic.fromPhrase(seedphrase)
  const node = ethers.HDNodeWallet.fromSeed(mnemonic.computeSeed())

  const acc = node.derivePath(getIndexedAccountPath(accountIndex))
  return new ethers.Wallet(acc.privateKey)
}

export function makeRandomWallet(): ethers.Wallet {
  return makeRandomWallets(1)[0]
}

export function makeRandomWallets(numAccounts = 10): ethers.Wallet[] {
  const node = ethers.Wallet.createRandom()
  return getWalletsFromHDNode(node, numAccounts)
}

function getWalletsFromHDNode(node: HDNodeWallet, numAccounts: number): ethers.Wallet[] {
  const accounts: ethers.Wallet[] = []

  for (let i = 0; i < numAccounts; i++) {
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

export function keccak256Packed(types: string[], values: any[]): string {
  return ethers.solidityPackedKeccak256(types, values)
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

/////// ZERO DEV

// zerodev ethersV6 compatibility
export function convertEthersV6SignerToAccountSigner(signer: Signer | Wallet): SmartAccountSigner {
  return {
    signerType: '',
    getAddress: async () => Promise.resolve((await signer.getAddress()) as `0x${string}`),
    signMessage: async (msg: Uint8Array | string) =>
      (await signer.signMessage(msg)) as `0x${string}`,
    signTypedData: async (params: SignTypedDataParams) => {
      if (!isWalletEthersV6(signer)) {
        throw Error('signTypedData method not implemented in signer')
      }
      return (await signer.signTypedData(
        params.domain!,
        params.types as unknown as Record<string, TypedDataField[]>,
        params.message,
      )) as Hex
    },
  }
}

const isWalletEthersV6 = (signer: any): signer is Wallet =>
  signer && signer.signTypedData !== undefined

export const estimateGas = async (
  contract: ethers.BaseContract,
  methodSignature: string,
  args: any[],
  from: string,
  value: string,
  gasMultiplier?: number,
): Promise<bigint> => {
  let gasLimit: bigint = await contract[methodSignature].estimateGas(...args, {
    from,
    value,
  })
  if (value) gasLimit = gasLimit + 21500n

  if (gasMultiplier) {
    const gasMultiplierParsed = parseUnits(gasMultiplier.toString(), 2)
    gasLimit = (gasLimit * gasMultiplierParsed) / 100n
  }

  return gasLimit
}


