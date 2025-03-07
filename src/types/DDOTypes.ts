import { AssetPrice } from '../models/AssetPrice'
import { NFTAttributes, NFTServiceAttributes } from '../models/NFTAttributes'
import { NvmAccount } from '../models/NvmAccount'
import { TxParameters } from '../models/Transactions'
import { Babysig, ERCType, NeverminedNFTType } from '../types/GeneralTypes'

export interface Authentication {
  type: string
  publicKey: string
}

export interface Provider {
  type: string
  description: string
  environment: {
    cluster: {
      type: string
      url: string
    }
    supportedContainers: {
      image: string
      tag: string
      checksum: string
    }[]
    supportedServers: {
      serverId: string
      serverType: string
      price: string
      cpu: string
      gpu: string
      memory: string
      disk: string
      maxExecutionTime: number
    }[]
  }
}

export interface StageInput {
  index: number
  id: string
}

export interface StageTransformation {
  id: string
}

export interface StageOutput {
  metadataUrl: string
  accessProxyUrl: string
  metadata: MetaDataMain
}

export interface Stage {
  index: number
  stageType?: string
  input: StageInput[]
  transformation: StageTransformation
  output: StageOutput
}

export interface Workflow {
  coordinationType: 'argo' | 'fl-coordinator' | 'bacalhau'
  stages: Stage[]
}

export interface PaymentAttributes {
  paymentType: 'serviceAgreements' | 'stripe'
  paymentEnabled: boolean
  additionalAttributes?: {
    [key: string]: string
  }
}

export const DefaultPaymentAttributes: PaymentAttributes[] = [
  {
    paymentType: 'serviceAgreements',
    paymentEnabled: true,
  },
]

export interface Algorithm {
  language: string
  format?: string
  version?: string
  entrypoint: string
  requirements: {
    requirement?: string
    version?: string
    container?: any
  }
}

export interface ServiceDefinition {
  auth: {
    type: string
    user?: string
    password?: string
    token?: string
  }
  endpoints: {
    index: number
    url: string
    method: string
    contentTypes: string[]
  }
}

export interface ServiceMetadata {
  spec?: string
  specChecksum?: string
  definition: ServiceDefinition
}

export enum ExternalResourceFileType {
  Avatar = 'Avatar',
  Private = 'Private',
  CoverImage = 'CoverImage',
  TermsAndConditions = 'TermsAndConditions',
  SampleData = 'SampleData',
  Other = 'Other',
}

export interface MetaDataExternalResource {
  /**
   * File name.
   */
  name?: string

  /**
   * File URL.
   */
  url: string

  /**
   * File index.
   */
  index?: number

  /**
   * File format, if applicable.
   * @example "text/csv"
   */
  contentType: string

  /**
   * File checksum.
   */
  checksum?: string

  /**
   * Checksum hash algorithm.
   */
  checksumType?: string

  /**
   * File content length.
   */
  contentLength?: string

  /**
   * The type of the external resource file
   */
  resourceType?: ExternalResourceFileType

  /**
   * Resource ID (depending on the source). It is used to reference the id of the file in an external source.
   * For example the `ugcId`
   */
  resourceId?: string

  /**
   * File encoding.
   * @example "UTF-8"
   */
  encoding?: string

  /**
   * File compression (e.g. no, gzip, bzip2, etc).
   * @example "zip"
   */
  compression?: string

  /**
   * Encryption mode used.
   *
   * @remarks
   * If not provided is assumed the files are not encrypted. Currently only `dtp` is implemented.
   */
  encryption?: 'dtp' | 'dleq'
}

export const NeverminedQueryProtocolEndpoints: { [verb: string]: string }[] = [
  { POST: '/api/v1/agents/{DID}/tasks' },
  { GET: '/api/v1/agents/{DID}/tasks/(.*)' },
  { POST: '/api/v1/agents/search/subscriber/tasks' },
]

/**
 * Interface describing an asset of type `service`
 */
export interface WebService {
  /**
   * Type of Web service
   */
  type?: 'RESTful' | 'GrapQL' | 'RPC' | 'Other'

  /**
   * List of endpoints available for the service
   */
  endpoints?: { [verb: string]: string }[]

