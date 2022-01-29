import ContractBase from '../keeper/contracts/ContractBase'

export class SubraphEvent {
    constructor(
        private contract: ContractBase,
        private method: string,
        private query: {},
        private result: {}
    ) {}
}
