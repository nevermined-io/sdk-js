/// <reference types="node" />

declare module 'permissionless/accounts' {
  export interface SmartAccountSigner<
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TSource extends string = string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TAddress extends Address = Address,
  > {}
  export class SignTransactionNotSupportedBySmartAccount extends BaseError {}
}

export type EntryPoint = string

declare module '@zerodev/permissions/signers' {
  export function toECDSASigner<
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TSource extends string = 'custom',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TAddress extends Address = Address,
  >({ signer })
}
