import { InstantiableConfig } from '@/Instantiable.abstract'
import { NvmAccount } from '@/models/NvmAccount'
import { TxParameters } from '@/models/Transactions'
import { ConditionState } from '@/types/ContractTypes'
import { zeroX } from '@/utils/ConversionTypeHelpers'
import { ContractBase } from '@/keeper/contracts/ContractBase'

export interface ConditionData {
  typeRef: string
  state: ConditionState
  timeLock: number
  timeOut: number
  blockNumber: number
  lastUpdatedBy?: string
  blockNumberUpdated?: number
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
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    return this.send('createCondition', from, [zeroX(id), zeroX(typeRef)], txParams)
  }

  public async delegateCreateRole(delegatee: string, owner: NvmAccount, txParams?: TxParameters) {
    return this.send('delegateCreateRole', owner, [zeroX(delegatee)], txParams)
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
      typeRef: a[0], //a.typeRef,
      state: Number(a[1]), //Number(a.state),
      timeLock: Number(a[2]), //Number(a.timeLock),
      timeOut: Number(a[3]), //Number(a.timeOut),
      blockNumber: Number(a[4]), //Number(a.blockNumber),
      // lastUpdatedBy: a[5], //a.lastUpdatedBy,
      // blockNumberUpdated: Number(a[6]) //Number(a.blockNumberUpdated),
    } as ConditionData
  }
}
