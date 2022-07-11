import BigNumber from 'bignumber.js'
import Balance from '../models/Balance'

import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { makeKeyTransfer } from '../utils/KeyTransfer'
import { TxParameters } from '../keeper/contracts/ContractBase'
import { KeeperError } from '../errors'
import { ethers } from 'ethers'

/**
 * Account information.
 */
export default class Account extends Instantiable {
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

    public async signBabyjub(num: bigint) {
        const keytransfer = await makeKeyTransfer()
        return keytransfer.signBabyjub(this.babySecret, num)
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
    public async getNeverminedBalance(): Promise<BigNumber> {
        const { token } = this.nevermined.keeper
        if (!token) return new BigNumber(0)
        return (await token.balanceOf(this.id))
            .div(10)
            .multipliedBy(await token.decimals())
    }

    /**
     * Balance of Ether.
     * @return {Promise<number>}
     */
    public async getEtherBalance(): Promise<BigNumber> {
        return this.web3.getBalance(this.id).then(
            (balance: ethers.BigNumber): BigNumber => {
                return new BigNumber(balance.toString())
            }
        )
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
    public async requestTokens(
        amount: number | string | BigNumber,
        params?: TxParameters
    ): Promise<string> {
        if (!this.nevermined.keeper.dispenser) {
            throw new KeeperError('Dispenser not available on this network.')
        }
        try {
            await this.nevermined.keeper.dispenser.requestTokens(amount, this.id, params)
        } catch (e) {
            throw new KeeperError(`Error requesting tokens: ${e}`)
        }
        return amount.toString()
    }
}
