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
    conditionIdSeeds: string[]
}

export class AgreementStoreManager extends ContractBase {
    templates: any

    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AgreementStoreManager> {
        const templateStoreManeger: AgreementStoreManager = new AgreementStoreManager(
            'AgreementStoreManager'
        )
        await templateStoreManeger.init(config)
        return templateStoreManeger
    }

    public setTemplates(temp: any) {
        this.templates = temp
    }

    public getOwner(): Promise<string> {
        return this.call('owner', [])
    }

    public async getAgreement(agreementId: string) {
        const templateId: string = await this.call('getAgreementTemplate', [
            zeroX(agreementId)
        ])
        console.log("template", templateId, agreementId)
        const events = await this.templates[templateId].getAgreementCreatedEvent(
            agreementId
        )
        const {
            _did,
            _didOwner,
            _conditionIds,
            _conditionIdSeeds
        } = events[0].returnValues
        return {
            did: _did,
            agreementId,
            didOwner: _didOwner,
            templateId,
            conditionIdSeeds: _conditionIdSeeds,
            conditionIds: _conditionIds
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

    public async agreementId(agreementIdSeed: string, creator: string): Promise<string> {
        return await this.call('agreementId', [zeroX(agreementIdSeed), creator])
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
