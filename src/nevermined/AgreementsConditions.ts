import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { DDO } from '../ddo/DDO'
import { findServiceConditionByName, ZeroAddress } from '../utils'
import Token from '../keeper/contracts/Token'
import CustomToken from '../keeper/contracts/CustomToken'
import { TxParameters } from '../keeper/contracts/ContractBase'
import AssetRewards from '../models/AssetRewards'
import { KeeperError } from '../errors/KeeperError'
import { ContractReceipt } from 'ethers'
import BigNumber from '../utils/BigNumber'

/**
 * Agreements Conditions submodule of Nevermined.
 */
export class AgreementsConditions extends Instantiable {
    /**
     * Returns the instance of AgreementsConditions.
     * @return {Promise<AgreementsConditions>}
     */
    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AgreementsConditions> {
        const instance = new AgreementsConditions()
        instance.setInstanceConfig(config)

        return instance
    }

    /**
     * Transfers tokens to the EscrowPaymentCondition contract as an escrow payment.
     * This is required before access can be given to the asset data.
     * @param {string}      agreementId         Agreement ID.
     * @param {string}      did                 The Asset ID.
     * @param {BigNumber[]}    amounts             Asset amounts to distribute.
     * @param {string[]}    receivers           Receivers of the rewards
     * @param {string}      erc20TokenAddress   Account of sender.
     * @param {Account}     from                Account of sender.
     */
    public async lockPayment(
        agreementId: string,
        did: string,
        amounts: BigNumber[],
        receivers: string[],
        erc20TokenAddress?: string,
        from?: Account,
        txParams?: TxParameters
    ): Promise<boolean> {
        const { lockPaymentCondition, escrowPaymentCondition } =
            this.nevermined.keeper.conditions

        let token: Token

        if (!erc20TokenAddress) {
            ;({ token } = this.nevermined.keeper)
        } else if (erc20TokenAddress.toLowerCase() !== ZeroAddress) {
            token = await CustomToken.getInstanceByAddress(
                {
                    nevermined: this.nevermined,
                    web3: this.web3,
                    logger: this.logger,
                    config: this.config
                },
                erc20TokenAddress
            )
        }

        const totalAmount = AssetRewards.sumAmounts(amounts)

        if (token) {
            this.logger.debug('Approving tokens', totalAmount)
            await token.approve(
                lockPaymentCondition.getAddress(),
                totalAmount,
                from,
                txParams
            )
        }

        const contractReceipt: ContractReceipt = await lockPaymentCondition.fulfill(
            agreementId,
            did,
            escrowPaymentCondition.getAddress(),
            token ? token.getAddress() : erc20TokenAddress,
            amounts,
            receivers,
            from,
            {
                ...txParams,
                value:
                    erc20TokenAddress && erc20TokenAddress.toLowerCase() === ZeroAddress
                        ? totalAmount.toString()
                        : undefined
            }
        )

        return this.isFulfilled(contractReceipt)
    }

    /**
     * Authorize the consumer defined in the agreement to access (consume) this asset.
     * @param {string}  agreementId Agreement ID.
     * @param {string}  did         Asset ID.
     * @param {string}  grantee     Consumer address.
     * @param {Account} from        Account of sender.
     */
    public async grantAccess(
        agreementId: string,
        did: string,
        grantee: string,
        from?: Account,
        params?: TxParameters
    ) {
        try {
            const { accessCondition } = this.nevermined.keeper.conditions

            const contractReceipt: ContractReceipt = await accessCondition.fulfill(
                agreementId,
                did,
                grantee,
                from,
                params
            )
            return this.isFulfilled(contractReceipt)
        } catch (e) {
            throw new KeeperError(e)
        }
    }

    /**
     * Authorize the consumer defined in the agreement to execute a remote service associated with this asset.
     * @param {string}  agreementId Agreement ID.
     * @param {string}  did         Asset ID.
     * @param {string}  grantee     Consumer address.
     * @param {Account} from        Account of sender.
     */
    public async grantServiceExecution(
        agreementId: string,
        did: string,
        grantee: string,
        from?: Account,
        params?: TxParameters
    ) {
        try {
            const { computeExecutionCondition } = this.nevermined.keeper.conditions

            const contractReceipt: ContractReceipt =
                await computeExecutionCondition.fulfill(
                    agreementId,
                    did,
                    grantee,
                    from,
                    params
                )
            return this.isFulfilled(contractReceipt)
        } catch (e) {
            throw new KeeperError(e)
        }
    }

