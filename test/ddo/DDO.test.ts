import { assert, expect, spy, use } from 'chai'
import spies from 'chai-spies'
import Web3 from 'web3'

import { DDO } from '../../src/ddo/DDO'
import { Service } from '../../src/ddo/Service'
import { Ocean } from '../../src/ocean/Ocean'
import config from '../config'
import TestContractHandler from '../keeper/TestContractHandler'

import * as jsonDDO from '../testdata/ddo.json'

use(spies)

describe('DDO', () => {
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
                type: 'OpenIdConnectVersion1.0Service',
                serviceEndpoint: 'https://openid.example.com/'
            },
            {
                type: 'CredentialRepositoryService',
                serviceEndpoint: 'https://repository.example.com/service/8377464'
            },
            {
                type: 'XdiService',
                serviceEndpoint: 'https://xdi.example.com/8377464'
            },
            {
                type: 'HubService',
                serviceEndpoint:
                    'https://hub.example.com/.identity/did:nv:0123456789abcdef/'
            },
            {
                type: 'MessagingService',
                serviceEndpoint: 'https://example.com/messages/8377464'
            },
            {
                type: 'SocialWebInboxService',
                serviceEndpoint: 'https://social.example.com/83hfh37dj',
                description: 'My public social inbox',
                spamCost: {
                    amount: '0.50',
                    currency: 'USD'
                }
            } as any,
            {
                id: 'did:nv:123456789abcdefghi;bops',
                type: 'BopsService',
                serviceEndpoint: 'https://bops.example.com/enterprise/'
            },
            {
                type: 'consume',
                serviceEndpoint:
                    'http://mygateway.org/api/v1/gateway/services/consume?pubKey={pubKey}&serviceId={serviceId}&url={url}'
            },
            {
                type: 'compute',
                serviceEndpoint:
                    'http://mygateway.org/api/v1/gateway/services/compute?pubKey={pubKey}&serviceId={serviceId}&algo={algo}&container={container}'
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

    let web3: Web3
    let ocean: Ocean

    beforeEach(async () => {
        await TestContractHandler.prepareContracts()
        ocean = await Ocean.getInstance(config)
        ;({ web3 } = ocean as any)
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
            const checksum = ddo.getChecksum()

            assert.equal(
                checksum,
                '0x2e5ce7d48341008fcd22e5f1611720650c4454b495e3065ca7f1138d1b09d2e1'
            )
        })
    })

    describe('#generateProof()', () => {
        const publicKey = `0x${'a'.repeat(40)}`
        const signature = `0x${'a'.repeat(130)}`

        it('should properly generate the proof', async () => {
            const signTextSpy = spy.on(ocean.utils.signature, 'signText', () => signature)
            const ddo = new DDO(testDDO)
            const checksum = ddo.getChecksum()
            const proof = await ddo.generateProof(ocean, publicKey)

            assert.include(proof as any, {
                creator: publicKey,
                type: 'DDOIntegritySignature',
                signatureValue: signature
            })
            expect(signTextSpy).to.have.been.called.with(checksum, publicKey)
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
            await ddo.addProof(ocean, publicKey)

            assert.equal(ddo.proof, fakeProof)
            expect(generateProofSpy).to.have.been.called.with(publicKey)
        })
    })
})
