import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import { DDO } from '../../../sdk'
import { AgreementInstance, AgreementParameters, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nftSalesTemplateServiceAgreementTemplate } from './NFTSalesTemplate.serviceAgreementTemplate'
import Account from '../../../nevermined/Account'
import {
    findServiceConditionByName,
    getAssetRewardsFromService,
    OrderProgressStep,
    ZeroAddress
} from '../../../utils'
import { TxParameters } from '../ContractBase'
import { Service, ServiceType } from '../../../ddo/Service'

export class NFTSalesTemplate extends BaseTemplate {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFTSalesTemplate> {
        return AgreementTemplate.getInstance(config, 'NFTSalesTemplate', NFTSalesTemplate)
    }

    public service(): ServiceType {
        return 'nft-sales'
    }

    public params(consumer: string, provider: string, nftAmount: number): AgreementParameters {
        return {
            list: [consumer, provider, nftAmount]
        }
    }

    public async instanceFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        creator: string,
        parameters: AgreementParameters
    ): Promise<AgreementInstance> {
        let consumer: string
        let provider: string
        let nftAmount: number
        [consumer, provider, nftAmount] = parameters.list as any

        const {
            transferNftCondition,
            lockPaymentCondition,
            escrowPaymentCondition
        } = this.nevermined.keeper.conditions

        const accessService = ddo.findServiceByType(this.service())
        const assetRewards = getAssetRewardsFromService(accessService)
        const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(
            agreementIdSeed,
            creator
        )

        const lockPaymentConditionInstance = await lockPaymentCondition.instance(
            agreementId,
            await lockPaymentCondition.paramsFromDDO(ddo, accessService, assetRewards)
        )
        const transferConditionInstance = await transferNftCondition.instance(
            agreementId,
            await transferNftCondition.paramsFromDDO(ddo, accessService, assetRewards, provider, consumer, nftAmount, lockPaymentConditionInstance)
        )
        const escrowPaymentConditionInstance = await escrowPaymentCondition.instance(
            agreementId,
            await escrowPaymentCondition.paramsFromDDO(ddo, accessService, assetRewards, consumer, transferConditionInstance, lockPaymentConditionInstance)
        )

        return {
            instances: [lockPaymentConditionInstance, transferConditionInstance, escrowPaymentConditionInstance],
            list: parameters.list,
            agreementId,
        }
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nftSalesTemplateServiceAgreementTemplate
    }
}
