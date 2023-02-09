[@nevermined-io/sdk](../code-reference.md) / Nevermined

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

[src/nevermined.ts:213](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L213)

## Properties

### aaveCredit

• **aaveCredit**: `AaveCredit`

AaveCredit allows taking loans from Aave protocol using NFT tokens as collateral.

#### Defined in

[src/nevermined.ts:196](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L196)

---

### accounts

• **accounts**: [`Accounts`](Accounts.md)

Accounts submodule

#### Defined in

[src/nevermined.ts:156](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L156)

---

### agreements

• **agreements**: `Agreements`

Agreements submodule

#### Defined in

[src/nevermined.ts:181](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L181)

---

### assets

• **assets**: `Assets`

Assets submodule

#### Defined in

[src/nevermined.ts:166](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L166)

---

### auth

• **auth**: `Auth`

Auth submodule

#### Defined in

[src/nevermined.ts:161](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L161)

---

### bookmarks

• **bookmarks**: `Bookmarks`

Bookmarks instance

#### Defined in

[src/nevermined.ts:141](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L141)

---

### contracts

• **contracts**: `Object`

Nevermind very own contract reflector.

#### Type declaration

| Name         | Type                                                       |
| :----------- | :--------------------------------------------------------- |
| `loadErc20`  | (`address`: `string`) => `Promise`<`default`\>             |
| `loadNft721` | (`address`: `string`) => `Promise`<[`Nft721`](Nft721.md)\> |

#### Defined in

[src/nevermined.ts:97](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L97)

---

### faucet

• **faucet**: `Faucet`

Metadata instance.

#### Defined in

[src/nevermined.ts:151](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L151)

---

### files

• **files**: `Files`

Files submodule

#### Defined in

[src/nevermined.ts:176](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L176)

---

### gateway

• **gateway**: `Gateway`

Gateway instance.

#### Defined in

[src/nevermined.ts:121](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L121)

---

### keeper

• **keeper**: [`Keeper`](Keeper.md)

Keeper instance.

#### Defined in

[src/nevermined.ts:92](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L92)

---

### marketplace

• **marketplace**: `MarketplaceApi`

Marketplace instance.

#### Defined in

[src/nevermined.ts:131](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L131)

---

### metadata

• **metadata**: `Metadata`

Metadata instance.

#### Defined in

[src/nevermined.ts:126](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L126)

---

### nfts

• **nfts**: [`Nfts`](Nfts.md)

Nfts submodule

#### Defined in

[src/nevermined.ts:171](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L171)

---

### permissions

• **permissions**: `Permissions`

Permissions instance

#### Defined in

[src/nevermined.ts:146](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L146)

---

### profiles

• **profiles**: `Profiles`

Profiles instance

#### Defined in

[src/nevermined.ts:136](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L136)

---

### provenance

• **provenance**: `Provenance`

Provenance submodule

#### Defined in

[src/nevermined.ts:206](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L206)

---

### provider

• **provider**: `Provider`

Nevermined probiders submodule

#### Defined in

[src/nevermined.ts:186](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L186)

---

### token

• **token**: `Token`

Nevermined tokens submodule

#### Defined in

[src/nevermined.ts:191](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L191)

---

### utils

• **utils**: `Utils`

Utils submodule

#### Defined in

[src/nevermined.ts:211](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L211)

---

### versions

• **versions**: `Versions`

Versions submodule

#### Defined in

[src/nevermined.ts:201](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L201)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L96)

---

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

Instantiable.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L80)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Instantiable.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L100)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Instantiable.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L73)

---

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

Instantiable.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L87)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Instantiable.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L33)

---

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

Instantiable.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L63)

## Methods

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

Instantiable.addresses

#### Defined in

[src/Instantiable.abstract.ts:129](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L129)

---

### checkExists

▸ `Protected` **checkExists**(`address`): `Promise`<`boolean`\>

Returns true of contract exists else it throws.

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `address` | `string` |

#### Returns

`Promise`<`boolean`\>

true if the contract exists.

#### Inherited from

Instantiable.checkExists

#### Defined in

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L44)

---

### findSigner

▸ **findSigner**(`from`): `Promise`<`Signer`\>

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `from` | `string` |

#### Returns

`Promise`<`Signer`\>

#### Inherited from

Instantiable.findSigner

#### Defined in

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L105)

---

### setInstanceConfig

▸ `Protected` **setInstanceConfig**(`config`): `void`

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `config` | `InstantiableConfig` |

#### Returns

`void`

#### Inherited from

Instantiable.setInstanceConfig

#### Defined in

[src/Instantiable.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L171)

---

### addressesStatic

▸ `Static` **addressesStatic**(`config`, `web3`): `Promise`<`string`[]\>

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `config` | [`Config`](Config.md) |
| `web3`   | `JsonRpcProvider`     |

#### Returns

`Promise`<`string`[]\>

#### Inherited from

Instantiable.addressesStatic

#### Defined in

[src/Instantiable.abstract.ts:142](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L142)

---

### findSignerStatic

▸ `Static` **findSignerStatic**(`config`, `web3`, `from`): `Promise`<`Signer`\>

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `config` | [`Config`](Config.md) |
| `web3`   | `JsonRpcProvider`     |
| `from`   | `string`              |

#### Returns

`Promise`<`Signer`\>

#### Inherited from

Instantiable.findSignerStatic

#### Defined in

[src/Instantiable.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L115)

---

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`Nevermined`](Nevermined.md)\>

Returns the instance of Nevermined.

**`Example`**

```ts
import { Nevermined, Config } from '@nevermined-io/nevermied-sdk-js'

const config: Config = {...}
const nevermined = await Nevermined.getInstance(config)
```

#### Parameters

| Name     | Type                  | Description                        |
| :------- | :-------------------- | :--------------------------------- |
| `config` | [`Config`](Config.md) | Nevermined instance configuration. |

#### Returns

`Promise`<[`Nevermined`](Nevermined.md)\>

A [Nevermined](Nevermined.md) instance

#### Overrides

Instantiable.getInstance

#### Defined in

[src/nevermined.ts:51](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/nevermined.ts#L51)

---

### setInstanceConfig

▸ `Static` `Protected` **setInstanceConfig**<`T`\>(`instance`, `instantiableConfig`): `void`

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `T`  | extends `Instantiable`<`T`\> |

#### Parameters

| Name                 | Type                 |
| :------------------- | :------------------- |
| `instance`           | `T`                  |
| `instantiableConfig` | `InstantiableConfig` |

#### Returns

`void`

#### Inherited from

Instantiable.setInstanceConfig

#### Defined in

[src/Instantiable.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L162)
