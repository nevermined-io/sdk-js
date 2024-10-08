import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { DDO } from '../../ddo/DDO'
import { NvmAccount } from '../../models/NvmAccount'
import { QueryResult } from '../../services/metadata/MetadataService'
import { MetaDataMain, Service, ServiceType } from '../../types/DDOTypes'
import { EventOptions } from '../../types/EventTypes'
import { NeverminedNFT1155Type, NeverminedNFT721Type } from '../../types/GeneralTypes'
import { SearchQuery } from '../../types/MetadataTypes'
import { didPrefixed } from '../../utils/ConversionTypeHelpers'
import { DID } from '../DID'

const EMPTY_RESULT: QueryResult = {
  results: [],
  page: 1,
  totalPages: 0,
  totalResults: { value: 0, relation: 'eq' },
}

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
   * Search over the assets using a keyword.
   * @param did - DID of the asset.
   * @param metadataServiceEndpoint - Metadata service endpoint.
   * @returns DDO of the asset.
   */
  public async byDID(did: DID | string, metadataServiceEndpoint?: string): Promise<DDO> {
    return this.nevermined.services.metadata.retrieveDDO(did, metadataServiceEndpoint)
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
            filter: [{ term: { '_nvm.appId': query.appId } }],
          },
        },
        offset: query.offset,
        page: query.page,
        sort: query.sort,
        show_unlisted: query.show_unlisted,
      }
    }
    return this.nevermined.services.metadata.queryMetadata(query)
  }

  /**
   * Search over the assets using a keyword.
   * @param text - Text to filter the assets.
   * @returns A list of {@link DDO}s.
   */
  public async byText(text: string, offset = 100, page = 1, sort = 'desc', appId?: string) {
    const query: SearchQuery = {
      query: {
        simple_query_string: { query: `${text}*` },
      },
      offset,
      page,
      sort: {
        created: sort,
      },
      appId,
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
    appId?: string,
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
                    'service.attributes.additionalInformation.priceHighestDenomination': {
                      gte: minPrice,
                      lte: maxPrice,
                    },
                  },
                },
              ],
            },
          },
        },
      },
      offset,
      page,
      sort: {
        created: sort,
      },
      appId,
    }
    return this.query(query)
  }

  /**
   * Search for all subscription DDOs with `contractAddress`
   *
   * @param contractAddress - The address of the subscription contract
   * @param offset - The number of results to return
   * @param customNestedQueries - Custom nested queries to add to the search
   * @param page
   * @param sort - The sort order
   * @param nftType - The nftType
   * @param appId - The appId used to filter the results
   *
   * @returns {Promise<QueryResult> }
   */
  public async bySubscriptionContractAddress(
    contractAddress: string,
    nftType: string,
    customNestedQueries?: SearchQuery['query'][],
    offset = 100,
    page = 1,
    sort = 'desc',
    appId?: string,
  ): Promise<QueryResult> {
    let search: SearchQuery['query'][] = [
      {
        nested: {
          path: 'service',
          query: {
            bool: {
              filter: [
                { match: { 'service.type': 'metadata' } },
                nftType
                  ? {
                      match: {
                        'service.attributes.main.nftType': nftType,
                      },
                    }
                  : {
                      bool: {
                        should: [
                          {
                            match: {
                              'service.attributes.main.nftType':
                                NeverminedNFT721Type.nft721Subscription,
                            },
                          },
                          {
                            match: {
                              'service.attributes.main.nftType':
                                NeverminedNFT1155Type.nft1155Credit,
                            },
                          },
                        ],
                      },
                    },
              ],
            },
          },
        },
      },
      {
        nested: {
          path: 'service',
          query: {
            bool: {
              must: [
                { match: { 'service.type': 'nft-sales' } },
                {
                  match: {
                    'service.attributes.serviceAgreementTemplate.conditions.parameters.value':
                      contractAddress,
                  },
                },
              ],
            },
          },
        },
      },
    ]

    if (customNestedQueries?.length) {
      search = search.concat(customNestedQueries)
    }

    const query: SearchQuery = {
      query: {
        bool: {
          must: search,
        },
      },
      offset,
      page,
      sort: {
        created: sort,
      },
      appId,
    }
    return this.query(query)
  }

  /**
   * Search of all subscriptions created by `account`
   *
   * @param account - The account that created the subscriptions.
   * @param customNestedQueries - Custom nested queries to add to the search
   * @param offset - The number of results to return
   * @param page
   * @param sort - The sort order
   * @param nftType - The nftType
   * @param appId - The appId used to filter the results
   *
   * @returns {Promise<QueryResult>}
   */
  public async subscriptionsCreated(
    account: NvmAccount,
    nftType?: NeverminedNFT721Type | NeverminedNFT1155Type,
    customNestedQueries?: SearchQuery['query'][],
    offset = 100,
    page = 1,
    sort = 'desc',
    appId?: string,
  ): Promise<QueryResult> {
    let search: SearchQuery['query'][] = [
      {
        nested: {
          path: 'service',
          query: {
            bool: {
              filter: [
                { match: { 'service.type': 'metadata' } },
                {
                  match: {
                    'service.attributes.main.type': 'subscription',
                  },
                },

                nftType
                  ? {
                      match: {
                        'service.attributes.main.nftType': nftType,
                      },
                    }
                  : {
                      bool: {
                        should: [
                          {
                            match: {
                              'service.attributes.main.nftType':
                                NeverminedNFT721Type.nft721Subscription,
                            },
                          },
                          {
                            match: {
                              'service.attributes.main.nftType':
                                NeverminedNFT1155Type.nft1155Credit,
                            },
                          },
                        ],
                      },
                    },
              ],
            },
          },
        },
      },
      {
        match: {
          'proof.creator': account.getId(),
        },
      },
    ]

    if (customNestedQueries?.length) {
      search = search.concat(customNestedQueries)
    }

    const query: SearchQuery = {
      query: {
        bool: {
          must: search,
        },
      },
      offset,
      page,
      sort: {
        created: sort,
      },
      appId,
    }
    return this.query(query)
  }

  /**
   * Search of all subscriptions purchased by `account`
   *
   * @param account - The account that purchased the subscriptions.
   * @param customNestedQueries - Custom nested queries to add to the search
   * @param offset - The number of results to return
   * @param page
   * @param sort - The sort order
   * @param nftType - The nftType
   * @param appId - The appId used to filter the results
   *
   * @returns {Promise<QueryResult>}
   */
  public async subscriptionsPurchased(
    account: NvmAccount,
    nftType?: NeverminedNFT721Type | NeverminedNFT1155Type,
    ercType?: 721 | 1155,
    customNestedQueries?: SearchQuery['query'][],
    offset = 100,
    page = 1,
    sort = 'desc',
    appId?: string,
  ): Promise<QueryResult> {
    // get on chain dids for nft bought
    const eventOptions: EventOptions = {
      eventName: 'Fulfilled',
      filterSubgraph: {
        where: {
          _receiver: account.getId(),
        },
      },
      filterJsonRpc: {
        _receiver: account.getId(),
      },
      result: {
        _did: true,
      },
    }

    const events =
      ercType === 721
        ? await this.nevermined.keeper.conditions.transferNft721Condition.events?.getPastEvents(
            eventOptions,
          )
        : await this.nevermined.keeper.conditions.transferNftCondition.events?.getPastEvents(
            eventOptions,
          )

    const dids = events?.map((e) => e._did || e.args._did).map((did) => didPrefixed(did))

    let search: SearchQuery['query'][] = [
      {
        nested: {
          path: 'service',
          query: {
            bool: {
              filter: [
                { match: { 'service.type': 'metadata' } },
                {
                  match: {
                    'service.attributes.main.type': 'subscription',
                  },
                },
                nftType
                  ? {
                      match: {
                        'service.attributes.main.nftType': nftType,
                      },
                    }
                  : {
                      bool: {
                        should: [
                          {
                            match: {
                              'service.attributes.main.nftType':
                                NeverminedNFT721Type.nft721Subscription,
                            },
                          },
                          {
                            match: {
                              'service.attributes.main.nftType':
                                NeverminedNFT1155Type.nft1155Credit,
                            },
                          },
                        ],
                      },
                    },
              ],
            },
          },
        },
      },
    ]

    if (customNestedQueries?.length) {
      search = search.concat(customNestedQueries)
    }

    const query: SearchQuery = {
      query: {
        bool: {
          must: search,
          filter: {
            terms: {
              id: dids,
            },
          },
        },
      },
      offset,
      page,
      sort: {
        created: sort,
      },
      appId,
    }
    return this.query(query)
  }

  /**
   * Search of all services belonging to a subscription nft contract
   *
   * @param nftContractAddress - The NFT contract address of the subscription.
   * @param customNestedQueries - Custom nested queries to add to the search
   * @param offset - The number of results to return
   * @param page
   * @param sort - The sort order
   * @param appId - The appId used to filter the results
   *
   * @returns {Promise<QueryResult>}
   */
  public async servicesByNftContract(
    nftContractAddress: string,
    nftType?: NeverminedNFT721Type | NeverminedNFT1155Type,
    tokenId?: string,
    customNestedQueries?: SearchQuery['query'][],
    offset = 100,
    page = 1,
    sort = 'desc',
    appId?: string,
  ) {
    let search: SearchQuery['query'][] = [
      {
        nested: {
          path: 'service',
          query: {
            bool: {
              filter: [
                { match: { 'service.type': 'metadata' } },
                nftType
                  ? {
                      match: {
                        'service.attributes.main.nftType': nftType,
                      },
                    }
                  : {
                      bool: {
                        should: [
                          {
                            match: {
                              'service.attributes.main.nftType':
                                NeverminedNFT721Type.nft721Subscription,
                            },
                          },
                          {
                            match: {
                              'service.attributes.main.nftType':
                                NeverminedNFT1155Type.nft1155Credit,
                            },
                          },
                        ],
                      },
                    },
                {
                  exists: {
                    field: 'service.attributes.main.webService',
                  },
                },
              ],
            },
          },
        },
      },
      {
        nested: {
          path: 'service',
          query: {
            bool: {
              must: [
                { match: { 'service.type': 'nft-access' } },
                {
                  match: {
                    'service.attributes.serviceAgreementTemplate.conditions.parameters.value':
                      nftContractAddress,
                  },
                },
                tokenId && {
                  match: {
                    'service.attributes.serviceAgreementTemplate.conditions.parameters.value':
                      tokenId,
                  },
                },
              ],
            },
          },
        },
      },
    ]

    if (customNestedQueries?.length) {
      search = search.concat(customNestedQueries)
    }

    const query: SearchQuery = {
      query: {
        bool: {
          must: search,
        },
      },
      offset,
      page,
      sort: {
        created: sort,
      },
      appId,
    }
    return this.query(query)
  }

  /**
   * Search of all services belonging to a subscription
   *
   * @param subscriptionDid - The DID of the subscription.
   * @param customNestedQueries - Custom nested queries to add to the search
   * @param offset - The number of results to return
   * @param page
   * @param sort - The sort order
   * @param appId - The appId used to filter the results
   *
   * @returns {Promise<QueryResult>}
   */
  public async servicesBySubscription(
    subscriptionDid: string,
    nftType?: NeverminedNFT721Type | NeverminedNFT1155Type,
    customNestedQueries?: SearchQuery['query'][],
    offset = 100,
    page = 1,
    sort = 'desc',
    appId?: string,
  ): Promise<QueryResult> {
    const subscriptionDDO = await this.byDID(subscriptionDid)

    // return empty result
    if (!subscriptionDDO) {
      return EMPTY_RESULT
    }

    // get contract address for subscription
    let nftSalesService: Service<'nft-sales'>
    try {
      nftSalesService = subscriptionDDO.findServiceByType('nft-sales')
    } catch (e) {
      return EMPTY_RESULT
    }

    const nftContractAddress = DDO.getNftContractAddressFromService(nftSalesService)

    return this.servicesByNftContract(
      nftContractAddress,
      nftType,
      subscriptionDid.replace('did:nv:', ''),
      customNestedQueries,
      offset,
      page,
      sort,
      appId,
    )
  }

  /**
   * Search of all datasets belonging to a subscription NFT contract
   *
   * @param nftContractAddress - The DID of the subscription.
   * @param customNestedQueries - Custom nested queries to add to the search
   * @param offset - The number of results to return
   * @param page
   * @param sort - The sort order
   * @param appId - The appId used to filter the results
   *
   * @returns {Promise<QueryResult>}
   */
  public async datasetsByNftContract(
    nftContractAddress: string,
    nftType?: NeverminedNFT721Type | NeverminedNFT1155Type,
    tokenId?: string,
    customNestedQueries?: SearchQuery['query'][],
    offset = 100,
    page = 1,
    sort = 'desc',
    appId?: string,
  ): Promise<QueryResult> {
    let search: SearchQuery['query'][] = [
      {
        nested: {
          path: 'service',
          query: {
            bool: {
              filter: [
                { match: { 'service.type': 'metadata' } },
                nftType
                  ? {
                      match: {
                        'service.attributes.main.nftType': nftType,
                      },
                    }
                  : {
                      bool: {
                        should: [
                          {
                            match: {
                              'service.attributes.main.nftType':
                                NeverminedNFT721Type.nft721Subscription,
                            },
                          },
                          {
                            match: {
                              'service.attributes.main.nftType':
                                NeverminedNFT1155Type.nft1155Credit,
                            },
                          },
                        ],
                      },
                    },
                {
                  bool: {
                    must_not: [
                      {
                        match: {
                          'service.attributes.main.type': 'subscription',
                        },
                      },
                      {
                        match: {
                          'service.attributes.main.type': 'service',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
      {
        nested: {
          path: 'service',
          query: {
            bool: {
              must: [
                { match: { 'service.type': 'nft-access' } },
                {
                  match: {
                    'service.attributes.serviceAgreementTemplate.conditions.parameters.value':
                      nftContractAddress,
                  },
                },
                tokenId && {
                  match: {
                    'service.attributes.serviceAgreementTemplate.conditions.parameters.value':
                      tokenId,
                  },
                },
              ],
            },
          },
        },
      },
    ]

    if (customNestedQueries?.length) {
      search = search.concat(customNestedQueries)
    }

    const query: SearchQuery = {
      query: {
        bool: {
          must: search,
        },
      },
      offset,
      page,
      sort: {
        created: sort,
      },
      appId,
    }
    return this.query(query)
  }

  /**
   * Search of all datasets belonging to a subscription
   *
   * @param subscriptionDid - The DID of the subscription.
   * @param customNestedQueries - Custom nested queries to add to the search
   * @param offset - The number of results to return
   * @param page
   * @param sort - The sort order
   * @param appId - The appId used to filter the results
   *
   * @returns {Promise<QueryResult>}
   */
  public async datasetsBySubscription(
    subscriptionDid: string,
    nftType?: NeverminedNFT721Type | NeverminedNFT1155Type,
    customNestedQueries?: SearchQuery['query'][],
    offset = 100,
    page = 1,
    sort = 'desc',
    appId?: string,
  ): Promise<QueryResult> {
    const subscriptionDDO = await this.byDID(subscriptionDid)

    // return empty result
    if (!subscriptionDDO) {
      return EMPTY_RESULT
    }

    // get contract address for subscription
    let nftSalesService: Service<'nft-sales'>
    try {
      nftSalesService = subscriptionDDO.findServiceByType('nft-sales')
    } catch (e) {
      return EMPTY_RESULT
    }

    const nftContractAddress = DDO.getNftContractAddressFromService(nftSalesService)

    return this.datasetsByNftContract(
      nftContractAddress,
      nftType,
      subscriptionDid.replace('did:nv:', ''),
      customNestedQueries,
      offset,
      page,
      sort,
      appId,
    )
  }

  public async byType(
    assetType: MetaDataMain['type'] = 'agent',
    text?: string,
    offset = 100,
    page = 1,
    appId?: string,
  ) {
    const mustArray: unknown[] = []
    mustArray.push(assetTypeFilter(assetType))
    if (text) {
      mustArray.push(textFilter(text))
    }

    return this.query({
      query: {
        bool: {
          must: mustArray,
        },
      },
      sort: {
        created: 'desc',
      },
      page: page,
      offset: offset,
      appId,
    })
  }
}

export const assetTypeFilter = (assetType: MetaDataMain['type']) => {
  const filter: { [field: string]: unknown }[] = [
    {
      match: { 'service.type': 'metadata' },
    },
    {
      match: {
        'service.attributes.main.nftType': 'nft1155-credit',
      },
    },
  ]
  filter.push({
    match: {
      'service.attributes.main.type': assetType,
    },
  })

  return {
    nested: {
      path: ['service'],
      query: {
        bool: {
          filter,
        },
      },
    },
  }
}

export const textFilter = (searchInputText = '') => ({
  nested: {
    path: ['service'],
    query: {
      query_string: { query: `*${searchInputText}*`, fields: ['service.attributes.main.name'] },
    },
  },
})
