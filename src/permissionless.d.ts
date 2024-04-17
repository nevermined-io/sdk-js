/// <reference types="node" />

declare module 'permissionless/accounts' {
    export interface SmartAccountSigner<
      TSource extends string = string,
      TAddress extends Address = Address,
    > {}
  }
  
declare module 'permissionless/types' {
    export type EntryPoint = string
}