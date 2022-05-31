export interface MarketplaceResults<Entity> {
    page: number
    results: Entity[]
    total_pages: number
    total_results: number
}

export interface SearchQuery {
    text?: string
    offset?: number
    page?: number
    query: { [property: string]: string | number | string[] | number[] }
    sort?: { [jsonPath: string]: string }
    show_unlisted?: boolean
}
