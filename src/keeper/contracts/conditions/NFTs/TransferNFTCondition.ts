import { InstantiableConfig } from '../../../../Instantiable.abstract'
import { didZeroX, findServiceConditionByName, zeroX } from '../../../../utils'
import { Condition, ConditionContext, ConditionParameters } from '../Condition.abstract'
import Account from '../../../../nevermined/Account'
import { TxParameters } from '../../ContractBase'

export interface TransferNFTConditionContext extends ConditionContext {
    providerId: string
    consumerId: string
    nftAmount: number
}

/**
 * Condition allowing to transfer an NFT between the original owner and a receiver
 */
export class TransferNFTCondition extends Condition<TransferNFTConditionContext> {
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<TransferNFTCondition> {
        return Condition.getInstance(config, 'TransferNFTCondition', TransferNFTCondition)
    }

    /**
     * Generates the hash of condition inputs.
     * @param {String} did The DID of the asset with NFTs.
     * @param {String} nftHolder The address of the holder of the NFT.
     * @param {String} nftReceiver The address of the granted user or the DID provider.
     * @param {Number} nftAmount Amount of NFTs to transfer.
     * @param {String} lockCondition Lock condition identifier.
     * @param {String} nftContractAddress The address of the NFT token to use.
     * @param {String} willBeTransferred Indicates if the asset will be transferred or minted
     * @returns Hash of all the values
     */

    public params(
        did: string,
        nftHolder: string,
        nftReceiver: string,
        nftAmount: number,
        lockCondition: string,
        nftContractAddress?: string,
        willBeTransferred: boolean = true
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
            params: async (method) => {
                if (method === 'fulfill') {
                    return [
                        didZeroX(did),
                        zeroX(nftReceiver),
                        String(1),
                        lockCondition,
                        zeroX(
                            nftContractAddress || this.nevermined.keeper.nftUpgradeable.address
                        ),
                        willBeTransferred
                    ]
                } else if (method === 'fulfillForDelegate') {
                    return [
                        didZeroX(did),
                        zeroX(nftHolder),
                        zeroX(nftReceiver),
                        String(1),
                        lockCondition,
                        willBeTransferred
                    ]
                }
            }
        }
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
            this.nevermined.keeper.nftUpgradeable.address,
            true
        )
    }

    /**
     * Fulfill the transfer NFT condition.
     *  Only DID owner or DID provider can call this method.
     *
     * @param {String} agreementId The agreement identifier.
     * @param {String} did The DID of the asset with NFTs.
     * @param {String} nftReceiver The address of the account to receive the NFT.
     * @param {Number[]} nftAmount amount of NFTs to transfer.
     * @param {String} lockPaymentCondition lock payment condition identifier.
     * @param {String} from
     * @returns Condition state.
     */
    public fulfill(
        agreementId: string,
        did: string,
        nftReceiver: string,
        nftAmount: number,
        lockPaymentCondition: string,
        from?: Account,
        txParams?: TxParameters
    ) {
        return super.fulfillPlain(
            agreementId,
            [didZeroX(did), zeroX(nftReceiver), String(nftAmount), lockPaymentCondition],
            from,
            txParams
        )
    }

    /**
     * Fulfill the transfer NFT condition.
     *  Only DID owner or DID provider can call this method.
     *
     * @param {String} agreementId The agreement identifier.
     * @param {String} did The DID of the asset with NFTs.
     * @param {String} nftHolder The address of the account currently holding the NFT.
     * @param {String} nftReceiver The address of the account to receive the NFT.
     * @param {Number[]} nftAmount amount of NFTs to transfer.
     * @param {String} lockPaymentCondition lock payment condition identifier.
     * @param {String} from
     * @returns Condition state.
     */
    public fulfillForDelegate(
        agreementId: string,
        did: string,
        nftHolder: string,
        nftReceiver: string,
        nftAmount: number,
        lockPaymentCondition: string,
        transferAsset: boolean = true,
        from?: Account,
        params?: TxParameters
    ) {
        return super.fulfillPlain(
            agreementId,
            [
                didZeroX(did),
                zeroX(nftHolder),
                zeroX(nftReceiver),
                String(nftAmount),
                lockPaymentCondition,
                transferAsset
            ],
            from,
            params,
            'fulfillForDelegate'
        )
    }
}
