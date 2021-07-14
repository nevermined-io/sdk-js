import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import { DDO } from '../../../sdk'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nft721AccessTemplateServiceAgreementTemplate } from './NFT721AccessTemplate.serviceAgreementTemplate'

export class NFT721AccessTemplate extends BaseTemplate {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFT721AccessTemplate> {
        return AgreementTemplate.getInstance(
            config,
            'NFT721AccessTemplate',
            NFT721AccessTemplate
        )
    }

    public async createAgreementFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        holder: string,
        tokenAddress: string,
        from?: string,
        nftAmount?: number
    ): Promise<boolean> {
        const [
            nftHolderConditionId,
            nftAccessConditionId
        ] = await this.getAgreementIdsFromDDO(
            agreementId,
            ddo,
            assetRewards,
            holder,
            tokenAddress,
            from,
            nftAmount
        )
        return !!(await this.createAgreement(
            agreementId,
            ddo.shortId(),
            [nftHolderConditionId, nftAccessConditionId],
            [0, 0],
            [0, 0],
            from
        ))
    }

    public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        holder: string,
        tokenAddress: string,
        from?: string,
        nftAmount?: number
    ): Promise<string[]> {
        const {
            nft721HolderCondition,
            nftAccessCondition
        } = this.nevermined.keeper.conditions

        const nftHolderConditionId = await nft721HolderCondition.generateId(
            agreementId,
            await nft721HolderCondition.hashValues(
                ddo.shortId(),
                holder,
                nftAmount,
                tokenAddress
            )
        )
        const nftAccessConditionId = await nftAccessCondition.generateId(
            agreementId,
            await nftAccessCondition.hashValues(ddo.shortId(), holder)
        )

        return [nftHolderConditionId, nftAccessConditionId]
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nft721AccessTemplateServiceAgreementTemplate
    }
}
