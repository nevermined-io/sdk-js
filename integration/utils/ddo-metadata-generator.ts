import { MetaData } from '../../src'
import AssetRewards from '../../src/models/AssetRewards'

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
                url: 'https://github.com/nevermined-io/docs/blob/master/docs/architecture/specs/metadata/examples/ddo-example.json'
            },
            {
                index: 1,
                contentType: 'text/plain',
                url: 'https://github.com/nevermined-io/docs/blob/master/README.md'
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

export const generateMetadata = (name: string, price?: number, nonce: string | number = Math.random()): Partial<MetaData> => ({
    ...metadata,
    main: {
        ...metadata.main,
        name: name,
        price: (price || 21) + '0'.repeat(18),
        ...({nonce} as any),
    },
    additionalInformation: {
        ...metadata.additionalInformation
    }
})

export const getMetadata = (price?: number, nonce: string | number = Math.random()) => generateMetadata('TestAsset', price, nonce)

export const getAssetRewards = (receiver: string) =>
    new AssetRewards(receiver, Number(21 + '0'.repeat(18)))
export const getSplitAssetRewards = (receiver: string, receiverValue: string, marketplace: string, marketplaceValue: string) => {
    const rewardsMap = new Map()
    rewardsMap.set(receiver, Number(receiverValue))
    rewardsMap.set(marketplace, Number(marketplaceValue))
    return new AssetRewards(rewardsMap)
}
