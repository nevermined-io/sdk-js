export enum AccountType {
  Local = 'local',
  JsonRpc = 'json-rpc',
  ZeroDev = 'zerodev',
}

export interface NvmAccountType {
  signerType: 'local' | 'json-rpc' | 'zerodev'
  isZeroDev: boolean
}

// interface INvmAccount {
//     getAccountSigner()
//     getZeroDevSigner()
//     isZeroDev(): boolean
//     getAddress(): `0x${string}`
//     getId(): `0x${string}`
//     setId(id: string)
//     signTextLocally(text: string | Uint8Array): Promise<`0x${string}`>
//     setPassword(password: string): void
//     getPassword(): string
// }
