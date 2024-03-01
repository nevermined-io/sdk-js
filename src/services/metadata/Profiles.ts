import { MarketplaceApi } from './MarketplaceAPI'
import { NewProfile, Profile, ProfileRestricted } from './types'
import { HttpError, ApiError } from '../../errors'

const profilePath = '/api/v1/metadata/profiles'

export class Profiles extends MarketplaceApi {
  /**
   * Create user profile
   */
  public async create(newProfile: NewProfile): Promise<Profile> {
    const fullUrl = `${this.url}${profilePath}`
    try {
      const response = await this.nevermined.utils.fetch.post(fullUrl, JSON.stringify(newProfile), {
        Authorization: `Bearer ${this.config.marketplaceAuthToken}`,
      })

      if (response.ok) {
        return response.json() as Promise<Profile>
      }

      throw new HttpError(
        `Create profile fail - ${response.statusText} ${response.url}`,
        response.status,
      )
    } catch (error) {
      throw new ApiError(error)
    }
  }

  /**
   * Update user profile
   */
  public async update(userId: string, profile: Partial<NewProfile>): Promise<Profile> {
    const fullUrl = `${this.url}${profilePath}/${userId}`

    try {
      const response = await this.nevermined.utils.fetch.put(fullUrl, JSON.stringify(profile), {
        Authorization: `Bearer ${this.config.marketplaceAuthToken}`,
      })

      if (response.ok) {
        return response.json() as Promise<Profile>
      }

      throw new HttpError(
        `Update profile fail - ${response.statusText} ${response.url}`,
        response.status,
      )
    } catch (error) {
      throw new ApiError(error)
    }
  }

  public async findOneByUserId(userId: string): Promise<Profile> {
    const fullUrl = `${this.url}${profilePath}/${userId}`

    try {
      const response = await this.nevermined.utils.fetch.get(fullUrl, {
        Authorization: `Bearer ${this.config.marketplaceAuthToken}`,
      })

      if (response.ok) {
        return response.json() as Promise<Profile>
      }

      throw new HttpError(
        `Find profile with userId ${userId} fail - ${response.statusText} ${response.url}`,
        response.status,
      )
    } catch (error) {
      throw new ApiError(error)
    }
  }

  public async findOneByAddress(address: string): Promise<ProfileRestricted> {
    const fullUrl = `${this.url}${profilePath}/address/${address}`

    try {
      const response = await this.nevermined.utils.fetch.get(fullUrl)

      if (response.ok) {
        return response.json() as Promise<ProfileRestricted>
      }

      throw new HttpError(
        `Find profile with address ${address} fail - ${response.statusText} ${response.url}`,
        response.status,
      )
    } catch (error) {
      throw new ApiError(error)
    }
  }

  public async disableOneByUserId(userId: string): Promise<Profile> {
    const fullUrl = `${this.url}${profilePath}/${userId}`

    try {
      const response = await this.nevermined.utils.fetch.delete(fullUrl, undefined, {
        Authorization: `Bearer ${this.config.marketplaceAuthToken}`,
      })

      if (response.ok) {
        return response.json() as Promise<Profile>
      }

      throw new HttpError(
        `Disable profile with userId ${userId} fail - ${response.statusText} ${response.url}`,
        response.status,
      )
    } catch (error) {
      throw new ApiError(error)
    }
  }
}
