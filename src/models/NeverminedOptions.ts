import { ethers } from 'ethers'
import { ZeroAddress } from '../utils/ConversionTypeHelpers'
import { LogLevel } from '../utils/Logger'
import { AaveConfig } from './AaveConfig'
export { LogLevel } from '../utils/Logger'

export class NeverminedOptions {

    /**
     * Ethereum Web3 Provider URL. This Url allows the SDK to connect to a blockchain.
     * This provider depends on the network where you want to connect (Ethereum Mainnet, Rinkeby, Polygon Matic, etc).
     * It's possible to use a public available provider or a private/paid one like Infura, Alchemy, etc.
     */
    public web3ProviderUri?: string
    /**
     * URL to the MarketPlace API use to record some Nevermined assets metadata. In a Nevermined network there could be
     * multiple Marketplace API instances. Each of them typically records the metadata of a specific domain/vertical deployed on a Nevermined network.
     * @see https://docs.nevermined.io/docs/architecture/marketplace-api/
     */
    public marketplaceUri: string

    /**
     * URL to an existing Nevermined Node. A Nevermined network can have multiple running Nodes.
     * Each of them facilitate the access control and the data and inftrastructure interaction with web2 elements.
     * @see https://docs.nevermined.io/docs/architecture/node/
     */
    public neverminedNodeUri: string

    /**
     * The public address of the Nevermined Node.
     * @see {@link neverminedNodeUri}
     */
     public neverminedNodeAddress?: string

    /**
     * Marketplace auth token.
     */
    public marketplaceAuthToken?: string

    /**
     * The URL to a Faucet in a test network.
     */
    public faucetUri?: string

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

    /**
     * IPFS variables enable the resolution of DDOs (via `assets.resolve`) from CID urls
     * INFO: For performance purposes, it is recommended to setup a IPFS Infura endpoint to accelerate
     * the asset resolution requests.
     */
    public ipfsGateway?: string = 'https://ipfs.io'

    public ipfsProjectId?: string

    public ipfsProjectSecret?: string

    /**
     * The fee charged by Nevermined for using the Service Agreements
     */
    public networkFee?: number = 0

    /**
     * The address receiving the fee if this is higher than 0
     */
    public feeReceiver?: string = ZeroAddress
}

export default NeverminedOptions
