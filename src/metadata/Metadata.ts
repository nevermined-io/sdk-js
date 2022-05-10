import { URL } from 'whatwg-url'
import { DDO } from '../ddo/DDO'
import DID from '../nevermined/DID'
import { ServiceSecondary } from '../ddo/Service'
import { MarketplaceApi } from '../marketplace/MarketplaceAPI'

const apiPath = '/api/v1/metadata/assets/ddo'
const servicePath = '/api/v1/metadata/assets/service'

export interface QueryResult {
    results: DDO[]
    page: number
    totalPages: number
    totalResults: number
}

export interface SearchQuery {
    text?: string
    offset?: number
    page?: number
    query: { [property: string]: string | number | string[] | number[] }
    sort?: { [jsonPath: string]: string }
    show_unlisted?: boolean
}

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
                this.logger.error('Failed: ', response.status, response.statusText)
                return null
            })
            .then((consumptionUrl: string): string => {
                this.logger.error('Success accessing consume endpoint: ', consumptionUrl)
                return consumptionUrl
            })
            .catch(error => {
                this.logger.error(
                    'Error fetching the data asset consumption url: ',
                    error
                )
                return null
            })

        return accessUrl
    }

    /**
     * Search over the DDOs using a query.
     * @param  {SearchQuery} query Query to filter the DDOs.
     * @return {Promise<QueryResult>}
     */
    public async queryMetadata(query: SearchQuery): Promise<QueryResult> {
        const result: QueryResult = await this.nevermined.utils.fetch
            .post(`${this.url}${apiPath}/query`, JSON.stringify(query))
            .then((response: any) => {
                if (response.ok) {
                    return response.json() as DDO[]
                }
                this.logger.error(
                    'queryMetadata failed:',
                    response.status,
                    response.statusText
                )
                return this.transformResult()
            })
            .then(results => {
                return this.transformResult(results)
            })
            .catch(error => {
                this.logger.error('Error querying metadata: ', error)
                return this.transformResult()
            })

        return result
    }

    /**
     * Search over the Services using a query.
     * @param  {SearchQuery} query Query to filter the Services.
     * @return {Promise<QueryResult>}
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
                this.logger.error(
                    'query services from metadata failed:',
                    response.status,
                    response.statusText
                )
            })
            .catch(error => {
                this.logger.error('Error querying service metadata: ', error)
                return []
            })

        return result
    }

    /**
     * Search over the DDOs using a query.
     * @param  {SearchQuery} query Query to filter the DDOs.
     * @return {Promise<QueryResult>}
     */
    public async queryMetadataByText(query: SearchQuery): Promise<QueryResult> {
        const fullUrl = new URL(`${this.url}${apiPath}/query`)
        fullUrl.searchParams.append('text', query.text)
        fullUrl.searchParams.append(
            'sort',
            decodeURIComponent(JSON.stringify(query.sort))
        )
        fullUrl.searchParams.append('offset', query.offset.toString())
        fullUrl.searchParams.append('page', query.page.toString())
        const result: QueryResult = await this.nevermined.utils.fetch
            .get(fullUrl)
            .then((response: any) => {
                if (response.ok) {
                    return response.json() as DDO[]
                }
                this.logger.log(
                    'queryMetadataByText failed:',
                    response.status,
                    response.statusText
                )
                return this.transformResult()
            })
            .then(results => {
                return this.transformResult(results)
            })
            .catch(error => {
                this.logger.error('Error querying metadata by text: ', error)
                return this.transformResult()
            })

        return result
    }

    /**
     * Update a DDO in Metadata.
     * @param  {DDO} ddo DDO to be stored.
     * @return {Promise<DDO>} Final DDO.
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
                this.logger.error(
                    'updateDDO failed:',
                    response.status,
                    response.statusText,
                    ddo
                )
                return null as DDO
            })
            .then((response: DDO) => {
                return new DDO(response) as DDO
            })
            .catch(error => {
                this.logger.error('Error updating metadata: ', error)
                return null as DDO
            })

        return result
    }

    /**
     * Stores a DDO in Metadata.
     * @param  {DDO} ddo DDO to be stored.
     * @return {Promise<DDO>} Final DDO.
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
                this.logger.error(
                    'storeDDO failed:',
                    response.status,
                    response.statusText,
                    ddo
                )
                return null as DDO
            })
            .then((response: DDO) => {
                return new DDO(response) as DDO
            })
            .catch(error => {
                this.logger.error('Error storing metadata: ', error)
                return null as DDO
            })

        return result
    }

    /**
     * Retrieves a DDO by DID.
     * @param  {DID | string} did DID of the asset.
     * @return {Promise<DDO>} DDO of the asset.
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
                this.logger.log(
                    'retrieveDDO failed:',
                    response.status,
                    response.statusText,
                    did
                )
                return null as DDO
            })
            .then((response: DDO) => {
                return new DDO(response) as DDO
            })
            .catch(error => {
                this.logger.error('Error retrieving metadata: ', error)
                return null as DDO
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
     * @param  {DID | string} did DID of the asset.
     * @return {Promise<DDO>} DDO of the asset.
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
                this.logger.log(
                    'retrieve DDO status failed:',
                    response.status,
                    response.statusText,
                    did
                )
                return null as DDOStatus
            })
            .then((response: DDOStatus) => {
                return response as DDOStatus
            })
            .catch(error => {
                this.logger.error('Error fetching status of DDO: ', error)
                return null as DDOStatus
            })

        return result
    }

    /**
     * Retrieves a service by its agreementId.
     * @param  {string} agreementId agreementId of the service.
     * @return {Promise<ServiceSecondary>} Service object.
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
                this.logger.log(
                    'retrieveService failed:',
                    response.status,
                    response.statusText,
                    agreementId
                )
                return null as ServiceSecondary
            })
            .then((response: ServiceSecondary) => {
                return response as ServiceSecondary
            })
            .catch(error => {
                this.logger.error('Error retrieving service: ', error)
                return null as ServiceSecondary
            })

        return result
    }

    /**
     *
     * @param {agreementId<string>} agreementId of the service.
     * @param {agreement<ServiceSecondary>} stores the Service object with its agreementId as
     * @returns the newly stored service object
     */
    public async storeService(
        agreementId: string,
        agreement: ServiceSecondary
    ): Promise<ServiceSecondary> {
        const fullUrl = `${this.url}${servicePath}`
        agreement['agreementId'] = agreementId
        const result: ServiceSecondary = await this.nevermined.utils.fetch
            .post(fullUrl, JSON.stringify(agreement))
            .then((response: any) => {
                if (response.ok) {
                    return response.json()
                }
                this.logger.error(
                    'storeService failed:',
                    response.status,
                    response.statusText,
                    agreement
                )
                return null as ServiceSecondary
            })
            .then((response: ServiceSecondary) => {
                return response as ServiceSecondary
            })
            .catch(error => {
                this.logger.error('Error storing service: ', error)
                throw new Error(error)
            })
        return result
    }

    public getServiceEndpoint(did: DID) {
        return `${this.url}${apiPath}/did:nv:${did.getId()}`
    }

    private transformResult(
        { results, page, total_pages: totalPages, total_results: totalResults }: any = {
            result: [],
            page: 0,
            total_pages: 0, // eslint-disable-line @typescript-eslint/camelcase
            total_results: 0 // eslint-disable-line @typescript-eslint/camelcase
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
