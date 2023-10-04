import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { ethers } from 'ethers'

export class SignatureUtils extends Instantiable {
  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  public async signText(text: string | Uint8Array, address: string): Promise<string> {
    const signer = await this.nevermined.accounts.findSigner(address)
    try {
      return await signer.signMessage(text)
    } catch (e) {
      // Possibly the provider does not support personal_sign
      // Fallback to eth_sign
      this.logger.warn(`Trying legacy sign: ${e}`)
      return (signer as any)._legacySignMessage(text)
    }
  }

  public verifyText(text: string, signature: string): string {
    return ethers.verifyMessage(text, signature)
  }

  static hash(seed: string): string {
    return ethers.keccak256(ethers.toUtf8Bytes(seed)).replace(/^0x([a-f0-9]{64})(:!.+)?$/i, '0x$1')
  }
}
