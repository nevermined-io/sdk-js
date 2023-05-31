import fs from 'fs'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { KeeperError } from '../errors/KeeperError'
import { ApiError } from '../errors/ApiError'
import { Account } from '../nevermined'
import { BigNumber, ContractReceipt, ethers } from 'ethers'
import { TransactionResponse } from '@ethersproject/abstract-provider'

let fetch
if (typeof window !== 'undefined') {
  fetch = window.fetch.bind(window)
} else {
  fetch = require('node-fetch')
}

export class ContractHandler extends Instantiable {
  protected static getContract(what: string, networkId: number, address?: string) {
    return ContractHandler.contracts.get(this.getHash(what, networkId, address))
  }

  protected static setContract(
    what: string,
    networkId: number,
    contractInstance: ethers.Contract,
    address?: string,
  ) {
    ContractHandler.contracts.set(this.getHash(what, networkId, address), contractInstance)
  }

  protected static hasContract(what: string, networkId: number, address?: string): boolean {
    return ContractHandler.contracts.has(this.getHash(what, networkId, address))
  }

  private static contracts: Map<string, ethers.Contract> = new Map<string, ethers.Contract>()

  private static getHash(what: string, networkId: number, address?: string): string {
    return address ? `${what}/#${networkId}/#${address}` : `${what}/#${networkId}`
  }

  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  public async get(
    what: string,
    optional = false,
    artifactsFolder: string,
    address?: string,
  ): Promise<ethers.Contract> {
    const networkId = await this.nevermined.keeper.getNetworkId()
    const where = (await this.nevermined.keeper.getNetworkName()).toLowerCase()
    try {
      this.logger.debug(`ContractHandler :: get :: ${artifactsFolder} and address ${address}`)
      return (
        ContractHandler.getContract(what, networkId, address) ||
        (await this.load(what, where, networkId, artifactsFolder, address))
      )
    } catch (err) {
      if (!optional) {
        throw new KeeperError(`Failed to load ${what} from ${where} - ${err}`)
      }
    }
  }

  public static async getABI(
    contractName: string,
    artifactsFolder = './artifacts',
    networkName?: string,
  ): Promise<any> {
    try {
      let where = ''
      if (networkName && networkName.length > 0) where = `.${networkName}`

      if (artifactsFolder.startsWith('http')) {
        const path = `${artifactsFolder}/${contractName}${where}.json`
        const jsonFile = await fetch(path, {
          method: 'GET',
          headers: { 'Content-type': 'application/json' },
        })
        return jsonFile.json()
      } else {
        const artifact = JSON.parse(
          fs.readFileSync(`${artifactsFolder}/${contractName}${where}.json`, 'utf8'),
        )
        return artifact
      }
    } catch (err) {
      throw new Error(`Unable to load ABI ${contractName} from ${networkName} - ${err}`)
    }
  }

  public async getVersion(contractName: string, artifactsFolder: string): Promise<string> {
    const where = (await this.nevermined.keeper.getNetworkName()).toLowerCase()
    let artifact
    this.logger.debug(
      `ContractHandler :: getVersion :: Trying to read ${artifactsFolder}/${contractName}.${where}.json`,
    )
    if (artifactsFolder.startsWith('http'))
      artifact = await ContractHandler.fetchJson(`${artifactsFolder}/${contractName}.${where}.json`)
    else
      artifact = JSON.parse(
        fs.readFileSync(`${artifactsFolder}/${contractName}.${where}.json`, 'utf8'),
      )
    this.logger.debug(`Loaded artifact ${contractName} with version ${artifact.version}`)
    return artifact.version
  }

  public async deployAbi(
    artifact: { name?: string; abi: ethers.ContractInterface; bytecode: string },
    from: Account,
    args: string[] = [],
  ): Promise<ethers.Contract> {
    this.logger.debug(`Deploying abi using account: ${from.getId()}`)

    const signer = await this.nevermined.accounts.findSigner(from.getId())
    const contract = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer)
    const isZos = contract.interface.fragments.some((f) => f.name === 'initialize')

    const argument = isZos ? [] : args
    let contractInstance: ethers.Contract

    try {
      const feeData = await this.getFeeData()
      const extraParams = {
        ...feeData,
        gasLimit: BigNumber.from('10000000'),
      }

      contractInstance = await contract.deploy(...argument, extraParams)
      await contractInstance.deployTransaction.wait()
    } catch (error) {
      console.error(JSON.stringify(error))
      throw new Error(error.message)
    }

