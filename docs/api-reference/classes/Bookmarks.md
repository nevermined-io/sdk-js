[@nevermined-io/sdk](../code-reference.md) / Bookmarks

# Class: Bookmarks

## Hierarchy

- [`MarketplaceApi`](MarketplaceApi.md)

  ↳ **`Bookmarks`**

## Table of contents

### Constructors

- [constructor](Bookmarks.md#constructor)

### Accessors

- [artifactsFolder](Bookmarks.md#artifactsfolder)
- [circuitsFolder](Bookmarks.md#circuitsfolder)
- [config](Bookmarks.md#config)
- [instanceConfig](Bookmarks.md#instanceconfig)
- [instantiableConfig](Bookmarks.md#instantiableconfig)
- [logger](Bookmarks.md#logger)
- [nevermined](Bookmarks.md#nevermined)
- [url](Bookmarks.md#url)
- [web3](Bookmarks.md#web3)

### Methods

- [addNewAddress](Bookmarks.md#addnewaddress)
- [create](Bookmarks.md#create)
- [deleteOneById](Bookmarks.md#deleteonebyid)
- [findManyByUserId](Bookmarks.md#findmanybyuserid)
- [findOneById](Bookmarks.md#findonebyid)
- [login](Bookmarks.md#login)
- [setInstanceConfig](Bookmarks.md#setinstanceconfig)
- [updateOneById](Bookmarks.md#updateonebyid)
- [getInstance](Bookmarks.md#getinstance)
- [setInstanceConfig](Bookmarks.md#setinstanceconfig-1)

## Constructors

### constructor

• **new Bookmarks**(`config`)

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Inherited from

[MarketplaceApi](MarketplaceApi.md).[constructor](MarketplaceApi.md#constructor)

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:7](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L7)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

MarketplaceApi.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

MarketplaceApi.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

MarketplaceApi.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

MarketplaceApi.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

MarketplaceApi.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

MarketplaceApi.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

MarketplaceApi.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### url

• `Protected` `get` **url**(): `string`

#### Returns

`string`

#### Inherited from

MarketplaceApi.url

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:12](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L12)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

MarketplaceApi.web3

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

#### Inherited from

[MarketplaceApi](MarketplaceApi.md).[addNewAddress](MarketplaceApi.md#addnewaddress)

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:36](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L36)

---

### create

▸ **create**(`newBookmark`): `Promise`<[`Bookmark`](../interfaces/Bookmark.md)\>

Create bookmark

#### Parameters

| Name          | Type                                          |
| :------------ | :-------------------------------------------- |
| `newBookmark` | [`NewBookmark`](../interfaces/NewBookmark.md) |

#### Returns

`Promise`<[`Bookmark`](../interfaces/Bookmark.md)\>

#### Defined in

[src/services/metadata/Bookmarks.ts:14](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Bookmarks.ts#L14)

---

### deleteOneById

▸ **deleteOneById**(`id`): `Promise`<`void`\>

Delele a bookmark by id

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/services/metadata/Bookmarks.ts:112](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Bookmarks.ts#L112)

---

### findManyByUserId

▸ **findManyByUserId**(`userId`, `query?`): `Promise`<[`MarketplaceResults`](../interfaces/MarketplaceResults.md)<[`Bookmark`](../interfaces/Bookmark.md)\>\>

Get bookmarks by userId

#### Parameters

| Name     | Type                                          |
| :------- | :-------------------------------------------- |
| `userId` | `string`                                      |
| `query?` | [`SearchQuery`](../interfaces/SearchQuery.md) |

#### Returns

`Promise`<[`MarketplaceResults`](../interfaces/MarketplaceResults.md)<[`Bookmark`](../interfaces/Bookmark.md)\>\>

#### Defined in

[src/services/metadata/Bookmarks.ts:63](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Bookmarks.ts#L63)

---

### findOneById

▸ **findOneById**(`id`): `Promise`<[`Bookmark`](../interfaces/Bookmark.md)\>

Get a bookmark by Id

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

`Promise`<[`Bookmark`](../interfaces/Bookmark.md)\>

#### Defined in

[src/services/metadata/Bookmarks.ts:41](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Bookmarks.ts#L41)

---

### login

▸ **login**(`clientAssertion`): `Promise`<`string`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `clientAssertion` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[MarketplaceApi](MarketplaceApi.md).[login](MarketplaceApi.md#login)

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

[MarketplaceApi](MarketplaceApi.md).[setInstanceConfig](MarketplaceApi.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### updateOneById

▸ **updateOneById**(`id`, `bookmark`): `Promise`<[`Bookmark`](../interfaces/Bookmark.md)\>

Update a bookmark by id

#### Parameters

| Name       | Type                                                |
| :--------- | :-------------------------------------------------- |
| `id`       | `string`                                            |
| `bookmark` | `Partial`<[`Bookmark`](../interfaces/Bookmark.md)\> |

#### Returns

`Promise`<[`Bookmark`](../interfaces/Bookmark.md)\>

#### Defined in

[src/services/metadata/Bookmarks.ts:88](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Bookmarks.ts#L88)

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

[MarketplaceApi](MarketplaceApi.md).[getInstance](MarketplaceApi.md#getinstance)

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

[MarketplaceApi](MarketplaceApi.md).[setInstanceConfig](MarketplaceApi.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
