import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import { DDO } from '../../../sdk'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nft721AccessTemplateServiceAgreementTemplate } from './NFT721AccessTemplate.serviceAgreementTemplate'
import { findServiceConditionByName, zeroX } from '../../../utils'
import Account from '../../../nevermined/Account'

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
        holderAddress: string,
        from?: Account
    ): Promise<boolean> {
        const [
            nftHolderConditionId,
            nftAccessConditionId
        ] = await this.getAgreementIdsFromDDO(
            agreementId,
            ddo,
            assetRewards,
            holderAddress
        )
        return !!(await this.createAgreement(
            agreementId,
            ddo.shortId(),
            [nftHolderConditionId, nftAccessConditionId],
            [0, 0],
            [0, 0],
            holderAddress,
            from
        ))
    }

    public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        holderAddress: string
    ): Promise<string[]> {
        const {
            nft721HolderCondition,
            nftAccessCondition
        } = this.nevermined.keeper.conditions

        const accessService = ddo.findServiceByType('nft721-access')
        if (!accessService) throw 'Service nft721-access not found!'

        const holder = findServiceConditionByName(accessService, 'nftHolder')
        if (!holder) throw new Error('Holder condition not found!')

        const nftHolderConditionId = await nft721HolderCondition.generateId(
            agreementId,
            await nft721HolderCondition.hashValues(
                zeroX(ddo.shortId()),
                holderAddress,
                holder.parameters.find(p => p.name === '_contractAddress').value as string
            )
        )
        const nftAccessConditionId = await nftAccessCondition.generateId(
            agreementId,
            await nftAccessCondition.hashValues(ddo.shortId(), holderAddress)
        )

        return [nftHolderConditionId, nftAccessConditionId]
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nft721AccessTemplateServiceAgreementTemplate
    }
}
