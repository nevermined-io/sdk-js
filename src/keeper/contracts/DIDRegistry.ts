import { TransactionReceipt } from 'web3-core'
import ContractBase from './ContractBase'
import { zeroX, didPrefixed, didZeroX } from '../../utils'
import { InstantiableConfig } from '../../Instantiable.abstract'

export default class DIDRegistry extends ContractBase {
    public static async getInstance(config: InstantiableConfig): Promise<DIDRegistry> {
        const didRegistry: DIDRegistry = new DIDRegistry('DIDRegistry')
        await didRegistry.init(config)
        return didRegistry
    }

    public async registerAttribute(
        did: string,
        checksum: string,
        providers: string[],
        value: string,
        ownerAddress: string
    ) {
        return this.send('registerAttribute', ownerAddress, [
            zeroX(did),
            zeroX(checksum),
            providers.map(zeroX),
            value
        ])
    }

    public async getDIDOwner(did: string): Promise<string> {
        return this.call('getDIDOwner', [didZeroX(did)])
    }

    public async getBlockNumberUpdated(did: string): Promise<number> {
        return +(await this.call('getBlockNumberUpdated', [zeroX(did)]))
    }

    public async isDIDProvider(did: string, provider: string): Promise<string> {
        return this.call('isDIDProvider', [didZeroX(did), zeroX(provider)])
    }

    public async getAttributesByOwner(owner: string): Promise<string[]> {
        return (
            await this.getPastEvents('DIDAttributeRegistered', {
                _owner: zeroX(owner)
            })
        )
            .map(({ returnValues }) => returnValues._did)
            .map(didPrefixed)
    }

    public async getAttributesByDid(
        did: string
    ): Promise<{ did: string; serviceEndpoint: string; checksum: string }> {
        return (
            await this.getPastEvents('DIDAttributeRegistered', {
                _did: didZeroX(did)
            })
        ).map(
            ({
                returnValues: { _did, _checksum: checksum, _value: serviceEndpoint }
            }) => ({
                did: didPrefixed(_did),
                serviceEndpoint,
                checksum
            })
        )[0]
    }

    public async grantPermission(did: string, grantee: string, ownerAddress: string) {
        return this.send('grantPermission', ownerAddress, [didZeroX(did), zeroX(grantee)])
    }

    public async revokePermission(did: string, grantee: string, ownerAddress: string) {
        return this.send('revokePermission', ownerAddress, [zeroX(did), zeroX(grantee)])
    }

    public async getPermission(did: string, grantee: string): Promise<boolean> {
        return this.call('getPermission', [didZeroX(did), zeroX(grantee)])
    }

    public async transferDIDOwnership(
        did: string,
        newOwnerAddress: string,
        ownerAddress: string
    ): Promise<TransactionReceipt> {
        return this.send('transferDIDOwnership', ownerAddress, [
            didZeroX(did),
            zeroX(newOwnerAddress)
        ])
    }
}
