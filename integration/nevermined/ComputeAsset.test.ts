import { assert } from 'chai'
import { decodeJwt } from 'jose'

import { config } from '../config'
import { workflowMetadatas } from '../utils'

import { Nevermined, DDO, Account } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'
import BigNumber from '../../src/utils/BigNumber'
import { AssetAttributes } from '../../src/models/AssetAttributes'

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
    let userId: string

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher, consumer] = await nevermined.accounts.list()
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            publisher
        )

        await nevermined.marketplace.login(clientAssertion)
        const payload = decodeJwt(config.marketplaceAuthToken)
        userId = payload.sub

        assetRewards = new AssetRewards(publisher.getId(), BigNumber.from(0))
    })

    it('should register the assets', async () => {
        const assetAttributes = AssetAttributes.getInstance({
            metadata: workflowMetadatas.algorithm(userId)
        })
        algorithmDdo = await nevermined.assets.create(
            assetAttributes,
            publisher
        )    

        console.debug(`Algorightm DID: ${algorithmDdo.id}`)

        computeDdo = await nevermined.compute.create(
            workflowMetadatas.compute(userId),
            publisher,
            assetRewards
        )
        console.debug(`Compute DID: ${computeDdo.id}`)        

        const workflowAttributes = AssetAttributes.getInstance({
            metadata: workflowMetadatas.workflow(computeDdo.id, algorithmDdo.id, userId)
        })
        workflowDdo = await nevermined.assets.create(
            workflowAttributes,
            publisher
        )         

        console.debug(`Workflow DID: ${workflowDdo.id}`)
    })

    it('should order the compute service', async () => {
        agreementId = await nevermined.compute.order(computeDdo.id, consumer)

        assert.isDefined(agreementId)
    })

    // Skipping this randomly failing test. Check https://github.com/nevermined-io/sdk-js/issues/33
    it.skip('should execute the compute service', async () => {
        workflowId = await nevermined.compute.execute(
            agreementId,
            workflowDdo.id,
            consumer
        )

        assert.isDefined(workflowId)
    })

    // Skipping this randomly failing test. Check https://github.com/nevermined-io/sdk-js/issues/33
    it.skip('should return the logs of the current execution', async () => {
        const logs = await nevermined.compute.logs(
            agreementId,
            workflowId,
            consumer
        )
        assert.isDefined(logs)
    })

    // Skipping this randomly failing test. Check https://github.com/nevermined-io/sdk-js/issues/33
    it.skip('should return the status of the current execution', async () => {
        const status = await nevermined.compute.status(
            agreementId,
            workflowId,
            consumer
        )
        assert.isDefined(status)
    })
})
