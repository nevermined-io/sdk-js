[@nevermined-io/sdk - v3.0.33](../code-reference.md) / AppDeploymentTesting

# Class: AppDeploymentTesting

## Hierarchy

- [`NeverminedAppOptions`](NeverminedAppOptions.md)

  ↳ **`AppDeploymentTesting`**

## Table of contents

### Constructors

- [constructor](AppDeploymentTesting.md#constructor)

### Properties

- [accounts](AppDeploymentTesting.md#accounts)
- [appUrl](AppDeploymentTesting.md#appurl)
- [artifactsFolder](AppDeploymentTesting.md#artifactsfolder)
- [chainId](AppDeploymentTesting.md#chainid)
- [circuitsFolder](AppDeploymentTesting.md#circuitsfolder)
- [contractsVersion](AppDeploymentTesting.md#contractsversion)
- [gasMultiplier](AppDeploymentTesting.md#gasmultiplier)
- [gasPriceMultiplier](AppDeploymentTesting.md#gaspricemultiplier)
- [gasStationUri](AppDeploymentTesting.md#gasstationuri)
- [graphHttpUri](AppDeploymentTesting.md#graphhttpuri)
- [instanceName](AppDeploymentTesting.md#instancename)
- [ipfsGateway](AppDeploymentTesting.md#ipfsgateway)
- [ipfsProjectId](AppDeploymentTesting.md#ipfsprojectid)
- [ipfsProjectSecret](AppDeploymentTesting.md#ipfsprojectsecret)
- [marketplaceAuthToken](AppDeploymentTesting.md#marketplaceauthtoken)
- [marketplaceUri](AppDeploymentTesting.md#marketplaceuri)
- [neverminedBackendUri](AppDeploymentTesting.md#neverminedbackenduri)
- [neverminedNodeAddress](AppDeploymentTesting.md#neverminednodeaddress)
- [neverminedNodeUri](AppDeploymentTesting.md#neverminednodeuri)
- [nftContractCreditsAddress](AppDeploymentTesting.md#nftcontractcreditsaddress)
- [nftContractTimeAddress](AppDeploymentTesting.md#nftcontracttimeaddress)
- [tokenAddress](AppDeploymentTesting.md#tokenaddress)
- [verbose](AppDeploymentTesting.md#verbose)
- [web3Provider](AppDeploymentTesting.md#web3provider)
- [web3ProviderUri](AppDeploymentTesting.md#web3provideruri)
- [zeroDevProjectId](AppDeploymentTesting.md#zerodevprojectid)

## Constructors

### constructor

• **new AppDeploymentTesting**(): [`AppDeploymentTesting`](AppDeploymentTesting.md)

#### Returns

[`AppDeploymentTesting`](AppDeploymentTesting.md)

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[constructor](NeverminedAppOptions.md#constructor)

## Properties

### accounts

• `Optional` **accounts**: [`NvmAccount`](NvmAccount.md)[]

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[accounts](NeverminedAppOptions.md#accounts)

#### Defined in

[src/models/NeverminedOptions.ts:73](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/models/NeverminedOptions.ts#L73)

---

### appUrl

• **appUrl**: `string` = `'https://testing.nevermined.app'`

The Nevermined App URL.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[appUrl](NeverminedAppOptions.md#appurl)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:47](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L47)

---

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[artifactsFolder](NeverminedAppOptions.md#artifactsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:67](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/models/NeverminedOptions.ts#L67)

---

### chainId

• **chainId**: `number` = `421614`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[chainId](NeverminedAppOptions.md#chainid)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:48](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L48)

---

### circuitsFolder

• `Optional` **circuitsFolder**: `string`

The folder where the nevermined contract circuits are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[circuitsFolder](NeverminedAppOptions.md#circuitsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:71](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/models/NeverminedOptions.ts#L71)

---

### contractsVersion

• `Optional` **contractsVersion**: `string`

Contracts version

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[contractsVersion](NeverminedAppOptions.md#contractsversion)

#### Defined in

[src/models/NeverminedOptions.ts:99](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/models/NeverminedOptions.ts#L99)

---

### gasMultiplier

• **gasMultiplier**: `number` = `0`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[gasMultiplier](NeverminedAppOptions.md#gasmultiplier)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:56](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L56)

---

### gasPriceMultiplier

• **gasPriceMultiplier**: `number` = `0`

#### Defined in

[src/nevermined/resources/AppNetworks.ts:57](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L57)

---

### gasStationUri

• `Optional` **gasStationUri**: `string`

Use a gas station to calculate transaction fees

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[gasStationUri](NeverminedAppOptions.md#gasstationuri)

#### Defined in

[src/models/NeverminedOptions.ts:89](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/models/NeverminedOptions.ts#L89)

---

### graphHttpUri

• **graphHttpUri**: `string` = `'https://api.thegraph.com/subgraphs/name/nevermined-io/public'`

Enpoint for the graph-node http query

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[graphHttpUri](NeverminedAppOptions.md#graphhttpuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:51](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L51)

---

### instanceName

• **instanceName**: `string` = `'appTesting'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[instanceName](NeverminedAppOptions.md#instancename)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:46](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L46)

---

### ipfsGateway

• `Optional` **ipfsGateway**: `string` = `'https://ipfs.io'`

IPFS variables enable the resolution of DDOs (via `assets.resolve`) from CID urls
INFO: For performance purposes, it is recommended to setup a IPFS Infura endpoint to accelerate
the asset resolution requests.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsGateway](NeverminedAppOptions.md#ipfsgateway)

#### Defined in

[src/models/NeverminedOptions.ts:80](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/models/NeverminedOptions.ts#L80)

---

### ipfsProjectId

• `Optional` **ipfsProjectId**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectId](NeverminedAppOptions.md#ipfsprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:82](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/models/NeverminedOptions.ts#L82)

---

### ipfsProjectSecret

• `Optional` **ipfsProjectSecret**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectSecret](NeverminedAppOptions.md#ipfsprojectsecret)

#### Defined in

[src/models/NeverminedOptions.ts:84](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/models/NeverminedOptions.ts#L84)

---

### marketplaceAuthToken

• `Optional` **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceAuthToken](NeverminedAppOptions.md#marketplaceauthtoken)

#### Defined in

[src/models/NeverminedOptions.ts:41](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/models/NeverminedOptions.ts#L41)

---

### marketplaceUri

• **marketplaceUri**: `string` = `'https://marketplace-api.testing.nevermined.app'`

URL to the MarketPlace API use to record some Nevermined assets metadata. In a Nevermined network there could be
multiple Marketplace API instances. Each of them typically records the metadata of a specific domain/vertical deployed on a Nevermined network.

**`See`**

https://docs.nevermined.io/docs/architecture/marketplace-api/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceUri](NeverminedAppOptions.md#marketplaceuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:50](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L50)

---

### neverminedBackendUri

• **neverminedBackendUri**: `string` = `'https://one-backend.testing.nevermined.app'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedBackendUri](NeverminedAppOptions.md#neverminedbackenduri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:54](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L54)

---

### neverminedNodeAddress

• **neverminedNodeAddress**: `string` = `'0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc'`

The public address of the Nevermined Node.

**`See`**

[neverminedNodeUri](NeverminedOptions.md#neverminednodeuri)

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeAddress](NeverminedAppOptions.md#neverminednodeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:53](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L53)

---

### neverminedNodeUri

• **neverminedNodeUri**: `string` = `'https://node.testing.nevermined.app'`

URL to an existing Nevermined Node. A Nevermined network can have multiple running Nodes.
Each of them facilitate the access control and the data and infrastructure interaction with web2 elements.

**`See`**

https://docs.nevermined.io/docs/architecture/node/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeUri](NeverminedAppOptions.md#neverminednodeuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:52](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L52)

---

### nftContractCreditsAddress

• **nftContractCreditsAddress**: `string` = `'0xb1c2237d0a2b32da39b9a1cdff4a1e6429c0fe52'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractCreditsAddress](NeverminedAppOptions.md#nftcontractcreditsaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:59](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L59)

---

### nftContractTimeAddress

• **nftContractTimeAddress**: `string` = `'0x1bcA156f746C6Eb8b18d61654293e2Fc5b653fF5'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractTimeAddress](NeverminedAppOptions.md#nftcontracttimeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:58](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L58)

---

### tokenAddress

• **tokenAddress**: `string` = `'0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[tokenAddress](NeverminedAppOptions.md#tokenaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:60](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L60)

---

### verbose

• **verbose**: `boolean` = `true`

Log level.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[verbose](NeverminedAppOptions.md#verbose)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:55](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L55)

---

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[web3Provider](NeverminedAppOptions.md#web3provider)

#### Defined in

[src/models/NeverminedOptions.ts:46](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/models/NeverminedOptions.ts#L46)

---

### web3ProviderUri

• **web3ProviderUri**: `undefined` \| `string`

Ethereum Web3 Provider URL. This Url allows the SDK to connect to a blockchain.
This provider depends on the network where you want to connect (Ethereum Mainnet, Rinkeby, Polygon Matic, etc).
It's possible to use a public available provider or a private/paid one like Infura, Alchemy, etc.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[web3ProviderUri](NeverminedAppOptions.md#web3provideruri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:49](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/nevermined/resources/AppNetworks.ts#L49)

---

### zeroDevProjectId

• `Optional` **zeroDevProjectId**: `string`

ZeroDev project id

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[zeroDevProjectId](NeverminedAppOptions.md#zerodevprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:94](https://github.com/nevermined-io/sdk-js/blob/a526f8f91dd570a90afee06fd5e4f65189b252b8/src/models/NeverminedOptions.ts#L94)
