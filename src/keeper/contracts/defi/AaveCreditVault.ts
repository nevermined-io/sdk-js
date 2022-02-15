import ContractBase, { TxParameters } from '../ContractBase'
import { InstantiableConfig } from '../../../Instantiable.abstract'

export default class AaveCreditVault extends ContractBase {
    public static async getInstance(config: InstantiableConfig): Promise<AaveCreditVault> {
        const aaveCreditVault: AaveCreditVault = new AaveCreditVault('AaveCreditVault', true)
        await aaveCreditVault.init(config)
        return aaveCreditVault
    }

    public async (
        amount: number | string,
        receiverAddress: string,
        params?: TxParameters
    ) {
        return this.send('requestTokens', receiverAddress, [String(amount)], params)
    }


        // address _lendingPool,
        // address _dataProvider,
        // address _weth,
        // uint256 _agreementFee,
        // address _treasuryAddress,
        // address _borrower,
        // address _lender

}
