[@nevermined-io/sdk](../code-reference.md) / ServicesApi

# Class: ServicesApi

Utils internal submodule of Nevermined.

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`ServicesApi`**

## Table of contents

### Constructors

- [constructor](ServicesApi.md#constructor)

### Properties

- [aave](ServicesApi.md#aave)
- [bookmarks](ServicesApi.md#bookmarks)
- [marketplace](ServicesApi.md#marketplace)
- [metadata](ServicesApi.md#metadata)
- [node](ServicesApi.md#node)
- [permissions](ServicesApi.md#permissions)
- [profiles](ServicesApi.md#profiles)

### Accessors

- [artifactsFolder](ServicesApi.md#artifactsfolder)
- [circuitsFolder](ServicesApi.md#circuitsfolder)
- [config](ServicesApi.md#config)
- [instanceConfig](ServicesApi.md#instanceconfig)
- [instantiableConfig](ServicesApi.md#instantiableconfig)
- [logger](ServicesApi.md#logger)
- [nevermined](ServicesApi.md#nevermined)
- [web3](ServicesApi.md#web3)

### Methods

- [initializeAave](ServicesApi.md#initializeaave)
- [setInstanceConfig](ServicesApi.md#setinstanceconfig)
- [getInstance](ServicesApi.md#getinstance)
- [setInstanceConfig](ServicesApi.md#setinstanceconfig-1)

## Constructors

### constructor

• **new ServicesApi**(`config`)

Creates a new ServicesApi

#### Parameters

| Name     | Type                                                        | Description                              |
| :------- | :---------------------------------------------------------- | :--------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | Configuration of the Nevermined instance |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/nevermined/api/ServicesApi.ts:56](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ServicesApi.ts#L56)

## Properties

### aave

• **aave**: [`AaveCredit`](AaveCredit.md)

Aave instance.

#### Defined in

[src/nevermined/api/ServicesApi.ts:49](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ServicesApi.ts#L49)

---

### bookmarks

• **bookmarks**: [`Bookmarks`](Bookmarks.md)

Bookmarks instance

#### Defined in

[src/nevermined/api/ServicesApi.ts:44](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ServicesApi.ts#L44)

---

### marketplace

• **marketplace**: [`MarketplaceApi`](MarketplaceApi.md)

Nevermined Node Service

#### Defined in

[src/nevermined/api/ServicesApi.ts:24](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ServicesApi.ts#L24)

---

### metadata

• **metadata**: [`MetadataService`](MetadataService.md)

Marketplace instance.

#### Defined in

[src/nevermined/api/ServicesApi.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ServicesApi.ts#L29)

---

### node

• **node**: [`NeverminedNode`](NeverminedNode.md)

Nevermined Node Service

#### Defined in

[src/nevermined/api/ServicesApi.ts:19](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ServicesApi.ts#L19)

---

### permissions

• **permissions**: [`Permissions`](Permissions.md)

Permissions service

#### Defined in

[src/nevermined/api/ServicesApi.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ServicesApi.ts#L34)

---

### profiles

• **profiles**: [`Profiles`](Profiles.md)

Profiles instance

#### Defined in

[src/nevermined/api/ServicesApi.ts:39](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ServicesApi.ts#L39)

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

### initializeAave

▸ **initializeAave**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/nevermined/api/ServicesApi.ts:68](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/ServicesApi.ts#L68)

---

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

▸ `Static` **getInstance**(`..._args`): `any`

#### Parameters

| Name       | Type  |
| :--------- | :---- |
| `..._args` | `any` |

#### Returns

`any`

#### Inherited from

[Instantiable](Instantiable.md).[getInstance](Instantiable.md#getinstance)

#### Defined in

[src/Instantiable.abstract.ts:86](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L86)

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
