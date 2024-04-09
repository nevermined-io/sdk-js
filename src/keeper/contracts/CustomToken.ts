import { InstantiableConfig } from '../../Instantiable.abstract'
import { parseAbi } from 'viem'
import { Token } from './Token'

export class CustomToken extends Token {
  public static async getInstanceByAddress(
    config: InstantiableConfig,
    address: string,
  ): Promise<CustomToken> {
    const token: CustomToken = new Token(process.env.TOKEN_CONTRACT_NAME || 'Custom-Token')
    token.setInstanceConfig(config)

    token.contract = await token.nevermined.utils.blockchain.loadContract(
      address,
      parseAbi(Token.ERC20_ABI),
    )

    token.address = await token.contract.address

    return token
  }
}
