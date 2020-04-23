import ContractBase from '../ContractBase'
import { zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

export enum ConditionState {
    Uninitialized = 0,
    Unfulfilled = 1,
    Fulfilled = 2,
    Aborted = 3
}

export const conditionStateNames = [
    'Uninitialized',
    'Unfulfilled',
    'Fulfilled',
    'Aborted'
]

export abstract class Condition extends ContractBase {
    public static async getInstance(
        config: InstantiableConfig,
        conditionName: string,
        conditionsClass: any
    ): Promise<Condition & any> {
        const condition: Condition = new (conditionsClass as any)(conditionName)
        await condition.init(config)
        return condition
    }

    protected constructor(contractName: string) {
        super(contractName)
    }

    public hashValues(...args: any[]): Promise<string> {
        return this.call('hashValues', args)
    }

    public fulfill(agreementId: string, ...args: any[])

    public fulfill(agreementId: string, args: any[], from?: string) {
        return this.sendFrom('fulfill', [zeroX(agreementId), ...args], from)
    }

    public async generateIdHash(agreementId: string, ...values: any[]) {
        return this.generateId(agreementId, await this.hashValues(...values))
    }

    public generateId(agreementId: string, valueHash: string) {
        return this.call<string>('generateId', [zeroX(agreementId), valueHash])
    }

    public abortByTimeOut(agreementId: string, from?: string) {
        return this.sendFrom('abortByTimeOut', [zeroX(agreementId)], from)
    }

    public getConditionFulfilledEvent(agreementId: string) {
        return this.getEvent('Fulfilled', { agreementId: zeroX(agreementId) })
    }
}
