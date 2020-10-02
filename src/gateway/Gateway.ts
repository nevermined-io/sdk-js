import { File } from '../ddo/MetaData'
import Account from '../nevermined/Account'
import { noZeroX } from '../utils'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

const apiPath = '/api/v1/gateway/services'

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

    public getComputeLogsEndpoint(serviceAgreementId: string, executionId: string) {
        return `${this.url}${apiPath}/compute/logs/${serviceAgreementId}/${executionId}`
    }

    public getComputeStatusEndpoint(serviceAgreementId: string, executionId: string) {
        return `${this.url}${apiPath}/compute/status/${serviceAgreementId}/${executionId}`
    }

    public getExecuteEndpoint(serviceAgreementId: string) {
        return `${this.url}${apiPath}/execute/${serviceAgreementId}`
    }

    public getSecretStoreEncryptEndpoint() {
        return `${this.url}${apiPath}/publish`
    }

    public getEncryptEndpoint() {
        return `${this.url}${apiPath}/encrypt`
    }

    public async getGatewayInfo() {
        return this.nevermined.utils.fetch.get(`${this.url}`)
          .then(res => res.json())
    }

    public async getRsaPublicKey() {
        const json = await this.getGatewayInfo()
        return json['rsa-public-key']
    }

    public async getEcdsaPublicKey() {
        const json = await this.getGatewayInfo()
        return json['ecdsa-public-key']
    }

    public getComputeEndpoint(
        pubKey: string,
        serviceIndex: number,
        _notUsed: string,
        container: string
    ) {
        return `${this.url}${apiPath}/compute`
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
            this.logger.error(e)
            throw new Error('HTTP request failed')
        }
    }

    public async consumeService(
        did: string,
        agreementId: string,
        serviceEndpoint: string,
        account: Account,
        files: File[],
        destination: string,
        index: number = -1
    ): Promise<string> {
        const signature =
            (await account.getToken()) ||
            (await this.nevermined.utils.signature.signText(
                noZeroX(agreementId),
                account.getId()
            ))
        const headers = {
            'X-Consumer-Address': account.getId(),
            'X-Signature': signature,
            'X-DID': did
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
                    this.logger.error('Error consuming assets')
                    this.logger.error(e)
                    throw e
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
                throw new Error('HTTP request failed')
            }
            return await response.text()
        } catch (e) {
            this.logger.error(e)
            throw new Error('HTTP request failed')
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
                throw new Error('HTTP request failed')
            }
            return await response.text()
        } catch (e) {
            this.logger.error(e)
            throw new Error('HTTP request failed')
        }
    }

    public async execute(
        agreementId: string,
        computeDid: string,
        workflowDid: string,
        account: Account,
    ): Promise<any> {
        try {
            const signedAgreementId = await this.nevermined.utils.signature
                .signText(noZeroX(agreementId), account.getId())

            const headers = {
                'X-Consumer-Address': account.getId(),
                'X-Signature': signedAgreementId,
                'X-Workflow-DID': workflowDid,
            }
            const response = await this.nevermined.utils.fetch.post(
                this.getExecuteEndpoint(noZeroX(agreementId)),
                undefined,
                headers,
            )
            if (!response.ok) {
                throw new Error('HTTP request failed')
            }
            return await response.json()
        } catch (e) {
            this.logger.error(e)
            throw new Error('HTTP request failed')
        }
    }

    public async downloadService(
        did: string,
        account: Account,
        files: File[],
        destination: string,
        index: number = -1
    ): Promise<string> {
        const signature =
            (await account.getToken()) ||
            (await this.nevermined.utils.signature.signText(
                noZeroX(did),
                account.getId()
            ))
        const headers = {
            'X-Consumer-Address': account.getId(),
            'X-Signature': signature,
            'X-DID': did
        }
        const filesPromises = files
            .filter((_, i) => index === -1 || i === index)
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
                    this.logger.error('Error consuming assets')
                    this.logger.error(e)
                    throw e
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
            try {
                const signedAgreementId = await this.nevermined.utils.signature
                    .signText(noZeroX(executionId), account.getId())
    
                const headers = {
                    'X-Consumer-Address': account.getId(),
                    'X-Signature': signedAgreementId
                }
    
                const response = await this.nevermined.utils.fetch.get(
                    this.getComputeLogsEndpoint(noZeroX(agreementId), noZeroX(executionId)),
                    headers,
                )
    
                if (!response.ok) {
                    throw new Error('HTTP request failed')
                }
                return await response.text()
            } catch (e) {
                this.logger.error(e)
                throw new Error('HTTP request failed')
            }
        }

    public async computeStatus(
        agreementId: string,
        executionId: string,
        account: Account
        ): Promise<any> {
            try {
                const signedAgreementId = await this.nevermined.utils.signature
                    .signText(noZeroX(executionId), account.getId())
    
                const headers = {
                    'X-Consumer-Address': account.getId(),
                    'X-Signature': signedAgreementId
                }
                console.log(headers)
    
                const response = await this.nevermined.utils.fetch.get(
                    this.getComputeStatusEndpoint(noZeroX(agreementId), noZeroX(executionId)),
                    headers,
                )
    
                if (!response.ok) {
                    throw new Error('HTTP request failed')
                }
                return await response.text()
            } catch (e) {
                this.logger.error(e)
                throw new Error('HTTP request failed')
            }
        }
}
