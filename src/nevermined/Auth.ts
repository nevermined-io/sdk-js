import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { Web3Error } from '../errors'
import { ethers } from 'ethers'

const defaultAuthMessage = 'Nevermined Protocol Authentication'
const defaultExpirationTime = 30 * 24 * 60 * 60 * 1000 // 30 days
const localStorageKey = 'NeverminedTokens'

/**
 * Auth submodule of Nevermined.
 */
export class Auth extends Instantiable {

    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }

    /**
     * Returns a token for the account.
     * @param account - Signer account.
     * @returns A string with the token.
     */
    public async get(account: Account): Promise<string> {
        const time = Math.floor(Date.now() / 1000)
        const message = `${this.getMessage()}\n${time}`

        try {
            const signature = await this.nevermined.utils.signature.signText(
                message,
                account.getId()
            )

            return `${signature}-${time}`
        } catch (e) {
            throw new Web3Error(`User denied the signature: ${e.error.message}`)
        }
    }

    /**
     * Returns the address of signed token.
     * @param token - Token.
     * @returns Signer address.
     */
    public async check(token: string): Promise<string> {
        const expiration = this.getExpiration()
        const [signature, timestamp] = token.split('-')

        const message = `${this.getMessage()}\n${timestamp}`

        if (+timestamp * 1000 + expiration < Date.now()) {
            return `0x${'0'.repeat(40)}`
        }

        return ethers.utils.getAddress(
            await this.nevermined.utils.signature.verifyText(message, signature)
        )
    }

    /**
     * Generates and stores the token for a account.
     * @param account - Signer account.
     */
    public async store(account: Account) {
        const token = await this.get(account)
        this.writeToken(account.getId(), token)
    }

    /**
     * Returns a stored token.
     * @param account - Signer account.
     */
    public async restore(account: Account): Promise<string> {
        let token
        try {
            token = this.readToken(account.getId())
        } catch {
            return
        }
        if (!token) {
            return
        }
        const signer = await this.check(token)
        if (signer.toLowerCase() !== account.getId().toLowerCase()) {
            return
        }
        return token
    }

    /**
     * Returns if the token is stored and is valid.
     * @param account - Signer account.
     * @returns {@link true} if the token is stored and valid.
     */
    public async isStored(account: Account): Promise<boolean> {
        return !!(await this.restore(account))
    }

    private writeToken(address: string, token: string) {
        const localStorage = this.getLocalStorage()
        const storedTokens = localStorage.getItem(localStorageKey)
        const tokens = storedTokens ? JSON.parse(storedTokens) : {}

        localStorage.setItem(
            localStorageKey,
            JSON.stringify({
                ...tokens,
                [address]: token
            })
        )
    }

    private readToken(address: string) {
        const localStorage = this.getLocalStorage()
        const storedTokens = localStorage.getItem(localStorageKey)
        const tokens = storedTokens ? JSON.parse(storedTokens) : {}

        return tokens[address]
    }

    private getLocalStorage() {
        try {
            localStorage.getItem('')
        } catch {
            throw new Web3Error(
                'LocalStorage is not supported. This feature is only available on browsers.'
            )
        }
        return localStorage
    }

    private getMessage() {
        return this.config.authMessage || defaultAuthMessage
    }

    private getExpiration() {
        return this.config.authTokenExpiration || defaultExpirationTime
    }
}
