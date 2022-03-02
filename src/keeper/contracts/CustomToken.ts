import Token from './Token'
import { InstantiableConfig } from '../../Instantiable.abstract'

export default class CustomToken extends Token {
    public static async getInstanceByAddress(
        config: InstantiableConfig,
        address: string
    ): Promise<CustomToken> {
        const token: CustomToken = new Token('Custom-Token', config.web3, config.logger)
        const where = (await config.nevermined.keeper.getNetworkName()).toLowerCase()
        const artifact = require(`@nevermined-io/contracts/artifacts/NeverminedToken.${where}.json`)
        const { abi } = artifact

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
