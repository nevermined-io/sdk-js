import fs from 'fs'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { KeeperError } from '../errors/KeeperError'
import { ApiError } from '../errors/ApiError'
import { NvmAccount } from '../nevermined'
import { Abi } from 'viem'

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
    contractInstance: any,
    address?: string,
  ) {
    ContractHandler.contracts.set(this.getHash(what, networkId, address), contractInstance)
  }

  protected static hasContract(what: string, networkId: number, address?: string): boolean {
    return ContractHandler.contracts.has(this.getHash(what, networkId, address))
  }

  private static contracts: Map<string, any> = new Map<
    string,
    any //ethers.BaseContract
  >()

  private static getHash(what: string, networkId: number, address?: string): string {
    return address ? `${what}/#${networkId}/#${address}` : `${what}/#${networkId}`
  }

  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  public async getVersion(contractName: string, artifactsFolder: string): Promise<string> {
    const where = await this.nevermined.keeper.getNetworkName()
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

  public async checkExists(address: string): Promise<boolean> {
    return this.nevermined.utils.blockchain.checkExists(address)
  }

  public async deployAbi(
    artifact: { name?: string; abi: Abi; bytecode: `0x${string}` },
    from: NvmAccount,
    args: string[] = [],
  ) {
    return this.nevermined.utils.blockchain.deployAbi(artifact, from, args)
  }

  private async loadContractFromAbi(
    what: string,
    where: string,
    networkId: number,
    artifactsFolder: string,
    address?: string,
  ) {
    this.logger.debug(`Loading ${what} from ${where} and folder ${artifactsFolder}`)
    let artifact
    if (artifactsFolder.startsWith('http'))
      artifact = await ContractHandler.fetchJson(`${artifactsFolder}/${what}.${where}.json`)
    else artifact = JSON.parse(fs.readFileSync(`${artifactsFolder}/${what}.${where}.json`, 'utf8'))

    const _address = address ? address : artifact.address
    this.logger.debug(`Loading from address ${_address}`)

    const contract = await this.nevermined.utils.blockchain.loadContract(_address, artifact.abi)

    this.logger.debug(`Instance of ${what} from ${where} fetched at address ${_address}`)

    if (!address) {
      this.logger.debug(`No address given as param for ${what}. Loading instance`)
      ContractHandler.setContract(what, networkId, contract)
      return ContractHandler.getContract(what, networkId)
    }

    return contract
  }

  public async getContractFromArtifacts(
    what: string,
    optional = false,
    artifactsFolder: string,
    address?: string,
  ) {
    const chainId = await this.nevermined.keeper.getNetworkId()
    const where = await this.nevermined.keeper.getNetworkName()
    try {
      this.logger.debug(`ContractHandler :: get :: ${artifactsFolder} and address ${address}`)
      return (
        ContractHandler.getContract(what, chainId, address) ||
        (await this.loadContractFromAbi(what, where, chainId, artifactsFolder, address))
      )
    } catch (err) {
      if (!optional) {
        throw new KeeperError(`Failed to load ${what} from ${where} - ${err}`)
      }
    }
  }

  public static async getABIArtifact(
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
}
