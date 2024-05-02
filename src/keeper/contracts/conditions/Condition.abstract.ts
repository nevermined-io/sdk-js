import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO } from '../../../ddo/DDO'
import { ContractBase } from '../../../keeper/contracts/ContractBase'
import { AssetPrice } from '../../../models/AssetPrice'
import { NvmAccount } from '../../../models/NvmAccount'
import { TxParameters } from '../../../models/Transactions'
import { ConditionInstanceSmall, ConditionMethod } from '../../../types/ContractTypes'
import { Service } from '../../../types/DDOTypes'
import { zeroX } from '../../../utils/ConversionTypeHelpers'

export interface ConditionContext {
  ddo: DDO
  service: Service
  price: AssetPrice
  creator: string
}

export interface ConditionParameters<Extra> {
  list: any[]
  params: (method: ConditionMethod, arg: Extra) => Promise<any[] | undefined> // for fullfill
}

export interface ConditionInstance<Extra> extends ConditionInstanceSmall {
  params: (method: ConditionMethod, arg: Extra) => Promise<any[] | undefined> // for fullfill
}

export abstract class ConditionSmall extends ContractBase {
  // public static async getInstance<Ctx extends ConditionContext, Extra>(
  public static async getInstance(
    config: InstantiableConfig,
    conditionName: string,
    conditionsClass: any,
    optional = false,
  ): Promise<ConditionSmall & any> {
    const condition: ConditionSmall = new (conditionsClass as any)(conditionName)
    await condition.init(config, optional)
    return condition
  }

  public async hashValues(...args: any[]): Promise<string> {
    //console.log(`HashingValues: ${JSON.stringify(args, jsonReplacer)}`)
    return (await this.call('hashValues', args)) as string
  }

  public abstract fulfill(agreementId: string, ...args: any[])

  public fulfillPlain(
    agreementId: string,
    args: any[],
    from: NvmAccount,
    txParams?: TxParameters,
    method: ConditionMethod = 'fulfill',
  ) {
    return this.sendFrom(method, [zeroX(agreementId), ...args], from, txParams)
  }

  public async generateIdHash(agreementId: string, ...values: any[]) {
    return this.generateId(agreementId, await this.hashValues(...values))
  }

  public generateId(agreementId: string, valueHash: string): Promise<`0x${string}`> {
    return this.call('generateId', [zeroX(agreementId), valueHash])
  }

  public async generateIdWithSeed(
    agreementId: string,
    valueHash: string,
  ): Promise<[string, string]> {
    return [valueHash, await this.call('generateId', [zeroX(agreementId), valueHash])] as [
      string,
      string,
    ]
  }

  public abortByTimeOut(conditionId: string, from: NvmAccount, params?: TxParameters) {
    return this.sendFrom('abortByTimeOut', [zeroX(conditionId)], from, params)
  }

  public getConditionFulfilledEvent(agreementId: string) {
    return this.events?.getEventData({
      eventName: 'Fulfilled',
      filterJsonRpc: { agreementId: zeroX(agreementId) },
      filterSubgraph: { where: { _agreementId: zeroX(agreementId) } },
      result: {
        _agreementId: true,
        _documentId: true,
        _grantee: true,
        _conditionId: true,
      },
    })
  }
}

export abstract class Condition<
  Ctx extends ConditionContext,
  Extra = Record<string, unknown>,
> extends ConditionSmall {
  public static async getInstance<Ctx extends ConditionContext, Extra>(
    config: InstantiableConfig,
    conditionName: string,
    conditionsClass: any,
    optional = false,
  ): Promise<Condition<Ctx, Extra> & any> {
    const condition: Condition<Ctx, Extra> = new (conditionsClass as any)(conditionName)
    await condition.init(config, optional)
    return condition
  }

  public params(...args: any[]): ConditionParameters<Extra> {
    return {
      list: args,
      params: async () => args,
    }
  }

  public hashValues(...args: any[]): Promise<string> {
    // console.log(`-- ARGS: `, ...args)
    // console.log(`-- PARAMS LIST: `, ...this.params(...args).list)
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
    from: NvmAccount,
    txParams?: TxParameters,
    method: ConditionMethod = 'fulfill',
  ) {
    await cond.params(method, additionalParams)

    return this.sendFrom(
      method,
      [zeroX(cond.agreementId), ...((await cond.params(method, additionalParams)) ?? [])],
      from,
      txParams,
    )
  }

  public abstract fulfillWithNode(
    cond: ConditionInstance<Extra>,
    additionalParams: Extra,
    from: NvmAccount,
    txParams?: TxParameters,
  )

  public async instance(
    agreementId: string,
    params: ConditionParameters<Extra>,
  ): Promise<ConditionInstance<Extra>> {
    const valueHash = await this.hashValuesPlain(...params.list)
    return {
      condition: this.contractName,
      seed: valueHash,
      agreementId,
      id: (await this.call('generateId', [zeroX(agreementId), valueHash])) as string,
      list: params.list,
      params: params.params,
    }
  }
}

export abstract class ProviderCondition<
  Ctx extends ConditionContext,
  Extra = Record<string, unknown>,
> extends Condition<Ctx, Extra> {
  public async fulfillWithNode(
    cond: ConditionInstance<Extra>,
    additionalParams: Extra,
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    return this.sendFrom(
      this.nodeMethod(),
      [
        zeroX(cond.agreementId),
        ...((await cond.params(this.nodeMethod(), additionalParams)) ?? []),
      ],
      from,
      txParams,
    )
  }

  public nodeMethod(): ConditionMethod {
    return 'fulfill'
  }
}

export abstract class ConsumerCondition<
  Ctx extends ConditionContext,
  Extra = Record<string, unknown>,
> extends Condition<Ctx, Extra> {
  public async fulfillWithNode(
    _cond: ConditionInstance<Extra>,
    _additionalParams: Extra,
    _from: NvmAccount,
    _txParams?: TxParameters,
  ) {
    return
  }
}