  /**
   * List of open endpoints available for the service. These endpoints are not protected.
   * This attribute is useful to indicate which endpoints are available for public access (documentation, definitions, etc).
   */
  openEndpoints?: string[]

  internalAttributes?: WebServiceInternalAttributes

  encryptedAttributes?: string

  /**
   * The type of charge for the service (fixed or dymanic).
   * If fixed the amount of credits to charge will be always the same.
   */
  chargeType?: ChargeType

  /**
   * Flag to indicate if the service is hosted by Nevermined infrastructure.
   * If true, the service/agent will be running using the Nevermined Backend service.
   */
  isNeverminedHosted?: boolean

  /**
   * Host of the service where the service is running.
   * This attribute when is given AND the service is hosted by Nevermined or implements the Query Protocol,
   * allows to populate automatically the endpoints using the service host.
   * Example: https://my-service.com or https://backend.nevermined.app
   */
  serviceHost?: string

  /**
   * Flag to indicate if the service implements the Nevermined Query Protocol.
   * See {@link https://docs.nevermined.io/docs/protocol/query-protocol}
   */
  implementsQueryProtocol?: boolean

  /**
   * The version of the Query Protocol implemented by the service.
   */
  queryProtocolVersion?: string
}

export enum SubscriptionType {
  Time = 'time',
  Credits = 'credits',
  Both = 'both',
}

export enum ChargeType {
  Fixed = 'fixed',
  Dynamic = 'dynamic',
}

export interface SubscriptionMetadata {
  subscriptionType: SubscriptionType
  timeMeasure?: string
}

export interface WebServiceInternalAttributes {
  authentication?: ResourceAuthentication

  headers?: { [verb: string]: string }[]
}

export interface ResourceAuthentication {
  type: 'none' | 'basic' | 'bearer' | 'oauth'

  user?: string
  password?: string
  token?: string
  privateParameters?: { [name: string]: string }[]
}

/**
 * Main attributes of assets metadata.
 * @see https://github.com/nevermined-io/docs/blob/master/docs/architecture/specs/metadata/README.md
 */
export interface MetaDataMain {
  /**
   * Descriptive name of the Asset.
   * @example "UK Weather information 2011"
   */
  name: string

  /**
   * Type of the Asset. Helps to filter by the type of asset,
   * initially ("dataset", "algorithm", "compute", "workflow", "model", "file", "subscription", "other", "agent").
   * @example "dataset"
   */
  type:
    | 'dataset'
    | 'algorithm'
    | 'compute'
    | 'workflow'
    | 'service'
    | 'subscription'
    | 'model'
    | 'file'
    | 'other'
    | 'assistant'
    | 'agent'

  /**
   * Sub type asssociated to the main type of the asset. This subtype is open so final users are not restricted to use anything they need.
   * Helps to filter by the sub type of asset, for example if type is a service, the subtype could ai-agent, web-service, web-socket-service, etc
   * Another example, if the type is 'dataset' the subtype could be 'tabular', 'parquet', 'csv', etc
   */
  subType?: string

  /**
   * The date on which the asset was created by the originator in
   * ISO 8601 format, Coordinated Universal Time.
   * @example "2019-01-31T08:38:32Z"
   */
  dateCreated: string

  /**
   * The date on which the asset DDO was registered into the metadata store.
   * This value is created automatically by Metadata upon registering,
   * so this value can't be set.
   * @example "2019-01-31T08:38:32Z"
   */
  datePublished?: string

  /**
   * The date on which the asset DDO was updated into the metadata store.
   * This value is created automatically by Metadata upon update,
   * so this value can't be set.
   * @example "2019-01-31T08:38:32Z"
   */
  updatedAt?: string

  nonce?: number

  /**
   * Name of the entity generating this data (e.g. Tfl, Disney Corp, etc.).
   * @example "Met Office"
   */
  author: string

  /**
   * Short name referencing the license of the asset (e.g. Public Domain, CC-0, CC-BY, No License Specified, etc. ).
   * If it's not specified, the following value will be added: "No License Specified".
   * @example "CC-BY"
   */
  license: string

  /**
   * Array of File objects including the encrypted file urls and some additional information.
   */
  files?: MetaDataExternalResource[]

