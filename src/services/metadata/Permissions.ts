import { Permission } from '@zerodev/sdk'
import { buildQuery, MarketplaceApi, HttpError, ApiError } from '@/sdk'
import { NewPermission, SearchQuery, MarketplaceResults, PermissionType } from '@/types/MetadataTypes'

const permissionPath = '/api/v1/permissions'

export class Permissions extends MarketplaceApi {
  /**
   * Create Permission
   */
  public async create(newPermission: NewPermission): Promise<Permission> {
    const fullUrl = `${this.url}${permissionPath}`
    try {
      const response = await this.nevermined.utils.fetch.post(
        fullUrl,
        JSON.stringify(newPermission),
        {
          Authorization: `Bearer ${this.config.marketplaceAuthToken}`,
        },
      )

      if (response.ok) {
        return response.json() as Promise<Permission>
      }

      throw new HttpError(
        `Create permission fail - ${response.statusText} ${response.url}`,
        response.status,
      )
    } catch (error) {
      throw new ApiError(error)
    }
  }

  /**
   * Get a permission by Id
   */
  public async findOneById(id: string): Promise<Permission> {
    const fullUrl = `${this.url}${permissionPath}/${id}`

    try {
      const response = await this.nevermined.utils.fetch.get(fullUrl)

      if (response.ok) {
        return response.json() as Promise<Permission>
      }

      throw new HttpError(
        `Find permission with id ${id} fail - ${response.statusText} ${response.url}`,
        response.status,
      )
    } catch (error) {
      throw new ApiError(error)
    }
  }

  /**
   * Get permissions by userId
   */
  public async findManyByUserId(
    userId: string,
    query?: SearchQuery,
  ): Promise<MarketplaceResults<Permission>> {
    const fullUrl = buildQuery(`${this.url}${permissionPath}/user/${userId}`, query)

    try {
      const response = await this.nevermined.utils.fetch.get(fullUrl)

      if (response.ok) {
        return response.json() as Promise<MarketplaceResults<Permission>>
      }

      throw new HttpError(
        `Find permissions with userId ${userId} fail - ${response.statusText} ${response.url}`,
        response.status,
      )
    } catch (error) {
      throw new ApiError(error)
    }
  }

  /**
   * Get permissions by userId and specific type
   */
  public async findManyByUserIdAndType(
    userId: string,
    type: PermissionType,
    query?: SearchQuery,
  ): Promise<MarketplaceResults<Permission>> {
    const fullUrl = buildQuery(`${this.url}${permissionPath}/user/${userId}/${type}`, query)

    try {
      const response = await this.nevermined.utils.fetch.get(fullUrl)

      if (response.ok) {
        return response.json() as Promise<MarketplaceResults<Permission>>
      }

      throw new HttpError(
        `Find permissions with userId ${userId} and type ${type} fail - ${response.statusText} ${response.url}`,
        response.status,
      )
    } catch (error) {
      throw new ApiError(error)
    }
  }

  /**
   * Update a Permission by id
   */
  public async updateOneById(id: string, permission: Partial<Permission>): Promise<Permission> {
    const fullUrl = `${this.url}${permissionPath}/${id}`

    try {
      const response = await this.nevermined.utils.fetch.put(fullUrl, JSON.stringify(permission), {
        Authorization: `Bearer ${this.config.marketplaceAuthToken}`,
      })

      if (response.ok) {
        return response.json() as Promise<Permission>
      }

      throw new HttpError(
        `Update permission with ${id} fail - ${response.statusText} ${response.url}`,
        response.status,
      )
    } catch (error) {
      throw new ApiError(error)
    }
  }

  /**
   * Delele a bookmark by id
   */
  public async deleteOneById(id: string): Promise<void> {
    const fullUrl = `${this.url}${permissionPath}/${id}`

    try {
      const response = await this.nevermined.utils.fetch.delete(fullUrl, undefined, {
        Authorization: `Bearer ${this.config.marketplaceAuthToken}`,
      })

      if (response.ok) {
        return
      }

      throw new HttpError(
        `Delete permission with id ${id} fail - ${response.statusText} ${response.url}`,
        response.status,
      )
    } catch (error) {
      throw new ApiError(error)
    }
  }
}
