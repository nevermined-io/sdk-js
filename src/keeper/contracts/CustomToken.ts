import { abi } from '@nevermined-io/contracts/artifacts/NeverminedToken.development.json'
import Token from './Token'
import { InstantiableConfig } from '../../Instantiable.abstract'

export default class CustomToken extends Token {
    public static async getInstanceByAddress(
        config: InstantiableConfig,
        address: string
    ): Promise<CustomToken> {
        const token: CustomToken = new Token('Custom-Token')

        token.setInstanceConfig(config)

        const code = await token.web3.eth.getCode(address)
        if (code === '0x0') {
            // no code in the blockchain dude
            throw new Error(`No code deployed at address ${address}, sorry.`)
        }

        // @ts-ignore
        token.contract = new token.web3.eth.Contract(abi, address)

        return token
    }
}
