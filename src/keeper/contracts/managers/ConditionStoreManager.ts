import ContractBase, { TxParameters } from '../ContractBase'
import { ConditionState } from '../conditions'
import { zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { Account } from '../../../nevermined'

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
    const templateStoreManager: ConditionStoreManager = new ConditionStoreManager(
      'ConditionStoreManager',
    )
    await templateStoreManager.init(config)
    return templateStoreManager
  }

  public createCondition(id: string, typeRef: string, from?: Account, txParams?: TxParameters) {
    return this.send('createCondition', from && from.getId(), [zeroX(id), zeroX(typeRef)], txParams)
  }

  public delegateCreateRole(delegatee: string, owner: string, txParams?: TxParameters) {
    return this.send('delegateCreateRole', zeroX(owner), [zeroX(delegatee)], txParams)
  }

  public getCreateRole() {
    return this.call('getCreateRole', [])
  }

  public isConditionTimeLocked(id: string) {
    return this.call('isConditionTimeLocked', [id])
  }

  public isConditionTimedOut(id: string) {
    return this.call('isConditionTimedOut', [id])
  }

  public getOwner(): Promise<string> {
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
