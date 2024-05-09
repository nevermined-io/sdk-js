import { Account, Chain, LocalAccount, Transport, toHex } from 'viem'
import { NvmAccountError } from '../errors/NeverminedErrors'
import { NvmAccountType } from '../types/AccountTypes'
import { parseAccount } from 'viem/utils'
import { KernelAccountClient, KernelSmartAccount } from '@zerodev/sdk'

/**
 * Account information.
 */
export class NvmAccount {
  private password?: string
  public babyX?: string
  public babyY?: string
  public babySecret?: string
  private accountSigner?: Account
  private kernelClient?: KernelAccountClient<
    '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
    Transport,
    Chain,
    any
  >
  private zeroDevSigner?: KernelSmartAccount<any> // ZeroDevAccountSigner<'ECDSA'> | SessionKeyProvider
  public accountType: NvmAccountType = { signerType: 'local', isZeroDev: false }

  /**
   * Returns a nevermined Account from a viem account
   *
   * @param account - A viem local account
   * @returns The nevermined account
   */
  static fromAccount(account: Account): NvmAccount {
    const address = account.address
    const nvmAccount = new NvmAccount(address, { signerType: account.type, isZeroDev: false })
    nvmAccount.accountSigner = account
    return nvmAccount
  }

  /**
   * Returns a nevermined Account from an address. This method is used for browser integration (i.e Metamask)
   *
   * @param address - A wallet address
   * @returns The nevermined account
   */
  static fromAddress(address: `0x${string}`): NvmAccount {
    const nvmAccount = new NvmAccount(address, { signerType: 'json-rpc', isZeroDev: false })
    nvmAccount.accountSigner = parseAccount(address)
    return nvmAccount
  }

  /**
   * Returns a nevermined Account from a zerodev signer
   *
   * @param signer - A zerodev account signer
   * @returns The nevermined account
   */
  static async fromZeroDevSigner(
    kernelClient: KernelAccountClient<
      '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      Transport,
      Chain,
      any
    >, // | ZeroDevAccountSigner<'ECDSA'> | SessionKeyProvider,
  ): Promise<NvmAccount> {
    const address = kernelClient.account.address
    const account = new NvmAccount(address, { signerType: 'zerodev', isZeroDev: true })
    account.kernelClient = kernelClient
    account.zeroDevSigner = kernelClient.account
    return account
  }

  static fromZeroDevSessionKey(
    kernelClient: KernelAccountClient<
      '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      Transport,
      Chain,
      any
    >,
  ) {
    const address = kernelClient.account.address
    const account = new NvmAccount(address, { signerType: 'sessionKey', isZeroDev: true })
    account.kernelClient = kernelClient
    account.zeroDevSigner = kernelClient.account
    return account
  }

  private constructor(
    private id: string,
    accountType: NvmAccountType = { signerType: 'local', isZeroDev: false },
  ) {
    this.setId(id)
    this.accountType = accountType
  }

  public getAccountSigner() {
    return this.accountType.isZeroDev ? this.zeroDevSigner : this.accountSigner
  }

  public getKernelClient() {
    return this.kernelClient
  }

  public getType() {
    return this.accountType.signerType
  }
  public getZeroDevSigner(): KernelSmartAccount<any> {
    return this.zeroDevSigner
  }

  public isZeroDev(): boolean {
    return this.zeroDevSigner !== undefined
  }

  public getAddress() {
    return this.id as `0x${string}`
  }

  public getId() {
    return this.getAddress()
  }

  public setId(id: string) {
    this.id = id
  }

  public getPublic() {
    return (this.babyX ?? '').substr(2) + (this.babyY ?? '').substr(2)
  }

  public async signTextLocally(text: string | Uint8Array): Promise<`0x${string}`> {
    const message = typeof text === 'string' ? text : toHex(text)
    if (this.isZeroDev()) {
      // TODO: Implement ZeroDev signing
      return `0x`
    } else if (this.accountType.signerType === 'local') {
      return (this.accountSigner as LocalAccount).signMessage({ message: message as `0x${string}` })
    } else {
      throw new NvmAccountError('The account type is not supported for local signing')
    }
  }

  /**
   * Set account password.
   * @param password - Password for account.
   */
  public setPassword(password: string): void {
    this.password = password
  }

  /**
   * Returns account password.
   * @returns The account password.
   */
  public getPassword(): string | undefined {
    return this.password
  }
}
