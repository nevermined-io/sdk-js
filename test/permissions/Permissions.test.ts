import { assert, expect, spy, use } from 'chai'
import { faker } from '@faker-js/faker'
import spies from 'chai-spies'
import { Nevermined, Permission, PermissionType, NewPermission } from '../../src'
import { MarketplaceResults } from '../../src/common/interfaces'
import { Permissions } from '../../src/permissions/Permissions'
import config from '../config'

use(spies)

const reponsify = async data => ({
    ok: true,
    json: () => Promise.resolve(data)
})

describe('Permissions', () => {
    let nevermined: Nevermined
    let permissions: Permissions
    let newPermission: NewPermission
    let permission: Permission
    let permissionsResults: MarketplaceResults<Permission>

    beforeEach(async () => {
        nevermined = await Nevermined.getInstance(config)
        permissions = nevermined.permissions // eslint-disable-line prefer-destructuring

        newPermission = {
            userId: faker.datatype.uuid(),
            type: [PermissionType.Read, PermissionType.Update, PermissionType.Delete],
            issuer: '0x610D9314EDF2ced7681BA1633C33fdb8cF365a12',
            holder: '0x37BB53e3d293494DE59fBe1FF78500423dcFd43B'
        }

        permission = {
            ...newPermission,
            id: `pe-${faker.datatype.uuid()}`,
            issuanceDate: faker.date.recent()
        }

        /* eslint-disable @typescript-eslint/camelcase */
        permissionsResults = {
            page: 1,
            results: [permission],
            total_pages: 1,
            total_results: 1
        }
    })

    afterEach(() => {
        spy.restore()
    })

    it('should create a permission', async () => {
        spy.on(nevermined.utils.fetch, 'post', () => {
            return reponsify(permission)
        })

        const result = await permissions.create(newPermission)

        assert.equal(result, permission)
    })

    it('should get a permission by id', async () => {
        spy.on(nevermined.utils.fetch, 'get', () => {
            return reponsify(permission)
        })

        const result = await permissions.findOneById(permission.id)

        assert.equal(result, permission)
    })

    it('should get permissions by userId', async () => {
        spy.on(nevermined.utils.fetch, 'get', () => {
            return reponsify(permissionsResults)
        })

        const result = await permissions.findManyByUserId(permission.userId)

        assert.equal(result, permissionsResults)
    })

    it('should get permissions by userId and type', async () => {
        spy.on(nevermined.utils.fetch, 'get', () => {
            return reponsify(permissionsResults)
        })

        const result = await permissions.findManyByUserIdAndType(
            permission.userId,
            PermissionType.Read
        )

        assert.equal(result, permissionsResults)
    })

    it('should update a permission by id', async () => {
        const updatedPermission = { ...permission, type: [PermissionType.Admin] }

        spy.on(nevermined.utils.fetch, 'put', () => {
            return reponsify(updatedPermission)
        })

        const result = await permissions.updateOneById(permission.id, {
            type: updatedPermission.type
        })

        assert.equal(result, updatedPermission)
    })

    it('should delete a permission by id', async () => {
        const deletePermissionSpy = spy.on(nevermined.utils.fetch, 'delete', () => {
            return reponsify(undefined)
        })

        await permissions.deleteOneById(permission.id)

        expect(deletePermissionSpy).to.be.called()
    })
})
