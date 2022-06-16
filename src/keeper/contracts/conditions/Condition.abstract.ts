import ContractBase, { TxParameters } from '../ContractBase'
import { zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'

export enum ConditionState {
    Uninitialized = 0,
    Unfulfilled = 1,
    Fulfilled = 2,
    Aborted = 3
}

export interface ConditionParameters {
    list: any[]
}

export interface ConditionInstance {
    list: any[]
    seed: string
    id: string
    params: any[] // for fullfill
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
        conditionsClass: any,
        optional: boolean = false
    ): Promise<Condition & any> {
        const condition: Condition = new (conditionsClass as any)(conditionName)
        await condition.init(config, optional)
        return condition
    }

    public hashValues(...args: any[]): Promise<string> {
        return this.call('hashValues', args)
    }

    public params(...args: any[]): ConditionParameters {
        return { list: args }
    }

    public fulfill(agreementId: string, ...args: any[])

    public fulfill(
        agreementId: string,
        args: any[],
        from?: Account,
        params?: TxParameters,
        method: string = 'fulfill'
    ) {
        return this.sendFrom(method, [zeroX(agreementId), ...args], from, params)
    }

    public async generateIdHash(agreementId: string, ...values: any[]) {
        return this.generateId(agreementId, await this.hashValues(...values))
    }

    public generateId(agreementId: string, valueHash: string) {
        return this.call<string>('generateId', [zeroX(agreementId), valueHash])
    }

    public async generateIdWithSeed(
        agreementId: string,
        valueHash: string
    ): Promise<[string, string]> {
        return [
            valueHash,
            await this.call<string>('generateId', [zeroX(agreementId), valueHash])
        ]
    }

    public async instance(
        agreementId: string,
        params: ConditionParameters
    ): Promise<ConditionInstance> {
        const valueHash = await this.hashValues(...params.list)
        return {
            seed: valueHash,
            id: await this.call<string>('generateId', [zeroX(agreementId), valueHash]),
            list: params.list,
            params: params.list,
        }
    }

    public abortByTimeOut(agreementId: string, from?: Account, params?: TxParameters) {
        return this.sendFrom('abortByTimeOut', [zeroX(agreementId)], from, params)
    }

    public getConditionFulfilledEvent(agreementId: string) {
        return this.events.getEventData({
            eventName: 'Fulfilled',
            methodName: 'getFulfilleds',
            filterJsonRpc: { agreementId: zeroX(agreementId) },
            filterSubgraph: { where: { _agreementId: zeroX(agreementId) } },
            result: {
                _agreementId: true,
                _documentId: true,
                _grantee: true,
                _conditionId: true
            }
        })
    }
}
