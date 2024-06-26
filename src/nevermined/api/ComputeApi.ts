import { InstantiableConfig } from '../../Instantiable.abstract'
import { DDO } from '../../ddo/DDO'
import { AssetAttributes } from '../../models/AssetAttributes'
import { NvmAccount } from '../../models/NvmAccount'
import { TxParameters } from '../../models/Transactions'
import { MetaData } from '../../types/DDOTypes'
import {
  AssetPublicationOptions,
  PublishMetadataOptions,
  PublishOnChainOptions,
} from '../../types/MetadataTypes'
import { SubscribablePromise } from '../../utils/SubscribablePromise'
import { CreateProgressStep, OrderProgressStep, UpdateProgressStep } from '../ProgressSteps'
import { RegistryBaseApi } from './RegistryBaseApi'

/**
 * Nevermined Compute API. It allows the registration execution of compute jobs on top
 * of data registered in a Nevermined digital ecosystem.
 *
 * You can find more information about the Nevermined compute solution here:
 * {@link https://docs.nevermined.io/docs/getting-started/remote-computation}
 */
export class ComputeApi extends RegistryBaseApi {
  /**
   * Creates a new ComputeApi
   * @param config - Configuration of the Nevermined instance
   * @returns {@link ComputeApi}
   */
  constructor(config: InstantiableConfig) {
    super()
    this.servicePlugin = ComputeApi.getServicePlugin(config)
    this.setInstanceConfig(config)
  }

  /**
   * Registers a new asset in Nevermined.
   * You can find more information about how different data is stored in Nevermined here:
   * {@link https://docs.nevermined.io/docs/architecture/nevermined-data}
   *
   * @param assetAttributes - Attributes describing the asset
   * @param publicationOptions - Allows to specify the publication options of the off-chain and the on-chain data. @see {@link PublishOnChainOptions} and {@link PublishMetadataOptions}
   * @param publisherAccount - The account publishing the asset
   * @param txParams - Optional transaction parameters
   * @returns The metadata of the asset created (DDO)
   *
   * @returns {@link DDO}
   */
  public create(
    assetAttributes: AssetAttributes,
    publisherAccount: NvmAccount,
    publicationOptions: AssetPublicationOptions = {
      metadata: PublishMetadataOptions.OnlyMetadataAPI,
      did: PublishOnChainOptions.DIDRegistry,
    },
    txParams?: TxParameters,
  ): SubscribablePromise<CreateProgressStep, DDO> {
    const computeService = assetAttributes.services?.find((service) => {
      service.serviceType = 'compute'
    })
    if (!computeService) {
      assetAttributes.services = [...assetAttributes.services!, { serviceType: 'compute' }]
    }
    return this.registerNeverminedAsset(
      assetAttributes,
      publisherAccount,
      publicationOptions,
      undefined,
      txParams,
    )
  }

  /**
   * Given a DID, updates the metadata associated to the asset. It also can upload this metadata to a remote decentralized stored depending on the `publishMetadata` parameter.
   *
   * @example
   * ```ts
   * const ddoUpdated = await nevermined.compute.update(
   *      ddo.shortId(),
   *      updatedMetadata,
   *      publisher,
   *      PublishMetadata.IPFS
   * )
   * ```
   *
   * @param did - Decentralized ID representing the unique id of an asset in a Nevermined network.
   * @param metadata - Metadata describing the asset
   * @param from - Account of the user updating the metadata
   * @param publishMetadata - It allows to specify where to store the metadata
   * @param txParams - Optional transaction parameters
   * @returns {@link DDO} The DDO updated
   */
  public update(
    did: string,
    metadata: MetaData,
    from: NvmAccount,
    publishMetadata: PublishMetadataOptions = PublishMetadataOptions.OnlyMetadataAPI,
    txParams?: TxParameters,
  ): SubscribablePromise<UpdateProgressStep, DDO> {
    return this.updateAsset(did, metadata, from, publishMetadata, txParams)
  }

  /**
   * Start the purchase/order of a compute service. Starts by signing the service agreement
   * then sends the request to the publisher via the service endpoint (Node http service).
   * @param did - Unique identifier of the asset to order
   * @param from - The account of the user ordering the asset
   * @param txParams - Optional transaction parameters
   * @returns The agreement ID identifying the order
   */
  public order(
    did: string,
    from: NvmAccount,
    txParams?: TxParameters,
  ): SubscribablePromise<OrderProgressStep, string> {
    return this.orderAsset(did, 'compute', from, txParams)
  }

  /**
   * It triggers the execution of a compute job
   * @param agreementId - The unique identifier of the order placed for a service
   * @param workflowDid - The unique identifier of the Asset representing the workflow
   * @param from - The account of the user triggering the computation
   * @returns If the execution is correct it returns the response given by the Nevermined Node
   */
  public async execute(
    agreementId: string,
    workflowDid: string,
    from: NvmAccount,
  ): Promise<string> {
    const { node } = this.nevermined.services

    return (await node.execute(agreementId, workflowDid, from)).workflowId
  }

  /**
   * It returns the logs resulted by the execution of a Job
   * @param agreementId - The unique identifier of the order placed for a service
   * @param executionId - The unique identifier of the job executed
   * @param from - The account of the user triggering the computation
   * @returns The logs resulted of the execution of the job
   */
  public async logs(agreementId: string, executionId: string, from: NvmAccount) {
    return await this.nevermined.services.node.computeLogs(agreementId, executionId, from)
  }

  /**
   * It returns the status of a compute job
   * @param agreementId - The unique identifier of the order placed for a service
   * @param executionId - The unique identifier of the job executed
   * @param from - The account of the user triggering the computation
   * @returns The status of the job
   */
  public async status(agreementId: string, executionId: string, from: NvmAccount) {
    return (await this.nevermined.services.node.computeStatus(agreementId, executionId, from))
      .workflowStatus
  }
}
