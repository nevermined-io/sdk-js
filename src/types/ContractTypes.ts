enum ConditionState {
    Uninitialized = 0,
    Unfulfilled = 1,
    Fulfilled = 2,
    Aborted = 3,
}

const ConditionStateNames = ['Uninitialized', 'Unfulfilled', 'Fulfilled', 'Aborted']

type ConditionMethod = 'fulfill' | 'fulfillForDelegate'
  
interface AgreementConditionsStatus {
    [condition: string]: {
      condition: string
      contractName: string
      state: ConditionState
      blocked: boolean
      blockedBy: string[]
    }
}

interface PaymentData {
    rewardAddress: string
    tokenAddress: string
    amounts: bigint[]
    receivers: string[]
}

interface ConditionInstanceSmall {
    list: any[]
    seed: string
    id: string
    agreementId: string
    condition: string // Condition contract name
}

interface AgreementInstance<Params> {
    list: Params
    agreementId: string
    instances: ConditionInstanceSmall[]
}

