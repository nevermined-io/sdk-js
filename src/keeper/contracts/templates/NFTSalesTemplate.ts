import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import AssetRewards from '../../../models/AssetRewards'
import { DDO } from '../../../sdk'
import { AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nftSalesTemplateServiceAgreementTemplate } from './NFTSalesTemplate.serviceAgreementTemplate'
import Account from '../../../nevermined/Account'
import { findServiceConditionByName, NFTOrderProgressStep, ZeroAddress } from '../../../utils'
import { TxParameters } from '../ContractBase'
import { Service } from '../../../ddo/Service'

export class NFTSalesTemplate extends BaseTemplate {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<NFTSalesTemplate> {
        return AgreementTemplate.getInstance(config, 'NFTSalesTemplate', NFTSalesTemplate)
    }

    public async createAgreementFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: Account,
        nftAmount?: number,
        provider?: Account,
        from?: Account,
        timeOuts?: number[],
        txParams?: TxParameters,
        nftSalesService?: Service
    ): Promise<boolean> {
        const { ids } = await this.getAgreementIdsFromDDO(
            agreementId,
            ddo,
            assetRewards,
            consumer.getId(),
            nftAmount,
            provider === undefined ? undefined : provider.getId()
        )
        return !!(await this.createAgreement(
            agreementId,
            ddo.shortId(),
            ids,
            [0, 0, 0],
            timeOuts ? timeOuts : [0, 0, 0],
            consumer.getId(),
            from,
            txParams
        ))
    }

    public async createAgreementWithPaymentFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumerAddress: Account,
        nftAmount?: number,
        provider?: Account,
        from?: Account,
        timeOuts?: number[],
        txParams?: TxParameters,
        observer?: (NFTOrderProgressStep) => void
    ): Promise<boolean> {
        observer = observer ? observer : _ => {}
        const {
            ids,
            rewardAddress,
            tokenAddress,
            amounts,
            receivers
        } = await this.getAgreementIdsFromDDO(
            agreementId,
            ddo,
            assetRewards,
            consumerAddress.getId(),
            nftAmount,
            provider === undefined ? undefined : provider.getId()
        )

        observer(NFTOrderProgressStep.ApprovingPayment)
        await this.lockTokens(tokenAddress, amounts, from, txParams)
        observer(NFTOrderProgressStep.ApprovedPayment)

        const totalAmount = amounts.reduce((a, b) => a + b, 0)
        const value = tokenAddress && tokenAddress.toLowerCase() === ZeroAddress ? String(totalAmount) : undefined

        observer(NFTOrderProgressStep.CreatingAgreement)
        const res = !!(await this.createAgreementAndPay(
            agreementId,
            ddo.shortId(),
            ids,
            [0, 0, 0],
            timeOuts ? timeOuts : [0, 0, 0],
            consumerAddress.getId(),
            0,
            rewardAddress,
            tokenAddress,
            amounts,
            receivers,
            from,
            {...txParams, value}
        ))
        observer(NFTOrderProgressStep.AgreementInitialized)

        return res
    }

    public async getAgreementIdsFromDDO(
        agreementId: string,
        ddo: DDO,
        assetRewards: AssetRewards,
        consumer: string,
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

        const payment = findServiceConditionByName(salesService, 'lockPayment')
        if (!payment) throw new Error('Payment Condition not found!')

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

        const nftHolder =
            provider ||
            (transfer.parameters.find(p => p.name === '_nftHolder').value as string)

        const transferNftConditionId = await transferNftCondition.generateId(
            agreementId,
            await transferNftCondition.hashValues2(
                ddo.shortId(),
                nftHolder,
                consumer,
                nftAmount,
                lockPaymentConditionId,
                this.nevermined.keeper.nftUpgradeable.address
            )
        )

        const escrow = findServiceConditionByName(salesService, 'escrowPayment')
        if (!escrow) throw new Error('Escrow Condition not found!')

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

        return {
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
        return nftSalesTemplateServiceAgreementTemplate
    }
}
