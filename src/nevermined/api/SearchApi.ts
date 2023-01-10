import { ServiceType } from '../../ddo'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { QueryResult } from '../../services'
import { SearchQuery } from '../../sdk'

/**
 * Nevermined Search API. It allows the search of assets registered in Nevermined ecosystems.
 * You can find more information about Nevermined Metadata here:
 * {@link https://docs.nevermined.io/docs/architecture/nevermined-data}
 */
export class SearchApi extends Instantiable {
    /**
     * Creates a new SearchApi
     * @param config - Configuration of the Nevermined instance
     * @returns {@link SearchApi}
     */
    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }

    /**
     * Search over the assets using a query.
     *
     * @remarks
     * If the `appId` is set in the search query results will be filtered
     * returning only DDOs for that appId
     *
     * @param query - Query to filter the assets.
     * @returns A list of {@link DDO}s matching the query
     */
    public async query(query: SearchQuery) {
        if (query.appId) {
            query = {
                query: {
                    bool: {
                        must: [query.query || { match_all: {} }],
                        filter: [{ term: { '_nvm.appId': query.appId } }]
                    }
                },
                offset: query.offset,
                page: query.page,
                sort: query.sort,
                show_unlisted: query.show_unlisted
            }
        }
        return this.nevermined.services.metadata.queryMetadata(query)
    }

    /**
     * Search over the assets using a keyword.
     * @param text - Text to filter the assets.
     * @returns A list of {@link DDO}s.
     */
    public async byText(
        text: string,
        offset = 100,
        page = 1,
        sort = 'desc',
        appId?: string
    ) {
        const query: SearchQuery = {
            query: {
                simple_query_string: { query: `${text}*` }
            },
            offset,
            page,
            sort: {
                created: sort
            },
            appId
        }
        return this.query(query)
    }

    /**
     * Query for assets by price.
     *
     * @example
     * ```ts
     * const results = await nevermined.search.byPrice(1, 20)
     * ```
     *
     * @param minPrice - The minimum price to search for.
     * @param maxPrice - The maximum price to search for.
     * @param serviceType - The name of the service. Defaults to all services.
     * @param offset -
     * @param page -
     * @param sort -
     * @param appId -
     * @returns
     */
    public async byPrice(
        minPrice: number,
        maxPrice: number,
        serviceType?: ServiceType,
        offset = 100,
        page = 1,
        sort = 'desc',
        appId?: string
    ): Promise<QueryResult> {
        const query: SearchQuery = {
            query: {
                nested: {
                    path: 'service',
                    query: {
                        bool: {
                            must: [
                                serviceType && { match: { 'service.type': serviceType } },
                                {
                                    range: {
                                        'service.attributes.additionalInformation.priceHighestDenomination':
                                            {
                                                gte: minPrice,
                                                lte: maxPrice
                                            }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            offset,
            page,
            sort: {
                created: sort
            },
            appId
        }
        return this.query(query)
    }
}
