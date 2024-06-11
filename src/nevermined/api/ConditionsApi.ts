import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { ZeroAddress } from '../../constants/AssetConstants'
import { DDO } from '../../ddo/DDO'
import { KeeperError } from '../../errors/NeverminedErrors'
import { CustomToken } from '../../keeper/contracts/CustomToken'
import { AssetPrice } from '../../models/AssetPrice'
import { NvmAccount } from '../../models/NvmAccount'
import { TxParameters as txParams } from '../../models/Transactions'
import { ServiceType, ServiceNFTSales } from '../../types/DDOTypes'
import { Abi, TransactionReceipt, parseAbi, parseEventLogs } from 'viem'

/**
 * Nevermined Conditions API. It the interaction with the Smart Contracts building the conditions attached
 * to the Nevermined Service Execution Agreements.
 */
export class ConditionsApi extends Instantiable {
  static GENERIC_EVENT_FULFILLED_ABI = parseAbi([
    'event Fulfilled(bytes32 indexed _agreementId, bytes32 indexed _documentId, address indexed grantee, bytes32 _conditionId)',
  ])
  static LOCK_PAYMENT_EVENT_FULFILLED_ABI = parseAbi([
    'event Fulfilled(bytes32 indexed _agreementId, bytes32 indexed _did, bytes32 indexed _conditionId, address _rewardAddress, address _tokenAddress, address[] _receivers, uint256[] _amounts)',
  ])
  static ESCROW_EVENT_FULFILLED_ABI = parseAbi([
    'event Fulfilled(bytes32 indexed _agreementId, address indexed _tokenAddress, address[] _receivers, bytes32 _conditionId, uint256[] _amounts)',
  ])
  static NFT_HOLDER_EVENT_FULFILLED_ABI = parseAbi([
    'event Fulfilled(bytes32 indexed _agreementId, bytes32 indexed _did, address indexed _address, bytes32 _conditionId, uint256 _amount)',
  ])
  static TRANSFER_NFT_EVENT_FULFILLED_ABI = parseAbi([
    'event Fulfilled(bytes32 indexed _agreementId, bytes32 indexed _did, address indexed _receiver, uint256 _amount, bytes32 _conditionId, address _contract)',
  ])

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
   * @param from - Account of sender.
   * @param erc20TokenAddress - ERC20 contract address of the token used for the payment if is the zero address, it will use the native token of the network (i.e ETH)
   * @param txParams - Transaction parameters
   */
  public async lockPayment(
    agreementId: string,
    did: string,
    amounts: bigint[],
    receivers: string[],
    from: NvmAccount,
    erc20TokenAddress?: string,
    txParams?: txParams,
  ): Promise<boolean> {
    const { lockPaymentCondition, escrowPaymentCondition } = this.nevermined.keeper.conditions

    let token

    if (!erc20TokenAddress) {
      token = this.nevermined.keeper.token
    } else if (erc20TokenAddress.toLowerCase() !== ZeroAddress) {
      token = await CustomToken.getInstanceByAddress(
        {
          nevermined: this.nevermined,
          client: this.client,
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

    const txReceipt = await lockPaymentCondition.fulfill(
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
          erc20TokenAddress && erc20TokenAddress.toLowerCase() === ZeroAddress ? totalAmount : 0n,
      },
    )

    return this.isFulfilled(txReceipt, ConditionsApi.LOCK_PAYMENT_EVENT_FULFILLED_ABI)
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
    from: NvmAccount,
    txParams?: txParams,
  ) {
    try {
      const { accessCondition } = this.nevermined.keeper.conditions

      const txReceipt = await accessCondition.fulfill(agreementId, did, grantee, from, txParams)
      return this.isFulfilled(txReceipt, ConditionsApi.GENERIC_EVENT_FULFILLED_ABI)
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
    from: NvmAccount,
    params?: txParams,
  ) {
    try {
      const { computeExecutionCondition } = this.nevermined.keeper.conditions

      const txReceipt = await computeExecutionCondition.fulfill(
        agreementId,
        did,
        grantee,
        from,
        params,
      )
      return this.isFulfilled(txReceipt, ConditionsApi.GENERIC_EVENT_FULFILLED_ABI)
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
   * @param from - Account of sender.
   * @param erc20TokenAddress - ERC20 contract address of the token used for the payment if is the zero address, it will use the native token of the network (i.e ETH)
   * @param txParams - Transaction parameters
   */
  public async releaseReward(
    agreementId: string,
    amounts: bigint[],
    receivers: string[],
    returnAddress: string,
    did: string,
    from: NvmAccount,
    erc20TokenAddress?: string,
    txParams?: txParams,
  ) {
    try {
      const { escrowPaymentCondition } = this.nevermined.keeper.conditions

      let token

      if (!erc20TokenAddress) {
        token = this.nevermined.keeper.token
      } else if (erc20TokenAddress.toLowerCase() !== ZeroAddress) {
        token = await CustomToken.getInstanceByAddress(
          {
            nevermined: this.nevermined,
            client: this.client,
          },
          erc20TokenAddress,
        )
      }

      const storedAgreement = await this.nevermined.keeper.agreementStoreManager.getAgreement(
        agreementId,
      )
      storedAgreement.conditionIds
      const txReceipt = await escrowPaymentCondition.fulfill(
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
      return this.isFulfilled(txReceipt, ConditionsApi.ESCROW_EVENT_FULFILLED_ABI)
    } catch (e) {
      throw new KeeperError(e)
    }
  }

  /**
   * Releases the payment in escrow to the provider(s) of the sale
   * @param agreementId - The service agreement id for the nft sale.
   * @param ddo - The decentralized identifier of the asset containing the nfts.
   * @param serviceReference - The index or reference of the service containing the nfts to transfer
   * @param nftAmount - Number of nfts bought.
   * @param from - The account sending the transaction.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the funds were released successfully.
   */
  public async releaseNftReward(
    agreementId: string,
    ddo: DDO,
    serviceReference: number | ServiceType = 'nft-sales',
    nftAmount: bigint,
    from: NvmAccount,
    txParams?: txParams,
  ) {
    const template = this.nevermined.keeper.templates.nftSalesTemplate
    const { accessConsumer } = await template.getAgreementData(agreementId)
    const { agreementIdSeed, creator } =
      await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
    const service = ddo.findServiceByReference(serviceReference)

    const instance = await template.instanceFromDDO(
      agreementIdSeed,
      ddo,
      creator,
      template.params(accessConsumer, nftAmount),
      service.index,
    )

    const { escrowPaymentCondition } = this.nevermined.keeper.conditions
    const txReceipt = await escrowPaymentCondition.fulfillInstance(
      instance.instances[2] as any,
      {},
      from,
      txParams,
    )

    const isFulfilled = this.isFulfilled(txReceipt, ConditionsApi.ESCROW_EVENT_FULFILLED_ABI)
    if (!isFulfilled) {
      this.logger.error('Failed to fulfill escrowPaymentCondition', txReceipt)
    }

    return isFulfilled
  }

  /**
   * Releases the payment in escrow to the provider(s) of the sale
   * @param agreementId - The service agreement id for the nft sale.
   * @param ddo - The decentralized identifier of the asset containing the nfts.
   * @param serviceReference - The index or reference of the service containing the nfts to transfer
   * @param from - The publisher account.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the funds were released successfully.
   */
  public async releaseNft721Reward(
    agreementId: string,
    ddo: DDO,
    serviceReference: number | ServiceType = 'nft-sales',
    from: NvmAccount,
    txParams?: txParams,
  ) {
    const serviceIndex = ddo.findServiceByReference(serviceReference).index

    const template = this.nevermined.keeper.templates.nft721SalesTemplate
    const { accessConsumer } = await template.getAgreementData(agreementId)
    const { agreementIdSeed, creator } =
      await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
    const instance = await template.instanceFromDDO(
      agreementIdSeed,
      ddo,
      creator,
      template.params(accessConsumer),
      serviceIndex,
    )

    const { escrowPaymentCondition } = this.nevermined.keeper.conditions
    const txReceipt = await escrowPaymentCondition.fulfillInstance(
      instance.instances[2] as any,
      {},
      from,
      txParams,
    )

    const isFulfilled = this.isFulfilled(txReceipt, ConditionsApi.ESCROW_EVENT_FULFILLED_ABI)
    if (!isFulfilled) {
      this.logger.error('Failed to fulfill escrowPaymentCondition', txReceipt)
    }

    return isFulfilled
  }

  /**
   * Allows an nft holder to prove ownership of a certain number of nfts.
   * Used as an access condition to the underlying files.
   *
   * @param agreementId - The service agreement id of the nft transfer.
   * @param did - The decentralized identifier of the asset containing the nfts.
   * @param holder - The address of the holder (recipient of a previous nft transfer with `agreementId`).
   * @param nftAmount - The amount of nfts that the `holder` needs to have to fulfill the access condition.
   * @param contractAddress - The address of the nft contract.
   * @param from - The account sending the transaction.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the holder is able to fulfill the condition
   */
  public async holderNft(
    agreementId: string,
    did: string,
    holder: string,
    nftAmount: bigint,
    contractAddress: string,
    from: NvmAccount,
    txParams?: txParams,
  ) {
    const { nftHolderCondition } = this.nevermined.keeper.conditions

    const txReceipt = await nftHolderCondition.fulfill(
      agreementId,
      did,
      holder,
      nftAmount,
      contractAddress || this.nevermined.keeper.nftUpgradeable.address,
      from,
      txParams,
    )
    return this.isFulfilled(txReceipt, ConditionsApi.NFT_HOLDER_EVENT_FULFILLED_ABI)
  }

  /**
   * Allows an nft holder to prove ownership of a certain number of nfts.
   * Used as an access condition to the underlying files.
   *
   * @param agreementId - The service agreement id of the nft transfer.
   * @param ddo - The decentralized identifier of the asset containing the nfts.
   * @param holderAddress - The address of the holder (recipient of a previous nft transfer with `agreementId`).
   * @param from - The account sending the transaction.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the holder is able to fulfill the condition
   */
  public async holderNft721(
    agreementId: string,
    ddo: DDO,
    holderAddress: string,
    from: NvmAccount,
    txParams?: txParams,
  ) {
    const { nft721HolderCondition } = this.nevermined.keeper.conditions
    const accessService = ddo.findServiceByType('nft-access')

    const holder = DDO.findServiceConditionByName(accessService, 'nftHolder')

    const txReceipt = await nft721HolderCondition.fulfill(
      agreementId,
      ddo.shortId(),
      holderAddress,
      holder.parameters.find((p) => p.name === '_contractAddress')?.value as string,
      from,
      txParams,
    )

    return this.isFulfilled(txReceipt, ConditionsApi.NFT_HOLDER_EVENT_FULFILLED_ABI)
  }

  /**
   * Fulfills the access condition required to give access to the underlying files of an nft.
   *
   * @param agreementId - The service agreement id of the nft transfer.
   * @param did - The decentralized identifier of the asset containing the nfts.
   * @param grantee - The address of the user trying to get access to the files.
   * @param from - The account sending the transaction.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the provider is able to fulfill the condition
   */
  public async grantNftAccess(
    agreementId: string,
    did: string,
    grantee: string,
    from: NvmAccount,
    txParams?: txParams,
  ) {
    const { nftAccessCondition } = this.nevermined.keeper.conditions

    const txReceipt = await nftAccessCondition.fulfill(agreementId, did, grantee, from, txParams)
    return this.isFulfilled(txReceipt, ConditionsApi.GENERIC_EVENT_FULFILLED_ABI)
  }

  /**
   * Transfers a certain amount of nfts after payment as been made.
   * @param agreementId - The service agreement id of the nft transfer.
   * @param ddo - The decentralized identifier of the asset containing the nfts.
   * @param serviceIndex - The index of the service containing the nfts to transfer
   * @param nftAmount - The amount of nfts to transfer.
   * @param from - The account sending the transaction.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the transfer is successful
   */
  public async transferNft(
    agreementId: string,
    ddo: DDO,
    serviceIndex: number,
    nftAmount: bigint,
    from: NvmAccount,
    txParams?: txParams,
  ) {
    const { transferNftCondition } = this.nevermined.keeper.conditions
    const template = this.nevermined.keeper.templates.nftSalesTemplate

    const { accessConsumer } = await template.getAgreementData(agreementId)
    const { agreementIdSeed, creator } =
      await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
    const service = ddo.findServiceByIndex(serviceIndex)

    const nftTranfer = DDO.getNFTTransferFromService(service)
    const duration = DDO.getDurationFromService(service)
    const expirationBlock =
      duration > 0 ? Number(await this.client.public.getBlockNumber()) + duration : 0

    const params = template.params(
      accessConsumer,
      nftAmount,
      duration,
      expirationBlock,
      undefined,
      nftTranfer,
    )

    const instance = await template.instanceFromDDO(
      agreementIdSeed,
      ddo,
      creator,
      params,
      serviceIndex,
    )

    const txReceipt = await transferNftCondition.fulfillInstance(
      instance.instances[1] as any,
      {},
      from,
      txParams,
    )

    return this.isFulfilled(txReceipt, ConditionsApi.TRANSFER_NFT_EVENT_FULFILLED_ABI)
  }

  /**
   * Transfers a certain amount of nfts after payment as been made.
   * @param agreementId - The service agreement id of the nft transfer.
   * @param ddo - The decentralized identifier of the asset containing the nfts.
   * @param nftAmount - The amount of nfts to transfer.
   * @param from - The account sending the transaction.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the transfer is successful
   */
  public async transferNftForDelegate(
    agreementId: string,
    ddo: DDO,
    serviceReference: number | ServiceType = 'nft-sales',
    nftAmount: bigint,
    from: NvmAccount,
    txParams?: txParams,
  ) {
    const { transferNftCondition } = this.nevermined.keeper.conditions
    const template = this.nevermined.keeper.templates.nftSalesTemplate

    const { accessConsumer } = await template.getAgreementData(agreementId)
    const { agreementIdSeed, creator } =
      await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
    const service = ddo.findServiceByReference(serviceReference)

    const nftTranfer = DDO.getNFTTransferFromService(service)
    const nftAddress = DDO.getNftContractAddressFromService(service as ServiceNFTSales)
    const duration = DDO.getDurationFromService(service) || 0
    const expirationBlock =
      duration > 0 ? Number(await this.client.public.getBlockNumber()) + duration : 0

    const params = template.params(
      accessConsumer,
      nftAmount,
      duration,
      expirationBlock,
      undefined,
      nftTranfer,
    )

    const instance = await template.instanceFromDDO(
      agreementIdSeed,
      ddo,
      creator,
      params,
      service.index,
    )
    const [did, nftHolder, nftReceiver, _nftAmount, lockPaymentCondition, , transferAsset] =
      instance.instances[1].list
    const txReceipt = await transferNftCondition.fulfillForDelegate(
      agreementId,
      did,
      nftHolder,
      nftReceiver,
      _nftAmount,
      lockPaymentCondition,
      nftAddress,
      transferAsset,
      BigInt(expirationBlock),
      from,
      txParams,
    )

    return this.isFulfilled(txReceipt, ConditionsApi.TRANSFER_NFT_EVENT_FULFILLED_ABI)
  }

  /**
   * Transfers a certain amount of nfts after payment as been made.
   * @param agreementId - The service agreement id of the nft transfer.
   * @param ddo - The decentralized identifier of the asset containing the nfts.
   * @param serviceIndex - The index of the service containing the nfts to transfer
   * @param from - The account sending the transaction.
   * @param txParams - Transaction parameters
   * @returns {@link true} if the transfer is successful
   */
  public async transferNft721(
    agreementId: string,
    ddo: DDO,
    serviceIndex: number,
    from: NvmAccount,
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
      serviceIndex,
    )

    const nft = await this.nevermined.contracts.loadNft721(instance.instances[1].list[5])

    await nft.setApprovalForAll(transferNft721Condition.address, true, from, txParams)

    const txReceipt = await transferNft721Condition.fulfillInstance(
      instance.instances[1] as any,
      {},
      from,
      txParams,
    )

    await nft.setApprovalForAll(transferNft721Condition.address, false, from, txParams)

    return this.isFulfilled(txReceipt, ConditionsApi.TRANSFER_NFT_EVENT_FULFILLED_ABI)
  }

  /**
   * Checks in the transaction receipt if the event Fulfilled was emitted.q
   * @param txReceipt - the transaction receipt
   * @param eventAbi - the contract ABI
   * @returns true if the Fulfilled event was emitted
   */
  private isFulfilled(txReceipt: TransactionReceipt, eventAbi: Abi): boolean {
    const eventLogs = parseEventLogs({
      abi: eventAbi,
      logs: txReceipt.logs,
      eventName: 'Fulfilled',
      strict: false,
    })
    return eventLogs.length > 0
  }
}
