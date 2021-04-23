import ContractBase from '../ContractBase'
import { didZeroX, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'

export interface AgreementData {
    did: string
    didOwner: string
    templateId: string
    conditionIds: string[]
    lastUpdatedBy: string
    blockNumberUpdated: number
}

export class AgreementStoreManager extends ContractBase {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AgreementStoreManager> {
        const templateStoreManeger: AgreementStoreManager = new AgreementStoreManager(
            'AgreementStoreManager'
        )
        await templateStoreManeger.init(config)
        return templateStoreManeger
    }

    public getOwner(): Promise<string> {
        return this.call('owner', [])
    }

    public async getAgreement(agreementId: string) {
        const {
            did,
            didOwner,
            templateId,
            conditionIds,
            lastUpdatedBy,
            blockNumberUpdated
        } = await this.call('getAgreement', [zeroX(agreementId)])
        return {
            did,
            didOwner,
            templateId,
            conditionIds,
            lastUpdatedBy,
            blockNumberUpdated: +blockNumberUpdated
        } as AgreementData
    }

    public async createAgreement(
        agreementId: string,
        did: string,
        conditionTypes: string[],
        conditionIds: string[],
        timeLocks: number[],
        timeOuts: number[],
        from?: string
    ) {
        return this.send('createAgreement', from, [
            zeroX(agreementId),
            didZeroX(did),
            conditionTypes.map(zeroX),
            conditionIds,
            timeLocks,
            timeOuts
        ])
    }
}
