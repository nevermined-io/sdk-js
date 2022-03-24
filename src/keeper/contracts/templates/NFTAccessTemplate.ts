import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import { DDO } from '../../../sdk'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nftAccessTemplateServiceAgreementTemplate } from './NFTAccessTemplate.serviceAgreementTemplate'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'

export class NFTAccessTemplate extends BaseTemplate {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFTAccessTemplate> {
        return AgreementTemplate.getInstance(
            config,
            'NFTAccessTemplate',
            NFTAccessTemplate
        )
    }

    public async createAgreementFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        holderAddress: Account,
        nftAmount?: number,
        from?: Account,
        params?: TxParameters
    ): Promise<string> {
        const [
            nftHolderConditionId,
            nftAccessConditionId
        ] = await this.getAgreementIdsFromDDO(
            agreementIdSeed,
            ddo,
            assetRewards,
            holderAddress.getId(),
            from.getId(),
            nftAmount
        )

        await this.createAgreement(
            agreementIdSeed,
            ddo.shortId(),
            [nftHolderConditionId[0], nftAccessConditionId[0]],
            [0, 0],
            [0, 0],
            holderAddress.getId(),
            from,
            params
        )

        const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(agreementIdSeed, from.getId())
        return agreementId
    }

    public async getAgreementIdsFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        holder: string,
        creator: string,
        nftAmount?: number
    ): Promise<any> {
        const {
            nftHolderCondition,
            nftAccessCondition
        } = this.nevermined.keeper.conditions
        const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(agreementIdSeed, creator)

        const nftHolderConditionId = await nftHolderCondition.generateId2(
            agreementId,
            await nftHolderCondition.hashValues(ddo.shortId(), holder, nftAmount)
        )

        const nftAccessConditionId = await nftAccessCondition.generateId2(
            agreementId,
            await nftAccessCondition.hashValues(ddo.shortId(), holder)
        )

        return [nftHolderConditionId, nftAccessConditionId]
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nftAccessTemplateServiceAgreementTemplate
    }
}
