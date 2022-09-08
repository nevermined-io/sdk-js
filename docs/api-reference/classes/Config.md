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
- [newGateway](Config.md#newgateway)
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

[src/models/Config.ts:75](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L75)

___

### accounts

• `Optional` **accounts**: `Signer`[]

#### Defined in

[src/models/Config.ts:82](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L82)

___

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Defined in

[src/models/Config.ts:80](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L80)

___

### authMessage

• `Optional` **authMessage**: `string`

Message shown when the user creates its own token.

#### Defined in

[src/models/Config.ts:55](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L55)

___

### authTokenExpiration

• `Optional` **authTokenExpiration**: `number`

Token expiration time in ms.

#### Defined in

[src/models/Config.ts:60](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L60)

___

### faucetUri

• `Optional` **faucetUri**: `string`

Faucet URL.

#### Defined in

[src/models/Config.ts:25](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L25)

___

### gasMultiplier

• `Optional` **gasMultiplier**: `number`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Defined in

[src/models/Config.ts:68](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L68)

___

### gatewayAddress

• `Optional` **gatewayAddress**: `string`

Address of Gateway.

#### Defined in

[src/models/Config.ts:30](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L30)

___

### gatewayUri

• **gatewayUri**: `string`

Gateway URL.

#### Defined in

[src/models/Config.ts:20](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L20)

___

### graphHttpUri

• `Optional` **graphHttpUri**: `string`

Enpoint for the graph-node http query

#### Defined in

[src/models/Config.ts:73](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L73)

___

### marketplaceAuthToken

• **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Defined in

[src/models/Config.ts:15](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L15)

___

### marketplaceUri

• **marketplaceUri**: `string`

MarketPlace URL.

#### Defined in

[src/models/Config.ts:10](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L10)

___

### newGateway

• `Optional` **newGateway**: `boolean`

#### Defined in

[src/models/Config.ts:84](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L84)

___

### nodeUri

• `Optional` **nodeUri**: `string`

Ethereum node URL.

#### Defined in

[src/models/Config.ts:35](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L35)

___

### secretStoreUri

• `Optional` **secretStoreUri**: `string`

Secret Store URL.

#### Defined in

[src/models/Config.ts:45](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L45)

___

### threshold

• `Optional` **threshold**: `number`

#### Defined in

[src/models/Config.ts:62](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L62)

___

### verbose

• `Optional` **verbose**: `boolean` \| [`LogLevel`](../enums/utils.LogLevel.md)

Log level.

#### Defined in

[src/models/Config.ts:50](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L50)

___

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Defined in

[src/models/Config.ts:40](https://github.com/nevermined-io/sdk-js/blob/04d2962/src/models/Config.ts#L40)
