import { assert, expect, spy, use } from 'chai'
import spies from 'chai-spies'

import { DDO } from '../../src/ddo/DDO'
import { Service } from '../../src/ddo/Service'
import { Nevermined } from '../../src/nevermined/Nevermined'
import config from '../config'
import TestContractHandler from '../keeper/TestContractHandler'

import * as jsonDDO from '../testdata/ddo.json'

use(spies)

describe('DDO', function() {
    const testDDO: DDO = new DDO({
        id: `did:nv:${'a'.repeat(64)}`,
        publicKey: [
            {
                id: 'did:nv:123456789abcdefghi#keys-1',
                type: 'RsaVerificationKey2018',
                owner: 'did:nv:123456789abcdefghi',
                publicKeyPem: '-----BEGIN PUBLIC KEY...END PUBLIC KEY-----\r\n'
            },
            {
                id: 'did:nv:123456789abcdefghi#keys-2',
                type: 'Ed25519VerificationKey2018',
                owner: 'did:nv:123456789abcdefghi',
                publicKeyBase58: 'H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV'
            }
        ],
        authentication: [
            {
                type: 'RsaSignatureAuthentication2018',
                publicKey: 'did:nv:123456789abcdefghi#keys-1'
            },
            {
                type: 'ieee2410Authentication2018',
                publicKey: 'did:nv:123456789abcdefghi#keys-2'
            }
        ],
        service: [
            {
                attributes: {
                    additionalInformation: {
                        links: []
                    },
                    main: {
                        files: [],
                        publicKey:
                            'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC2qIisJyMd6YXJNzs23zKLajtPC7w6aO9mXq+Ukr6d3cVmPCx8XJRTT3IV7PmHb3o4XFc8ZGX5/SSg7tp5/cfAIg9XF13yjssJttaDTa4srhLJvxyjR8cHEJ39GevFTgrtbYzXTZ723ROJP4NEDxtp8a0f5l7W3NTH8v39k3G50QIDAQAB',
                        service: 'PSK-RSA'
                    }
                },
                index: 2,
                serviceEndpoint: 'http://localhost:8030',
                type: 'authorization'
            },
            {
                type: 'metadata',
                index: 0,
                serviceEndpoint:
                    'http://mymetadata.org/api/v1/provider/assets/metadata/{did}',
                attributes: {
                    main: {
                        name: 'UK Weather information 2011',
                        type: 'dataset',
                        dateCreated: '2012-10-10T17:00:000Z',
                        datePublished: '2012-10-10T17:00:000Z',
                        author: 'Met Office',
                        license: 'CC-BY',
                        price: '10',
                        files: [
                            {
                                index: 0,
                                checksum: 'efb2c764274b745f5fc37f97c6b0e761',
                                contentLength: '4535431',
                                contentType: 'application/json',
                                resourceId:
                                    'access-log2018-02-13-15-17-29-18386C502CAEA932'
                            },
                            {
                                index: 1,
                                checksum: '085340abffh21495345af97c6b0e761',
                                contentLength: '12324',
                                contentType: 'application/json'
                            },
                            {
                                index: 2,
                                contentType: ''
                            }
                        ]
                    },
                    curation: {
                        rating: 0.93,
                        numVotes: 123,
                        schema: 'Binary Voting'
                    },
                    additionalInformation: {
                        description:
                            'Weather information of UK including temperature and humidity',
                        copyrightHolder: 'Met Office',
                        workExample:
                            '423432fsd,51.509865,-0.118092,2011-01-01T10:55:11+00:00,7.2,68',
                        links: [
                            {
                                sample1:
                                    'http://data.ceda.ac.uk/badc/ukcp09/data/gridded-land-obs/gridded-land-obs-daily/'
                            },
                            {
                                sample2:
                                    'http://data.ceda.ac.uk/badc/ukcp09/data/gridded-land-obs/gridded-land-obs-averages-25km/'
                            },
                            {
                                fieldsDescription: 'http://data.ceda.ac.uk/badc/ukcp09/'
                            }
                        ],
                        inLanguage: 'en',
                        categories: ['Economy', 'Data Science'],
                        tags: ['weather', 'uk', '2011', 'temperature', 'humidity'],
                        updateFrequency: 'yearly',
                        structuredMarkup: [
                            {
                                uri: 'http://skos.um.es/unescothes/C01194/jsonld',
                                mediaType: 'application/ld+json'
                            },
                            {
                                uri: 'http://skos.um.es/unescothes/C01194/turtle',
                                mediaType: 'text/turtle'
                            }
                        ]
                    }
                }
            }
        ]
    })

    let nevermined: Nevermined

    beforeEach(async () => {
        await TestContractHandler.prepareContracts()
        nevermined = await Nevermined.getInstance(config)
    })

    afterEach(() => {
        spy.restore()
    })

    describe('#serialize()', () => {
        it('should properly serialize', async () => {
            const ddoString = DDO.serialize(testDDO)
            assert(ddoString)
            assert(ddoString.startsWith('{'))
        })
    })

    describe('#constructor()', () => {
        it('should create an empty ddo', async () => {
            const ddo = new DDO()
            assert(ddo)

            assert(ddo.service.length === 0)
            assert(ddo.authentication.length === 0)
            assert(ddo.publicKey.length === 0)
        })

        it('should create an predefined ddo', async () => {
            const service: Partial<Service> & any = {
                serviceEndpoint: 'http://',
                description: 'nice service'
            }

            const ddo = new DDO({
                service: [service as any]
            })
            assert(ddo)

            assert(ddo.service.length === 1)
            assert((ddo.service[0] as any).description === service.description)

            assert(ddo.authentication.length === 0)
            assert(ddo.publicKey.length === 0)
        })
    })

    describe('#deserialize()', () => {
        it('should properly deserialize from serialized object', async () => {
            const ddoString = DDO.serialize(testDDO)
            assert.typeOf(ddoString, 'string')

            const ddo: DDO = DDO.deserialize(ddoString)
            assert.instanceOf(ddo, DDO)

            assert.equal(ddo.id, testDDO.id)
            assert.equal(ddo.publicKey[0].publicKeyPem, testDDO.publicKey[0].publicKeyPem)
        })

        it('should properly deserialize from json file', async () => {
            const ddo: DDO = DDO.deserialize(JSON.stringify(jsonDDO))
            assert(ddo)

            assert.equal(ddo.id, jsonDDO.id)
            assert.equal(ddo.publicKey[0].publicKeyPem, jsonDDO.publicKey[0].publicKeyPem)
        })
    })

    describe('#getChecksum()', () => {
        it('should properly generate a the checksum DDO', async () => {
            const ddo = new DDO(testDDO)
            const checksum = {}
            for (const svc of ddo.service) {
                checksum[svc.index] = ddo.checksum(
                    JSON.stringify(testDDO.findServiceByType(svc.type).attributes.main)
                )
            }
            assert.equal(
                ddo.checksum(JSON.stringify(checksum)),
                '0x7c55033a661cd6d08edeacfc6fe6644d2c96d07be43f6e6e38af56bd2a10d57f'
            )
        })
    })

    describe('#generateProof()', () => {
        const publicKey = `0x${'a'.repeat(40)}`

        it('should properly generate the proof', async () => {
            const ddo = new DDO(testDDO)
            const checksum = {}
            for (const svc of ddo.service) {
                checksum[svc.index] = ddo.checksum(
                    JSON.stringify(ddo.findServiceByType(svc.type).attributes.main)
                )
            }
            const proof = await ddo.generateProof(nevermined, publicKey)
            assert.include(proof as any, {
                creator: publicKey,
                type: 'DDOIntegritySignature',
                signatureValue: ''
            })
        })
    })

    describe('#addProof()', () => {
        const publicKey = `0x${'a'.repeat(40)}`

        it('should properly add the proof on the DDO', async () => {
            const fakeProof = {
                creation: Date.now(),
                creator: 'test',
                type: 'test',
                signaturValue: 'test'
            } as any
            const ddo = new DDO(testDDO)
            const generateProofSpy = spy.on(ddo, 'generateProof', () => fakeProof)
            await ddo.addProof(nevermined, publicKey)

            assert.equal(ddo.proof, fakeProof)
            expect(generateProofSpy).to.have.been.called.with(publicKey)
        })
    })
})
