import ContractBase, { TxParameters } from '../ContractBase'
import { ConditionState } from '../conditions'
import { zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'

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
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<ConditionStoreManager> {
        const templateStoreManeger: ConditionStoreManager = new ConditionStoreManager(
            'ConditionStoreManager'
        )
        await templateStoreManeger.init(config)
        return templateStoreManeger
    }

    public async createCondition(id: string, typeRef: string, from?: Account, params?: TxParameters) {
        return this.send('createCondition', from && from.getId(), [
            zeroX(id),
            zeroX(typeRef)
        ], params)
    }

    public async delegateCreateRole(delegatee: string, owner: string, params?: TxParameters) {
        return this.send('delegateCreateRole', zeroX(owner), [zeroX(delegatee)], params)
    }

    public async getCreateRole() {
        return this.call('getCreateRole', [])
    }

    public async getOwner(): Promise<string> {
        return this.call('owner', [])
    }

    public async getCondition(conditionId: string) {
        const {
            typeRef,
            state,
            timeLock,
            timeOut,
            blockNumber,
            lastUpdatedBy,
            blockNumberUpdated
        } = await this.call('getCondition', [zeroX(conditionId)])
        return {
            typeRef,
            state: +state,
            timeLock: +timeLock,
            timeOut: +timeOut,
            blockNumber: +blockNumber,
            lastUpdatedBy,
            blockNumberUpdated: +blockNumberUpdated
        } as ConditionData
    }
}
