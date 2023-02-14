[@nevermined-io/sdk](../code-reference.md) / Config

# Class: Config

## Table of contents

### Constructors

- [constructor](Config.md#constructor)

### Properties

- [aaveConfig](Config.md#aaveconfig)
- [accounts](Config.md#accounts)
- [artifactsFolder](Config.md#artifactsfolder)
- [authMessage](Config.md#authmessage)
- [authTokenExpiration](Config.md#authtokenexpiration)
- [faucetUri](Config.md#fauceturi)
- [feeReceiver](Config.md#feereceiver)
- [gasMultiplier](Config.md#gasmultiplier)
- [neverminedNodeAddress](Config.md#neverminednodeaddress)
- [neverminedNodeUri](Config.md#neverminedNodeUri)
- [graphHttpUri](Config.md#graphhttpuri)
- [marketplaceAuthToken](Config.md#marketplaceauthtoken)
- [marketplaceUri](Config.md#marketplaceuri)
- [networkFee](Config.md#networkfee)
- [web3ProviderUri](Config.md#web3ProviderUri)
- [threshold](Config.md#threshold)
- [verbose](Config.md#verbose)
- [web3Provider](Config.md#web3provider)

## Constructors

### constructor

• **new Config**()

## Properties

### aaveConfig

• `Optional` **aaveConfig**: `AaveConfig`

#### Defined in

[src/models/Config.ts:71](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L71)

---

### accounts

• `Optional` **accounts**: `Signer`[]

#### Defined in

[src/models/Config.ts:78](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L78)

---

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Defined in

[src/models/Config.ts:76](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L76)

---

### authMessage

• `Optional` **authMessage**: `string`

Message shown when the user creates its own token.

#### Defined in

[src/models/Config.ts:51](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L51)

---

### authTokenExpiration

• `Optional` **authTokenExpiration**: `number`

Token expiration time in ms.

#### Defined in

[src/models/Config.ts:56](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L56)

---

### faucetUri

• `Optional` **faucetUri**: `string`

Faucet URL.

#### Defined in

[src/models/Config.ts:26](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L26)

---

### feeReceiver

• `Optional` **feeReceiver**: `string` = `ZeroAddress`

The address receiving the fee if this is higher than 0

#### Defined in

[src/models/Config.ts:90](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L90)

---

### gasMultiplier

• `Optional` **gasMultiplier**: `number`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Defined in

[src/models/Config.ts:64](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L64)

---

### neverminedNodeAddress

• `Optional` **neverminedNodeAddress**: `string`

Address of Nevermined Node.

#### Defined in

[src/models/Config.ts:31](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L31)

---

### neverminedNodeUri

• **neverminedNodeUri**: `string`

Nevermined Node URL.

#### Defined in

[src/models/Config.ts:21](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L21)

---

### graphHttpUri

• `Optional` **graphHttpUri**: `string`

Enpoint for the graph-node http query

#### Defined in

[src/models/Config.ts:69](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L69)

---

### marketplaceAuthToken

• `Optional` **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Defined in

[src/models/Config.ts:16](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L16)

---

### marketplaceUri

• **marketplaceUri**: `string`

MarketPlace URL.

#### Defined in

[src/models/Config.ts:11](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L11)

---

### networkFee

• `Optional` **networkFee**: `number` = `0`

The fee charged by Nevermined for using the Service Agreements

#### Defined in

[src/models/Config.ts:85](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L85)

---

### web3ProviderUri

• `Optional` **web3ProviderUri**: `string`

Ethereum node URL.

#### Defined in

[src/models/Config.ts:36](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L36)

---

### threshold

• `Optional` **threshold**: `number`

#### Defined in

[src/models/Config.ts:58](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L58)

---

### verbose

• `Optional` **verbose**: `boolean` \| [`LogLevel`](../enums/utils.LogLevel.md)

Log level.

#### Defined in

[src/models/Config.ts:46](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L46)

---

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Defined in

[src/models/Config.ts:41](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/models/Config.ts#L41)
