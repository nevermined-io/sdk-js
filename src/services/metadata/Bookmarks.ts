import { MarketplaceApi } from '../../services'
import { NewBookmark, Bookmark } from './types'
import { HttpError, ApiError } from '../../errors'
import { MarketplaceResults } from '../../common/interfaces'
import { SearchQuery } from '../../common/interfaces'
import { buildQuery } from '../../common/helpers'

const bookmarkPath = '/api/v1/ugc/bookmarks'

export class Bookmarks extends MarketplaceApi {
    /**
     * Create bookmark
     */
    public async create(newBookmark: NewBookmark): Promise<Bookmark> {
        const fullUrl = `${this.url}${bookmarkPath}`
        try {
            const response = await this.nevermined.utils.fetch.post(
                fullUrl,
                JSON.stringify(newBookmark),
                {
                    Authorization: `Bearer ${this.config.marketplaceAuthToken}`
                }
            )

            if (response.ok) {
                return response.json() as Promise<Bookmark>
            }

            throw new HttpError(
                `Create bookmark fail - ${response.statusText} ${response.url}`,
                response.status
            )
        } catch (error) {
            throw new ApiError(error)
        }
    }

    /**
     * Get a bookmark by Id
     */
    public async findOneById(id: string): Promise<Bookmark> {
        const fullUrl = `${this.url}${bookmarkPath}/${id}`

        try {
            const response = await this.nevermined.utils.fetch.get(fullUrl)

            if (response.ok) {
                return response.json() as Promise<Bookmark>
            }

            throw new HttpError(
                `Find bookmark with id ${id} fail - ${response.statusText} ${response.url}`,
                response.status
            )
        } catch (error) {
            throw new ApiError(error)
        }
    }

    /**
     * Get bookmarks by userId
     */
    public async findManyByUserId(
        userId: string,
        query?: SearchQuery
    ): Promise<MarketplaceResults<Bookmark>> {
        const fullUrl = buildQuery(`${this.url}${bookmarkPath}/user/${userId}`, query)

        try {
            const response = await this.nevermined.utils.fetch.get(fullUrl)

            if (response.ok) {
                return response.json() as Promise<MarketplaceResults<Bookmark>>
            }

            throw new HttpError(
                `Find bookmarks with userId ${userId} fail - ${response.statusText} ${response.url}`,
                response.status
            )
        } catch (error) {
            throw new ApiError(error)
        }
    }

    /**
     * Update a bookmark by id
     */
    public async updateOneById(
        id: string,
        bookmark: Partial<Bookmark>
    ): Promise<Bookmark> {
        const fullUrl = `${this.url}${bookmarkPath}/${id}`

        try {
            const response = await this.nevermined.utils.fetch.put(
                fullUrl,
                JSON.stringify(bookmark),
                {
                    Authorization: `Bearer ${this.config.marketplaceAuthToken}`
                }
            )

            if (response.ok) {
                return response.json() as Promise<Bookmark>
            }

            throw new HttpError(
                `Update bookmark with ${id} fail - ${response.statusText} ${response.url}`,
                response.status
            )
        } catch (error) {
            throw new ApiError(error)
        }
    }

    /**
     * Delele a bookmark by id
     */
    public async deleteOneById(id: string): Promise<void> {
        const fullUrl = `${this.url}${bookmarkPath}/${id}`

        try {
            const response = await this.nevermined.utils.fetch.delete(
                fullUrl,
                undefined,
                {
                    Authorization: `Bearer ${this.config.marketplaceAuthToken}`
                }
            )

            if (response.ok) {
                return
            }

            throw new HttpError(
                `Delete bookmark with id ${id} fail - ${response.statusText} ${response.url}`,
                response.status
            )
        } catch (error) {
            throw new ApiError(error)
        }
    }
}
