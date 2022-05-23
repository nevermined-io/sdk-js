export interface MarketplaceResults<Entity> {
    page: number
    results: Entity[]
    total_pages: number
    total_results: number
}
