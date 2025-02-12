[@nevermined-io/sdk - v3.1.1](../code-reference.md) / AppDeploymentLocal

# Class: AppDeploymentLocal

## Hierarchy

- [`NeverminedAppOptions`](NeverminedAppOptions.md)

  ↳ **`AppDeploymentLocal`**

## Table of contents

### Constructors

- [constructor](AppDeploymentLocal.md#constructor)

### Properties

- [accounts](AppDeploymentLocal.md#accounts)
- [appUrl](AppDeploymentLocal.md#appurl)
- [artifactsFolder](AppDeploymentLocal.md#artifactsfolder)
- [chainId](AppDeploymentLocal.md#chainid)
- [circuitsFolder](AppDeploymentLocal.md#circuitsfolder)
- [contractsVersion](AppDeploymentLocal.md#contractsversion)
- [gasMultiplier](AppDeploymentLocal.md#gasmultiplier)
- [gasPriceMultiplier](AppDeploymentLocal.md#gaspricemultiplier)
- [gasStationUri](AppDeploymentLocal.md#gasstationuri)
- [graphHttpUri](AppDeploymentLocal.md#graphhttpuri)
- [instanceName](AppDeploymentLocal.md#instancename)
- [ipfsGateway](AppDeploymentLocal.md#ipfsgateway)
- [ipfsProjectId](AppDeploymentLocal.md#ipfsprojectid)
- [ipfsProjectSecret](AppDeploymentLocal.md#ipfsprojectsecret)
- [marketplaceAuthToken](AppDeploymentLocal.md#marketplaceauthtoken)
- [marketplaceUri](AppDeploymentLocal.md#marketplaceuri)
- [neverminedBackendUri](AppDeploymentLocal.md#neverminedbackenduri)
- [neverminedNodeAddress](AppDeploymentLocal.md#neverminednodeaddress)
- [neverminedNodeUri](AppDeploymentLocal.md#neverminednodeuri)
- [nftContractCreditsAddress](AppDeploymentLocal.md#nftcontractcreditsaddress)
- [nftContractTimeAddress](AppDeploymentLocal.md#nftcontracttimeaddress)
- [tokenAddress](AppDeploymentLocal.md#tokenaddress)
- [verbose](AppDeploymentLocal.md#verbose)
- [web3Provider](AppDeploymentLocal.md#web3provider)
- [web3ProviderUri](AppDeploymentLocal.md#web3provideruri)
- [zeroDevProjectId](AppDeploymentLocal.md#zerodevprojectid)

## Constructors

### constructor

• **new AppDeploymentLocal**(): [`AppDeploymentLocal`](AppDeploymentLocal.md)

#### Returns

[`AppDeploymentLocal`](AppDeploymentLocal.md)

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[constructor](NeverminedAppOptions.md#constructor)

## Properties

### accounts

• `Optional` **accounts**: [`NvmAccount`](NvmAccount.md)[]

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[accounts](NeverminedAppOptions.md#accounts)

#### Defined in

[src/models/NeverminedOptions.ts:73](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/models/NeverminedOptions.ts#L73)

---

### appUrl

• **appUrl**: `string` = `'http://localhost:3000'`

The Nevermined App URL.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[appUrl](NeverminedAppOptions.md#appurl)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:13](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L13)

---

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[artifactsFolder](NeverminedAppOptions.md#artifactsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:67](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/models/NeverminedOptions.ts#L67)

---

### chainId

• **chainId**: `number` = `1337`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[chainId](NeverminedAppOptions.md#chainid)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:14](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L14)

---

### circuitsFolder

• `Optional` **circuitsFolder**: `string`

The folder where the nevermined contract circuits are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[circuitsFolder](NeverminedAppOptions.md#circuitsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:71](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/models/NeverminedOptions.ts#L71)

---

### contractsVersion

• `Optional` **contractsVersion**: `string`

Contracts version

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[contractsVersion](NeverminedAppOptions.md#contractsversion)

#### Defined in

[src/models/NeverminedOptions.ts:99](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/models/NeverminedOptions.ts#L99)

---

### gasMultiplier

• **gasMultiplier**: `number` = `0`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[gasMultiplier](NeverminedAppOptions.md#gasmultiplier)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:21](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L21)

---

### gasPriceMultiplier

• **gasPriceMultiplier**: `number` = `0`

#### Defined in

[src/nevermined/resources/AppNetworks.ts:22](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L22)

---

### gasStationUri

• `Optional` **gasStationUri**: `string`

Use a gas station to calculate transaction fees

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[gasStationUri](NeverminedAppOptions.md#gasstationuri)

#### Defined in

[src/models/NeverminedOptions.ts:89](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/models/NeverminedOptions.ts#L89)

---

### graphHttpUri

• **graphHttpUri**: `undefined` = `undefined`

Enpoint for the graph-node http query

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[graphHttpUri](NeverminedAppOptions.md#graphhttpuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:17](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L17)

---

### instanceName

• **instanceName**: `string` = `'localnet'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[instanceName](NeverminedAppOptions.md#instancename)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:12](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L12)

---

### ipfsGateway

• `Optional` **ipfsGateway**: `string` = `'https://ipfs.io'`

IPFS variables enable the resolution of DDOs (via `assets.resolve`) from CID urls
INFO: For performance purposes, it is recommended to setup a IPFS Infura endpoint to accelerate
the asset resolution requests.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsGateway](NeverminedAppOptions.md#ipfsgateway)

#### Defined in

[src/models/NeverminedOptions.ts:80](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/models/NeverminedOptions.ts#L80)

---

### ipfsProjectId

• `Optional` **ipfsProjectId**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectId](NeverminedAppOptions.md#ipfsprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:82](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/models/NeverminedOptions.ts#L82)

---

### ipfsProjectSecret

• `Optional` **ipfsProjectSecret**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectSecret](NeverminedAppOptions.md#ipfsprojectsecret)

#### Defined in

[src/models/NeverminedOptions.ts:84](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/models/NeverminedOptions.ts#L84)

---

### marketplaceAuthToken

• `Optional` **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceAuthToken](NeverminedAppOptions.md#marketplaceauthtoken)

#### Defined in

[src/models/NeverminedOptions.ts:41](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/models/NeverminedOptions.ts#L41)

---

### marketplaceUri

• **marketplaceUri**: `string` = `'http://marketplace.nevermined.localnet'`

URL to the MarketPlace API use to record some Nevermined assets metadata. In a Nevermined network there could be
multiple Marketplace API instances. Each of them typically records the metadata of a specific domain/vertical deployed on a Nevermined network.

**`See`**

https://docs.nevermined.io/docs/architecture/marketplace-api/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceUri](NeverminedAppOptions.md#marketplaceuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:16](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L16)

---

### neverminedBackendUri

• `Optional` **neverminedBackendUri**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedBackendUri](NeverminedAppOptions.md#neverminedbackenduri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:8](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L8)

---

### neverminedNodeAddress

• **neverminedNodeAddress**: `string` = `'0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0'`

The public address of the Nevermined Node.

**`See`**

[neverminedNodeUri](NeverminedOptions.md#neverminednodeuri)

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeAddress](NeverminedAppOptions.md#neverminednodeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:19](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L19)

---

### neverminedNodeUri

• **neverminedNodeUri**: `string` = `'http://node.nevermined.localnet'`

URL to an existing Nevermined Node. A Nevermined network can have multiple running Nodes.
Each of them facilitate the access control and the data and infrastructure interaction with web2 elements.

**`See`**

https://docs.nevermined.io/docs/architecture/node/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeUri](NeverminedAppOptions.md#neverminednodeuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:18](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L18)

---

### nftContractCreditsAddress

• **nftContractCreditsAddress**: `undefined` = `undefined`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractCreditsAddress](NeverminedAppOptions.md#nftcontractcreditsaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:24](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L24)

---

### nftContractTimeAddress

• **nftContractTimeAddress**: `undefined` = `undefined`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractTimeAddress](NeverminedAppOptions.md#nftcontracttimeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:23](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L23)

---

### tokenAddress

• `Optional` **tokenAddress**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[tokenAddress](NeverminedAppOptions.md#tokenaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:7](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L7)

---

### verbose

• **verbose**: `boolean` = `true`

Log level.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[verbose](NeverminedAppOptions.md#verbose)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:20](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L20)

---

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[web3Provider](NeverminedAppOptions.md#web3provider)

#### Defined in

[src/models/NeverminedOptions.ts:46](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/models/NeverminedOptions.ts#L46)

---

### web3ProviderUri

• **web3ProviderUri**: `string` = `'http://contracts.nevermined.localnet'`

Ethereum Web3 Provider URL. This Url allows the SDK to connect to a blockchain.
This provider depends on the network where you want to connect (Ethereum Mainnet, Rinkeby, Polygon Matic, etc).
It's possible to use a public available provider or a private/paid one like Infura, Alchemy, etc.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[web3ProviderUri](NeverminedAppOptions.md#web3provideruri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:15](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/nevermined/resources/AppNetworks.ts#L15)

---

### zeroDevProjectId

• `Optional` **zeroDevProjectId**: `string`

ZeroDev project id

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[zeroDevProjectId](NeverminedAppOptions.md#zerodevprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:94](https://github.com/nevermined-io/sdk-js/blob/9319fcdb83e6987b924bbe35233879f79a0603bc/src/models/NeverminedOptions.ts#L94)
