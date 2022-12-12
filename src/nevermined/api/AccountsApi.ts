import Balance from '../../models/Balance'
import Account from '../Account'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { TxParameters } from '../../keeper/contracts/ContractBase'
// import { NVMBaseApi } from './NVMBaseApi'

/**
 * Nevermined Accounts API. It allows execute operations related with Ethereum accounts.
 */
export class AccountsApi extends Instantiable {

    /**
     * Returns the instance of the AccountsApi.
     * @param config - Configuration of the Nevermined instance
     * @returns {@link AccountsApi}
     */  
    public static async getInstance(config: InstantiableConfig): Promise<AccountsApi> {
        const instance = new AccountsApi()
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Returns the list of accounts.
     *
     * @returns The list of accounts.
     */
    public async list(): Promise<Account[]> {
        return (await this.addresses()).map(
            address => new Account(address, this.instanceConfig)
        )
    }

    /**
     * Returns the list of accounts including the addresses not controlled by the node,
     * only can be used by providers like metamask, Status or Trustwallet but not by default
     * provider
     * @returns The list of accounts.
     */
    public async requestList(): Promise<Account[]> {
        return this.list()
    }

    /**
     * Return account balance.
     * @param account - Account instance.
     * @returns Ether and Nevermined Token balance.
     */
    public balance(account: Account): Promise<Balance> {
        return account.getBalance()
    }

    /**
     * Request tokens for an account.
     * @param account - Account instance.
     * @param amount  - Token amount.
     * @returns {@link true} if the call was successful. {@link false} otherwise.
     */
    public async requestTokens(
        account: Account,
        amount: number,
        params?: TxParameters
    ): Promise<boolean> {
        try {
            await account.requestTokens(amount, params)
            return true
        } catch (e) {
            return false
        }
    }

    public async requestEthFromFaucet(address: string): Promise<boolean> {
        try {
            await this.nevermined.services.faucet.requestEth(address)
            return true
        } catch (e) {
            return false
        }
    }
}
