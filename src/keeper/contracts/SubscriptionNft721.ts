import { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { abi } from './../../artifacts/NFT721SubscriptionUpgradeable.json'
import { ethers } from 'ethers'
import Nft721 from './Nft721'

export default class SubscriptionNft721 extends Nft721 {
    public static async getInstance(
        config: InstantiableConfig,
        address: string
    ): Promise<SubscriptionNft721> {
        const nft: SubscriptionNft721 = new SubscriptionNft721('NFT721')
        nft.setInstanceConfig(config)

        await nft.checkExists(address)
        nft.contract = new ethers.Contract(address, abi, nft.web3)

        return nft
    }

    public async addMinter(newMinter: string, from: string, params?: TxParameters) {
        return this.send('addMinter', from, [newMinter], params)
    }
}
