import Web3Provider from '../keeper/Web3Provider'
import { Nevermined } from '../nevermined/Nevermined'
import { Authentication } from './Authentication'
import { Proof } from './Proof'
import { PublicKey } from './PublicKey'
import { Service, ServiceType } from './Service'
import { didPrefixed, zeroX } from '../utils'

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

    public shortId(): string {
        return this.id.replace('did:nv:', '')
    }

    /**
     * Finds a service of a DDO by index.
     * @param  {number} Service index.
     * @return {Service} Service.
     */
    public findServiceById<T extends ServiceType>(index: number): Service<T> {
        if (isNaN(index)) {
            throw new Error('index is not set')
        }

        const service = this.service.find(s => s.index === index)

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

    /**
     * Generate the checksum using the current content.
     * @return {string[]} DDO checksum.
     */
    public getChecksum(attributes): string {
        const { files, name, author, license } = attributes.main
        const values = [
            ...(files || []).map(({ checksum }) => checksum).filter(_ => !!_),
            name,
            author,
            license,
            this.id
        ]
        return this.checksum(values)
    }

    public checksum(seed): string {
        return Web3Provider.getWeb3()
            .utils.sha3(seed)
            .replace(/^0x([a-f0-9]{64})(:!.+)?$/i, '0x$1')
    }

    /**
     * Generates proof using personal sing.
     * @param  {Nevermined}     nevermined Nevermined instance.
     * @param  {string}         publicKey Public key to be used on personal sign.
     * @param  {string}         password  Password if it's required.
     * @return {Promise<Proof>}           Proof object.
     */
    public async generateProof(
        nevermined: Nevermined,
        publicKey: string,
        password?: string
    ): Promise<Proof> {
        const checksum = {}
        for (const svc of this.service){
            checksum[svc.index] = this.checksum(JSON.stringify(this.findServiceByType(svc.type).attributes.main))
        }
        return {
            created: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
            creator: publicKey,
            type: 'DDOIntegritySignature',
            signatureValue: 'signature',
            checksum: checksum
        }
    }

    /**
     * Generates and adds a proof using personal sing on the DDO.
     * @param  {Nevermined}     nevermined     Nevermined instance.
     * @param  {string}         publicKey Public key to be used on personal sign.
     * @param  {string}         password  Password if it's required.
     * @return {Promise<Proof>}           Proof object.
     */
    public async addProof(
        nevermined: Nevermined,
        publicKey: string,
        password?: string
    ): Promise<void> {
        if (this.proof) {
            throw new Error('Proof already exists')
        }
        this.proof = await this.generateProof(nevermined, publicKey, password)
    }

    public async addService(nevermined: Nevermined, service: any): Promise<void>
    {
        this.service.push(service)
    }

    public async assignDid(id){
        const didFromChecksum = await this.generateDid(id)
        this.id = didFromChecksum
        this.authentication[0].publicKey = didFromChecksum
        this.publicKey[0].id = didFromChecksum
    }

    public async generateDid(seed){
        return didPrefixed(zeroX(this.checksum(JSON.stringify(seed))))
    }

    public async addSignature(nevermined: Nevermined,
                              publicKey: string,
                              password?: string){
        this.proof.signatureValue = await nevermined.utils.signature.signText(
            this.shortId(),
            publicKey,
            password
        )
    }
}
