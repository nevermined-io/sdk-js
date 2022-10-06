import { assert } from 'chai'
import * as fs from 'fs'
import { decodeJwt } from 'jose'

import { config } from '../config'
import { getMetadata } from '../utils'

import { Nevermined, Account, DDO, ConditionState } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import { repeat, sleep } from '../utils/utils'
import { ethers } from 'ethers'
import BigNumber from '../../src/utils/BigNumber'

describe('Consume Asset (Gateway)', () => {
    let nevermined: Nevermined

    let publisher: Account
    let consumer: Account

    let ddo: DDO
    let agreementId: string

    let metadata = getMetadata()
    let assetRewards: AssetRewards

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher, consumer] = await nevermined.accounts.list()

        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            publisher
        )

        await nevermined.marketplace.login(clientAssertion)
        const payload = decodeJwt(config.marketplaceAuthToken)

        assetRewards = new AssetRewards(publisher.getId(), BigNumber.from(0))

        if (!nevermined.keeper.dispenser) {
            metadata = getMetadata(0)
        }
        metadata.main.price = assetRewards.getTotalPrice().toString()
        metadata.main.name = `${metadata.main.name} - ${Math.random()}`
        metadata.userId = payload.sub
    })

    after(() => {
        try {
            localStorage.clear()
        } catch {}
    })

    it('should fetch the RSA publicKey from the gateway', async () => {
        const rsaPublicKey = await nevermined.gateway.getRsaPublicKey()
        assert.isDefined(rsaPublicKey)
    })

    it('should authenticate the accounts', async () => {
        await publisher.authenticate()
        await consumer.authenticate()
    })

    it('should register an asset', async () => {
        const steps = []
        ddo = await nevermined.assets
            .create(metadata, publisher, assetRewards)
            .next(step => steps.push(step))

        assert.instanceOf(ddo, DDO)
        assert.deepEqual(steps, [0, 1, 2, 3, 4, 5, 6, 9, 10, 11])

        const assetProviders = await nevermined.provider.list(ddo.id)
        assert.deepEqual(assetProviders, [ethers.utils.getAddress(config.gatewayAddress)])
    })

    it('should order the asset', async () => {
        const steps = []
        agreementId = await nevermined.assets
            .order(ddo.id, 'access', consumer)
            .next(step => steps.push(step))

        assert.isDefined(agreementId)
        assert.deepEqual(steps, [0, 1, 2, 3])
    })

    it('should get the lockPayment condition fulfilled', async () => {
        // todo change this, a test should never dependent on the previous test because the order might change during runtime
        await sleep(3000)
        const status = await repeat(3, nevermined.agreements.status(agreementId))

        assert.deepEqual(status, {
            lockPayment: ConditionState.Fulfilled,
            access: ConditionState.Unfulfilled,
            escrowPayment: ConditionState.Unfulfilled
        })
    })

    it('should be able to download the asset if you are the owner', async () => {
        const folder = '/tmp/nevermined/sdk-js'
        const path = await nevermined.assets.download(ddo.id, publisher, folder, -1)
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

    it('should consume and store the assets', async () => {
        const folder = '/tmp/nevermined/sdk-js'
        const path = await nevermined.assets.consume(
            agreementId,
            ddo.id,
            consumer,
            folder,
            -1
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
})
