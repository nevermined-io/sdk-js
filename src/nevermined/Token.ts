import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

/**
 * Tokens submodule of Nevermined.
 */
export class Token extends Instantiable {
    /**
     * Returns the instance of Token.
     * @return {Promise<Token>}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Token> {
        const instance = new Token()
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Get token symbol.
     */
    public async getSymbol(): Promise<string> {
        return await this.nevermined.keeper.token.symbol()
    }

    /**
     * Get token name.
     */
    public async getName(): Promise<string> {
        return await this.nevermined.keeper.token.name()
    }

    /**
     * Get token total supply
     */
    public async getTotalSupply(): Promise<number> {
        return await this.nevermined.keeper.token.totalSupply()
    }

    /**
     * Transfer a number of tokens to the mentioned account.
     * @param  {string}           to     Address that receives the tokens.
     * @param  {number}           amount Tokens to transfer.
     * @param  {Account}          from   Sender account address.
     * @return {Promise<boolean>}        Success,
     */
    public async transfer(to: string, amount: number, from: Account): Promise<boolean> {
        this.nevermined.keeper.token.transfer(to, amount, from.getId())
        return true
    }

    /**
     * Request tokens for an account.
     * @param  {Account}          account Account instance.
     * @param  {number}           amount  Token amount.
     * @return {Promise<boolean>}         Success.
     */
    public async request(account: Account, amount: number): Promise<boolean> {
        try {
            await account.requestTokens(amount)
            return true
        } catch (e) {
            return false
        }
    }
}
