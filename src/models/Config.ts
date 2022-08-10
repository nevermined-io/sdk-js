import { ethers } from 'ethers'
import { LogLevel } from '../utils/Logger'
import { AaveConfig } from './AaveConfig'
export { LogLevel } from '../utils/Logger'

export class Config {
    /**
     * MarketPlace URL.
     * @type {string}
     */
    public marketplaceUri: string

    /**
     * Marketplace auth token.
     * @type {string}
     */
    public marketplaceAuthToken: string

    /**
     * Gateway URL.
     * @type {string}
     */
    public gatewayUri: string

    /**
     * Faucet URL.
     * @type {string}
     */
    public faucetUri: string

    /**
     * Address of Gateway.
     * @type {string}
     */
    public gatewayAddress?: string

    /**
     * Ethereum node URL.
     * @type {string}
     */
    public nodeUri?: string

    /**
     * Web3 Provider.
     * @type {any}
     */
    public web3Provider?: any

    /**
     * Secret Store URL.
     * @type {string}
     */
    public secretStoreUri?: string

    /**
     * Log level.
     * @type {boolean | LogLevel}
     */
    public verbose?: boolean | LogLevel

    /**
     * Message shown when the user creates its own token.
     * @type {string}
     */
    public authMessage?: string

    /**
     * Token expiration time in ms.
     * @type {number}
     */
    public authTokenExpiration?: number

    public threshold?: number

    public gasMultiplier?: number

    /**
     * Enpoint for the graph-node http query
     */
    public graphHttpUri?: string

    public aaveConfig?: AaveConfig

    public artifactsFolder?: string

    public accounts?: ethers.Signer[]
}

export default Config
