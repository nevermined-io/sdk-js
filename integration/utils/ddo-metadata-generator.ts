import { MetaData, AssetPrice } from '../../src'
import { BigNumber } from '../../src/utils'

const metadata: Partial<MetaData> = {
    main: {
        name: undefined,
        type: 'dataset',
        dateCreated: '2012-10-10T17:00:00Z',
        datePublished: '2012-10-10T17:00:00Z',
        author: 'Met Office',
        license: 'CC-BY',
        files: [
            {
                index: 0,
                contentType: 'application/json',
                url: 'https://github.com/nevermined-io/docs-legacy/raw/master/docs/architecture/specs/metadata/examples/ddo-example.json'
            },
            {
                index: 1,
                contentType: 'text/plain',
                url: 'https://github.com/nevermined-io/docs-legacy/raw/master/README.md'
            }
        ]
    },
    additionalInformation: {
        description: 'Weather information of UK including temperature and humidity',
        copyrightHolder: 'Met Office',
        workExample: '423432fsd,51.509865,-0.118092,2011-01-01T10:55:11+00:00,7.2,68',
        links: [
            {
                name: 'Sample of Asset Data',
                type: 'sample',
                url: 'https://foo.com/sample.csv'
            },
            {
                name: 'Data Format Definition',
                type: 'format',
                url: 'https://foo.com/sample.csv'
            }
        ],
        inLanguage: 'en',
        categories: ['Economy', 'Data Science'],
        tags: ['weather', 'uk', '2011', 'temperature', 'humidity']
    }
}

const webServiceMetadata: Partial<MetaData> = {
    main: {
        name: undefined,
        type: 'service',
        dateCreated: '2022-10-10T17:00:00Z',
        datePublished: '2022-10-10T17:00:00Z',
        author: 'Nevermined',
        license: 'CC-BY',
        files: [{
            url: 'http://marketplace.nevermined.localnet/api/v1/docs/',
            contentType: 'application/json',
            authentication: {
                type: 'basic',
                token: ''
            }
        }],
        webService: {
            type: 'RESTful',
            endpoints: [
                {
                    GET: 'http://localhost:3000'
                }
            ]
        }
    },
    additionalInformation: {
        description:
            'Endpoints allowing to read information from a Nevermined Marketplace',
        copyrightHolder: 'Nevermined',
        links: [
            {
                name: 'Swagger documentation',
                type: 'sample',
                url: 'http://marketplace.nevermined.localnet/api/v1/docs/'
            }
        ],
        inLanguage: 'en',
        categories: ['Marketplace', 'Data Science'],
        tags: ['assets']
    }
}

export const generateMetadata = (
    name: string,
    nonce: string | number = Math.random()
): Partial<MetaData> => ({
    ...metadata,
    main: {
        ...metadata.main,
        name,
        ...({ nonce } as any)
    },
    additionalInformation: {
        ...metadata.additionalInformation
    }
})

export const generateWebServiceMetadata = (
    name: string,
    nonce: string | number = Math.random()
): Partial<MetaData> => ({
    ...webServiceMetadata,
    main: {
        ...webServiceMetadata.main,
        name,
        ...({ nonce } as any)
    },
    additionalInformation: {
        ...webServiceMetadata.additionalInformation
    }
})

export const getMetadata = (
    nonce: string | number = Math.random(),
    name = 'TestAsset'
): MetaData => generateMetadata(name, nonce) as MetaData

export const getAssetPrice = (receiver: string) =>
    new AssetPrice(receiver, BigNumber.from('21' + '0'.repeat(18)))
