import { ethers } from 'ethers'
import { LogLevel } from '../utils/Logger'
import { AaveConfig } from './AaveConfig'
export { LogLevel } from '../utils/Logger'

export class Config {
    /**
     * MarketPlace URL.
     */
    public marketplaceUri: string

    /**
     * Marketplace auth token.
     */
    public marketplaceAuthToken: string

    /**
     * Gateway URL.
     */
    public gatewayUri: string

    /**
     * Faucet URL.
     */
    public faucetUri?: string

    /**
     * Address of Gateway.
     */
    public gatewayAddress?: string

    /**
     * Ethereum node URL.
     */
    public nodeUri?: string

    /**
     * Web3 Provider.
     */
    public web3Provider?: any

    /**
     * Secret Store URL.
     */
    public secretStoreUri?: string

    /**
     * Log level.
     */
    public verbose?: boolean | LogLevel

    /**
     * Message shown when the user creates its own token.
     */
    public authMessage?: string

    /**
     * Token expiration time in ms.
     */
    public authTokenExpiration?: number

    public threshold?: number

    /**
     * Gas multiplier for the fees.
     * Can be used to speed up the transactions.
     */
    public gasMultiplier?: number

    /**
     * Enpoint for the graph-node http query
     */
    public graphHttpUri?: string

    public aaveConfig?: AaveConfig

    /**
     * The folder where the nevermined contract artifacts are located.
     */
    public artifactsFolder?: string

    public accounts?: ethers.Signer[]

    public newGateway?: boolean
}

export default Config
