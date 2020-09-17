import { assert } from 'chai'

import { config } from '../config'
import { workflowMetadatas } from '../utils'

import { Nevermined, DDO, Account,  } from '../../src' // @nevermined/squid

describe('Compute Asset', () => {
    let nevermined: Nevermined

    let publisher: Account
    let consumer: Account

    let metadataDdo: DDO
    let algorithmDdo: DDO
    let computeDdo: DDO
    let workflowDdo: DDO

    let agreementId: string

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher, consumer] = await nevermined.accounts.list()

    })

    it('should register the assets', async () => {
        metadataDdo = await nevermined.assets.create(workflowMetadatas.metadata(), publisher)
        algorithmDdo = await nevermined.assets.create(workflowMetadatas.algorithm(), publisher)
        computeDdo = await nevermined.assets.create(workflowMetadatas.compute('0'), publisher)
        workflowDdo = await nevermined.assets.create(workflowMetadatas.workflow(metadataDdo.id, algorithmDdo.id), publisher)
    })

    it('should order the compute service', async () => {
        agreementId = await nevermined.assets.order(
            computeDdo.id,
            computeDdo.findServiceByType('compute').index,
            consumer,
        )

        assert.isDefined(agreementId)
    })

    //Ignore because the minikube setup is not ready in actions yet.np
    xit('should execute the compute service', async () => {
        const workflowId = await nevermined.assets.execute(
            agreementId,
            computeDdo.id,
            workflowDdo.id,
            consumer,
        )
        console.log(workflowId)

        assert.isDefined(workflowId)
    })
})
