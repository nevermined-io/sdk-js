import { TransactionReceipt } from "web3-core";
import ContractBase from "./ContractBase";
import { zeroX, didPrefixed, didZeroX } from "../../utils";
import { InstantiableConfig } from "../../Instantiable.abstract";

export enum Activities {
    GENERATED = "0x1",
    USED = "0x2",
    ACTED_IN_BEHALF = "0x3",
    MANUFACTURING = "0x4",
    TRANSPORTATION = "0x5",
    DELIVERY = "0x6",
}

export default class ProvenanceRegistry extends ContractBase {
    public static async getInstance(config: InstantiableConfig): Promise<ProvenanceRegistry> {
        const provenanceRegistry: ProvenanceRegistry = new ProvenanceRegistry("ProvenanceRegistry");
        await provenanceRegistry.init(config);
        return provenanceRegistry;
    }

    public async wasGeneratedBy(
        did: string,
        agentId: string,
        activity: Activities,
        delegates: string[],
        attributes: string,
        ownerAddress: string
    ) {
        return this.send("wasGeneratedBy", ownerAddress, [
            didZeroX(did),
            zeroX(agentId),
            activity,
            delegates,
            attributes
        ]);
    }

    public async wasAssociatedWith(
        did: string,
        agentId: string,
        activity: Activities,
        signatures: string[],
        attributes: string,
        ownerAddress: string
    ) {
        return this.send("wasAssociatedWith", ownerAddress, [
            zeroX(agentId),
            activity,
            didZeroX(did),
            signatures,
            attributes
        ])
    }

    public async actedOnBehalfOf(
        did: string,
        delegateAgentId: string,
        responsibleAgentId: string,
        activity: Activities,
        signatures: string[],
        attributes: string,
        ownerAddress: string
    ) {
        // TODO: Validate signatures
        return this.send("actedOnBehalf", ownerAddress, [
            zeroX(delegateAgentId),
            zeroX(responsibleAgentId),
            didZeroX(did),
            activity,
            signatures,
            attributes
        ])
    }

    public async used(
        did: string,
        agentId: string,
        activity: Activities,
        attributes: string,
        ownerAddress: string,
    ) {
        return this.send("used", ownerAddress, [
            zeroX(agentId),
            activity,
            didZeroX(did),
            attributes
        ])
    }

}