  subscription?: SubscriptionMetadata

  webService?: WebService

  encryptedService?: any

  workflow?: Workflow

  algorithm?: Algorithm

  service?: Service

  ercType?: ERCType

  nftType?: NeverminedNFTType

  isDTP?: boolean

  paymentAttributes?: PaymentAttributes[]
}

/**
 * Curation attributes of Assets Metadata.
 * @see https://github.com/nevermined-io/docs/blob/master/docs/architecture/specs/metadata/README.md#curation-attributes
 */
export interface Curation {
  /**
   * Decimal value between 0 and 1. 0 is the default value.
   * @example 0.93
   */
  rating: number

  /**
   * Number of votes. 0 is the default value.
   * @example 123
   */
  numVotes: number

  /**
   * Schema applied to calculate the rating.
   * @example "Binary Voting"
   */
  schema?: string

  /**
   * Flag unsuitable content.
   * @example true
   */
  isListed?: boolean
}

/**
 * Additional Information of Assets Metadata.
 * @see https://github.com/nevermined-io/docs/blob/master/docs/architecture/specs/metadata/README.md#additional-attributes
 */
export interface AdditionalInformation {
  /**
   * Details of what the resource is. For a dataset, this attribute
   * explains what the data represents and what it can be used for.
   * @example "Weather information of UK including temperature and humidity"
   */
  description?: string

  /**
   * The party holding the legal copyright. Empty by default.
   * @example "Met Office"
   */
  copyrightHolder?: string

  /**
   * Example of the concept of this asset. This example is part
   * of the metadata, not an external link.
   * @example "423432fsd,51.509865,-0.118092,2011-01-01T10:55:11+00:00,7.2,68"
   */
  workExample?: string

  /**
   * Mapping of links for data samples, or links to find out more information.
   * Links may be to either a URL or another Asset. We expect marketplaces to
   * converge on agreements of typical formats for linked data: Nevermined
   * itself does not mandate any specific formats as these requirements are likely
   * to be domain-specific.
   * @example
   * ```ts
   * [
   *    {
   *      anotherSample: "http://data.ceda.ac.uk/badc/ukcp09/data/gridded-land-obs/gridded-land-obs-daily/",
   *    },
   *    {
   *      fieldsDescription: "http://data.ceda.ac.uk/badc/ukcp09/",
   *    },
   *  ]
   * ```
   */
  links?: { [name: string]: string }[]

  /**
   * The language of the content. Please use one of the language
   * codes from the {@link https://tools.ietf.org/html/bcp47 | IETF BCP 47 standard}.
   * @example "en"
   */
  inLanguage?: string

  /**
   * Categories used to describe this content. Empty by default.
   * @example ["Economy", "Data Science"]
   */
  categories?: string[]

  /**
   * Keywords or tags used to describe this content. Empty by default.
   * @example ["weather", "uk", "2011", "temperature", "humidity"]
   */
  tags?: string[]

  /**
   * An indication of update latency - i.e. How often are updates expected (seldom,
   * annually, quarterly, etc.), or is the resource static that is never expected
   * to get updated.
   * @example "yearly"
   */
  updateFrequency?: string

  /**
   * A link to machine-readable structured markup (such as ttl/json-ld/rdf)
   * describing the dataset.
   */
  structuredMarkup?: {
    uri: string
    mediaType: string
  }[]

  /**
   * A dynamic field containing marketplace specific data.
   * Can be used to store any non-default data, needs to be checked
   */
  customData?: {
    [key: string]: any
  }

  poseidonHash?: string
  cipher?: string

  providerKey?: {
    x: string
    y: string
  }

  secretId?: {
    x: string
    y: string
  }

  /**
   * Price store in the highest denomination and stored as a
   * number on elastic search
   *
   * @remarks
   * We currently do this because elasticsearch does not support
   * BigNumbers
   */
  priceHighestDenomination?: number
}

export interface MetaData {
  userId?: string
  main: MetaDataMain
  encryptedFiles?: string
  additionalInformation?: AdditionalInformation
  curation?: Curation
}

/**
 * Public key data.
 */
