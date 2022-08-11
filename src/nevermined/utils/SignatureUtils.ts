import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { Bytes, ethers } from 'ethers'

export class SignatureUtils extends Instantiable {
    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }

    public async signText(text: string | Bytes, address: string): Promise<string> {
        const signer = await this.findSigner(address)
        try {
            return await signer.signMessage(text)
        } catch (e) {
            // Possibly the provider does not support personal_sign
            // Fallback to eth_sign
            this.logger.warn(`Trying legacy sign: ${e}`)
            return (signer as any)._legacySignMessage(text)
        }
    }

    public async verifyText(text: string, signature: string): Promise<string> {
        return ethers.utils.verifyMessage(text, signature)
    }
}
