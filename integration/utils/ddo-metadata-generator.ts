import { AssetPrice } from '../../src/models/AssetPrice'
import {
  DefaultPaymentAttributes,
  MetaData,
  PaymentAttributes,
  ResourceAuthentication,
} from '../../src/types/DDOTypes'

const metadata: Partial<MetaData> = {
  main: {
    name: '',
    type: 'dataset',
    dateCreated: '2012-10-10T17:00:00Z',
    datePublished: '2012-10-10T17:00:00Z',
    author: 'Met Office',
    license: 'CC-BY',
    files: [
      {
        index: 0,
        contentType: 'application/json',
        url: 'https://storage.googleapis.com/nvm-static-assets/files/ci/ddo-example.json',
      },
      {
        index: 1,
        contentType: 'text/plain',
        url: 'https://storage.googleapis.com/nvm-static-assets/files/ci/README.md',
      },
    ],
  },
  additionalInformation: {
    description: 'Weather information of UK including temperature and humidity',
    copyrightHolder: 'Met Office',
    workExample: '423432fsd,51.509865,-0.118092,2011-01-01T10:55:11+00:00,7.2,68',
    links: [
      {
        name: 'Sample of Asset Data',
        type: 'sample',
        url: 'https://foo.com/sample.csv',
      },
      {
        name: 'Data Format Definition',
        type: 'format',
        url: 'https://foo.com/sample.csv',
      },
    ],
    inLanguage: 'en',
    categories: ['Economy', 'Data Science'],
    tags: ['weather', 'uk', '2011', 'temperature', 'humidity'],
  },
}

const webServiceMetadata: Partial<MetaData> = {
  main: {
    name: '',
    type: 'service',
    dateCreated: '2022-10-10T17:00:00Z',
    datePublished: '2022-10-10T17:00:00Z',
    author: 'Nevermined',
    license: 'CC-BY',
    files: [
      {
        url: 'http://marketplace.nevermined.localnet/api/v1/docs/',
        contentType: 'application/json',
      },
    ],
    webService: {
      type: 'RESTful',
      endpoints: [
        {
          GET: 'http://127.0.0.1:3000',
        },
      ],
      openEndpoints: [
        'http://tijuana.inet:3000/openapi.json',
        'http://tijuana.inet:3000/.well-known/(.*)',
      ],
      internalAttributes: {},
    },
  },
  additionalInformation: {
    description: 'Endpoints allowing to read information from a Nevermined Marketplace',
    copyrightHolder: 'Nevermined',
    links: [
      {
        name: 'Swagger documentation',
        type: 'sample',
        url: 'http://marketplace.nevermined.localnet/api/v1/docs/',
      },
    ],
  },
}

const subscriptionMetadata: Partial<MetaData> = {
  main: {
    name: '',
    type: 'subscription',
    dateCreated: '2022-10-10T17:00:00Z',
    datePublished: '2022-10-10T17:00:00Z',
    author: 'Nevermined',
    license: 'CC-BY',
    files: [],
    paymentAttributes: [
      {
        paymentType: 'serviceAgreements',
        paymentEnabled: true,
      },
    ],
  },
  additionalInformation: {},
}

export const generateMetadata = (
  name: string,
  nonce: string | number = Math.random(),
): Partial<MetaData> => ({
  ...metadata,
  main: {
    ...metadata.main,
    name,
    ...({ nonce } as any),
  },
  additionalInformation: {
    ...metadata.additionalInformation,
  },
})

export const generateWebServiceMetadata = (
  name: string,
  endpoint: string,
  openEndpoints: string[],
  authType: ResourceAuthentication['type'],
  authToken?: string,
  authUser?: string,
  authPassword?: string,
  nonce: string | number = Math.random(),
): Partial<MetaData> => {
  const serviceMetadata = {
    ...webServiceMetadata,
    main: {
      ...webServiceMetadata.main,
      name,
      ...({ nonce } as any),
    },
    additionalInformation: {
      ...webServiceMetadata.additionalInformation,
    },
  }
  serviceMetadata.main.webService.endpoints[0] = { '(.*)': endpoint }

  if (authType === 'basic') {
    serviceMetadata.main.webService.internalAttributes.authentication = {
      type: 'basic',
      username: authUser,
      password: authPassword,
    }
  } else if (authType === 'oauth' || authType === 'bearer') {
    serviceMetadata.main.webService.internalAttributes.authentication = {
      type: 'bearer',
      token: authToken,
    }
    serviceMetadata.main.webService.internalAttributes.headers = [
      { Authorization: `Bearer ${authToken}` },
      { 'X-Extra-Header': 'hey there' },
    ]
  } else {
    serviceMetadata.main.webService.internalAttributes.authentication = {
      type: 'none',
    }
  }

  if (openEndpoints) {
    serviceMetadata.main.webService.openEndpoints = openEndpoints
  }
  return serviceMetadata
}

export const generateSubscriptionMetadata = (
  name: string,
  paymentAttributes: PaymentAttributes[] = DefaultPaymentAttributes,
  nonce: string | number = Math.random(),
): MetaData => {
  const _metadata = {
    ...subscriptionMetadata,
    main: {
      ...subscriptionMetadata.main,
      name,
      paymentAttributes,
      ...({ nonce } as any),
    },
    additionalInformation: {
      ...subscriptionMetadata.additionalInformation,
    },
  }

  return _metadata
}

export const getMetadata = (nonce: string | number = Math.random(), name = 'TestAsset'): MetaData =>
  generateMetadata(name, nonce) as MetaData

export const getAssetPrice = (receiver: string) =>
  new AssetPrice(receiver, BigInt('21' + '0'.repeat(18)))
