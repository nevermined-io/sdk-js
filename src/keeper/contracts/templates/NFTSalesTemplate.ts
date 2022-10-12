import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { DDO } from '../../../sdk'
import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nftSalesTemplateServiceAgreementTemplate } from './NFTSalesTemplate.serviceAgreementTemplate'
import { ServiceNFTSales, ServiceType, ValidationParams } from '../../../ddo/Service'
import {
    EscrowPaymentCondition,
    LockPaymentCondition,
    TransferNFTCondition
} from '../conditions'
import BigNumber from '../../../utils/BigNumber'

export interface NFTSalesTemplateParams {
    consumerId: string
    providerId: string
    nftAmount: BigNumber
}

export class NFTSalesTemplate extends BaseTemplate<
    NFTSalesTemplateParams,
    ServiceNFTSales
> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFTSalesTemplate> {
        return AgreementTemplate.getInstance(config, 'NFTSalesTemplate', NFTSalesTemplate)
    }

    public service(): ServiceType {
        return 'nft-sales'
    }

    public name(): string {
        return 'nft1155SalesAgreement'
    }
    public description(): string {
        return 'Sales Agreement with NFT-1155 token'
    }

    public params(
        consumerId: string,
        nftAmount: BigNumber,
        providerId?: string
    ): NFTSalesTemplateParams {
        return { consumerId, providerId, nftAmount }
    }

    public async paramsGen({
        consumer_address,
        nft_amount
    }: ValidationParams): Promise<NFTSalesTemplateParams> {
        return this.params(consumer_address, nft_amount)
    }

    public lockConditionIndex(): number {
        return 0
    }

    public conditions(): [
        LockPaymentCondition,
        TransferNFTCondition,
        EscrowPaymentCondition
    ] {
        const { lockPaymentCondition, transferNftCondition, escrowPaymentCondition } =
            this.nevermined.keeper.conditions
        return [lockPaymentCondition, transferNftCondition, escrowPaymentCondition]
    }

    public async instanceFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        creator: string,
        parameters: NFTSalesTemplateParams
    ): Promise<AgreementInstance<NFTSalesTemplateParams>> {
        const { transferNftCondition, lockPaymentCondition, escrowPaymentCondition } =
            this.nevermined.keeper.conditions

        const agreementId = await this.agreementId(agreementIdSeed, creator)
        const ctx = {
            ...this.standardContext(ddo, creator),
            ...parameters
        }

        const lockPaymentConditionInstance = await lockPaymentCondition.instanceFromDDO(
            agreementId,
            ctx
        )
        const transferConditionInstance = await transferNftCondition.instanceFromDDO(
            agreementId,
            ctx,
            lockPaymentConditionInstance
        )
        const escrowPaymentConditionInstance =
            await escrowPaymentCondition.instanceFromDDO(
                agreementId,
                ctx,
                transferConditionInstance,
                lockPaymentConditionInstance
            )

        return {
            instances: [
                lockPaymentConditionInstance,
                transferConditionInstance,
                escrowPaymentConditionInstance
            ],
            list: parameters,
            agreementId
        }
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nftSalesTemplateServiceAgreementTemplate
    }
}
