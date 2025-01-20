[@nevermined-io/sdk - v3.0.48](../code-reference.md) / AppDeploymentStaging

# Class: AppDeploymentStaging

## Hierarchy

- [`NeverminedAppOptions`](NeverminedAppOptions.md)

  ↳ **`AppDeploymentStaging`**

## Table of contents

### Constructors

- [constructor](AppDeploymentStaging.md#constructor)

### Properties

- [accounts](AppDeploymentStaging.md#accounts)
- [appUrl](AppDeploymentStaging.md#appurl)
- [artifactsFolder](AppDeploymentStaging.md#artifactsfolder)
- [chainId](AppDeploymentStaging.md#chainid)
- [circuitsFolder](AppDeploymentStaging.md#circuitsfolder)
- [contractsVersion](AppDeploymentStaging.md#contractsversion)
- [gasMultiplier](AppDeploymentStaging.md#gasmultiplier)
- [gasPriceMultiplier](AppDeploymentStaging.md#gaspricemultiplier)
- [gasStationUri](AppDeploymentStaging.md#gasstationuri)
- [graphHttpUri](AppDeploymentStaging.md#graphhttpuri)
- [instanceName](AppDeploymentStaging.md#instancename)
- [ipfsGateway](AppDeploymentStaging.md#ipfsgateway)
- [ipfsProjectId](AppDeploymentStaging.md#ipfsprojectid)
- [ipfsProjectSecret](AppDeploymentStaging.md#ipfsprojectsecret)
- [marketplaceAuthToken](AppDeploymentStaging.md#marketplaceauthtoken)
- [marketplaceUri](AppDeploymentStaging.md#marketplaceuri)
- [neverminedBackendUri](AppDeploymentStaging.md#neverminedbackenduri)
- [neverminedNodeAddress](AppDeploymentStaging.md#neverminednodeaddress)
- [neverminedNodeUri](AppDeploymentStaging.md#neverminednodeuri)
- [nftContractCreditsAddress](AppDeploymentStaging.md#nftcontractcreditsaddress)
- [nftContractTimeAddress](AppDeploymentStaging.md#nftcontracttimeaddress)
- [tokenAddress](AppDeploymentStaging.md#tokenaddress)
- [verbose](AppDeploymentStaging.md#verbose)
- [web3Provider](AppDeploymentStaging.md#web3provider)
- [web3ProviderUri](AppDeploymentStaging.md#web3provideruri)
- [zeroDevProjectId](AppDeploymentStaging.md#zerodevprojectid)

## Constructors

### constructor

• **new AppDeploymentStaging**(): [`AppDeploymentStaging`](AppDeploymentStaging.md)

#### Returns

[`AppDeploymentStaging`](AppDeploymentStaging.md)

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[constructor](NeverminedAppOptions.md#constructor)

## Properties

### accounts

• `Optional` **accounts**: [`NvmAccount`](NvmAccount.md)[]

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[accounts](NeverminedAppOptions.md#accounts)

#### Defined in

[src/models/NeverminedOptions.ts:73](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/models/NeverminedOptions.ts#L73)

---

### appUrl

• **appUrl**: `string` = `'https://staging.nevermined.app'`

The Nevermined App URL.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[appUrl](NeverminedAppOptions.md#appurl)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:29](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L29)

---

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[artifactsFolder](NeverminedAppOptions.md#artifactsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:67](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/models/NeverminedOptions.ts#L67)

---

### chainId

• **chainId**: `number` = `421614`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[chainId](NeverminedAppOptions.md#chainid)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:30](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L30)

---

### circuitsFolder

• `Optional` **circuitsFolder**: `string`

The folder where the nevermined contract circuits are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[circuitsFolder](NeverminedAppOptions.md#circuitsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:71](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/models/NeverminedOptions.ts#L71)

---

### contractsVersion

• `Optional` **contractsVersion**: `string`

Contracts version

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[contractsVersion](NeverminedAppOptions.md#contractsversion)

#### Defined in

[src/models/NeverminedOptions.ts:99](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/models/NeverminedOptions.ts#L99)

---

### gasMultiplier

• **gasMultiplier**: `number` = `0`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[gasMultiplier](NeverminedAppOptions.md#gasmultiplier)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:38](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L38)

---

### gasPriceMultiplier

• **gasPriceMultiplier**: `number` = `0`

#### Defined in

[src/nevermined/resources/AppNetworks.ts:39](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L39)

---

### gasStationUri

• `Optional` **gasStationUri**: `string`

Use a gas station to calculate transaction fees

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[gasStationUri](NeverminedAppOptions.md#gasstationuri)

#### Defined in

[src/models/NeverminedOptions.ts:89](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/models/NeverminedOptions.ts#L89)

---

### graphHttpUri

• **graphHttpUri**: `string` = `'https://api.studio.thegraph.com/query/78072/public'`

Enpoint for the graph-node http query

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[graphHttpUri](NeverminedAppOptions.md#graphhttpuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:33](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L33)

---

### instanceName

• **instanceName**: `string` = `'appStaging'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[instanceName](NeverminedAppOptions.md#instancename)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:28](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L28)

---

### ipfsGateway

• `Optional` **ipfsGateway**: `string` = `'https://ipfs.io'`

IPFS variables enable the resolution of DDOs (via `assets.resolve`) from CID urls
INFO: For performance purposes, it is recommended to setup a IPFS Infura endpoint to accelerate
the asset resolution requests.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsGateway](NeverminedAppOptions.md#ipfsgateway)

#### Defined in

[src/models/NeverminedOptions.ts:80](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/models/NeverminedOptions.ts#L80)

---

### ipfsProjectId

• `Optional` **ipfsProjectId**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectId](NeverminedAppOptions.md#ipfsprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:82](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/models/NeverminedOptions.ts#L82)

---

### ipfsProjectSecret

• `Optional` **ipfsProjectSecret**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectSecret](NeverminedAppOptions.md#ipfsprojectsecret)

#### Defined in

[src/models/NeverminedOptions.ts:84](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/models/NeverminedOptions.ts#L84)

---

### marketplaceAuthToken

• `Optional` **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceAuthToken](NeverminedAppOptions.md#marketplaceauthtoken)

#### Defined in

[src/models/NeverminedOptions.ts:41](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/models/NeverminedOptions.ts#L41)

---

### marketplaceUri

• **marketplaceUri**: `string` = `'https://marketplace-api.staging.nevermined.app'`

URL to the MarketPlace API use to record some Nevermined assets metadata. In a Nevermined network there could be
multiple Marketplace API instances. Each of them typically records the metadata of a specific domain/vertical deployed on a Nevermined network.

**`See`**

https://docs.nevermined.io/docs/architecture/marketplace-api/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceUri](NeverminedAppOptions.md#marketplaceuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:32](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L32)

---

### neverminedBackendUri

• **neverminedBackendUri**: `string` = `'https://one-backend.staging.nevermined.app'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedBackendUri](NeverminedAppOptions.md#neverminedbackenduri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:36](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L36)

---

### neverminedNodeAddress

• **neverminedNodeAddress**: `string` = `'0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc'`

The public address of the Nevermined Node.

**`See`**

[neverminedNodeUri](NeverminedOptions.md#neverminednodeuri)

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeAddress](NeverminedAppOptions.md#neverminednodeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:35](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L35)

---

### neverminedNodeUri

• **neverminedNodeUri**: `string` = `'https://node.staging.nevermined.app'`

URL to an existing Nevermined Node. A Nevermined network can have multiple running Nodes.
Each of them facilitate the access control and the data and infrastructure interaction with web2 elements.

**`See`**

https://docs.nevermined.io/docs/architecture/node/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeUri](NeverminedAppOptions.md#neverminednodeuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:34](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L34)

---

### nftContractCreditsAddress

• **nftContractCreditsAddress**: `string` = `'0x8ad59c91ae13a63adaea23770a9c013c632ad648'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractCreditsAddress](NeverminedAppOptions.md#nftcontractcreditsaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:41](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L41)

---

### nftContractTimeAddress

• **nftContractTimeAddress**: `string` = `'0x1bcA156f746C6Eb8b18d61654293e2Fc5b653fF5'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractTimeAddress](NeverminedAppOptions.md#nftcontracttimeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:40](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L40)

---

### tokenAddress

• **tokenAddress**: `string` = `'0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[tokenAddress](NeverminedAppOptions.md#tokenaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:42](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L42)

---

### verbose

• **verbose**: `boolean` = `true`

Log level.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[verbose](NeverminedAppOptions.md#verbose)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:37](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L37)

---

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[web3Provider](NeverminedAppOptions.md#web3provider)

#### Defined in

[src/models/NeverminedOptions.ts:46](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/models/NeverminedOptions.ts#L46)

---

### web3ProviderUri

• **web3ProviderUri**: `undefined` \| `string`

Ethereum Web3 Provider URL. This Url allows the SDK to connect to a blockchain.
This provider depends on the network where you want to connect (Ethereum Mainnet, Rinkeby, Polygon Matic, etc).
It's possible to use a public available provider or a private/paid one like Infura, Alchemy, etc.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[web3ProviderUri](NeverminedAppOptions.md#web3provideruri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:31](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/nevermined/resources/AppNetworks.ts#L31)

---

### zeroDevProjectId

• `Optional` **zeroDevProjectId**: `string`

ZeroDev project id

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[zeroDevProjectId](NeverminedAppOptions.md#zerodevprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:94](https://github.com/nevermined-io/sdk-js/blob/3dcdc40df4b696818df973436cd5db5f9720688a/src/models/NeverminedOptions.ts#L94)
