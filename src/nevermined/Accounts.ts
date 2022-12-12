import Balance from '../models/Balance'
import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { TxParameters } from '../keeper/contracts/ContractBase'

/**
 * Account submodule of Nevermined.
 */
export class Accounts extends Instantiable {
    /**
     * Returns the instance of Accounts.
     * @returns {@link Accounts}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Accounts> {
        const instance = new Accounts()
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
     * @returns
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
}
