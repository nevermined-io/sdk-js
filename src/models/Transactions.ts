export interface TxParameters {
  value?: bigint
  gasLimit?: bigint
  gasMultiplier?: number
  gasPrice?: string
  maxPriorityFeePerGas?: string
  maxFeePerGas?: string
  nonce?: number
  progress?: (data: any) => void
}
