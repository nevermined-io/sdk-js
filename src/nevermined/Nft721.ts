import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import Account from './Account'
import Nft721Contract from '../keeper/contracts/Nft721'

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
     * @param {String} did The Decentralized Identifier of the NFT asset.
     * @param {Account} publisher The account of the publisher of the NFT.
     * @returns
     */
    public async mint(did: string, publisher: Account) {
        return await this.contract.mint(did, publisher.getId())
    }

    public async setApprovalForAll(target: string, state: boolean, publisher: Account) {
        return await this.contract.setApprovalForAll(target, state, publisher.getId())
    }

    public async balanceOf(owner: Account) {
        return await this.contract.balanceOf(owner.getId())
    }

    public async ownerOf(did: string): Promise<string> {
        return await this.contract.ownerOf(did)
    }

    public get address() {
        return this.contract.address
    }
}
