[@nevermined-io/nevermined-sdk-js](../code-reference.md) / Nevermined

# Class: Nevermined

Main interface for Nevermined Protocol.

## Hierarchy

- `Instantiable`

  ↳ **`Nevermined`**

## Table of contents

### Constructors

- [constructor](Nevermined.md#constructor)

### Properties

- [aaveCredit](Nevermined.md#aavecredit)
- [accounts](Nevermined.md#accounts)
- [agreements](Nevermined.md#agreements)
- [assets](Nevermined.md#assets)
- [auth](Nevermined.md#auth)
- [bookmarks](Nevermined.md#bookmarks)
- [contracts](Nevermined.md#contracts)
- [faucet](Nevermined.md#faucet)
- [files](Nevermined.md#files)
- [gateway](Nevermined.md#gateway)
- [keeper](Nevermined.md#keeper)
- [marketplace](Nevermined.md#marketplace)
- [metadata](Nevermined.md#metadata)
- [nfts](Nevermined.md#nfts)
- [permissions](Nevermined.md#permissions)
- [profiles](Nevermined.md#profiles)
- [provenance](Nevermined.md#provenance)
- [provider](Nevermined.md#provider)
- [secretStore](Nevermined.md#secretstore)
- [token](Nevermined.md#token)
- [utils](Nevermined.md#utils)
- [versions](Nevermined.md#versions)

### Accessors

- [artifactsFolder](Nevermined.md#artifactsfolder)
- [config](Nevermined.md#config)
- [instanceConfig](Nevermined.md#instanceconfig)
- [instantiableConfig](Nevermined.md#instantiableconfig)
- [logger](Nevermined.md#logger)
- [nevermined](Nevermined.md#nevermined)
- [web3](Nevermined.md#web3)

### Methods

- [addresses](Nevermined.md#addresses)
- [checkExists](Nevermined.md#checkexists)
- [findSigner](Nevermined.md#findsigner)
- [setInstanceConfig](Nevermined.md#setinstanceconfig)
- [addressesStatic](Nevermined.md#addressesstatic)
- [findSignerStatic](Nevermined.md#findsignerstatic)
- [getInstance](Nevermined.md#getinstance)
- [setInstanceConfig](Nevermined.md#setinstanceconfig-1)

## Constructors

### constructor

• `Private` **new Nevermined**()

#### Overrides

Instantiable.constructor

#### Defined in

[src/nevermined/Nevermined.ts:220](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L220)

## Properties

### aaveCredit

• **aaveCredit**: `AaveCredit`

AaveCredit allows taking loans from Aave protocol using NFT tokens as collateral.

#### Defined in

[src/nevermined/Nevermined.ts:200](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L200)

___

### accounts

• **accounts**: [`Accounts`](Accounts.md)

Accounts submodule

#### Defined in

[src/nevermined/Nevermined.ts:147](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L147)

___

### agreements

• **agreements**: `Agreements`

Agreements submodule

#### Defined in

[src/nevermined/Nevermined.ts:177](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L177)

___

### assets

• **assets**: `Assets`

Assets submodule

#### Defined in

[src/nevermined/Nevermined.ts:159](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L159)

___

### auth

• **auth**: `Auth`

Auth submodule

#### Defined in

[src/nevermined/Nevermined.ts:153](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L153)

___

### bookmarks

• **bookmarks**: `Bookmarks`

Bookmarks instance

#### Defined in

[src/nevermined/Nevermined.ts:129](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L129)

___

### contracts

• **contracts**: `Object`

Nevermind very own contract reflector.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `loadErc20` | (`address`: `string`) => `Promise`<`default`\> |
| `loadNft721` | (`address`: `string`) => `Promise`<[`Nft721`](Nft721.md)\> |

#### Defined in

[src/nevermined/Nevermined.ts:92](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L92)

___

### faucet

• **faucet**: `Faucet`

Metadata instance.

#### Defined in

[src/nevermined/Nevermined.ts:141](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L141)

___

### files

• **files**: `Files`

Files submodule

#### Defined in

[src/nevermined/Nevermined.ts:171](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L171)

___

### gateway

• **gateway**: `Gateway`

Gateway instance.

#### Defined in

[src/nevermined/Nevermined.ts:105](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L105)

___

### keeper

• **keeper**: [`Keeper`](Keeper.md)

Keeper instance.

#### Defined in

[src/nevermined/Nevermined.ts:86](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L86)

___

### marketplace

• **marketplace**: `MarketplaceApi`

Marketplace instance.

#### Defined in

[src/nevermined/Nevermined.ts:117](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L117)

___

### metadata

• **metadata**: `Metadata`

Metadata instance.

#### Defined in

[src/nevermined/Nevermined.ts:111](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L111)

___

### nfts

• **nfts**: `Nfts`

Nfts submodule

#### Defined in

[src/nevermined/Nevermined.ts:165](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L165)

___

### permissions

• **permissions**: `Permissions`

Permissions instance

#### Defined in

[src/nevermined/Nevermined.ts:135](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L135)

___

### profiles

• **profiles**: `Profiles`

Profiles instance

#### Defined in

[src/nevermined/Nevermined.ts:123](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L123)

___

### provenance

• **provenance**: `Provenance`

Provenance submodule

#### Defined in

[src/nevermined/Nevermined.ts:212](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L212)

___

### provider

• **provider**: `Provider`

Nevermined probiders submodule

#### Defined in

[src/nevermined/Nevermined.ts:189](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L189)

___

### secretStore

• **secretStore**: `NeverminedSecretStore`

SecretStore submodule

#### Defined in

[src/nevermined/Nevermined.ts:183](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L183)

___

### token

• **token**: `Token`

Nevermined tokens submodule

#### Defined in

[src/nevermined/Nevermined.ts:195](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L195)

___

### utils

• **utils**: `Utils`

Utils submodule

#### Defined in

[src/nevermined/Nevermined.ts:218](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L218)

___

### versions

• **versions**: `Versions`

Versions submodule

#### Defined in

[src/nevermined/Nevermined.ts:206](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L206)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

Instantiable.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Instantiable.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Instantiable.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

Instantiable.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Instantiable.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

Instantiable.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L63)

## Methods

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

Instantiable.addresses

#### Defined in

[src/Instantiable.abstract.ts:131](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L131)

___

### checkExists

▸ `Protected` **checkExists**(`address`): `Promise`<`boolean`\>

Returns true of contract exists else it throws.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`boolean`\>

Contract exists.

#### Inherited from

Instantiable.checkExists

#### Defined in

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L44)

___

### findSigner

▸ **findSigner**(`from`): `Promise`<`Signer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Inherited from

Instantiable.findSigner

#### Defined in

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L105)

___

### setInstanceConfig

▸ `Protected` **setInstanceConfig**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `InstantiableConfig` |

#### Returns

`void`

#### Inherited from

Instantiable.setInstanceConfig

#### Defined in

[src/Instantiable.abstract.ts:176](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L176)

___

### addressesStatic

▸ `Static` **addressesStatic**(`config`, `web3`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](Config.md) |
| `web3` | `JsonRpcProvider` |

#### Returns

`Promise`<`string`[]\>

#### Inherited from

Instantiable.addressesStatic

#### Defined in

[src/Instantiable.abstract.ts:144](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L144)

___

### findSignerStatic

▸ `Static` **findSignerStatic**(`config`, `web3`, `from`): `Promise`<`Signer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](Config.md) |
| `web3` | `JsonRpcProvider` |
| `from` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Inherited from

Instantiable.findSignerStatic

#### Defined in

[src/Instantiable.abstract.ts:116](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L116)

___

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`Nevermined`](Nevermined.md)\>

Returns the instance of Nevermined.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`Config`](Config.md) | Nevermined instance configuration. |

#### Returns

`Promise`<[`Nevermined`](Nevermined.md)\>

#### Overrides

Instantiable.getInstance

#### Defined in

[src/nevermined/Nevermined.ts:43](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/nevermined/Nevermined.ts#L43)

___

### setInstanceConfig

▸ `Static` `Protected` **setInstanceConfig**<`T`\>(`instance`, `instantiableConfig`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Instantiable`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `T` |
| `instantiableConfig` | `InstantiableConfig` |

#### Returns

`void`

#### Inherited from

Instantiable.setInstanceConfig

#### Defined in

[src/Instantiable.abstract.ts:167](https://github.com/nevermined-io/sdk-js/blob/3d13d39/src/Instantiable.abstract.ts#L167)
