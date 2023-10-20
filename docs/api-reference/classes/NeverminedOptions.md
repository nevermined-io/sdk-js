[@nevermined-io/sdk](../code-reference.md) / NeverminedOptions

# Class: NeverminedOptions

## Table of contents

### Constructors

- [constructor](NeverminedOptions.md#constructor)

### Properties

- [aaveConfig](NeverminedOptions.md#aaveconfig)
- [accounts](NeverminedOptions.md#accounts)
- [artifactsFolder](NeverminedOptions.md#artifactsfolder)
- [circuitsFolder](NeverminedOptions.md#circuitsfolder)
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

## Constructors

### constructor

• **new NeverminedOptions**()

## Properties

### aaveConfig

• `Optional` **aaveConfig**: [`AaveConfig`](../interfaces/AaveConfig.md)

#### Defined in

[src/models/NeverminedOptions.ts:58](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L58)

---

### accounts

• `Optional` **accounts**: `Signer`[]

#### Defined in

[src/models/NeverminedOptions.ts:69](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L69)

---

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Defined in

[src/models/NeverminedOptions.ts:63](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L63)

---

### circuitsFolder

• `Optional` **circuitsFolder**: `string`

The folder where the nevermined contract circuits are located.

#### Defined in

[src/models/NeverminedOptions.ts:67](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L67)

---

### gasMultiplier

• `Optional` **gasMultiplier**: `number`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Defined in

[src/models/NeverminedOptions.ts:51](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L51)

---

### gasStationUri

• `Optional` **gasStationUri**: `string`

Use a gas station to calculate transaction fees

#### Defined in

[src/models/NeverminedOptions.ts:85](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L85)

---

### graphHttpUri

• `Optional` **graphHttpUri**: `string`

Enpoint for the graph-node http query

#### Defined in

[src/models/NeverminedOptions.ts:56](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L56)

---

### ipfsGateway

• `Optional` **ipfsGateway**: `string` = `'https://ipfs.io'`

IPFS variables enable the resolution of DDOs (via `assets.resolve`) from CID urls
INFO: For performance purposes, it is recommended to setup a IPFS Infura endpoint to accelerate
the asset resolution requests.

#### Defined in

[src/models/NeverminedOptions.ts:76](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L76)

---

### ipfsProjectId

• `Optional` **ipfsProjectId**: `string`

#### Defined in

[src/models/NeverminedOptions.ts:78](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L78)

---

### ipfsProjectSecret

• `Optional` **ipfsProjectSecret**: `string`

#### Defined in

[src/models/NeverminedOptions.ts:80](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L80)

---

### marketplaceAuthToken

• `Optional` **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Defined in

[src/models/NeverminedOptions.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L35)

---

### marketplaceUri

• **marketplaceUri**: `string`

URL to the MarketPlace API use to record some Nevermined assets metadata. In a Nevermined network there could be
multiple Marketplace API instances. Each of them typically records the metadata of a specific domain/vertical deployed on a Nevermined network.

**`See`**

https://docs.nevermined.io/docs/architecture/marketplace-api/

#### Defined in

[src/models/NeverminedOptions.ts:17](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L17)

---

### neverminedNodeAddress

• `Optional` **neverminedNodeAddress**: `string`

The public address of the Nevermined Node.

**`See`**

[neverminedNodeUri](NeverminedOptions.md#neverminednodeuri)

#### Defined in

[src/models/NeverminedOptions.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L30)

---

### neverminedNodeUri

• **neverminedNodeUri**: `string`

URL to an existing Nevermined Node. A Nevermined network can have multiple running Nodes.
Each of them facilitate the access control and the data and infrastructure interaction with web2 elements.

**`See`**

https://docs.nevermined.io/docs/architecture/node/

#### Defined in

[src/models/NeverminedOptions.ts:24](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L24)

---

### verbose

• `Optional` **verbose**: `boolean` \| [`LogLevel`](../enums/LogLevel.md)

Log level.

#### Defined in

[src/models/NeverminedOptions.ts:45](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L45)

---

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Defined in

[src/models/NeverminedOptions.ts:40](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L40)

---

### web3ProviderUri

• `Optional` **web3ProviderUri**: `string`

Ethereum Web3 Provider URL. This Url allows the SDK to connect to a blockchain.
This provider depends on the network where you want to connect (Ethereum Mainnet, Rinkeby, Polygon Matic, etc).
It's possible to use a public available provider or a private/paid one like Infura, Alchemy, etc.

#### Defined in

[src/models/NeverminedOptions.ts:11](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/models/NeverminedOptions.ts#L11)
