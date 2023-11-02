import { Token } from './Token'
import { InstantiableConfig } from '../../Instantiable.abstract'

export class CustomToken extends Token {
  private overrideAddress?: string

  public static async getInstanceByAddress(
    config: InstantiableConfig,
    address: string,
  ): Promise<CustomToken> {
    const token: CustomToken = new CustomToken(
      process.env.TOKEN_CONTRACT_NAME || 'Custom-Token',
      config,
    )
    token.overrideAddress = address
    return token
  }

  protected async init() {
    super.init(this.overrideAddress, { abi: Token.ERC20_ABI })
  }
}
