import { SessionKeyProvider, ZeroDevAccountSigner } from '@zerodev/sdk'
// const zerodev = await import('@zerodev/sdk')
import { Account, LocalAccount, toHex } from 'viem'
import { NvmAccountError } from '@/errors/NeverminedErrors'
import { NvmAccountType } from '@/types/AccountTypes'



/**
 * Account information.
 */
export class NvmAccount {
  private password?: string
  public babyX?: string
  public babyY?: string
  public babySecret?: string
  public accountSigner?: Account
  public zeroDevSigner: ZeroDevAccountSigner<'ECDSA'> | SessionKeyProvider
  public accountType: NvmAccountType = { signerType: 'local', isZeroDev: false }

  /**
   * Returns a nevermined Account from a viem account
   *
   * @param signer - A zerodev account signer
   * @returns The nevermined account
   */
  static fromAccount(account: Account): NvmAccount {
    const address = account.address
    const nvmAccount = new NvmAccount(address, { signerType: account.type, isZeroDev: false })
    nvmAccount.accountSigner = account
    return nvmAccount
  }

  /**
   * Returns a nevermined Account from a zerodev signer
   *
   * @param signer - A zerodev account signer
   * @returns The nevermined account
   */
  static async fromZeroDevSigner(
    signer: ZeroDevAccountSigner<'ECDSA'> | SessionKeyProvider,
  ): Promise<NvmAccount> {
    const address = await signer.getAddress()
    const account = new NvmAccount(address, { signerType: 'zerodev', isZeroDev: true })
    account.zeroDevSigner = signer
    return account
  }

  constructor(
    private id: string,
    accountType: NvmAccountType = { signerType: 'local', isZeroDev: false },
  ) {
    this.setId(id)
    this.accountType = accountType
  }

  public getAccountSigner() {
    return this.accountType.isZeroDev ? this.zeroDevSigner : this.accountSigner
  }

  public getZeroDevSigner() {
    return this.zeroDevSigner
  }

  public isZeroDev(): boolean {
    return this.zeroDevSigner !== undefined
  }

  public getAddress() {
    return this.id as `0x${string}`
  }

  public getId() {
    return this.id as `0x${string}`
  }

  public setId(id: string) {
    this.id = id
  }

  public getPublic() {
    return this.babyX.substr(2) + this.babyY.substr(2)
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
  public getPassword(): string {
    return this.password
  }
}
