import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import { DDO } from '../../../sdk'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nftSalesTemplateServiceAgreementTemplate } from './NFTSalesTemplate.serviceAgreementTemplate'
import Account from '../../../nevermined/Account'
import {
    findServiceConditionByName,
    OrderProgressStep,
    ZeroAddress
} from '../../../utils'
import { TxParameters } from '../ContractBase'
import { Service } from '../../../ddo/Service'

export class NFTSalesTemplate extends BaseTemplate {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFTSalesTemplate> {
        return AgreementTemplate.getInstance(config, 'NFTSalesTemplate', NFTSalesTemplate)
    }

    public async createAgreementFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        returnAddress: string,
        consumer: Account,
        nftAmount?: number,
        provider?: Account,
        from?: Account,
        timeOuts?: number[],
        txParams?: TxParameters,
        nftSalesService?: Service
    ): Promise<string> {
        const { ids, agreementId } = await this.getAgreementIdsFromDDO(
            agreementIdSeed,
            ddo,
            assetRewards,
            returnAddress,
            consumer.getId(),
            from.getId(),
            nftAmount,
            provider === undefined ? undefined : provider.getId()
        )
        await this.createAgreement(
            agreementIdSeed,
            ddo.shortId(),
            ids.map(a => a[0]),
            [0, 0, 0],
            timeOuts ? timeOuts : [0, 0, 0],
            consumer.getId(),
            from,
            txParams
        )
        return await this.nevermined.keeper.agreementStoreManager.agreementId(
            agreementIdSeed,
            from.getId()
        )
    }

    public async createAgreementWithPaymentFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        returnAddress: string,
        consumerAddress: Account,
        nftAmount?: number,
        provider?: Account,
        from?: Account,
        timeOuts?: number[],
        txParams?: TxParameters,
        observer?: (OrderProgressStep) => void
    ): Promise<string> {
        observer = observer ? observer : _ => {}
        const {
            ids,
            rewardAddress,
            tokenAddress,
            amounts,
            agreementId,
            receivers
        } = await this.getAgreementIdsFromDDO(
            agreementIdSeed,
            ddo,
            assetRewards,
            returnAddress,
            consumerAddress.getId(),
            from.getId(),
            nftAmount,
            provider === undefined ? undefined : provider.getId()
        )

        observer(OrderProgressStep.ApprovingPayment)
        await this.lockTokens(tokenAddress, amounts, from, txParams)
        observer(OrderProgressStep.ApprovedPayment)

        const totalAmount = AssetRewards.sumAmounts(amounts)
        const value =
            tokenAddress && tokenAddress.toLowerCase() === ZeroAddress
                ? totalAmount.toFixed()
                : undefined

        observer(OrderProgressStep.CreatingAgreement)
        await this.createAgreementAndPay(
            agreementIdSeed,
            ddo.shortId(),
            ids.map(a => a[0]),
            [0, 0, 0],
            timeOuts ? timeOuts : [0, 0, 0],
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
        creator: string,
        nftAmount?: number,
        provider?: string,
        nftSalesService?: Service
    ): Promise<any> {
        const {
            lockPaymentCondition,
            transferNftCondition,
            escrowPaymentCondition
        } = this.nevermined.keeper.conditions

        const salesService = nftSalesService || ddo.findServiceByType('nft-sales')
        const agreementId = await this.nevermined.keeper.agreementStoreManager.agreementId(
            agreementIdSeed,
            creator
        )

        const payment = findServiceConditionByName(salesService, 'lockPayment')
        if (!payment) throw new Error('Payment Condition not found!')

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

        const nftHolder =
            provider ||
            (transfer.parameters.find(p => p.name === '_nftHolder').value as string)

        const transferNftConditionId = await transferNftCondition.generateIdWithSeed(
            agreementId,
            await transferNftCondition.hashValues2(
                ddo.shortId(),
                nftHolder,
                consumer,
                nftAmount,
                lockPaymentConditionId[1],
                this.nevermined.keeper.nftUpgradeable.address
            )
        )

        const escrow = findServiceConditionByName(salesService, 'escrowPayment')
        if (!escrow) throw new Error('Escrow Condition not found!')

        const escrowPaymentConditionId = await escrowPaymentCondition.generateIdWithSeed(
            agreementId,
            await escrowPaymentCondition.hashValues(
                ddo.shortId(),
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
            ids: [
                lockPaymentConditionId,
                transferNftConditionId,
                escrowPaymentConditionId
            ],
            agreementId,
            rewardAddress: escrowPaymentCondition.getAddress(),
            tokenAddress: payment.parameters.find(p => p.name === '_tokenAddress')
                .value as string,
            amounts: assetRewards.getAmounts(),
            receivers: assetRewards.getReceivers()
        }
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nftSalesTemplateServiceAgreementTemplate
    }
}
