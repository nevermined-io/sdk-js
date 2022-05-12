import { assert } from 'chai'

import { config } from '../config'
import { workflowMetadatas } from '../utils'

import { Nevermined, DDO, Account } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import BigNumber from 'bignumber.js'

describe('Compute Asset', () => {
    let nevermined: Nevermined

    let publisher: Account
    let consumer: Account

    let algorithmDdo: DDO
    let computeDdo: DDO
    let workflowDdo: DDO

    let agreementId: string
    let workflowId: string
    let assetRewards: AssetRewards

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher, consumer] = await nevermined.accounts.list()
        assetRewards = new AssetRewards(publisher.getId(), new BigNumber(0))
    })

    it('should register the assets', async () => {
        algorithmDdo = await nevermined.assets.create(
            workflowMetadatas.algorithm(),
            publisher
        )
        computeDdo = await nevermined.assets.create(
            workflowMetadatas.compute(),
            publisher,
            assetRewards,
            ['compute']
        )
        workflowDdo = await nevermined.assets.create(
            workflowMetadatas.workflow(computeDdo.id, algorithmDdo.id),
            publisher
        )
    })

    it('should order the compute service', async () => {
        agreementId = await nevermined.assets.order(computeDdo.id, 'compute', consumer)

        assert.isDefined(agreementId)
    })

    // Skipping this randomly failing test. Check https://github.com/nevermined-io/sdk-js/issues/33
    it.skip('should execute the compute service', async () => {
        workflowId = await nevermined.assets.execute(
            agreementId,
            computeDdo.id,
            workflowDdo.id,
            consumer
        )

        assert.isDefined(workflowId)
    })

    // Skipping this randomly failing test. Check https://github.com/nevermined-io/sdk-js/issues/33
    it.skip('should return the logs of the current execution', async () => {
        const logs = await nevermined.assets.computeLogs(
            agreementId,
            workflowId,
            consumer
        )
        assert.isDefined(logs)
    })

    // Skipping this randomly failing test. Check https://github.com/nevermined-io/sdk-js/issues/33
    it.skip('should return the status of the current execution', async () => {
        const status = await nevermined.assets.computeStatus(
            agreementId,
            workflowId,
            consumer
        )
        assert.isDefined(status)
    })
})
