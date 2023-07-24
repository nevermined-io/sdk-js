import { Account } from '../Account'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { DDO } from '../../ddo'
import { findServiceConditionByName, ZeroAddress } from '../../utils'
import { Token, CustomToken, TxParameters as txParams } from '../../keeper'
import { AssetPrice } from '../../models'
import { KeeperError } from '../../errors/KeeperError'
import { ContractTransactionReceipt, EventLog } from 'ethers'

/**
 * Nevermined Conditions API. It the interaction with the Smart Contracts building the conditions attached
 * to the Nevermined Service Execution Agreements.
 */
export class ConditionsApi extends Instantiable {
  /**
   * Creates a new ConditionsApi
   * @param config - Configuration of the Nevermined instance
   * @returns {@link ConditionsApi}
   */
  constructor(config: InstantiableConfig) {
    super()
    this.setInstanceConfig(config)
  }

  /**
   * Transfers tokens to the EscrowPaymentCondition contract as an escrow payment.
   *
   * @remarks
   * This is required before access can be given to the asset data.
   *
   * @param agreementId - Agreement ID.
   * @param did - The Asset ID.
   * @param amounts - Asset amounts to distribute.
   * @param receivers - Receivers of the rewards
   * @param erc20TokenAddress - Account of sender.
   * @param from - Account of sender.
   */
  public async lockPayment(
    agreementId: string,
    did: string,
    amounts: bigint[],
    receivers: string[],
    erc20TokenAddress?: string,
    from?: Account,
    txParams?: txParams,
  ): Promise<boolean> {
    const { lockPaymentCondition, escrowPaymentCondition } = this.nevermined.keeper.conditions

    let token: Token

    if (!erc20TokenAddress) {
      token = this.nevermined.keeper.token
    } else if (erc20TokenAddress.toLowerCase() !== ZeroAddress) {
      token = await CustomToken.getInstanceByAddress(
        {
          nevermined: this.nevermined,
          web3: this.web3,
          logger: this.logger,
          config: this.config,
        },
        erc20TokenAddress,
      )
    }

    const totalAmount = AssetPrice.sumAmounts(amounts)

    if (token) {
      this.logger.debug('Approving tokens', totalAmount)
      await token.approve(lockPaymentCondition.address, totalAmount, from, txParams)
    }

    const contractReceipt: ContractTransactionReceipt = await lockPaymentCondition.fulfill(
      agreementId,
      did,
      escrowPaymentCondition.address,
      token ? token.address : erc20TokenAddress,
      amounts,
      receivers,
      from,
      {
        ...txParams,
        value:
          erc20TokenAddress && erc20TokenAddress.toLowerCase() === ZeroAddress
            ? totalAmount.toString()
            : undefined,
      },
    )

    return this.isFulfilled(contractReceipt)
  }

  /**
   * Authorize the consumer defined in the agreement to access (consume) this asset.
   * @param agreementId - Agreement ID.
   * @param did - Asset ID.
   * @param grantee - Consumer address.
   * @param from - Account of sender.
   * @param txParams - Transaction parameters
   */
  public async grantAccess(
    agreementId: string,
    did: string,
    grantee: string,
    from?: Account,
    txParams?: txParams,
  ) {
    try {
      const { accessCondition } = this.nevermined.keeper.conditions

      const contractReceipt: ContractTransactionReceipt = await accessCondition.fulfill(
        agreementId,
        did,
        grantee,
        from,
        txParams,
      )
      return this.isFulfilled(contractReceipt)
    } catch (e) {
      throw new KeeperError(e)
    }
  }

  /**
   * Authorize the consumer defined in the agreement to execute a remote service associated with this asset.
   * @param agreementId - Agreement ID.
   * @param did - Asset ID.
   * @param grantee - Consumer address.
   * @param from - Account of sender.
   * @param txParams - Transaction parameters
   */
  public async grantServiceExecution(
    agreementId: string,
    did: string,
    grantee: string,
    from?: Account,
    params?: txParams,
  ) {
    try {
      const { computeExecutionCondition } = this.nevermined.keeper.conditions

      const contractReceipt: ContractTransactionReceipt = await computeExecutionCondition.fulfill(
        agreementId,
        did,
        grantee,
        from,
        params,
      )
      return this.isFulfilled(contractReceipt)
    } catch (e) {
      throw new KeeperError(e)
    }
  }

