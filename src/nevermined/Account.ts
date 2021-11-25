import BigNumber from 'bignumber.js'
import Balance from '../models/Balance'

import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

/**
 * Account information.
 */
export default class Account extends Instantiable {
    private password?: string

    private token?: string

    public babyX?: string
    public babyY?: string

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

    /**
     * Set account password.
     * @param {string} password Password for account.
     */
    public setPassword(password: string): void {
        this.password = password
    }

    /**
     * Returns account password.
     * @return {string} Account password.
     */
    public getPassword(): string {
        return this.password
    }

    /**
     * Set account token.
     * @param {string} token Token for account.
     */
    public setToken(token: string): void {
        this.token = token
    }

    /**
     * Returns account token.
     * @return {Promise<string>} Account token.
     */
    public async getToken(): Promise<string> {
        return this.token || this.nevermined.auth.restore(this)
    }

    /**
     * Returns if account token is stored.
     * @return {Promise<boolean>} Is stored.
     */
    public isTokenStored(): Promise<boolean> {
        return this.nevermined.auth.isStored(this)
    }

    /**
     * Authenticate the account.
     */
    public authenticate() {
        return this.nevermined.auth.store(this)
    }

    /**
     * Balance of Nevermined Token.
     * @return {Promise<number>}
     */
    public async getNeverminedBalance(): Promise<number> {
        const { token } = this.nevermined.keeper
        if (!token) return 0
        return (await token.balanceOf(this.id)) / 10 ** (await token.decimals())
    }

    /**
     * Balance of Ether.
     * @return {Promise<number>}
     */
    public async getEtherBalance(): Promise<number> {
        return this.web3.eth
            .getBalance(this.id, 'latest')
            .then((balance: string): number => {
                return new BigNumber(balance).toNumber()
            })
    }

    /**
     * Balances of Ether and Nevermined Token.
     * @return {Promise<Balance>}
     */
    public async getBalance(): Promise<Balance> {
        return {
            eth: await this.getEtherBalance(),
            nevermined: await this.getNeverminedBalance()
        }
    }

    /**
     * Request Nevermined Tokens.
     * @param  {number} amount Tokens to be requested.
     * @return {Promise<number>}
     */
    public async requestTokens(amount: number | string): Promise<string> {
        amount = String(amount)
        if (!this.nevermined.keeper.dispenser) {
            throw new Error('Dispenser not available on this network.')
        }
        try {
            await this.nevermined.keeper.dispenser.requestTokens(amount, this.id)
        } catch (e) {
            this.logger.error(e)
            throw new Error('Error requesting tokens')
        }
        return amount
    }
}
