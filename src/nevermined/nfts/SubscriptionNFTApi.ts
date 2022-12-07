import { Account, Config, Nevermined } from '../..';
import { InstantiableConfig } from '../../Instantiable.abstract';
import ContractHandler from '../../keeper/ContractHandler';
import Nft721Contract from '../../keeper/contracts/Nft721Contract';
import { NFT721Api } from './NFT721Api'

export default class SubscriptionNFTApi extends NFT721Api {  

    public static async getInstanceUsinABI(
        config: InstantiableConfig,
        nftContractAddress: string,
        solidityABI: any
    ): Promise<SubscriptionNFTApi> {
        const nft = new SubscriptionNFTApi()
        nft.setInstanceConfig(config)

        nft.nftContract = await Nft721Contract.getInstanceUsingABI(
            config, 
            nftContractAddress, 
            solidityABI, 
            'NFT721SubscriptionUpgradeable'
        )
        return nft
    }

    public static async deployInstance(
        config: Config,
        contractABI: any,
        from: Account,
        args: string[] = []
    ): Promise<SubscriptionNFTApi> {
                
        const { instanceConfig } = (await Nevermined.getInstance(config)) as any
        const contractHandler = new ContractHandler(instanceConfig)
        const nftContract = await contractHandler.deployAbi(contractABI, from, args)
        return SubscriptionNFTApi.getInstanceUsinABI(instanceConfig, nftContract.address, contractABI)
    }

}
