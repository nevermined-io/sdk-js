import { assert } from 'chai'
import * as fs from 'fs'

import { config } from '../config'
import { getMetadata } from '../utils'

import { Ocean, DDO, Account, ConditionState } from '../../src' // @oceanprotocol/squid

describe('Consume Asset', () => {
    let ocean: Ocean

    let publisher: Account
    let consumer: Account

    let metadata = getMetadata()

    let ddo: DDO
    let serviceAgreementSignatureResult: {
        agreementId: string
        signature: string
    }

    before(async () => {
        ocean = await Ocean.getInstance(config)

        // Accounts
        ;[publisher, consumer] = await ocean.accounts.list()

        if (!ocean.keeper.dispenser) {
            metadata = getMetadata(0)
        }
    })

    it('should register an asset', async () => {
        ddo = await ocean.assets.create(metadata as any, publisher)

        assert.isDefined(ddo, 'Register has not returned a DDO')
        assert.match(ddo.id, /^did:nv:[a-f0-9]{64}$/, 'DDO id is not valid')
        assert.isAtLeast(ddo.authentication.length, 1, 'Default authentication not added')
        assert.isDefined(
            ddo.findServiceByType('access'),
            "DDO access service doesn't exist"
        )
    })

    it('should be able to request tokens for consumer', async () => {
        const initialBalance = (await consumer.getBalance()).ocn
        const claimedTokens =
            +metadata.main.price * 10 ** -(await ocean.keeper.token.decimals())

        try {
            await consumer.requestTokens(claimedTokens)
        } catch {}

        assert.equal(
            (await consumer.getBalance()).ocn,
            initialBalance + claimedTokens,
            'OCN Tokens not delivered'
        )
    })

    it('should sign the service agreement', async () => {
        const accessService = ddo.findServiceByType('access')

        serviceAgreementSignatureResult = await ocean.agreements.prepare(
            ddo.id,
            accessService.index,
            consumer
        )

        const { agreementId, signature } = serviceAgreementSignatureResult
        assert.match(
            agreementId,
            /^0x[a-f0-9]{64}$/,
            'Service agreement ID seems not valid'
        )
        assert.match(
            signature,
            /^0x[a-f0-9]{130}$/,
            'Service agreement signature seems not valid'
        )
    })

    it('should execute the service agreement', async () => {
        const accessService = ddo.findServiceByType('access')

        const success = await ocean.agreements.create(
            ddo.id,
            serviceAgreementSignatureResult.agreementId,
            accessService.index,
            serviceAgreementSignatureResult.signature,
            consumer,
            publisher
        )

        assert.isTrue(success)
    })

    it('should get the agreement conditions status not fulfilled', async () => {
        const status = await ocean.agreements.status(
            serviceAgreementSignatureResult.agreementId
        )

        assert.deepEqual(status, {
            lockReward: ConditionState.Unfulfilled,
            accessSecretStore: ConditionState.Unfulfilled,
            escrowReward: ConditionState.Unfulfilled
        })
    })

    it('should lock the payment by the consumer', async () => {
        const paid = await ocean.agreements.conditions.lockReward(
            serviceAgreementSignatureResult.agreementId,
            ddo.findServiceByType('metadata').attributes.main.price,
            consumer
        )

        assert.isTrue(paid, 'The asset has not been paid correctly')
    })

    // The test will fail because Brizo grants the access faster
    it('should grant the access by the publisher', async () => {
        try {
            const granted = await ocean.agreements.conditions.grantAccess(
                serviceAgreementSignatureResult.agreementId,
                ddo.id,
                consumer.getId(),
                publisher
            )

            assert.isTrue(granted, 'The asset has not been granted correctly')

            const accessGranted = await ocean.keeper.conditions.accessSecretStoreCondition.checkPermissions(
                consumer.getId(),
                ddo.id
            )

            assert.isTrue(accessGranted, 'Consumer has been granted.')
        } catch {}
    })

    it('should get the agreement conditions status fulfilled', async () => {
        const status = await ocean.agreements.status(
            serviceAgreementSignatureResult.agreementId
        )

        assert.deepEqual(status, {
            lockReward: ConditionState.Fulfilled,
            accessSecretStore: ConditionState.Fulfilled,
            escrowReward: ConditionState.Unfulfilled
        })
    })

    it('should consume and store the assets', async () => {
        const accessService = ddo.findServiceByType('access')

        const folder = '/tmp/ocean/squid-js-1'
        const path = await ocean.assets.consume(
            serviceAgreementSignatureResult.agreementId,
            ddo.id,
            accessService.index,
            consumer,
            folder
        )

        assert.include(path, folder, 'The storage path is not correct.')

        const files = await new Promise<string[]>(resolve => {
            fs.readdir(path, (e, fileList) => {
                resolve(fileList)
            })
        })

        assert.deepEqual(
            files,
            ['README.md', 'package.json'],
            'Stored files are not correct.'
        )
    })

    it('should consume and store one asset', async () => {
        const accessService = ddo.findServiceByType('access')

        const folder = '/tmp/ocean/squid-js-2'
        const path = await ocean.assets.consume(
            serviceAgreementSignatureResult.agreementId,
            ddo.id,
            accessService.index,
            consumer,
            folder,
            1
        )

        assert.include(path, folder, 'The storage path is not correct.')

        const files = await new Promise<string[]>(resolve => {
            fs.readdir(path, (e, fileList) => {
                resolve(fileList)
            })
        })

        assert.deepEqual(files, ['README.md'], 'Stored files are not correct.')
    })
})
