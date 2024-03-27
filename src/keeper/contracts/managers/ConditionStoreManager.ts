import { ContractBase } from '@/keeper/contracts'
import { zeroX } from '@/utils'
import { InstantiableConfig } from '@/Instantiable.abstract'
import { NvmAccount } from '@/models/NvmAccount'
import { TxParameters } from '@/models/Transactions'
import { ConditionState } from '@/types/ContractTypes'

export interface ConditionData {
  typeRef: string
  state: ConditionState
  timeLock: number
  timeOut: number
  blockNumber: number
  lastUpdatedBy: string
  blockNumberUpdated: number
}

export class ConditionStoreManager extends ContractBase {
  public static async getInstance(config: InstantiableConfig): Promise<ConditionStoreManager> {
    const templateStoreManeger: ConditionStoreManager = new ConditionStoreManager(
      'ConditionStoreManager',
    )
    await templateStoreManeger.init(config)
    return templateStoreManeger
  }

  public async createCondition(
    id: string,
    typeRef: string,
    from?: NvmAccount,
    txParams?: TxParameters,
  ) {
    return this.send('createCondition', from && from.getId(), [zeroX(id), zeroX(typeRef)], txParams)
  }

  public async delegateCreateRole(delegatee: string, owner: string, txParams?: TxParameters) {
    return this.send('delegateCreateRole', zeroX(owner), [zeroX(delegatee)], txParams)
  }

  public async getCreateRole() {
    return this.call('getCreateRole', [])
  }

  public async isConditionTimeLocked(id: string) {
    return this.call('isConditionTimeLocked', [id])
  }

  public async isConditionTimedOut(id: string) {
    return this.call('isConditionTimedOut', [id])
  }

  public async getOwner(): Promise<string> {
    return this.call('owner', [])
  }

  public async getCondition(conditionId: string) {
    const a: any = await this.call('getCondition', [zeroX(conditionId)])
    return {
      typeRef: a.typeRef,
      state: Number(a.state),
      timeLock: Number(a.timeLock),
      timeOut: Number(a.timeOut),
      blockNumber: Number(a.blockNumber),
      lastUpdatedBy: a.lastUpdatedBy,
      blockNumberUpdated: Number(a.blockNumberUpdated),
    } as ConditionData
  }
}
