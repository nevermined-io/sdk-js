[@nevermined-io/sdk - v3.0.33](../code-reference.md) / AppDeploymentPeaq

# Class: AppDeploymentPeaq

## Hierarchy

- [`NeverminedAppOptions`](NeverminedAppOptions.md)

  ↳ **`AppDeploymentPeaq`**

## Table of contents

### Constructors

- [constructor](AppDeploymentPeaq.md#constructor)

### Properties

- [accounts](AppDeploymentPeaq.md#accounts)
- [appUrl](AppDeploymentPeaq.md#appurl)
- [artifactsFolder](AppDeploymentPeaq.md#artifactsfolder)
- [chainId](AppDeploymentPeaq.md#chainid)
- [circuitsFolder](AppDeploymentPeaq.md#circuitsfolder)
- [contractsVersion](AppDeploymentPeaq.md#contractsversion)
- [gasMultiplier](AppDeploymentPeaq.md#gasmultiplier)
- [gasPriceMultiplier](AppDeploymentPeaq.md#gaspricemultiplier)
- [gasStationUri](AppDeploymentPeaq.md#gasstationuri)
- [graphHttpUri](AppDeploymentPeaq.md#graphhttpuri)
- [instanceName](AppDeploymentPeaq.md#instancename)
- [ipfsGateway](AppDeploymentPeaq.md#ipfsgateway)
- [ipfsProjectId](AppDeploymentPeaq.md#ipfsprojectid)
- [ipfsProjectSecret](AppDeploymentPeaq.md#ipfsprojectsecret)
- [marketplaceAuthToken](AppDeploymentPeaq.md#marketplaceauthtoken)
- [marketplaceUri](AppDeploymentPeaq.md#marketplaceuri)
- [neverminedBackendUri](AppDeploymentPeaq.md#neverminedbackenduri)
- [neverminedNodeAddress](AppDeploymentPeaq.md#neverminednodeaddress)
- [neverminedNodeUri](AppDeploymentPeaq.md#neverminednodeuri)
- [nftContractCreditsAddress](AppDeploymentPeaq.md#nftcontractcreditsaddress)
- [nftContractTimeAddress](AppDeploymentPeaq.md#nftcontracttimeaddress)
- [tokenAddress](AppDeploymentPeaq.md#tokenaddress)
- [verbose](AppDeploymentPeaq.md#verbose)
- [web3Provider](AppDeploymentPeaq.md#web3provider)
- [web3ProviderUri](AppDeploymentPeaq.md#web3provideruri)
- [zeroDevProjectId](AppDeploymentPeaq.md#zerodevprojectid)

## Constructors

### constructor

• **new AppDeploymentPeaq**(): [`AppDeploymentPeaq`](AppDeploymentPeaq.md)

#### Returns

[`AppDeploymentPeaq`](AppDeploymentPeaq.md)

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[constructor](NeverminedAppOptions.md#constructor)

## Properties

### accounts

• `Optional` **accounts**: [`NvmAccount`](NvmAccount.md)[]

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[accounts](NeverminedAppOptions.md#accounts)

#### Defined in

[src/models/NeverminedOptions.ts:73](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/models/NeverminedOptions.ts#L73)

---

### appUrl

• **appUrl**: `string` = `'https://peaq.nevermined.app'`

The Nevermined App URL.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[appUrl](NeverminedAppOptions.md#appurl)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:173](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L173)

---

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[artifactsFolder](NeverminedAppOptions.md#artifactsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:67](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/models/NeverminedOptions.ts#L67)

---

### chainId

• **chainId**: `number` = `3338`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[chainId](NeverminedAppOptions.md#chainid)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:174](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L174)

---

### circuitsFolder

• `Optional` **circuitsFolder**: `string`

The folder where the nevermined contract circuits are located.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[circuitsFolder](NeverminedAppOptions.md#circuitsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:71](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/models/NeverminedOptions.ts#L71)

---

### contractsVersion

• `Optional` **contractsVersion**: `string`

Contracts version

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[contractsVersion](NeverminedAppOptions.md#contractsversion)

#### Defined in

[src/models/NeverminedOptions.ts:99](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/models/NeverminedOptions.ts#L99)

---

### gasMultiplier

• **gasMultiplier**: `number` = `0`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[gasMultiplier](NeverminedAppOptions.md#gasmultiplier)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:182](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L182)

---

### gasPriceMultiplier

• **gasPriceMultiplier**: `number` = `0`

#### Defined in

[src/nevermined/resources/AppNetworks.ts:183](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L183)

---

### gasStationUri

• `Optional` **gasStationUri**: `string`

Use a gas station to calculate transaction fees

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[gasStationUri](NeverminedAppOptions.md#gasstationuri)

#### Defined in

[src/models/NeverminedOptions.ts:89](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/models/NeverminedOptions.ts#L89)

---

### graphHttpUri

• **graphHttpUri**: `string` = `'https://api.studio.thegraph.com/query/78075/public'`

Enpoint for the graph-node http query

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[graphHttpUri](NeverminedAppOptions.md#graphhttpuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:177](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L177)

---

### instanceName

• **instanceName**: `string` = `'appPeaq'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[instanceName](NeverminedAppOptions.md#instancename)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:172](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L172)

---

### ipfsGateway

• `Optional` **ipfsGateway**: `string` = `'https://ipfs.io'`

IPFS variables enable the resolution of DDOs (via `assets.resolve`) from CID urls
INFO: For performance purposes, it is recommended to setup a IPFS Infura endpoint to accelerate
the asset resolution requests.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsGateway](NeverminedAppOptions.md#ipfsgateway)

#### Defined in

[src/models/NeverminedOptions.ts:80](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/models/NeverminedOptions.ts#L80)

---

### ipfsProjectId

• `Optional` **ipfsProjectId**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectId](NeverminedAppOptions.md#ipfsprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:82](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/models/NeverminedOptions.ts#L82)

---

### ipfsProjectSecret

• `Optional` **ipfsProjectSecret**: `string`

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[ipfsProjectSecret](NeverminedAppOptions.md#ipfsprojectsecret)

#### Defined in

[src/models/NeverminedOptions.ts:84](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/models/NeverminedOptions.ts#L84)

---

### marketplaceAuthToken

• `Optional` **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceAuthToken](NeverminedAppOptions.md#marketplaceauthtoken)

#### Defined in

[src/models/NeverminedOptions.ts:41](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/models/NeverminedOptions.ts#L41)

---

### marketplaceUri

• **marketplaceUri**: `string` = `'https://marketplace-api.peaq.nevermined.app'`

URL to the MarketPlace API use to record some Nevermined assets metadata. In a Nevermined network there could be
multiple Marketplace API instances. Each of them typically records the metadata of a specific domain/vertical deployed on a Nevermined network.

**`See`**

https://docs.nevermined.io/docs/architecture/marketplace-api/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[marketplaceUri](NeverminedAppOptions.md#marketplaceuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:176](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L176)

---

### neverminedBackendUri

• **neverminedBackendUri**: `string` = `'https://one-backend.peaq.nevermined.app'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedBackendUri](NeverminedAppOptions.md#neverminedbackenduri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:180](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L180)

---

### neverminedNodeAddress

• **neverminedNodeAddress**: `string` = `'0x824dbcE5E9C96C5b8ce2A35a25a5ab87eD1D00b1'`

The public address of the Nevermined Node.

**`See`**

[neverminedNodeUri](NeverminedOptions.md#neverminednodeuri)

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeAddress](NeverminedAppOptions.md#neverminednodeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:179](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L179)

---

### neverminedNodeUri

• **neverminedNodeUri**: `string` = `'https://node.peaq.nevermined.app'`

URL to an existing Nevermined Node. A Nevermined network can have multiple running Nodes.
Each of them facilitate the access control and the data and infrastructure interaction with web2 elements.

**`See`**

https://docs.nevermined.io/docs/architecture/node/

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[neverminedNodeUri](NeverminedAppOptions.md#neverminednodeuri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:178](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L178)

---

### nftContractCreditsAddress

• **nftContractCreditsAddress**: `string` = `'0xE24f60aE42F7Cc3B3357480C94165afD86B66583'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractCreditsAddress](NeverminedAppOptions.md#nftcontractcreditsaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:185](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L185)

---

### nftContractTimeAddress

• **nftContractTimeAddress**: `string` = `'0xE24f60aE42F7Cc3B3357480C94165afD86B66583'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[nftContractTimeAddress](NeverminedAppOptions.md#nftcontracttimeaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:184](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L184)

---

### tokenAddress

• **tokenAddress**: `string` = `'0x0000000000000000000000000000000000000000'`

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[tokenAddress](NeverminedAppOptions.md#tokenaddress)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:186](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L186)

---

### verbose

• **verbose**: `boolean` = `true`

Log level.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[verbose](NeverminedAppOptions.md#verbose)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:181](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L181)

---

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[web3Provider](NeverminedAppOptions.md#web3provider)

#### Defined in

[src/models/NeverminedOptions.ts:46](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/models/NeverminedOptions.ts#L46)

---

### web3ProviderUri

• **web3ProviderUri**: `undefined` \| `string`

Ethereum Web3 Provider URL. This Url allows the SDK to connect to a blockchain.
This provider depends on the network where you want to connect (Ethereum Mainnet, Rinkeby, Polygon Matic, etc).
It's possible to use a public available provider or a private/paid one like Infura, Alchemy, etc.

#### Overrides

[NeverminedAppOptions](NeverminedAppOptions.md).[web3ProviderUri](NeverminedAppOptions.md#web3provideruri)

#### Defined in

[src/nevermined/resources/AppNetworks.ts:175](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/nevermined/resources/AppNetworks.ts#L175)

---

### zeroDevProjectId

• `Optional` **zeroDevProjectId**: `string`

ZeroDev project id

#### Inherited from

[NeverminedAppOptions](NeverminedAppOptions.md).[zeroDevProjectId](NeverminedAppOptions.md#zerodevprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:94](https://github.com/nevermined-io/sdk-js/blob/3d639fcb0e672437e35812b11fb840dbd7e96061/src/models/NeverminedOptions.ts#L94)
