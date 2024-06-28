import fs from 'fs'
import { Abi } from 'viem'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { ApiError, KeeperError } from '../errors/NeverminedErrors'
import { NvmAccount } from '../models/NvmAccount'

let fetch
if (typeof window !== 'undefined') {
  fetch = window.fetch.bind(window)
} else {
  fetch = require('node-fetch')
}

export class ContractHandler extends Instantiable {
  private static contracts: Map<string, any> = new Map<string, any>()

  private static versions: Map<string, any> = new Map<string, string>()

  protected static getContract(what: string, networkId: number, address?: string) {
    const hash = this.getHash(what, networkId, address)
    return ContractHandler.contracts.get(hash)
  }

  public static getVersion(what: string, networkId: number, address?: string) {
    const hash = this.getHash(what, networkId, address)
    return ContractHandler.versions.get(hash)
  }

  protected static setContract(
    what: string,
    networkId: number,
    contractInstance: any,
    address?: string,
    version?: string,
  ) {
    const hash = this.getHash(what, networkId, address)
    ContractHandler.contracts.set(hash, contractInstance)
    ContractHandler.versions.set(hash, version)
  }

  protected static hasContract(what: string, networkId: number, address?: string): boolean {
    const hash = this.getHash(what, networkId, address)
    const exists = ContractHandler.contracts.has(hash)
    return exists
  }

  private static getHash(what: string, networkId: number, address?: string): string {
    return address ? `${what}/#${networkId}/#${address}` : `${what}/#${networkId}`
  }

  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  public async getVersionFromArtifact(
    contractName: string,
    artifactsFolder: string,
  ): Promise<string> {
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
    artifactsFolder?: string,
    address?: string,
    contractsVersion: string = 'latest',
  ) {
    const artifact = await ContractHandler.getABIArtifact(
      what,
      artifactsFolder,
      where,
      networkId,
      contractsVersion,
    )

    const _address = address ? address : artifact.address
    this.logger.debug(`Loading from address ${_address}`)

    const contract = await this.nevermined.utils.blockchain.loadContract(_address, artifact.abi)

    this.logger.debug(`Instance of ${what} from ${where} fetched at address ${_address}`)

    if (!address) {
      this.logger.debug(`No address given as param for ${what}. Loading instance`)
      ContractHandler.setContract(what, networkId, contract, undefined, artifact.version)
      return ContractHandler.getContract(what, networkId)
    }

    return contract
  }

  public async getContractFromArtifacts(
    what: string,
    optional = false,
    artifactsFolder?: string,
    address?: string,
    contractsVersion: string = 'latest',
  ) {
    const chainId = await this.nevermined.keeper.getNetworkId()
    const where = await this.nevermined.keeper.getNetworkName()
    try {
      // if (ContractHandler.hasContract(what, chainId, address))
      //   return ContractHandler.getContract(what, chainId, address)
      // else await this.loadContractFromAbi(what, where, chainId, artifactsFolder, address)
      // this.logger.debug(`ContractHandler :: get :: ${artifactsFolder} and address ${address}`)
      return (
        ContractHandler.getContract(what, chainId, address) ||
        (await this.loadContractFromAbi(
          what,
          where,
          chainId,
          artifactsFolder,
          address,
          contractsVersion,
        ))
      )
    } catch (err) {
      if (!optional) {
        throw new KeeperError(`Failed to load ${what} from ${where} - ${err}`)
      }
    }
  }

  public static async getABIArtifact(
    contractName: string,
    artifactsFolder = 'https://artifacts.nevermined.network',
    networkName?: string,
    networkId?: number,
    contractsVersion: string = 'latest',
  ): Promise<any> {
    try {
      let where = ''
      if (networkName && networkName.length > 0) where = `.${networkName}`

      if (artifactsFolder.startsWith('http')) {
        let path
        if (artifactsFolder === 'https://artifacts.nevermined.network') {
          path = `${artifactsFolder}/${networkId}/public/${contractsVersion}/${contractName}${where}.json`
        } else {
          path = `${artifactsFolder}/${contractName}${where}.json`
        }
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
