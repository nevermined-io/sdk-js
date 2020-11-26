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
            didZeroX(did),
            zeroX(checksum),
            providers.map(zeroX),
            value
        ])
    }

    public async registerDID(
        did: string,
        checksum: string,
        providers: string[],
        value: string,
        activityId: string,
        attributes: string,
        ownerAddress: string
    ) {
        return this.send('registerDID', ownerAddress, [
            didZeroX(did),
            zeroX(checksum),
            providers.map(zeroX),
            value,
            zeroX(activityId),
            attributes
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
    ): Promise<{ did: string, serviceEndpoint: string, checksum: string }> {
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

    // Provenance
    public async used(
        provId: string,
        did: string,
        agentId: string,
        activityId: string,
        signatureUsing: string,
        attributes: string,
        ownerAddress: string
    ) {
        return this.send('used', ownerAddress, [
            zeroX(provId),
            didZeroX(did),
            zeroX(agentId),
            zeroX(activityId),
            zeroX(signatureUsing),
            attributes
        ])
    }

    public async wasDerivedFrom(
        provId: string,
        newEntityDid: string,
        usedEntityDid: string,
        agentId: string,
        activityId: string,
        attributes: string,
        ownerAddress: string
    ) {
        return this.send('wasDerivedFrom', ownerAddress, [
            zeroX(provId),
            zeroX(newEntityDid),
            zeroX(usedEntityDid),
            zeroX(agentId),
            zeroX(activityId),
            attributes
        ])
    }

    public async wasAssociatedWith(
        provId: string,
        did: string,
        agentId: string,
        activityId: string,
        attributes: string,
        ownerAddress: string
    ) {
        return this.send('wasAssociatedWith', ownerAddress, [
            zeroX(provId),
            didZeroX(did),
            zeroX(agentId),
            zeroX(activityId),
            attributes
        ])
    }

    public async actedOnBehalf(
        provId: string,
        did: string,
        delegateAgentId: string,
        responsibleAgentId: string,
        activityId: string,
        signatureDelegate: string,
        attributes: string,
        ownerAddress: string
    ) {
        return this.send('actedOnBehalf', ownerAddress, [
            zeroX(provId),
            didZeroX(did),
            zeroX(delegateAgentId),
            zeroX(responsibleAgentId),
            zeroX(activityId),
            zeroX(signatureDelegate),
            attributes
        ])
    }
}
