import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO } from '../../../sdk'
import { AgreementInstance, AgreementParameters, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nft721AccessTemplateServiceAgreementTemplate } from './NFT721AccessTemplate.serviceAgreementTemplate'
import { getAssetRewardsFromService } from '../../../utils'
import { ServiceType } from '../../../ddo/Service'

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

    public service(): ServiceType {
        return 'nft721-access'
    }

    public params(holderAddress: string): AgreementParameters {
        return {
            list: [holderAddress]
        }
    }

    public async instanceFromDDO(agreementIdSeed: string, ddo: DDO, creator: string, parameters: AgreementParameters): Promise<AgreementInstance> {
        let holderAddress: string
        [holderAddress] = parameters.list as any

        const {
            nft721HolderCondition,
            nftAccessCondition
        } = this.nevermined.keeper.conditions

        const accessService = ddo.findServiceByType(this.service())
        const assetRewards = getAssetRewardsFromService(accessService)
        const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(
            agreementIdSeed,
            creator
        )

        const holderConditionInstance = await nft721HolderCondition.instance(
            agreementId,
            await nft721HolderCondition.paramsFromDDO(ddo, accessService, assetRewards, holderAddress)
        )
        const accessConditionInstance = await nftAccessCondition.instance(
            agreementId,
            await nftAccessCondition.paramsFromDDO(ddo, accessService, assetRewards, holderAddress)
        )

        return {
            instances: [holderConditionInstance, accessConditionInstance],
            list: parameters.list,
            agreementId,
        }
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nft721AccessTemplateServiceAgreementTemplate
    }
}