    if (isZos) {
      const methodSignature = ContractHandler.getSignatureOfMethod(
        contractInstance,
        'initialize',
        args,
      )

      const contract = contractInstance.connect(signer)

      // estimate gas
      const gasLimit = await contract.estimateGas[methodSignature](...args, {
        from: from.getId(),
      })
      const feeData = await this.getFeeData()
      const extraParams = {
        ...feeData,
        gasLimit,
      }

      const transactionResponse: TransactionResponse = await contract[methodSignature](
        ...args,
        extraParams,
      )

      const contractReceipt: ContractReceipt = await transactionResponse.wait()
      if (contractReceipt.status !== 1) {
        throw new Error(`Error deploying contract ${artifact.name}`)
      }
    }
    return contractInstance
  }

  private async load(
    what: string,
    where: string,
    networkId: number,
    artifactsFolder: string,
    address?: string,
  ): Promise<ethers.Contract> {
    this.logger.debug(`Loading ${what} from ${where} and folder ${artifactsFolder}`)
    let artifact
    if (artifactsFolder.startsWith('http'))
      artifact = await ContractHandler.fetchJson(`${artifactsFolder}/${what}.${where}.json`)
    else artifact = JSON.parse(fs.readFileSync(`${artifactsFolder}/${what}.${where}.json`, 'utf8'))

    const _address = address ? address : artifact.address
    this.logger.debug(`Loading from address ${_address}`)

    // check if address is really a contract
    await this.checkExists(_address)

    const contract = new ethers.Contract(_address, artifact.abi, this.web3)

    this.logger.debug(`Instance of ${what} from ${where} fetched at address ${_address}`)

    if (!address) {
      this.logger.debug(`No address given as param for ${what}. Loading instance`)
      ContractHandler.setContract(what, networkId, contract)
      return ContractHandler.getContract(what, networkId)
    }

    return contract
  }

  /**
   * Returns true of contract exists else it throws.
   * @returns {@link true} if the contract exists.
   */
  public async checkExists(address: string): Promise<boolean> {
    const storage = await this.web3.getStorageAt(address, 0)
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

  public static getSignatureOfMethod(
    contractInstance: ethers.Contract,
    methodName: string,
    args: any[],
  ): string {
    const methods = contractInstance.interface.fragments.filter((f) => f.name === methodName)
    const foundMethod = methods.find((f) => f.inputs.length === args.length) || methods[0]
    if (!foundMethod) {
      throw new Error(`Method "${methodName}" not found in contract`)
    }
    return foundMethod.format()
  }

  static async fetchJson(path) {
    try {
      const jsonFile = await fetch(path, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })

      if (jsonFile.ok) {
        return jsonFile.json()
      }

      throw new ApiError(`Error to fetch json file from url ${path}`)
    } catch (error) {
      throw new KeeperError(error)
    }
  }

  private async getFeeData(
    gasPrice?: BigNumber,
    maxFeePerGas?: BigNumber,
    maxPriorityFeePerGas?: BigNumber,
  ) {
    // Custom gas fee for polygon networks
    const networkId = await this.nevermined.keeper.getNetworkId()
    if (networkId === 137 || networkId === 80001) {
      return this.getFeeDataPolygon(networkId)
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
    let gasStationUrl: string
    if (networkId === 137) {
      gasStationUrl = 'https://gasstation-mainnet.matic.network/v2'
    } else if (networkId === 80001) {
      gasStationUrl = 'https://gasstation-mumbai.matic.today/v2'
    } else {
      throw new KeeperError(
        'Using polygon gas station is only available in networks with id `137` and `80001`',
      )
    }

    // get max fees from gas station
    let maxFeePerGas = ethers.BigNumber.from(40000000000) // fallback to 40 gwei
    let maxPriorityFeePerGas = ethers.BigNumber.from(40000000000) // fallback to 40 gwei
    try {
      const response = await this.nevermined.utils.fetch.get(gasStationUrl)
      const data = await response.json()
      maxFeePerGas = ethers.utils.parseUnits(Math.ceil(data.fast.maxFee) + '', 'gwei')
      maxPriorityFeePerGas = ethers.utils.parseUnits(
        Math.ceil(data.fast.maxPriorityFee) + '',
        'gwei',
      )
    } catch (error) {
      this.logger.warn(`Failed to ges gas price from gas station ${gasStationUrl}: ${error}`)
    }

    return {
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      type: 2,
    }
  }
}
