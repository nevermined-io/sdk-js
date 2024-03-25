import { NvmAccount } from './NvmAccount'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { TxParameters as txParams } from '../keeper'

/**
 * Tokens submodule of Nevermined.
 */
export class TokenUtils extends Instantiable {
  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  /**
   * Returns the instance of Token.
   * @returns {@link Token}
   */
  public static async getInstance(config: InstantiableConfig): Promise<TokenUtils> {
    const instance = new TokenUtils(config)
    return instance
  }

  /**
   * Get token symbol.
   */
  public async getSymbol(): Promise<string> {
    return await this.nevermined.keeper.token.symbol()
  }

  public getAddress(): string {
    return this.nevermined.keeper.token.address
  }

  /**
   * Get token name.
   */
  public async getName(): Promise<string> {
    return await this.nevermined.keeper.token.name()
  }

  /**
   * Get token total supply
   */
  public async getTotalSupply(): Promise<bigint> {
    return await this.nevermined.keeper.token.totalSupply()
  }

  /**
   * Transfer a number of tokens to the mentioned account.
   * @param to - Address that receives the tokens.
   * @param amount - Tokens to transfer.
   * @param from - Sender account address.
   * @param txParams - Transaction parameters
   * @returns True if the transfer succeeded.
   */
  public async transfer(
    to: string,
    amount: bigint,
    from: NvmAccount,
    txParams?: txParams,
  ): Promise<boolean> {
    this.nevermined.keeper.token.transfer(to, amount, from.getId(), txParams)
    return true
  }

  /**
   * Request tokens for an account.
   * @param account - Account instance.
   * @param amount - Token amount.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the call succeeded, {@link false} otherwise
   */
  public async request(account: NvmAccount, amount: bigint, params?: txParams): Promise<boolean> {
    try {
      await this.nevermined.accounts.requestTokens(account, amount, params)
      return true
    } catch (e) {
      return false
    }
  }
}
