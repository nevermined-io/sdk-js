[@nevermined-io/sdk - v3.0.47](../code-reference.md) / AppDeploymentMatic

# Class: AppDeploymentMatic

## Hierarchy

- [`NeverminedAppOptions`](NeverminedAppOptions.md)

  ↳ **`AppDeploymentMatic`**

## Table of contents

### Constructors

- [constructor](AppDeploymentMatic.md#constructor)

### Properties

- [accounts](AppDeploymentMatic.md#accounts)
- [appUrl](AppDeploymentMatic.md#appurl)
- [artifactsFolder](AppDeploymentMatic.md#artifactsfolder)
- [chainId](AppDeploymentMatic.md#chainid)
- [circuitsFolder](AppDeploymentMatic.md#circuitsfolder)
- [contractsVersion](AppDeploymentMatic.md#contractsversion)
- [gasMultiplier](AppDeploymentMatic.md#gasmultiplier)
- [gasPriceMultiplier](AppDeploymentMatic.md#gaspricemultiplier)
- [gasStationUri](AppDeploymentMatic.md#gasstationuri)
- [graphHttpUri](AppDeploymentMatic.md#graphhttpuri)
- [instanceName](AppDeploymentMatic.md#instancename)
- [ipfsGateway](AppDeploymentMatic.md#ipfsgateway)
- [ipfsProjectId](AppDeploymentMatic.md#ipfsprojectid)
- [ipfsProjectSecret](AppDeploymentMatic.md#ipfsprojectsecret)
- [marketplaceAuthToken](AppDeploymentMatic.md#marketplaceauthtoken)
- [marketplaceUri](AppDeploymentMatic.md#marketplaceuri)
- [neverminedBackendUri](AppDeploymentMatic.md#neverminedbackenduri)
- [neverminedNodeAddress](AppDeploymentMatic.md#neverminednodeaddress)
- [neverminedNodeUri](AppDeploymentMatic.md#neverminednodeuri)
- [nftContractCreditsAddress](AppDeploymentMatic.md#nftcontractcreditsaddress)
- [nftContractTimeAddress](AppDeploymentMatic.md#nftcontracttimeaddress)
- [tokenAddress](AppDeploymentMatic.md#tokenaddress)
- [verbose](AppDeploymentMatic.md#verbose)
- [web3Provider](AppDeploymentMatic.md#web3provider)
- [web3ProviderUri](AppDeploymentMatic.md#web3provideruri)
- [zeroDevProjectId](AppDeploymentMatic.md#zerodevprojectid)

## Constructors

### constructor

• **new AppDeploymentMatic**(): [`AppDeploymentMatic`](AppDeploymentMatic.md)

#### Returns

[`AppDeploymentMatic`](AppDeploymentMatic.md)

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[constructor](NeverminedAppOptions.md#constructor)

## Properties

### accounts

• `Optional` **accounts**: [`NvmAccount`](NvmAccount.md)[]

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[accounts](NeverminedAppOptions.md#accounts)

#### Defined in

[src/models/NeverminedOptions.ts:73](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/models/NeverminedOptions.ts#L73)

---

### appUrl

• **appUrl**: `string` = `'https://matic.nevermined.app'`

The Nevermined App URL.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[appUrl](NeverminedAppOptions.md#appurl)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:101](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L101)

---

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[artifactsFolder](NeverminedAppOptions.md#artifactsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:67](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/models/NeverminedOptions.ts#L67)

---

### chainId

• **chainId**: `number` = `137`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[chainId](NeverminedAppOptions.md#chainid)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:102](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L102)

---

### circuitsFolder

• `Optional` **circuitsFolder**: `string`

The folder where the nevermined contract circuits are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[circuitsFolder](NeverminedAppOptions.md#circuitsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:71](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/models/NeverminedOptions.ts#L71)

---

### contractsVersion

• `Optional` **contractsVersion**: `string`

Contracts version

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[contractsVersion](NeverminedAppOptions.md#contractsversion)

#### Defined in

[src/models/NeverminedOptions.ts:99](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/models/NeverminedOptions.ts#L99)

---

### gasMultiplier

• **gasMultiplier**: `number` = `1.2`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[gasMultiplier](NeverminedAppOptions.md#gasmultiplier)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:110](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L110)

---

### gasPriceMultiplier

• **gasPriceMultiplier**: `number` = `1.2`

#### Defined in

[src/nevermined/resources/AppNetworks.ts:111](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L111)

---

### gasStationUri

• `Optional` **gasStationUri**: `string`

Use a gas station to calculate transaction fees

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[gasStationUri](NeverminedAppOptions.md#gasstationuri)

#### Defined in

[src/models/NeverminedOptions.ts:89](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/models/NeverminedOptions.ts#L89)

---

### graphHttpUri

• **graphHttpUri**: `string` = `'https://api.studio.thegraph.com/query/78075/public'`

Enpoint for the graph-node http query

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[graphHttpUri](NeverminedAppOptions.md#graphhttpuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:105](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L105)

---

### instanceName

• **instanceName**: `string` = `'appMatic'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[instanceName](NeverminedAppOptions.md#instancename)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:100](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L100)

---

### ipfsGateway

• `Optional` **ipfsGateway**: `string` = `'https://ipfs.io'`

IPFS variables enable the resolution of DDOs (via `assets.resolve`) from CID urls
INFO: For performance purposes, it is recommended to setup a IPFS Infura endpoint to accelerate
the asset resolution requests.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsGateway](NeverminedAppOptions.md#ipfsgateway)

#### Defined in

[src/models/NeverminedOptions.ts:80](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/models/NeverminedOptions.ts#L80)

---

### ipfsProjectId

• `Optional` **ipfsProjectId**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectId](NeverminedAppOptions.md#ipfsprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:82](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/models/NeverminedOptions.ts#L82)

---

### ipfsProjectSecret

• `Optional` **ipfsProjectSecret**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectSecret](NeverminedAppOptions.md#ipfsprojectsecret)

#### Defined in

[src/models/NeverminedOptions.ts:84](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/models/NeverminedOptions.ts#L84)

---

### marketplaceAuthToken

• `Optional` **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceAuthToken](NeverminedAppOptions.md#marketplaceauthtoken)

#### Defined in

[src/models/NeverminedOptions.ts:41](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/models/NeverminedOptions.ts#L41)

---

### marketplaceUri

• **marketplaceUri**: `string` = `'https://marketplace-api.matic.nevermined.app'`

URL to the MarketPlace API use to record some Nevermined assets metadata. In a Nevermined network there could be
multiple Marketplace API instances. Each of them typically records the metadata of a specific domain/vertical deployed on a Nevermined network.

**`See`**

https://docs.nevermined.io/docs/architecture/marketplace-api/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceUri](NeverminedAppOptions.md#marketplaceuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:104](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L104)

---

### neverminedBackendUri

• **neverminedBackendUri**: `string` = `'https://one-backend.matic.nevermined.app'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedBackendUri](NeverminedAppOptions.md#neverminedbackenduri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:108](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L108)

---

### neverminedNodeAddress

• **neverminedNodeAddress**: `string` = `'0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'`

The public address of the Nevermined Node.

**`See`**

[neverminedNodeUri](NeverminedOptions.md#neverminednodeuri)

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeAddress](NeverminedAppOptions.md#neverminednodeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:107](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L107)

---

### neverminedNodeUri

• **neverminedNodeUri**: `string` = `'https://node.matic.nevermined.app'`

URL to an existing Nevermined Node. A Nevermined network can have multiple running Nodes.
Each of them facilitate the access control and the data and infrastructure interaction with web2 elements.

**`See`**

https://docs.nevermined.io/docs/architecture/node/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeUri](NeverminedAppOptions.md#neverminednodeuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:106](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L106)

---

### nftContractCreditsAddress

• **nftContractCreditsAddress**: `string` = `'0xaB53c5EBd2C42D063EA548b8e46F3E1b8F343391'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractCreditsAddress](NeverminedAppOptions.md#nftcontractcreditsaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:113](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L113)

---

### nftContractTimeAddress

• **nftContractTimeAddress**: `string` = `'0xaB53c5EBd2C42D063EA548b8e46F3E1b8F343391'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractTimeAddress](NeverminedAppOptions.md#nftcontracttimeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:112](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L112)

---

### tokenAddress

• **tokenAddress**: `string` = `'0x2791bca1f2de4661ed88a30c99a7a9449aa84174'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[tokenAddress](NeverminedAppOptions.md#tokenaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:114](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L114)

---

### verbose

• **verbose**: `boolean` = `true`

Log level.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[verbose](NeverminedAppOptions.md#verbose)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:109](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L109)

---

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[web3Provider](NeverminedAppOptions.md#web3provider)

#### Defined in

[src/models/NeverminedOptions.ts:46](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/models/NeverminedOptions.ts#L46)

---

### web3ProviderUri

• **web3ProviderUri**: `undefined` \| `string`

Ethereum Web3 Provider URL. This Url allows the SDK to connect to a blockchain.
This provider depends on the network where you want to connect (Ethereum Mainnet, Rinkeby, Polygon Matic, etc).
It's possible to use a public available provider or a private/paid one like Infura, Alchemy, etc.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[web3ProviderUri](NeverminedAppOptions.md#web3provideruri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:103](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/nevermined/resources/AppNetworks.ts#L103)

---

### zeroDevProjectId

• `Optional` **zeroDevProjectId**: `string`

ZeroDev project id

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[zeroDevProjectId](NeverminedAppOptions.md#zerodevprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:94](https://github.com/nevermined-io/sdk-js/blob/9fd2122cb8a365d3b370fc0dbe1796198ecfa3b3/src/models/NeverminedOptions.ts#L94)
