import { Nevermined, Account } from '../nevermined'
import {
  Authentication,
  PublicKey,
  Service,
  ServiceType,
  MetaData,
  MetaDataMain,
  NvmConfig,
  Proof,
  ServiceNFTAccess,
  ServiceNFTSales,
  ConditionType,
  ServiceAgreementTemplateCondition,
  ServiceCommon,
} from './types'
import { didPrefixed, zeroX } from '../utils'
import { DIDRegistry } from '../keeper'
import { ethers } from 'ethers'
import { AssetPrice, NFTAttributes } from '../models'
import { BigNumber } from '../utils'
import { DDOPriceNotFoundError, DDOServiceNotFoundError } from '../errors'
import { DDOConditionNotFoundError, DDOParamNotFoundError } from '../errors/DDOError'

// DDO Services including a sales process
export const SALES_SERVICES = ['access', 'compute', 'nft-sales']
// Condition Names that are the final dependency for releasing the payment in a service agreement
export const DEPENDENCIES_RELEASE_CONDITION = ['access', 'serviceExecution', 'transferNFT']

/**
 * DID Descriptor Object.
 * Contains all the data related to an asset.
 */
export class DDO {
  /**
   * Serializes the DDO object.
   * @param ddo - The {@link DDO} to be serialized.
   * @returns DDO serialized.
   */
  public static serialize(ddo: DDO): string {
    return JSON.stringify(ddo, null, 2)
  }

  /**
   * Deserializes the DDO object.
   * @param ddoString - The serialized {@link DDO} to be deserialized.
   * @returns The deserialized {@link DDO}.
   */
  public static deserialize(ddoString: string): DDO {
    const ddo = JSON.parse(ddoString)

    return new DDO(ddo)
  }

  public static createAuthorizationService(
    neverminedNodeUri: string,
    publicKey: string,
    method: string,
  ) {
    return {
      type: 'authorization',
      index: 2,
      serviceEndpoint: neverminedNodeUri,
      attributes: {
        main: {
          publicKey: publicKey,
          service: method,
          threshold: 0,
        },
      },
    } as Service
  }

  public '@context' = 'https://w3id.org/did/v1'

  /**
   * DID, decentralizes ID.
   */
  public id: string = null

  public didSeed: string = null

  public _nvm: NvmConfig

  public created: string

  public updated?: string

  public publicKey: PublicKey[] = []

  public authentication: Authentication[] = []

  public service: Service[] = []

  public proof: Proof

  public constructor(ddo: Partial<DDO> = {}) {
    Object.assign(this, ddo, {
      created: (ddo && ddo.created) || new Date().toISOString().replace(/\.[0-9]{3}/, ''),
    })
  }

  public static getInstance(userId: string, publisherAddress: string, appId?: string): DDO {
    return new DDO({
      id: '',
      _nvm: {
        userId,
        appId,
        versions: [],
      },
      authentication: [
        {
          type: 'RsaSignatureAuthentication2018',
          publicKey: '',
        },
      ],
      publicKey: [
        {
          id: '',
          type: 'EthereumECDSAKey',
          owner: publisherAddress,
        },
      ],
    })
  }

  public shortId(): string {
    return this.id.replace('did:nv:', '')
  }

  /**
   * Finds a service of a DDO by index.
   * @param index - index.
   * @returns Service.
   */
  public findServiceById<T extends ServiceType>(index: number): Service<T> {
    if (isNaN(index)) {
      throw new Error('index is not set')
    }

    const service = this.service.find((s) => s.index === index)
    if (service === undefined) {
      throw new Error(`No service with index ${index} found on DDO.`)
    }

    return service as Service<T>
  }

  /**
   * Finds the first service of a DDO by type.
   * @param serviceType - Service type.
   *
   * @throws {@link DDOServiceNotFoundError} If the service is not in the DDO.
   * @returns {@link Service}.
   */
  public findServiceByType<T extends ServiceType>(serviceType: T): Service<T> {
    const service = this.service.find((s) => s.type === serviceType)

    if (service) {
      return service as Service<T>
    }
    throw new DDOServiceNotFoundError(serviceType, this.id)
  }

  /**
   * Finds a service of a DDO by index.
   * @param index - index.
   * @returns Service.
   */
  public findServiceByReference<T extends ServiceType>(
    serviceReference: ServiceType | number,
  ): Service<T> {
    if (typeof serviceReference === 'number') {
      return this.findServiceById(serviceReference)
    } else {
      return this.findServiceByType(serviceReference) as Service<T>
    }
  }

  /**
   * Gets all the services of a DDO with a specific type.
   * @param serviceType - Service type.
   *
   * @returns {@link Service}.
   */
  public getServicesByType<T extends ServiceType>(serviceType: T): Service<T>[] {
    return this.service.filter((s) => s.type === serviceType).map((s) => s as Service<T>)
  }

