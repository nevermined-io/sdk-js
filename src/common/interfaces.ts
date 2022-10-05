interface SearchResults {
    value: number
    relation: 'eq' | 'gte'
}

export interface MarketplaceResults<Entity> {
    page: number
    results: Entity[]
    total_pages: number
    total_results: SearchResults
}

export interface SearchQuery {
    text?: string
    offset?: number
    page?: number
    query?: { [jsonPath: string]: any }
    sort?: { [jsonPath: string]: string }
    show_unlisted?: boolean
    appId?: string
}
