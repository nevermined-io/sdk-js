import { Nevermined } from '../nevermined/Nevermined'
import { Authentication } from './Authentication'
import { Proof } from './Proof'
import { PublicKey } from './PublicKey'
import { Service, ServiceType } from './Service'
import { didPrefixed, getAssetRewardsFromService, zeroX } from '../utils'
import DIDRegistry from '../keeper/contracts/DIDRegistry'
import Account from '../nevermined/Account'
import { ethers } from 'ethers'
import { MetaData, MetaDataMain } from './MetaData'
import { NFTAttributes } from '../models/NFTAttributes'
import { NvmConfig } from './NvmConfig'
import BigNumber from '../utils/BigNumber'
import { DDOPriceNotFoundError, DDOServiceNotFoundError } from '../errors'

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

    public '@context' = 'https://w3id.org/did/v1'

    /**
     * DID, decentralizes ID.
     */
    public id: string = null

    public didSeed: string = null

    public _nvm: NvmConfig

    public created: string

    public publicKey: PublicKey[] = []

    public authentication: Authentication[] = []

    public service: Service[] = []

    public proof: Proof

    public constructor(ddo: Partial<DDO> = {}) {
        Object.assign(this, ddo, {
            created:
                (ddo && ddo.created) || new Date().toISOString().replace(/\.[0-9]{3}/, '')
        })
    }

    public static getInstance(
        userId: string,
        publisherAddress: string,
        appId?: string
    ): DDO {
        return new DDO({
            id: '',
            _nvm: {
                userId,
                appId,
                versions: []
            },
            authentication: [
                {
                    type: 'RsaSignatureAuthentication2018',
                    publicKey: ''
                }
            ],
            publicKey: [
                {
                    id: '',
                    type: 'EthereumECDSAKey',
                    owner: publisherAddress
                }
            ]
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

        const service = this.service.find(s => s.index === index)
        if (service === undefined) {
            throw new Error(`No service with index ${index} found on DDO.`)
        }

        return service as Service<T>
    }

    /**
     * Finds a service of a DDO by type.
     * @param serviceType - Service type.
     *
     * @throws {@link DDOServiceNotFoundError} If the service is not in the DDO.
     * @returns {@link Service}.
     */
    public findServiceByType<T extends ServiceType>(serviceType: T): Service<T> {
        const service = this.service.find(s => s.type === serviceType)

        if (service) {
            return service as Service<T>
        }
        throw new DDOServiceNotFoundError(serviceType, this.id)
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
        const assetRewards = getAssetRewardsFromService(service)

        if (assetRewards) {
            return assetRewards.getTotalPrice()
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
        this.service.forEach(svc => {
            checksum[svc.index] = this.checksum(
                JSON.stringify(this.findServiceByType(svc.type).attributes.main)
            )
        })
        return {
            created: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
            creator: publicKey,
            type: 'DDOIntegritySignature',
            signatureValue: '',
            checksum
        }
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

    public async addService(service: any): Promise<void> {
        this.service.push(service)
    }

    public async addDefaultMetadataService(
        metadata: MetaData,
        nftAttributes?: NFTAttributes
    ): Promise<MetaDataMain> {
        const metadataService = {
            type: 'metadata',
            index: 0,
            serviceEndpoint: '',
            attributes: {
                // Default values
                curation: {
                    rating: 0,
                    numVotes: 0,
                    isListed: true
                },
                // Overwrites defaults
                ...metadata,
                // Cleaning not needed information
                main: {
                    ...metadata.main
                } as any
            }
        } as Service
        if (nftAttributes) {
            metadataService.attributes.main['ercType'] = nftAttributes.ercType
            metadataService.attributes.main['nftType'] = nftAttributes.nftType
        }
        this.service.push(metadataService)
        return metadataService.attributes.main
    }

    public async updateService(nevermined: Nevermined, service: any): Promise<void> {
        this.service[0] = service
    }

    public async assignDid(
        didSeed: string,
        didRegistry: DIDRegistry,
        publisher: Account
    ) {
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
        this.proof.signatureValue = await nevermined.utils.signature.signText(
            this.shortId(),
            publicKey
        )
    }
}
