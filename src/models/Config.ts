import { ethers } from 'ethers'
import { ZeroAddress } from '../utils'
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
    public marketplaceAuthToken?: string

    /**
     * Node URL.
     */
    public neverminedNodeUri: string

    /**
     * Faucet URL.
     */
    public faucetUri?: string

    /**
     * Address of the Node.
     */
    public neverminedNodeAddress?: string

    /**
     * Ethereum Web3 Provider URL (Infura, Alchemy, etc)
     */
    public web3ProviderUri?: string

    /**
     * Web3 Provider.
     */
    public web3Provider?: any

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

    public newGateway?: boolean = true

    /**
     * The fee charged by Nevermined for using the Service Agreements
     */
    public networkFee?: number = 0

    /**
     * The address receiving the fee if this is higher than 0
     */
    public feeReceiver?: string = ZeroAddress

    public signatureMessage?: {
        GenerateClientAssertion: (walletAddress: string) => string
    }
}

export default Config
