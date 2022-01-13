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
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        holderAddress: Account,
        nftAmount?: number,
        from?: Account,
        params?: TxParameters
    ): Promise<boolean> {
        const [
            nftHolderConditionId,
            nftAccessConditionId
        ] = await this.getAgreementIdsFromDDO(
            agreementId,
            ddo,
            assetRewards,
            holderAddress.getId(),
            nftAmount
        )

        return !!(await this.createAgreement(
            agreementId,
            ddo.shortId(),
            [nftHolderConditionId, nftAccessConditionId],
            [0, 0],
            [0, 0],
            holderAddress.getId(),
            from,
            params
        ))
    }

    public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        holder: string,
        nftAmount?: number
    ): Promise<string[]> {
        const {
            nftHolderCondition,
            nftAccessCondition
        } = this.nevermined.keeper.conditions

        const nftHolderConditionId = await nftHolderCondition.generateId(
            agreementId,
            await nftHolderCondition.hashValues(ddo.shortId(), holder, nftAmount)
        )

        const nftAccessConditionId = await nftAccessCondition.generateId(
            agreementId,
            await nftAccessCondition.hashValues(ddo.shortId(), holder)
        )

        return [nftHolderConditionId, nftAccessConditionId]
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nftAccessTemplateServiceAgreementTemplate
    }
}
