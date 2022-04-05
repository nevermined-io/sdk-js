import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import { DDO } from '../../../sdk'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nft721SalesTemplateServiceAgreementTemplate } from './NFT721SalesTemplate.serviceAgreementTemplate'
import {
    findServiceConditionByName,
    zeroX,
    OrderProgressStep,
    ZeroAddress
} from '../../../utils'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'

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
        agreementIdSeed: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        returnAddress: string,
        consumerAddress: Account,
        from?: Account,
        txParams?: TxParameters
    ): Promise<string> {
        const { ids, agreementId } = await this.getAgreementIdsFromDDO(
            agreementIdSeed,
            ddo,
            assetRewards,
            returnAddress,
            consumerAddress.getId(),
            from.getId()
        )

        await this.createAgreement(
            agreementIdSeed,
            ddo.shortId(),
            ids.map(a => a[0]),
            [0, 0, 0],
            [0, 0, 0],
            consumerAddress.getId(),
            from,
            txParams
        )
        return agreementId
    }

    public async createAgreementWithPaymentFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        returnAddress: string,
        consumerAddress: Account,
        from?: Account,
        txParams?: TxParameters,
        observer?: (OrderProgressStep) => void
    ): Promise<string> {
        observer = observer ? observer : _ => {}
        const {
            ids,
            agreementId,
            rewardAddress,
            tokenAddress,
            amounts,
            receivers
        } = await this.getAgreementIdsFromDDO(
            agreementIdSeed,
            ddo,
            assetRewards,
            returnAddress,
            consumerAddress.getId(),
            from.getId()
        )

        observer(OrderProgressStep.ApprovingPayment)
        await this.lockTokens(tokenAddress, amounts, from, txParams)
        observer(OrderProgressStep.ApprovedPayment)

        const totalAmount = amounts.reduce((a, b) => a + b, 0)
        const value =
            tokenAddress && tokenAddress.toLowerCase() === ZeroAddress
                ? String(totalAmount)
                : undefined

        observer(OrderProgressStep.CreatingAgreement)
        await this.createAgreementAndPay(
            agreementIdSeed,
            ddo.shortId(),
            ids.map(a => a[0]),
            [0, 0, 0],
            [0, 0, 0],
            consumerAddress.getId(),
            0,
            rewardAddress,
            tokenAddress,
            amounts,
            receivers,
            from,
            { ...txParams, value }
        )
        observer(OrderProgressStep.AgreementInitialized)
        return agreementId
    }

    public async getAgreementIdsFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        returnAddress: string,
        consumer: string,
        creator: string
    ): Promise<any> {
        const {
            lockPaymentCondition,
            transferNft721Condition,
            escrowPaymentCondition
        } = this.nevermined.keeper.conditions

        const salesService = ddo.findServiceByType('nft721-sales')

        if (!salesService) throw 'Service nft721-sales not found!'

        const payment = findServiceConditionByName(salesService, 'lockPayment')
        if (!payment) throw new Error('Payment condition not found!')

        const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(
            agreementIdSeed,
            creator
        )

        const lockPaymentConditionId = await lockPaymentCondition.generateIdWithSeed(
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

        const transferNftConditionId = await transferNft721Condition.generateIdWithSeed(
            agreementId,
            await transferNft721Condition.hashValues(
                ddo.shortId(),
                nftOwner,
                consumer,
                lockPaymentConditionId[1],
                transfer.parameters.find(p => p.name === '_contract').value as string
            )
        )

        const escrow = findServiceConditionByName(salesService, 'escrowPayment')
        if (!escrow) throw new Error('Escrow condition not found!')

        const escrowPaymentConditionId = await escrowPaymentCondition.generateIdWithSeed(
            agreementId,
            await escrowPaymentCondition.hashValues(
                zeroX(ddo.shortId()),
                assetRewards.getAmounts(),
                assetRewards.getReceivers(),
                returnAddress,
                escrowPaymentCondition.getAddress(),
                escrow.parameters.find(p => p.name === '_tokenAddress').value as string,
                lockPaymentConditionId[1],
                transferNftConditionId[1]
            )
        )

        return {
            agreementId,
            ids: [
                lockPaymentConditionId,
                transferNftConditionId,
                escrowPaymentConditionId
            ],
            rewardAddress: escrowPaymentCondition.getAddress(),
            tokenAddress: payment.parameters.find(p => p.name === '_tokenAddress')
                .value as string,
            amounts: assetRewards.getAmounts(),
            receivers: assetRewards.getReceivers()
        }
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nft721SalesTemplateServiceAgreementTemplate
    }
}