  /**
   * Transfer the escrow or locked tokens from the LockPaymentCondition contract to the publisher's account.
   *
   * @remarks
   * This should be allowed after access has been given to the consumer and the asset data is downloaded.
   *
   * If the AccessCondition already timed out, this function will do a refund by transferring
   * the token amount to the original consumer.
   *
   * @param agreementId - Agreement ID.
   * @param amounts - Asset amounts to distribute.
   * @param receivers - Receivers of the rewards
   * @param did - Asset ID.
   * @param erc20TokenAddress - Publisher address.
   * @param from - Account of sender.
   * @param txParams - Transaction parameters
   */
  public async releaseReward(
    agreementId: string,
    amounts: bigint[],
    receivers: string[],
    returnAddress: string,
    did: string,
    erc20TokenAddress?: string,
    from?: Account,
    txParams?: txParams,
  ) {
    try {
      const { escrowPaymentCondition } = this.nevermined.keeper.conditions

      let token: CustomToken

      if (!erc20TokenAddress) {
        token = this.nevermined.keeper.token
      } else if (erc20TokenAddress.toLowerCase() !== ZeroAddress) {
        token = await CustomToken.getInstanceByAddress(
          {
            nevermined: this.nevermined,
            web3: this.web3,
          },
          erc20TokenAddress,
        )
      }

      const storedAgreement = await this.nevermined.keeper.agreementStoreManager.getAgreement(
        agreementId,
      )
      storedAgreement.conditionIds
      const contractReceipt: ContractTransactionReceipt = await escrowPaymentCondition.fulfill(
        agreementId,
        did,
        amounts,
        receivers,
        returnAddress,
        escrowPaymentCondition.address,
        token ? token.address : erc20TokenAddress,
        storedAgreement.conditionIds[1],
        storedAgreement.conditionIds[0],
        from,
        txParams,
      )
      return this.isFulfilled(contractReceipt)
    } catch (e) {
      throw new KeeperError(e)
    }
  }

  /**
   * Releases the payment in escrow to the provider(s) of the sale
   * @param agreementId - The service agreement id for the nft sale.
   * @param ddo - The decentralized identifier of the asset containing the nfts.
   * @param nftAmount - Number of nfts bought.
   * @param publisher - The publisher account.
   * @returns {@link true} if the funds were released successfully.
   */
  public async releaseNftReward(
    agreementId: string,
    ddo: DDO,
    nftAmount: bigint,
    publisher: Account,
    from?: Account,
    txParams?: txParams,
  ) {
    const template = this.nevermined.keeper.templates.nftSalesTemplate
    const { accessConsumer } = await template.getAgreementData(agreementId)
    const { agreementIdSeed, creator } =
      await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
    const instance = await template.instanceFromDDO(
      agreementIdSeed,
      ddo,
      creator,
      template.params(accessConsumer, nftAmount),
    )

    const { escrowPaymentCondition } = this.nevermined.keeper.conditions
    const contractReceipt: ContractTransactionReceipt =
      await escrowPaymentCondition.fulfillInstance(
        instance.instances[2] as any,
        {},
        from || publisher,
        txParams,
      )

    if (!this.isFulfilled(contractReceipt)) {
      this.logger.error('Failed to fulfill escrowPaymentCondition', contractReceipt)
    }

    return this.isFulfilled(contractReceipt)
  }

