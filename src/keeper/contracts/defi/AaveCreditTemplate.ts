import { AgreementInstance, AgreementTemplate } from '../templates'
import { BaseTemplate } from '../templates'
import { DDO } from '../../../ddo'
import { didZeroX, parseEther } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import { Account } from '../../../nevermined'
import { AaveConfig } from '../../../models'
import { TxParameters } from '../ContractBase'
import { aaveCreditTemplateServiceAgreementTemplate } from './AaveCreditTemplate.serviceAgreementTemplate'
import { ServiceType, ValidationParams } from '../../../ddo'
import { ContractTransactionReceipt, EventLog } from 'ethers'
import {
  AaveBorrowCondition,
  AaveCollateralDepositCondition,
  AaveCollateralWithdrawCondition,
  AaveRepayCondition,
  DistributeNFTCollateralCondition,
  NFT721LockCondition,
} from '../conditions'
import { ServiceAaveCredit } from './Service'

export interface AaveCreditTemplateParams {
  vaultAddress: string
  assetToBorrow: string
  amountToBorrow: string
  interestRateMode: number
  collateralAsset: string
  collateralAmount: string
  delegatedAsset: string
  delegatedAmount: string
  assetToRepay: string
  amountToRepay: string
  nftContractAddress: string
  lockAddress: string
  nftAmount: number
}

export class AaveCreditTemplate extends BaseTemplate<AaveCreditTemplateParams, ServiceAaveCredit> {
  public async paramsGen(_params: ValidationParams): Promise<AaveCreditTemplateParams> {
    throw new Error('Method not implemented.')
  }
  public name(): string {
    return 'aaveCreditAgreement'
  }
  public description(): string {
    return 'Aave credit agreement'
  }
  aaveConfig: AaveConfig

  public static async getInstance(config: InstantiableConfig): Promise<AaveCreditTemplate> {
    const templateInst = await AgreementTemplate.getInstance(
      config,
      'AaveCreditTemplate',
      AaveCreditTemplate,
      true,
    )
    templateInst.aaveConfig = config.config.aaveConfig
    return templateInst
  }

  public service(): ServiceType {
    return 'aave-credit'
  }

  public params(
    vaultAddress: string,
    nftContractAddress: string,
    nftAmount: number,
    collateralAsset: string,
    collateralAmount: string,
    delegatedAsset: string,
    delegatedAmount: string,
    interestRateMode: number,
  ): AaveCreditTemplateParams {
    return {
      vaultAddress,
      assetToBorrow: delegatedAsset,
      amountToBorrow: delegatedAmount,
      interestRateMode,
      collateralAsset,
      collateralAmount,
      delegatedAsset,
      delegatedAmount,
      assetToRepay: delegatedAsset,
      amountToRepay: delegatedAmount,
      nftContractAddress,
      lockAddress: vaultAddress,
      nftAmount,
    }
  }

  public async getServiceAgreementTemplate() {
    return aaveCreditTemplateServiceAgreementTemplate
  }

  private async _createAgreement(
    agreementIdSeed: string,
    ddo: DDO,
    vaultAddress: string,
    nftTokenContract: string,
    nftAmount: number,
    collateralToken: string,
    collateralAmount: number,
    delegatedToken: string,
    delegatedAmount: number,
    interestRateMode: number,
    timeLocks: number[],
    timeOuts: number[],
    txParams?: TxParameters,
    from?: Account,
  ): Promise<[ContractTransactionReceipt, AgreementInstance<AaveCreditTemplateParams>]> {
    const _collateralAmount = parseEther(collateralAmount.toString())

    const _delegatedAmount = parseEther(delegatedAmount.toString())

    const data = await this.instanceFromDDO(
      agreementIdSeed,
      ddo,
      from.getId(),
      this.params(
        vaultAddress,
        nftTokenContract,
        nftAmount,
        collateralToken,
        _collateralAmount.toString(),
        delegatedToken,
        _delegatedAmount.toString(),
        interestRateMode,
      ),
    )

    const txAgreement = await this.send(
      'createVaultAgreement',
      from.getId(),
      [
        agreementIdSeed,
        didZeroX(ddo.shortId()),
        data.instances.map((a) => a.seed),
        timeLocks,
        timeOuts,
        vaultAddress,
      ],
      txParams,
    )

    return [txAgreement, data]
  }

