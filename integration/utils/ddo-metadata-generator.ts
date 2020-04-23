import { MetaData } from '../../src' // @oceanprotocol/squid

const metadata: Partial<MetaData> = {
    main: {
        name: undefined,
        type: 'dataset',
        dateCreated: '2012-10-10T17:00:00Z',
        datePublished: '2012-10-10T17:00:00Z',
        author: 'Met Office',
        license: 'CC-BY',
        price: '21' + '0'.repeat(18),
        files: [
            {
                index: 0,
                contentType: 'application/json',
                url:
                    'https://raw.githubusercontent.com/oceanprotocol/squid-js/master/package.json'
            },
            {
                index: 1,
                contentType: 'text/plain',
                url:
                    'https://raw.githubusercontent.com/oceanprotocol/squid-js/master/README.md'
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

export const generateMetadata = (name: string, price?: number): Partial<MetaData> => ({
    ...metadata,
    main: {
        ...metadata.main,
        name,
        price: (price || 21) + '0'.repeat(18)
    },
    additionalInformation: {
        ...metadata.additionalInformation
    }
})

export const getMetadata = (price?: number) => generateMetadata('TestAsset', price)
