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
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<ConditionStoreManager> {
        const templateStoreManeger: ConditionStoreManager = new ConditionStoreManager(
            'ConditionStoreManager'
        )
        await templateStoreManeger.init(config)
        return templateStoreManeger
    }

    public async createCondition(
        id: string,
        typeRef: string,
        from?: Account,
        params?: TxParameters
    ) {
        return this.send(
            'createCondition',
            from && from.getId(),
            [zeroX(id), zeroX(typeRef)],
            params
        )
    }

    public async delegateCreateRole(
        delegatee: string,
        owner: string,
        params?: TxParameters
    ) {
        return this.send('delegateCreateRole', zeroX(owner), [zeroX(delegatee)], params)
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
            state: +a.state,
            timeLock: +a.timeLock,
            timeOut: +a.timeOut,
            blockNumber: +a.blockNumber,
            lastUpdatedBy: a.lastUpdatedBy,
            blockNumberUpdated: +a.blockNumberUpdated
        } as ConditionData
    }
}
