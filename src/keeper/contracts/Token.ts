import BigNumber from 'bignumber.js'
import ContractBase, { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import Account from '../../nevermined/Account'

export default class Token extends ContractBase {
    public static async getInstance(config: InstantiableConfig): Promise<Token> {
        const token: Token = new Token(
            process.env.TOKEN_CONTRACT_NAME || 'NeverminedToken',
            true
        )
        await token.init(config)
        return token
    }

    public async approve(
        to: string,
        price: number | string,
        from?: Account,
        params?: TxParameters
    ) {
        return this.sendFrom('approve', [to, String(price)], from, params)
    }

    public async decimals(): Promise<number> {
        return this.call('decimals', [])
    }

    public async balanceOf(address: string): Promise<number> {
        return this.call('balanceOf', [address]).then((balance: string) =>
            new BigNumber(balance).toNumber()
        )
    }

    public async symbol(): Promise<string> {
        return this.call('symbol', [])
    }

    public async name(): Promise<string> {
        return this.call('name', [])
    }

    public async totalSupply(): Promise<number> {
        return this.call('totalSupply', [])
    }

    public async transfer(
        to: string,
        amount: number,
        from: string,
        params?: TxParameters
    ) {
        return this.send('transfer', from, [to, amount], params)
    }
}
