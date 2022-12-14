import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { TxParameters } from '../keeper/contracts/ContractBase'
import BigNumber from '../utils/BigNumber'

/**
 * Tokens submodule of Nevermined.
 */
export class Token extends Instantiable {

    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }

    /**
     * Returns the instance of Token.
     * @returns {@link Token}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Token> {
        const instance = new Token(config)       
        return instance
    }

    /**
     * Get token symbol.
     */
    public async getSymbol(): Promise<string> {
        return await this.nevermined.keeper.token.symbol()
    }

    public getAddress(): string {
        return this.nevermined.keeper.token.getAddress()
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
     * @param to - Address that receives the tokens.
     * @param amount - Tokens to transfer.
     * @param from - Sender account address.
     * @returns True if the transfer succeeded.
     */
    public async transfer(
        to: string,
        amount: BigNumber,
        from: Account,
        params?: TxParameters
    ): Promise<boolean> {
        this.nevermined.keeper.token.transfer(to, amount, from.getId(), params)
        return true
    }

    /**
     * Request tokens for an account.
     * @param account - Account instance.
     * @param amount - Token amount.
     * @returns {@link true} if the call succeeded, {@link false} otherwise
     */
    public async request(
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
