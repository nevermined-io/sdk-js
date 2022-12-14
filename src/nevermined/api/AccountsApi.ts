import Balance from '../../models/Balance'
import Account from '../Account'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { TxParameters } from '../../keeper/contracts/ContractBase'
import { ethers } from 'ethers'

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
    public async list(): Promise<Account[]> {
        return (await this.addresses()).map(
            address => new Account(address, this.instanceConfig)
        )
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


    public async findSigner(from: string): Promise<ethers.Signer> {
        for (const acc of this.config.accounts || []) {
            const addr = await acc.getAddress()
            if (addr.toLowerCase() === from.toLowerCase()) {
                return acc.connect(this.web3)
            }
        }
        return this.web3.getSigner(from)
    }

    public async findSignerStatic(
        from: string
    ): Promise<ethers.Signer> {
        for (const acc of this.config.accounts || []) {
            const addr = await acc.getAddress()
            if (addr.toLowerCase() === from.toLowerCase()) {
                return acc.connect(this.web3)
            }
        }
        return this.web3.getSigner(from)
    }

    public async addresses(): Promise<string[]> {
        let ethAccounts: string[] = []
        try {
            ethAccounts = await this.web3.listAccounts()
        } catch (e) {
            // ignore
        }
        const addresses = await Promise.all(
            (this.config.accounts || []).map(a => a.getAddress())
        )
        return addresses.concat(ethAccounts)
    }

}