    /**
     * Transfer the escrow or locked tokens from the LockPaymentCondition contract to the publisher's account.
     * This should be allowed after access has been given to the consumer and the asset data is downloaded.
     *
     * If the AccessCondition already timed out, this function will do a refund by transferring
     * the token amount to the original consumer.
     * @param {string}      agreementId         Agreement ID.
     * @param {number[]}    amounts             Asset amounts to distribute.
     * @param {string[]}    receivers           Receivers of the rewards
     * @param {string}      did                 Asset ID.
     * @param {string}      consumer            Consumer address.
     * @param {string}      publisher           Publisher address.
     * @param {string}      erc20TokenAddress   Publisher address.
     * @param {Account}     from                Account of sender.
     */
    public async releaseReward(
        agreementId: string,
        amounts: BigNumber[],
        receivers: string[],
        returnAddress: string,
        did: string,
        erc20TokenAddress?: string,
        from?: Account,
        params?: TxParameters
    ) {
        try {
            const { escrowPaymentCondition } = this.nevermined.keeper.conditions

            let token

            if (!erc20TokenAddress) {
                ;({ token } = this.nevermined.keeper)
            } else if (erc20TokenAddress.toLowerCase() !== ZeroAddress) {
                token = await CustomToken.getInstanceByAddress(
                    {
                        nevermined: this.nevermined,
                        web3: this.web3
                    },
                    erc20TokenAddress
                )
            }

            const storedAgreement =
                await this.nevermined.keeper.agreementStoreManager.getAgreement(
                    agreementId
                )
            storedAgreement.conditionIds
            const contractReceipt: ContractReceipt = await escrowPaymentCondition.fulfill(
                agreementId,
                did,
                amounts,
                receivers,
                returnAddress,
                escrowPaymentCondition.getAddress(),
                token ? token.getAddress() : erc20TokenAddress,
                storedAgreement.conditionIds[1],
                storedAgreement.conditionIds[0],
                from,
                params
            )
            return this.isFulfilled(contractReceipt)
        } catch (e) {
            throw new KeeperError(e)
        }
    }

    /**
     * Releases the payment in escrow to the provider(s) of the sale
     *
     * @param {String} agreementId The service agreement id for the nft sale.
     * @param {DDO} ddo The decentralized identifier of the asset containing the nfts.
     * @param {BigNumber[]} amounts The amounts that should have been payed.
     * @param {String[]} receivers The addresses that should receive the amounts.
     * @param {Number} nftAmount Number of nfts bought.
     * @param publisher
     * @returns {Boolean} True if the funds were released successfully.
     */
    public async releaseNftReward(
        agreementId: string,
        ddo: DDO,
        nftAmount: number,
        publisher: Account,
        from?: Account,
        txParams?: TxParameters
    ) {
        const template = this.nevermined.keeper.templates.nftSalesTemplate
        const { accessConsumer } = await template.getAgreementData(agreementId)
        const { agreementIdSeed, creator } =
            await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
        const instance = await template.instanceFromDDO(
            agreementIdSeed,
            ddo,
            creator,
            template.params(accessConsumer, nftAmount)
        )

        const { escrowPaymentCondition } = this.nevermined.keeper.conditions
        const contractReceipt: ContractReceipt =
            await escrowPaymentCondition.fulfillInstance(
                instance.instances[2] as any,
                {},
                from || publisher,
                txParams
            )

        if (!this.isFulfilled(contractReceipt)) {
            this.logger.error('Failed to fulfill escrowPaymentCondition', contractReceipt)
        }

        return this.isFulfilled(contractReceipt)
    }

