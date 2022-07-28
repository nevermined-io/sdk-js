import ContractBase, { TxParameters } from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'
import { ethers } from 'ethers'
import BigNumber from '../../utils/BigNumber'

export default class Dispenser extends ContractBase {
    public static async getInstance(config: InstantiableConfig): Promise<Dispenser> {
        const dispenser: Dispenser = new Dispenser('Dispenser')
        await dispenser.init(config, true)
        return dispenser
    }

    public async requestTokens(
        amount: number | string | BigNumber,
        receiverAddress: string,
        params?: TxParameters
    ) {
        return this.send(
            'requestTokens',
            receiverAddress,
            [ethers.utils.parseUnits(amount.toString(), 0)],
            params
        )
    }
}
