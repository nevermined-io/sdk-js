import { Nevermined } from '../nevermined/Nevermined'
import { Authentication } from './Authentication'
import { Proof } from './Proof'
import { PublicKey } from './PublicKey'
import { Service, ServiceType } from './Service'
import { didPrefixed, zeroX } from '../utils'
import DIDRegistry from '../keeper/contracts/DIDRegistry'
import Account from '../nevermined/Account'
import { ethers } from 'ethers'
import { MetaData } from './MetaData'

/**
 * DID Descriptor Object.
 * Contains all the data related to an asset.
 */
export class DDO {
    /**
     * Serializes the DDO object.
     * @param  {DDO} DDO to be serialized.
     * @return {string} DDO serialized.
     */
    public static serialize(ddo: DDO): string {
        return JSON.stringify(ddo, null, 2)
    }

    /**
     * Deserializes the DDO object.
     * @param  {DDO} DDO to be deserialized.
     * @return {string} DDO deserialized.
     */
    public static deserialize(ddoString: string): DDO {
        const ddo = JSON.parse(ddoString)

        return new DDO(ddo)
    }

    public '@context': string = 'https://w3id.org/did/v1'

    /**
     * DID, descentralized ID.
     * @type {string}
     */
    public id: string = null

    public userId: string

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

    public static getInstance(userId: string, publisherAddress: string): DDO {
        return new DDO({
            id: '',
            userId: userId,
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
     * @param  {number} index index.
     * @return {Service} Service.
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
     * @param  {string} serviceType Service type.
     * @return {Service} Service.
     */
    public findServiceByType<T extends ServiceType>(serviceType: T): Service<T> {
        if (!serviceType) {
            throw new Error('serviceType not set')
        }

        return this.service.find(s => s.type === serviceType) as Service<T>
    }

    public checksum(seed: string): string {
        return ethers.utils
            .keccak256(ethers.utils.toUtf8Bytes(seed))
            .replace(/^0x([a-f0-9]{64})(:!.+)?$/i, '0x$1')
    }

    /**
     * Generates proof using personal sign.
     * @param  {string}         publicKey Public key to be used on personal sign.
     * @return {Promise<Proof>}           Proof object.
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
     * @param  {string}         publicKey Public key to be used on personal sign.
     * @return {Promise<Proof>}           Proof object.
     */
    public async addProof(publicKey: string): Promise<void> {
        if (this.proof) {
            throw new Error('Proof already exists')
        }
        this.proof = await this.generateProof(publicKey)
    }

    public async addService(nevermined: Nevermined, service: any): Promise<void> {
        this.service.push(service)
    }

    public async addDefaultMetadataService(metadata: MetaData): Promise<void> {
        this.service.push({
            type: 'metadata',
            index: 0,
            serviceEndpoint: '',
            attributes: {
                // Default values
                curation: {
                    rating: 0,
                    numVotes: 0
                },
                // Overwrites defaults
                ...metadata,
                // Cleaning not needed information
                main: {
                    ...metadata.main
                } as any
            }
        } as Service)
    }

    public async updateService(nevermined: Nevermined, service: any): Promise<void> {
        this.service[0] = service
    }

    public async assignDid(didSeed, didRegistry: DIDRegistry, publisher: Account) {
        const did = didPrefixed(await didRegistry.hashDID(didSeed, publisher.getId()))
        this.id = did
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
