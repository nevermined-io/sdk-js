import { MetadataValidationResults } from '../nevermined/NvmApp'
import {
  MetaData,
  SubscriptionType,
  MetaDataMain,
  ResourceAuthentication,
  ChargeType,
} from '../types/DDOTypes'

export class NvmAppMetadata {
  public static getTimeSubscriptionMetadataTemplate(
    name: string,
    author: string,
    timeMeasure: string,
    customData: { [key: string]: any } = {},
  ): MetaData {
    const metadata = NvmAppMetadata.getSubscriptionMetadataTemplate(name, author)
    metadata.main.subscription = {
      subscriptionType: SubscriptionType.Time,
      timeMeasure,
    }
    metadata.additionalInformation = metadata.additionalInformation || {}
    metadata.additionalInformation.customData = {
      ...customData,
      subscriptionLimitType: SubscriptionType.Time,
      dateMeasure: timeMeasure,
    }
    return metadata
  }

  public static getCreditsSubscriptionMetadataTemplate(
    name: string,
    author: string,
    customData: { [key: string]: any } = {},
  ): MetaData {
    const metadata = NvmAppMetadata.getSubscriptionMetadataTemplate(name, author)
    metadata.main.subscription = {
      subscriptionType: SubscriptionType.Credits,
    }
    metadata.additionalInformation = metadata.additionalInformation || {}
    metadata.additionalInformation.customData = {
      ...customData,
      subscriptionLimitType: SubscriptionType.Credits,
    }

    return metadata
  }

  public static getSubscriptionMetadataTemplate(
    name: string,
    author: string,
    customData: { [key: string]: any } = {},
  ): MetaData {
    const _metadata = {
      main: {
        name,
        type: 'subscription',
        dateCreated: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
        datePublished: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
        author,
        license: '',
        files: [],
        paymentAttributes: [
          {
            paymentType: 'serviceAgreements',
            paymentEnabled: true,
          },
        ],
      } as MetaDataMain,
      additionalInformation: { customData },
    }

    return _metadata
  }

  public static getServiceMetadataTemplate(
    name: string,
    author: string,
    endpoints: { [verb: string]: string }[],
    openEndpoints: string[],
    openApiEndpoint: string | undefined,
    serviceType: string = 'RESTful',
    authType: ResourceAuthentication['type'],
    authToken?: string,
    authUser?: string,
    authPassword?: string,
    isPriceDynamic: boolean = false,
    customData: { [key: string]: any } = {},
    nonce: string | number = Math.random(),
  ): MetaData {
    const serviceMetadata = {
      main: {
        name,
        type: 'service',
        dateCreated: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
        datePublished: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
        author,
        license: '',
        files: [],
        webService: {
          type: serviceType,
          endpoints,
          openEndpoints,
          internalAttributes: {},
          chargeType: isPriceDynamic ? ChargeType.Dynamic : ChargeType.Fixed,
        },
        ...({ nonce } as any),
      },
      additionalInformation: {
        customData,
      },
    }
    if (openApiEndpoint) {
      serviceMetadata.main.webService.openEndpoints.push(openApiEndpoint)
      serviceMetadata.additionalInformation = {
        ...serviceMetadata.additionalInformation,
        customData: {
          openApi: openApiEndpoint,
        },
      }
    }

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
      ]
    } else {
      serviceMetadata.main.webService.internalAttributes.authentication = {
        type: 'none',
      }
    }

    return serviceMetadata
  }

  public static getFileMetadataTemplate(
    name: string,
    author: string,
    customData: { [key: string]: any } = {},
  ): MetaData {
    const _metadata = {
      main: {
        name,
        type: 'dataset',
        dateCreated: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
        datePublished: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
        author,
        license: '',
        files: [],
        paymentAttributes: [],
      } as MetaDataMain,
      additionalInformation: {
        customData,
      },
    }

    return _metadata
  }

  public static validateSubscription(
    metadata: MetaData,
    subscriptionType: SubscriptionType,
  ): MetadataValidationResults {
    const errorMessages: string[] = []

    if (!metadata.additionalInformation?.customData) errorMessages.push('Custom Data not included')
    if (!metadata.additionalInformation?.customData?.subscriptionLimitType)
      errorMessages.push('customData.subscriptionLimitType not included')
    if (
      metadata.additionalInformation?.customData?.subscriptionLimitType !==
      subscriptionType.toString()
    )
      errorMessages.push('invalid customData.subscriptionLimitType value')

    if (subscriptionType === SubscriptionType.Time) {
      if (!metadata.additionalInformation?.customData?.dateMeasure)
        errorMessages.push('customData.dateMeasure not included')
    }

    if (errorMessages.length > 0) return { isValid: false, messages: errorMessages }
    return { isValid: true, messages: [] }
  }
}
