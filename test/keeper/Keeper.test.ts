import { assert } from 'chai'
import config from '../config'
import TestContractHandler from './TestContractHandler'
import Keeper from '../../src/keeper/Keeper'
import { Ocean } from '../../src/ocean/Ocean'

let keeper: Keeper

describe('Keeper', () => {
    before(async () => {
        await TestContractHandler.prepareContracts()
        const ocean = await Ocean.getInstance(config)
        keeper = ocean.keeper
    })

    describe('public interface', () => {
        it('should have dispenser', () => {
            assert(keeper.dispenser !== null)
        })

        it('should have token', () => {
            assert(keeper.token !== null)
        })
    })

    describe('#getNetworkName()', () => {
        it('should get development as default', async () => {
            const networkName: string = await keeper.getNetworkName()
            assert(networkName === 'Development')
        })
    })
})
