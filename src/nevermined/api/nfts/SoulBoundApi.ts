import { Account, Config, Nevermined } from '../../..';
import { InstantiableConfig } from '../../../Instantiable.abstract';
import ContractHandler from '../../../keeper/ContractHandler';
import Nft721Contract from '../../../keeper/contracts/Nft721Contract';
import { NFT721Api } from './NFT721Api'

export default class SoulBoundNFTApi extends NFT721Api {  

    public static async getInstanceUsingABI(
        config: InstantiableConfig,
        nftContractAddress: string,
        solidityABI: any
    ): Promise<SoulBoundNFTApi> {
        const instance = new SoulBoundNFTApi()
        instance.servicePlugin = SoulBoundNFTApi.getServicePlugin(config)
        instance.setInstanceConfig(config)

        instance.nftContract = await Nft721Contract.getInstanceUsingABI(
            config, 
            nftContractAddress, 
            solidityABI
        )
        return instance
    }

    public static async deployInstance(
        config: Config,
        contractABI: any,
        from: Account,
        args: string[] = []
    ): Promise<SoulBoundNFTApi> {
                
        const { instanceConfig } = (await Nevermined.getInstance(config)) as any
        const contractHandler = new ContractHandler(instanceConfig)
        const nftContract = await contractHandler.deployAbi(contractABI, from, args)
        return SoulBoundNFTApi.getInstanceUsingABI(instanceConfig, nftContract.address, contractABI)
    }

}