    /**
     * Releases the payment in escrow to the provider(s) of the sale
     *
     * @param {String} agreementId The service agreement id for the nft sale.
     * @param {DDO} ddo The decentralized identifier of the asset containing the nfts.
     * @param {BigNumber[]} amounts The amounts that should have been payed.
     * @param {String[]} receivers The addresses that should receive the amounts.
     * @param publisher
     * @returns {Boolean} True if the funds were released successfully.
     */
    public async releaseNft721Reward(
        agreementId: string,
        ddo: DDO,
        publisher: Account,
        from?: Account,
        txParams?: TxParameters
    ) {
        const template = this.nevermined.keeper.templates.nft721SalesTemplate
        const { accessConsumer } = await template.getAgreementData(agreementId)
        const { agreementIdSeed, creator } =
            await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
        const instance = await template.instanceFromDDO(
            agreementIdSeed,
            ddo,
            creator,
            template.params(accessConsumer)
        )

        const { escrowPaymentCondition } = this.nevermined.keeper.conditions
        const contractReceipt: ContractReceipt =
            await escrowPaymentCondition.fulfillInstance(
                instance.instances[2] as any,
                {},
                from || publisher,
                txParams
            )

        if (!this.isFulfilled(contractReceipt)) {
            this.logger.error('Failed to fulfill escrowPaymentCondition', contractReceipt)
        }

        return this.isFulfilled(contractReceipt)
    }

    /**
     * Allows an nft holder to prove ownership of a certain number of nfts.
     * Used as an access condition to the underlying files.
     *
     * @param {String} agreementId The service agreement id of the nft transfer.
     * @param {String} did The decentralized identifier of the asset containing the nfts.
     * @param {String} holder The address of the holder (recipient of a previous nft transfer with `agreementId`).
     * @param {String} nftAmount The amount of nfts that the `holder` needs to have to fulfill the access condition.
     * @param from
     * @returns {Boolean} True if the holder is able to fulfill the condition
     */
    public async holderNft(
        agreementId: string,
        did: string,
        holder: string,
        nftAmount: number,
        from?: Account,
        params?: TxParameters
    ) {
        const { nftHolderCondition } = this.nevermined.keeper.conditions

        const contractReceipt: ContractReceipt = await nftHolderCondition.fulfill(
            agreementId,
            did,
            holder,
            nftAmount,
            from,
            params
        )
        return this.isFulfilled(contractReceipt)
    }

    /**
     * Allows an nft holder to prove ownership of a certain number of nfts.
     * Used as an access condition to the underlying files.
     *
     * @param {String} agreementId The service agreement id of the nft transfer.
     * @param {DDO} ddo The decentralized identifier of the asset containing the nfts.
     * @param {String} holderAddress The address of the holder (recipient of a previous nft transfer with `agreementId`).
     * @param from
     * @returns {Boolean} True if the holder is able to fulfill the condition
     */
    public async holderNft721(
        agreementId: string,
        ddo: DDO,
        holderAddress: string,
        from?: Account,
        params?: TxParameters
    ) {
        const { nft721HolderCondition } = this.nevermined.keeper.conditions
        const accessService = ddo.findServiceByType('nft721-access')

        const holder = findServiceConditionByName(accessService, 'nftHolder')

        const contractReceipt: ContractReceipt = await nft721HolderCondition.fulfill(
            agreementId,
            ddo.shortId(),
            holderAddress,
            holder.parameters.find((p) => p.name === '_contractAddress').value as string,
            from,
            params
        )

        return this.isFulfilled(contractReceipt)
    }

    /**
     * Fulfills the access condition required to give access to the underliying files of an nft.
     *
     * @param {String} agreementId The service agreement id of the nft transfer.
     * @param {String} did The decentralized identifier of the asset containing the nfts.
     * @param {String} grantee The address of the user trying to get access to the files.
     * @param from
     * @returns True if the provider is able to fulfill the condition
     */
    public async grantNftAccess(
        agreementId: string,
        did: string,
        grantee: string,
        from?: Account,
        params?: TxParameters
    ) {
        const { nftAccessCondition } = this.nevermined.keeper.conditions

        const contractReceipt: ContractReceipt = await nftAccessCondition.fulfill(
            agreementId,
            did,
            grantee,
            from,
            params
        )
        return this.isFulfilled(contractReceipt)
    }

