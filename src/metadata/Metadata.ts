import { DDO } from '../ddo/DDO'
import DID from '../nevermined/DID'
import { ServiceSecondary } from '../ddo/Service'
import { MarketplaceApi } from '../marketplace/MarketplaceAPI'
import { ApiError, HttpError } from '../errors'
import { SearchQuery } from '../common/interfaces'

const apiPath = '/api/v1/metadata/assets/ddo'
const servicePath = '/api/v1/metadata/assets/service'

export interface QueryResult {
    results: DDO[]
    page: number
    totalPages: number
    totalResults: { [jsonPath: string]: any }
}

export type EncryptionMethod = 'PSK-RSA' | 'PSK-ECDSA'

export interface DDOStatus {
    internal: {
        id: string
        type: string
        status: string
        url: string
    }
    external: {
        id: string
        type: string
        status: string
        url: string
    }
}

export interface AuthToken {
    access_token: string
}

/**
 * Provides a interface with Metadata.
 * Metadata provides an off-chain database store for metadata about data assets.
 */
export class Metadata extends MarketplaceApi {
    public async getVersionInfo() {
        return (await this.nevermined.utils.fetch.get(this.url)).json()
    }

    public async getAccessUrl(accessToken: any, payload: any): Promise<string> {
        const accessUrl: string = await this.nevermined.utils.fetch
            .post(`${accessToken.service_endpoint}/${accessToken.resource_id}`, payload)
            .then((response: any): string => {
                if (response.ok) {
                    return response.text()
                }
                throw new HttpError(
                    `getAccessUrl Failed - ${response.statusText} ${response.url}`,
                    response.status
                )
            })
            .then((consumptionUrl: string): string => {
                this.logger.log('Success accessing consume endpoint: ', consumptionUrl)
                return consumptionUrl
            })
            .catch(error => {
                throw new ApiError(error)
            })

        return accessUrl
    }

    /**
     * Search over the DDOs using a query.
     * @param query - Query to filter the DDOs.
     * @returns A list of {@link QueryResult}s.
     */
    public async queryMetadata(query: SearchQuery): Promise<QueryResult> {
        const result: QueryResult = await this.nevermined.utils.fetch
            .post(`${this.url}${apiPath}/query`, JSON.stringify(query))
            .then((response: any) => {
                if (response.ok) {
                    return response.json() as DDO[]
                }
                throw new HttpError(
                    `queryMetadata failed - ${response.statusText} ${response.url}`,
                    response.status
                )
            })
            .then(results => {
                return this.transformResult(results)
            })
            .catch(error => {
                throw new ApiError(error)
            })

        return result
    }

    /**
     * Search over the Services using a query.
     * @param  query - Query to filter the Services.
     * @returns A list of {@link ServiceSecondary}.
     */
    public async queryServiceMetadata(query: {
        [property: string]: string | number | string[] | number[] | object
    }): Promise<ServiceSecondary[]> {
        const result: ServiceSecondary[] = await this.nevermined.utils.fetch
            .post(`${this.url}${servicePath}/query`, JSON.stringify(query))
            .then((response: any) => {
                if (response.ok) {
                    return response.json() as ServiceSecondary[]
                }
                throw new HttpError(
                    `queryServicesMetadata failed - ${response.statusText} ${response.url}`,
                    response.status
                )
            })
            .catch(error => {
                throw new ApiError(error)
            })

        return result
    }

    /**
     * Update a DDO in Metadata.
     * @param  ddo - DDO to be stored.
     * @returns Final DDO.
     */
    public async updateDDO(did: DID | string, ddo: DDO): Promise<DDO> {
        did = did && DID.parse(did)
        const fullUrl = `${this.url}${apiPath}/${did.getDid()}`
        const result: DDO = await this.nevermined.utils.fetch
            .put(fullUrl, DDO.serialize(ddo))
            .then((response: any) => {
                if (response.ok) {
                    return response.json()
                }

                throw new HttpError(
                    `updateDDO failed - ${response.statusText} ${response.url}`,
                    response.status
                )
            })
            .then((response: DDO) => {
                return new DDO(response) as DDO
            })
            .catch(error => {
                throw new ApiError(error)
            })

        return result
    }

    /**
     * Stores a DDO in Metadata.
     * @param ddo - DDO to be stored.
     * @returns Final DDO.
     */
    public async storeDDO(ddo: DDO): Promise<DDO> {
        const fullUrl = `${this.url}${apiPath}`
        const result: DDO = await this.nevermined.utils.fetch
            .post(fullUrl, DDO.serialize(ddo), {
                Authorization: `Bearer ${this.config.marketplaceAuthToken}`
            })
            .then((response: any) => {
                if (response.ok) {
                    return response.json()
                }

                throw new HttpError(
                    `storeDDO failed - ${response.statusText} ${response.url}`,
                    response.status
                )
            })
            .then((response: DDO) => {
                return new DDO(response) as DDO
            })
            .catch(error => {
                throw new ApiError(error)
            })

        return result
    }

