import { Balance } from '../models'

import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { TxParameters } from '../keeper'
import { KeeperError } from '../errors'
import { BigNumber } from '../utils'

/**
 * Account information.
 */
export class Account extends Instantiable {
  private password?: string

  private token?: string

  public babyX?: string
  public babyY?: string
  public babySecret?: string

  constructor(private id: string = '0x0', config?: InstantiableConfig) {
    super()
    if (config) {
      this.setInstanceConfig(config)
    }
  }

  public getId() {
    return this.id
  }

  public setId(id) {
    this.id = id
  }

  public getPublic() {
    return this.babyX.substr(2) + this.babyY.substr(2)
  }

  /**
   * Set account password.
   * @param password - Password for account.
   */
  public setPassword(password: string): void {
    this.password = password
  }

  /**
   * Returns account password.
   * @returns The account password.
   */
  public getPassword(): string {
    return this.password
  }

  /**
   * Balance of Nevermined Token.
   * @returns
   */
  public async getNeverminedBalance(): Promise<BigNumber> {
    const { token } = this.nevermined.keeper
    if (!token) return BigNumber.from(0)
    return (await token.balanceOf(this.id)).div(10).mul(await token.decimals())
  }

  /**
   * Balance of Ether.
   * @returns
   */
  public async getEtherBalance(): Promise<BigNumber> {
    return this.web3.getBalance(this.id)
  }

  /**
   * Balances of Ether and Nevermined Token.
   * @returns
   */
  public async getBalance(): Promise<Balance> {
    return {
      eth: await this.getEtherBalance(),
      nevermined: await this.getNeverminedBalance(),
    }
  }

  /**
   * Request Nevermined Tokens.
   * @param amount - Tokens to be requested.
   * @param txParams - Transaction parameters
   * @returns
   */
  public async requestTokens(
    amount: number | string | BigNumber,
    txParams?: TxParameters,
  ): Promise<string> {
    if (!this.nevermined.keeper.dispenser) {
      throw new KeeperError('Dispenser not available on this network.')
    }
    try {
      await this.nevermined.keeper.dispenser.requestTokens(amount, this.id, txParams)
    } catch (e) {
      throw new KeeperError(`Error requesting tokens: ${e}`)
    }
    return amount.toString()
  }
}
