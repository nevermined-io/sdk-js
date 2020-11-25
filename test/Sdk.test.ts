import assert from 'assert'
import * as sdk from '../src/sdk'

describe('Sdk', () => {
    describe('interface', () => {
        it('should expose Nevermined', async () => {
            assert(sdk.Nevermined)
        })
    })
})
