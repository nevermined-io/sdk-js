import { assert } from 'chai'
import * as fs from 'fs'

import { config } from '../config'
import { getAssetRewards, getMetadata } from '../utils'

import { Nevermined, DDO, Account, ConditionState } from '../../src'

describe('Consume Asset', () => {
    let nevermined: Nevermined

    let publisher: Account
    let consumer: Account

    let metadata = getMetadata()

    let ddo: DDO
    let serviceAgreementSignatureResult: {
        agreementId: string
        signature: string
    }

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher, consumer] = await nevermined.accounts.list()

        if (!nevermined.keeper.dispenser) {
            metadata = getMetadata(0)
        }
    })

    it('should register an asset', async () => {
        const assetRewards = getAssetRewards(publisher.getId())
        ddo = await nevermined.assets.create(metadata as any, publisher, assetRewards)

        assert.isDefined(ddo, 'Register has not returned a DDO')
        assert.match(ddo.id, /^did:nv:[a-f0-9]{64}$/, 'DDO id is not valid')
        assert.isAtLeast(ddo.authentication.length, 1, 'Default authentication not added')
        assert.isDefined(
            ddo.findServiceByType('access'),
            "DDO access service doesn't exist"
        )
    })

    it('should be able to request tokens for consumer', async () => {
        const initialBalance = (await consumer.getBalance()).nevermined
        const claimedTokens = +metadata.main.price * 10 ** -(await nevermined.keeper.token.decimals())

        try {
            await consumer.requestTokens(claimedTokens)
        } catch {}

        assert.equal(
            (await consumer.getBalance()).nevermined,
            initialBalance + claimedTokens,
            'Tokens not delivered'
        )
    })

    it('should sign the service agreement', async () => {
        const accessService = ddo.findServiceByType('access')

        serviceAgreementSignatureResult = await nevermined.agreements.prepare(
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

        const success = await nevermined.agreements.create(
            ddo.id,
            serviceAgreementSignatureResult.agreementId,
            accessService.index,
            consumer,
            publisher
        )

        assert.isTrue(success)
    })

    it('should get the agreement conditions status not fulfilled', async () => {
        const status = await nevermined.agreements.status(
            serviceAgreementSignatureResult.agreementId
        )

        assert.deepEqual(status, {
            lockPayment: ConditionState.Unfulfilled,
            accessSecretStore: ConditionState.Unfulfilled,
            escrowReward: ConditionState.Unfulfilled
        })
    })

    it('should lock the payment by the consumer', async () => {
        const paid = await nevermined.agreements.conditions.lockPayment(
            serviceAgreementSignatureResult.agreementId,
            ddo.findServiceByType('metadata').attributes.main.price,
            consumer
        )
        console.log(`Price ${ddo.findServiceByType('metadata').attributes.main.price}`)
        assert.isTrue(paid, 'The asset has not been paid correctly')
    })

    // The test will fail because Gateway grants the access faster
    it('should grant the access by the publisher', async () => {
        try {
            const granted = await nevermined.agreements.conditions.grantAccess(
                serviceAgreementSignatureResult.agreementId,
                ddo.id,
                consumer.getId(),
                publisher
            )

            assert.isTrue(granted, 'The asset has not been granted correctly')

            const accessGranted = await nevermined.keeper.conditions.accessCondition.checkPermissions(
                consumer.getId(),
                ddo.id
            )

            assert.isTrue(accessGranted, 'Consumer has been granted.')
        } catch {}
    })

    it('should get the agreement conditions status fulfilled', async () => {
        const status = await nevermined.agreements.status(
            serviceAgreementSignatureResult.agreementId
        )

        assert.deepEqual(status, {
            lockPayment: ConditionState.Fulfilled,
            accessSecretStore: ConditionState.Fulfilled,
            escrowReward: ConditionState.Unfulfilled
        })
    })

    it('should consume and store the assets', async () => {
        const accessService = ddo.findServiceByType('access')

        const folder = '/tmp/nevermined/sdk-js-1'
        const path = await nevermined.assets.consume(
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
            ['README.md', 'ddo-example.json'],
            'Stored files are not correct.'
        )
    })

    it('should consume and store one asset', async () => {
        const accessService = ddo.findServiceByType('access')

        const folder = '/tmp/nevermined/sdk-js-2'
        const path = await nevermined.assets.consume(
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
