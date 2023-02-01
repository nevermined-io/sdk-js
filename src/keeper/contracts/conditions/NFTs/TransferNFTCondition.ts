import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { didZeroX, findServiceConditionByName, zeroX } from '../../../../utils'
import {
    Condition,
    ConditionContext,
    ConditionMethod,
    ConditionParameters,
    ProviderCondition
} from '../Condition.abstract'
import { Account } from '../../../../nevermined'
import { TxParameters } from '../../ContractBase'
import { BigNumber } from '../../../../utils'
import { ServiceCommon } from '../../../..'

export interface TransferNFTConditionContext extends ConditionContext {
    providerId: string
    consumerId: string
    nftAmount: BigNumber
}

/**
 * Condition allowing to transfer an NFT between the original owner and a receiver
 */
export class TransferNFTCondition extends ProviderCondition<TransferNFTConditionContext> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<TransferNFTCondition> {
        return Condition.getInstance(config, 'TransferNFTCondition', TransferNFTCondition)
    }

    /**
     * Generates the hash of condition inputs.
     * @param did - The DID of the asset with NFTs.
     * @param nftHolder - The address of the holder of the NFT.
     * @param nftReceiver - The address of the granted user or the DID provider.
     * @param nftAmount - Amount of NFTs to transfer.
     * @param lockCondition - Lock condition identifier.
     * @param nftContractAddress - The address of the NFT token to use.
     * @param willBeTransferred - Indicates if the asset will be transferred or minted
     * @returns Hash of all the values
     */

    public params(
        did: string,
        nftHolder: string,
        nftReceiver: string,
        nftAmount: BigNumber,
        lockCondition: string,
        nftContractAddress?: string,
        willBeTransferred = true
    ): ConditionParameters<Record<string, unknown>> {
        return {
            list: [
                didZeroX(did),
                zeroX(nftHolder),
                zeroX(nftReceiver),
                String(nftAmount),
                lockCondition,
                zeroX(
                    nftContractAddress || this.nevermined.keeper.nftUpgradeable.address
                ),
                willBeTransferred
            ],
            params: async method => {
                if (method === 'fulfillForDelegate') {
                    return [
                        didZeroX(did),
                        zeroX(nftHolder),
                        zeroX(nftReceiver),
                        String(nftAmount),
                        lockCondition,
                        zeroX(
                            nftContractAddress || this.nevermined.keeper.nftUpgradeable.address
                        ),
                        willBeTransferred
                    ]
                } else if (method === 'fulfill') {
                    return [
                        didZeroX(did),
                        zeroX(nftReceiver),
                        String(nftAmount),
                        lockCondition,
                        zeroX(
                            nftContractAddress ||
                                this.nevermined.keeper.nftUpgradeable.address
                        ),
                        willBeTransferred
                    ]
                }
            }
        }
    }

    public nftContractFromService(service: ServiceCommon): string {
        const holder = findServiceConditionByName(service, 'transferNFT')
        if (!holder) throw new Error('TransferNFT condition not found!')
        const res = holder.parameters.find(p => p.name === '_contractAddress')?.value as string
        return res || this.nevermined.keeper.nftUpgradeable.address
    }

    public async paramsFromDDO(
        { ddo, service, providerId, consumerId, nftAmount }: TransferNFTConditionContext,
        lockCondition
    ) {
        const transfer = findServiceConditionByName(service, 'transferNFT')
        if (!transfer) throw new Error('TransferNFT condition not found!')
        const nftHolder =
            providerId ||
            (transfer.parameters.find(p => p.name === '_nftHolder').value as string)
        return this.params(
            ddo.shortId(),
            nftHolder,
            consumerId,
            nftAmount,
            lockCondition.id,
            this.nftContractFromService(service),
            true
        )
    }

    /**
     * Fulfill the transfer NFT condition.
     *
     * @remarks
     * Only DID owner or DID provider can call this method.
     *
     * @param agreementId - The agreement identifier.
     * @param did - The DID of the asset with NFTs.
     * @param nftReceiver - The address of the account to receive the NFT.
     * @param nftAmount - amount of NFTs to transfer.
     * @param nftContractAddress - Address of the nft contract
     * @param lockPaymentCondition - lock payment condition identifier.
     * @param from -
     * @returns Condition state.
     */
    public fulfill(
        agreementId: string,
        did: string,
        nftReceiver: string,
        nftAmount: BigNumber,
        nftContractAddress: string,
        lockPaymentCondition: string,
        transfer  = true,
        from?: Account,
        txParams?: TxParameters
    ) {
        return super.fulfillPlain(
            agreementId,
            [didZeroX(did), zeroX(nftReceiver), String(nftAmount), lockPaymentCondition, zeroX(nftContractAddress), transfer],
            from,
            txParams
        )
    }

    /**
     * Fulfill the transfer NFT condition.
     *
     * @remarks
     * Only DID owner or DID provider can call this method.
     *
     * @param agreementId - The agreement identifier.
     * @param did - The DID of the asset with NFTs.
     * @param nftHolder - The address of the account currently holding the NFT.
     * @param nftReceiver - The address of the account to receive the NFT.
     * @param nftAmount - The amount of NFTs to transfer.
     * @param lockPaymentCondition - The lock payment condition identifier.
     * @param from - Account sending the transaction
     * @param txParams - Transaction parameters
     * @returns Condition state.
     */
    public fulfillForDelegate(
        agreementId: string,
        did: string,
        nftHolder: string,
        nftReceiver: string,
        nftAmount: BigNumber,
        lockPaymentCondition: string,
        nftAddress: string,
        transferAsset = true,
        from?: Account,
        txParams?: TxParameters
    ) {
        return super.fulfillPlain(
            agreementId,
            [
                didZeroX(did),
                zeroX(nftHolder),
                zeroX(nftReceiver),
                String(nftAmount),
                lockPaymentCondition,
                zeroX(nftAddress),
                transferAsset
            ],
            from,
            txParams,
            'fulfillForDelegate'
        )
    }

    public nodeMethod(): ConditionMethod {
        return 'fulfillForDelegate'
    }
}
