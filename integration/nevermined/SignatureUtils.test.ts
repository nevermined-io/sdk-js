import { assert } from 'chai'

import { Nevermined } from '@/nevermined/Nevermined'
import { NvmAccount } from '@/models/NvmAccount'
import config from '../../test/config'
import { SignatureUtils } from '@/nevermined/utils/SignatureUtils'

describe('SignatureUtils', () => {
  const text = '0123456789abcde'
  const signature =
    '0xb76f14f0a1664d14a667a7647baee471f76796cff97a6e78f2884bed352dea2c11b89286811ccd5640bfdc8a567a7151e4450ad6bf889ed37d971a4f39ea79cb1b'
  let nevermined: Nevermined
  let account: NvmAccount

  before(async () => {
    nevermined = await Nevermined.getInstance(config)
    ;[account] = nevermined.accounts.list()
  })

  describe('#signText', () => {
    it('should sign a text as expected', async () => {
      const signed = await nevermined.utils.signature.signText(text, account)

      assert.equal(signed, signature)
    })

    it('verify is signer', async () => {
      const isSigner = await nevermined.utils.signature.verifyIsSigner(
        text,
        signature,
        account.getId(),
      )
      assert.isTrue(isSigner)
    })
  })

  describe('#verifyText', () => {
    it('should recover the privateKey of a signed message', async () => {
      const signerAddress = await SignatureUtils.recoverSignerAddress(text, signature)
      assert.equal(account.getId(), signerAddress)
    })
  })
})
