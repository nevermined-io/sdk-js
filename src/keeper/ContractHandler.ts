import { Contract } from 'web3-eth-contract'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

export default class ContractHandler extends Instantiable {
    protected static getContract(what: string, networkId: number) {
        return ContractHandler.contracts.get(this.getHash(what, networkId))
    }

    protected static setContract(
        what: string,
        networkId: number,
        contractInstance: Contract
    ) {
        ContractHandler.contracts.set(this.getHash(what, networkId), contractInstance)
    }

    protected static hasContract(what: string, networkId: number): boolean {
        return ContractHandler.contracts.has(this.getHash(what, networkId))
    }

    private static contracts: Map<string, Contract> = new Map<string, Contract>()

    private static getHash(what: string, networkId: number): string {
        return `${what}/#${networkId}`
    }

    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }

    public async get(what: string, optional: boolean = false): Promise<Contract> {
        const where = (await this.ocean.keeper.getNetworkName()).toLowerCase()
        const networkId = await this.ocean.keeper.getNetworkId()
        try {
            return (
                ContractHandler.getContract(what, networkId) ||
                (await this.load(what, where, networkId))
            )
        } catch (err) {
            if (!optional) {
                this.logger.error('Failed to load', what, 'from', where, err)
            }
            throw err
        }
    }

    private async load(
        what: string,
        where: string,
        networkId: number
    ): Promise<Contract> {
        this.logger.debug('Loading', what, 'from', where)
        const artifact = require(`@keyko-io/nevermined-contracts/artifacts/${what}.${where}.json`)
        // Logger.log('Loaded artifact', artifact)
        const code = await this.web3.eth.getCode(artifact.address)
        if (code === '0x0') {
            // no code in the blockchain dude
            throw new Error(`No code deployed at address ${artifact.address}, sorry.`)
        }
        const contract = new this.web3.eth.Contract(artifact.abi, artifact.address)

        this.logger.debug(
            'Getting instance of',
            what,
            'from',
            where,
            'at address',
            artifact.address
        )
        ContractHandler.setContract(what, networkId, contract)
        return ContractHandler.getContract(what, networkId)
    }
}
