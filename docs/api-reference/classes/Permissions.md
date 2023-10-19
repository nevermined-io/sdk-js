[@nevermined-io/sdk](../code-reference.md) / Permissions

# Class: Permissions

## Hierarchy

- [`MarketplaceApi`](MarketplaceApi.md)

  ↳ **`Permissions`**

## Table of contents

### Constructors

- [constructor](Permissions.md#constructor)

### Accessors

- [artifactsFolder](Permissions.md#artifactsfolder)
- [circuitsFolder](Permissions.md#circuitsfolder)
- [config](Permissions.md#config)
- [instanceConfig](Permissions.md#instanceconfig)
- [instantiableConfig](Permissions.md#instantiableconfig)
- [logger](Permissions.md#logger)
- [nevermined](Permissions.md#nevermined)
- [url](Permissions.md#url)
- [web3](Permissions.md#web3)

### Methods

- [addNewAddress](Permissions.md#addnewaddress)
- [create](Permissions.md#create)
- [deleteOneById](Permissions.md#deleteonebyid)
- [findManyByUserId](Permissions.md#findmanybyuserid)
- [findManyByUserIdAndType](Permissions.md#findmanybyuseridandtype)
- [findOneById](Permissions.md#findonebyid)
- [login](Permissions.md#login)
- [setInstanceConfig](Permissions.md#setinstanceconfig)
- [updateOneById](Permissions.md#updateonebyid)
- [getInstance](Permissions.md#getinstance)
- [setInstanceConfig](Permissions.md#setinstanceconfig-1)

## Constructors

### constructor

• **new Permissions**(`config`)

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

▸ **create**(`newPermission`): `Promise`<[`Permission`](../interfaces/Permission.md)\>

Create Permission

#### Parameters

| Name            | Type                                              |
| :-------------- | :------------------------------------------------ |
| `newPermission` | [`NewPermission`](../interfaces/NewPermission.md) |

#### Returns

`Promise`<[`Permission`](../interfaces/Permission.md)\>

#### Defined in

[src/services/metadata/Permissions.ts:14](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Permissions.ts#L14)

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

[src/services/metadata/Permissions.ts:138](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Permissions.ts#L138)

---

### findManyByUserId

▸ **findManyByUserId**(`userId`, `query?`): `Promise`<[`MarketplaceResults`](../interfaces/MarketplaceResults.md)<[`Permission`](../interfaces/Permission.md)\>\>

Get permissions by userId

#### Parameters

| Name     | Type                                          |
| :------- | :-------------------------------------------- |
| `userId` | `string`                                      |
| `query?` | [`SearchQuery`](../interfaces/SearchQuery.md) |

#### Returns

`Promise`<[`MarketplaceResults`](../interfaces/MarketplaceResults.md)<[`Permission`](../interfaces/Permission.md)\>\>

#### Defined in

[src/services/metadata/Permissions.ts:63](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Permissions.ts#L63)

---

### findManyByUserIdAndType

▸ **findManyByUserIdAndType**(`userId`, `type`, `query?`): `Promise`<[`MarketplaceResults`](../interfaces/MarketplaceResults.md)<[`Permission`](../interfaces/Permission.md)\>\>

Get permissions by userId and specific type

#### Parameters

| Name     | Type                                           |
| :------- | :--------------------------------------------- |
| `userId` | `string`                                       |
| `type`   | [`PermissionType`](../enums/PermissionType.md) |
| `query?` | [`SearchQuery`](../interfaces/SearchQuery.md)  |

#### Returns

`Promise`<[`MarketplaceResults`](../interfaces/MarketplaceResults.md)<[`Permission`](../interfaces/Permission.md)\>\>

#### Defined in

[src/services/metadata/Permissions.ts:88](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Permissions.ts#L88)

---

### findOneById

▸ **findOneById**(`id`): `Promise`<[`Permission`](../interfaces/Permission.md)\>

Get a permission by Id

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

`Promise`<[`Permission`](../interfaces/Permission.md)\>

#### Defined in

[src/services/metadata/Permissions.ts:41](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Permissions.ts#L41)

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

▸ **updateOneById**(`id`, `permission`): `Promise`<[`Permission`](../interfaces/Permission.md)\>

Update a Permission by id

#### Parameters

| Name         | Type                                                    |
| :----------- | :------------------------------------------------------ |
| `id`         | `string`                                                |
| `permission` | `Partial`<[`Permission`](../interfaces/Permission.md)\> |

#### Returns

`Promise`<[`Permission`](../interfaces/Permission.md)\>

#### Defined in

[src/services/metadata/Permissions.ts:114](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Permissions.ts#L114)

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
