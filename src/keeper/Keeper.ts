import { ContractBase } from './contracts/ContractBase'

import DIDRegistry from './contracts/DIDRegistry'
import Dispenser from './contracts/Dispenser'
import Token from './contracts/Token'
import {
    Condition,
    LockPaymentCondition,
    EscrowPaymentCondition,
    AccessCondition,
    AccessProofCondition,
    ComputeExecutionCondition,
    NFTHolderCondition,
    NFTLockCondition,
    NFTAccessCondition,
    TransferNFTCondition,
    TransferDIDOwnershipCondition,
    TransferNFT721Condition,
    NFT721HolderCondition,
    AaveBorrowCondition,
    AaveCollateralDepositCondition,
    AaveCollateralWithdrawCondition,
    AaveRepayCondition,
    NFT721LockCondition,
    DistributeNFTCollateralCondition
} from './contracts/conditions'
import {
    AgreementTemplate,
    AccessTemplate,
    AccessProofTemplate,
    EscrowComputeExecutionTemplate,
    DIDSalesTemplate,
    NFTAccessTemplate,
    NFT721AccessTemplate,
    NFTSalesTemplate,
    NFT721SalesTemplate,
    AaveCreditTemplate
} from './contracts/templates'
import {
    TemplateStoreManager,
    AgreementStoreManager,
    ConditionStoreManager
} from './contracts/managers'
import * as KeeperUtils from './utils'
import { objectPromiseAll } from '../utils'
import { EventHandler } from '../events/EventHandler'

import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { NFTUpgradeable } from './contracts/conditions/NFTs/NFTUpgradable'
import { GenericAccess } from './contracts/templates/GenericAccess'

