import { SearchQuery } from './interfaces'
import { URL } from 'whatwg-url'

export const buildQuery = (url: string, query: SearchQuery) => {
    const fullUrl = new URL(url)

    if (!query) {
        return fullUrl
    }

    fullUrl.searchParams.append('text', query.text)
    fullUrl.searchParams.append('sort', decodeURIComponent(JSON.stringify(query.sort)))
    fullUrl.searchParams.append('offset', query.offset.toString())
    fullUrl.searchParams.append('page', query.page.toString())

    return fullUrl
}
