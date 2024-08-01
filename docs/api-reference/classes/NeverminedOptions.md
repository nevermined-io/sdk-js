[@nevermined-io/sdk - v3.0.22](../code-reference.md) / NeverminedOptions

# Class: NeverminedOptions

## Table of contents

### Constructors

- [constructor](NeverminedOptions.md#constructor)

### Properties

- [accounts](NeverminedOptions.md#accounts)
- [appUrl](NeverminedOptions.md#appurl)
- [artifactsFolder](NeverminedOptions.md#artifactsfolder)
- [chainId](NeverminedOptions.md#chainid)
- [circuitsFolder](NeverminedOptions.md#circuitsfolder)
- [contractsVersion](NeverminedOptions.md#contractsversion)
- [gasMultiplier](NeverminedOptions.md#gasmultiplier)
- [gasStationUri](NeverminedOptions.md#gasstationuri)
- [graphHttpUri](NeverminedOptions.md#graphhttpuri)
- [ipfsGateway](NeverminedOptions.md#ipfsgateway)
- [ipfsProjectId](NeverminedOptions.md#ipfsprojectid)
- [ipfsProjectSecret](NeverminedOptions.md#ipfsprojectsecret)
- [marketplaceAuthToken](NeverminedOptions.md#marketplaceauthtoken)
- [marketplaceUri](NeverminedOptions.md#marketplaceuri)
- [neverminedNodeAddress](NeverminedOptions.md#neverminednodeaddress)
- [neverminedNodeUri](NeverminedOptions.md#neverminednodeuri)
- [verbose](NeverminedOptions.md#verbose)
- [web3Provider](NeverminedOptions.md#web3provider)
- [web3ProviderUri](NeverminedOptions.md#web3provideruri)
- [zeroDevProjectId](NeverminedOptions.md#zerodevprojectid)

## Constructors

### constructor

• **new NeverminedOptions**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

## Properties

### accounts

• `Optional` **accounts**: [`NvmAccount`](NvmAccount.md)[]

#### Defined in

[src/models/NeverminedOptions.ts:73](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L73)

---

### appUrl

• `Optional` **appUrl**: `string`

The Nevermined App URL.

#### Defined in

[src/models/NeverminedOptions.ts:16](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L16)

---

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Defined in

[src/models/NeverminedOptions.ts:67](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L67)

---

### chainId

• `Optional` **chainId**: `number`

#### Defined in

[src/models/NeverminedOptions.ts:5](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L5)

---

### circuitsFolder

• `Optional` **circuitsFolder**: `string`

The folder where the nevermined contract circuits are located.

#### Defined in

[src/models/NeverminedOptions.ts:71](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L71)

---

### contractsVersion

• `Optional` **contractsVersion**: `string`

Contracts version

#### Defined in

[src/models/NeverminedOptions.ts:99](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L99)

---

### gasMultiplier

• `Optional` **gasMultiplier**: `number`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Defined in

[src/models/NeverminedOptions.ts:57](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L57)

---

### gasStationUri

• `Optional` **gasStationUri**: `string`

Use a gas station to calculate transaction fees

#### Defined in

[src/models/NeverminedOptions.ts:89](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L89)

---

### graphHttpUri

• `Optional` **graphHttpUri**: `string`

Enpoint for the graph-node http query

#### Defined in

[src/models/NeverminedOptions.ts:62](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L62)

---

### ipfsGateway

• `Optional` **ipfsGateway**: `string` = `'https://ipfs.io'`

IPFS variables enable the resolution of DDOs (via `assets.resolve`) from CID urls
INFO: For performance purposes, it is recommended to setup a IPFS Infura endpoint to accelerate
the asset resolution requests.

#### Defined in

[src/models/NeverminedOptions.ts:80](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L80)

---

### ipfsProjectId

• `Optional` **ipfsProjectId**: `string`

#### Defined in

[src/models/NeverminedOptions.ts:82](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L82)

---

### ipfsProjectSecret

• `Optional` **ipfsProjectSecret**: `string`

#### Defined in

[src/models/NeverminedOptions.ts:84](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L84)

---

### marketplaceAuthToken

• `Optional` **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Defined in

[src/models/NeverminedOptions.ts:41](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L41)

---

### marketplaceUri

• **marketplaceUri**: `string`

URL to the MarketPlace API use to record some Nevermined assets metadata. In a Nevermined network there could be
multiple Marketplace API instances. Each of them typically records the metadata of a specific domain/vertical deployed on a Nevermined network.

**`See`**

https://docs.nevermined.io/docs/architecture/marketplace-api/

#### Defined in

[src/models/NeverminedOptions.ts:23](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L23)

---

### neverminedNodeAddress

• `Optional` **neverminedNodeAddress**: `string`

The public address of the Nevermined Node.

**`See`**

[neverminedNodeUri](NeverminedOptions.md#neverminednodeuri)

#### Defined in

[src/models/NeverminedOptions.ts:36](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L36)

---

### neverminedNodeUri

• **neverminedNodeUri**: `string`

URL to an existing Nevermined Node. A Nevermined network can have multiple running Nodes.
Each of them facilitate the access control and the data and infrastructure interaction with web2 elements.

**`See`**

https://docs.nevermined.io/docs/architecture/node/

#### Defined in

[src/models/NeverminedOptions.ts:30](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L30)

---

### verbose

• `Optional` **verbose**: `boolean` \| [`LogLevel`](../enums/LogLevel.md)

Log level.

#### Defined in

[src/models/NeverminedOptions.ts:51](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L51)

---

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Defined in

[src/models/NeverminedOptions.ts:46](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L46)

---

### web3ProviderUri

• `Optional` **web3ProviderUri**: `string`

Ethereum Web3 Provider URL. This Url allows the SDK to connect to a blockchain.
This provider depends on the network where you want to connect (Ethereum Mainnet, Rinkeby, Polygon Matic, etc).
It's possible to use a public available provider or a private/paid one like Infura, Alchemy, etc.

#### Defined in

[src/models/NeverminedOptions.ts:11](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L11)

---

### zeroDevProjectId

• `Optional` **zeroDevProjectId**: `string`

ZeroDev project id

#### Defined in

[src/models/NeverminedOptions.ts:94](https://github.com/nevermined-io/sdk-js/blob/362ec9def8e214a7107b1963f195c6d6585b9876/src/models/NeverminedOptions.ts#L94)
