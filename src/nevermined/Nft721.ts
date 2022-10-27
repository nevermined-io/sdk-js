import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import Account from './Account'
import Nft721Contract from '../keeper/contracts/Nft721'
import { TxParameters } from '../keeper/contracts/ContractBase'
import BigNumber from '../utils/BigNumber'

export class Nft721 extends Instantiable {
    contract: Nft721Contract

    public static async getInstance(
        config: InstantiableConfig,
        address: string
    ): Promise<Nft721> {
        const nft721 = new Nft721()
        nft721.setInstanceConfig(config)

        nft721.contract = await Nft721Contract.getInstance(config, address)
        return nft721
    }

    /**
     * Mint NFTs associated with an asset.
     *
     * This function can be called multiple times as long as the minting does not exceed the maximum cap set during creation.
     *
     * @param did - The Decentralized Identifier of the NFT asset.
     * @param publisher - The account of the publisher of the NFT.
     * @returns
     */
    public async mint(did: string, publisher: Account, txParams?: TxParameters) {
        return await this.contract.mint(did, publisher.getId(), txParams)
    }

    public async mintWithURL(
        to: string,
        did: string,
        url: string,
        from?: Account,
        txParams?: TxParameters
    ) {
        return await this.contract.mintWithURL(to, did, url, from, txParams)
    }

    public async setApprovalForAll(
        target: string,
        state: boolean,
        publisher: Account,
        txParams?: TxParameters
    ) {
        return await this.contract.setApprovalForAll(
            target,
            state,
            publisher.getId(),
            txParams
        )
    }

    public async isApprovedForAll(accountAddress: string, operatorAddress: string) {
        return await this.contract.isApprovedForAll(accountAddress, operatorAddress)
    }

    public async balanceOf(owner: Account) {
        return BigNumber.from(await this.contract.balanceOf(owner.getId()))
    }

    public async ownerOf(did: string): Promise<string> {
        return await this.contract.ownerOf(did)
    }

    public get address() {
        return this.contract.address
    }
}
