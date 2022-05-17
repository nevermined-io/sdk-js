import { MarketplaceApi } from '../marketplace/MarketplaceAPI'
import { NewProfile, Profile } from '../profiles/Profiles.interfaces'

const profilePath = '/api/v1/metadata/profiles'

export class Profiles extends MarketplaceApi {
    /**
     * Create user profile
     */
    public async create(newProfile: NewProfile): Promise<Profile> {
        const fullUrl = `${this.url}${profilePath}`
        try {
            const response = await this.nevermined.utils.fetch.post(
                fullUrl,
                JSON.stringify(newProfile),
                {
                    Authorization: `Bearer ${this.config.marketplaceAuthToken}`
                }
            )

            if (response.ok) {
                return response.json() as Promise<Profile>
            }

            this.logger.error(
                'Create profile fail:',
                response.status,
                response.statusText,
                newProfile
            )

            return null
        } catch (error) {
            this.logger.error('Error creating profile: ', error)
            return null
        }
    }

    /**
     * Update user profile
     */
    public async update(userId: string, profile: Partial<NewProfile>): Promise<Profile> {
        const fullUrl = `${this.url}${profilePath}/${userId}`

        try {
            const response = await this.nevermined.utils.fetch.put(
                fullUrl,
                JSON.stringify(profile),
                {
                    Authorization: `Bearer ${this.config.marketplaceAuthToken}`
                }
            )

            if (response.ok) {
                return response.json() as Promise<Profile>
            }

            this.logger.error(
                'Update profile fail:',
                response.status,
                response.statusText,
                profile
            )

            return null
        } catch (error) {
            this.logger.error('Error updating profile: ', error)
            return null
        }
    }

    public async findOneByUserId(userId: string): Promise<Profile> {
        const fullUrl = `${this.url}${profilePath}/${userId}`

        try {
            const response = await this.nevermined.utils.fetch.get(fullUrl)

            if (response.ok) {
                return response.json() as Promise<Profile>
            }

            this.logger.error(
                `Find profile with userId ${userId} fail:`,
                response.status,
                response.statusText
            )

            return null
        } catch (error) {
            this.logger.error(`Error getting profile with userID ${userId}: `, error)
            return null
        }
    }

    public async findOneByAddress(address: string): Promise<Profile> {
        const fullUrl = `${this.url}${profilePath}/address/${address}`

        try {
            const response = await this.nevermined.utils.fetch.get(fullUrl)

            if (response.ok) {
                return response.json() as Promise<Profile>
            }

            this.logger.error(
                `Find profile with address ${address} fail:`,
                response.status,
                response.statusText
            )

            return null
        } catch (error) {
            this.logger.error(`Error getting profile with address ${address}: `, error)
            return null
        }
    }

    public async disableOneByUserId(userId: string): Promise<Profile> {
        const fullUrl = `${this.url}${profilePath}/${userId}`

        try {
            const response = await this.nevermined.utils.fetch.get(fullUrl)

            if (response.ok) {
                return response.json() as Promise<Profile>
            }

            this.logger.error(
                `Find profile with userId ${userId} fail:`,
                response.status,
                response.statusText
            )

            return null
        } catch (error) {
            this.logger.error(`Error getting profile with userID ${userId}: `, error)
            return null
        }
    }
}
