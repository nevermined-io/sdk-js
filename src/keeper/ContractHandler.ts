import fs from 'fs'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { KeeperError } from '../errors/KeeperError'
import { ApiError } from '../errors/ApiError'
import { ethers } from 'ethers'

let fetch
if (typeof window !== 'undefined') {
    fetch = window.fetch.bind(window)
} else {
    fetch = require('node-fetch')
}

export default class ContractHandler extends Instantiable {
    protected static getContract(what: string, networkId: number, address?: string) {
        return ContractHandler.contracts.get(this.getHash(what, networkId, address))
    }

    protected static setContract(
        what: string,
        networkId: number,
        contractInstance: ethers.Contract,
        address?: string
    ) {
        ContractHandler.contracts.set(
            this.getHash(what, networkId, address),
            contractInstance
        )
    }

    protected static hasContract(
        what: string,
        networkId: number,
        address?: string
    ): boolean {
        return ContractHandler.contracts.has(this.getHash(what, networkId, address))
    }

    private static contracts: Map<string, ethers.Contract> = new Map<
        string,
        ethers.Contract
    >()

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
        address?: string
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

    public async getABI(
        contractName: string,
        artifactsFolder = './artifacts'
    ): Promise<string> {
        const where = (await this.nevermined.keeper.getNetworkName()).toLowerCase()
        let artifact

        try {
            this.logger.debug(`ContractHandler :: getABI :: ${artifactsFolder} :: ${contractName} - ${where}`)
            if (artifactsFolder && artifactsFolder.startsWith('http'))
                artifact = await this.fetchJson(
                    `${artifactsFolder}/${contractName}.${where}.json`
                )
            else
                artifact = JSON.parse(
                    fs.readFileSync(
                        `${artifactsFolder}/${contractName}.${where}.json`,
                        'utf8'
                    )
                )
            this.logger.debug(`Loaded artifact ${contractName} with version ${artifact.version}`)
        } catch (err) {
            throw new KeeperError(`Unable to load ABI ${contractName} from ${where} - ${(err as Error).message}`)
        }
        return artifact.abi
    }

    public async getVersion(
        contractName: string,
        artifactsFolder: string
    ): Promise<string> {
        const where = (await this.nevermined.keeper.getNetworkName()).toLowerCase()
        let artifact
        this.logger.debug(
            `ContractHandler :: getVersion :: Trying to read ${artifactsFolder}/${contractName}.${where}.json`
        )
        if (artifactsFolder.startsWith('http'))
            artifact = await this.fetchJson(
                `${artifactsFolder}/${contractName}.${where}.json`
            )
        else
            artifact = JSON.parse(
                fs.readFileSync(
                    `${artifactsFolder}/${contractName}.${where}.json`,
                    'utf8'
                )
            )
        this.logger.debug(`Loaded artifact ${contractName} with version ${artifact.version}`)
        return artifact.version
    }

    private async load(
        what: string,
        where: string,
        networkId: number,
        artifactsFolder: string,
        address?: string
    ): Promise<ethers.Contract> {
        this.logger.debug(`Loading ${what} from ${where} and folder ${artifactsFolder}`)
        let artifact
        if (artifactsFolder.startsWith('http'))
            artifact = await this.fetchJson(`${artifactsFolder}/${what}.${where}.json`)
        else
            artifact = JSON.parse(
                fs.readFileSync(`${artifactsFolder}/${what}.${where}.json`, 'utf8')
            )

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

    private async fetchJson(path) {
        try {
            const jsonFile = await fetch(path, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
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