export interface PublicKey {
  /**
   * ID of the key.
   * @example "did:nv:123456789abcdefghi#keys-1"
   */
  id: string

  /**
   * Type of key.
   */
  type:
    | 'Ed25519VerificationKey2018'
    | 'RsaVerificationKey2018'
    | 'EdDsaSAPublicKeySecp256k1'
    | 'EthereumECDSAKey'

  /**
   * Key owner.
   * @example "did:nv:123456789abcdefghi"
   */
  owner: string

  publicKeyPem?: string
  publicKeyBase58?: string
  publicKeyHex?: string
}

/**
 * Nevermined Config DDO section
 *
 * @example
 * ```ts
 * "_nvm": {
    "userId": "dff40170-37fc-11ed-be5b-9984d9f9ec35",
    "appId": "acde070d-8c4c-4f0d-9d8a-162843c10333",
    "versions": [
      {
        "id": 1,
        "updated": "2020-01-01T19:13:24Z",
        "checksum": "89328493849328493284932"
      },
      {
        "id": 2,
        "updated": "2021-02-21T20:13:24Z",
        "checksum": "045328094852309483203443"
      }
    ]
  }
 * ```
 */
export interface NvmConfig {
  /**
   * The `userId` will be a `string` storing an identifier in `UUID` format.
   *
   * @remarks
   * Used to identify a user in the marketplace api
   */
  userId: string
  /**
   * The `appId` will be a `string` storing an identifier in `UUID` format.
   *
   * @remarks
   * Used to identity the application responsible for the DDO in the marketplace-api.
   * Useful for querying assets belonging to a particular app, allowing us to have multiple
   * apps using the same marketplace api
   */
  appId: string
  /**
   * The `versions` list stores the reference to all the changes done to the Metadata document.
   */
  versions: NvmConfigVersions[]

  /**
   * Block networks where the asset is available. It is represented as a map of network Id and a boolean value.
   */
  networks?: {
    [key: string]: boolean
  }
}

export enum ImmutableBackends {
  Filecoin = 'filecoin',
  IPFS = 'ipfs',
}

export interface NvmConfigVersions {
  /**
   * The id of the DDO revision.
   *
   * @remarks
   * This is a self incrementing number
   */
  id: number
  /**
   * The date when the update occurred.
   */
  updated: string
  /**
   * The checksum of the document
   */
  checksum: string

  /**
   * ID Hash of the metadata recorded in an immutable data store (IPFS, Filecoin, Arweave, ..)
   */
  immutableUrl?: string

  /**
   * The immutable solution to record the DDO
   */
  immutableBackend?: ImmutableBackends
}

export type ConditionType = 'lockPayment' | 'escrowPayment' | 'nftHolder' | 'transferNFT'

export type ServiceType =
  | 'authorization'
  | 'metadata'
  | 'access'
  | 'compute'
  | 'workflow'
  | 'nft-access'
  | 'nft-sales'
  | 'nft-sales-proof'

export const serviceIndex = {
  authorization: 2,
  metadata: 0,
  access: 3,
  'access-proof': 10,
  compute: 4,
  workflow: 5,
  'nft-access': 7,
  'nft-sales': 6,
  'nft721-access': 9,
  'nft721-sales': 8,
  'nft-access-proof': 12,
  'nft-sales-proof': 13,
  'nft721-access-proof': 14,
  'nft721-sales-proof': 15,
}
export interface ServiceCommon {
  type: ServiceType
  index: number
  serviceEndpoint?: string
  templateId?: string
  attributes: any & {
    main: { [key: string]: any }
  }
}

export type PricedMetadataInformation = {
  attributes: {
    main: {
      price: string
    }
    additionalInformation: {
      priceHighestDenomination: number
    }
  }
}

export interface Proof {
  type: string
  created: string
  creator: string
  signatureValue: string
  checksum: any
}

export interface ServiceAttributes {
  serviceType: ServiceType
  serviceIndex?: number
  price?: AssetPrice
  nft?: NFTServiceAttributes
}

export interface ServiceAuthorization extends ServiceCommon {
  type: 'authorization'
  service: 'None' | 'RSAES-OAEP'
}

export interface ServiceMetadata extends ServiceCommon {
  type: 'metadata'
  attributes: MetaData
}

