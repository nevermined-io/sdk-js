[@nevermined-io/sdk - v3.0.33](../code-reference.md) / AppDeploymentGnosis

# Class: AppDeploymentGnosis

## Hierarchy

- [`NeverminedAppOptions`](NeverminedAppOptions.md)

  ↳ **`AppDeploymentGnosis`**

## Table of contents

### Constructors

- [constructor](AppDeploymentGnosis.md#constructor)

### Properties

- [accounts](AppDeploymentGnosis.md#accounts)
- [appUrl](AppDeploymentGnosis.md#appurl)
- [artifactsFolder](AppDeploymentGnosis.md#artifactsfolder)
- [chainId](AppDeploymentGnosis.md#chainid)
- [circuitsFolder](AppDeploymentGnosis.md#circuitsfolder)
- [contractsVersion](AppDeploymentGnosis.md#contractsversion)
- [gasMultiplier](AppDeploymentGnosis.md#gasmultiplier)
- [gasPriceMultiplier](AppDeploymentGnosis.md#gaspricemultiplier)
- [gasStationUri](AppDeploymentGnosis.md#gasstationuri)
- [graphHttpUri](AppDeploymentGnosis.md#graphhttpuri)
- [instanceName](AppDeploymentGnosis.md#instancename)
- [ipfsGateway](AppDeploymentGnosis.md#ipfsgateway)
- [ipfsProjectId](AppDeploymentGnosis.md#ipfsprojectid)
- [ipfsProjectSecret](AppDeploymentGnosis.md#ipfsprojectsecret)
- [marketplaceAuthToken](AppDeploymentGnosis.md#marketplaceauthtoken)
- [marketplaceUri](AppDeploymentGnosis.md#marketplaceuri)
- [neverminedBackendUri](AppDeploymentGnosis.md#neverminedbackenduri)
- [neverminedNodeAddress](AppDeploymentGnosis.md#neverminednodeaddress)
- [neverminedNodeUri](AppDeploymentGnosis.md#neverminednodeuri)
- [nftContractCreditsAddress](AppDeploymentGnosis.md#nftcontractcreditsaddress)
- [nftContractTimeAddress](AppDeploymentGnosis.md#nftcontracttimeaddress)
- [tokenAddress](AppDeploymentGnosis.md#tokenaddress)
- [verbose](AppDeploymentGnosis.md#verbose)
- [web3Provider](AppDeploymentGnosis.md#web3provider)
- [web3ProviderUri](AppDeploymentGnosis.md#web3provideruri)
- [zeroDevProjectId](AppDeploymentGnosis.md#zerodevprojectid)

## Constructors

### constructor

• **new AppDeploymentGnosis**(): [`AppDeploymentGnosis`](AppDeploymentGnosis.md)

#### Returns

[`AppDeploymentGnosis`](AppDeploymentGnosis.md)

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[constructor](NeverminedAppOptions.md#constructor)

## Properties

### accounts

• `Optional` **accounts**: [`NvmAccount`](NvmAccount.md)[]

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[accounts](NeverminedAppOptions.md#accounts)

#### Defined in

[src/models/NeverminedOptions.ts:73](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/models/NeverminedOptions.ts#L73)

---

### appUrl

• **appUrl**: `string` = `'https://gnosis.nevermined.app'`

The Nevermined App URL.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[appUrl](NeverminedAppOptions.md#appurl)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:83](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L83)

---

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[artifactsFolder](NeverminedAppOptions.md#artifactsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:67](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/models/NeverminedOptions.ts#L67)

---

### chainId

• **chainId**: `number` = `100`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[chainId](NeverminedAppOptions.md#chainid)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:84](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L84)

---

### circuitsFolder

• `Optional` **circuitsFolder**: `string`

The folder where the nevermined contract circuits are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[circuitsFolder](NeverminedAppOptions.md#circuitsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:71](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/models/NeverminedOptions.ts#L71)

---

### contractsVersion

• `Optional` **contractsVersion**: `string`

Contracts version

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[contractsVersion](NeverminedAppOptions.md#contractsversion)

#### Defined in

[src/models/NeverminedOptions.ts:99](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/models/NeverminedOptions.ts#L99)

---

### gasMultiplier

• **gasMultiplier**: `number` = `0`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[gasMultiplier](NeverminedAppOptions.md#gasmultiplier)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:92](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L92)

---

### gasPriceMultiplier

• **gasPriceMultiplier**: `number` = `0`

#### Defined in

[src/nevermined/resources/AppNetworks.ts:93](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L93)

---

### gasStationUri

• `Optional` **gasStationUri**: `string`

Use a gas station to calculate transaction fees

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[gasStationUri](NeverminedAppOptions.md#gasstationuri)

#### Defined in

[src/models/NeverminedOptions.ts:89](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/models/NeverminedOptions.ts#L89)

---

### graphHttpUri

• **graphHttpUri**: `string` = `'https://api.thegraph.com/subgraphs/name/nevermined-io/public'`

Enpoint for the graph-node http query

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[graphHttpUri](NeverminedAppOptions.md#graphhttpuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:87](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L87)

---

### instanceName

• **instanceName**: `string` = `'appGnosis'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[instanceName](NeverminedAppOptions.md#instancename)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:82](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L82)

---

### ipfsGateway

• `Optional` **ipfsGateway**: `string` = `'https://ipfs.io'`

IPFS variables enable the resolution of DDOs (via `assets.resolve`) from CID urls
INFO: For performance purposes, it is recommended to setup a IPFS Infura endpoint to accelerate
the asset resolution requests.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsGateway](NeverminedAppOptions.md#ipfsgateway)

#### Defined in

[src/models/NeverminedOptions.ts:80](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/models/NeverminedOptions.ts#L80)

---

### ipfsProjectId

• `Optional` **ipfsProjectId**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectId](NeverminedAppOptions.md#ipfsprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:82](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/models/NeverminedOptions.ts#L82)

---

### ipfsProjectSecret

• `Optional` **ipfsProjectSecret**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectSecret](NeverminedAppOptions.md#ipfsprojectsecret)

#### Defined in

[src/models/NeverminedOptions.ts:84](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/models/NeverminedOptions.ts#L84)

---

### marketplaceAuthToken

• `Optional` **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceAuthToken](NeverminedAppOptions.md#marketplaceauthtoken)

#### Defined in

[src/models/NeverminedOptions.ts:41](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/models/NeverminedOptions.ts#L41)

---

### marketplaceUri

• **marketplaceUri**: `string` = `'https://marketplace-api.gnosis.nevermined.app'`

URL to the MarketPlace API use to record some Nevermined assets metadata. In a Nevermined network there could be
multiple Marketplace API instances. Each of them typically records the metadata of a specific domain/vertical deployed on a Nevermined network.

**`See`**

https://docs.nevermined.io/docs/architecture/marketplace-api/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceUri](NeverminedAppOptions.md#marketplaceuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:86](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L86)

---

### neverminedBackendUri

• **neverminedBackendUri**: `string` = `'https://one-backend.gnosis.nevermined.app'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedBackendUri](NeverminedAppOptions.md#neverminedbackenduri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:90](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L90)

---

### neverminedNodeAddress

• **neverminedNodeAddress**: `string` = `'0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'`

The public address of the Nevermined Node.

**`See`**

[neverminedNodeUri](NeverminedOptions.md#neverminednodeuri)

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeAddress](NeverminedAppOptions.md#neverminednodeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:89](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L89)

---

### neverminedNodeUri

• **neverminedNodeUri**: `string` = `'https://node.gnosis.nevermined.app'`

URL to an existing Nevermined Node. A Nevermined network can have multiple running Nodes.
Each of them facilitate the access control and the data and infrastructure interaction with web2 elements.

**`See`**

https://docs.nevermined.io/docs/architecture/node/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeUri](NeverminedAppOptions.md#neverminednodeuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:88](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L88)

---

### nftContractCreditsAddress

• **nftContractCreditsAddress**: `string` = `'0x80A9b55F8604acC26dF2Ac6e07F9dC5B0eAa05Ce'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractCreditsAddress](NeverminedAppOptions.md#nftcontractcreditsaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:95](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L95)

---

### nftContractTimeAddress

• **nftContractTimeAddress**: `string` = `'0x80A9b55F8604acC26dF2Ac6e07F9dC5B0eAa05Ce'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractTimeAddress](NeverminedAppOptions.md#nftcontracttimeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:94](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L94)

---

### tokenAddress

• **tokenAddress**: `string` = `'0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[tokenAddress](NeverminedAppOptions.md#tokenaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:96](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L96)

---

### verbose

• **verbose**: `boolean` = `true`

Log level.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[verbose](NeverminedAppOptions.md#verbose)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:91](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L91)

---

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[web3Provider](NeverminedAppOptions.md#web3provider)

#### Defined in

[src/models/NeverminedOptions.ts:46](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/models/NeverminedOptions.ts#L46)

---

### web3ProviderUri

• **web3ProviderUri**: `undefined` \| `string`

Ethereum Web3 Provider URL. This Url allows the SDK to connect to a blockchain.
This provider depends on the network where you want to connect (Ethereum Mainnet, Rinkeby, Polygon Matic, etc).
It's possible to use a public available provider or a private/paid one like Infura, Alchemy, etc.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[web3ProviderUri](NeverminedAppOptions.md#web3provideruri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:85](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/nevermined/resources/AppNetworks.ts#L85)

---

### zeroDevProjectId

• `Optional` **zeroDevProjectId**: `string`

ZeroDev project id

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[zeroDevProjectId](NeverminedAppOptions.md#zerodevprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:94](https://github.com/nevermined-io/sdk-js/blob/dda0d3b9d354dc639765282b5c8e9aea02544763/src/models/NeverminedOptions.ts#L94)
