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
- [feeReceiver](Config.md#feereceiver)
- [gasMultiplier](Config.md#gasmultiplier)
- [gatewayAddress](Config.md#gatewayaddress)
- [gatewayUri](Config.md#gatewayuri)
- [graphHttpUri](Config.md#graphhttpuri)
- [marketplaceAuthToken](Config.md#marketplaceauthtoken)
- [marketplaceUri](Config.md#marketplaceuri)
- [networkFee](Config.md#networkfee)
- [newGateway](Config.md#newgateway)
- [nodeUri](Config.md#nodeuri)
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

[src/models/Config.ts:71](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L71)

___

### accounts

• `Optional` **accounts**: `Signer`[]

#### Defined in

[src/models/Config.ts:78](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L78)

___

### artifactsFolder

• `Optional` **artifactsFolder**: `string`

The folder where the nevermined contract artifacts are located.

#### Defined in

[src/models/Config.ts:76](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L76)

___

### authMessage

• `Optional` **authMessage**: `string`

Message shown when the user creates its own token.

#### Defined in

[src/models/Config.ts:51](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L51)

___

### authTokenExpiration

• `Optional` **authTokenExpiration**: `number`

Token expiration time in ms.

#### Defined in

[src/models/Config.ts:56](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L56)

___

### faucetUri

• `Optional` **faucetUri**: `string`

Faucet URL.

#### Defined in

[src/models/Config.ts:26](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L26)

___

### feeReceiver

• `Optional` **feeReceiver**: `string` = `ZeroAddress`

The address receiving the fee if this is higher than 0

#### Defined in

[src/models/Config.ts:90](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L90)

___

### gasMultiplier

• `Optional` **gasMultiplier**: `number`

Gas multiplier for the fees.
Can be used to speed up the transactions.

#### Defined in

[src/models/Config.ts:64](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L64)

___

### gatewayAddress

• `Optional` **gatewayAddress**: `string`

Address of Gateway.

#### Defined in

[src/models/Config.ts:31](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L31)

___

### gatewayUri

• **gatewayUri**: `string`

Gateway URL.

#### Defined in

[src/models/Config.ts:21](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L21)

___

### graphHttpUri

• `Optional` **graphHttpUri**: `string`

Enpoint for the graph-node http query

#### Defined in

[src/models/Config.ts:69](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L69)

___

### marketplaceAuthToken

• `Optional` **marketplaceAuthToken**: `string`

Marketplace auth token.

#### Defined in

[src/models/Config.ts:16](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L16)

___

### marketplaceUri

• **marketplaceUri**: `string`

MarketPlace URL.

#### Defined in

[src/models/Config.ts:11](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L11)

___

### networkFee

• `Optional` **networkFee**: `number` = `0`

The fee charged by Nevermined for using the Service Agreements

#### Defined in

[src/models/Config.ts:85](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L85)

___

### newGateway

• `Optional` **newGateway**: `boolean` = `true`

#### Defined in

[src/models/Config.ts:80](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L80)

___

### nodeUri

• `Optional` **nodeUri**: `string`

Ethereum node URL.

#### Defined in

[src/models/Config.ts:36](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L36)

___

### threshold

• `Optional` **threshold**: `number`

#### Defined in

[src/models/Config.ts:58](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L58)

___

### verbose

• `Optional` **verbose**: `boolean` \| [`LogLevel`](../enums/utils.LogLevel.md)

Log level.

#### Defined in

[src/models/Config.ts:46](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L46)

___

### web3Provider

• `Optional` **web3Provider**: `any`

Web3 Provider.

#### Defined in

[src/models/Config.ts:41](https://github.com/nevermined-io/sdk-js/blob/be45ac6/src/models/Config.ts#L41)
