import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO } from '../../../sdk'
import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nftAccessTemplateServiceAgreementTemplate } from './NFTAccessTemplate.serviceAgreementTemplate'
import { ServiceType } from '../../../ddo/Service'

export interface NFTAccessTemplateParams {
    holderAddress: string
    amount: number
    grantee: string
}

export class NFTAccessTemplate extends BaseTemplate<NFTAccessTemplateParams> {
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

    public params(holderAddress: string, amount: number): NFTAccessTemplateParams {
        return { holderAddress, amount, grantee: holderAddress }
    }

    public async instanceFromDDO(agreementIdSeed: string, ddo: DDO, creator: string, parameters: NFTAccessTemplateParams): Promise<AgreementInstance<NFTAccessTemplateParams>> {
        const {
            nftHolderCondition,
            nftAccessCondition
        } = this.nevermined.keeper.conditions

        const agreementId = await this.agreementId(agreementIdSeed, creator)
        const ctx = {
            ...this.standardContext(ddo),
            ...parameters,
        }

        const holderConditionInstance = await nftHolderCondition.instanceFromDDO(agreementId, ctx)
        const accessConditionInstance = await nftAccessCondition.instanceFromDDO(agreementId, ctx)

        return {
            instances: [holderConditionInstance, accessConditionInstance],
            list: parameters,
            agreementId,
        }
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nftAccessTemplateServiceAgreementTemplate
    }
}
