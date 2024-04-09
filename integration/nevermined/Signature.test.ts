import { assert } from 'chai'
import config from '../../test/config'
import { Nevermined } from '@/nevermined/Nevermined'
import { NvmAccount } from '@/models/NvmAccount'
import { DDO } from '@/ddo/DDO'
import { Service } from '@/types/DDOTypes'

// WARN: not integration test. It has been done here because constant values
// depends on the first account on localnet (only accessible from integration test)
describe('Signature', () => {
  let nevermined: Nevermined
  let consumer: NvmAccount

  before(async () => {
    nevermined = await Nevermined.getInstance(config)

    // Accounts
    ;[consumer] = nevermined.accounts.list()
  })

  it('hashServiceAgreement should generate the correct signature', () => {
    const templateId = `0x${'f'.repeat(40)}`
    const agreementId = `0x${'e'.repeat(64)}`

    const accessId = `0x${'a'.repeat(64)}`
    const lockId = `0x${'b'.repeat(64)}`
    const escrowId = `0x${'c'.repeat(64)}`

    const hash = nevermined.utils.agreements.hashServiceAgreement(
      templateId,
      agreementId,
      [accessId, lockId, escrowId],
      [0, 0, 0],
      [0, 0, 0],
    )

    assert.equal(
      hash,
      '0xf7a44b02a1daebf84d852a5ce7f1e04b486c208557afa08430ee44844f70b957',
      'The signature is not correct.',
    )
  })

  it('signServiceAgreement should generate the correct signature', async () => {
    const { templates } = nevermined.keeper

    const did = `did:nv:${'c'.repeat(64)}`
    const templateId = `0x${'f'.repeat(40)}`
    const agreementId = `0x${'e'.repeat(64)}`

    const serviceAgreementTemplate = templates.accessTemplate.getServiceAgreementTemplate()

    const ddo = new DDO({
      id: did,
      service: [
        {
          type: 'access',
          index: 0,
          purchaseEndpoint: undefined,
          serviceEndpoint: undefined,
          templateId,
          attributes: {
            serviceAgreementTemplate,
          },
        } as Service,
      ],
    })

    const signature = await nevermined.utils.agreements.signServiceAgreement(
      ddo,
      'access',
      agreementId,
      [`0x${'1'.repeat(64)}`, `0x${'2'.repeat(64)}`, `0x${'3'.repeat(64)}`],
      consumer,
    )

    assert.equal(
      signature,
      '0xbc0139773ad023418e8261dc8e17f0c6d30829e76dbd0c6ba99086349759be2e05e86a5a8f0c7317d4257ac252ab7d3fbbffd74e2a4abec36839cd3f1d46df091c',
      'The signature is not correct.',
    )
  })
})
