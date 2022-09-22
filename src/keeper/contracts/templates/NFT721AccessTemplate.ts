import { ServiceAgreementTemplate } from '../../../ddo/ServiceAgreementTemplate'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { Account, DDO, Nft721 } from '../../../sdk'
import { AgreementInstance, AgreementTemplate } from './AgreementTemplate.abstract'
import { BaseTemplate } from './BaseTemplate.abstract'
import { nft721AccessTemplateServiceAgreementTemplate } from './NFT721AccessTemplate.serviceAgreementTemplate'
import { ServiceType, ValidationParams } from '../../../ddo/Service'
import { NFT721HolderCondition, NFTAccessCondition } from '../conditions'

export interface NFT721AccessTemplateParams {
    holderAddress: string
    grantee: string
}

export class NFT721AccessTemplate extends BaseTemplate<NFT721AccessTemplateParams> {
    public async paramsGen({
        consumer_address
    }: ValidationParams): Promise<NFT721AccessTemplateParams> {
        return this.params(consumer_address)
    }
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
    public name(): string {
        return 'nft721AccessAgreement'
    }
    public description(): string {
        return 'Access Agreement with NFT-721 token'
    }

    public service(): ServiceType {
        return 'nft-access'
    }
    public serviceEndpoint(): ServiceType {
        return 'nft-access'
    }

    public params(holderAddress: string): NFT721AccessTemplateParams {
        return { holderAddress, grantee: holderAddress }
    }

    public conditions(): [NFT721HolderCondition, NFTAccessCondition] {
        const { nft721HolderCondition, nftAccessCondition } =
            this.nevermined.keeper.conditions
        return [nft721HolderCondition, nftAccessCondition]
    }

    public async instanceFromDDO(
        agreementIdSeed: string,
        ddo: DDO,
        creator: string,
        parameters: NFT721AccessTemplateParams
    ): Promise<AgreementInstance<NFT721AccessTemplateParams>> {
        const { nft721HolderCondition, nftAccessCondition } =
            this.nevermined.keeper.conditions

        const agreementId = await this.agreementId(agreementIdSeed, creator)
        const ctx = {
            ...this.standardContext(ddo, creator),
            ...parameters
        }

        const holderConditionInstance = await nft721HolderCondition.instanceFromDDO(
            agreementId,
            ctx
        )
        const accessConditionInstance = await nftAccessCondition.instanceFromDDO(
            agreementId,
            ctx
        )

        return {
            instances: [holderConditionInstance, accessConditionInstance],
            list: parameters,
            agreementId
        }
    }

    public async getServiceAgreementTemplate(): Promise<ServiceAgreementTemplate> {
        return nft721AccessTemplateServiceAgreementTemplate
    }

    public async accept(params: ValidationParams): Promise<boolean> {
        if (
            await this.nevermined.keeper.conditions.nftAccessCondition.checkPermissions(
                params.consumer_address,
                params.did
            )
        ) {
            return true
        }
        const ddo = await this.nevermined.assets.resolve(params.did)
        const service = ddo.findServiceByType(this.service())
        const contractAddress =
            this.nevermined.keeper.conditions.nft721HolderCondition.nftContractFromService(
                service
            )
        const nftContract = await Nft721.getInstance(
            (this.nevermined.keeper as any).instanceConfig, // eslint-disable-line
            contractAddress
        )
        if (params.agreement_id !== '0x') {
            const deal = await this.getAgreementStatus(params.agreement_id)
            if (deal) {
                return (
                    await nftContract.balanceOf(new Account(params.consumer_address))
                ).gt(0)
            }
        }
        return (await nftContract.ownerOf(params.did)) == params.consumer_address
    }
}
