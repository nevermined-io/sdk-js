// @ts-nocheck
import chai, { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import config from '../../test/config'
import { Nevermined } from '../../src/nevermined/Nevermined'
import { NvmAccount } from '../../src/models/NvmAccount'
import { JwtUtils } from '../../src'
import { encryptMessage, decryptMessage } from '../../src/common/helpers'
import { sleep } from '../utils/utils'

chai.use(chaiAsPromised)

describe('Nevermined API Key', () => {
  let encryptedNvmApiKey: string
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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweEJlNTllNjczNEY1NGEzOThlOTUwRjAxOUJkNEI4RkJkNjk3MGQ0NzAiLCJzdWIiOiJ1cy0wMDBhM2JjYy0wZTNhLTQ4MjgtOWRmYi1jNGFmNjFjMDNmMjciLCJyb2xlcyI6W10sImlhdCI6MTcxNDk3OTQ2NywiZXhwIjoxNzE2MTg5MDY3fQ.K1YP3AG6WqV-6UiJeWqkLGQMgWSz5s0jKZfyMIXUS2k'

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
      encryptedNvmApiKey = await nevermined.utils.jwt.generateNeverminedApiKey(
        user,
        zeroDevSessionKey,
        marketplaceAuthToken,
        providerAddress,
      )
      assert.isDefined(encryptedNvmApiKey)
      console.log('NVM API Key:', encryptedNvmApiKey)
      console.log('JWT Compressed size:', encryptedNvmApiKey.length)
    })

    it('The token is valid', async () => {
      assert.isTrue(nevermined.utils.jwt.isNeverminedApiKeyValid(encryptedNvmApiKey))
    })
    it('The token can be decoded', async () => {
      const jwt = JwtUtils.decodeNeverminedApiKey(encryptedNvmApiKey)
      console.log(jwt)
      assert.equal(jwt.iss, user.getId())
      assert.equal(jwt.sub, providerAddress)
    })

    it('Encrypt and decrypt', async () => {
      console.log('Public key:', providerPublicKey)
      const encrypted = await encryptMessage(encryptedNvmApiKey, providerPublicKey)
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

    it('As a user I can generate a NVM API Key for the NODE', async () => {
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
  })
})
