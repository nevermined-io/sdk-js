import { Token } from './Token'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { ethers } from 'ethers'
import { ContractHandler } from '../ContractHandler'

export class CustomToken extends Token {
  public static async getInstanceByAddress(
    config: InstantiableConfig,
    address: string,
  ): Promise<CustomToken> {
    const token: CustomToken = new Token(process.env.TOKEN_CONTRACT_NAME || 'Custom-Token')
    token.setInstanceConfig(config)

    await new ContractHandler(config).checkExists(address)

    token.contract = new ethers.Contract(address, Token.ERC20_ABI, token.web3)
    token.address = await token.contract.getAddress()

    return token
  }
}
