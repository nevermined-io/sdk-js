import { assert } from 'chai'
import { config } from '../config'
import { Nevermined, Account, DDO } from '../../src'
import { Service } from '../../src/ddo'

// WARN: not integration test. It has been done here because constant values
// depends on the first account on localnet (only accessible from integration test)
describe('Signature', () => {
    let nevermined: Nevermined
    let consumer: Account

    before(async () => {
        nevermined = await Nevermined.getInstance(config)

        // Accounts
        ;[consumer] = await nevermined.accounts.list()
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
            [0, 0, 0]
        )

        assert.equal(
            hash,
            '0x67901517c18a3d23e05806fff7f04235cc8ae3b1f82345b8bfb3e4b02b5800c7',
            'The signature is not correct.'
        )
    })

    it('signServiceAgreement should generate the correct signature', async () => {
        const { templates } = nevermined.keeper

        const did = `did:nv:${'c'.repeat(64)}`
        const templateId = `0x${'f'.repeat(40)}`
        const agreementId = `0x${'e'.repeat(64)}`

        const serviceAgreementTemplate =
            await templates.accessTemplate.getServiceAgreementTemplate()

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
                        serviceAgreementTemplate
                    }
                } as Service
            ]
        })

        const signature = await nevermined.utils.agreements.signServiceAgreement(
            ddo,
            'access',
            agreementId,
            [`0x${'1'.repeat(64)}`, `0x${'2'.repeat(64)}`, `0x${'3'.repeat(64)}`],
            consumer
        )

        assert.equal(
            signature,
            '0x3aa8a1c48b8e582d694bbd4ba3a29fde573b78da9720dc48baeb831b2163e1fa6e10e983882ebf8a00f4124de2505136354fd146934053f0d58bba4eced5f8d01b',
            'The signature is not correct.'
        )
    })
})
