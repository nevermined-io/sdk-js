import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO } from '../../../sdk'
import { AgreementInstance, AgreementParameters, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nftAccessTemplateServiceAgreementTemplate } from './NFTAccessTemplate.serviceAgreementTemplate'
import { ServiceType } from '../../../ddo/Service'
import { getAssetRewardsFromService } from '../../../utils'

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

    public service(): ServiceType {
        return 'nft-access'
    }

    public params(holderAddress: string, amount: number): AgreementParameters {
        return {
            list: [holderAddress, amount]
        }
    }

    public async instanceFromDDO(agreementIdSeed: string, ddo: DDO, creator: string, parameters: AgreementParameters): Promise<AgreementInstance> {
        let holderAddress: string
        let amount: number
        [holderAddress, amount] = parameters.list as any

        const {
            nftHolderCondition,
            nftAccessCondition
        } = this.nevermined.keeper.conditions

        const accessService = ddo.findServiceByType(this.service())
        const assetRewards = getAssetRewardsFromService(accessService)
        const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(
            agreementIdSeed,
            creator
        )

        const holderConditionInstance = await nftHolderCondition.instance(
            agreementId,
            await nftHolderCondition.paramsFromDDO(ddo, accessService, assetRewards, holderAddress, amount)
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
        return nftAccessTemplateServiceAgreementTemplate
    }
}
