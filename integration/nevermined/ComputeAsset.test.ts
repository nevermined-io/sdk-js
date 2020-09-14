import { assert } from 'chai'
// import * as fs from 'fs'

import { config } from '../config'
import { getDocsAlgorithmMetadata, getMetadata, getDocsWorkflowMetadata, getDocsComputeMetadata } from '../utils'

import { Nevermined, DDO, Account,  } from '../../src' // @nevermined/squid

describe('Compute Asset', () => {
    let nevermined: Nevermined

    let publisher: Account
    let consumer: Account

    let metadata = getMetadata()
    let algorithmMetadata
    let workflowMetadata
    let computeMetadata

    let ddo: DDO
    let ddoAlgo: DDO
    let ddoWorkflow: DDO
    let ddoCompute: DDO

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher, consumer] = await nevermined.accounts.list()

        if (!nevermined.keeper.dispenser) {
            metadata = getMetadata(0)
        }
        algorithmMetadata = await getDocsAlgorithmMetadata()
        workflowMetadata = await getDocsWorkflowMetadata()
        computeMetadata = await getDocsComputeMetadata()
    })

    it('should register an asset', async () => {
        ddo = await nevermined.assets.create(metadata as any, publisher)
        ddoAlgo = await nevermined.assets.create(algorithmMetadata as any, publisher)
        ddoWorkflow = await nevermined.assets.create(workflowMetadata as any, publisher)
        ddoCompute = await nevermined.assets.create(computeMetadata as any, publisher)
        assert.isDefined(ddo, 'Register has not returned a DDO')
        assert.match(ddo.id, /^did:nv:[a-f0-9]{64}$/, 'DDO id is not valid')
        assert.isAtLeast(ddo.authentication.length, 1, 'Default authentication not added')
        assert.isDefined(
            ddo.findServiceByType('access'),
            "DDO access service doesn't exist"
        )
        assert.isDefined(ddoAlgo, 'Register has not returned a DDO')
        assert.match(ddoAlgo.id, /^did:nv:[a-f0-9]{64}$/, 'DDO id is not valid')
        assert.isAtLeast(ddoAlgo.authentication.length, 1, 'Default authentication not added')
        assert.isDefined(
            ddoAlgo.findServiceByType('access'),
            "DDO access service doesn't exist"
        )
        assert.isDefined(ddoWorkflow, 'Register has not returned a DDO')
        assert.match(ddoWorkflow.id, /^did:nv:[a-f0-9]{64}$/, 'DDO id is not valid')
        assert.isAtLeast(ddoWorkflow.authentication.length, 1, 'Default authentication not added')
        assert.isDefined(ddoCompute, 'Register has not returned a DDO')
        assert.match(ddoCompute.id, /^did:nv:[a-f0-9]{64}$/, 'DDO id is not valid')
        assert.isAtLeast(ddoCompute.authentication.length, 1, 'Default authentication not added')
        assert.isDefined(
            ddoCompute.findServiceByType('compute'),
            "DDO access service doesn't exist"
        )
    })

})
