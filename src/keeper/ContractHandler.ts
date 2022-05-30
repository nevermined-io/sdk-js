import { Contract } from 'web3-eth-contract'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import * as KeeperUtils from './utils'
import { KeeperError } from '../errors/KeeperError'
import fs from 'fs'

export default class ContractHandler extends Instantiable {
    protected static getContract(what: string, networkId: number, address?: string) {
        return ContractHandler.contracts.get(this.getHash(what, networkId, address))
    }

    protected static setContract(
        what: string,
        networkId: number,
        contractInstance: Contract,
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

    private static contracts: Map<string, Contract> = new Map<string, Contract>()

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
        address?: string,
        artifactsFolder?: string
    ): Promise<Contract> {
        const where = (await KeeperUtils.getNetworkName(this.web3)).toLowerCase()
        const networkId = await KeeperUtils.getNetworkId(this.web3)
        try {
            this.logger.debug(`ContractHandler :: GET :: ${artifactsFolder}`)
            return (
                ContractHandler.getContract(what, networkId, address) ||
                (await this.load(what, where, networkId, address, artifactsFolder))
            )
        } catch (err) {
            if (!optional) {
                throw new KeeperError(`Failed to load ${what} from ${where} - ${err}`)
            }
        }
    }

    public async getVersion(
        contractName: string,
        artifactsFolder?: string
    ): Promise<string> {
        const where = (await KeeperUtils.getNetworkName(this.web3)).toLowerCase()
        let artifactFile
        let artifact
        if (artifactsFolder === undefined)
            artifact = require(`@nevermined-io/contracts/artifacts/${contractName}.${where}.json`)
        else {
            artifactFile = fs.readFileSync(
                `${artifactsFolder}/${contractName}.${where}.json`
            )
            artifact = JSON.parse(artifactFile)
        }

        return artifact.version
    }

    private async load(
        what: string,
        where: string,
        networkId: number,
        address?: string,
        artifactsFolder?: string
    ): Promise<Contract> {
        this.logger.debug('Loading', what, 'from', where, 'and folder', artifactsFolder)
        let artifactFile
        let artifact
        if (artifactsFolder === undefined)
            artifact = require(`@nevermined-io/contracts/artifacts/${what}.${where}.json`)
        else {
            artifactFile = fs.readFileSync(`${artifactsFolder}/${what}.${where}.json`)
            artifact = JSON.parse(artifactFile)
        }

        const _address = address ? address : artifact.address
        const code = await this.web3.eth.getCode(_address)
        if (code === '0x0') {
            // no code in the blockchain dude
            throw new Error(`No code deployed at address ${_address}, sorry.`)
        }
        const contract = new this.web3.eth.Contract(artifact.abi, _address)

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
}