  public async createAgreementAndDeployVault(
    agreementIdSeed: string,
    ddo: DDO,
    nftTokenContract: string,
    nftAmount: number,
    collateralToken: string,
    collateralAmount: number,
    delegatedToken: string,
    delegatedAmount: number,
    interestRateMode: number,
    borrower: string,
    lender: string,
    timeLocks: number[],
    timeOuts: number[],
    txParams?: TxParameters,
    from?: Account,
  ): Promise<[ContractTransactionReceipt, string, AgreementInstance<AaveCreditTemplateParams>]> {
    const vaultAddress = await this.deployVault(
      this.aaveConfig.lendingPoolAddress,
      this.aaveConfig.dataProviderAddress,
      this.aaveConfig.wethAddress,
      this.aaveConfig.agreementFee,
      this.aaveConfig.treasuryAddress,
      borrower,
      lender,
      from.getId(),
    )

    const [txAgreement, data] = await this._createAgreement(
      agreementIdSeed,
      ddo,
      vaultAddress,
      nftTokenContract,
      nftAmount,
      collateralToken,
      collateralAmount,
      delegatedToken,
      delegatedAmount,
      interestRateMode,
      timeLocks,
      timeOuts,
      txParams,
      from,
    )
    return [txAgreement, vaultAddress, data]
  }

  /**
   * Deploy a new credit vault that is required to facilitate an Aave credit agreement
   *
   * @returns Agreement ID.
   */
  public async deployVault(
    lendingPool: string,
    dataProvider: string,
    weth: string,
    agreementFee: number,
    treasuryAddress: string,
    borrower: string,
    lender: string,
    from: string,
  ): Promise<string> {
    const contractReceipt: ContractTransactionReceipt = await this.send('deployVault', from, [
      lendingPool,
      dataProvider,
      weth,
      agreementFee,
      treasuryAddress,
      borrower,
      lender,
    ])
    const vaultCreatedEvent = contractReceipt.logs.find(
      (e: EventLog) => e.eventName === 'VaultCreated',
    ) as EventLog
    const { _vaultAddress } = vaultCreatedEvent.args
    return _vaultAddress
  }

  public async instanceFromDDO(
    agreementIdSeed: string,
    ddo: DDO,
    creator: string,
    parameters: AaveCreditTemplateParams,
  ): Promise<AgreementInstance<AaveCreditTemplateParams>> {
    const {
      nft721LockCondition,
      aaveCollateralDepositCondition,
      aaveBorrowCondition,
      aaveRepayCondition,
      aaveCollateralWithdrawCondition,
      distributeNftCollateralCondition,
    } = this.nevermined.keeper.conditions

    const agreementId = await this.agreementId(agreementIdSeed, creator)
    const ctx = {
      ...this.standardContext(ddo, creator),
      ...parameters,
    }

    const lockNftInstance = await nft721LockCondition.instanceFromDDO(agreementId, ctx)
    const depositCollateralInstance = await aaveCollateralDepositCondition.instanceFromDDO(
      agreementId,
      ctx,
    )
    const borrowInstance = await aaveBorrowCondition.instanceFromDDO(agreementId, ctx)
    const repayInstance = await aaveRepayCondition.instanceFromDDO(agreementId, ctx)
    const withdrawInstance = await aaveCollateralWithdrawCondition.instanceFromDDO(agreementId, ctx)
    const distributeInstance = await distributeNftCollateralCondition.instanceFromDDO(
      agreementId,
      ctx,
    )

    return {
      instances: [
        lockNftInstance,
        depositCollateralInstance,
        borrowInstance,
        repayInstance,
        withdrawInstance,
        distributeInstance,
      ],
      list: parameters,
      agreementId,
    }
  }

  public conditions(): [
    NFT721LockCondition,
    AaveCollateralDepositCondition,
    AaveBorrowCondition,
    AaveRepayCondition,
    AaveCollateralWithdrawCondition,
    DistributeNFTCollateralCondition,
  ] {
    const {
      nft721LockCondition,
      aaveCollateralDepositCondition,
      aaveBorrowCondition,
      aaveRepayCondition,
      aaveCollateralWithdrawCondition,
      distributeNftCollateralCondition,
    } = this.nevermined.keeper.conditions
    return [
      nft721LockCondition,
      aaveCollateralDepositCondition,
      aaveBorrowCondition,
      aaveRepayCondition,
      aaveCollateralWithdrawCondition,
      distributeNftCollateralCondition,
    ]
  }

  public async getAgreementVaultAddress(agreementId: string, from: string): Promise<string> {
    return this.call('getVaultForAgreement', [agreementId], from)
  }

  public async getAgreementDid(agreementId: string): Promise<string> {
    const { did } = await this.nevermined.keeper.agreementStoreManager.getAgreement(agreementId)
    return did
  }
}