export interface ServiceAccess extends ServiceCommon, PricedMetadataInformation {
  type: 'access'
  templateId?: string
  attributes: {
    main: {
      creator: string
      name: string
      datePublished: string
      price: string
      timeout: number
    }
    serviceAgreementTemplate?: ServiceAgreementTemplate
    additionalInformation: {
      description: string
      priceHighestDenomination: number
    }
  }
}

export interface ServiceCompute extends ServiceCommon, PricedMetadataInformation {
  type: 'compute'
  templateId?: string
  attributes: {
    main: {
      creator: string
      name: string
      datePublished: string
      price: string
      timeout: number
    }
    serviceAgreementTemplate?: ServiceAgreementTemplate
    additionalInformation: {
      description: string
      priceHighestDenomination: number
    }
  }
}

export interface ServiceNFTAccess extends ServiceCommon {
  type: 'nft-access'
  templateId?: string
  attributes: {
    main: {
      ercType: ERCType
      nftType: NeverminedNFTType
      creator: string
      name: string
      datePublished: string
      timeout: number
      nftAttributes?: NFTServiceAttributes
    }
    serviceAgreementTemplate?: ServiceAgreementTemplate
    additionalInformation: {
      description: string
    }
  }
}

export interface ServiceNFTSales extends ServiceCommon, PricedMetadataInformation {
  type: 'nft-sales'
  templateId?: string
  attributes: {
    main: {
      ercType: ERCType
      nftType: NeverminedNFTType
      creator: string
      name: string
      datePublished: string
      price: string
      timeout: number
      nftAttributes?: NFTServiceAttributes
    }
    serviceAgreementTemplate?: ServiceAgreementTemplate
    additionalInformation: {
      description: string
      priceHighestDenomination: number
      symbol?: string
      decimals?: string
      erc20TokenAddress?: string
    }
  }
}

export interface ServiceSecondary extends Service {
  agreementId: string
  did: string
}

export type Service<T extends ServiceType | 'default' = 'default'> = T extends 'authorization'
  ? ServiceAuthorization
  : T extends 'metadata'
  ? ServiceMetadata
  : T extends 'nft-access'
  ? ServiceNFTAccess
  : T extends 'nft-sales'
  ? ServiceNFTSales
  : T extends 'access'
  ? ServiceAccess
  : T extends 'compute'
  ? ServiceCompute
  : T extends 'default'
  ? ServiceCommon
  : ServiceCommon

export interface ValidationParams {
  agreement_id: string
  did: string
  service_index?: number
  consumer_address: string
  buyer?: string
  babysig?: Babysig
  nft_amount?: bigint
  nft_holder?: string
  duration?: number
  expiration?: number
}

export interface ServicePlugin<T extends Service> {
  createService(
    publisher: NvmAccount,
    metadata: MetaData,
    serviceAttributes: ServiceAttributes,
    nftAttributes?: NFTAttributes,
    pricedData?: PricedMetadataInformation,
  ): T
  // Process agreement for provider
  process(
    params: ValidationParams,
    from: NvmAccount,
    txparams?: TxParameters,
  ): Promise<void | { [key: string]: any }>
  // Check if service can be granted without agreement
  accept(params: ValidationParams): Promise<boolean>
  // It registers the usage of a service
  track(params: ValidationParams, from: NvmAccount, txparams?: TxParameters): Promise<boolean>
}

export interface ServiceAgreementTemplateParameter {
  name: string
  type: string
  value: string | number | string[]
}

export interface ServiceAgreementTemplateEvent {
  name: string
  actorType: string
  handler: {
    moduleName: string
    functionName: string
    version: string
  }
}

export interface ServiceAgreementTemplateCondition {
  name: string
  timelock: number
  timeout: number
  contractName: string
  functionName: string
  parameters: ServiceAgreementTemplateParameter[]
  events: ServiceAgreementTemplateEvent[]
}

export interface ServiceAgreementTemplate {
  contractName: string
  events: ServiceAgreementTemplateEvent[]
  fulfillmentOrder: string[]
  conditionDependency: { [condition: string]: string[] }
  conditions: ServiceAgreementTemplateCondition[]
}
