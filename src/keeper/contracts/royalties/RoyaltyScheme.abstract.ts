import ContractBase, { TxParameters } from '../ContractBase'
import { zeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'

export abstract class RoyaltyScheme extends ContractBase {
    public static async getInstance(
        config: InstantiableConfig,
        conditionName: string,
        conditionsClass: any,
        optional: boolean = true
    ): Promise<RoyaltyScheme & any> {
        try {
            const condition: RoyaltyScheme = new (conditionsClass as any)(conditionName)
            await condition.init(config, optional)
            return condition
        } catch (e) {
            
        }
    }

    public setRoyalty(did: string, amount: number, from?: Account, params?: TxParameters) {
        return this.sendFrom('setRoyalty', [zeroX(did), amount], from, params)
    }

}