    /**
     * Retrieves a DDO by DID.
     * @param did - DID of the asset.
     * @returns DDO of the asset.
     */
    public async retrieveDDO(
        did: DID | string,
        metadataServiceEndpoint?: string
    ): Promise<DDO> {
        did = did && DID.parse(did)
        const fullUrl = metadataServiceEndpoint || `${this.url}${apiPath}/${did.getDid()}`
        const result = await this.nevermined.utils.fetch
            .get(fullUrl)
            .then((response: any) => {
                if (response.ok) {
                    return response.json()
                }

                throw new HttpError(
                    `retrieveDDO failed - ${response.statusText} ${response.url}`,
                    response.status
                )
            })
            .then((response: DDO) => {
                return new DDO(response) as DDO
            })
            .catch(error => {
                throw new ApiError(error)
            })

        return result
    }

    public async delete(did: DID | string) {
        did = did && DID.parse(did)
        const result = await this.nevermined.utils.fetch.delete(
            `${this.url}${apiPath}/${did.getDid()}`
        )
        return result
    }

    public async retrieveDDOByUrl(metadataServiceEndpoint?: string) {
        return this.retrieveDDO(undefined, metadataServiceEndpoint)
    }

    /**
     * Retrieves a DDO by DID.
     * @param did - DID of the asset.
     * @returns DDO of the asset.
     */
    public async status(
        did: DID | string,
        metadataServiceEndpoint?: string
    ): Promise<DDOStatus> {
        did = did && DID.parse(did)
        const fullUrl =
            metadataServiceEndpoint || `${this.url}${apiPath}/${did.getDid()}/status`
        const result = await this.nevermined.utils.fetch
            .get(fullUrl)
            .then((response: any) => {
                if (response.ok) {
                    return response.json()
                }

                throw new HttpError(
                    `status failed - ${response.statusText} ${response.url}`,
                    response.status
                )
            })
            .then((response: DDOStatus) => {
                return response as DDOStatus
            })
            .catch(error => {
                throw new ApiError(error)
            })

        return result
    }

    /**
     * Retrieves a service by its agreementId.
     * @param agreementId - agreementId of the service.
     * @returns Service object.
     */
    public async retrieveService(
        agreementId: string,
        metadataServiceEndpoint?: string
    ): Promise<ServiceSecondary> {
        const fullUrl =
            metadataServiceEndpoint || `${this.url}${servicePath}/${agreementId}`
        const result = await this.nevermined.utils.fetch
            .get(fullUrl)
            .then((response: any) => {
                if (response.ok) {
                    return response.json()
                }

                throw new HttpError(
                    `retrieveService failed - ${response.statusText} ${response.url}`,
                    response.status
                )
            })
            .then((response: ServiceSecondary) => {
                return response as ServiceSecondary
            })
            .catch(error => {
                throw new ApiError(error)
            })

        return result
    }

    /**
     *
     * @param agreementId - The agreement ID of the service.
     * @param agreement - Stores the Service object with its agreementId
     * @returns the newly stored service object
     */
    public async storeService(
        agreementId: string,
        agreement: ServiceSecondary
    ): Promise<ServiceSecondary> {
        const fullUrl = `${this.url}${servicePath}`
        agreement['agreementId'] = agreementId
        const result: ServiceSecondary = await this.nevermined.utils.fetch
            .post(fullUrl, JSON.stringify(agreement), {
                Authorization: `Bearer ${this.config.marketplaceAuthToken}`
            })
            .then((response: any) => {
                if (response.ok) {
                    return response.json()
                }

                throw new HttpError(
                    `storeService failed - ${response.statusText} ${response.url}`,
                    response.status
                )
            })
            .then((response: ServiceSecondary) => {
                return response as ServiceSecondary
            })
            .catch(error => {
                throw new ApiError(error)
            })
        return result
    }

    public getServiceEndpoint(did: DID) {
        return `${this.url}${apiPath}/did:nv:${did.getId()}`
    }

    /* eslint-disable @typescript-eslint/naming-convention */
    private transformResult(
        { results, page, total_pages: totalPages, total_results: totalResults }: any = {
            result: [],
            page: 0,
            total_pages: 0,
            total_results: 0
        }
    ): QueryResult {
        return {
            results: (results || []).map(ddo => new DDO(ddo as DDO)),
            page,
            totalPages,
            totalResults
        }
    }
}
