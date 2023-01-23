import { assert } from 'chai'
import { decodeJwt } from 'jose'

import { config } from '../config'
import { workflowMetadatas } from '../utils'

import { Nevermined, DDO, Account, AssetPrice, AssetAttributes } from '../../src'
import { BigNumber } from '../../src/utils'

describe('Compute Asset', () => {
    let nevermined: Nevermined

    let publisher: Account
    let consumer: Account

    let algorithmDdo: DDO
    let computeDdo: DDO
    let workflowDdo: DDO

    let agreementId: string
    let workflowId: string
    let assetPrice: AssetPrice
    let userId: string

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[publisher, consumer] = await nevermined.accounts.list()
        const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
            publisher
        )

        await nevermined.services.marketplace.login(clientAssertion)
        const payload = decodeJwt(config.marketplaceAuthToken)
        userId = payload.sub

        assetPrice = new AssetPrice(publisher.getId(), BigNumber.from(0))
    })

    it('should register the assets', async () => {
        const assetAttributes = AssetAttributes.getInstance({
            metadata: workflowMetadatas.algorithm(userId),
            providers: [config.neverminedNodeAddress]
        })
        algorithmDdo = await nevermined.assets.create(assetAttributes, publisher)

        console.debug(`Algorightm DID: ${algorithmDdo.id}`)

        const computeAttributes = AssetAttributes.getInstance({
            metadata: workflowMetadatas.compute(userId),
            price: assetPrice,
            providers: [config.neverminedNodeAddress]
        })
        computeDdo = await nevermined.compute.create(computeAttributes, publisher)

        console.debug(`Compute DID: ${computeDdo.id}`)

        const workflowAttributes = AssetAttributes.getInstance({
            metadata: workflowMetadatas.workflow(computeDdo.id, algorithmDdo.id, userId),
            providers: [config.neverminedNodeAddress]
        })
        workflowDdo = await nevermined.assets.create(workflowAttributes, publisher)

        console.debug(`Workflow DID: ${workflowDdo.id}`)
    })

    it('should order the compute service', async () => {
        agreementId = await nevermined.compute.order(computeDdo.id, consumer)
        assert.isDefined(agreementId)
    })

    // Skipping this randomly failing test. Check https://github.com/nevermined-io/sdk-js/issues/33
    it('should execute the compute service', async () => {
        workflowId = await nevermined.compute.execute(
            agreementId,
            workflowDdo.id,
            consumer
        )
        assert.isDefined(workflowId)
        const result = await getResultDidFromStatus(
            workflowId,
            agreementId,
            consumer,
            nevermined
        )
        assert.equal(result.status, 'Succeeded')
    })

    // Skipping this randomly failing test. Check https://github.com/nevermined-io/sdk-js/issues/33
    it('should return the logs of the current execution', async () => {
        const logs = await nevermined.compute.logs(agreementId, workflowId, consumer)
        console.log(logs)
        assert.isDefined(logs)
    })

    // Skipping this randomly failing test. Check https://github.com/nevermined-io/sdk-js/issues/33
    it('should return the status of the current execution', async () => {
        const status = await nevermined.compute.status(agreementId, workflowId, consumer)
        assert.equal( status.status, 'Succeeded')
    })

    const getResultDidFromStatus = async (
        argoWorkflowId: string,
        agreementID: string,
        account: Account,
        nvm: Nevermined,
        maxAttempts = -1,
        wait = 5000
    ): Promise<any> => {
        let resultDid = ''
        let statusObject
        const statusResponse = ''
        let currentStatus = ''
        let computeFinished = false
        let attemp = 0

        while (!computeFinished && (attemp < maxAttempts || maxAttempts === -1)) {
            console.log('Fetching compute status...')
            attemp++

            await new Promise(f => setTimeout(f, wait))

            statusObject = await nvm.compute.status(
                agreementID,
                argoWorkflowId,
                account
            )
            console.log(statusResponse)

            console.log('complete status: ' + JSON.stringify(statusObject))
            currentStatus = statusObject?.status
            console.log('job status: ' + currentStatus)

            if (currentStatus === 'Succeeded' || currentStatus === 'Failed') {
                console.log(`Compute finished with status ${currentStatus}`)
                resultDid = statusObject?.did
                computeFinished = true
            }
        }

        if (!computeFinished) {
            console.log(
                `Compute not finished for workflow ${argoWorkflowId}. Last known status: ${JSON.stringify(
                    statusObject
                )}`
            )
        } else if (currentStatus === 'Succeeded') {
            console.log(`Compute finished succesfully. Did published: ${resultDid}`)
        }

        return { status: currentStatus, completeStatus: statusObject, did: resultDid }
    }
})
