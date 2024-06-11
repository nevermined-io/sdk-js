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

  /**
   * Given an address, it returns the account if it exists in the list of accounts.
   * @param from
   * @returns
   */
  public findAccount(from: string): NvmAccount | undefined {
    for (const acc of this.config.accounts || []) {
      const addr = acc.getAddress()
      if (addr.toLowerCase() === from.toLowerCase()) {
        return acc
      }
    }
    return undefined
  }

  /**
   * Returns the list of addresses (Local or Json-Rpc)
   * @returns The list of addresses.
   */
  public async addresses(): Promise<string[]> {
    return await Promise.all((this.config.accounts || []).map((a) => a.getAddress()))
  }

  /**
   * It signs a message using a remote account
   * @param text the message to sign
   * @param from the address of the remote account used to sign the message
   * @returns the message signed message
   */
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

  /**
   * It signs a transaction using a remote account
   * @param data the transaction data
   * @param from the address of the remote account used to sign the transaction
   * @returns the signed transaction
   */
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

  /**
   * It signs a typed data using a remote account
   * @param domain the domain of the typed data
   * @param types the types of the typed data
   * @param value the value of the typed data
   * @param from the address of the remote account used to sign the typed data
   * @returns the signed typed data
   */
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
   * @param account - Account instance or the address of the account to receive the tokens
   * @param amount  - Token amount to request
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
   * It gets the balance of the ERC20 Token loaded in the Nevermined instance
   * @param account - Account instance or the address of the account to get the balance
   * @returns the balance of ERC20 Token related to the account
   */
  public async getNeverminedBalance(account: string | NvmAccount): Promise<bigint> {
    const accountAddress =
      account instanceof NvmAccount ? account.getAddress() : (account as `0x${string}`)
    const { token } = this.nevermined.keeper
    if (!token) return 0n
    return ((await token.balanceOf(accountAddress)) / 10n) * BigInt(await token.decimals())
  }

  /**
   * It gets the native token (i.e ETH) balance of an account
   * @param account - Account instance or the address of the account to get the balance
   * @returns the balance of the native token
   */
  public async getEtherBalance(account: string | NvmAccount): Promise<bigint> {
    const accountAddress =
      account instanceof NvmAccount ? account.getAddress() : (account as `0x${string}`)
    return this.client.public.getBalance({ address: accountAddress })
  }

  /**
   * It gets the balance of the native token (i.e ETH) and the ERC20 token associated to the account
   * @param account - Account instance or the address of the account to get the balance
   * @returns The balance of the ERC20 and Native tokens
   */
  public async getBalance(account: string | NvmAccount): Promise<Balance> {
    const accountAddress = account instanceof NvmAccount ? account.getId() : account
    return {
      eth: await this.getEtherBalance(accountAddress),
      nevermined: await this.getNeverminedBalance(accountAddress),
    }
  }
}
