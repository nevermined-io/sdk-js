import { ReadStream } from 'fs'
import { DDO } from '../../ddo/DDO'
import { HttpError, NeverminedNodeError } from '../../errors/NeverminedErrors'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { NvmAccount } from '../../models/NvmAccount'
import { ImmutableBackends, MetaDataExternalResource, ServiceType } from '../../types/DDOTypes'
import { Babysig, ERCType } from '../../types/GeneralTypes'
import { PublishMetadataOptions } from '../../types/MetadataTypes'
import { noZeroX } from '../../utils/ConversionTypeHelpers'

const apiPath = '/api/v1/node/services'

export enum NodeUploadBackends {
  Filecoin = 'filecoin',
  IPFS = 'ipfs',
  AmazonS3 = 's3',
}

export enum AssetResult {
  DATA = 'data',
  DECRYPTED = 'decrypted',
  URL = 'url',
}

export interface SubscriptionToken {
  accessToken: string
  neverminedProxyUri: string
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

  public getServiceEndpoint(service: ServiceType | string) {
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

  public getFetchTokenWithNvmApiKeyEndpoint() {
    return `${this.url}${apiPath}/oauth/nvmApiKey`
  }

  public getUploadFilecoinEndpoint() {
    return `${this.url}${apiPath}/upload/filecoin`
  }

  public getUploadIPFSEndpoint() {
    return `${this.url}${apiPath}/upload/ipfs`
  }

  public getUploadS3Endpoint() {
    return `${this.url}${apiPath}/upload/s3`
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

  public getClaimNftEndpoint() {
    return `${this.url}${apiPath}/nft-transfer`
  }

  public getSubscriptionsEndpoint(did: string): string {
    return `${this.url}${apiPath}/subscriptions/${did}`
  }

  public async getNeverminedNodeInfo() {
    return this.nevermined.utils.fetch.get(`${this.url}`).then((res) => res.json())
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
    consumerAddress: string,
  ): Promise<any> {
    const args = {
      did,
      serviceAgreementId,
      serviceIndex,
      signature,
      consumerAddress,
    }

    try {
      return await this.nevermined.utils.fetch.post(
        this.getPurchaseEndpoint(),
        decodeURI(JSON.stringify(args)),
      )
    } catch (e) {
      throw new NeverminedNodeError(e)
    }
  }

  public async consumeService(
    did: string,
    agreementId: string,
    serviceEndpoint: string,
    account: NvmAccount,
    files: MetaDataExternalResource[],
    destination: string | undefined,
    index = -1,
    result = AssetResult.DATA,
    buyer?: string,
    babysig?: Babysig,
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
        babysig,
      )
      accessToken = await this.fetchToken(grantToken)
      jwt.tokenCache.set(cacheKey, accessToken)
    } else {
      accessToken = this.nevermined.utils.jwt.tokenCache.get(cacheKey) as string
    }
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    }

