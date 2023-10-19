[@nevermined-io/sdk](../code-reference.md) / AccessService

# Class: AccessService

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`AccessService`**

## Implements

- [`ServicePlugin`](../interfaces/ServicePlugin.md)<[`ServiceAccess`](../interfaces/ServiceAccess.md)\>

## Table of contents

### Constructors

- [constructor](AccessService.md#constructor)

### Properties

- [normal](AccessService.md#normal)

### Accessors

- [artifactsFolder](AccessService.md#artifactsfolder)
- [circuitsFolder](AccessService.md#circuitsfolder)
- [config](AccessService.md#config)
- [instanceConfig](AccessService.md#instanceconfig)
- [instantiableConfig](AccessService.md#instantiableconfig)
- [logger](AccessService.md#logger)
- [nevermined](AccessService.md#nevermined)
- [web3](AccessService.md#web3)

### Methods

- [accept](AccessService.md#accept)
- [createService](AccessService.md#createservice)
- [process](AccessService.md#process)
- [setInstanceConfig](AccessService.md#setinstanceconfig)
- [track](AccessService.md#track)
- [getInstance](AccessService.md#getinstance)
- [setInstanceConfig](AccessService.md#setinstanceconfig-1)

## Constructors

### constructor

• **new AccessService**(`config`, `normal`)

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |
| `normal` | [`AccessTemplate`](AccessTemplate.md)                       |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/nevermined/AccessService.ts:33](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/AccessService.ts#L33)

## Properties

### normal

• **normal**: [`AccessTemplate`](AccessTemplate.md)

#### Defined in

[src/nevermined/AccessService.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/AccessService.ts#L31)

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

### accept

▸ **accept**(`params`): `Promise`<`boolean`\>

#### Parameters

| Name     | Type                                                    |
| :------- | :------------------------------------------------------ |
| `params` | [`ValidationParams`](../interfaces/ValidationParams.md) |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

[ServicePlugin](../interfaces/ServicePlugin.md).[accept](../interfaces/ServicePlugin.md#accept)

#### Defined in

[src/nevermined/AccessService.ts:62](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/AccessService.ts#L62)

---

### createService

▸ **createService**(`publisher`, `metadata`, `serviceAttributes`, `nftAttributes?`, `pricedData?`): [`ServiceAccess`](../interfaces/ServiceAccess.md)

#### Parameters

| Name                | Type                                                                          |
| :------------------ | :---------------------------------------------------------------------------- |
| `publisher`         | [`Account`](Account.md)                                                       |
| `metadata`          | [`MetaData`](../interfaces/MetaData.md)                                       |
| `serviceAttributes` | [`ServiceAttributes`](../interfaces/ServiceAttributes.md)                     |
| `nftAttributes?`    | [`NFTAttributes`](NFTAttributes.md)                                           |
| `pricedData?`       | [`PricedMetadataInformation`](../code-reference.md#pricedmetadatainformation) |

#### Returns

[`ServiceAccess`](../interfaces/ServiceAccess.md)

#### Implementation of

[ServicePlugin](../interfaces/ServicePlugin.md).[createService](../interfaces/ServicePlugin.md#createservice)

#### Defined in

[src/nevermined/AccessService.ts:39](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/AccessService.ts#L39)

---

### process

▸ **process**(`params`, `from`, `txparams?`): `Promise`<`void`\>

#### Parameters

| Name        | Type                                                    |
| :---------- | :------------------------------------------------------ |
| `params`    | [`ValidationParams`](../interfaces/ValidationParams.md) |
| `from`      | [`Account`](Account.md)                                 |
| `txparams?` | [`TxParameters`](../interfaces/TxParameters.md)         |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ServicePlugin](../interfaces/ServicePlugin.md).[process](../interfaces/ServicePlugin.md#process)

#### Defined in

[src/nevermined/AccessService.ts:55](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/AccessService.ts#L55)

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

### track

▸ **track**(`params`, `from`, `txparams?`): `Promise`<`boolean`\>

#### Parameters

| Name        | Type                                                    |
| :---------- | :------------------------------------------------------ |
| `params`    | [`ValidationParams`](../interfaces/ValidationParams.md) |
| `from`      | [`Account`](Account.md)                                 |
| `txparams?` | [`TxParameters`](../interfaces/TxParameters.md)         |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

[ServicePlugin](../interfaces/ServicePlugin.md).[track](../interfaces/ServicePlugin.md#track)

#### Defined in

[src/nevermined/AccessService.ts:65](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/AccessService.ts#L65)

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
