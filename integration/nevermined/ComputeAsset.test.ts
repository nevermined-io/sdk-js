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
        const agreementId = await nevermined.assets.execute(
            computeDdo.id,
            computeDdo.findServiceByType('compute').index,
            workflowDdo.id,
            consumer,
        )

        assert.isDefined(agreementId)
    })
})
