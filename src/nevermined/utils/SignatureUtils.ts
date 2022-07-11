import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { ethers } from 'ethers'

export class SignatureUtils extends Instantiable {
    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }

    public async signText(text: string, address: string): Promise<string> {
        const signer = this.web3.getSigner(address)
        return signer.signMessage(text)
    }

    public async verifyText(text: string, signature: string): Promise<string> {
        return ethers.utils.verifyMessage(text, signature)
    }
}
