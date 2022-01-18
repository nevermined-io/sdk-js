import { LogLevel } from '../utils/Logger'
export { LogLevel } from '../utils/Logger'

export class Config {
    /**
     * Metadata URL.
     * @type {string}
     */
    public metadataUri: string

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
}

export default Config
