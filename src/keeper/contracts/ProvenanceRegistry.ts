import { TransactionReceipt } from "web3-core";
import ContractBase from "./ContractBase";
import { zeroX, didPrefixed, didZeroX } from "../../utils";
import { InstantiableConfig } from "../../Instantiable.abstract";

export enum Activities {
    GENERATED = "0x1",
    USED = "0x2",
    ACTED_IN_BEHALF = "0x3",
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

}
