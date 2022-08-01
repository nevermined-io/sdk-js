import { File as MetaDataFile } from '../ddo/MetaData'
import Account from '../nevermined/Account'
import { noZeroX } from '../utils'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { ReadStream } from 'fs'
import { GatewayError, HttpError } from '../errors'

const apiPath = '/api/v1/gateway/services'
export type NftTypes = 721 | 1155

/**
 * Provides a interface with Gateway.
 * Gateway is the technical component executed by the Publishers allowing to them to provide extended data services.
 */
export class Gateway extends Instantiable {
    private get url() {
        return this.config.gatewayUri
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

    public getComputeLogsEndpoint(serviceAgreementId: string, executionId: string) {
        return `${this.url}${apiPath}/compute/logs/${serviceAgreementId}/${executionId}`
    }

    public getComputeStatusEndpoint(serviceAgreementId: string, executionId: string) {
        return `${this.url}${apiPath}/compute/status/${serviceAgreementId}/${executionId}`
    }

    public getExecuteEndpoint(serviceAgreementId: string) {
        return `${this.url}${apiPath}/execute/${serviceAgreementId}`
    }

    public getExecutionEndpoint() {
        return `${this.url}${apiPath}/execute/`
    }

    public getSecretStoreEncryptEndpoint() {
        return `${this.url}${apiPath}/publish`
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

    public async getGatewayInfo() {
        return this.nevermined.utils.fetch.get(`${this.url}`).then(res => res.json())
    }

    public async getRsaPublicKey() {
        const json = await this.getGatewayInfo()
        return json['rsa-public-key']
    }

    public async getEcdsaPublicKey() {
        const json = await this.getGatewayInfo()
        return json['ecdsa-public-key']
    }

    public async getBabyjubPublicKey() {
        const json = await this.getGatewayInfo()
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
            throw new GatewayError(e)
        }
    }

    public async consumeService(
        did: string,
        agreementId: string,
        serviceEndpoint: string,
        account: Account,
        files: MetaDataFile[],
        destination: string,
        index: number = -1
    ): Promise<string> {
        const { jwt } = this.nevermined.utils
        let accessToken: string
        const cacheKey = jwt.generateCacheKey(account.getId(), agreementId, did)

        if (!jwt.tokenCache.has(cacheKey)) {
            const grantToken = await jwt.generateAccessGrantToken(
                account,
                agreementId,
                did
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
                    throw new GatewayError(`Error consuming assets - ${e}`)
                }
            })
        await Promise.all(filesPromises)
        return destination
    }

    public async secretStoreEncrypt(
        did: string,
        signature: string,
        document: any,
        publisher: string
    ): Promise<string> {
        const args = {
            documentId: did,
            signature,
            document: JSON.stringify(document),
            publisherAddress: publisher
        }

        try {
            const response = await this.nevermined.utils.fetch.post(
                this.getSecretStoreEncryptEndpoint(),
                decodeURI(JSON.stringify(args))
            )
            if (!response.ok) {
                throw new HttpError(
                    `${response.statusText} ${response.url}`,
                    response.status
                )
            }
            return await response.text()
        } catch (e) {
            throw new GatewayError(e)
        }
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
            throw new GatewayError(e)
        }
    }

    public async execute(
        agreementId: string,
        computeDid: string,
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

            const response = await this.nevermined.utils.fetch.post(
                this.getExecuteEndpoint(noZeroX(agreementId)),
                undefined,
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
            throw new GatewayError(e)
        }
    }

    public async downloadService(
        did: string,
        account: Account,
        files: MetaDataFile[],
        destination: string,
        index: number = -1
    ): Promise<string> {
        const { jwt } = this.nevermined.utils
        let accessToken: string
        const cacheKey = jwt.generateCacheKey(account.getId(), did)

        if (!jwt.tokenCache.has(cacheKey)) {
            const grantToken = await jwt.generateDownloadGrantToken(account, did)
            accessToken = await this.fetchToken(grantToken)
            jwt.tokenCache.set(cacheKey, accessToken)
        } else {
            accessToken = this.nevermined.utils.jwt.tokenCache.get(cacheKey)
        }
        const headers = {
            Authorization: 'Bearer ' + accessToken
        }

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
                    throw new GatewayError(`Error consuming assets - ${e}`)
                }
            })
        await Promise.all(filesPromises)
        return destination
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
                this.getComputeLogsEndpoint(noZeroX(agreementId), noZeroX(executionId)),
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
            throw new GatewayError(e)
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
                this.getComputeStatusEndpoint(noZeroX(agreementId), noZeroX(executionId)),
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
            throw new GatewayError(e)
        }
    }

    public async nftTransferForDelegate(
        agreementId: string,
        nftHolder: string,
        nftReceiver: string,
        nftAmount: number,
        nftType: NftTypes = 1155
    ): Promise<boolean> {
        try {
            const response = await this.nevermined.utils.fetch.post(
                this.getNftTransferForDelegateEndpoint(),
                JSON.stringify({
                    agreementId,
                    nftHolder,
                    nftReceiver,
                    nftAmount,
                    nftType
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
            throw new GatewayError(e)
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

    public async uploadFilecoin(stream: ReadStream, encrypt?: boolean): Promise<any> {
        const response = await this.nevermined.utils.fetch.uploadFile(
            this.getUploadFilecoinEndpoint(),
            stream,
            encrypt
        )
        return response.json()
    }
}
