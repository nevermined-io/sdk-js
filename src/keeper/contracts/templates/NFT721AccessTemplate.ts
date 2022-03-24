import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import { DDO } from '../../../sdk'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nft721AccessTemplateServiceAgreementTemplate } from './NFT721AccessTemplate.serviceAgreementTemplate'
import { findServiceConditionByName, zeroX } from '../../../utils'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'

export class NFT721AccessTemplate extends BaseTemplate {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFT721AccessTemplate> {
        return AgreementTemplate.getInstance(
            config,
            'NFT721AccessTemplate',
            NFT721AccessTemplate,
            true
        )
    }

    public async createAgreementFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        holderAddress: Account,
        from?: Account,
        params?: TxParameters
    ): Promise<string> {
        const creator = from.getId()
        const [
            nftHolderConditionId,
            nftAccessConditionId
        ] = await this.getAgreementIdsFromDDO(
            agreementIdSeed,
            ddo,
            assetRewards,
            holderAddress.getId(),
            creator
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
        return await this.nevermined.keeper.agreementStoreManager.agreementId(agreementIdSeed, creator)
    }

    public async getAgreementIdsFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        holderAddress: string,
        creator: string
    ): Promise<any> {
        const {
            nft721HolderCondition,
            nftAccessCondition
        } = this.nevermined.keeper.conditions

        const accessService = ddo.findServiceByType('nft721-access')
        if (!accessService) throw 'Service nft721-access not found!'

        const holder = findServiceConditionByName(accessService, 'nftHolder')
        if (!holder) throw new Error('Holder condition not found!')

        const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(agreementIdSeed, creator)

        const nftHolderConditionId = await nft721HolderCondition.generateId2(
            agreementId,
            await nft721HolderCondition.hashValues(
                zeroX(ddo.shortId()),
                holderAddress,
                holder.parameters.find(p => p.name === '_contractAddress').value as string
            )
        )
        const nftAccessConditionId = await nftAccessCondition.generateId2(
            agreementId,
            await nftAccessCondition.hashValues(ddo.shortId(), holderAddress)
        )

        return [nftHolderConditionId, nftAccessConditionId]
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nft721AccessTemplateServiceAgreementTemplate
    }
}
