export interface NvmAccountType {
  signerType: 'local' | 'json-rpc' | 'smart' | 'zerodev' | 'sessionKey'
  isZeroDev: boolean
}
