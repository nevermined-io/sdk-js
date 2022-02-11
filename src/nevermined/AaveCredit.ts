import { TransactionReceipt } from 'web3-core'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import Account from './Account'
import GenericContract from '../keeper/contracts/GenericContract'
import { TxParameters } from '../keeper/contracts/ContractBase'
import AaveConfig from "../models/AaveConfig";
import {DDO} from "..";
import BigNumber from "bignumber.js";
import {AaveCreditTemplate} from "../keeper/contracts/defi/AaveCreditTemplate";
import {generateId, getAssetRewardsFromService, zeroX} from "../utils";

export class AaveCredit extends Instantiable {
    template: AaveCreditTemplate
    vaultContract: GenericContract
    aaveConfig: AaveConfig
    serviceType: 'aave-credit'

    public static async getInstance(
        config: InstantiableConfig
    ): Promise<AaveCredit> {
        const aaveCredit = new AaveCredit()
        aaveCredit.setInstanceConfig(config)

        aaveCredit.template = await AaveCreditTemplate.getInstance(config)
        // aaveCredit.vaultContract = await GenericContract.getInstance(config, 'AaveCreditVault')
        aaveCredit.aaveConfig = config.config.aaveConfig

        return aaveCredit
    }

    /**
     * Create new Aave agreement where a borrower puts an NFT asset as collateral
     * and the lender uses their own Token as collateral to allow the borrower to
     * use Aave protocol to borrow some other token (the `delegatedToken`). All of
     * this is facilitated via the credit vault contract and the agreement conditions.
     * All interactions with the Aave protocol have to go through the credit vault.
     *
     * @param {String} did: id of DDO/asset that represent the `nftToken`
     * @param {String} nftToken: nft token Id of token to use as collateral by the borrower
     * @param {Number} nftAmount: the nubmer of nft tokens
     * @param {String} collateralToken:  erc20 token address to use as loan-collateral by the
     *                 lender to enable the borrower to take loan
     * @param {Number} collateralAmount: amount of `collateralToken` to lock in the vault
     * @param {String} delegatedToken: address of erc20 token to be borrowed under this agreement
     * @param {Number} delegatedAmount: amount of `delegatedToken` that well be borrowed
     * @param {Number} interestRateMode: the type of interest rate to use when borrowing from Aave
     * @param {String} borrower: wallet address of borrower
     * @param {String} lender: wallet address of lender
     * @param {Account} from: account/wallet of borrower or lender creating this agreement
     * @param {Number[]} timeLocks: (optional) list of time lock values for each agreement condition
     * @param {Number[]} timeOuts: (optional) list of time out values for each agreement condition
     * @param {TxParameters} txParams: (optional) extra transaction parameters can be included here
     * @returns
     */
    public async create(
        did: string,
        nftToken: string,
        nftAmount: number,
        collateralToken: string,
        collateralAmount: number,
        delegatedToken: string,
        delegatedAmount: number,
        interestRateMode: number,
        borrower: string,
        lender: string,
        from: Account,
        timeLocks?: number[],
        timeOuts?: number[],
        txParams?: TxParameters,
        ) {
        // const { agreements } = this.nevermined
        // const { keeper } = this.nevermined
        const agreementId = zeroX(generateId())
        const ddo = await this.nevermined.assets.resolve(did)
        // const service = ddo.findServiceByType(this.serviceType)
        // const templateName = service.attributes.serviceAgreementTemplate.contractName
        // const template = keeper.getTemplateByName(templateName)
        const [txReceipt, vaultAddress] = await this.template.createAgreementAndDeployVault(
            agreementId, ddo, nftToken, nftAmount, collateralToken, collateralAmount, delegatedToken, delegatedAmount,
            interestRateMode, borrower, lender, timeLocks, timeOuts, txParams, from
        )
        this.logger.log(
            `new Aave credit vault is deployed and a service agreement is created:
             status=${txReceipt.status}, vaultAddress=${vaultAddress}, agreementId=${agreementId}`
        )
    }
}
