import Account from "../../src/nevermined/Account";
import { Nevermined } from "../../src";
import { generateId } from "../../src/utils";
import config from "../config";
import TestContractHandler from "./TestContractHandler";
import ProvenanceRegistry, { Activities } from "../../src/keeper/contracts/ProvenanceRegistry";
import DIDRegistry from "../../src/keeper/contracts/DIDRegistry";

let nevermined: Nevermined;
let provenanceRegistry: ProvenanceRegistry;
let didRegistry: DIDRegistry;
let accounts: Account[];

describe("DIDRegistry", () => {
    before(async () => {
        await TestContractHandler.prepareContracts();
        nevermined = await Nevermined.getInstance(config)
        ;({ provenanceRegistry, didRegistry } = nevermined.keeper);

        accounts = await nevermined.accounts.list();
    });

    describe("#wasGeneratedBy()", () => {
        it("should generate the first entry in provenance with a given did", async () => {
            const ownerAccount: Account = accounts[0];
            const agent: Account = accounts[1];

            const did = generateId();
            const data = "my nice provider, is nice";

            await didRegistry.registerAttribute(
                did,
                `0123456789abcdef`,
                [],
                data,
                ownerAccount.getId()
            );

            await provenanceRegistry.wasGeneratedBy(
                did,
                agent.getId(),
                Activities.GENERATED,
                [],
                "",
                ownerAccount.getId()
            );
        });

    });
});