  /**
   * Releases the payment in escrow to the provider(s) of the sale
   * @param agreementId - The service agreement id for the nft sale.
   * @param ddo - The decentralized identifier of the asset containing the nfts.
   * @param publisher - The publisher account.
   * @returns {@link true} if the funds were released successfully.
   */
  public async releaseNft721Reward(
    agreementId: string,
    ddo: DDO,
    publisher: Account,
    from?: Account,
    txParams?: txParams,
  ) {
    const template = this.nevermined.keeper.templates.nft721SalesTemplate
    const { accessConsumer } = await template.getAgreementData(agreementId)
    const { agreementIdSeed, creator } =
      await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
    const instance = await template.instanceFromDDO(
      agreementIdSeed,
      ddo,
      creator,
      template.params(accessConsumer),
    )

    const { escrowPaymentCondition } = this.nevermined.keeper.conditions
    const contractReceipt: ContractTransactionReceipt =
      await escrowPaymentCondition.fulfillInstance(
        instance.instances[2] as any,
        {},
        from || publisher,
        txParams,
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
   * @param agreementId - The service agreement id of the nft transfer.
   * @param did - The decentralized identifier of the asset containing the nfts.
   * @param holder - The address of the holder (recipient of a previous nft transfer with `agreementId`).
   * @param nftAmount - The amount of nfts that the `holder` needs to have to fulfill the access condition.
   * @param from - Account.
   * @returns {@link true} if the holder is able to fulfill the condition
   */
  public async holderNft(
    agreementId: string,
    did: string,
    holder: string,
    nftAmount: bigint,
    contractAddress?: string,
    from?: Account,
    params?: txParams,
  ) {
    const { nftHolderCondition } = this.nevermined.keeper.conditions
    ContractTransactionReceipt
    const contractReceipt: ContractTransactionReceipt = await nftHolderCondition.fulfill(
      agreementId,
      did,
      holder,
      nftAmount,
      contractAddress || this.nevermined.keeper.nftUpgradeable.address,
      from,
      params,
    )
    return this.isFulfilled(contractReceipt)
  }

  /**
   * Allows an nft holder to prove ownership of a certain number of nfts.
   * Used as an access condition to the underlying files.
   *
   * @param agreementId - The service agreement id of the nft transfer.
   * @param ddo - The decentralized identifier of the asset containing the nfts.
   * @param holderAddress - The address of the holder (recipient of a previous nft transfer with `agreementId`).
   * @param from - Account.
   * @returns {@link true} if the holder is able to fulfill the condition
   */
  public async holderNft721(
    agreementId: string,
    ddo: DDO,
    holderAddress: string,
    from?: Account,
    params?: txParams,
  ) {
    const { nft721HolderCondition } = this.nevermined.keeper.conditions
    const accessService = ddo.findServiceByType('nft-access')

    const holder = findServiceConditionByName(accessService, 'nftHolder')
    ContractTransactionReceipt
    const contractReceipt: ContractTransactionReceipt = await nft721HolderCondition.fulfill(
      agreementId,
      ddo.shortId(),
      holderAddress,
      holder.parameters.find((p) => p.name === '_contractAddress').value as string,
      from,
      params,
    )

    return this.isFulfilled(contractReceipt)
  }

  /**
   * Fulfills the access condition required to give access to the underlying files of an nft.
   *
   * @param agreementId - The service agreement id of the nft transfer.
   * @param did - The decentralized identifier of the asset containing the nfts.
   * @param grantee - The address of the user trying to get access to the files.
   * @param from - Account.
   * @returns {@link true} if the provider is able to fulfill the condition
   */
  public async grantNftAccess(
    agreementId: string,
    did: string,
    grantee: string,
    from?: Account,
    params?: txParams,
  ) {
    const { nftAccessCondition } = this.nevermined.keeper.conditions
    ContractTransactionReceipt
    const contractReceipt: ContractTransactionReceipt = await nftAccessCondition.fulfill(
      agreementId,
      did,
      grantee,
      from,
      params,
    )
    return this.isFulfilled(contractReceipt)
  }

  /**
   * Transfers a certain amount of nfts after payment as been made.
   * @param agreementId - The service agreement id of the nft transfer.
   * @param ddo - The decentralized identifier of the asset containing the nfts.
   * @param nftAmount - The amount of nfts to transfer.
   * @param from - Account.
   * @returns {@link true} if the transfer is successful
   */
  public async transferNft(
    agreementId: string,
    ddo: DDO,
    nftAmount: bigint,
    from?: Account,
    txParams?: txParams,
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
      template.params(accessConsumer, nftAmount),
    )

    const contractReceipt: ContractTransactionReceipt = await transferNftCondition.fulfillInstance(
      instance.instances[1] as any,
      {},
      from,
      txParams,
    )

    return this.isFulfilled(contractReceipt)
  }

  /**
   * Transfers a certain amount of nfts after payment as been made.
   * @param agreementId - The service agreement id of the nft transfer.
   * @param ddo - The decentralized identifier of the asset containing the nfts.
   * @param nftAmount - The amount of nfts to transfer.
   * @param from - Account.
   * @returns {@link true} if the transfer is successful
   */
  public async transferNftForDelegate(
    agreementId: string,
    ddo: DDO,
    nftAmount: bigint,
    from?: Account,
    params?: txParams,
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
      template.params(accessConsumer, nftAmount),
    )
    const [did, nftHolder, nftReceiver, _nftAmount, lockPaymentCondition, , transferAsset] =
      instance.instances[1].list
    const contractReceipt: ContractTransactionReceipt = await transferNftCondition.fulfillPlain(
      agreementId,
      [did, nftHolder, nftReceiver, _nftAmount, lockPaymentCondition, transferAsset],
      from,
      params,
      'fulfillForDelegate',
    )

    return this.isFulfilled(contractReceipt)
  }

  /**
   * Transfers a certain amount of nfts after payment as been made.
   * @param agreementId - The service agreement id of the nft transfer.
   * @param ddo - The decentralized identifier of the asset containing the nfts.
   * @param publisher - Account.
   * @returns {@link true} if the transfer is successful
   */
  public async transferNft721(
    agreementId: string,
    ddo: DDO,
    publisher: Account,
    txParams?: txParams,
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
      template.params(accessConsumer),
    )

    const nft = await this.nevermined.contracts.loadNft721(instance.instances[1].list[5])

    await nft.setApprovalForAll(transferNft721Condition.address, true, publisher, txParams)

    const contractReceipt: ContractTransactionReceipt =
      await transferNft721Condition.fulfillInstance(
        instance.instances[1] as any,
        {},
        publisher,
        txParams,
      )

    await nft.setApprovalForAll(transferNft721Condition.address, false, publisher, txParams)

    return this.isFulfilled(contractReceipt)
  }

  private isFulfilled(contractReceipt: ContractTransactionReceipt): boolean {
    return contractReceipt.logs.some((e: EventLog) => e.eventName === 'Fulfilled')
  }
}
