import BigNumber from 'bignumber.js'
import ContractBase, { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import Account from '../../nevermined/Account'
import { ethers } from 'ethers'

export default class Token extends ContractBase {
    public static async getInstance(config: InstantiableConfig): Promise<Token> {
        const token: Token = new Token(
            process.env.TOKEN_CONTRACT_NAME || 'NeverminedToken'
        )
        await token.init(config, true)
        return token
    }

    public async approve(
        to: string,
        price: BigNumber,
        from?: Account,
        params?: TxParameters
    ) {
        return this.sendFrom('approve', [to, price.toFixed()], from, params)
    }

    public async decimals(): Promise<number> {
        return this.call('decimals', [])
    }

    public async balanceOfConverted(address: string): Promise<BigNumber> {
        return new BigNumber(
            ethers.utils.formatEther(await this.call('balanceOf', [address]))
        )
    }

    public async strBalanceOf(address: string): Promise<string> {
        return this.call('balanceOf', [address])
    }

    public async balanceOf(address: string): Promise<BigNumber> {
        return this.call('balanceOf', [address]).then(
            (balance: string) => new BigNumber(balance.toString())
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
        amount: BigNumber,
        from: string,
        params?: TxParameters
    ) {
        return this.send('transfer', from, [to, amount.toFixed()], params)
    }
}
