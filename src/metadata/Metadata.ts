import { URL } from 'whatwg-url'
import { DDO } from '../ddo/DDO'
import DID from '../ocean/DID'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

const apiPath = '/api/v1/metadata/assets/ddo'

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
    sort?: { [jsonPath: string]: number }
}

/**
 * Provides a interface with Metadata.
 * Metadata provides an off-chain database store for metadata about data assets.
 */
export class Metadata extends Instantiable {
    private get url() {
        return this.config.metadataUri
    }

    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }

    public async getVersionInfo() {
        return (await this.ocean.utils.fetch.get(this.url)).json()
    }

    public async getAccessUrl(accessToken: any, payload: any): Promise<string> {
        const accessUrl: string = await this.ocean.utils.fetch
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
        const result: QueryResult = await this.ocean.utils.fetch
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
                this.logger.error('Error fetching querying metadata: ', error)
                return this.transformResult()
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
        const result: QueryResult = await this.ocean.utils.fetch
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
                this.logger.error('Error fetching querying metadata by text: ', error)
                return this.transformResult()
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
        const result: DDO = await this.ocean.utils.fetch
            .post(fullUrl, DDO.serialize(ddo))
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
                this.logger.error('Error fetching querying metadata: ', error)
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
        const result = await this.ocean.utils.fetch
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
                this.logger.error('Error fetching querying metadata: ', error)
                return null as DDO
            })

        return result
    }

    public async retrieveDDOByUrl(metadataServiceEndpoint?: string) {
        return this.retrieveDDO(undefined, metadataServiceEndpoint)
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
