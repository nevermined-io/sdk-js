import ContractBase from './ContractBase'
import { InstantiableConfig } from '../../Instantiable.abstract'

export default class Dispenser extends ContractBase {
    public static async getInstance(config: InstantiableConfig): Promise<Dispenser> {
        const dispenser: Dispenser = new Dispenser('Dispenser', true)
        await dispenser.init(config)
        return dispenser
    }

    public async requestTokens(amount: number | string, receiverAddress: string) {
        return this.send('requestTokens', receiverAddress, [String(amount)])
    }
}
