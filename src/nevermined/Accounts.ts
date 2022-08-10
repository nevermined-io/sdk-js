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
        const ethAccounts: string[] = await this.web3.listAccounts()
        const addresses: string[] = await Promise.all(this.config.accounts.map(a => a.getAddress()))

        return addresses.concat(ethAccounts).map(
            address => new Account(address, this.instanceConfig)
        )
    }

    /**
     * Returns the list of accounts including the addresses not controlled by the node,
     * only can be used by providers like metamask, Status or Trustwallet but not by default
     * provider
     * @return {Promise<Account[]>}
     */
    public async requestList(): Promise<Account[]> {
        // retrieve eth accounts
        const ethAccounts: string[] = await this.web3.listAccounts()

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
            await this.nevermined.faucet.requestEth(address)
            return true
        } catch (e) {
            return false
        }
    }
}
