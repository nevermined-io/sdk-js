import assert from 'assert'
import * as squid from '../src/squid'

describe('Squid', () => {
    describe('interface', () => {
        it('should expose Nevermined', async () => {
            assert(squid.Nevermined)
        })
    })
})
