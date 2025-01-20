[@nevermined-io/sdk - v3.0.47](../code-reference.md) / AppDeploymentArbitrum

# Class: AppDeploymentArbitrum

## Hierarchy

- [`NeverminedAppOptions`](NeverminedAppOptions.md)

  ↳ **`AppDeploymentArbitrum`**

## Table of contents

### Constructors

- [constructor](AppDeploymentArbitrum.md#constructor)

### Properties

- [accounts](AppDeploymentArbitrum.md#accounts)
- [appUrl](AppDeploymentArbitrum.md#appurl)
- [artifactsFolder](AppDeploymentArbitrum.md#artifactsfolder)
- [chainId](AppDeploymentArbitrum.md#chainid)
- [circuitsFolder](AppDeploymentArbitrum.md#circuitsfolder)
- [contractsVersion](AppDeploymentArbitrum.md#contractsversion)
- [gasMultiplier](AppDeploymentArbitrum.md#gasmultiplier)
- [gasPriceMultiplier](AppDeploymentArbitrum.md#gaspricemultiplier)
- [gasStationUri](AppDeploymentArbitrum.md#gasstationuri)
- [graphHttpUri](AppDeploymentArbitrum.md#graphhttpuri)
- [instanceName](AppDeploymentArbitrum.md#instancename)
- [ipfsGateway](AppDeploymentArbitrum.md#ipfsgateway)
- [ipfsProjectId](AppDeploymentArbitrum.md#ipfsprojectid)
- [ipfsProjectSecret](AppDeploymentArbitrum.md#ipfsprojectsecret)
- [marketplaceAuthToken](AppDeploymentArbitrum.md#marketplaceauthtoken)
- [marketplaceUri](AppDeploymentArbitrum.md#marketplaceuri)
- [neverminedBackendUri](AppDeploymentArbitrum.md#neverminedbackenduri)
- [neverminedNodeAddress](AppDeploymentArbitrum.md#neverminednodeaddress)
- [neverminedNodeUri](AppDeploymentArbitrum.md#neverminednodeuri)
- [nftContractCreditsAddress](AppDeploymentArbitrum.md#nftcontractcreditsaddress)
- [nftContractTimeAddress](AppDeploymentArbitrum.md#nftcontracttimeaddress)
- [tokenAddress](AppDeploymentArbitrum.md#tokenaddress)
- [verbose](AppDeploymentArbitrum.md#verbose)
- [web3Provider](AppDeploymentArbitrum.md#web3provider)
- [web3ProviderUri](AppDeploymentArbitrum.md#web3provideruri)
- [zeroDevProjectId](AppDeploymentArbitrum.md#zerodevprojectid)

## Constructors

### constructor

• **new AppDeploymentArbitrum**(): [`AppDeploymentArbitrum`](AppDeploymentArbitrum.md)

#### Returns

[`AppDeploymentArbitrum`](AppDeploymentArbitrum.md)

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[constructor](NeverminedAppOptions.md#constructor)

## Properties

### accounts

• `Optional` **accounts**: [`NvmAccount`](NvmAccount.md)[]

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[accounts](NeverminedAppOptions.md#accounts)

#### Defined in

[src/models/NeverminedOptions.ts:73](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/models/NeverminedOptions.ts#L73)

---

### appUrl

• **appUrl**: `string` = `'https://nevermined.app'`

The Nevermined App URL.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[appUrl](NeverminedAppOptions.md#appurl)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:65](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L65)

---

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[artifactsFolder](NeverminedAppOptions.md#artifactsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:67](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/models/NeverminedOptions.ts#L67)

---

### chainId

• **chainId**: `number` = `42161`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[chainId](NeverminedAppOptions.md#chainid)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:66](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L66)

---

### circuitsFolder

• `Optional` **circuitsFolder**: `string`

The folder where the nevermined contract circuits are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[circuitsFolder](NeverminedAppOptions.md#circuitsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:71](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/models/NeverminedOptions.ts#L71)

---

### contractsVersion

• `Optional` **contractsVersion**: `string`

Contracts version

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[contractsVersion](NeverminedAppOptions.md#contractsversion)

#### Defined in

[src/models/NeverminedOptions.ts:99](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/models/NeverminedOptions.ts#L99)

---

### gasMultiplier

• **gasMultiplier**: `number` = `0`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[gasMultiplier](NeverminedAppOptions.md#gasmultiplier)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:74](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L74)

---

### gasPriceMultiplier

• **gasPriceMultiplier**: `number` = `0`

#### Defined in

[src/nevermined/resources/AppNetworks.ts:75](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L75)

---

### gasStationUri

• `Optional` **gasStationUri**: `string`

Use a gas station to calculate transaction fees

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[gasStationUri](NeverminedAppOptions.md#gasstationuri)

#### Defined in

[src/models/NeverminedOptions.ts:89](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/models/NeverminedOptions.ts#L89)

---

### graphHttpUri

• **graphHttpUri**: `string` = `'https://api.studio.thegraph.com/query/78075/public'`

Enpoint for the graph-node http query

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[graphHttpUri](NeverminedAppOptions.md#graphhttpuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:69](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L69)

---

### instanceName

• **instanceName**: `string` = `'appArbitrum'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[instanceName](NeverminedAppOptions.md#instancename)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:64](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L64)

---

### ipfsGateway

• `Optional` **ipfsGateway**: `string` = `'https://ipfs.io'`

IPFS variables enable the resolution of DDOs (via `assets.resolve`) from CID urls
INFO: For performance purposes, it is recommended to setup a IPFS Infura endpoint to accelerate
the asset resolution requests.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsGateway](NeverminedAppOptions.md#ipfsgateway)

#### Defined in

[src/models/NeverminedOptions.ts:80](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/models/NeverminedOptions.ts#L80)

---

### ipfsProjectId

• `Optional` **ipfsProjectId**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectId](NeverminedAppOptions.md#ipfsprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:82](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/models/NeverminedOptions.ts#L82)

---

### ipfsProjectSecret

• `Optional` **ipfsProjectSecret**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectSecret](NeverminedAppOptions.md#ipfsprojectsecret)

#### Defined in

[src/models/NeverminedOptions.ts:84](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/models/NeverminedOptions.ts#L84)

---

### marketplaceAuthToken

• `Optional` **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceAuthToken](NeverminedAppOptions.md#marketplaceauthtoken)

#### Defined in

[src/models/NeverminedOptions.ts:41](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/models/NeverminedOptions.ts#L41)

---

### marketplaceUri

• **marketplaceUri**: `string` = `'https://marketplace-api.arbitrum.nevermined.app'`

URL to the MarketPlace API use to record some Nevermined assets metadata. In a Nevermined network there could be
multiple Marketplace API instances. Each of them typically records the metadata of a specific domain/vertical deployed on a Nevermined network.

**`See`**

https://docs.nevermined.io/docs/architecture/marketplace-api/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceUri](NeverminedAppOptions.md#marketplaceuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:68](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L68)

---

### neverminedBackendUri

• **neverminedBackendUri**: `string` = `'https://one-backend.arbitrum.nevermined.app'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedBackendUri](NeverminedAppOptions.md#neverminedbackenduri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:72](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L72)

---

### neverminedNodeAddress

• **neverminedNodeAddress**: `string` = `'0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'`

The public address of the Nevermined Node.

**`See`**

[neverminedNodeUri](NeverminedOptions.md#neverminednodeuri)

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeAddress](NeverminedAppOptions.md#neverminednodeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:71](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L71)

---

### neverminedNodeUri

• **neverminedNodeUri**: `string` = `'https://node.arbitrum.nevermined.app'`

URL to an existing Nevermined Node. A Nevermined network can have multiple running Nodes.
Each of them facilitate the access control and the data and infrastructure interaction with web2 elements.

**`See`**

https://docs.nevermined.io/docs/architecture/node/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeUri](NeverminedAppOptions.md#neverminednodeuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:70](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L70)

---

### nftContractCreditsAddress

• **nftContractCreditsAddress**: `string` = `'0xcc700c5d59a339ec6a2484a723791254da410d62'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractCreditsAddress](NeverminedAppOptions.md#nftcontractcreditsaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:77](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L77)

---

### nftContractTimeAddress

• **nftContractTimeAddress**: `string` = `'0x19D7551f112457deb78DadeFfd87D95a0810EDfF'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractTimeAddress](NeverminedAppOptions.md#nftcontracttimeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:76](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L76)

---

### tokenAddress

• **tokenAddress**: `string` = `'0xaf88d065e77c8cC2239327C5EDb3A432268e5831'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[tokenAddress](NeverminedAppOptions.md#tokenaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:78](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L78)

---

### verbose

• **verbose**: `boolean` = `true`

Log level.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[verbose](NeverminedAppOptions.md#verbose)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:73](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L73)

---

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[web3Provider](NeverminedAppOptions.md#web3provider)

#### Defined in

[src/models/NeverminedOptions.ts:46](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/models/NeverminedOptions.ts#L46)

---

### web3ProviderUri

• **web3ProviderUri**: `undefined` \| `string`

Ethereum Web3 Provider URL. This Url allows the SDK to connect to a blockchain.
This provider depends on the network where you want to connect (Ethereum Mainnet, Rinkeby, Polygon Matic, etc).
It's possible to use a public available provider or a private/paid one like Infura, Alchemy, etc.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[web3ProviderUri](NeverminedAppOptions.md#web3provideruri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:67](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/nevermined/resources/AppNetworks.ts#L67)

---

### zeroDevProjectId

• `Optional` **zeroDevProjectId**: `string`

ZeroDev project id

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[zeroDevProjectId](NeverminedAppOptions.md#zerodevprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:94](https://github.com/nevermined-io/sdk-js/blob/db42a2a70293f73d5f0e0208dd90541855f3ca93/src/models/NeverminedOptions.ts#L94)
