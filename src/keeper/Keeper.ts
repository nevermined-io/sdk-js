import { ContractBase } from './contracts/ContractBase'

import DIDRegistry from './contracts/DIDRegistry'
import Dispenser from './contracts/Dispenser'
import Token from './contracts/Token'
import {
    Condition,
    LockRewardCondition,
    EscrowReward,
    AccessSecretStoreCondition,
    ComputeExecutionCondition
} from './contracts/conditions'
import {
    AgreementTemplate,
    EscrowAccessSecretStoreTemplate,
    EscrowComputeExecutionTemplate
} from './contracts/templates'
import {
    TemplateStoreManager,
    AgreementStoreManager,
    ConditionStoreManager
} from './contracts/managers'

import { objectPromiseAll } from '../utils'
import { EventHandler } from './EventHandler'

import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

/**
 * Interface with Nevermined contracts.
 * Nevermined Keeper implementation where we put the following modules together:
 * - TCRs: users create challenges and resolve them through voting to maintain registries.
 * - Ocean Tokens: the intrinsic tokens circulated inside Nevermined network, which is used in the voting of TCRs.
 * - Marketplace: the core marketplace where people can transact with each other with Ocean tokens.
 */
export class Keeper extends Instantiable {
    /**
     * Returns Keeper instance.
     * @return {Promise<Keeper>}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Keeper> {
        const keeper = new Keeper()
        keeper.setInstanceConfig(config)

        // Adding keeper inside to prevent `Keeper not defined yet` error
        config.nevermined.keeper = keeper

        keeper.instances = {}
        try {
            keeper.instances = await objectPromiseAll({
                // Main contracts
                dispenser: undefined, // Optional
                token: Token.getInstance(config),
                didRegistry: DIDRegistry.getInstance(config),
                // Managers
                templateStoreManager: TemplateStoreManager.getInstance(config),
                agreementStoreManager: AgreementStoreManager.getInstance(config),
                conditionStoreManager: ConditionStoreManager.getInstance(config),
                // Conditions
                lockRewardCondition: LockRewardCondition.getInstance(config),
                escrowReward: EscrowReward.getInstance(config),
                accessSecretStoreCondition: AccessSecretStoreCondition.getInstance(
                    config
                ),
                computeExecutionCondition: ComputeExecutionCondition.getInstance(config),
                // Templates
                escrowAccessSecretStoreTemplate: EscrowAccessSecretStoreTemplate.getInstance(
                    config
                ),
                escrowComputeExecutionTemplate: EscrowComputeExecutionTemplate.getInstance(
                    config
                )
            })

            keeper.connected = true
        } catch {
            keeper.connected = false
            return
        }

        // Optionals
        try {
            keeper.instances.dispenser = await Dispenser.getInstance(config)
        } catch {
            keeper.logger.warn('Dispenser not available on this network.')
        }

        // Main contracts
        keeper.dispenser = keeper.instances.dispenser
        keeper.token = keeper.instances.token
        keeper.didRegistry = keeper.instances.didRegistry
        // Managers
        keeper.templateStoreManager = keeper.instances.templateStoreManager
        keeper.agreementStoreManager = keeper.instances.agreementStoreManager
        keeper.conditionStoreManager = keeper.instances.conditionStoreManager
        // Conditions
        keeper.conditions = {
            lockRewardCondition: keeper.instances.lockRewardCondition,
            escrowReward: keeper.instances.escrowReward,
            accessSecretStoreCondition: keeper.instances.accessSecretStoreCondition,
            computeExecutionCondition: keeper.instances.computeExecutionCondition
        }
        // Conditions
        keeper.templates = {
            escrowAccessSecretStoreTemplate:
                keeper.instances.escrowAccessSecretStoreTemplate,
            escrowComputeExecutionTemplate:
                keeper.instances.escrowComputeExecutionTemplate
        }
        // Utils
        keeper.utils = {
            eventHandler: new EventHandler(config)
        }

        return keeper
    }

    /**
     * Is connected to the correct network or not.
     * @type {boolean}
     */
    public connected: boolean = false

    /**
     * Ocean Token smart contract instance.
     * @type {Token}
     */
    public token: Token

    /**
     * Market smart contract instance.
     * @type {Dispenser}
     */
    public dispenser: Dispenser

    /**
     * DID registry smart contract instance.
     * @type {DIDRegistry}
     */
    public didRegistry: DIDRegistry

    /**
     * Template store manager smart contract instance.
     * @type {TemplateStoreManager}
     */
    public templateStoreManager: TemplateStoreManager

    /**
     * Template store manager smart contract instance.
     * @type {AgreementStoreManager}
     */
    public agreementStoreManager: AgreementStoreManager

    /**
     * Template store manager smart contract instance.
     * @type {ConditionStoreManager}
     */
    public conditionStoreManager: ConditionStoreManager

    /**
     * Conditions instances.
     */
    public conditions: {
        lockRewardCondition: LockRewardCondition
        escrowReward: EscrowReward
        accessSecretStoreCondition: AccessSecretStoreCondition
        computeExecutionCondition: ComputeExecutionCondition
    }

    /**
     * Templates instances.
     */
    public templates: {
        escrowAccessSecretStoreTemplate: EscrowAccessSecretStoreTemplate
        escrowComputeExecutionTemplate: EscrowComputeExecutionTemplate
    }

    /**
     * Helpers for contracts.
     */
    public utils: {
        eventHandler: EventHandler
    }

    private instances: { [contractRef: string]: ContractBase & any }

    /**
     * Returns a condition by address.
     * @param  {string} address Address of deployed condition.
     * @return {Condition} Condition instance.
     */
    public getConditionByAddress(address: string): Condition {
        return Object.values(this.conditions).find(
            condition => condition.getAddress() === address
        )
    }

    /**
     * Returns a template by name.
     * @param  {string} name Template name.
     * @return {AgreementTemplate} Agreement template instance.
     */
    public getTemplateByName(name: string): AgreementTemplate {
        return Object.values(this.templates).find(
            template => template.contractName === name
        )
    }

    /**
     * Returns a template by address.
     * @param  {string} address Template address.
     * @return {AgreementTemplate} Agreement template instance.
     */
    public getTemplateByAddress(address: string): AgreementTemplate {
        return Object.values(this.templates).find(
            template => template.getAddress() === address
        )
    }

    /**
     * Returns network id.
     * @return {Promise<number>} Network ID.
     */
    public getNetworkId(): Promise<number> {
        return this.web3.eth.net.getId()
    }

    /**
     * Returns the network by name.
     * @return {Promise<string>} Network name.
     */
    public getNetworkName(): Promise<string> {
        return this.web3.eth.net.getId().then((networkId: number) => {
            switch (networkId) {
                case 1:
                    return 'Main'
                case 2:
                    return 'Morden'
                case 3:
                    return 'Ropsten'
                case 4:
                    return 'Rinkeby'
                case 77:
                    return 'POA_Sokol'
                case 99:
                    return 'POA_Core'
                case 42:
                    return 'Kovan'
                case 100:
                    return 'xDai'
                case 2199:
                    return 'Duero'
                case 8996:
                    return 'Spree'
                case 8995:
                    return 'Nile'
                case 0xcea11:
                    return 'Pacific'
                default:
                    return 'Development'
            }
        })
    }

    public getAllInstances() {
        return this.instances
    }
}

export default Keeper
