import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import { DDO } from '../../../sdk'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nft721SalesTemplateServiceAgreementTemplate } from './NFT721SalesTemplate.serviceAgreementTemplate'
import { zeroX } from '../../../utils'

export class NFT721SalesTemplate extends BaseTemplate {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFT721SalesTemplate> {
        return AgreementTemplate.getInstance(
            config,
            'NFT721SalesTemplate',
            NFT721SalesTemplate
        )
    }

    public async createAgreementFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: string,
        erc20TokenAddress: string,
        nftAmount: number = 1,
        from?: string
    ): Promise<boolean> {
        const [
            lockPaymentConditionId,
            transferNftConditionId,
            escrowPaymentConditionId
        ] = await this.getAgreementIdsFromDDO(
            agreementId,
            ddo,
            assetRewards,
            consumer,
            erc20TokenAddress,
            nftAmount
        )
        return !!(await this.createAgreement(
            agreementId,
            ddo.shortId(),
            [lockPaymentConditionId, transferNftConditionId, escrowPaymentConditionId],
            [0, 0, 0],
            [0, 0, 0],
            consumer,
            from
        ))
    }

    public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: string,
        erc20TokenAddress?: string,
        nftAmount: number = 1
    ): Promise<string[]> {
        const {
            lockPaymentCondition,
            transferNft721Condition,
            escrowPaymentCondition
        } = this.nevermined.keeper.conditions

        const salesService = ddo.findServiceByType('nft721-sales')

        if (!salesService) throw 'Service nft721-sales not found!'

        const lockPaymentConditionId = await lockPaymentCondition.generateId(
            agreementId,
            await lockPaymentCondition.hashValues(
                ddo.shortId(),
                escrowPaymentCondition.getAddress(),
                erc20TokenAddress,
                assetRewards.getAmounts(),
                assetRewards.getReceivers()
            )
        )

        const transferNftConditionId = await transferNft721Condition.generateId(
            agreementId,
            await transferNft721Condition.hashValues(
                zeroX(ddo.shortId()),
                consumer,
                nftAmount,
                lockPaymentConditionId,
                salesService.attributes.main.nftTokenAddress
            )
        )
        const escrowPaymentConditionId = await escrowPaymentCondition.generateId(
            agreementId,
            await escrowPaymentCondition.hashValues(
                ddo.shortId(),
                assetRewards.getAmounts(),
                assetRewards.getReceivers(),
                escrowPaymentCondition.getAddress(),
                erc20TokenAddress,
                lockPaymentConditionId,
                transferNftConditionId
            )
        )

        return [lockPaymentConditionId, transferNftConditionId, escrowPaymentConditionId]
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nft721SalesTemplateServiceAgreementTemplate
    }
}
