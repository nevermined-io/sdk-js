interface FilterContractEvent {
    [key: string]: number | string | string[] | number[]
}

interface EventOptions {
  eventName: string
  filterJsonRpc?: FilterContractEvent
  filterSubgraph?: Record<string, unknown>
  result?: Record<string, unknown>
  fromBlock?: bigint | string
  toBlock?: bigint | string
}

interface EventEmitter {
  subscribe: (callback: () => Promise<void>, arg1: () => Promise<bigint>) => void
  unsubscribe: (arg0: () => Promise<void>) => void
}

interface ContractEventSubscription {
  unsubscribe: () => void
}

type EventResult = Promise<Array<any>>