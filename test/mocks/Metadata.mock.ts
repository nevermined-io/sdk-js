import { MetadataService } from '../../src/metadata/MetadataService'
import { DDO } from '../../src/ddo/DDO'
import DID from '../../src/nevermined/DID'

const ddoStore: Map<string, any> = new Map<string, any>()

export default class MetadataMock extends MetadataService {
    public async getAccessUrl(_accessToken: any, _payload: any): Promise<string> {
        return 'http://test/test'
    }

    public async storeDDO(ddo: DDO): Promise<DDO> {
        ddoStore.set(ddo.id, ddo)
        return ddo
    }

    public async retrieveDDO(did: DID): Promise<DDO> {
        return ddoStore.get(did.getDid())
    }
}
