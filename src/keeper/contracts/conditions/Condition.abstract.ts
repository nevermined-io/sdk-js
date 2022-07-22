import ContractBase, { TxParameters } from '../ContractBase'
import { zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { DDO } from '../../..'
import { Service } from '../../../ddo/Service'
import AssetRewards from '../../../models/AssetRewards'

export enum ConditionState {
    Uninitialized = 0,
    Unfulfilled = 1,
    Fulfilled = 2,
    Aborted = 3
}

export interface ConditionContext {
    ddo: DDO
    service: Service
    rewards: AssetRewards
    creator: string
}

export interface ConditionParameters<Extra> {
    list: any[]
    params: (arg: Extra) => Promise<any[]> // for fullfill
}

export interface ConditionInstanceSmall {
    list: any[]
    seed: string
    id: string
    agreementId: string
}

export interface ConditionInstance<Extra> {
    list: any[]
    seed: string
    id: string
    params: (arg: Extra) => Promise<any[]> // for fullfill
    agreementId: string
}

export const conditionStateNames = [
    'Uninitialized',
    'Unfulfilled',
    'Fulfilled',
    'Aborted'
]

export abstract class ConditionSmall extends ContractBase {
    public static async getInstance<Ctx extends ConditionContext, Extra>(
        config: InstantiableConfig,
        conditionName: string,
        conditionsClass: any,
        optional: boolean = false
    ): Promise<ConditionSmall & any> {
        const condition: ConditionSmall = new (conditionsClass as any)(conditionName)
        await condition.init(config, optional)
        return condition
    }

    public hashValues(...args: any[]): Promise<string> {
        return this.call('hashValues', args)
    }

    public abstract fulfill(agreementId: string, ...args: any[])

    public fulfillPlain(
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

export abstract class Condition<
    Ctx extends ConditionContext,
    Extra = Record<string, unknown>
> extends ConditionSmall {
    public static async getInstance<Ctx extends ConditionContext, Extra>(
        config: InstantiableConfig,
        conditionName: string,
        conditionsClass: any,
        optional: boolean = false
    ): Promise<Condition<Ctx, Extra> & any> {
        const condition: Condition<Ctx, Extra> = new (conditionsClass as any)(
            conditionName
        )
        await condition.init(config, optional)
        return condition
    }

    public params(...args: any[]): ConditionParameters<Extra> {
        return {
            list: args,
            params: async () => args
        }
    }

    public hashValues(...args: any[]): Promise<string> {
        return super.hashValues(...this.params(...args).list)
    }

    public hashValuesPlain(...args: any[]): Promise<string> {
        return super.hashValues(...args)
    }

    public abstract paramsFromDDO(
        ctx: Ctx,
        ...args: ConditionInstanceSmall[]
    ): Promise<ConditionParameters<Extra>>

    public async instanceFromDDO(
        agreementId: string,
        ctx: Ctx,
        ...args: ConditionInstanceSmall[]
    ): Promise<ConditionInstance<Extra>> {
        return this.instance(agreementId, await this.paramsFromDDO(ctx, ...args))
    }

    public async fulfillInstance(
        cond: ConditionInstance<Extra>,
        additionalParams: Extra,
        from?: Account,
        params?: TxParameters
    ) {
        return this.sendFrom(
            'fulfill',
            [zeroX(cond.agreementId), ...(await cond.params(additionalParams))],
            from,
            params
        )
    }

    public async instance(
        agreementId: string,
        params: ConditionParameters<Extra>
    ): Promise<ConditionInstance<Extra>> {
        const valueHash = await this.hashValuesPlain(...params.list)
        return {
            seed: valueHash,
            agreementId,
            id: await this.call<string>('generateId', [zeroX(agreementId), valueHash]),
            list: params.list,
            params: params.params
        }
    }
}