  /**
   * Checks if a service exists in the DDO.
   * @param serviceType - Service type.
   *
   * @returns true if service exists.
   */
  public serviceExists<T extends ServiceType>(serviceType: T): boolean {
    return this.service.some((s) => s.type === serviceType)
  }

  /**
   * Checks if a service index in the DDO.
   * @param serviceIndex - Service .
   *
   * @returns true if service exists.
   */
  public serviceIndexExists(serviceIndex: number): boolean {
    return this.service.some((s) => s.index === serviceIndex)
  }

  /**
   * Get the total price of a service.
   * @example
   * ```ts
   * const price = ddo.getPriceByService('nft-access')
   * ```
   * @param serviceType - Service type
   *
   * @throws {@link DDOPriceNotFoundError}
   * @returns {@link BigNumber}
   */
  public getPriceByService(serviceType: ServiceType = 'access'): BigNumber {
    const service = this.findServiceByType(serviceType)
    const assetPrice = DDO.getAssetPriceFromService(service)

    if (assetPrice) {
      return assetPrice.getTotalPrice()
    }
    throw new DDOPriceNotFoundError(serviceType, this.id)
  }

  public checksum(seed: string): string {
    return ethers.utils
      .keccak256(ethers.utils.toUtf8Bytes(seed))
      .replace(/^0x([a-f0-9]{64})(:!.+)?$/i, '0x$1')
  }

  /**
   * Generates proof using personal sign.
   * @param publicKey - Public key to be used on personal sign.
   * @returns Proof object.
   */
  public async generateProof(publicKey: string): Promise<Proof> {
    const checksum = {}
    this.service.forEach((svc) => {
      checksum[svc.index] = this.checksum(
        JSON.stringify(this.findServiceByType(svc.type).attributes.main),
      )
    })
    return {
      created: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
      creator: publicKey,
      type: 'DDOIntegritySignature',
      signatureValue: '',
      checksum,
    }
  }

  public getProofChecksum(): string {
    return this.checksum(JSON.stringify(this.proof.checksum))
  }

  /**
   * Generates and adds a proof using personal sign on the DDO.
   * @param publicKey - Public key to be used on personal sign.
   * @returns Proof object.
   */
  public async addProof(publicKey: string): Promise<void> {
    if (this.proof) {
      throw new Error('Proof already exists')
    }
    this.proof = await this.generateProof(publicKey)
  }

  public reorderServices(): void {
    this.service.sort((a, b) => (a.index > b.index ? 1 : -1))
    for (let i = 0; i < this.service.length; i++) {
      this.service[i].index = i
    }
    this.service.sort((a, b) => (a.index > b.index ? 1 : -1))
  }

  public addService(service: ServiceCommon) {
    this.service.push(service)
  }

  public replaceService(index: number, service: any) {
    this.service[index] = service
  }

  public addDefaultMetadataService(
    metadata: MetaData,
    nftAttributes?: NFTAttributes,
  ): MetaDataMain {
    const metadataService = {
      type: 'metadata',
      index: 0,
      serviceEndpoint: '',
      attributes: {
        // Default values
        curation: {
          rating: 0,
          numVotes: 0,
          isListed: true,
        },
        // Overwrites defaults
        ...metadata,
        // Cleaning not needed information
        main: {
          ...metadata.main,
        } as any,
      },
    } as Service
    if (nftAttributes) {
      metadataService.attributes.main['ercType'] = nftAttributes.ercType
      metadataService.attributes.main['nftType'] = nftAttributes.nftType
    }
    this.service.push(metadataService)
    return metadataService.attributes.main
  }

  public updateService(service: any, serviceIndex = 0) {
    this.service[serviceIndex] = service
  }

  public async assignDid(didSeed: string, didRegistry: DIDRegistry, publisher: Account) {
    const did = didPrefixed(await didRegistry.hashDID(didSeed, publisher.getId()))
    this.id = did
    this.didSeed = didSeed
    this.authentication[0].publicKey = did
    this.publicKey[0].id = did
  }

  public async generateDidSeed(seed) {
    return zeroX(this.checksum(JSON.stringify(seed)))
  }

  public async addSignature(nevermined: Nevermined, publicKey: string) {
    this.proof.signatureValue = await nevermined.utils.signature.signText(this.shortId(), publicKey)
  }

  // DDO Utility functions

  /**
   * If fins a service condition by name
   * @param service the service to search in
   * @param name the name of the condition
   * @returns the condition
   */
  public static findServiceConditionByName(
    service: Service,
    name: ConditionType,
  ): ServiceAgreementTemplateCondition {
    const condition = service.attributes?.serviceAgreementTemplate?.conditions?.find(
      (c) => c.name === name,
    )
    if (!service) throw new DDOConditionNotFoundError(name)
    return condition
  }

  /**
   * Gets the DID in the escrowPayment condition of the service
   * @param service the service to search in
   * @returns the DID
   */
  public static getDIDFromService(service: Service): string {
    return `did:nv:${DDO.getParameterFromCondition(service, 'escrowPayment', '_did') as string}`
  }

