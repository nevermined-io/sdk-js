import { SearchQuery } from './interfaces'
import { URL } from 'whatwg-url'

export const buildQuery = (url: string, query: SearchQuery) => {
  const fullUrl = new URL(url)

  if (!query) {
    return fullUrl
  }

  fullUrl.searchParams.append('sort', decodeURIComponent(JSON.stringify(query.sort)))
  fullUrl.searchParams.append('offset', query.offset.toString())
  fullUrl.searchParams.append('page', query.page.toString())

  return fullUrl
}

export const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}

export const jsonReplacer = (key, value) => {
  // Modify the value or return undefined to exclude the property
  return typeof value === 'bigint' ? value.toString() : value
}
