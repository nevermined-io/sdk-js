[@nevermined-io/sdk](../code-reference.md) / Nevermined

# Class: Nevermined

Main interface for Nevermined Protocol.

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`Nevermined`**

## Table of contents

### Constructors

- [constructor](Nevermined.md#constructor)

### Properties

- [accounts](Nevermined.md#accounts)
- [agreements](Nevermined.md#agreements)
- [assets](Nevermined.md#assets)
- [compute](Nevermined.md#compute)
- [contracts](Nevermined.md#contracts)
- [isKeeperConnected](Nevermined.md#iskeeperconnected)
- [keeper](Nevermined.md#keeper)
- [nfts1155](Nevermined.md#nfts1155)
- [nfts721](Nevermined.md#nfts721)
- [provenance](Nevermined.md#provenance)
- [search](Nevermined.md#search)
- [services](Nevermined.md#services)
- [utils](Nevermined.md#utils)

### Accessors

- [artifactsFolder](Nevermined.md#artifactsfolder)
- [circuitsFolder](Nevermined.md#circuitsfolder)
- [config](Nevermined.md#config)
- [instanceConfig](Nevermined.md#instanceconfig)
- [instantiableConfig](Nevermined.md#instantiableconfig)
- [logger](Nevermined.md#logger)
- [nevermined](Nevermined.md#nevermined)
- [web3](Nevermined.md#web3)

### Methods

- [setInstanceConfig](Nevermined.md#setinstanceconfig)
- [getInstance](Nevermined.md#getinstance)
- [setInstanceConfig](Nevermined.md#setinstanceconfig-1)

## Constructors

### constructor

• `Private` **new Nevermined**()

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/nevermined/Nevermined.ts:211](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L211)

## Properties

### accounts

• **accounts**: [`AccountsApi`](AccountsApi.md)

Accounts submodule

#### Defined in

[src/nevermined/Nevermined.ts:159](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L159)

---

### agreements

• **agreements**: [`AgreementsApi`](AgreementsApi.md)

Agreements submodule

#### Defined in

[src/nevermined/Nevermined.ts:164](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L164)

---

### assets

• **assets**: [`AssetsApi`](AssetsApi.md)

Assets API

#### Defined in

[src/nevermined/Nevermined.ts:169](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L169)

---

### compute

• **compute**: [`ComputeApi`](ComputeApi.md)

Compute API

#### Defined in

[src/nevermined/Nevermined.ts:174](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L174)

---

### contracts

• **contracts**: `Object`

Nevermined very own contract reflector.

#### Type declaration

| Name                  | Type                                                                                |
| :-------------------- | :---------------------------------------------------------------------------------- |
| `loadErc20`           | (`address`: `string`) => `Promise`<[`CustomToken`](CustomToken.md)\>                |
| `loadNft1155`         | (`address`: `string`) => `Promise`<[`NFT1155Api`](NFT1155Api.md)\>                  |
| `loadNft1155Api`      | (`api`: [`NFT1155Api`](NFT1155Api.md)) => `Promise`<[`NFT1155Api`](NFT1155Api.md)\> |
| `loadNft1155Contract` | (`address`: `string`) => `Promise`<[`Nft1155Contract`](Nft1155Contract.md)\>        |
| `loadNft721`          | (`address`: `string`) => `Promise`<[`NFT721Api`](NFT721Api.md)\>                    |
| `loadNft721Api`       | (`api`: [`NFT721Api`](NFT721Api.md)) => `Promise`<[`NFT721Api`](NFT721Api.md)\>     |
| `loadNft721Contract`  | (`address`: `string`) => `Promise`<[`Nft721Contract`](Nft721Contract.md)\>          |

#### Defined in

[src/nevermined/Nevermined.ts:74](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L74)

---

### isKeeperConnected

• **isKeeperConnected**: `boolean`

If keeper is connected

#### Defined in

[src/nevermined/Nevermined.ts:209](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L209)

---

### keeper

• **keeper**: [`Keeper`](Keeper.md)

Keeper instance.

#### Defined in

[src/nevermined/Nevermined.ts:154](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L154)

---

### nfts1155

• **nfts1155**: [`NFT1155Api`](NFT1155Api.md)

ERC-1155 Nfts API

#### Defined in

[src/nevermined/Nevermined.ts:179](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L179)

---

### nfts721

• **nfts721**: [`NFT721Api`](NFT721Api.md)

ERC-721 Nfts API

#### Defined in

[src/nevermined/Nevermined.ts:184](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L184)

---

### provenance

• **provenance**: [`ProvenanceApi`](ProvenanceApi.md)

Provenance submodule

#### Defined in

[src/nevermined/Nevermined.ts:189](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L189)

---

### search

• **search**: [`SearchApi`](SearchApi.md)

SearchApi API

#### Defined in

[src/nevermined/Nevermined.ts:194](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L194)

---

### services

• **services**: [`ServicesApi`](ServicesApi.md)

SearchApi API

#### Defined in

[src/nevermined/Nevermined.ts:199](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L199)

---

### utils

• **utils**: [`UtilsApi`](UtilsApi.md)

Utils submodule

#### Defined in

[src/nevermined/Nevermined.ts:204](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L204)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

Instantiable.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Instantiable.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Instantiable.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

Instantiable.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Instantiable.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

Instantiable.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

### setInstanceConfig

▸ `Protected` **setInstanceConfig**(`config`): `void`

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`void`

#### Inherited from

[Instantiable](Instantiable.md).[setInstanceConfig](Instantiable.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### getInstance

▸ `Static` **getInstance**(`config`): `Promise`<[`Nevermined`](Nevermined.md)\>

Returns the instance of Nevermined.

#### Parameters

| Name     | Type                                        | Description                        |
| :------- | :------------------------------------------ | :--------------------------------- |
| `config` | [`NeverminedOptions`](NeverminedOptions.md) | Nevermined instance configuration. |

#### Returns

`Promise`<[`Nevermined`](Nevermined.md)\>

A [Nevermined](Nevermined.md) instance

**`Example`**

```ts
import { Nevermined, Config } from '@nevermined-io/sdk'

const config: Config = {...}
const nevermined = await Nevermined.getInstance(config)
```

#### Overrides

[Instantiable](Instantiable.md).[getInstance](Instantiable.md#getinstance)

#### Defined in

[src/nevermined/Nevermined.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Nevermined.ts#L34)

---

### setInstanceConfig

▸ `Static` `Protected` **setInstanceConfig**<`T`\>(`instance`, `instantiableConfig`): `void`

#### Type parameters

| Name | Type                                      |
| :--- | :---------------------------------------- |
| `T`  | extends [`Instantiable`](Instantiable.md) |

#### Parameters

| Name                 | Type                                                        |
| :------------------- | :---------------------------------------------------------- |
| `instance`           | `T`                                                         |
| `instantiableConfig` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`void`

#### Inherited from

[Instantiable](Instantiable.md).[setInstanceConfig](Instantiable.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
