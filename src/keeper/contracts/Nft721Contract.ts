import { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { didZeroX } from '../../utils'
import { abi } from '../../artifacts/ERC721.json'
import { Account } from '../..'
import { ethers } from 'ethers'
import BigNumber from '../../utils/BigNumber'
import { ContractEvent, EventHandler } from '../../events'
import { NFTsBase } from './NFTsBase'

export default class Nft721Contract extends NFTsBase {
    public static async getInstance(
        config: InstantiableConfig,
        address: string
    ): Promise<Nft721Contract> {
        const nft: Nft721Contract = new Nft721Contract('NFT721')
        nft.setInstanceConfig(config)

        // We don't have a subgraph for NFT721 so we can only use ContractEvent
        const eventEmitter = new EventHandler()
        nft.events = ContractEvent.getInstance(
            nft,
            eventEmitter,
            config.nevermined,
            config.web3
        )

        await nft.checkExists(address)
        nft.contract = new ethers.Contract(address, abi, nft.web3)

        return nft
    }

    /**
     * Creates a contract clone of an existing contract instance
     *
     * @param name - NFT Contract name
     * @param symbol - NFT Contract symbol
     * @param uri - NFT Contract metadata uri
     * @param cap - NFT cap
     * @param from - Sender account
     * @returns Contract Receipt
     */
     public createClone(
        name: string,
        symbol: string,
        uri: string,
        cap: BigNumber,
        from?: Account,
        params?: TxParameters
    ) {
        return this._createClone(name, symbol, uri, cap, from, params)
    }

    public async mint(did: string, from: string, params?: TxParameters) {
        return this.send('mint', from, [didZeroX(did)], params)
    }

    public async mintWithURL(
        to: string,
        did: string,
        url: string,
        from?: Account,
        params?: TxParameters
    ) {
        return this.sendFrom('mint', [to, didZeroX(did), url], from, params)
    }

    public async setApprovalForAll(
        target: string,
        state: boolean,
        from: string,
        params?: TxParameters
    ) {
        return this.send('setApprovalForAll', from, [target, state], params)
    }

    public isApprovedForAll(accountAddress: string, operatorAddress: string) {
        return this.call('isApprovedForAll', [
            didZeroX(accountAddress),
            didZeroX(operatorAddress)
        ])
    }

    public async balanceOf(owner: string): Promise<BigNumber> {
        return this.call('balanceOf', [owner])
    }

    public async ownerOf(did: string): Promise<string> {
        return this.call('ownerOf', [didZeroX(did)])
    }

    public async tokenURI(did: string): Promise<string> {
        return this.call('tokenURI', [didZeroX(did)])
    }
}
