import { assert } from 'chai'
import config from '../config'
import TestContractHandler from './TestContractHandler'
import Keeper from '../../src/keeper/Keeper'
import { Nevermined } from '../../src/nevermined/Nevermined'

let keeper: Keeper

describe('Keeper', () => {
    before(async () => {
        await TestContractHandler.prepareContracts()
        const nevermined = await Nevermined.getInstance(config)
        ;({ keeper } = nevermined)
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
        it('should get localnet as default', async () => {
            const networkName: string = (await keeper.getNetworkName()).toLowerCase()
            assert(
                networkName === 'geth-localnet' ||
                    networkName === 'polygon-localnet' ||
                    networkName === 'spree'
            )
        })
    })
})
