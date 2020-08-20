import BigNumber from 'bignumber.js'
import ContractBase from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'

export default class Token extends ContractBase {
    public static async getInstance(config: InstantiableConfig): Promise<Token> {
        const token: Token = new Token('NeverminedToken', true)
        await token.init(config)
        return token
    }

    public async approve(to: string, price: number | string, from?: string) {
        return this.sendFrom('approve', [to, String(price)], from)
    }

    public async decimals(): Promise<number> {
        return this.call('decimals', [])
    }

    public async balanceOf(address: string): Promise<number> {
        return this.call('balanceOf', [address]).then((balance: string) =>
            new BigNumber(balance).toNumber()
        )
    }

    public async transfer(to: string, amount: number, from: string) {
        return this.send('transfer', from, [to, amount])
    }
}
