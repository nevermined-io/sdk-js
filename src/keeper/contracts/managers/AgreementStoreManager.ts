import ContractBase, { TxParameters } from '../ContractBase'
import { didZeroX, zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'

export interface AgreementData {
    did: string
    agreementId: string
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
            'AgreementStoreManager',
            config.web3,
            config.logger
        )
        await templateStoreManeger.init()
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
            agreementId,
            didOwner,
            templateId,
            conditionIds,
            lastUpdatedBy,
            blockNumberUpdated: +blockNumberUpdated
        } as AgreementData
    }

    public async getAgreements(did: string): Promise<AgreementData[]> {
        const agreementIds: string[] = await this.call('getAgreementIdsForDID', [
            didZeroX(did)
        ])

        return Promise.all(
            agreementIds.map(agreementId => this.getAgreement(agreementId))
        )
    }

    public async createAgreement(
        agreementId: string,
        did: string,
        conditionTypes: string[],
        conditionIds: string[],
        timeLocks: number[],
        timeOuts: number[],
        from?: Account,
        params?: TxParameters
    ) {
        return this.send(
            'createAgreement',
            from && from.getId(),
            [
                zeroX(agreementId),
                didZeroX(did),
                conditionTypes.map(zeroX),
                conditionIds,
                timeLocks,
                timeOuts
            ],
            params
        )
    }
}
