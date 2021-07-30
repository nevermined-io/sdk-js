import { AgreementTemplate } from './AgreementTemplate.abstract'
import { zeroX } from '../../../utils'
import Account from '../../../nevermined/Account'

export abstract class BaseTemplate extends AgreementTemplate {
    /**
     * Create a agreement using EscrowComputeExecutionTemplate.
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
        from?: Account
    ) {
        return super.createAgreement(
            agreementId,
            did,
            conditionIds,
            timeLocks,
            timeOuts,
            [accessConsumer],
            from
        )
    }

    public async getAgreementData(agreementId: string) {
        return this.call<any>('getAgreementData', [zeroX(agreementId)])
    }
}
