import { InstantiableConfig } from '@/Instantiable.abstract'
import { DDO } from '@/ddo/DDO'
import { NvmAccount } from '@/models/NvmAccount'
import { TxParameters } from '@/models/Transactions'
import { ConditionMethod } from '@/types/ContractTypes'
import { ServiceCommon } from '@/types/DDOTypes'
import { didZeroX, zeroX } from '@/utils/ConversionTypeHelpers'
import {
  ConditionContext,
  ProviderCondition,
  Condition,
  ConditionParameters,
} from '../Condition.abstract'

export interface TransferNFTConditionContext extends ConditionContext {
  providerId: string
  consumerId: string
  nftAmount: bigint
  duration: number
  expiration: number
}

/**
 * Condition allowing to transfer an NFT between the original owner and a receiver
 */
export class TransferNFTCondition extends ProviderCondition<TransferNFTConditionContext> {
  public static readonly NO_EXPIRY = 0

  public static async getInstance(config: InstantiableConfig): Promise<TransferNFTCondition> {
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
    nftAmount: bigint,
    lockCondition: string,
    nftContractAddress?: string,
    willBeTransferred = true,
    expiration = 0,
  ): ConditionParameters<Record<string, unknown>> {
    nftAmount = BigInt(nftAmount)
    const list: any[] = [
      didZeroX(did),
      zeroX(nftHolder),
      zeroX(nftReceiver),
      nftAmount,
      lockCondition,
    ]
    if (nftContractAddress) {
      list.push(zeroX(nftContractAddress || this.nevermined.keeper.nftUpgradeable.address))
      list.push(willBeTransferred)
    }

    return {
      list,
      params: async (method) => {
        if (method === 'fulfillForDelegate') {
          return [
            didZeroX(did),
            zeroX(nftHolder),
            zeroX(nftReceiver),
            nftAmount,
            lockCondition,
            zeroX(nftContractAddress || this.nevermined.keeper.nftUpgradeable.address),
            willBeTransferred,
            expiration,
          ]
        } else if (method === 'fulfill') {
          return [
            didZeroX(did),
            zeroX(nftReceiver),
            nftAmount,
            lockCondition,
            zeroX(nftContractAddress || this.nevermined.keeper.nftUpgradeable.address),
            willBeTransferred,
            expiration,
          ]
        }
      },
    }
  }

  public nftContractFromService(service: ServiceCommon): string {
    const holder = DDO.findServiceConditionByName(service, 'transferNFT')
    if (!holder) throw new Error('TransferNFT condition not found!')
    const res = holder.parameters.find((p) => p.name === '_contractAddress')?.value as string
    return res || this.nevermined.keeper.nftUpgradeable.address
  }

  public async paramsFromDDO(
    { ddo, service, providerId, consumerId, nftAmount, expiration }: TransferNFTConditionContext,
    lockCondition,
  ) {
    const transfer = DDO.findServiceConditionByName(service, 'transferNFT')
    if (!transfer) throw new Error('TransferNFT condition not found!')

    const nftHolder =
      providerId || (transfer.parameters.find((p) => p.name === '_nftHolder').value as string)

    const nftTransferString = transfer.parameters.find((p) => p.name === '_nftTransfer')
      .value as string
    const params = this.params(
      ddo.shortId(),
      nftHolder,
      consumerId,
      nftAmount,
      lockCondition.id,
      this.nftContractFromService(service),
      nftTransferString.toLowerCase() === 'true',
      expiration,
    )

    return params
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
   * @param willBeTransferred - Indicates if the asset will be transferred or minted
   * @param from -
   * @returns Condition state.
   */
  public fulfill(
    agreementId: string,
    did: string,
    nftReceiver: string,
    nftAmount: bigint,
    nftContractAddress: string,
    lockPaymentCondition: string,
    from: NvmAccount,
    willBeTransferred = true,
    expiration = 0,
    txParams?: TxParameters,
  ) {
    return super.fulfillPlain(
      agreementId,
      [
        didZeroX(did),
        zeroX(nftReceiver),
        nftAmount,
        lockPaymentCondition,
        zeroX(nftContractAddress),
        willBeTransferred,
        expiration,
      ],
      from,
      txParams,
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
   * @param willBeTransferred - Indicates if the asset will be transferred or minted
   * @param expiration - Block in which the token expires. If zero means no expiration
   * @param from - Account sending the transaction
   * @param txParams - Transaction parameters
   * @returns Condition state.
   */
  public fulfillForDelegate(
    agreementId: string,
    did: string,
    nftHolder: string,
    nftReceiver: string,
    nftAmount: bigint,
    lockPaymentCondition: string,
    nftAddress: string,
    willBeTransferred = true,
    expiration = 0n,
    from: NvmAccount,
    txParams?: TxParameters,
  ) {
    const args = [
      didZeroX(did),
      zeroX(nftHolder),
      zeroX(nftReceiver),
      nftAmount,
      lockPaymentCondition,
      zeroX(nftAddress),
      willBeTransferred,
      expiration,
    ]
    return super.fulfillPlain(agreementId, args, from, txParams, 'fulfillForDelegate')
  }

  public nodeMethod(): ConditionMethod {
    return 'fulfillForDelegate'
  }
}
