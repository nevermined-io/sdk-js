import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { Bytes, ethers } from 'ethers'

export class SignatureUtils extends Instantiable {
    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }

    public async signText(text: string | Bytes, address: string): Promise<string> {
        const signer = await this.findSigner(address)
        return await signer.signMessage(text)
    }

    public async verifyText(text: string, signature: string): Promise<string> {
        return ethers.utils.verifyMessage(text, signature)
    }
}
