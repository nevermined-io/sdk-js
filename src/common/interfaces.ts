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
  offset?: number
  page?: number
  text?: string
  query?: unknown
  sort?: unknown
  show_unlisted?: boolean
  appId?: string
}
