import { LogLevel } from '../utils/Logger'
import BigNumber from "bignumber.js";
export { LogLevel } from '../utils/Logger'

export class AaveConfig {
    lendingPoolAddress: string
    dataProviderAddress: string
    wethAddress: string
    treasuryAddress: string
    agreementFee: BigNumber
}

export default AaveConfig
