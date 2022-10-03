import ContractBase, { TxParameters } from '../ContractBase'
import { didZeroX } from '../../../utils'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'

export abstract class RoyaltyScheme extends ContractBase {
    public static async getInstance(
        config: InstantiableConfig,
        schemeName: string,
        schemeClass: any,
        optional: boolean = true
    ): Promise<RoyaltyScheme & any> {
        try {
            const scheme: RoyaltyScheme = new (schemeClass as any)(schemeName)
            await scheme.init(config, optional)
            return scheme
        } catch (e) {
            config.logger.debug(`Cannot load optional contract ${schemeName}`)
        }
    }

    public setRoyalty(
        did: string,
        amount: number,
        from?: Account,
        params?: TxParameters
    ) {
        return this.sendFrom('setRoyalty', [didZeroX(did), amount], from, params)
    }

    public async getRoyalty(did: string) {
        return Number(await this.call('royalties', [didZeroX(did)]))
    }
}
