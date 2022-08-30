[@nevermined-io/nevermined-sdk-js](../code-reference.md) / Config

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
- [gasMultiplier](Config.md#gasmultiplier)
- [gatewayAddress](Config.md#gatewayaddress)
- [gatewayUri](Config.md#gatewayuri)
- [graphHttpUri](Config.md#graphhttpuri)
- [marketplaceAuthToken](Config.md#marketplaceauthtoken)
- [marketplaceUri](Config.md#marketplaceuri)
- [nodeUri](Config.md#nodeuri)
- [secretStoreUri](Config.md#secretstoreuri)
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

[src/models/Config.ts:82](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L82)

___

### accounts

• `Optional` **accounts**: `Signer`[]

#### Defined in

[src/models/Config.ts:86](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L86)

___

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

#### Defined in

[src/models/Config.ts:84](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L84)

___

### authMessage

• `Optional` **authMessage**: `string`

Message shown when the user creates its own token.

#### Defined in

[src/models/Config.ts:65](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L65)

___

### authTokenExpiration

• `Optional` **authTokenExpiration**: `number`

Token expiration time in ms.

#### Defined in

[src/models/Config.ts:71](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L71)

___

### faucetUri

• **faucetUri**: `string`

Faucet URL.

#### Defined in

[src/models/Config.ts:29](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L29)

___

### gasMultiplier

• `Optional` **gasMultiplier**: `number`

#### Defined in

[src/models/Config.ts:75](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L75)

___

### gatewayAddress

• `Optional` **gatewayAddress**: `string`

Address of Gateway.

#### Defined in

[src/models/Config.ts:35](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L35)

___

### gatewayUri

• **gatewayUri**: `string`

Gateway URL.

#### Defined in

[src/models/Config.ts:23](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L23)

___

### graphHttpUri

• `Optional` **graphHttpUri**: `string`

Enpoint for the graph-node http query

#### Defined in

[src/models/Config.ts:80](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L80)

___

### marketplaceAuthToken

• **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Defined in

[src/models/Config.ts:17](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L17)

___

### marketplaceUri

• **marketplaceUri**: `string`

MarketPlace URL.

#### Defined in

[src/models/Config.ts:11](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L11)

___

### nodeUri

• `Optional` **nodeUri**: `string`

Ethereum node URL.

#### Defined in

[src/models/Config.ts:41](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L41)

___

### secretStoreUri

• `Optional` **secretStoreUri**: `string`

Secret Store URL.

#### Defined in

[src/models/Config.ts:53](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L53)

___

### threshold

• `Optional` **threshold**: `number`

#### Defined in

[src/models/Config.ts:73](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L73)

___

### verbose

• `Optional` **verbose**: `boolean` \| [`LogLevel`](../enums/utils.LogLevel.md)

Log level.

#### Defined in

[src/models/Config.ts:59](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L59)

___

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Defined in

[src/models/Config.ts:47](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/models/Config.ts#L47)
