import assert from 'assert'
import { DID } from '../../src/nevermined'

describe('DID', () => {
  describe('#generate()', () => {
    it('should generate a new did', () => {
      const did: DID = DID.generate()
      assert(did)
    })
  })

  describe('#encode() and #decode()', () => {
    let did: DID
    let decoded: DID
    let encoded: string
    it('should encode a did', () => {
      did = DID.generate()
      encoded = did.getEncoded()
      assert(encoded)
    })

    it('should decode a did', () => {
      decoded = DID.fromEncoded(encoded)
      assert(decoded)
    })

    it('decoded did should match before encoding', () => {
      assert(did.getDid() === decoded.getDid())
    })
  })

  describe('#parse()', () => {
    it('should parse a valid did starting by did:nv', () => {
      const id = 'a'.repeat(64)
      const did: DID = DID.parse(`did:nv:${id}`)
      assert(did)

      assert(did.getId() === id, did.getId())
    })

    it('should parse a valid did starting by 0x', () => {
      const id = 'b'.repeat(64)
      const did: DID = DID.parse(`0x${id}`)
      assert(did)

      assert(did.getId() === id, did.getId())
    })

    it('should throw if prefix does not match', (done) => {
      const id = '1234'
      try {
        const did: DID = DID.parse(`did:xxx:${id}`)
        assert(!did)
      } catch {
        done()
      }
    })

    it('should throw if id does not match', (done) => {
      const id = 'xyz'
      try {
        const did: DID = DID.parse(`did:nv:${id}`)
        assert(!did)
      } catch {
        done()
      }
    })
  })

  describe('#getDid()', () => {
    it('should return the full did', () => {
      const did: DID = DID.generate()
      assert(did)

      assert(did.getDid().startsWith('did:nv:'))
    })
  })

  describe('#getDid()', () => {
    it('should return only the id part of the did', () => {
      const id = 'a'.repeat(64)
      const did: DID = DID.parse(`did:nv:${id}`)
      assert(did)

      assert(did.getId() === id)
    })
  })
})
