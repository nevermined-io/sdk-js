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
  ServiceAgreementTemplateParameter,
  Nevermined, keccak256, didPrefixed, zeroX, AssetPrice, NFTAttributes, DIDRegistry, DDOConditionNotFoundError, DDOParamNotFoundError, DDOPriceNotFoundError, DDOServiceAlreadyExists, DDOServiceNotFoundError, jsonReplacer, NvmAccount } from '@/sdk'

// DDO Services including a sales process
export const SALES_SERVICES = ['access', 'compute', 'nft-sales']
// Condition Names that are the final dependency for releasing the payment in a service agreement
export const DEPENDENCIES_RELEASE_CONDITION = ['access', 'serviceExecution', 'transferNFT']

/**
 * Fill some static parameters that depends on the metadata.
 *
 * @param conditions - Conditions to fill.
 * @param ddo - DDO related to this conditions.
 * @param assetPrice -Rewards distribution
 * @param nftAmount - Number of nfts to handle
 * @param erc20TokenContract - Number of nfts to handle
 * @param nftTokenContract - Number of nfts to handle
 *
 * @returns Filled conditions.
 */
export function getConditionsByParams(
  serviceType: ServiceType,
  conditions: Readonly<ServiceAgreementTemplateCondition[]>,
  owner: string,
  assetPrice: AssetPrice = new AssetPrice(),
  did?: string,
  erc20TokenContract?: string,
  nftTokenContract?: string,
  nftHolder?: string,
  nftAmount = 1n,
  nftTransfer = false,
  duration = 0,
  fulfillAccessTimeout = 0,
  fulfillAccessTimelock = 0,
  tokenId = '',
): ServiceAgreementTemplateCondition[] {
  return conditions
    .map((condition) => {
      if (
        DEPENDENCIES_RELEASE_CONDITION.includes(condition.name) &&
        SALES_SERVICES.includes(serviceType)
      ) {
        condition.timeout = fulfillAccessTimeout
        condition.timelock = fulfillAccessTimelock
      }
      return condition
    })
    .map((condition) => ({
      ...condition,
      parameters: condition.parameters.map((parameter) => ({
        ...getParameter(
          parameter,
          owner,
          assetPrice,
          did,
          erc20TokenContract,
          nftTokenContract,
          nftHolder,
          nftAmount,
          nftTransfer,
          duration,
          tokenId,
        ),
      })),
    }))
}

