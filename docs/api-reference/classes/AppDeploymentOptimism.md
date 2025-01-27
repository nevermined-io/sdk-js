[@nevermined-io/sdk - v3.0.49](../code-reference.md) / AppDeploymentOptimism

# Class: AppDeploymentOptimism

## Hierarchy

- [`NeverminedAppOptions`](NeverminedAppOptions.md)

  ↳ **`AppDeploymentOptimism`**

## Table of contents

### Constructors

- [constructor](AppDeploymentOptimism.md#constructor)

### Properties

- [accounts](AppDeploymentOptimism.md#accounts)
- [appUrl](AppDeploymentOptimism.md#appurl)
- [artifactsFolder](AppDeploymentOptimism.md#artifactsfolder)
- [chainId](AppDeploymentOptimism.md#chainid)
- [circuitsFolder](AppDeploymentOptimism.md#circuitsfolder)
- [contractsVersion](AppDeploymentOptimism.md#contractsversion)
- [gasMultiplier](AppDeploymentOptimism.md#gasmultiplier)
- [gasPriceMultiplier](AppDeploymentOptimism.md#gaspricemultiplier)
- [gasStationUri](AppDeploymentOptimism.md#gasstationuri)
- [graphHttpUri](AppDeploymentOptimism.md#graphhttpuri)
- [instanceName](AppDeploymentOptimism.md#instancename)
- [ipfsGateway](AppDeploymentOptimism.md#ipfsgateway)
- [ipfsProjectId](AppDeploymentOptimism.md#ipfsprojectid)
- [ipfsProjectSecret](AppDeploymentOptimism.md#ipfsprojectsecret)
- [marketplaceAuthToken](AppDeploymentOptimism.md#marketplaceauthtoken)
- [marketplaceUri](AppDeploymentOptimism.md#marketplaceuri)
- [neverminedBackendUri](AppDeploymentOptimism.md#neverminedbackenduri)
- [neverminedNodeAddress](AppDeploymentOptimism.md#neverminednodeaddress)
- [neverminedNodeUri](AppDeploymentOptimism.md#neverminednodeuri)
- [nftContractCreditsAddress](AppDeploymentOptimism.md#nftcontractcreditsaddress)
- [nftContractTimeAddress](AppDeploymentOptimism.md#nftcontracttimeaddress)
- [tokenAddress](AppDeploymentOptimism.md#tokenaddress)
- [verbose](AppDeploymentOptimism.md#verbose)
- [web3Provider](AppDeploymentOptimism.md#web3provider)
- [web3ProviderUri](AppDeploymentOptimism.md#web3provideruri)
- [zeroDevProjectId](AppDeploymentOptimism.md#zerodevprojectid)

## Constructors

### constructor

• **new AppDeploymentOptimism**(): [`AppDeploymentOptimism`](AppDeploymentOptimism.md)

#### Returns

[`AppDeploymentOptimism`](AppDeploymentOptimism.md)

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[constructor](NeverminedAppOptions.md#constructor)

## Properties

### accounts

• `Optional` **accounts**: [`NvmAccount`](NvmAccount.md)[]

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[accounts](NeverminedAppOptions.md#accounts)

#### Defined in

[src/models/NeverminedOptions.ts:73](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/models/NeverminedOptions.ts#L73)

---

### appUrl

• **appUrl**: `string` = `'https://optimism.nevermined.app'`

The Nevermined App URL.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[appUrl](NeverminedAppOptions.md#appurl)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:155](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L155)

---

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[artifactsFolder](NeverminedAppOptions.md#artifactsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:67](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/models/NeverminedOptions.ts#L67)

---

### chainId

• **chainId**: `number` = `10`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[chainId](NeverminedAppOptions.md#chainid)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:156](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L156)

---

### circuitsFolder

• `Optional` **circuitsFolder**: `string`

The folder where the nevermined contract circuits are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[circuitsFolder](NeverminedAppOptions.md#circuitsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:71](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/models/NeverminedOptions.ts#L71)

---

### contractsVersion

• `Optional` **contractsVersion**: `string`

Contracts version

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[contractsVersion](NeverminedAppOptions.md#contractsversion)

#### Defined in

[src/models/NeverminedOptions.ts:99](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/models/NeverminedOptions.ts#L99)

---

### gasMultiplier

• **gasMultiplier**: `number` = `0`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[gasMultiplier](NeverminedAppOptions.md#gasmultiplier)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:164](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L164)

---

### gasPriceMultiplier

• **gasPriceMultiplier**: `number` = `0`

#### Defined in

[src/nevermined/resources/AppNetworks.ts:165](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L165)

---

### gasStationUri

• `Optional` **gasStationUri**: `string`

Use a gas station to calculate transaction fees

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[gasStationUri](NeverminedAppOptions.md#gasstationuri)

#### Defined in

[src/models/NeverminedOptions.ts:89](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/models/NeverminedOptions.ts#L89)

---

### graphHttpUri

• **graphHttpUri**: `string` = `'https://api.studio.thegraph.com/query/78075/public'`

Enpoint for the graph-node http query

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[graphHttpUri](NeverminedAppOptions.md#graphhttpuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:159](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L159)

---

### instanceName

• **instanceName**: `string` = `'appOptimism'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[instanceName](NeverminedAppOptions.md#instancename)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:154](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L154)

---

### ipfsGateway

• `Optional` **ipfsGateway**: `string` = `'https://ipfs.io'`

IPFS variables enable the resolution of DDOs (via `assets.resolve`) from CID urls
INFO: For performance purposes, it is recommended to setup a IPFS Infura endpoint to accelerate
the asset resolution requests.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsGateway](NeverminedAppOptions.md#ipfsgateway)

#### Defined in

[src/models/NeverminedOptions.ts:80](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/models/NeverminedOptions.ts#L80)

---

### ipfsProjectId

• `Optional` **ipfsProjectId**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectId](NeverminedAppOptions.md#ipfsprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:82](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/models/NeverminedOptions.ts#L82)

---

### ipfsProjectSecret

• `Optional` **ipfsProjectSecret**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectSecret](NeverminedAppOptions.md#ipfsprojectsecret)

#### Defined in

[src/models/NeverminedOptions.ts:84](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/models/NeverminedOptions.ts#L84)

---

### marketplaceAuthToken

• `Optional` **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceAuthToken](NeverminedAppOptions.md#marketplaceauthtoken)

#### Defined in

[src/models/NeverminedOptions.ts:41](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/models/NeverminedOptions.ts#L41)

---

### marketplaceUri

• **marketplaceUri**: `string` = `'https://marketplace-api.optimism.nevermined.app'`

URL to the MarketPlace API use to record some Nevermined assets metadata. In a Nevermined network there could be
multiple Marketplace API instances. Each of them typically records the metadata of a specific domain/vertical deployed on a Nevermined network.

**`See`**

https://docs.nevermined.io/docs/architecture/marketplace-api/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceUri](NeverminedAppOptions.md#marketplaceuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:158](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L158)

---

### neverminedBackendUri

• **neverminedBackendUri**: `string` = `'https://one-backend.optimism.nevermined.app'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedBackendUri](NeverminedAppOptions.md#neverminedbackenduri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:162](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L162)

---

### neverminedNodeAddress

• **neverminedNodeAddress**: `string` = `'0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'`

The public address of the Nevermined Node.

**`See`**

[neverminedNodeUri](NeverminedOptions.md#neverminednodeuri)

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeAddress](NeverminedAppOptions.md#neverminednodeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:161](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L161)

---

### neverminedNodeUri

• **neverminedNodeUri**: `string` = `'https://node.optimism.nevermined.app'`

URL to an existing Nevermined Node. A Nevermined network can have multiple running Nodes.
Each of them facilitate the access control and the data and infrastructure interaction with web2 elements.

**`See`**

https://docs.nevermined.io/docs/architecture/node/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeUri](NeverminedAppOptions.md#neverminednodeuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:160](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L160)

---

### nftContractCreditsAddress

• **nftContractCreditsAddress**: `string` = `'0xE24f60aE42F7Cc3B3357480C94165afD86B66583'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractCreditsAddress](NeverminedAppOptions.md#nftcontractcreditsaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:167](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L167)

---

### nftContractTimeAddress

• **nftContractTimeAddress**: `string` = `'0xE24f60aE42F7Cc3B3357480C94165afD86B66583'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractTimeAddress](NeverminedAppOptions.md#nftcontracttimeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:166](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L166)

---

### tokenAddress

• **tokenAddress**: `string` = `'0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[tokenAddress](NeverminedAppOptions.md#tokenaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:168](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L168)

---

### verbose

• **verbose**: `boolean` = `true`

Log level.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[verbose](NeverminedAppOptions.md#verbose)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:163](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L163)

---

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[web3Provider](NeverminedAppOptions.md#web3provider)

#### Defined in

[src/models/NeverminedOptions.ts:46](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/models/NeverminedOptions.ts#L46)

---

### web3ProviderUri

• **web3ProviderUri**: `undefined` \| `string`

Ethereum Web3 Provider URL. This Url allows the SDK to connect to a blockchain.
This provider depends on the network where you want to connect (Ethereum Mainnet, Rinkeby, Polygon Matic, etc).
It's possible to use a public available provider or a private/paid one like Infura, Alchemy, etc.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[web3ProviderUri](NeverminedAppOptions.md#web3provideruri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:157](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/nevermined/resources/AppNetworks.ts#L157)

---

### zeroDevProjectId

• `Optional` **zeroDevProjectId**: `string`

ZeroDev project id

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[zeroDevProjectId](NeverminedAppOptions.md#zerodevprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:94](https://github.com/nevermined-io/sdk-js/blob/8180ee1d53a2c732dcde9fa47eb88586f44827dd/src/models/NeverminedOptions.ts#L94)
