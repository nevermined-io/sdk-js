import Token from './Token'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { ethers } from 'ethers'
import ContractHandler from '../ContractHandler'

export default class CustomToken extends Token {
    public static async getInstanceByAddress(
        config: InstantiableConfig,
        address: string
    ): Promise<CustomToken> {
        const token: CustomToken = new Token('Custom-Token')
        token.setInstanceConfig(config)

        await token.checkExists(address)

        const contractHandler = new ContractHandler(config)
        const abi = await contractHandler.getABI('NeverminedToken', config.artifactsFolder)
        
        token.contract = new ethers.Contract(address, abi, token.web3)

        return token
    }
}