    const filesPromises = files
      .filter((_, i) => index === -1 || i === index)
      .map(async ({ index: i }) => {
        const consumeUrl = `${serviceEndpoint}/${noZeroX(agreementId)}/${i}?result=${result}`
        try {
          await this.nevermined.utils.fetch.downloadFile(consumeUrl, destination, i, headers)
        } catch (e) {
          throw new NeverminedNodeError(`Error consuming assets - ${e}`)
        }
      })
    await Promise.all(filesPromises)
    return destination as string
  }

  public async encrypt(did, document, method): Promise<any> {
    const payload = {
      did: did,
      message: document,
      method: method,
    }
    try {
      const response = await this.nevermined.utils.fetch.post(
        this.getEncryptEndpoint(),
        decodeURI(JSON.stringify(payload)),
      )
      if (!response.ok) {
        throw new HttpError(`${response.statusText} ${response.url}`, response.status)
      }
      return await response.text()
    } catch (e) {
      throw new NeverminedNodeError(e)
    }
  }

  public async downloadService(
    files: MetaDataExternalResource[],
    destination: string | undefined,
    index = -1,
    headers?: { [key: string]: string },
    result = AssetResult.DATA,
  ) {
    const filesPromises = files
      .filter((_, i) => +index === -1 || i === index)
      .map(async ({ index: i }) => {
        const consumeUrl = `${this.getDownloadEndpoint()}/${i}?result=${result}`
        try {
          await this.nevermined.utils.fetch.downloadFile(consumeUrl, destination, i, headers)
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
    account: NvmAccount,
  ): Promise<any> {
    const { jwt } = this.nevermined.utils
    let accessToken: string
    const cacheKey = jwt.generateCacheKey(account.getId(), agreementId, workflowDid)

    try {
      if (!jwt.tokenCache.has(cacheKey)) {
        const grantToken = await jwt.generateExecuteGrantToken(account, agreementId, workflowDid)
        accessToken = await this.fetchToken(grantToken)
        jwt.tokenCache.set(cacheKey, accessToken)
      } else {
        accessToken = this.nevermined.utils.jwt.tokenCache.get(cacheKey) as string
      }
      const headers = {
        Authorization: 'Bearer ' + accessToken,
      }

      const payload = {
        workflowDid: workflowDid,
        consumer: account.getId(),
      }

      const response = await this.nevermined.utils.fetch.post(
        this.getExecuteEndpoint(noZeroX(agreementId)),
        JSON.stringify(payload),
        headers,
      )
      if (!response.ok) {
        throw new HttpError(`${response.statusText} ${response.url}`, response.status)
      }
      return await response.json()
    } catch (e) {
      throw new NeverminedNodeError(e)
    }
  }

  public async computeLogs(
    agreementId: string,
    executionId: string,
    account: NvmAccount,
  ): Promise<any> {
    const { jwt } = this.nevermined.utils
    let accessToken: string
    const cacheKey = jwt.generateCacheKey(account.getId(), agreementId, executionId)

    try {
      if (!jwt.tokenCache.has(cacheKey)) {
        const grantToken = await jwt.generateComputeGrantToken(account, agreementId, executionId)
        accessToken = await this.fetchToken(grantToken)
        jwt.tokenCache.set(cacheKey, accessToken)
      } else {
        accessToken = this.nevermined.utils.jwt.tokenCache.get(cacheKey) as string
      }
      const headers = {
        Authorization: 'Bearer ' + accessToken,
      }

      const response = await this.nevermined.utils.fetch.get(
        this.getComputeLogsEndpoint(noZeroX(executionId)),
        headers,
      )

      if (!response.ok) {
        throw new HttpError(`${response.statusText} ${response.url}`, response.status)
      }
      return await response.text()
    } catch (e) {
      throw new NeverminedNodeError(e)
    }
  }

  public async computeStatus(
    agreementId: string,
    executionId: string,
    account: NvmAccount,
  ): Promise<any> {
    const { jwt } = this.nevermined.utils
    let accessToken: string
    const cacheKey = jwt.generateCacheKey(account.getId(), agreementId, executionId)

    try {
      if (!jwt.tokenCache.has(cacheKey)) {
        const grantToken = await jwt.generateComputeGrantToken(account, agreementId, executionId)
        accessToken = await this.fetchToken(grantToken)
        jwt.tokenCache.set(cacheKey, accessToken)
      } else {
        accessToken = this.nevermined.utils.jwt.tokenCache.get(cacheKey) as string
      }
      const headers = {
        Authorization: 'Bearer ' + accessToken,
      }

      const response = await this.nevermined.utils.fetch.get(
        this.getComputeStatusEndpoint(noZeroX(executionId)),
        headers,
      )

      if (!response.ok) {
        throw new HttpError(`${response.statusText} ${response.url}`, response.status)
      }
      return await response.json()
    } catch (e) {
      throw new NeverminedNodeError(e)
    }
  }

  public async claimNFT(
    agreementId: string,
    nftHolder: string,
    nftReceiver: string,
    nftAmount: bigint,
    ercType: ERCType = 1155,
    did?: string,
    serviceIndex?: number,
  ): Promise<boolean> {
    let claimNFTEndpoint = this.getClaimNftEndpoint()
    try {
      if (did) {
        // Getting Node endpoint from DDO
        const ddo = await this.nevermined.assets.resolve(did)
        const salesService = ddo.findServiceByType('nft-sales')
        if (!salesService.serviceEndpoint) {
          throw new Error('NFT Sales service endpoint not found')
        }
        const endpointURL = new URL(salesService.serviceEndpoint)
        claimNFTEndpoint = `${endpointURL.protocol}//${endpointURL.host}${apiPath}/nft-transfer`
      }
    } catch (e) {
      this.logger.log(`Unable to get endpoint from DDO: ${did}`)
    }

    try {
      const claimBody = JSON.stringify({
        agreementId,
        did,
        nftHolder,
        nftReceiver,
        nftAmount: nftAmount.toString(),
        nftType: ercType,
        serviceIndex: serviceIndex && serviceIndex >= 0 ? serviceIndex : -1,
      })

      this.logger.log(`Claiming NFT using endpoint: ${claimNFTEndpoint}`)

      const response = await this.nevermined.utils.fetch.post(claimNFTEndpoint, claimBody)

      if (!response.ok) {
        throw new HttpError(`${response.statusText} ${response.url}`, response.status)
      }
      return true
    } catch (e) {
      throw new NeverminedNodeError(e)
    }
  }

  public async fetchToken(
    grantToken: string,
    numberTries = 3,
    nvmApiKey?: string,
  ): Promise<string> {
    const url = nvmApiKey ? this.getFetchTokenWithNvmApiKeyEndpoint() : this.getFetchTokenEndpoint()
    const response = await this.nevermined.utils.fetch.fetchToken(
      url,
      grantToken,
      numberTries,
      nvmApiKey,
    )

    if (!response.ok) {
      throw new HttpError(`${response.statusText} ${response.url}`, response.status)
    }

    const jsonPayload = await response.json()
    return jsonPayload.access_token
  }

  public async publishImmutableContent(
    ddo: DDO,
    publishMetadata: PublishMetadataOptions = PublishMetadataOptions.IPFS,
  ): Promise<{ url: string; backend: ImmutableBackends }> {
    let url, backend

    if (publishMetadata === PublishMetadataOptions.Filecoin) {
      this.logger.log('Publishing metadata to Filecoin')
      ;({ url } = await this.nevermined.services.node.uploadContent(
        JSON.stringify(ddo),
        false,
        NodeUploadBackends.Filecoin,
      ))
      backend = 'filecoin'
    } else if (publishMetadata === PublishMetadataOptions.IPFS) {
      this.logger.log('Publishing metadata to IPFS')
      ;({ url: url } = await this.nevermined.services.node.uploadContent(
        JSON.stringify(ddo),
        false,
        NodeUploadBackends.IPFS,
      ))
      backend = 'ipfs'
    }
    return { url, backend }
  }

  public async uploadContent(
    data: ReadStream | string,
    encrypt?: boolean,
    backend: NodeUploadBackends = NodeUploadBackends.Filecoin,
  ): Promise<any> {
    let response
    let uploadEndpoint: string

    switch (backend) {
      case NodeUploadBackends.Filecoin:
        uploadEndpoint = this.getUploadFilecoinEndpoint()
        break
      case NodeUploadBackends.IPFS:
        uploadEndpoint = this.getUploadIPFSEndpoint()
        break
      case NodeUploadBackends.AmazonS3:
        uploadEndpoint = this.getUploadS3Endpoint()
        break
      default:
        throw new Error(`Backend ${backend} not supported`)
    }

    if (typeof data === 'string')
      response = await this.nevermined.utils.fetch.uploadMessage(uploadEndpoint, data, encrypt)
    else response = await this.nevermined.utils.fetch.uploadFile(uploadEndpoint, data, encrypt)
    return response.json()
  }

  public async getSubscriptionToken(did: string, account: NvmAccount): Promise<SubscriptionToken> {
    const { jwt } = this.nevermined.utils
    let accessToken: string
    const cacheKey = jwt.generateCacheKey(account.getId())

    try {
      if (!jwt.tokenCache.has(cacheKey)) {
        const clientAssertion = await jwt.generateClientAssertion(account)
        accessToken = await this.fetchToken(clientAssertion)
        jwt.tokenCache.set(cacheKey, accessToken)
      } else {
        accessToken = this.nevermined.utils.jwt.tokenCache.get(cacheKey) as string
      }
      const headers = {
        Authorization: 'Bearer ' + accessToken,
      }

      const response = await this.nevermined.utils.fetch.get(
        this.getSubscriptionsEndpoint(did),
        headers,
      )

      if (!response.ok) {
        throw new HttpError(`${response.statusText} ${response.url}`, response.status)
      }
      return await response.json()
    } catch (e) {
      throw new NeverminedNodeError(e)
    }
  }
}
