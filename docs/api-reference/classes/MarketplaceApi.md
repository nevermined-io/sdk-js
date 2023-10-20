[@nevermined-io/sdk](../code-reference.md) / MarketplaceApi

# Class: MarketplaceApi

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`MarketplaceApi`**

  ↳↳ [`Bookmarks`](Bookmarks.md)

  ↳↳ [`MetadataService`](MetadataService.md)

  ↳↳ [`Permissions`](Permissions.md)

  ↳↳ [`Profiles`](Profiles.md)

## Table of contents

### Constructors

- [constructor](MarketplaceApi.md#constructor)

### Accessors

- [artifactsFolder](MarketplaceApi.md#artifactsfolder)
- [circuitsFolder](MarketplaceApi.md#circuitsfolder)
- [config](MarketplaceApi.md#config)
- [instanceConfig](MarketplaceApi.md#instanceconfig)
- [instantiableConfig](MarketplaceApi.md#instantiableconfig)
- [logger](MarketplaceApi.md#logger)
- [nevermined](MarketplaceApi.md#nevermined)
- [url](MarketplaceApi.md#url)
- [web3](MarketplaceApi.md#web3)

### Methods

- [addNewAddress](MarketplaceApi.md#addnewaddress)
- [login](MarketplaceApi.md#login)
- [setInstanceConfig](MarketplaceApi.md#setinstanceconfig)
- [getInstance](MarketplaceApi.md#getinstance)
- [setInstanceConfig](MarketplaceApi.md#setinstanceconfig-1)

## Constructors

### constructor

• **new MarketplaceApi**(`config`)

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:7](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L7)

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

### url

• `Protected` `get` **url**(): `string`

#### Returns

`string`

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:12](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L12)

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

### addNewAddress

▸ **addNewAddress**(`clientAssertion`): `Promise`<`string`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `clientAssertion` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:36](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L36)

---

### login

▸ **login**(`clientAssertion`): `Promise`<`string`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `clientAssertion` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:16](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L16)

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
