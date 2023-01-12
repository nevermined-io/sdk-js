import ContractBase, { TxParameters } from './ContractBase'
import { zeroX } from '../../utils'
import { Account } from '../../nevermined'
import { BigNumber, ContractReceipt } from 'ethers'
import { KeeperError } from '../../errors'

export class NFTContractsBase extends ContractBase {
    /**
     * Gets the contract owner
     *
     * @returns Address of the contract owner
     */
    public async owner(): Promise<string> {
        return this.call('owner', [])
    }

    /**
     * Creates a contract clone of an existing contract instance
     *
     * @param name - NFT Contract name
     * @param symbol - NFT Contract symbol
     * @param uri - NFT Contract metadata uri
     * @param cap - NFT cap (just for ERC-721)
     * @param from - Sender account
     * @returns Contract Receipt
     */
    protected async _createClone(
        name: string,
        symbol: string,
        uri: string,
        cap: BigNumber | undefined,
        from?: Account,
        params?: TxParameters
    ) {
        try {
            const contractReceipt: ContractReceipt = await this.sendFrom(
                'createClone',
                cap ? [name, symbol, uri, String(cap)] : [name, symbol, uri],
                from,
                params
            )
            const event = contractReceipt.events.find(e => e.event === 'NFTCloned')
            return event.args._newAddress
        } catch (error) {
            throw new KeeperError(`Unable to clone contract: ${(error as Error).message}`)
        }
    }

    /**
     * Add an address as operator in the NFT Contract
     *
     * @param operatorAddress - New minter address
     * @param from - Sender account
     * @returns Contract Receipt
     */
    public grantOperatorRole(operatorAddress: string, from?: Account, params?: TxParameters) {
        return this.sendFrom('grantOperatorRole', [zeroX(operatorAddress)], from, params)
    }

    /**
     * Revoke an address as operator in the NFT Contract
     *
     * @param operatorAddress - Minter address to revoke
     * @param from - Sender account
     * @returns Contract Receipt
     */
    public revokeOperatorRole(operatorAddress: string, from?: Account, params?: TxParameters) {
        return this.sendFrom('revokeOperatorRole', [zeroX(operatorAddress)], from, params)
    }
}
