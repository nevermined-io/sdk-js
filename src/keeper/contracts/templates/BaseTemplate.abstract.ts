import { AgreementTemplate } from './AgreementTemplate.abstract'
import { zeroX } from '../../../utils'
import Account from '../../../nevermined/Account'
import { TxParameters } from '../ContractBase'

export abstract class BaseTemplate extends AgreementTemplate {
    /**
     * Create a agreement using BaseEscrowTemplate.
     * @param {string}   agreementId    Generated agreement ID.
     * @param {string}   did            Asset DID.
     * @param {string[]} conditionIds   List of conditions IDs.
     * @param {number[]} timeLocks      Timelocks.
     * @param {number[]} timeOuts       Timeouts.
     * @param {string}   accessConsumer Consumer address.
     * @param {string}   from           Action sender.
     * @param {any}                     Transaction receipt.
     */
    public createAgreement(
        agreementId: string,
        did: string,
        conditionIds: string[],
        timeLocks: number[],
        timeOuts: number[],
        accessConsumer: string,
        from?: Account,
        txParams?: TxParameters
    ) {
        return super.createAgreement(
            agreementId,
            did,
            conditionIds,
            timeLocks,
            timeOuts,
            [accessConsumer],
            from,
            txParams
        )
    }

    public createAgreementAndPay(
        agreementId: string,
        did: string,
        conditionIds: string[],
        timeLocks: number[],
        timeOuts: number[],
        accessConsumer: string,
        condIdx: number,
        rewardAddress: string,
        tokenAddress: string,
        amounts: number[],
        receivers: string[],
        from?: Account,
        params?: TxParameters
    ) {
        return this.sendFrom(
            'createAgreementAndPayEscrow',
            [
                zeroX(agreementId),
                zeroX(did),
                conditionIds.map(zeroX),
                timeLocks,
                timeOuts,
                accessConsumer,
                condIdx,
                rewardAddress,
                tokenAddress,
                amounts.map(a => a.toString(10)),
                receivers
            ],
            from,
            params
        )
    }

    public async getAgreementData(
        agreementId: string
    ): Promise<{ accessProvider: string; accessConsumer: string }> {
        return this.call<any>('getAgreementData', [zeroX(agreementId)])
    }
}
