import ContractBase, { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { Account } from '../../nevermined'
import { BigNumber } from '../../utils'

export class Token extends ContractBase {
    static ERC20_ABI = [
        // Read-Only Functions
        'function balanceOf(address owner) view returns (uint256)',
        'function decimals() view returns (uint8)',
        'function symbol() view returns (string)',
        'function name() view returns (string)',
        // Authenticated Functions
        'function transfer(address to, uint amount) returns (bool)',
        'function approve(address spender, uint256 amount) returns (bool)',
        // Events
        'event Transfer(address indexed from, address indexed to, uint amount)'
    ]

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
        txParams?: TxParameters
    ) {
        return this.sendFrom('approve', [to, price.toString()], from, txParams)
    }

    public async decimals(): Promise<number> {
        return this.call('decimals', [])
    }

    public async balanceOfConverted(address: string): Promise<BigNumber> {
        return BigNumber.from(
            BigNumber.formatEther(await this.call('balanceOf', [address]))
        )
    }

    public async strBalanceOf(address: string): Promise<string> {
        return this.call('balanceOf', [address])
    }

    public async balanceOf(address: string): Promise<BigNumber> {
        return this.call('balanceOf', [address])
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
        txParams?: TxParameters
    ) {
        return this.send('transfer', from, [to, amount.toString()], txParams)
    }
}
