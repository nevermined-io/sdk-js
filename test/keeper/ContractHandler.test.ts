import { assert } from 'chai'
import ContractHandler from '../../src/keeper/ContractHandler'
import { Ocean } from '../../src/ocean/Ocean'
import config from '../config'

describe('ContractHandler', () => {
    let contractHandler: ContractHandler

    before(async () => {
        const { instanceConfig } = (await Ocean.getInstance(config)) as any

        contractHandler = new ContractHandler(instanceConfig)
    })

    describe('#get()', () => {
        it('should load and get OceanToken correctly', async () => {
            assert(await contractHandler.get('OceanToken'))
        })

        it('should fail to load an unknown contract', done => {
            contractHandler.get('OceanXXX').catch(() => {
                done()
            })
        })
    })
})
