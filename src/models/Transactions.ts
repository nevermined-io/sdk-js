import { NvmAccount } from '@/models/NvmAccount'
import { SessionKeyProvider, ZeroDevAccountSigner } from '@zerodev/sdk'

export interface TxParameters {
  value?: string
  gasLimit?: bigint
  gasMultiplier?: number
  gasPrice?: string
  maxPriorityFeePerGas?: string
  maxFeePerGas?: string
  nvmAccount?: NvmAccount
  zeroDevSigner?: ZeroDevAccountSigner<'ECDSA'>
  sessionKeyProvider?: SessionKeyProvider
  nonce?: number
  progress?: (data: any) => void
}
