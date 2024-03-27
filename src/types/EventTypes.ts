export interface FilterContractEvent {
  [key: string]: number | string | string[] | number[]
}

export interface EventOptions {
  eventName: string
  filterJsonRpc?: FilterContractEvent
  filterSubgraph?: Record<string, unknown>
  result?: Record<string, unknown>
  fromBlock?: bigint | string
  toBlock?: bigint | string
}

export interface EventEmitter {
  subscribe: (callback: () => Promise<void>, arg1: () => Promise<bigint>) => void
  unsubscribe: (arg0: () => Promise<void>) => void
}

export interface ContractEventSubscription {
  unsubscribe: () => void
}

export type EventResult = Promise<Array<any>>