function getParameter(
  parameter: ServiceAgreementTemplateParameter,
  owner: string,
  assetPrice: AssetPrice = new AssetPrice(),
  did?: string,
  erc20TokenContract?: string,
  nftTokenContract?: string,
  nftHolder?: string,
  nftAmount = 1n,
  nftTransfer = false,
  duration = 0,
  tokenId?: string,
): ServiceAgreementTemplateParameter {
  const getValue = (name) => {
    switch (name) {
      case 'amounts':
        return Array.from(assetPrice.getAmounts(), (v) => v.toString())
      case 'receivers':
        return assetPrice.getReceivers()
      case 'amount':
      case 'price':
        return String(assetPrice.getTotalPrice())
      case 'did':
      case 'assetId':
      case 'documentId':
      case 'documentKeyId':
        return did || '{DID}'
      case 'rewardAddress':
        return owner
      case 'numberNfts':
        return nftAmount.toString()
      case 'tokenAddress':
        return erc20TokenContract
      case 'contract':
      case 'contractAddress':
        return nftTokenContract ? nftTokenContract : ''
      case 'nftHolder':
        return nftHolder ? nftHolder : ''
      case 'nftTransfer':
        return String(nftTransfer)
      case 'duration':
        return String(duration)
      case 'tokenId':
        return tokenId ? tokenId.replace('did:nv:', '') : ''
    }

    return ''
  }
  const value = getValue(parameter.name.replace(/^_/, ''))

  return { ...parameter, value }
}

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
    return JSON.stringify(ddo, jsonReplacer, 2)
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
   * @param index - index of the service in the DDO.
   * @returns Service.
   */
  public findServiceByIndex<T extends ServiceType>(index: number): Service<T> {
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
   * @param serviceType - Service type used by find the service
   *
   * @throws {@link DDOServiceNotFoundError} If the service is not in the DDO.
   * @returns {@link Service}.
   */
  public findServiceByType<T extends ServiceType>(serviceType: T): Service<T> {
    const service = this.service.find((s) => s.type === serviceType)

    if (service) {
      return service as Service<T>
    }
    throw new DDOServiceNotFoundError(serviceType.toString(), this.id)
  }

  /**
   * Finds a service of a DDO by index.
   * @param serviceReference - reference to the service (index or type).
   * @returns Service.
   */
  public findServiceByReference<T extends ServiceType>(
    serviceReference: ServiceType | number,
  ): Service<T> {
    if (typeof serviceReference === 'number') {
      return this.findServiceByIndex(serviceReference)
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
   * @param serviceIndex - Service index.
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
   * @returns {@link bigint}
   */
  public getPriceByService(serviceType: ServiceType = 'access'): bigint {
    const service = this.findServiceByType(serviceType)
    const assetPrice = DDO.getAssetPriceFromService(service)

    if (assetPrice) {
      return assetPrice.getTotalPrice()
    }
    throw new DDOPriceNotFoundError(serviceType.toString(), this.id)
  }

  public checksum(seed: string): string {
    return keccak256(seed).replace(/^0x([a-f0-9]{64})(:!.+)?$/i, '0x$1')
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
        JSON.stringify(this.findServiceByType(svc.type).attributes.main, jsonReplacer),
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

  /**
   * Get the checksum of the proof.
   * @returns string containing the checksum of the proof.
   */
  public getProofChecksum(): string {
    return this.checksum(JSON.stringify(this.proof.checksum))
  }

  /**
   * Generates and adds a proof using personal sign on the DDO.
   * @param publicKey - Public key to be used on personal sign.
   * @returns void.
   */
  public async addProof(publicKey: string): Promise<void> {
    if (this.proof) {
      throw new Error('Proof already exists')
    }
    this.proof = await this.generateProof(publicKey)
  }

  /**
   * It reorders the services of the DDO using the service index
   */
  public reorderServices(): void {
    this.service.sort((a, b) => (a.index > b.index ? 1 : -1))
    for (let i = 0; i < this.service.length; i++) {
      this.service[i].index = i
    }
    this.service.sort((a, b) => (a.index > b.index ? 1 : -1))
  }

  /**
   * Adds a service to the DDO.
   * @param service
   */
  public addService(service: ServiceCommon) {
    const newIndex =
      this.service.length > 0
        ? this.service.reduce((a, b) => (a.index > b.index ? a : b)).index + 1
        : 0
    if (this.service.find((s) => s.index === newIndex))
      throw new DDOServiceAlreadyExists(service.type.toString(), newIndex)
    service.index = newIndex
    this.service.push(service)
  }

  /**
   * Replaces a service in the DDO.
   * @param index
   * @param service
   */
  public replaceService(index: number, service: any) {
    if (!this.service.find((s) => s.index === service.index))
      throw new DDOServiceNotFoundError(service.type.toString())
    this.service[index] = service
  }

  /**
   * Adds a default metadata service to the DDO.
   * @param metadata metadata
   * @param nftAttributes nft attributes
   * @returns main metadata attributes
   */
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

  /**
   * @deprecated use the `updateMetadataService` or `replaceService` methods instead
   * Updates a service in the DDO
   * @param service the service to be updated
   * @param serviceIndex the position of the service in the DDO.services array
   */
  public updateService(service: any, serviceIndex = 0) {
    this.service[serviceIndex] = service
  }

  /**
   * Updates a service in the DDO
   * @param service the service to be updated
   * @param serviceIndex the position of the service in the DDO.services array
   */
  public updateMetadataService(service: any) {
    const arrayIndex = this.service.findIndex((s) => s.type === 'metadata')
    if (arrayIndex < 0) {
      throw new DDOServiceNotFoundError('metadata')
    }
    this.service[arrayIndex] = service
  }

  /**
   * Assign a DID to the DDO
   * @param didSeed DID seed
   * @param didRegistry DIDRegistry contract
   * @param publisher account registering the DID
   */
  public async assignDid(didSeed: string, didRegistry: DIDRegistry, publisher: NvmAccount) {
    const did = didPrefixed(await didRegistry.hashDID(didSeed, publisher.getId()))
    this.id = did
    this.didSeed = didSeed
    this.authentication[0].publicKey = did
    this.publicKey[0].id = did
  }

  /**
   * It generates a DID seed from a seed
   * @param seed the seed
   * @returns the string represeing the DID seed
   */
  public async generateDidSeed(seed) {
    return zeroX(this.checksum(JSON.stringify(seed)))
  }

  /**
   * It adds a signature to the the proof object of the DDO
   * @param nevermined nevermined object
   * @param publicKey public key to sign the DDO
   */
  public async addSignature(nevermined: Nevermined, publicKey: string) {
    this.proof.signatureValue = await nevermined.utils.signature.signText(this.shortId(), publicKey)
  }

  // DDO Utility functions

  /**
   * If fins a service condition by name
   * @param service the service to search in
   * @param name the name of the condition
   * @returns ServiceAgreementTemplateCondition the condition
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
    const shortId = DDO.getParameterFromCondition(service, 'escrowPayment', '_did') as string
    return shortId.startsWith('did:nv:') ? shortId : `did:nv:${shortId}`
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
   * Gets the NFT TokenId in the nftHolder condition of the service
   * @param service the service to search in
   * @returns the NFT Token Id
   */
  public static getTokenIdFromService(service: Service): string {
    const paramName = '_tokenId'
    const conditionName = service.type === 'nft-access' ? 'nftHolder' : 'transferNFT'
    const nftCondition = DDO.findServiceConditionByName(service, conditionName)
    return nftCondition.parameters.find((p) => p.name === paramName).value as string
  }

  /**
   * Gets the number of NFTs in the transferNFT condition of the service
   * @param service the service to search in
   * @returns the number of NFTs
   */
  public static getNftAmountFromService(service: Service): bigint {
    const paramName = '_numberNfts'
    const conditionName = service.type === 'nft-access' ? 'nftHolder' : 'transferNFT'
    const nftCondition = DDO.findServiceConditionByName(service, conditionName)
    return BigInt(nftCondition.parameters.find((p) => p.name === paramName).value as string)
  }

  /**
   * Gets the nftTransfer parameter in the transferNFT condition of the service
   * @param service the service to search in
   * @returns if condition will do a nft transfer or a mint
   */
  public static getNFTTransferFromService(service: Service): boolean {
    return (
      DDO.getParameterFromCondition(service, 'transferNFT', '_nftTransfer').toString() === 'true'
    )
  }

  /**
   * Gets the duration parameter in the transferNFT condition of the service
   * @param service the service to search in
   * @returns the duration of the subscription
   */
  public static getDurationFromService(service: Service): number {
    return Number(DDO.getParameterFromCondition(service, 'transferNFT', '_duration').toString())
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

    const rewardsMap = new Map<string, bigint>()

    for (let i = 0; i < amounts.length; i++) rewardsMap.set(receivers[i], BigInt(amounts[i]))

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

  /**
   * Finds an attribute in the DDO and replace it with the given value
   * @param ddo the originial DDO
   * @param paramName the param name to replace
   * @param value the new value
   * @returns the DDO with the replaced attribute
   */
  public static findAndReplaceDDOAttribute(ddo: DDO, paramName: string, value: string): DDO {
    return DDO.deserialize(DDO.serialize(ddo).replaceAll(paramName, value))
  }
}
