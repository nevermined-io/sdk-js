import { Balance } from '../../models'
import { NvmAccount, TypedDataDomain, TypedDataTypes } from '../../nevermined'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { TxParameters as txParams } from '../../keeper'
import { toHex } from 'viem'

/**
 * Nevermined Accounts API. It allows execute operations related with Ethereum accounts.
 */
export class AccountsApi extends Instantiable {
  /**
   * Creates a new AccountsApi
   * @param config - Configuration of the Nevermined instance
   * @returns {@link AccountsApi}
   */
  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  /**
   * Returns the list of accounts including the addresses not controlled by the node,
   * only can be used by providers like metamask, Status or Trustwallet but not by default
   * provider
   * @returns The list of accounts.
   */
  public async list(): Promise<NvmAccount[]> {
    return (await this.addresses()).map((address) => new NvmAccount(address))
  }

  /**
   * Returns an account initialized with existing web3 provider
   * @param address - The account address
   *
   * @returns The account
   */
  public getAccount(address: string): NvmAccount {
    return new NvmAccount(address)
  }

  public async findAccount(from: string): Promise<NvmAccount> {
    for (const acc of this.config.accounts || []) {
      const addr = await acc.getAddress()
      if (addr.toLowerCase() === from.toLowerCase()) {
        return acc
      }
    }
  }

  public async addresses(): Promise<string[]> {
    return await Promise.all((this.config.accounts || []).map((a) => a.getAddress()))
  }

  public async signTextWithRemoteAccount(
    text: string | Uint8Array,
    from: string,
  ): Promise<`0x${string}`> {
    const message = typeof text === 'string' ? text : toHex(text)
    return await this.walletClient.signMessage({
      account: from as `0x${string}`,
      message: message as `0x${string}`,
    })
  }

  public async signTypedData(
    domain: TypedDataDomain,
    types: TypedDataTypes,
    value: Record<string, any>,
    from: string,
  ): Promise<`0x${string}`> {
    return await this.walletClient.signTypedData({
      domain,
      types: types as any,
      message: value,
      primaryType: '',
      account: from as `0x${string}`,
    })
  }

  /**
   * Request tokens for an account.
   * @param account - Account instance.
   * @param amount  - Token amount.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the call was successful. {@link false} otherwise.
   */
  public async requestTokens(
    account: NvmAccount,
    amount: number,
    txParams?: txParams,
  ): Promise<boolean> {
    try {
      if (!this.nevermined.keeper.dispenser) {
        this.logger.log('Dispenser not available on this network.')
        return false
      }
      await this.nevermined.keeper.dispenser.requestTokens(amount, account.getId(), txParams)
      return true
    } catch (e) {
      this.logger.log(`Error requesting tokens - receiver[${account.getId()}]: ${e}`)
      return false
    }
  }

  /**
   * Balance of Nevermined Token.
   * @returns
   */
  public async getNeverminedBalance(address: string): Promise<bigint> {
    const { token } = this.nevermined.keeper
    if (!token) return 0n
    return ((await token.balanceOf(address)) / 10n) * BigInt(await token.decimals())
  }

  /**
   * Balance of Ether.
   * @returns
   */
  public async getEtherBalance(address: string): Promise<bigint> {
    return this.client.public.getBalance({ address: address as `0x${string}` })
  }

  /**
   * Balances of Ether and Nevermined Token.
   * @returns
   */
  public async getBalance(address: string | NvmAccount): Promise<Balance> {
    const accountAddress = address instanceof NvmAccount ? address.getId() : address
    return {
      eth: await this.getEtherBalance(accountAddress),
      nevermined: await this.getNeverminedBalance(accountAddress),
    }
  }
}
