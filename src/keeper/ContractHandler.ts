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
        optional: boolean = false,
        artifactsFolder: string,
        address?: string
    ): Promise<ethers.Contract> {
        const networkId = await this.nevermined.keeper.getNetworkId()
        const where = (await this.nevermined.keeper.getNetworkName()).toLowerCase()
        try {
            this.logger.debug(`ContractHandler :: GET :: ${artifactsFolder}`)
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

    public async getVersion(
        contractName: string,
        artifactsFolder: string
    ): Promise<string> {
        const where = (await this.nevermined.keeper.getNetworkName()).toLowerCase()
        let artifact
        if (artifactsFolder === undefined) {
            artifact = eval('require')(
                `@nevermined-io/contracts/artifacts/${contractName}.${where}.json`
            )
        } else {
            this.logger.debug(
                `Trying to fetch ${artifactsFolder}/${contractName}.${where}.json`
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
        }

        return artifact.version
    }

    private async load(
        what: string,
        where: string,
        networkId: number,
        artifactsFolder: string,
        address?: string
    ): Promise<ethers.Contract> {
        this.logger.debug('Loading', what, 'from', where, 'and folder', artifactsFolder)
        let artifact
        this.logger.debug(`Artifacts folder: ${artifactsFolder}`)
        if (artifactsFolder === undefined) {
            artifact = eval('require')(
                `@nevermined-io/contracts/artifacts/${what}.${where}.json`
            )
        } else {
            if (artifactsFolder.startsWith('http'))
                artifact = await this.fetchJson(
                    `${artifactsFolder}/${what}.${where}.json`
                )
            else
                artifact = JSON.parse(
                    fs.readFileSync(`${artifactsFolder}/${what}.${where}.json`, 'utf8')
                )
        }

        const _address = address ? address : artifact.address
        this.logger.debug(`Loading from address ${_address}`)

        // check if address is really a contract
        await this.checkExists(_address)

        const contract = new ethers.Contract(_address, artifact.abi, this.web3)

        this.logger.debug(
            'Getting instance of',
            what,
            'from',
            where,
            'at address',
            _address
        )
        if (!address) {
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