  /**
   * Gets the NFT Holder in the transferNFT condition of the service
   * @param service the service to search in
   * @returns the NFT Holder address
   */
  public static getNftHolderFromService(service: Service): string {
    return DDO.getParameterFromCondition(service, 'transferNFT', '_nftHolder') as string
  }

  /**
   * Gets the number of NFTs in the transferNFT condition of the service
   * @param service the service to search in
   * @returns the number of NFTs
   */
  public static getNftAmountFromService(service: Service): BigNumber {
    return BigNumber.from(DDO.getParameterFromCondition(service, 'transferNFT', '_numberNfts'))
  }

  /**
   * Given a service, condition and param name it returns the value
   * @param service The service where the condition is
   * @param conditionType the condition type
   * @param paramName the param name
   * @returns the value
   */
  public static getParameterFromCondition(
    service: Service,
    conditionType: ConditionType,
    paramName: string,
  ): string | number | string[] {
    try {
      const nftTransferCondition = DDO.findServiceConditionByName(service, conditionType)
      return nftTransferCondition.parameters?.find((p) => p.name === paramName).value
    } catch (_e) {
      throw new DDOParamNotFoundError(conditionType, paramName)
    }
  }

  /**
   * Gets the NFT Contract address used in the NFT Access or NFT Sales service
   * @param service the service to search in
   * @returns the NFT contract address
   */
  public static getNftContractAddressFromService(
    service: ServiceNFTAccess | ServiceNFTSales,
  ): string {
    const paramName = '_contractAddress'
    const conditionName = service.type === 'nft-access' ? 'nftHolder' : 'transferNFT'
    const nftTransferCondition = DDO.findServiceConditionByName(service, conditionName)
    return nftTransferCondition.parameters.find((p) => p.name === paramName).value as string
  }

  /**
   * It gets the AssetPrice from a service with escrowPayment condition
   * @param service the service to search in
   * @returns the AssetPrice object
   */
  public static getAssetPriceFromService(service: Service): AssetPrice {
    const escrowPaymentCondition = DDO.findServiceConditionByName(service, 'escrowPayment')
    if (!escrowPaymentCondition) {
      throw new DDOConditionNotFoundError('escrowPayment')
    }

    const amounts = escrowPaymentCondition.parameters.find((p) => p.name === '_amounts')
      .value as string[]
    const receivers = escrowPaymentCondition.parameters.find((p) => p.name === '_receivers')
      .value as string[]

    const rewardsMap = new Map<string, BigNumber>()

    for (let i = 0; i < amounts.length; i++)
      rewardsMap.set(receivers[i], BigNumber.from(amounts[i]))

    return new AssetPrice(rewardsMap)
  }

  /**
   * It gets the AssetPrice from a service given the serviceType
   * @param service the service to search in
   * @returns the AssetPrice object
   */
  public getAssetPriceFromDDOByServiceType(service: ServiceType): AssetPrice {
    return DDO.getAssetPriceFromService(this.findServiceByType(service))
  }

  /**
   * Given a service type, it sets the AssetPrice in the escrowPayment condition
   * @param serviceType the service to search in
   * @param rewards the AssetPrice object to set
   * @returns
   */
  public setAssetPriceFromDDOByService(serviceType: ServiceType, rewards: AssetPrice) {
    const service = this.findServiceByType(serviceType)
    const escrowPaymentCondition = DDO.findServiceConditionByName(service, 'escrowPayment')
    if (!escrowPaymentCondition) {
      throw new DDOConditionNotFoundError('escrowPayment')
    }
    try {
      const amounts = escrowPaymentCondition.parameters.find((p) => p.name === '_amounts')
      const receivers = escrowPaymentCondition.parameters.find((p) => p.name === '_receivers')
      amounts.value = Array.from(rewards.getAmounts(), (v) => v.toString())
      receivers.value = rewards.getReceivers()
    } catch (e) {
      throw new Error('Error setting the AssetPrice in the DDO')
    }
  }

  /**
   * Given the service type it sets the AssetPrice and NFT holder
   * @param serviceType the service type to search in
   * @param rewards the AssetPrice object to set
   * @param holderAddress the NFT Holder address to set
   * @returns
   */
  public setNFTRewardsFromService(
    serviceType: ServiceType,
    rewards: AssetPrice,
    holderAddress: string,
  ) {
    this.setAssetPriceFromDDOByService(serviceType, rewards)
    const service = this.findServiceByType(serviceType)
    const transferCondition = DDO.findServiceConditionByName(service, 'transferNFT')
    if (!transferCondition) return new DDOConditionNotFoundError('transferNFT')

    const holder = transferCondition.parameters.find((p) => p.name === '_nftHolder')
    holder.value = holderAddress
  }

  public static findAndReplaceDDOAttribute(ddo: DDO, paramName: string, value: string): DDO {
    return DDO.deserialize(DDO.serialize(ddo).replaceAll(paramName, value))
  }
}
