import { MetaData, Account, DDO } from "../.."
import { InstantiableConfig } from "../../Instantiable.abstract"
import { TxParameters } from "../../keeper/contracts/ContractBase"
import { AssetAttributes } from "../../models/AssetAttributes"
import { SubscribablePromise } from "../../utils"
import { CreateProgressStep, OrderProgressStep, UpdateProgressStep } from "../ProgessSteps"
import { PublishMetadata } from "./AssetsApi"
import { RegistryBaseApi } from "./RegistryBaseApi"


/**
 * Nevermined Compute API. It allows the registration execution of compute jobs on top
 * of data registered in a Nevermined digital ecosystem.
 * 
 * You can find more information about the Nevermined compute solution here:
 * {@link https://docs.nevermined.io/docs/getting-started/remote-computation}
 */
export class ComputeApi extends RegistryBaseApi {

    /**
     * Returns the instance of the ComputeApi.
     * @param config - Configuration of the Nevermined instance
     * @returns {@link ComputeApi}
     */    
    public static async getInstance(config: InstantiableConfig): Promise<ComputeApi> {
        const instance = new ComputeApi()
        instance.servicePlugin = ComputeApi.getServicePlugin(config)
        instance.setInstanceConfig(config)

        return instance
    }


    /**
     * Registers a new asset in Nevermined. 
     * You can find more information about how different data is stored in Nevermined here:
     * {@link https://docs.nevermined.io/docs/architecture/nevermined-data}
     *
     * @param assetAttributes - Attributes describing the asset
     * @param publishMetadata - Allows to specify if the metadata should be stored in different backends
     * @param publisher - The account publishing the asset
     * @param txParams - Optional transaction parameters
     * @returns The metadata of the asset created (DDO)
     *
     * @returns {@link DDO}
     */
     public create(
        assetAttributes: AssetAttributes,
        publisher: Account,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return this.registerNeverminedAsset(
            assetAttributes,
            publisher,
            publishMetadata,
            undefined,
            txParams
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
     * @param publisher - Account of the user updating the metadata
     * @param publishMetadata - It allows to specify where to store the metadata  
     * @param txParams - Optional transaction parameters
     * @returns {@link DDO} The DDO updated
     */    
    public update(
        did: string,
        metadata: MetaData,
        publisher: Account,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<UpdateProgressStep, DDO> {
        return this.updateAsset(did, metadata, publisher, publishMetadata, txParams)
    }

    /**
     * Start the purchase/order of a compute service. Starts by signing the service agreement
     * then sends the request to the publisher via the service endpoint (Node http service).
     * @param did - Unique identifier of the asset to order
     * @param consumerAccount - The account of the user ordering the asset
     * @param txParams - Optional transaction parameters
     * @returns The agreement ID identifying the order     
     */
     public order(
        did: string,
        consumerAccount: Account,
        txParams?: TxParameters
    ): SubscribablePromise<OrderProgressStep, string> {
        return this.orderAsset(did, 'compute', consumerAccount, txParams)
    }

    /**
     * It trigers the execution of a compute job
     * @param agreementId - The unique identifier of the order placed for a service
     * @param workflowDid - The unique identifier of the Asset representing the workflow
     * @param consumerAccount - The account of the user triggering the computation
     * @returns If the execution is correct it returns the response given by the Nevermined Node 
    */
    public async execute(
        agreementId: string,
        workflowDid: string,
        consumerAccount: Account
    ): Promise<string> {
        const { node } = this.nevermined.services

        return (await node.execute(agreementId, workflowDid, consumerAccount)).workflowId
    }

    /**
     * It returns the logs resulted by the execution of a Job
     * @param agreementId - The unique identifier of the order placed for a service
     * @param executionId - The unique identifier of the job executed
     * @param consumerAccount - The account of the user triggering the computation
     * @returns The logs resulted of the execution of the job
     */
    public async logs(agreementId: string, executionId: string, consumerAccount: Account) {
        return await this.nevermined.services.node.computeLogs(agreementId, executionId, consumerAccount)
    }

    /**
     * It returns the status of a compute job
     * @param agreementId - The unique identifier of the order placed for a service
     * @param executionId - The unique identifier of the job executed
     * @param consumerAccount - The account of the user triggering the computation
     * @returns The status of the job
     */
    public async status(
        agreementId: string,
        executionId: string,
        account: Account
    ) {
        return await this.nevermined.services.node.computeStatus(agreementId, executionId, account)
    }

}