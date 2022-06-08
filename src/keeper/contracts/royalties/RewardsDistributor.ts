import ContractBase, { TxParameters } from '../ContractBase'
import { InstantiableConfig } from '../../../Instantiable.abstract'
import Account from '../../../nevermined/Account'
import { zeroX } from '../../../utils'

export default class RewardsDistributor extends ContractBase {
    public static async getInstance(config: InstantiableConfig): Promise<RewardsDistributor> {
        const token: RewardsDistributor = new RewardsDistributor('RewardsDistributor')
        await token.init(config, true)
        return token
    }
    public setReceivers(did: string, addr: string[], from?: Account, params?: TxParameters) {
        return this.sendFrom('setReceivers', [zeroX(did), addr], from, params)
    }
}
