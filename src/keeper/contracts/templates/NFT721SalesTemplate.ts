import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import { DDO } from '../../../sdk'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nft721SalesTemplateServiceAgreementTemplate } from './NFT721SalesTemplate.serviceAgreementTemplate'
import { findServiceConditionByName } from '../../../utils'
import Account from '../../../nevermined/Account'

export class NFT721SalesTemplate extends BaseTemplate {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFT721SalesTemplate> {
        return AgreementTemplate.getInstance(
            config,
            'NFT721SalesTemplate',
            NFT721SalesTemplate,
            true
        )
    }

    public async createAgreementFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumerAddress: Account,
        from?: Account
    ): Promise<boolean> {
        const [
            lockPaymentConditionId,
            transferNftConditionId,
            escrowPaymentConditionId
        ] = await this.getAgreementIdsFromDDO(
            agreementId,
            ddo,
            assetRewards,
            consumerAddress.getId()
        )

        return !!(await this.createAgreement(
            agreementId,
            ddo.shortId(),
            [lockPaymentConditionId, transferNftConditionId, escrowPaymentConditionId],
            [0, 0, 0],
            [0, 0, 0],
            consumerAddress.getId(),
            from
        ))
    }

    public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: string
    ): Promise<string[]> {
        const {
            lockPaymentCondition,
            transferNft721Condition,
            escrowPaymentCondition
        } = this.nevermined.keeper.conditions

        const salesService = ddo.findServiceByType('nft721-sales')

        if (!salesService) throw 'Service nft721-sales not found!'

        const payment = findServiceConditionByName(salesService, 'lockPayment')
        if (!payment) throw new Error('Payment condition not found!')

        const lockPaymentConditionId = await lockPaymentCondition.generateId(
            agreementId,
            await lockPaymentCondition.hashValues(
                ddo.shortId(),
                escrowPaymentCondition.getAddress(),
                payment.parameters.find(p => p.name === '_tokenAddress').value as string,
                assetRewards.getAmounts(),
                assetRewards.getReceivers()
            )
        )

        const transfer = findServiceConditionByName(salesService, 'transferNFT')
        if (!transfer) throw new Error('TransferNFT condition not found!')

        const nft = await this.nevermined.contracts.loadNft721(
            transfer.parameters.find(p => p.name === '_contract').value as string
        )

        const nftOwner = await nft.ownerOf(ddo.id)

        const transferNftConditionId = await transferNft721Condition.generateId(
            agreementId,
            await transferNft721Condition.hashValues(
                ddo.shortId(),
                nftOwner,
                consumer,
                lockPaymentConditionId,
                transfer.parameters.find(p => p.name === '_contract').value as string
            )
        )

        const escrow = findServiceConditionByName(salesService, 'escrowPayment')
        if (!escrow) throw new Error('Escrow condition not found!')

        const escrowPaymentConditionId = await escrowPaymentCondition.generateId(
            agreementId,
            await escrowPaymentCondition.hashValues(
                ddo.shortId(),
                assetRewards.getAmounts(),
                assetRewards.getReceivers(),
                escrowPaymentCondition.getAddress(),
                escrow.parameters.find(p => p.name === '_tokenAddress').value as string,
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
