import Token from './Token'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { abi } from './../../artifacts/ERC20.json'

export default class CustomToken extends Token {
    public static async getInstanceByAddress(
        config: InstantiableConfig,
        address: string
    ): Promise<CustomToken> {
        const token: CustomToken = new Token('Custom-Token')
        token.setInstanceConfig(config)

        await token.checkExists(address)

        // @ts-ignore
        token.contract = new token.web3.eth.Contract(abi, address)

        return token
    }
}
