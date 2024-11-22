[@nevermined-io/sdk - v3.0.43](../code-reference.md) / NeverminedAppOptions

# Class: NeverminedAppOptions

## Hierarchy

- [`NeverminedOptions`](NeverminedOptions.md)

  ↳ **`NeverminedAppOptions`**

  ↳↳ [`AppDeploymentLocal`](AppDeploymentLocal.md)

  ↳↳ [`AppDeploymentStaging`](AppDeploymentStaging.md)

  ↳↳ [`AppDeploymentTesting`](AppDeploymentTesting.md)

  ↳↳ [`AppDeploymentArbitrum`](AppDeploymentArbitrum.md)

  ↳↳ [`AppDeploymentGnosis`](AppDeploymentGnosis.md)

  ↳↳ [`AppDeploymentMatic`](AppDeploymentMatic.md)

  ↳↳ [`AppDeploymentBase`](AppDeploymentBase.md)

  ↳↳ [`AppDeploymentCelo`](AppDeploymentCelo.md)

  ↳↳ [`AppDeploymentOptimism`](AppDeploymentOptimism.md)

  ↳↳ [`AppDeploymentPeaq`](AppDeploymentPeaq.md)

## Table of contents

### Constructors

- [constructor](NeverminedAppOptions.md#constructor)

### Properties

- [accounts](NeverminedAppOptions.md#accounts)
- [appUrl](NeverminedAppOptions.md#appurl)
- [artifactsFolder](NeverminedAppOptions.md#artifactsfolder)
- [chainId](NeverminedAppOptions.md#chainid)
- [circuitsFolder](NeverminedAppOptions.md#circuitsfolder)
- [contractsVersion](NeverminedAppOptions.md#contractsversion)
- [gasMultiplier](NeverminedAppOptions.md#gasmultiplier)
- [gasStationUri](NeverminedAppOptions.md#gasstationuri)
- [graphHttpUri](NeverminedAppOptions.md#graphhttpuri)
- [instanceName](NeverminedAppOptions.md#instancename)
- [ipfsGateway](NeverminedAppOptions.md#ipfsgateway)
- [ipfsProjectId](NeverminedAppOptions.md#ipfsprojectid)
- [ipfsProjectSecret](NeverminedAppOptions.md#ipfsprojectsecret)
- [marketplaceAuthToken](NeverminedAppOptions.md#marketplaceauthtoken)
- [marketplaceUri](NeverminedAppOptions.md#marketplaceuri)
- [neverminedBackendUri](NeverminedAppOptions.md#neverminedbackenduri)
- [neverminedNodeAddress](NeverminedAppOptions.md#neverminednodeaddress)
- [neverminedNodeUri](NeverminedAppOptions.md#neverminednodeuri)
- [nftContractCreditsAddress](NeverminedAppOptions.md#nftcontractcreditsaddress)
- [nftContractTimeAddress](NeverminedAppOptions.md#nftcontracttimeaddress)
- [tokenAddress](NeverminedAppOptions.md#tokenaddress)
- [verbose](NeverminedAppOptions.md#verbose)
- [web3Provider](NeverminedAppOptions.md#web3provider)
- [web3ProviderUri](NeverminedAppOptions.md#web3provideruri)
- [zeroDevProjectId](NeverminedAppOptions.md#zerodevprojectid)

## Constructors

### constructor

• **new NeverminedAppOptions**(): [`NeverminedAppOptions`](NeverminedAppOptions.md)

#### Returns

[`NeverminedAppOptions`](NeverminedAppOptions.md)

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[constructor](NeverminedOptions.md#constructor)

## Properties

### accounts

• `Optional` **accounts**: [`NvmAccount`](NvmAccount.md)[]

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[accounts](NeverminedOptions.md#accounts)

#### Defined in

[src/models/NeverminedOptions.ts:73](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L73)

---

### appUrl

• `Optional` **appUrl**: `string`

The Nevermined App URL.

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[appUrl](NeverminedOptions.md#appurl)

#### Defined in

[src/models/NeverminedOptions.ts:16](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L16)

---

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[artifactsFolder](NeverminedOptions.md#artifactsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:67](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L67)

---

### chainId

• `Optional` **chainId**: `number`

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[chainId](NeverminedOptions.md#chainid)

#### Defined in

[src/models/NeverminedOptions.ts:5](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L5)

---

### circuitsFolder

• `Optional` **circuitsFolder**: `string`

The folder where the nevermined contract circuits are located.

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[circuitsFolder](NeverminedOptions.md#circuitsfolder)

#### Defined in

[src/models/NeverminedOptions.ts:71](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L71)

---

### contractsVersion

• `Optional` **contractsVersion**: `string`

Contracts version

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[contractsVersion](NeverminedOptions.md#contractsversion)

#### Defined in

[src/models/NeverminedOptions.ts:99](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L99)

---

### gasMultiplier

• `Optional` **gasMultiplier**: `number`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[gasMultiplier](NeverminedOptions.md#gasmultiplier)

#### Defined in

[src/models/NeverminedOptions.ts:57](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L57)

---

### gasStationUri

• `Optional` **gasStationUri**: `string`

Use a gas station to calculate transaction fees

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[gasStationUri](NeverminedOptions.md#gasstationuri)

#### Defined in

[src/models/NeverminedOptions.ts:89](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L89)

---

### graphHttpUri

• `Optional` **graphHttpUri**: `string`

Enpoint for the graph-node http query

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[graphHttpUri](NeverminedOptions.md#graphhttpuri)

#### Defined in

[src/models/NeverminedOptions.ts:62](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L62)

---

### instanceName

• **instanceName**: `string`

#### Defined in

[src/nevermined/resources/AppNetworks.ts:4](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/nevermined/resources/AppNetworks.ts#L4)

---

### ipfsGateway

• `Optional` **ipfsGateway**: `string` = `'https://ipfs.io'`

IPFS variables enable the resolution of DDOs (via `assets.resolve`) from CID urls
INFO: For performance purposes, it is recommended to setup a IPFS Infura endpoint to accelerate
the asset resolution requests.

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[ipfsGateway](NeverminedOptions.md#ipfsgateway)

#### Defined in

[src/models/NeverminedOptions.ts:80](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L80)

---

### ipfsProjectId

• `Optional` **ipfsProjectId**: `string`

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[ipfsProjectId](NeverminedOptions.md#ipfsprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:82](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L82)

---

### ipfsProjectSecret

• `Optional` **ipfsProjectSecret**: `string`

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[ipfsProjectSecret](NeverminedOptions.md#ipfsprojectsecret)

#### Defined in

[src/models/NeverminedOptions.ts:84](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L84)

---

### marketplaceAuthToken

• `Optional` **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[marketplaceAuthToken](NeverminedOptions.md#marketplaceauthtoken)

#### Defined in

[src/models/NeverminedOptions.ts:41](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L41)

---

### marketplaceUri

• **marketplaceUri**: `string`

URL to the MarketPlace API use to record some Nevermined assets metadata. In a Nevermined network there could be
multiple Marketplace API instances. Each of them typically records the metadata of a specific domain/vertical deployed on a Nevermined network.

**`See`**

https://docs.nevermined.io/docs/architecture/marketplace-api/

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[marketplaceUri](NeverminedOptions.md#marketplaceuri)

#### Defined in

[src/models/NeverminedOptions.ts:23](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L23)

---

### neverminedBackendUri

• `Optional` **neverminedBackendUri**: `string`

#### Defined in

[src/nevermined/resources/AppNetworks.ts:8](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/nevermined/resources/AppNetworks.ts#L8)

---

### neverminedNodeAddress

• `Optional` **neverminedNodeAddress**: `string`

The public address of the Nevermined Node.

**`See`**

[neverminedNodeUri](NeverminedOptions.md#neverminednodeuri)

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[neverminedNodeAddress](NeverminedOptions.md#neverminednodeaddress)

#### Defined in

[src/models/NeverminedOptions.ts:36](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L36)

---

### neverminedNodeUri

• **neverminedNodeUri**: `string`

URL to an existing Nevermined Node. A Nevermined network can have multiple running Nodes.
Each of them facilitate the access control and the data and infrastructure interaction with web2 elements.

**`See`**

https://docs.nevermined.io/docs/architecture/node/

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[neverminedNodeUri](NeverminedOptions.md#neverminednodeuri)

#### Defined in

[src/models/NeverminedOptions.ts:30](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L30)

---

### nftContractCreditsAddress

• `Optional` **nftContractCreditsAddress**: `string`

#### Defined in

[src/nevermined/resources/AppNetworks.ts:6](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/nevermined/resources/AppNetworks.ts#L6)

---

### nftContractTimeAddress

• `Optional` **nftContractTimeAddress**: `string`

#### Defined in

[src/nevermined/resources/AppNetworks.ts:5](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/nevermined/resources/AppNetworks.ts#L5)

---

### tokenAddress

• `Optional` **tokenAddress**: `string`

#### Defined in

[src/nevermined/resources/AppNetworks.ts:7](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/nevermined/resources/AppNetworks.ts#L7)

---

### verbose

• `Optional` **verbose**: `boolean` \| [`LogLevel`](../enums/LogLevel.md)

Log level.

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[verbose](NeverminedOptions.md#verbose)

#### Defined in

[src/models/NeverminedOptions.ts:51](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L51)

---

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[web3Provider](NeverminedOptions.md#web3provider)

#### Defined in

[src/models/NeverminedOptions.ts:46](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L46)

---

### web3ProviderUri

• `Optional` **web3ProviderUri**: `string`

Ethereum Web3 Provider URL. This Url allows the SDK to connect to a blockchain.
This provider depends on the network where you want to connect (Ethereum Mainnet, Rinkeby, Polygon Matic, etc).
It's possible to use a public available provider or a private/paid one like Infura, Alchemy, etc.

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[web3ProviderUri](NeverminedOptions.md#web3provideruri)

#### Defined in

[src/models/NeverminedOptions.ts:11](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L11)

---

### zeroDevProjectId

• `Optional` **zeroDevProjectId**: `string`

ZeroDev project id

#### Inherited from

[NeverminedOptions](NeverminedOptions.md).[zeroDevProjectId](NeverminedOptions.md#zerodevprojectid)

#### Defined in

[src/models/NeverminedOptions.ts:94](https://github.com/nevermined-io/sdk-js/blob/356dfb328fcf7cee010b48756ca205b2a854f0f8/src/models/NeverminedOptions.ts#L94)
