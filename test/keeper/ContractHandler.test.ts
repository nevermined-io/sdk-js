import { assert } from 'chai'
import ContractHandler from '../../src/keeper/ContractHandler'
import { Nevermined } from '../../src/nevermined/Nevermined'
import config from '../config'

describe('ContractHandler', () => {
    let contractHandler: ContractHandler

    before(async () => {
        const { instanceConfig } = (await Nevermined.getInstance(config)) as any
        contractHandler = new ContractHandler(instanceConfig)
    })

    describe('#get()', () => {
        it('should load and get NeverminedToken correctly', async () => {
            assert(
                await contractHandler.get(
                    'NeverminedToken',
                    false,
                    './node_modules/@neverminde-io/contracts/artifacts'
                )
            )
        })

        it('should fail to load an unknown contract', done => {
            contractHandler
                .get(
                    'NeverminedXXX',
                    false,
                    './node_modules/@neverminde-io/contracts/artifacts'
                )
                .catch(() => {
                    done()
                })
        })
    })
})