/**
 * Interface with Nevermined contracts.
 * Nevermined Keeper implementation where we put the following modules together:
 * - TCRs: users create challenges and resolve them through voting to maintain registries.
 * - Nevermined Tokens: the intrinsic tokens circulated inside Nevermined network, which is used in the voting of TCRs.
 * - Marketplace: the core marketplace where people can transact with each other with Nevermined tokens.
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
        // config.nevermined.keeper = keeper
        keeper.instances = {}
        try {
            keeper.instances = await objectPromiseAll({
                // Main contracts
                dispenser: undefined, // Optional
                token: undefined, // Optional
                nftUpgradeable: undefined, // Optional
                didRegistry: DIDRegistry.getInstance(config),
                // Managers
                templateStoreManager: TemplateStoreManager.getInstance(config),
                agreementStoreManager: AgreementStoreManager.getInstance(config),
                conditionStoreManager: ConditionStoreManager.getInstance(config),
                // Conditions
                lockPaymentCondition: LockPaymentCondition.getInstance(config),
                escrowPaymentCondition: EscrowPaymentCondition.getInstance(config),
                accessCondition: AccessCondition.getInstance(config),
                accessProofCondition: AccessProofCondition.getInstance(config),
                computeExecutionCondition: ComputeExecutionCondition.getInstance(config),
                nftHolderCondition: NFTHolderCondition.getInstance(config),
                nft721HolderCondition: NFT721HolderCondition.getInstance(config),
                nftLockCondition: NFTLockCondition.getInstance(config),
                nftAccessCondition: NFTAccessCondition.getInstance(config),
                transferNftCondition: TransferNFTCondition.getInstance(config),
                transferNft721Condition: TransferNFT721Condition.getInstance(config),
                transferDidOwnershipCondition: TransferDIDOwnershipCondition.getInstance(
                    config
                ),
                aaveBorrowCondition: AaveBorrowCondition.getInstance(config),
                aaveCollateralDepositCondition: AaveCollateralDepositCondition.getInstance(
                    config
                ),
                aaveCollateralWithdrawCondition: AaveCollateralWithdrawCondition.getInstance(
                    config
                ),
                aaveRepayCondition: AaveRepayCondition.getInstance(config),
                nft721LockCondition: NFT721LockCondition.getInstance(config),
                distributeNftCollateralCondition: DistributeNFTCollateralCondition.getInstance(
                    config
                ),
                // Templates
                accessTemplate: AccessTemplate.getInstance(config),
                accessProofTemplate: AccessProofTemplate.getInstance(config),
                escrowComputeExecutionTemplate: EscrowComputeExecutionTemplate.getInstance(
                    config
                ),
                nftAccessTemplate: NFTAccessTemplate.getInstance(config),
                nft721AccessTemplate: NFT721AccessTemplate.getInstance(config),
                didSalesTemplate: DIDSalesTemplate.getInstance(config),
                nftSalesTemplate: NFTSalesTemplate.getInstance(config),
                nft721SalesTemplate: NFT721SalesTemplate.getInstance(config),
                aaveCreditTemplate: AaveCreditTemplate.getInstance(config)
            })

            const templates = [
                keeper.instances.accessTemplate,
                keeper.instances.accessProofTemplate,
                keeper.instances.escrowComputeExecutionTemplate,
                keeper.instances.nftAccessTemplate,
                keeper.instances.nft721AccessTemplate,
                keeper.instances.didSalesTemplate,
                keeper.instances.nftSalesTemplate,
                keeper.instances.nft721SalesTemplate,
                keeper.instances.aaveCreditTemplate
            ]

            const templateObj: any = {}
            for (const i of templates) {
                templateObj[i.address] = i
            }

            console.log("setting templates", keeper.instances.aaveCreditTemplate.address)

            keeper.instances.agreementStoreManager.setTemplates(templateObj)

            keeper.connected = true
        } catch (err) {
            console.log(err)
            keeper.connected = false
            keeper.logger.warn(
                `'Keeper could not connect to: ${await keeper.getNetworkName()}`,
                err.message
            )
            return
        }

        // Optionals
        try {
            keeper.instances.dispenser = await Dispenser.getInstance(config)
        } catch {
            keeper.logger.warn('Dispenser not available on this network.')
        }

        try {
            keeper.instances.token = await Token.getInstance(config)
        } catch {
            keeper.logger.warn('Token not available on this network.')
        }

        try {
            keeper.instances.nftUpgradeable = await NFTUpgradeable.getInstance(config)
        } catch {
            keeper.logger.warn('NFTUpgradeable not available on this network.')
        }
        // Main contracts
        keeper.dispenser = keeper.instances.dispenser
        keeper.token = keeper.instances.token
        keeper.didRegistry = keeper.instances.didRegistry
        keeper.nftUpgradeable = keeper.instances.nftUpgradeable
        // Managers
        keeper.templateStoreManager = keeper.instances.templateStoreManager
        keeper.agreementStoreManager = keeper.instances.agreementStoreManager
        keeper.conditionStoreManager = keeper.instances.conditionStoreManager
        // Conditions
        keeper.conditions = {
            lockPaymentCondition: keeper.instances.lockPaymentCondition,
            escrowPaymentCondition: keeper.instances.escrowPaymentCondition,
            accessCondition: keeper.instances.accessCondition,
            accessProofCondition: keeper.instances.accessProofCondition,
            computeExecutionCondition: keeper.instances.computeExecutionCondition,
            nftHolderCondition: keeper.instances.nftHolderCondition,
            nft721HolderCondition: keeper.instances.nft721HolderCondition,
            nftLockCondition: keeper.instances.nftLockCondition,
            nftAccessCondition: keeper.instances.nftAccessCondition,
            transferNftCondition: keeper.instances.transferNftCondition,
            transferNft721Condition: keeper.instances.transferNft721Condition,
            transferDidOwnershipCondition: keeper.instances.transferDidOwnershipCondition,
            aaveBorrowCondition: keeper.instances.aaveBorrowCondition,
            aaveCollateralDepositCondition:
                keeper.instances.aaveCollateralDepositCondition,
            aaveCollateralWithdrawCondition:
                keeper.instances.aaveCollateralWithdrawCondition,
            aaveRepayCondition: keeper.instances.aaveRepayCondition,
            nft721LockCondition: keeper.instances.nft721LockCondition,
            distributeNftCollateralCondition:
                keeper.instances.distributeNftCollateralCondition
        }
        // Templates
        keeper.templates = {
            accessTemplate: keeper.instances.accessTemplate,
            accessProofTemplate: keeper.instances.accessProofTemplate,
            escrowComputeExecutionTemplate:
                keeper.instances.escrowComputeExecutionTemplate,
            didSalesTemplate: keeper.instances.didSalesTemplate,
            nftAccessTemplate: keeper.instances.nftAccessTemplate,
            nft721AccessTemplate: keeper.instances.nft721AccessTemplate,
            nftSalesTemplate: keeper.instances.nftSalesTemplate,
            nft721SalesTemplate: keeper.instances.nft721SalesTemplate,
            aaveCreditTemplate: keeper.instances.aaveCreditTemplate
        }
        // Utils
        keeper.utils = {
            eventHandler: new EventHandler()
        }
        return keeper
    }

    /**
     * Is connected to the correct network or not.
     * @type {boolean}
     */
    public connected: boolean = false

    /**
     * Nevermined Token smart contract instance.
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
     * NFT upgradeable smart contract instance.
     * @type {NFTUpgradeable}
     */
    public nftUpgradeable: NFTUpgradeable

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
        lockPaymentCondition: LockPaymentCondition
        escrowPaymentCondition: EscrowPaymentCondition
        accessCondition: AccessCondition
        accessProofCondition: AccessProofCondition
        computeExecutionCondition: ComputeExecutionCondition
        nftHolderCondition: NFTHolderCondition
        nft721HolderCondition: NFT721HolderCondition
        nftLockCondition: NFTLockCondition
        nftAccessCondition: NFTAccessCondition
        transferNftCondition: TransferNFTCondition
        transferNft721Condition: TransferNFT721Condition
        transferDidOwnershipCondition: TransferDIDOwnershipCondition
        nft721LockCondition: NFT721LockCondition
        aaveCollateralDepositCondition: AaveCollateralDepositCondition
        aaveBorrowCondition: AaveBorrowCondition
        aaveRepayCondition: AaveRepayCondition
        aaveCollateralWithdrawCondition: AaveCollateralWithdrawCondition
        distributeNftCollateralCondition: DistributeNFTCollateralCondition
    }

    /**
     * Templates instances.
     */
    public templates: {
        accessTemplate: AccessTemplate
        accessProofTemplate: AccessProofTemplate
        escrowComputeExecutionTemplate: EscrowComputeExecutionTemplate
        didSalesTemplate: DIDSalesTemplate
        nftAccessTemplate: NFTAccessTemplate
        nft721AccessTemplate: NFT721AccessTemplate
        nftSalesTemplate: NFTSalesTemplate
        nft721SalesTemplate: NFT721SalesTemplate
        aaveCreditTemplate: AaveCreditTemplate
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
     * Returns a Access template by name.
     * @param  {string} name Template name.
     * @return {GenericAccess} Agreement template instance.
     */
    public getAccessTemplateByName(name: string): GenericAccess {
        return Object.values(this.templates).find(
            template => template.contractName === name
        ) as GenericAccess
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
        return Keeper.getNetworkId(this.web3)
    }

    public static getNetworkId(web3): Promise<number> {
        return KeeperUtils.getNetworkId(web3)
    }

    /**
     * Returns the network by name.
     * @return {Promise<string>} Network name.
     */
    public getNetworkName(): Promise<string> {
        return Keeper.getNetworkName(this.web3)
    }

    public static getNetworkName(web3): Promise<string> {
        return KeeperUtils.getNetworkName(web3)
    }

    public getAllInstances() {
        return this.instances
    }
}

export default Keeper
