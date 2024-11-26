[@nevermined-io/sdk - v3.0.44](../code-reference.md) / AppDeploymentCelo

# Class: AppDeploymentCelo

## Hierarchy

- [`NeverminedAppOptions`](NeverminedAppOptions.md)

  ↳ **`AppDeploymentCelo`**

## Table of contents

### Constructors

- [constructor](AppDeploymentCelo.md#constructor)

### Properties

- [accounts](AppDeploymentCelo.md#accounts)
- [appUrl](AppDeploymentCelo.md#appurl)
- [artifactsFolder](AppDeploymentCelo.md#artifactsfolder)
- [chainId](AppDeploymentCelo.md#chainid)
- [circuitsFolder](AppDeploymentCelo.md#circuitsfolder)
- [contractsVersion](AppDeploymentCelo.md#contractsversion)
- [gasMultiplier](AppDeploymentCelo.md#gasmultiplier)
- [gasPriceMultiplier](AppDeploymentCelo.md#gaspricemultiplier)
- [gasStationUri](AppDeploymentCelo.md#gasstationuri)
- [graphHttpUri](AppDeploymentCelo.md#graphhttpuri)
- [instanceName](AppDeploymentCelo.md#instancename)
- [ipfsGateway](AppDeploymentCelo.md#ipfsgateway)
- [ipfsProjectId](AppDeploymentCelo.md#ipfsprojectid)
- [ipfsProjectSecret](AppDeploymentCelo.md#ipfsprojectsecret)
- [marketplaceAuthToken](AppDeploymentCelo.md#marketplaceauthtoken)
- [marketplaceUri](AppDeploymentCelo.md#marketplaceuri)
- [neverminedBackendUri](AppDeploymentCelo.md#neverminedbackenduri)
- [neverminedNodeAddress](AppDeploymentCelo.md#neverminednodeaddress)
- [neverminedNodeUri](AppDeploymentCelo.md#neverminednodeuri)
- [nftContractCreditsAddress](AppDeploymentCelo.md#nftcontractcreditsaddress)
- [nftContractTimeAddress](AppDeploymentCelo.md#nftcontracttimeaddress)
- [tokenAddress](AppDeploymentCelo.md#tokenaddress)
- [verbose](AppDeploymentCelo.md#verbose)
- [web3Provider](AppDeploymentCelo.md#web3provider)
- [web3ProviderUri](AppDeploymentCelo.md#web3provideruri)
- [zeroDevProjectId](AppDeploymentCelo.md#zerodevprojectid)

## Constructors

### constructor

• **new AppDeploymentCelo**(): [`AppDeploymentCelo`](AppDeploymentCelo.md)

#### Returns

[`AppDeploymentCelo`](AppDeploymentCelo.md)

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[constructor](NeverminedAppOptions.md#constructor)

## Properties

### accounts

• `Optional` **accounts**: [`NvmAccount`](NvmAccount.md)[]

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[accounts](NeverminedAppOptions.md#accounts)

#### Defined in

[src/models/NeverminedOptions.ts:73](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/models/NeverminedOptions.ts#L73)

---

### appUrl

• **appUrl**: `string` = `'https://celo.nevermined.app'`

The Nevermined App URL.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[appUrl](NeverminedAppOptions.md#appurl)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:137](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L137)

---

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[artifactsFolder](NeverminedAppOptions.md#artifactsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:67](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/models/NeverminedOptions.ts#L67)

---

### chainId

• **chainId**: `number` = `42220`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[chainId](NeverminedAppOptions.md#chainid)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:138](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L138)

---

### circuitsFolder

• `Optional` **circuitsFolder**: `string`

The folder where the nevermined contract circuits are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[circuitsFolder](NeverminedAppOptions.md#circuitsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:71](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/models/NeverminedOptions.ts#L71)

---

### contractsVersion

• `Optional` **contractsVersion**: `string`

Contracts version

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[contractsVersion](NeverminedAppOptions.md#contractsversion)

#### Defined in

[src/models/NeverminedOptions.ts:99](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/models/NeverminedOptions.ts#L99)

---

### gasMultiplier

• **gasMultiplier**: `number` = `0`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[gasMultiplier](NeverminedAppOptions.md#gasmultiplier)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:146](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L146)

---

### gasPriceMultiplier

• **gasPriceMultiplier**: `number` = `0`

#### Defined in

[src/nevermined/resources/AppNetworks.ts:147](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L147)

---

### gasStationUri

• `Optional` **gasStationUri**: `string`

Use a gas station to calculate transaction fees

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[gasStationUri](NeverminedAppOptions.md#gasstationuri)

#### Defined in

[src/models/NeverminedOptions.ts:89](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/models/NeverminedOptions.ts#L89)

---

### graphHttpUri

• **graphHttpUri**: `string` = `'https://api.studio.thegraph.com/query/78075/public'`

Enpoint for the graph-node http query

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[graphHttpUri](NeverminedAppOptions.md#graphhttpuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:141](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L141)

---

### instanceName

• **instanceName**: `string` = `'appCelo'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[instanceName](NeverminedAppOptions.md#instancename)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:136](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L136)

---

### ipfsGateway

• `Optional` **ipfsGateway**: `string` = `'https://ipfs.io'`

IPFS variables enable the resolution of DDOs (via `assets.resolve`) from CID urls
INFO: For performance purposes, it is recommended to setup a IPFS Infura endpoint to accelerate
the asset resolution requests.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsGateway](NeverminedAppOptions.md#ipfsgateway)

#### Defined in

[src/models/NeverminedOptions.ts:80](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/models/NeverminedOptions.ts#L80)

---

### ipfsProjectId

• `Optional` **ipfsProjectId**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectId](NeverminedAppOptions.md#ipfsprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:82](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/models/NeverminedOptions.ts#L82)

---

### ipfsProjectSecret

• `Optional` **ipfsProjectSecret**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectSecret](NeverminedAppOptions.md#ipfsprojectsecret)

#### Defined in

[src/models/NeverminedOptions.ts:84](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/models/NeverminedOptions.ts#L84)

---

### marketplaceAuthToken

• `Optional` **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceAuthToken](NeverminedAppOptions.md#marketplaceauthtoken)

#### Defined in

[src/models/NeverminedOptions.ts:41](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/models/NeverminedOptions.ts#L41)

---

### marketplaceUri

• **marketplaceUri**: `string` = `'https://marketplace-api.celo.nevermined.app'`

URL to the MarketPlace API use to record some Nevermined assets metadata. In a Nevermined network there could be
multiple Marketplace API instances. Each of them typically records the metadata of a specific domain/vertical deployed on a Nevermined network.

**`See`**

https://docs.nevermined.io/docs/architecture/marketplace-api/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceUri](NeverminedAppOptions.md#marketplaceuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:140](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L140)

---

### neverminedBackendUri

• **neverminedBackendUri**: `string` = `'https://one-backend.celo.nevermined.app'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedBackendUri](NeverminedAppOptions.md#neverminedbackenduri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:144](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L144)

---

### neverminedNodeAddress

• **neverminedNodeAddress**: `string` = `'0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'`

The public address of the Nevermined Node.

**`See`**

[neverminedNodeUri](NeverminedOptions.md#neverminednodeuri)

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeAddress](NeverminedAppOptions.md#neverminednodeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:143](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L143)

---

### neverminedNodeUri

• **neverminedNodeUri**: `string` = `'https://node.celo.nevermined.app'`

URL to an existing Nevermined Node. A Nevermined network can have multiple running Nodes.
Each of them facilitate the access control and the data and infrastructure interaction with web2 elements.

**`See`**

https://docs.nevermined.io/docs/architecture/node/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeUri](NeverminedAppOptions.md#neverminednodeuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:142](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L142)

---

### nftContractCreditsAddress

• **nftContractCreditsAddress**: `string` = `'0x4daA62Fe74bFE5558D97F5B9fC45b999c6508A8e'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractCreditsAddress](NeverminedAppOptions.md#nftcontractcreditsaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:149](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L149)

---

### nftContractTimeAddress

• **nftContractTimeAddress**: `string` = `'0x4daA62Fe74bFE5558D97F5B9fC45b999c6508A8e'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractTimeAddress](NeverminedAppOptions.md#nftcontracttimeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:148](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L148)

---

### tokenAddress

• **tokenAddress**: `string` = `'0xef4229c8c3250C675F21BCefa42f58EfbfF6002a'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[tokenAddress](NeverminedAppOptions.md#tokenaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:150](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L150)

---

### verbose

• **verbose**: `boolean` = `true`

Log level.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[verbose](NeverminedAppOptions.md#verbose)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:145](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L145)

---

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[web3Provider](NeverminedAppOptions.md#web3provider)

#### Defined in

[src/models/NeverminedOptions.ts:46](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/models/NeverminedOptions.ts#L46)

---

### web3ProviderUri

• **web3ProviderUri**: `undefined` \| `string`

Ethereum Web3 Provider URL. This Url allows the SDK to connect to a blockchain.
This provider depends on the network where you want to connect (Ethereum Mainnet, Rinkeby, Polygon Matic, etc).
It's possible to use a public available provider or a private/paid one like Infura, Alchemy, etc.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[web3ProviderUri](NeverminedAppOptions.md#web3provideruri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:139](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/nevermined/resources/AppNetworks.ts#L139)

---

### zeroDevProjectId

• `Optional` **zeroDevProjectId**: `string`

ZeroDev project id

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[zeroDevProjectId](NeverminedAppOptions.md#zerodevprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:94](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/models/NeverminedOptions.ts#L94)
