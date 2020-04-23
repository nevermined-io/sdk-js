import { LogLevel } from '../utils/Logger'
export { LogLevel } from '../utils/Logger'

export class Config {
    /**
     * Aquarius URL.
     * @type {string}
     */
    public aquariusUri: string

    /**
     * Brizo URL.
     * @type {string}
     */
    public brizoUri: string

    /**
     * Address of Brizo.
     * @type {string}
     */
    public brizoAddress?: string

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
    public secretStoreUri: string

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

    // Parity config
    public parityUri?: string

    public threshold?: number
}

export default Config
