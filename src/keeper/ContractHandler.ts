import { Contract } from 'web3-eth-contract'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import Web3 from 'web3'
import { Logger } from '../utils'

import Keeper from './Keeper'

export default class ContractHandler {
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
    private web3: Web3
    private logger: Logger

    private static getHash(what: string, networkId: number, address?: string): string {
        return address ? `${what}/#${networkId}/#${address}` : `${what}/#${networkId}`
    }

    constructor(web3: Web3, logger: Logger) {
        this.web3 = web3
        this.logger = logger
    }

    public async get(
        what: string,
        optional: boolean = false,
        address?: string
    ): Promise<Contract> {
        const where = (await Keeper.getNetworkName(this.web3)).toLowerCase()
        const networkId = await Keeper.getNetworkId(this.web3)
        try {
            return (
                ContractHandler.getContract(what, networkId, address) ||
                (await this.load(what, where, networkId, address))
            )
        } catch (err) {
            if (!optional) {
                this.logger.error('Failed to load', what, 'from', where, err)
                throw err
            }
        }
    }

    private async load(
        what: string,
        where: string,
        networkId: number,
        address?: string
    ): Promise<Contract> {
        this.logger.log('Loading', what, 'from', where)
        const artifact = require(`@nevermined-io/contracts/artifacts/${what}.${where}.json`)
        // Logger.log('Loaded artifact', artifact)
        const _address = address ? address : artifact.address
        const code = await this.web3.eth.getCode(_address)
        if (code === '0x0') {
            // no code in the blockchain dude
            throw new Error(`No code deployed at address ${_address}, sorry.`)
        }
        const contract = new this.web3.eth.Contract(artifact.abi, _address)

        this.logger.log(
            'Getting instance of',
            what,
            'from',
            where,
            'at address',
            _address
        )

        ContractHandler.setContract(what, networkId, contract, address)
        return contract
    }
}
