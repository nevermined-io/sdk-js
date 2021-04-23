import ContractBase from '../ContractBase'
import { ConditionState } from '../conditions/Condition.abstract'
import { zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

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

    public async createCondition(id: string, typeRef: string, from?: string) {
        return this.send('createCondition', zeroX(from), [zeroX(id), zeroX(typeRef)])
    }

    public async delegateCreateRole(delegatee: string, owner: string) {
        return this.send('delegateCreateRole', zeroX(owner), [zeroX(delegatee)])
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
