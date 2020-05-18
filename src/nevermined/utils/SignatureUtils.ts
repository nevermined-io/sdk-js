import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'

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
                throw e
            }
            this.logger.warn('Error on personal sign.')
            this.logger.warn(e)
            try {
                return await this.web3.eth.sign(text, publicKey)
            } catch (e2) {
                this.logger.error('Error on sign.')
                this.logger.error(e2)
                throw new Error('Error executing personal sign')
            }
        }
    }

    public async verifyText(text: string, signature: string): Promise<string> {
        return this.web3.eth.personal.ecRecover(text, signature)
    }
}
