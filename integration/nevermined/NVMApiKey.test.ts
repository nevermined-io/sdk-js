// @ts-nocheck
import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import config from '../../test/config'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { NvmAccount } from '../../src/models/NvmAccount'
import { JwtUtils, NvmApiKey } from '../../src'
import { encryptMessage, decryptMessage } from '../../src/common/helpers'
import { sleep } from '../utils/utils'

chai.use(chaiAsPromised)

describe('Nevermined API Key', () => {
  let encryptedNvmApiKey: string
  let nvmApiKey: NvmApiKey

  describe('As a provider I can generate and process Nevermined API Keys', () => {
    let nevermined: Nevermined
    let user: NvmAccount
    let provider: NvmAccount
    let someone: NvmAccount
    let providerAddress = ''
    let providerPrivateKey
    let providerPublicKey
    const zeroDevSessionKey =
      'eyJzZWxlY3RvciI6IjB4NTE5NDU0NDciLCJleGVjdXRvciI6IjB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsInZhbGlkVW50aWwiOjAsInZhbGlkQWZ0ZXIiOjAsInNlc3Npb25LZXlEYXRhIjp7InZhbGlkQWZ0ZXIiOjAsInZhbGlkVW50aWwiOjAsInBlcm1pc3Npb25zIjpbeyJzaWciOiIweGNmZmUxZWIzIiwicnVsZXMiOltdLCJ0YXJnZXQiOiIweDkzNjA1QzY0NDE4MWYzZEQwM0EzNzIyODUyODY0OUE3NjgyMkZjZjEiLCJ2YWx1ZUxpbWl0IjoiMCIsIm9wZXJhdGlvbiI6MCwiaW5kZXgiOjAsImV4ZWN1dGlvblJ1bGUiOnsidmFsaWRBZnRlciI6MCwiaW50ZXJ2YWwiOjAsInJ1bnMiOjB9fSx7InNpZyI6IjB4M2JkMDJjNDEiLCJydWxlcyI6W10sInRhcmdldCI6IjB4OTM2MDVDNjQ0MTgxZjNkRDAzQTM3MjI4NTI4NjQ5QTc2ODIyRmNmMSIsInZhbHVlTGltaXQiOiIwIiwib3BlcmF0aW9uIjowLCJpbmRleCI6MSwiZXhlY3V0aW9uUnVsZSI6eyJ2YWxpZEFmdGVyIjowLCJpbnRlcnZhbCI6MCwicnVucyI6MH19LHsic2lnIjoiMHgwOTVlYTdiMyIsInJ1bGVzIjpbXSwidGFyZ2V0IjoiMHg3NWZhZjExNGVhZmIxQkRiZTJGMDMxNkRGODkzZmQ1OENFNDZBQTRkIiwidmFsdWVMaW1pdCI6IjAiLCJvcGVyYXRpb24iOjAsImluZGV4IjoyLCJleGVjdXRpb25SdWxlIjp7InZhbGlkQWZ0ZXIiOjAsImludGVydmFsIjowLCJydW5zIjowfX0seyJzaWciOiIweGY4ZmUxMDcwIiwicnVsZXMiOltdLCJ0YXJnZXQiOiIweDFjNTJlZDQxNEVEZDFiQ0MyMEVhNjcwZDQyMjg5ZThiRkMwM0MwOTUiLCJ2YWx1ZUxpbWl0IjoiMCIsIm9wZXJhdGlvbiI6MCwiaW5kZXgiOjMsImV4ZWN1dGlvblJ1bGUiOnsidmFsaWRBZnRlciI6MCwiaW50ZXJ2YWwiOjAsInJ1bnMiOjB9fV0sInBheW1hc3RlciI6IjB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCJ9LCJlbmFibGVTaWduYXR1cmUiOiIweDU0NmFkNGRkYjgxNDI4OGVmMzY5MDAwYmUwY2RlYzQxNGRjOThiYjE5Nzc3NmNlYzIzZjgzYzEwODJhMjFkYjY2MDc1NTdmODVjMDNjNmVlYTQ1NGZhNzJkZTk4NGIxODcxOGZkNTUyYzhiOTI2NWE1NGE3MmRjNWNiNzA4ODFmMWMiLCJzZXNzaW9uUHJpdmF0ZUtleSI6IjB4MWNiZTllM2U3ZjdlNjI1MmUzZmVkYmI2Y2NmYjRkMzZlOTQyNWI4NjlmMDJkOTU0MTdkNjg0YTFlZDgzMmE5ZCIsImluaXRDb2RlIjoiMHgiLCJhY2NvdW50QWRkcmVzcyI6IjB4QmU1OWU2NzM0RjU0YTM5OGU5NTBGMDE5QmQ0QjhGQmQ2OTcwZDQ3MCJ9'
    const marketplaceAuthToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweGUyREQwOWQ3MTlEYTg5ZTVhM0QwRjI1NDljN0UyNDU2NmU5NDcyNjAiLCJzdWIiOiJ1cy0wMDBhM2JjYy0wZTNhLTQ4MjgtOWRmYi1jNGFmNjFjMDNmMjgiLCJyb2xlcyI6W10sImlhdCI6MTcxNDk3OTQ2NywiZXhwIjoxNzE2MTg5MDY3fQ.2o17U6MOyY4L95DeRy9KTJ_lAUYnOyuV8TtlKVJA7MY'

    before(async () => {
      nevermined = await Nevermined.getInstance(config)
      ;[user, provider, someone] = nevermined.accounts.list()

      providerAddress = provider.getId()
      providerPublicKey = provider.getAccountSigner().publicKey
      providerPrivateKey = provider.getAccountSigner().getHdKey().privateKey

      // Uncomment to see the keys
      // console.log('Provider Public Key:', providerPublicKey)
      // console.log('Provider Private Key:', providerPrivateKey)
      // console.log('Private Key encoded: ', Buffer.from(providerPrivateKey, 'hex'))
    })

    it('I can compress and decompress', async () => {
      const payload = JSON.stringify({ id: 'user123', role: 'admin' })
      const compressed = JwtUtils.createCompressedJwt(payload)
      assert.isDefined(compressed)
      console.log('JWT Compressed:', compressed)
      console.log('JWT Compressed size:', compressed.length)

      const decompressed = JwtUtils.decompressJwt(compressed)
      assert.isDefined(decompressed)
      console.log('Decompressed:', decompressed)
      assert.strictEqual(payload, decompressed)
    })

    it('As a user I can generate a NVM API Key', async () => {
      nvmApiKey = await nevermined.utils.jwt.generateNeverminedApiKey(
        user,
        zeroDevSessionKey,
        marketplaceAuthToken,
        providerAddress,
      )
      assert.isDefined(nvmApiKey)
      console.log('NVM API Key:', nvmApiKey)
      console.log('JWT size:', nvmApiKey.toString().length)
    })

    it('The token is valid', async () => {
      assert.isTrue(nevermined.utils.jwt.isNeverminedApiKeyValid(nvmApiKey))
    })
    it('The token can be encoded & decoded', async () => {
      const serialized = nvmApiKey.serialize()
      assert.isDefined(serialized)
      console.log(`Serialized: ${serialized}`)

      const jwt = NvmApiKey.deserialize(serialized)
      console.log(jwt)
      assert.equal(jwt.iss, user.getId())
      assert.equal(jwt.sub, providerAddress)
    })

    it('Encrypt and decrypt', async () => {
      console.log('Public key:', providerPublicKey)
      const encrypted = await encryptMessage(nvmApiKey.serialize(), providerPublicKey)
      console.log('Encrypted:', encrypted)
      assert.isDefined(encrypted)

      // console.log('Private key:', privateKey)
      const decrypted = await decryptMessage(encrypted, providerPrivateKey)
      console.log('Decrypted:', decrypted)
      assert.isDefined(decrypted)

      const jwt = JwtUtils.decodeNeverminedApiKey(decrypted)
      console.log(jwt)
      assert.equal(jwt.iss, user.getId())
      assert.equal(jwt.sub, providerAddress)
    })

    it('Complete flow with encryption', async () => {
      const encryptedNvmApiKey = await nevermined.utils.jwt.generateEncryptedNeverminedApiKey(
        user,
        zeroDevSessionKey,
        marketplaceAuthToken,
        providerAddress,
        providerPublicKey,
      )
      assert.isDefined(encryptedNvmApiKey)

      const jwt = await nevermined.utils.jwt.decryptAndDecodeNeverminedApiKey(
        encryptedNvmApiKey,
        providerPrivateKey,
      )
      assert.isDefined(jwt)
      console.log(jwt)
      assert.isTrue(nevermined.utils.jwt.isNeverminedApiKeyValid(jwt))
      assert.equal(jwt.iss, user.getId())
    })

    it('A hash of the api key can be generated', async () => {
      const hash = JwtUtils.hashNeverminedApiKey(encryptedNvmApiKey)
      console.log('Hash:', hash)
      assert.isDefined(hash)
    })

    it('The api token is not valid if already expired', async () => {
      const encryptedNvmApiKey = await nevermined.utils.jwt.generateEncryptedNeverminedApiKey(
        user,
        zeroDevSessionKey,
        marketplaceAuthToken,
        providerAddress,
        providerPublicKey,
        '1s',
      )
      assert.isDefined(encryptedNvmApiKey)
      console.log(`Waiting to expire the JWT token`)
      await sleep(2000)
      const jwt = await nevermined.utils.jwt.decryptAndDecodeNeverminedApiKey(
        encryptedNvmApiKey,
        providerPrivateKey,
      )
      assert.isDefined(jwt)
      assert.isFalse(nevermined.utils.jwt.isNeverminedApiKeyValid(jwt))
    })

    it('The api token can no be decripted by a different account to the receiver', async () => {
      const someonePrivateKey = someone.getAccountSigner().getHdKey().privateKey

      const encryptedNvmApiKey = await nevermined.utils.jwt.generateEncryptedNeverminedApiKey(
        user,
        zeroDevSessionKey,
        marketplaceAuthToken,
        providerAddress,
        providerPublicKey,
      )
      assert.isDefined(encryptedNvmApiKey)
      try {
        await nevermined.utils.jwt.decryptAndDecodeNeverminedApiKey(
          encryptedNvmApiKey,
          someonePrivateKey,
        )
        assert.fail('The token should not be decrypted')
      } catch (error) {
        assert.isDefined(error)
      }
    })

    it('LOCAL: As a user I can generate a NVM API Key for the NODE', async () => {
      const address = '0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0'
      const publicKey =
        '0x04d793eb43ef7d191bf64f127c9f1a2c9037406d72706d3be7dc564fb9a9f08f21156b32d1ee3afbe64cc9f676f6facffac1377f7804daf932d3b8aa04fdeb0630'
      const privateKey = '0x9bf5d7e4978ed5206f760e6daded34d657572bd49fa5b3fe885679329fb16b16'

      encryptedNvmApiKey = await nevermined.utils.jwt.generateEncryptedNeverminedApiKey(
        user,
        zeroDevSessionKey,
        marketplaceAuthToken,
        address,
        publicKey,
      )
      assert.isDefined(encryptedNvmApiKey)
      console.log('NVM API Key valid for the Node:', encryptedNvmApiKey)
      console.log('JWT Compressed size:', encryptedNvmApiKey.length)

      const jwt = await nevermined.utils.jwt.decryptAndDecodeNeverminedApiKey(
        encryptedNvmApiKey,
        privateKey,
      )
      assert.isDefined(jwt)

      assert.isTrue(nevermined.utils.jwt.isNeverminedApiKeyValid(jwt))
    })

    it('STAGING: As a user I can generate a NVM API Key for the NODE', async () => {
      const address = '0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc'
      const publicKey =
        '0x04c19e8524f8080e0f9a5ef54c87b7596a2c93a992e986f713d02e091142d7d57f3094c34a265fc5dfd098e2143cb8eaf325e5621a7572ba00997654a19a819b35'
      // We should get the private key from the node (STAGING)
      // const privateKey = '0x9bf5d7e4978ed5206f760e6daded34d657572bd49fa5b3fe885679329fb16b16'

      encryptedNvmApiKey = await nevermined.utils.jwt.generateEncryptedNeverminedApiKey(
        user,
        zeroDevSessionKey,
        marketplaceAuthToken,
        address,
        publicKey,
      )
      assert.isDefined(encryptedNvmApiKey)
      console.log('NVM API Key valid for the Node:', encryptedNvmApiKey)
      console.log('JWT Compressed size:', encryptedNvmApiKey.length)

      // const jwt = await nevermined.utils.jwt.decryptAndDecodeNeverminedApiKey(
      //   encryptedNvmApiKey,
      //   privateKey,
      // )
      // assert.isDefined(jwt)

      // assert.isTrue(nevermined.utils.jwt.isNeverminedApiKeyValid(jwt))
    })

    it('I can generate 2 session keys and they are different', async () => {
      const key1 = await nevermined.utils.jwt.generateEncryptedNeverminedApiKey(
        user,
        zeroDevSessionKey,
        marketplaceAuthToken,
        providerAddress,
        providerPublicKey,
      )
      assert.isDefined(key1)

      await sleep(2000)

      const key2 = await nevermined.utils.jwt.generateEncryptedNeverminedApiKey(
        user,
        zeroDevSessionKey,
        marketplaceAuthToken,
        providerAddress,
        providerPublicKey,
      )

      // console.log('Key1:', JwtUtils.decodeNeverminedApiKey(key1))
      // console.log('Key2:', JwtUtils.decodeNeverminedApiKey(key2))

      assert.isDefined(key2)
      assert.notEqual(key1, key2)

      const hash1 = JwtUtils.hashNeverminedApiKey(key1)
      const hash2 = JwtUtils.hashNeverminedApiKey(key2)
      console.log('Hash1:', hash1)
      console.log('Hash2:', hash2)
      assert.notEqual(hash1, hash2)
    })

    it('I can hash 2 keys and they are different', async () => {
      const key1 =
        'eyJpdiI6Ik0zcjltbmNOcEFzWnVwMk41YjA2eXc9PSIsImVwaGVtUHVibGljS2V5IjoiQkRvK2RuZlZ6RW9yQU5BR1RLWlBTczRBeUNKc2s2b0Qrb2V2TGhNckl4djBUcmFsT3RJTUtSRjhCT2pNdERrQ3ZnUk1hdTl4b0liQlBGd1dweVlYTG9jPSIsImNpcGhlcnRleHQiOiJIRllSMGhFMzhOYkZRL3pPYnZuOHdhdW9FQTdhaVVyUDZTUWg0eEJ4dWYzcEJRNlpVTHpLYnhVZkV0UnlhdXdGdEVEaUVqRlM4cjZkazZyY092WUtZUjhuMnkwN2hMUHF4aTFodVFLcU1XREQyNmhPblZZWjRNMDYySHhjcUxTUStlQUlIdFlYMnhrZ1RQcmxaUytZelNBdmhBemdqUnBIOTZkUi9Ia3dkVUMycDhERnFvaGdlN0lJUzN6VHpRSGRzdVFkbjRrZ1BxYitSRENGQjN0SHc1R2t2ZCticWRFSXZsTFBMQVh2bExUekQ4Rk5jL1hkRGJrVnJPTnFBN3dRSlA1anNCbzh2Q2ZGOVhIUUtTekFIa1JhOXFSaWd3TkZmMGQwTDlYWnUzcTFDZjlNaXgwTy9lK0xkRzZFbUZkejZ1Qmw0UmZnME5MbU5yZnl4QlpyTkJTU2lEa3RML1h4Q2pTcUVNQVpoSWloMlMvUFppWkhINTNTQlZPb0ZNNXZNMXppMGQvaHBsa3B1Uys4a0xTeTBObm4rK1NlbGpSc3pWa1pKNVdCaDg0MGpqcFYwditQZS9HMEVlekNDc2MzdDdiYUdEb0JadVZ3MzhLMnY2WUZRcHhDZjdoWFV3MmFDYjJ5aitRMnZvQ1NGWnMwVlBiWnNwNkk2VVY5NGVhWnBTa1d0UTZzSTVjVkFaM1M0ZmcvT25HK2pLUVFqa05hbnJjLzYvOWdlMGRqenFXNDEyYStLWmhrSHZ5UVNaY3RvSFpwN0tJY0JneGl5djlCSFB3Y2NHR2pndHlUNktNVWhhb0wwVHE3MnZtUHBBa0FvcW85VEgySTg4YjhpRTRvUHFTcmh1UThlbzd1b1ZEL3ZDZzRhdC9MbDRPakQ2ZGFsSFA2Sno5Y2Z5c2Jvcy9USFh4cWdHd2JqeTJIYW4rUlZ4VkNPZ0VUdjJkSUZkNmVPRjB6dWhiWVIxZXA2ZE1Vb2FySmZ6YnVadUx4bEZzckZwVUdtOUtoblc4ekZuOTJZbGhXSVAxSU9VSk80Y1lwN3dsdVBrR200VUNjelBpYUdQbUltLzNrSGxabXRhRXFsNHp1ZlQrNW5YTWt4dTFsZ3RFcnFGWW9XdHZMZGZtTHJwdmloSnJZUW9XSXVmN2VPSW55U0IxTzc3dlRra3Q3L2tacUZkUWhYOGJjdkFXczdXOS9TUHIvS2xEOHB0a1FPQ1k2NmVwMXRlckNNd2tORTNqRzRSZUNNNXZWSGFCWFdtTWJWVE9rTzY4UVM4QmdjNlFLSzZZR3Q0MktVb3dZVm9HKzMxRXdKS0UxTVc4K0ZYSitYb3VOb1Z3NEgvUVljcTJLa3orWmVoTTVLYzdWelZ6c0hOdU0rNGFWdXc0eUZSQVEzK3h2OUhIY1UvczRlaXRRUllPeEhSNURRVVYvZ2l3NWxNVEJ1TzBKNGgrT3FnZFZCa01UWGpJL2w5SlgyOThleTRqb09pL04yRkNZbExkZnlHUm9Tb1Z0a1RzWlN6NjZWbFBIZlAvYXlsSTNqYlk4L3htTHhtaW8zdUVHOFZEL3hjSFhLKzdwejNkVEI2UTlIVFM4K3hJU20vblVxZFBDRWxRbUVXSUZPMFFDOURna1BHZ3FJM3NoSUF1ZkhTSi85dEZ4RldTY2YwTGEvTmJSQ2Y5djBETTEycFV6ZDdFWlkwT2RXYS9FRE5GSjVSU0UyUlFsV1paRHJJMmNWbnlnY1ptRURDeWlsSDJvZzczcTN3VnZwZkEwQWFLTXA4VlN4MXRnR1hmSDdaSU4wQndqZCtKQmhpc1FITktFZXI3UlBRem9wMUcvTTZWVlZQcUk0U21tUkF1SWJ4aGFsblhHMEdnSTBsc09LYzJGbXVubTl2R1o2VUU1UDJIRTl0UEphY04yMUpIYldLLzMzSk9Ob3lzenQ2dGRXZ2JKcEZmcmNLL01kNE1rOGI5OUx3OHp1RUNBbzhWQnM5MTgxZ1VMN2FLTitGejFlT01GVnhialROaktVYnpWb24xb1AvaVNUTllLMk1sRGNXSzkyUFg5R2QrTkM2dG1lTDJsRmo1Z0tTYURBVy8yMTZuR3RxOWlHdzhhUVRCSzhjSXJRZG9OZjV6Q2VaQ2J2cE9Ld3M5MnBEdXFWbDBnNFF6NENValp0ZXk5dmQyczRBd2pnb0RZY0VUY3h1Sk55R3dncld5TVdBWnp5S1VGdU9Od3gyNmNpNHJySlFSbHZ6VGpUckliejYwV2h6R2xYaFkrOE4rQjhzZ1kxdEF2REtrMFFaYkttbmoxTUFVSUFkT0lEMmt3cDczWVJ6ZFVFVDBCWkp5a0lUTGtsODdxdGk2b0pMS3JMeWJwb29zQUcvUnNzdnBmOUl3MjJ4dkJKUmlSQkt1Tkg3RXk1UDNLUE9oRFRFd0dHcndIOGIrTEE5RjVSK053ZytkQTROUW4rL1VnVWpkY3MrTVhKLy9hWC9XOGxXVHJ2ZldSSDVmSVJFejlTNTV1ampaQlV1S1ZDc2cvbUJGRHhZU2pVYzBueXpteHNDditnZUdPTURJMGpMRVVVK2xmbFZ6Y2dONEhvMExwb3FYMFZSUG5ob3QySE41U3FiaVJWWUJ1OGdqeGw4QkErcVpNU2d1QStva0p5UVR1ck43WURQaUpsS3ZCN2dnOVBPTFBabEdSZTVSUEMwbXZpM2V5OGcrU0gzalgwaVI2aDZGblkwcW51S3d0UkhuZWlnanBXUVpFS0VnVmsvejZMTjd1NDZybk5Oc1QrQ21nOFAzeExKVyt2dUVGeC9sTzd1clMrUWcrNHBFbmY4RklMTGs0dFVuNXkzT0ZqcTNUdFdEYWxySGlUK0MvRldCMWptcE1Za0M2YW4vam9zUGk2N2FVV2I4WE4zTnFmN1B2Z25oMVFJenE1Sk9BVExkcTlzMVRpY29kMDVZN2JxOHB6MDlIb0NRaXJXUkR2NE44M0labkhTUXNhc1QwTkxsVW9zYmNCNUk3NDk5UlRnT09wSUU5NVE3VzlQZG5uU0lCWkxxdGU0UVBXcmREeUFVRDMwZUFmMDVUYmc5OW15OTRLdFBNclVOLy90ajRUb0ZBaGFYcldFdlBoeXI5cVdaYjZnbVBJT0hLdVc4c3VjU1VVeVhoUFprOWtnMVFsK0hFcEo4VGZ0MkJSTmNDNWllcDE0TTNSc0p2M1pHc3NpU1JHSC9qNWozbVp6Q1NQNG55RDlZbC9RS01KQkgySVBlZDErREc5UWRvb0E3OGlTNnNod0FOWWdFRlpkT3VydEtUVHlJdUZpRVdoaXYyYzY2empDY3l6eUROazByei9DMjA4c2hSWTl4ZWlISVRrbjc3OGhJUjR3dE1aZ0pSNGNPMk1YbGptZHl0d2ZDWnZXQlNiSjBmc0huM1hVdGhrTHEvbVNoeXIrc3pQSWdGSkp6UVdxaXZKZitTK2VqVHpmN1dOTkFQbUdtUGV5aElqVjlTZHZmeTdCVHA2SmQvYk5kdHM1V1BkRzhGV0tnTWFJMFA0aDlqOUdsbWliZVlTWFpNKzhTbFVyNGlyQldOZFhZMkxaanhLSFh6QUJXLzc2Vkc4R2ZQYjJBcGJidEtLRVdXT2cxYmJpSEIra081NjlOckJCTU9tYmZXQmc5U3ZacFZ6YVV0dGwyTjdqT2wzNFowMlpLa0xINCtLUk9qYXpoaVg0QkJGbHdZSG1hWUMyVEIveUJFUDUwQ2Y2WXlKNS92UnNtcDV5TmdIVHFsam5mb3R2TXpkYVRGMzZzcmVPWFU0WFBkKzg0RlJ5aGdFUkNpMUxjdjZLM3BXVnFIcGxkNkMyVU5PUHo1ZmlqaGswWExhc2FseDI0UmZDN3R5MzNjcHNTVmpkQVhaUHZRQlJiOWZ6OW5GbkJLSk5PYUlra1pJTjVZK0k5L04vQnV2QksrbTcrN3c3NGlqaG5YZERvY0plZnpvNlpRVDlseWh5bGNoVjQwSkdHSkE1N1lkaTVmUzQ1OFJId3dlNXlwek9Rb1BKQW1MMmFDcDRoYkI0L1QvdkZlbE9IMjRKc3Rsa3k5T0NEako0Y0daS3dBMnNNWkpvVzVjTVNKNW45b2dBZFkyY2NSN1pkai84QlZVSXlxTkd6VmtFVkJTWUNza2hNU25sdDVrdFpoanVuU21lUkdydktGeXo4MWkveERseEIvTS9zb1RRcm5XblVKbEN5TzBKdzBWL2Z3TndXdlRERmsvUmtRdVJqYm1sS1IydVhla1FIeWpKQ2o4cEd2WDk3OHR0S2w4c1luUncxbEY3NHFEcm9heWFFK2kyR3kvbTdtR0N2Q2tteE8ybU9WdEYrVUNmakg4dnorMzFrU2FMdDJWYVc4eUtCaitYQ0N5MlFtRlRmendpaVl1cmNVeTlWenltdDFSQmhnUzQvNDFQUCtUMC9nNldnSkllOC94aTBFM21pTERLdURpT0EzeURkUGk3OERLbVNwUFZHVE11MTBPVk5qc25rTzBrWGpaOTlub1ZselRVWmVFdTNib0JZMmJMY0h2cXdobVloaFdoSVByamV1a3BWMTI3Mm5vQXJ2Y2VqbXcrRTd2ZTBvSW84LzVsQTNBRXplL1UySTJsSHhCZlFXNFVxWE1CbndVWkU1aEtlZ0lBPT0iLCJtYWMiOiJ5SFRsdnRHcDdoNzJ4QVJMdGFwalpzeHNtdDRxYnRWOHk5N0VwSkwzYjk4PSJ9'
      const key2 =
        'eyJpdiI6InJ4WGtMTzRDTzJtYm5jaDY3M0VlUHc9PSIsImVwaGVtUHVibGljS2V5IjoiQkEzVDRUNklqR3M4MXIzVWdHL20wWk0ranNZRU1wWXh6RlQ3R0hJWktnOXN4dGN4azdCWmJGd2FLamkvTU9lZ2FMUXpUYkhHV2pVb3RBRFowZ0w5VUc4PSIsImNpcGhlcnRleHQiOiJmMVZkT3REaDJPMkxtcGJqby9nUktKQzlBenJzQkd6aWZFT1BzM1gwVUlzWjFVQTNZTkhOVHIxSXNhMEhMQXVVNEk1Zk9RVzlWWnhCNXZHVU9ISHN3ZUJzSW9xc2JaZjlBZE0xQnFpN21ISHBOQTB6VzU4dzZmaHdIdVZ3SnFWZzZCZTFjUVlDb0lLZUlrdkc2MEdiMWpYUkZlUnRNZ29sNGFGZ0g4VFQwMGM2blJibVFib0I3U3BkUEJNZjUwc2FkNVVBSHNJS082M0d3SWowY1NrdkJPZjZXTGJiSXZDT25KMUJhNldDMWkycjdPNnNJVW43Z3ZFQkxjcUJQcWFyRFRJMVFiNEpldjgyM3NteUtoejVCVHVicXd6WXNQYUptWm0rbC9nZjJEVzROUTUwTGpMMnJ1WktERG9tY2luQjZBVzNRUGxMUy9WSk9GSWsvQjBFNGtnWHhGS3JPTGtHT1hEQWNpbGFjZDBDQ3dNaXZmeTMxMTcyalMzZVgyL3lDYlBGbEx3ckVCVlVJT0Fqb2ZrcEFvcXhOaDZsTjR5YlJZSzdtN3JreHZWVzVPamt6V1NqZ1dHYjhNOGYyTXdZZlpxSk1lb01UOVoxcFM1VnFIWXU4Q0hsdFQ0aUJMb1FmclZSS3hJeGJYczNqZUdHd09yTmVMSWVwaGdBNit1SlU3elc3R0kxSmRNNU55elBqWXFHM0xWVldxVTNWOHFHd2JidGpmN2F2ME9nVG5MaEVGZk9Qc2RZanZNYW96YmpNdmc3YVJxZVdJUGtSdGF2NEpPRVlqUlQ0eFJvdUFBMTZRYXRYdjRNU0gwSUJ5NTIzVGUxVGxEYjRXVy9QMDRib0tsdGc1QjJndWw4Nk1td1pYRWtkQTJaclkvM2JzZjlkNjNmU0JnVkI0K2FGL1o2YmdQK1lSWXV6djJyeUVQUUUxckQ1WnFCY2xaZHpmQlVWVmczemVVVjljM3QvWlI2VjBzemc4Wm50SmJsQ3VoWVc5cHlPV0owWkorR1dObC9vcFFObmdWc3Z4QTQ0MjFWY0RWYlN4MHAxNmtUL090cWYwckpKL3NJdVBkMXd4dXNJdEF2RzFXYlpoWEQwakN4Rk5DM0RQSXgwM2FkM2ZCcFR6K3ltcGMyWXZKN3FQVi9pL2s1amxGS3JjZ3NRWWFIMXd3aVVtQmhMSmtQK0ZYT0pZeWF2M0VlY1h1aWNZZGlGbzM2cGdvRDNwTzNxQnFzMnpmU0R5eTh4dzNSQktMRk1kSVdGVEVVeFVoTndhZWQyTlFyRCtvSlltajRHbksvL3FjTG5Td3R5K1AydGFRMC8yNTZwR0xycW1GNHM0eStUSFR2MU9LT3g3TkRNU3BZQ3c4ejBMd25WZmRhSVJHZTVpVWgzazRuZ2ZQWjdyMFNyQ1AvWGZETFVtTk5JS3VPcEJUU2RvUUtyNzhMMnAzREg1UFZ3czRvNjNZaCtZaHliVEJzWmUyQjhxeUlmaDhSa01FQjdQbVZtUGRmRGEyWldCTVJzZHJmaXhPWVdRYmV0NHBNVlpMMjQrd1cycm5yQ1BwQW9FZDdkZURkVTJsKzV1QXBnQTVVZ0ZvdklYZ1VweDhlZ0UrTVZXQlRwcFgrK2NrbWVkdTZWSFNjQWxXRmN6cGk2U2M4NkhMQm01enhOTnc4VE56SXhLNlFhUXZla1YycUlvOU05d0V6MStXVWFnV2xwVUFmekJiTWg4eS9KMEhtSGNBdGNIamF4UWtGQS9WU25sQm9CTlFKT3dHS3pBRUNlVHZuNDRDempTeWdhOHRkL2R4ZWttWWExRFZPbXhHeXdCdHlCK0d0VnZ2NnNXeEl1VitaZ0FzZTlja280aEl6a3VtMWlYMGJuY3hrSGJQM05PdTRwRFlnOS83RThnRDBBdVFDMEdXUDBUVmZwVERoYkg0bVFqVlNvUStSMDZyc0tUR0h6aFVqQitRMDVvdmpLTmZ3Tkx5MGVkeU9QNjc0NHdrLzlTSC9LSDBoM0Z0RHFpZmNvYnBzYVRwUG1JV3lsKzB5VnVoZ3doQnNyeGpENC8rRGE2cFc2OTdMS2ZlTVZPbnVWeGNJVGtFc1RmOHk1RG9iYnN4cFRqdVp3UUx0NXJCVlA5Uk12V3FDVXhHRnVSZ2ZnaWpERm9uaFhHdTV6ck5IN2ZJRFh5OW43WEZLSXpCbkR0S2hQblB4azZLWGRQY3FiektZRWV0MExNaEdka1JRUnovTDVWSm9CZzNFcmFxWGo1cnBYNkZtZy9YUjZQMHNBMEUxU2NTVFdiN2p3QUNXYWNFYjJVaFNGUXlBbU1xUHEzTDV4TTdvN0lickQ0UzVOQTNMckZXTmg5K2Y1MkZlZmE4cTZwSEVpcFVuaURJd3kvZzVLeHRncU42VzI5eDN1akFNYzdPL1MvNk9jNXo4RmdCQzREL0h1eFVIaWpramFmVzc3eng4MllzNkZaeG54Z1JaNmNEY3lPcndtTkorb1RLaU0wM1FCOEwxYk95ZVdYK0J0WFRVRU80ZTlTQ0NJRmZLK0dMV2JrMUU2U1FkUUVYNWh6ZU9sSG1NTjFrN2w2QUc0emE3U2pJVTVHSXdSMzNvRHpaMGxlZk9GejQ5YzVxeTZnN0R0NklFYi9FaEJKb1ZkOFpXYTlnZUdLTUx3Skx3bnk3QXArWDU0OVRqeFBSZ0hWSFp3QVBiVmdjME81S20wRjNDTkthRzJHTXEwRGFHV0dSMnIyTWNIcWtrYzNIRE9kQytSdFh3dUkzZmNzN3owRlBVYXptNHRSckhEaUNvUUIyc0RPTzZjeTYwemErd0VCRm5CVjY4RjBqVzFVNWlpSTZmenJaTDMrSDVHaVN2Nk13UUZ0Nk9HYVJadDRzeTBoM2Z6TTRCcHJKZE5rUWVZSmFibHhGR1RrS05kQ2pnMklHcUZrZkxLdVFKWjc2ZGVaQ2JFQmJGc3NtMVhlNkJEdmhOYldxRk91MjN2SVpTR0RZWDEwK0NBUUNYVTVEempDUmZXdFB5cW1xaXJ4V1kzWTFRWmFpT1cwaDFUWjRLRWxIa1g2Wm9ZOVgwaUtwYnNFQSs2cTR5MkFtcEFFa0NTd0dWZ21DUWxsSkxLRXEveWFpblJaZ09jd0J1cVZTQi95Si9aM2h4c0ovNWRWWXNIR1BTUHlCZWNyTWVJSGhscE1ya3NmU3dKOXNvMno1YWpMdU8wb2I2WnBFcFJRRUhhK0lWWUpPckpjNnVOblk5RjM3N202K2ZJWjkxcEVPQ3FzRVd6N1VJSThhQVkzRWYxV1BORjA0OXZpZDBwYUNxMm1qSU5rNFBUR3pIMHJNTlRUL2RBQjlKNXdqYVhob3VGazZ5cWhFVDZKbHljWENsWUx4eTNZbkhHWEMxMEl1OFlCUVR6S3p4UWluZWxhdkZ3NzQwQlNsNml6eEZxK0U2TVFJSzVLWGFVNWF4SVk4UnVWWFNUQmt2NERBVS9VRjlDZVRhNi9RYjBaakJodUlQVXk0bDlSRldmYm15QTZwMWMrNEJYUk0wUHprbkZkS0hna3pQMUdRMTN0b0R1ZTNwd0ZuazdRT2NaTFd0UkFKYk16NUpRV3dybjEzdFVYVnRlcjFrdXZZQ0RWZTZrSFVheHBmY09IeFdDZzJjeVM0WXZYTWxsZWI0dUdnTElIc2dGeG5LNDNlSi9jWVZxZ3VmQnU2eTVBT1k5L3hMenJxN0Nvc2orckgxeGU1Yi9BQzBZelFjcStxazZwd2diZDdVeDNXcXAyUE05R2t4czdwbVFPcWdTZUgzNlluOU9VUkE4L1VKcElsSjVOK2xtUTRNR3pwczhLWFdBeXRvUzRUQUFHYTRSa1h2YUh3OFdCanVkdlFSdzBYQkpkQnZsN3dLVy9KeEd6dTJubW85Q3h6cWtGZDlZSjZQZ2lZUDhBU3BRMXRGdUp5Rms0T1I2TGFWdVFHUDdqbzdyTDhtR1FHTzZ5dHVyb1JnU00yNVByUGRBejNyOTQ1eEwyMjNSWW0xb3IyTjZMSWxvK1ROYXRFTVJTL3BnUE1iS2dJRXNmdVlRaXU1d3NzZkFERmltMkoyb2ZqeEs1eTNWbjJWUUJuOTNFNWJYaG5LaW1uYmZ6bjVNeDNKMnJIVStXZmZHelVHYTA0VmtBWFM4OXFlT2ovUnM5dzcwZG5TdThpeGkzbm9LMnoydWJlQ3VmS2hvRWZSc2RjZTBXa1pkMGVqeGw1YVhkeE9KZFpVSkVxL0xwL1Y1aC81K2V1QU1vd1pJVW84bU1BbTBYWWpQUHpwY3p5MzFjbXVZc05LME9yTDFZMmtMOEpMK1N5bnhtUEpwSmxaZERUV3plbXNFZW1OQWM2RmRnOGpja2hrRzFWTndxMFJFUWcvVGlMdUs0OXArVU1TOWtYdjVvaGV6c0g5b0xhZGE5cHVXYWF6MDBuRmd6MCttdXRLNlFldHpyVzZrYnFjdFVzYmhlNm93aUdSenZGOTF3dW5HNzQyaTg3Y1dRbHFZU2ZTY3R0SHREWXFJWWdrMit4KzNPa3g3UkxNZm9XVFZCUTY4ZDFZQTNKclZhbmk1aUlVVkF6YXhLN1RwelRsWjVZY2g0eFVvZCtkT01ac250UTc1R0hyQ3phM2lKWDJhaW94YzdCRWNBPT0iLCJtYWMiOiJuSWpBUm1YNWVHbC9YWHhxMVljcVFyRkY5clRMeFB2K244emxlcXBSdlBvPSJ9'
      const hash1 = JwtUtils.hashNeverminedApiKey(key1)
      const hash2 = JwtUtils.hashNeverminedApiKey(key2)
      console.log('Hash1:', hash1)
      console.log('Hash2:', hash2)
      assert.notEqual(hash1, hash2)
    })
  })
})
