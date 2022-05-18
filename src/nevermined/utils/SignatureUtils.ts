import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { Web3Error } from '../../errors'

export class SignatureUtils extends Instantiable {
    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }

    public async signText(
        text: string,
        publicKey: string,
        password?: string
    ): Promise<string> {
        const isMetaMask =
            this.web3 &&
            this.web3.currentProvider &&
            (this.web3.currentProvider as any).isMetaMask
        try {
            return await this.web3.eth.personal.sign(text, publicKey, password)
        } catch (e) {
            if (isMetaMask) {
                throw new Web3Error(e)
            }
            this.logger.warn('Error on personal sign.')
            this.logger.warn(e)
            try {
                return await this.web3.eth.sign(text, publicKey)
            } catch (e2) {
                throw new Web3Error(`Error executing personal sign - ${e}`)
            }
        }
    }

    public async verifyText(text: string, signature: string): Promise<string> {
        return this.web3.eth.personal.ecRecover(text, signature)
    }
}
