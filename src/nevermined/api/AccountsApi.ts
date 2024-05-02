// import { Balance, TypedDataDomain, TypedDataTypes } from '../../models'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { NvmAccount } from '../../models/NvmAccount'
import { TxParameters as txParams } from '../../models/Transactions'
import { Balance, TypedDataDomain, TypedDataTypes } from '../../types/GeneralTypes'
import { Hash, toHex } from 'viem'

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
   * Returns the list of accounts (Local or Json-Rpc)
   * @returns The list of accounts.
   */
  public list(): NvmAccount[] {
    return this.config.accounts || []
  }

  /**
   * Returns the list of accounts (JSON-RPC),
   * only can be used by providers like metamask, Status or Trustwallet but not by default
   * provider
   * @returns The list of accounts.
   */
  public async listBrowserAccounts(): Promise<NvmAccount[]> {
    return (await this.addresses()).map((address) =>
      NvmAccount.fromAddress(address as `0x${string}`),
    )
  }

  /**
   * Returns an account initialized with existing web3 provider
   * @param address - The account address
   *
   * @returns The account
   */
  public getAccount(address: string): NvmAccount {
    return NvmAccount.fromAddress(address as `0x${string}`)
  }

  public findAccount(from: string): NvmAccount | undefined {
    for (const acc of this.config.accounts || []) {
      const addr = acc.getAddress()
      if (addr.toLowerCase() === from.toLowerCase()) {
        return acc
      }
    }
    return undefined
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

  public async signTransactionWithRemoteAccount(
    data: `0x${string}`,
    from: string,
  ): Promise<`0x${string}`> {
    return await this.walletClient.signTransaction({
      data,
      account: from as `0x${string}`,
      chain: this.client.chain,
    })
  }

  public async signTypedData(
    domain: TypedDataDomain,
    types: TypedDataTypes,
    value: Record<string, any>,
    from: string,
  ): Promise<Hash> {
    return await this.walletClient.signTypedData({
      domain,
      types: types as any,
      message: value,
      primaryType: 'Nevermined',
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
    account: NvmAccount | string,
    amount: bigint,
    txParams?: txParams,
  ): Promise<boolean> {
    try {
      const nvmAccount =
        typeof account === 'string' ? await this.nevermined.accounts.getAccount(account) : account

      if (!this.nevermined.keeper.dispenser) {
        this.logger.log('Dispenser not available on this network.')
        return false
      }
      await this.nevermined.keeper.dispenser.requestTokens(amount, nvmAccount, txParams)
      return true
    } catch (e) {
      this.logger.log(`Error requesting tokens: ${e}`)
      return false
    }
  }

  /**
   * Balance of Nevermined Token.
   * @returns
   */
  public async getNeverminedBalance(address: string | NvmAccount): Promise<bigint> {
    const accountAddress =
      address instanceof NvmAccount ? address.getAddress() : (address as `0x${string}`)
    const { token } = this.nevermined.keeper
    if (!token) return 0n
    return ((await token.balanceOf(accountAddress)) / 10n) * BigInt(await token.decimals())
  }

  /**
   * Balance of Ether.
   * @returns
   */
  public async getEtherBalance(address: string | NvmAccount): Promise<bigint> {
    const accountAddress =
      address instanceof NvmAccount ? address.getAddress() : (address as `0x${string}`)
    return this.client.public.getBalance({ address: accountAddress })
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