    /**
     * Transfers a certain amount of nfts after payment as been made.
     *
     * @param {String} agreementId The service agreement id of the nft transfer.
     * @param {DDO} ddo he decentralized identifier of the asset containing the nfts.
     * @param {BigNumber[]} amounts The expected that amounts that should have been payed.
     * @param {String[]} receivers The addresses of the expected receivers of the payment.
     * @param {Number} nftAmount The amount of nfts to transfer.
     * @param from
     * @returns {Boolean} True if the transfer is successfull
     */
    public async transferNft(
        agreementId: string,
        ddo: DDO,
        nftAmount: number,
        from?: Account,
        txParams?: TxParameters
    ) {
        const { transferNftCondition } = this.nevermined.keeper.conditions
        const template = this.nevermined.keeper.templates.nftSalesTemplate

        const { accessConsumer } = await template.getAgreementData(agreementId)
        const { agreementIdSeed, creator } =
            await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
        const instance = await template.instanceFromDDO(
            agreementIdSeed,
            ddo,
            creator,
            template.params(accessConsumer, nftAmount)
        )

        const contractReceipt: ContractReceipt =
            await transferNftCondition.fulfillInstance(
                instance.instances[1] as any,
                {},
                from,
                txParams
            )

        return this.isFulfilled(contractReceipt)
    }

    /**
     * Transfers a certain amount of nfts after payment as been made.
     *
     * @param {String} agreementId The service agreement id of the nft transfer.
     * @param {DDO} ddo he decentralized identifier of the asset containing the nfts.
     * @param {BigNumber[]} amounts The expected that amounts that should have been payed.
     * @param {String[]} receivers The addresses of the expected receivers of the payment.
     * @param {Number} nftAmount The amount of nfts to transfer.
     * @param from
     * @returns {Boolean} True if the transfer is successfull
     */
    public async transferNftForDelegate(
        agreementId: string,
        ddo: DDO,
        nftAmount: number,
        from?: Account,
        params?: TxParameters
    ) {
        const { transferNftCondition } = this.nevermined.keeper.conditions
        const template = this.nevermined.keeper.templates.nftSalesTemplate

        const { accessConsumer } = await template.getAgreementData(agreementId)
        const { agreementIdSeed, creator } =
            await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
        const instance = await template.instanceFromDDO(
            agreementIdSeed,
            ddo,
            creator,
            template.params(accessConsumer, nftAmount)
        )
        const [
            did,
            nftHolder,
            nftReceiver,
            _nftAmount,
            lockPaymentCondition,
            ,
            transferAsset
        ] = instance.instances[1].list
        const contractReceipt: ContractReceipt = await transferNftCondition.fulfillPlain(
            agreementId,
            [
                did,
                nftHolder,
                nftReceiver,
                _nftAmount,
                lockPaymentCondition,
                transferAsset
            ],
            from,
            params,
            'fulfillForDelegate'
        )

        return this.isFulfilled(contractReceipt)
    }

    /**
     * Transfers a certain amount of nfts after payment as been made.
     *
     * @param {String} agreementId The service agreement id of the nft transfer.
     * @param {DDO} ddo the decentralized identifier of the asset containing the nfts.
     * @param {Number[]} amounts The expected that amounts that should have been payed.
     * @param {String[]} receivers The addresses of the expected receivers of the payment.
     * @param publisher
     * @returns {Boolean} True if the transfer is successfull
     */
    public async transferNft721(
        agreementId: string,
        ddo: DDO,
        publisher: Account,
        txParams?: TxParameters
    ) {
        const { transferNft721Condition } = this.nevermined.keeper.conditions
        const template = this.nevermined.keeper.templates.nft721SalesTemplate

        const { accessConsumer } = await template.getAgreementData(agreementId)
        const { agreementIdSeed, creator } =
            await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
        const instance = await template.instanceFromDDO(
            agreementIdSeed,
            ddo,
            creator,
            template.params(accessConsumer)
        )

        const nft = await this.nevermined.contracts.loadNft721(
            instance.instances[1].list[5]
        )

        await nft.setApprovalForAll(
            transferNft721Condition.address,
            true,
            publisher,
            txParams
        )

        const contractReceipt: ContractReceipt =
            await transferNft721Condition.fulfillInstance(
                instance.instances[1] as any,
                {},
                publisher,
                txParams
            )

        await nft.setApprovalForAll(
            transferNft721Condition.address,
            false,
            publisher,
            txParams
        )

        return this.isFulfilled(contractReceipt)
    }

    private isFulfilled(contractReceipt: ContractReceipt): boolean {
        return contractReceipt.events.some((e) => e.event === 'Fulfilled')
    }
}
