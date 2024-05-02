export enum ConditionState {
  Uninitialized = 0,
  Unfulfilled = 1,
  Fulfilled = 2,
  Aborted = 3,
}

export const ConditionStateNames = ['Uninitialized', 'Unfulfilled', 'Fulfilled', 'Aborted']

export type ConditionMethod = 'fulfill' | 'fulfillForDelegate'

export interface AgreementConditionsStatus {
  [condition: string]: {
    condition: string
    contractName: string
    state: ConditionState
    blocked: boolean
    blockedBy: string[]
  }
}

export interface PaymentData {
  rewardAddress: string
  tokenAddress: string
  amounts: bigint[]
  receivers: string[]
}

export interface ConditionInstanceSmall {
  list: any[]
  seed: string
  id: string
  agreementId: string
  condition: string // Condition contract name
}

export interface AgreementInstance<Params> {
  list: Params
  agreementId: string
  instances: ConditionInstanceSmall[]
}
