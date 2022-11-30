import { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { abi } from './../../artifacts/NFT721SubscriptionUpgradeable.json'
import { ethers } from 'ethers'
import Nft721Contract from './Nft721Contract'

export default class SubscriptionNft721 extends Nft721Contract {
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

}
