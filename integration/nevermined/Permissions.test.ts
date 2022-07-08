import { assert } from 'chai'
import { config } from '../config'
import { Nevermined, Account, NewPermission, PermissionType } from '../../src'
import { sleep } from '../utils/utils'

describe('Permissions', () => {
    let nevermined: Nevermined
    let account1: Account
    let account2: Account
    let newPermission: NewPermission
    let id: string

    before(async () => {
        nevermined = await Nevermined.getInstance(config)
        ;[account1, account2] = await nevermined.accounts.list()

        //TODO admin token which will expire within 3 years. In the future an admin account will be created in elasticsearch directly to run theses tests
        config.marketplaceAuthToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweGUyREQwOWQ3MTlEYTg5ZTVhM0QwRjI1NDljN0UyNDU2NmU5NDcyNjAiLCJzdWIiOiJ1LWU2YzI2NDhjLTIwZjktNDJlMC1iMWZlLWZjZWEwNzA4ODY3NyIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTY1MTI0ODM1NCwiZXhwIjoxNzUxMjUxOTU0fQ.p9fr_c_HVlJzY1cJSGDod1zMdhRCRWdExOB_UxMDrKg'

        const userProfile = await nevermined.profiles.findOneByAddress(account1.getId())

        newPermission = {
            userId: userProfile.userId,
            type: [PermissionType.Read, PermissionType.Update, PermissionType.Delete],
            issuer: account2.getId(),
            holder: userProfile.addresses[0]
        }
    })

    it('should create a permission', async () => {
        const response = await nevermined.permissions.create(newPermission)

        id = response.id // eslint-disable-line prefer-destructuring

        assert.deepEqual(response, {
            ...newPermission,
            issuanceDate: response.issuanceDate,
            id
        })
    })

    it('should get a permission by id', async () => {
        const response = await nevermined.permissions.findOneById(id)

        assert.deepEqual(response, {
            ...newPermission,
            issuanceDate: response.issuanceDate,
            id
        })
    })

    it('should get permissions by userId', async () => {
        await sleep(1000)
        const response = await nevermined.permissions.findManyByUserId(
            newPermission.userId
        )

        /* eslint-disable @typescript-eslint/naming-convention */
        assert.deepEqual(response, {
            page: 1,
            total_pages: response.total_pages,
            total_results: response.total_results,
            results: [
                { ...newPermission, issuanceDate: response.results[0].issuanceDate, id }
            ]
        })
    })

    it('should get permissions by userId and type', async () => {
        await sleep(1000)
        const response = await nevermined.permissions.findManyByUserIdAndType(
            newPermission.userId,
            PermissionType.Read
        )

        /* eslint-disable @typescript-eslint/naming-convention */
        assert.deepEqual(response, {
            page: 1,
            total_pages: response.total_pages,
            total_results: response.total_results,
            results: [
                { ...newPermission, issuanceDate: response.results[0].issuanceDate, id }
            ]
        })
    })

    it('should update a permission by id', async () => {
        const response = await nevermined.permissions.updateOneById(id, {
            type: [PermissionType.Read]
        })

        assert.deepEqual(response, {
            ...newPermission,
            id,
            type: response.type,
            issuanceDate: response.issuanceDate
        })
    })

    it('should delete a permission by id', async () => {
        await nevermined.permissions.deleteOneById(id)

        await sleep(1000)

        const response = await nevermined.permissions.findManyByUserId(
            newPermission.userId
        )

        /* eslint-disable @typescript-eslint/naming-convention */
        assert.deepEqual(response, {
            page: response.page,
            total_pages: response.total_pages,
            total_results: response.total_results,
            results: []
        })
    })
})
