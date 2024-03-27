import { Instantiable, InstantiableConfig } from '@/Instantiable.abstract'
import { keccak256 } from '@/nevermined/utils/BlockchainViemUtils'
import { LocalAccount, recoverAddress, toHex } from 'viem'
import { NvmAccountError } from '@/errors/NeverminedErrors'
import { NvmAccount } from '@/models/NvmAccount'
import { TypedDataDomain, TypedDataTypes } from '@/types/GeneralTypes'

export class SignatureUtils extends Instantiable {
  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  public async signText(text: string | Uint8Array, account: string | NvmAccount): Promise<string> {
    const message = typeof text === 'string' ? text : toHex(text)
    const nvmAccount =
      typeof account === 'string' ? await this.nevermined.accounts.getAccount(account) : account

    if (nvmAccount.isZeroDev()) {
      // TODO: Implement ZeroDev signing
      return `0x`
    } else if (nvmAccount.accountType.signerType === 'local') {
      return (nvmAccount.accountSigner as LocalAccount).signMessage({
        message: message as `0x${string}`,
      })
    } else if (nvmAccount.accountType.signerType === 'json-rpc') {
      const result = this.nevermined.accounts.signTextWithRemoteAccount(
        text,
        nvmAccount.getAddress(),
      )
      return result
    } else {
      throw new NvmAccountError('The account type is not supported for signing')
    }
  }

  public async signTypedData(
    domain: TypedDataDomain,
    types: TypedDataTypes,
    value: Record<string, any>,
    account: string | NvmAccount,
  ): Promise<string> {
    const nvmAccount =
      typeof account === 'string' ? await this.nevermined.accounts.getAccount(account) : account

    if (nvmAccount.isZeroDev()) {
      // TODO: Implement ZeroDev signing
      return `0x`
    } else if (nvmAccount.accountType.signerType === 'local') {
      return await (nvmAccount.accountSigner as LocalAccount).signTypedData({
        domain,
        types: types as any,
        message: value,
        primaryType: '',
      })
    } else if (nvmAccount.accountType.signerType === 'json-rpc') {
      return await this.nevermined.accounts.signTypedData(
        domain,
        types,
        value,
        nvmAccount.getAddress(),
      )
    } else {
      throw new NvmAccountError('The account type is not supported for typed signing')
    }
  }

  public async signTransaction(tx: `0x${string}`, account: string | NvmAccount): Promise<string> {
    const nvmAccount =
      typeof account === 'string' ? await this.nevermined.accounts.getAccount(account) : account

    if (nvmAccount.isZeroDev()) {
      // TODO: Implement ZeroDev signing
      return `0x`
    } else if (nvmAccount.accountType.signerType === 'local') {
      return (nvmAccount.accountSigner as LocalAccount).signTransaction({
        data: tx,
      })
    } else if (nvmAccount.accountType.signerType === 'json-rpc') {
      const result = this.nevermined.accounts.signTransactionWithRemoteAccount(
        tx,
        nvmAccount.getAddress(),
      )
      return result
    } else {
      throw new NvmAccountError('The account type is not supported for signing')
    }
  }

  public async verifyIsSigner(
    text: string,
    signature: string,
    signerAddress: string,
  ): Promise<boolean> {
    return this.client.public.verifyMessage({
      message: text,
      signature: signature as `0x${string}`,
      address: signerAddress as `0x${string}`,
    })
  }

  static async recoverSignerAddress(hash: string, signature: string): Promise<string> {
    const message = typeof hash === 'string' ? hash : toHex(hash)
    return recoverAddress({
      hash: message as `0x${string}`,
      signature: signature as `0x${string}`,
    })
  }

  static hash(seed: string): string {
    return keccak256(seed).replace(/^0x([a-f0-9]{64})(:!.+)?$/i, '0x$1')
  }
}
