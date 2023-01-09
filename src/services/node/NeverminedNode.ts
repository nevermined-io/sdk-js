import { MetaDataFile, ServiceType, DDO, ImmutableBackends } from '../../ddo'
import { Account } from '../../nevermined'
import { noZeroX } from '../../utils'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { ReadStream } from 'fs'
import { NeverminedNodeError, HttpError } from '../../errors'
import { BigNumber } from '../../utils'
import { ERCType, Babysig } from '../../models'
import { PublishMetadata } from '../../nevermined'

const apiPath = '/api/v1/node/services'

export enum NodeUploadBackends {
    Filecoin = 'filecoin',
    IPFS = 'ipfs',
    AmazonS3 = 's3'
}

/**
 * Provides a interface with Nevermined Node.
 * The Nevermined Node is the technical component executed by the Publishers allowing to them to provide extended data services.
 */
export class NeverminedNode extends Instantiable {
    private get url() {
        return this.config.neverminedNodeUri
    }

    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }

    public async getVersionInfo() {
        return (await this.nevermined.utils.fetch.get(this.url)).json()
    }

    public getPurchaseEndpoint() {
        return `${this.url}${apiPath}/access/initialize`
    }

    public getConsumeEndpoint() {
        return `${this.url}${apiPath}/consume`
    }

    public getAccessEndpoint() {
        return `${this.url}${apiPath}/access`
    }

    public getAccessProofEndpoint() {
        return `${this.url}${apiPath}/access-proof`
    }

    public getServiceEndpoint(service: ServiceType) {
        return `${this.url}${apiPath}/${service}`
    }

    public getComputeLogsEndpoint(executionId: string) {
        return `${this.url}${apiPath}/compute/logs/${executionId}`
    }

    public getComputeStatusEndpoint(executionId: string) {
        return `${this.url}${apiPath}/compute/status/${executionId}`
    }

    public getExecuteEndpoint(serviceAgreementId: string) {
        return `${this.url}${apiPath}/compute/execute/${serviceAgreementId}`
    }

    public getEncryptEndpoint() {
        return `${this.url}${apiPath}/encrypt`
    }

    public getFetchTokenEndpoint() {
        return `${this.url}${apiPath}/oauth/token`
    }

    public getUploadFilecoinEndpoint() {
        return `${this.url}${apiPath}/upload/filecoin`
    }

    public getUploadIPFSEndpoint() {
        return `${this.url}${apiPath}/upload/ipfs`
    }

    public getNftEndpoint() {
        return `${this.url}${apiPath}/nft`
    }

    public getNft721Endpoint() {
        return `${this.url}${apiPath}/nft721`
    }

    public getNftAccessEndpoint() {
        return `${this.url}${apiPath}/nft-access`
    }

    public getNftTransferForDelegateEndpoint() {
        return `${this.url}${apiPath}/nft-transfer`
    }

    public async getNeverminedNodeInfo() {
        return this.nevermined.utils.fetch.get(`${this.url}`).then(res => res.json())
    }

    public async getProviderAddress() {
        const json = await this.getNeverminedNodeInfo()
        return json['provider-address']
    }

    public async getRsaPublicKey() {
        const json = await this.getNeverminedNodeInfo()
        return json['rsa-public-key']
    }

    public async getEcdsaPublicKey() {
        const json = await this.getNeverminedNodeInfo()
        return json['ecdsa-public-key']
    }

    public async getBabyjubPublicKey() {
        const json = await this.getNeverminedNodeInfo()
        return json['babyjub-public-key']
    }

    public getDownloadEndpoint() {
        return `${this.url}${apiPath}/download`
    }

    public async initializeServiceAgreement(
        did: string,
        serviceAgreementId: string,
        serviceIndex: number,
        signature: string,
        consumerAddress: string
    ): Promise<any> {
        const args = {
            did,
            serviceAgreementId,
            serviceIndex,
            signature,
            consumerAddress
        }

        try {
            return await this.nevermined.utils.fetch.post(
                this.getPurchaseEndpoint(),
                decodeURI(JSON.stringify(args))
            )
        } catch (e) {
            throw new NeverminedNodeError(e)
        }
    }

    public async consumeService(
        did: string,
        agreementId: string,
        serviceEndpoint: string,
        account: Account,
        files: MetaDataFile[],
        destination: string,
        index = -1,
        buyer?: string,
        babysig?: Babysig
    ): Promise<string> {
        const { jwt } = this.nevermined.utils
        let accessToken: string
        const cacheKey = jwt.generateCacheKey(account.getId(), agreementId, did)

        if (!jwt.tokenCache.has(cacheKey)) {
            const grantToken = await jwt.generateAccessGrantToken(
                account,
                agreementId,
                did,
                buyer,
                babysig
            )
            accessToken = await this.fetchToken(grantToken)
            jwt.tokenCache.set(cacheKey, accessToken)
        } else {
            accessToken = this.nevermined.utils.jwt.tokenCache.get(cacheKey)
        }
        const headers = {
            Authorization: 'Bearer ' + accessToken
        }

        const filesPromises = files
            .filter((_, i) => index === -1 || i === index)
            .map(async ({ index: i }) => {
                const consumeUrl = `${serviceEndpoint}/${noZeroX(agreementId)}/${i}`
                try {
                    await this.nevermined.utils.fetch.downloadFile(
                        consumeUrl,
                        destination,
                        i,
                        headers
                    )
                } catch (e) {
                    throw new NeverminedNodeError(`Error consuming assets - ${e}`)
                }
            })
        await Promise.all(filesPromises)
        return destination
    }

    public async encrypt(did, document, method): Promise<any> {
        const payload = {
            did: did,
            message: document,
            method: method
        }
        try {
            const response = await this.nevermined.utils.fetch.post(
                this.getEncryptEndpoint(),
                decodeURI(JSON.stringify(payload))
            )
            if (!response.ok) {
                throw new HttpError(
                    `${response.statusText} ${response.url}`,
                    response.status
                )
            }
            return await response.text()
        } catch (e) {
            throw new NeverminedNodeError(e)
        }
    }

    public async downloadService(
        files: MetaDataFile[],
        destination: string,
        index = -1,
        headers?: { [key: string]: string }
    ) {
        const filesPromises = files
            .filter((_, i) => +index === -1 || i === index)
            .map(async ({ index: i }) => {
                const consumeUrl = `${this.getDownloadEndpoint()}/${i}`
                try {
                    await this.nevermined.utils.fetch.downloadFile(
                        consumeUrl,
                        destination,
                        i,
                        headers
                    )
                } catch (e) {
                    throw new NeverminedNodeError(`Error consuming assets - ${e}`)
                }
            })

        await Promise.all(filesPromises)

        this.logger.log('Files consumed')

        if (destination) {
            return destination
        }

        return 'success'
    }

    public async execute(
        agreementId: string,
        workflowDid: string,
        account: Account
    ): Promise<any> {
        const { jwt } = this.nevermined.utils
        let accessToken: string
        const cacheKey = jwt.generateCacheKey(account.getId(), agreementId, workflowDid)

        try {
            if (!jwt.tokenCache.has(cacheKey)) {
                const grantToken = await jwt.generateExecuteGrantToken(
                    account,
                    agreementId,
                    workflowDid
                )
                accessToken = await this.fetchToken(grantToken)
                jwt.tokenCache.set(cacheKey, accessToken)
            } else {
                accessToken = this.nevermined.utils.jwt.tokenCache.get(cacheKey)
            }
            const headers = {
                Authorization: 'Bearer ' + accessToken
            }

            const payload = {
                workflowDid: workflowDid,
                consumer: account.getId()
            }

            const response = await this.nevermined.utils.fetch.post(
                this.getExecuteEndpoint(noZeroX(agreementId)),
                JSON.stringify(payload),
                headers
            )
            if (!response.ok) {
                throw new HttpError(
                    `${response.statusText} ${response.url}`,
                    response.status
                )
            }
            return await response.json()
        } catch (e) {
            throw new NeverminedNodeError(e)
        }
    }

    public async computeLogs(
        agreementId: string,
        executionId: string,
        account: Account
    ): Promise<any> {
        const { jwt } = this.nevermined.utils
        let accessToken: string
        const cacheKey = jwt.generateCacheKey(account.getId(), agreementId, executionId)

        try {
            if (!jwt.tokenCache.has(cacheKey)) {
                const grantToken = await jwt.generateComputeGrantToken(
                    account,
                    agreementId,
                    executionId
                )
                accessToken = await this.fetchToken(grantToken)
                jwt.tokenCache.set(cacheKey, accessToken)
            } else {
                accessToken = this.nevermined.utils.jwt.tokenCache.get(cacheKey)
            }
            const headers = {
                Authorization: 'Bearer ' + accessToken
            }

            const response = await this.nevermined.utils.fetch.get(
                this.getComputeLogsEndpoint(noZeroX(executionId)),
                headers
            )

            if (!response.ok) {
                throw new HttpError(
                    `${response.statusText} ${response.url}`,
                    response.status
                )
            }
            return await response.text()
        } catch (e) {
            throw new NeverminedNodeError(e)
        }
    }

    public async computeStatus(
        agreementId: string,
        executionId: string,
        account: Account
    ): Promise<any> {
        const { jwt } = this.nevermined.utils
        let accessToken: string
        const cacheKey = jwt.generateCacheKey(account.getId(), agreementId, executionId)

        try {
            if (!jwt.tokenCache.has(cacheKey)) {
                const grantToken = await jwt.generateComputeGrantToken(
                    account,
                    agreementId,
                    executionId
                )
                accessToken = await this.fetchToken(grantToken)
                jwt.tokenCache.set(cacheKey, accessToken)
            } else {
                accessToken = this.nevermined.utils.jwt.tokenCache.get(cacheKey)
            }
            const headers = {
                Authorization: 'Bearer ' + accessToken
            }

            const response = await this.nevermined.utils.fetch.get(
                this.getComputeStatusEndpoint(noZeroX(executionId)),
                headers
            )

            if (!response.ok) {
                throw new HttpError(
                    `${response.statusText} ${response.url}`,
                    response.status
                )
            }
            return await response.text()
        } catch (e) {
            throw new NeverminedNodeError(e)
        }
    }

    public async nftTransferForDelegate(
        agreementId: string,
        nftHolder: string,
        nftReceiver: string,
        nftAmount: BigNumber,
        ercType: ERCType = 1155
    ): Promise<boolean> {
        try {
            const response = await this.nevermined.utils.fetch.post(
                this.getNftTransferForDelegateEndpoint(),
                JSON.stringify({
                    agreementId,
                    nftHolder,
                    nftReceiver,
                    nftAmount: nftAmount.toString(),
                    nftType: ercType
                })
            )
            if (!response.ok) {
                throw new HttpError(
                    `${response.statusText} ${response.url}`,
                    response.status
                )
            }
            return true
        } catch (e) {
            throw new NeverminedNodeError(e)
        }
    }

    public async fetchToken(grantToken: string): Promise<string> {
        // we need to use "application/x-www-form-urlencoded" format
        // as per https://tools.ietf.org/html/rfc6749#section-4.1.3
        const response = await this.nevermined.utils.fetch.fetchToken(
            this.getFetchTokenEndpoint(),
            grantToken,
            5
        )

        if (!response.ok) {
            throw new HttpError(`${response.statusText} ${response.url}`, response.status)
        }

        const jsonPayload = await response.json()
        return jsonPayload.access_token
    }

    public async publishImmutableContent(
        ddo: DDO,
        publishMetadata: PublishMetadata = PublishMetadata.IPFS
    ): Promise<{ url: string; backend: ImmutableBackends }> {
        let url,
            backend = undefined

        if (publishMetadata === PublishMetadata.Filecoin) {
            this.logger.log('Publishing metadata to Filecoin')
            ;({ url } = await this.nevermined.services.node.uploadContent(
                JSON.stringify(ddo),
                false,
                NodeUploadBackends.Filecoin
            ))
            backend = 'filecoin'
        } else if (publishMetadata === PublishMetadata.IPFS) {
            this.logger.log('Publishing metadata to IPFS')
            ;({ url: url } = await this.nevermined.services.node.uploadContent(
                JSON.stringify(ddo),
                false,
                NodeUploadBackends.IPFS
            ))
            backend = 'ipfs'
        }
        return { url, backend }
    }

    public async uploadContent(
        data: ReadStream | string,
        encrypt?: boolean,
        backend: NodeUploadBackends = NodeUploadBackends.Filecoin
    ): Promise<any> {
        let response
        const uploadEndpoint =
            backend === NodeUploadBackends.Filecoin
                ? this.getUploadFilecoinEndpoint()
                : this.getUploadIPFSEndpoint()
        if (typeof data === 'string')
            response = await this.nevermined.utils.fetch.uploadMessage(
                uploadEndpoint,
                data,
                encrypt
            )
        else
            response = await this.nevermined.utils.fetch.uploadFile(
                uploadEndpoint,
                data,
                encrypt
            )
        return response.json()
    }
}
