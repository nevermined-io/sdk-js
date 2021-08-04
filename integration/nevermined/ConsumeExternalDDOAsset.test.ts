import { assert } from 'chai'
import * as fs from 'fs'
import { config } from '../config'
import { Nevermined, DDO, Account, ConditionState, MetaData } from '../../src'
import { getDocsCommonMetadata } from '../utils'
import AssetRewards from '../../src/models/AssetRewards'

describe('Consume Asset (Documentation example)', () => {
    let nevermined: Nevermined

    let publisher: Account
    let consumer: Account

    let metadata: MetaData

    let ddo: DDO
    let serviceAgreementSignatureResult: {
        agreementId: string
        signature: string
    }
    let assetRewards: AssetRewards

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher, consumer] = await nevermined.accounts.list()

        metadata = await getDocsCommonMetadata()
        metadata.main.price = '0'
        assetRewards = new AssetRewards(publisher.getId(), Number(metadata.main.price))
    })

    it('should register an asset', async () => {
        ddo = await nevermined.assets.create(metadata, publisher, assetRewards)

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
        const claimedTokens =
            +metadata.main.price * 10 ** -(await nevermined.keeper.token.decimals())

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
        serviceAgreementSignatureResult = await nevermined.agreements.prepare(
            ddo.id,
            'access',
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
        const success = await nevermined.agreements.create(
            ddo.id,
            serviceAgreementSignatureResult.agreementId,
            'access',
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
            access: ConditionState.Unfulfilled,
            escrowPayment: ConditionState.Unfulfilled
        })
    })

    it('should lock the payment by the consumer', async () => {
        const { price } = ddo.findServiceByType('metadata').attributes.main
        const assetRewards = new AssetRewards(publisher.getId(), Number(price))

        const paid = await nevermined.agreements.conditions.lockPayment(
            serviceAgreementSignatureResult.agreementId,
            ddo.id,
            assetRewards.getAmounts(),
            assetRewards.getReceivers(),
            undefined,
            consumer
        )

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
            access: ConditionState.Fulfilled,
            escrowPayment: ConditionState.Unfulfilled
        })
    })

    it('should consume and store the assets', async () => {
        const folder = '/tmp/nevermined/sdk-js-1'
        const path = await nevermined.assets.consume(
            serviceAgreementSignatureResult.agreementId,
            ddo.id,
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
        const folder = '/tmp/nevermined/sdk-js-2'
        const path = await nevermined.assets.consume(
            serviceAgreementSignatureResult.agreementId,
            ddo.id,
            consumer,
            folder,
            0
        )

        assert.include(path, folder, 'The storage path is not correct.')

        const files = await new Promise<string[]>(resolve => {
            fs.readdir(path, (e, fileList) => {
                resolve(fileList)
            })
        })

        assert.deepEqual(files, ['package.json'], 'Stored files are not correct.')
    })
})
