import Balance from '../models/Balance'
import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

/**
 * Account submodule of Nevermined.
 */
export class Accounts extends Instantiable {
    /**
     * Returns the instance of Accounts.
     * @return {Promise<Accounts>}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Accounts> {
        const instance = new Accounts()
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Returns the list of accounts.
     * @return {Promise<Account[]>}
     */
    public async list(): Promise<Account[]> {
        // retrieve eth accounts
        const ethAccounts: string[] = await this.web3.eth.getAccounts()

        const accountPromises = ethAccounts.map(
            address => new Account(address, this.instanceConfig)
        )
        return Promise.all(accountPromises)
    }

    /**
     * Return account balance.
     * @param  {Account}          account Account instance.
     * @return {Promise<Balance>}         Ether and Nevermined Token balance.
     */
    public balance(account: Account): Promise<Balance> {
        return account.getBalance()
    }

    /**
     * Request tokens for an account.
     * @param  {Account}          account Account instance.
     * @param  {number}           amount  Token amount.
     * @return {Promise<boolean>}         Success.
     */
    public async requestTokens(account: Account, amount: number): Promise<boolean> {
        try {
            await account.requestTokens(amount)
            return true
        } catch (e) {
            return false
        }
    }
}
