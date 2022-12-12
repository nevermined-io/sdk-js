import { MetaData, Account, DDO } from "../.."
import { InstantiableConfig } from "../../Instantiable.abstract"
import { TxParameters } from "../../keeper/contracts/ContractBase"
import { EncryptionMethod } from "../../metadata/MetadataService"
import AssetRewards from "../../models/AssetRewards"
import { SubscribablePromise } from "../../utils"
import { CreateProgressStep, OrderProgressStep, UpdateProgressStep } from "../ProgessSteps"
import { PublishMetadata } from "./AssetsApi"
import { RegistryBaseApi } from "./RegistryBaseApi"


/**
 * Nevermined Compute API. It allows the registration execution of compute jobs on top
 * of data registered in a Nevermined digital ecosystem.
 * You can find more information about the Nevermined compute solution here:
 * {@link https://docs.nevermined.io/docs/getting-started/remote-computation}
 */
export class ComputeApi extends RegistryBaseApi {

    public static async getInstance(config: InstantiableConfig): Promise<ComputeApi> {
        const instance = new ComputeApi()
        instance.servicePlugin = ComputeApi.getServicePlugin(config)
        instance.setInstanceConfig(config)

        return instance
    }


    public create(
        metadata: MetaData,
        publisher: Account,
        assetRewards: AssetRewards = new AssetRewards(),
        encryptionMethod: EncryptionMethod = 'PSK-RSA',
        providers: string[] = [this.config.neverminedNodeAddress],
        erc20TokenAddress?: string,
        appId?: string,
        publishMetadata: PublishMetadata = PublishMetadata.OnlyMetadataAPI,
        txParams?: TxParameters
    ): SubscribablePromise<CreateProgressStep, DDO> {
        return new SubscribablePromise(async () => {
            return this.registerAsset(
                metadata,
                publisher,
                encryptionMethod,
                assetRewards,
                ['compute'],
                [],
                undefined,
                erc20TokenAddress,
                providers,
                appId,
                publishMetadata,
                txParams                
            )
        })
    }

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
     * @param did - Decentralized ID.
     * @param consumer - Consumer account.
     * @returns The agreement ID.
     */
     public order(
        did: string,
        consumer: Account,
        params?: TxParameters
    ): SubscribablePromise<OrderProgressStep, string> {
        return this.orderAsset(did, 'compute', consumer, params)
    }

    /**
     * @param consumer - Consumer account.
     * @returns The agreement ID.
    */
    public async execute(
        agreementId: string,
        workflowDid: string,
        consumer: Account
    ): Promise<string> {
        const { node } = this.nevermined

        return (await node.execute(agreementId, workflowDid, consumer)).workflowId
    }

    public async logs(agreementId: string, executionId: string, account: Account) {
        return await this.nevermined.node.computeLogs(agreementId, executionId, account)
    }

    public async status(
        agreementId: string,
        executionId: string,
        account: Account
    ) {
        return await this.nevermined.node.computeStatus(agreementId, executionId, account)
    }

}