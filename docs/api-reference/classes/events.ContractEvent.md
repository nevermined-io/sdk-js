[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [events](../modules/events.md) / ContractEvent

# Class: ContractEvent

[events](../modules/events.md).ContractEvent

## Hierarchy

- [`NeverminedEvent`](events.NeverminedEvent.md)

  ↳ **`ContractEvent`**

## Table of contents

### Constructors

- [constructor](events.ContractEvent.md#constructor)

### Properties

- [contract](events.ContractEvent.md#contract)
- [eventEmitter](events.ContractEvent.md#eventemitter)

### Accessors

- [artifactsFolder](events.ContractEvent.md#artifactsfolder)
- [config](events.ContractEvent.md#config)
- [instanceConfig](events.ContractEvent.md#instanceconfig)
- [instantiableConfig](events.ContractEvent.md#instantiableconfig)
- [logger](events.ContractEvent.md#logger)
- [nevermined](events.ContractEvent.md#nevermined)
- [web3](events.ContractEvent.md#web3)

### Methods

- [addresses](events.ContractEvent.md#addresses)
- [checkExists](events.ContractEvent.md#checkexists)
- [eventExists](events.ContractEvent.md#eventexists)
- [filterToArgs](events.ContractEvent.md#filtertoargs)
- [findSigner](events.ContractEvent.md#findsigner)
- [getBlockNumber](events.ContractEvent.md#getblocknumber)
- [getEventData](events.ContractEvent.md#geteventdata)
- [getPastEvents](events.ContractEvent.md#getpastevents)
- [once](events.ContractEvent.md#once)
- [setInstanceConfig](events.ContractEvent.md#setinstanceconfig)
- [subscribe](events.ContractEvent.md#subscribe)
- [addressesStatic](events.ContractEvent.md#addressesstatic)
- [findSignerStatic](events.ContractEvent.md#findsignerstatic)
- [getInstance](events.ContractEvent.md#getinstance)
- [setInstanceConfig](events.ContractEvent.md#setinstanceconfig-1)

## Constructors

### constructor

• `Protected` **new ContractEvent**(`contract`, `eventEmitter`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `ContractBase` |
| `eventEmitter` | [`EventEmitter`](../interfaces/events.EventEmitter.md) |

#### Inherited from

[NeverminedEvent](events.NeverminedEvent.md).[constructor](events.NeverminedEvent.md#constructor)

#### Defined in

[src/events/NeverminedEvent.ts:35](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/NeverminedEvent.ts#L35)

## Properties

### contract

• `Protected` **contract**: `ContractBase` = `null`

#### Inherited from

[NeverminedEvent](events.NeverminedEvent.md).[contract](events.NeverminedEvent.md#contract)

#### Defined in

[src/events/NeverminedEvent.ts:30](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/NeverminedEvent.ts#L30)

___

### eventEmitter

• `Protected` **eventEmitter**: [`EventEmitter`](../interfaces/events.EventEmitter.md)

#### Inherited from

[NeverminedEvent](events.NeverminedEvent.md).[eventEmitter](events.NeverminedEvent.md#eventemitter)

#### Defined in

[src/events/NeverminedEvent.ts:29](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/NeverminedEvent.ts#L29)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

NeverminedEvent.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

NeverminedEvent.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

NeverminedEvent.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

NeverminedEvent.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

NeverminedEvent.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

NeverminedEvent.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L33)

___

### web3

• `Protected` `get` **web3**(): `JsonRpcProvider`

#### Returns

`JsonRpcProvider`

#### Inherited from

NeverminedEvent.web3

#### Defined in

[src/Instantiable.abstract.ts:63](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L63)

## Methods

### addresses

▸ **addresses**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[NeverminedEvent](events.NeverminedEvent.md).[addresses](events.NeverminedEvent.md#addresses)

#### Defined in

[src/Instantiable.abstract.ts:129](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L129)

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

true if the contract exists.

#### Inherited from

[NeverminedEvent](events.NeverminedEvent.md).[checkExists](events.NeverminedEvent.md#checkexists)

#### Defined in

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L44)

___

### eventExists

▸ `Private` **eventExists**(`eventName`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |

#### Returns

`boolean`

#### Defined in

[src/events/ContractEvent.ts:69](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/ContractEvent.ts#L69)

___

### filterToArgs

▸ `Private` **filterToArgs**(`eventName`, `filter`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `filter` | [`Filter`](../interfaces/events.Filter.md) |

#### Returns

`any`[]

#### Defined in

[src/events/ContractEvent.ts:73](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/ContractEvent.ts#L73)

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

[NeverminedEvent](events.NeverminedEvent.md).[findSigner](events.NeverminedEvent.md#findsigner)

#### Defined in

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L105)

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Overrides

[NeverminedEvent](events.NeverminedEvent.md).[getBlockNumber](events.NeverminedEvent.md#getblocknumber)

#### Defined in

[src/events/ContractEvent.ts:65](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/ContractEvent.ts#L65)

___

### getEventData

▸ **getEventData**(`options`): [`EventResult`](../modules/events.md#eventresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`EventOptions`](../interfaces/events.EventOptions.md) |

#### Returns

[`EventResult`](../modules/events.md#eventresult)

#### Overrides

[NeverminedEvent](events.NeverminedEvent.md).[getEventData](events.NeverminedEvent.md#geteventdata)

#### Defined in

[src/events/ContractEvent.ts:29](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/ContractEvent.ts#L29)

___

### getPastEvents

▸ **getPastEvents**(`options`): [`EventResult`](../modules/events.md#eventresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`EventOptions`](../interfaces/events.EventOptions.md) |

#### Returns

[`EventResult`](../modules/events.md#eventresult)

#### Overrides

[NeverminedEvent](events.NeverminedEvent.md).[getPastEvents](events.NeverminedEvent.md#getpastevents)

#### Defined in

[src/events/ContractEvent.ts:47](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/ContractEvent.ts#L47)

___

### once

▸ **once**(`callback?`, `options?`): `Promise`<[`EventResult`](../modules/events.md#eventresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | (`events`: [`EventResult`](../modules/events.md#eventresult)[]) => `void` |
| `options?` | [`EventOptions`](../interfaces/events.EventOptions.md) |

#### Returns

`Promise`<[`EventResult`](../modules/events.md#eventresult)\>

#### Inherited from

[NeverminedEvent](events.NeverminedEvent.md).[once](events.NeverminedEvent.md#once)

#### Defined in

[src/events/NeverminedEvent.ts:55](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/NeverminedEvent.ts#L55)

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

[NeverminedEvent](events.NeverminedEvent.md).[setInstanceConfig](events.NeverminedEvent.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:171](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L171)

___

### subscribe

▸ **subscribe**(`callback`, `options`): [`ContractEventSubscription`](../interfaces/events.ContractEventSubscription.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`events`: [`EventResult`](../modules/events.md#eventresult)[]) => `void` |
| `options` | [`EventOptions`](../interfaces/events.EventOptions.md) |

#### Returns

[`ContractEventSubscription`](../interfaces/events.ContractEventSubscription.md)

#### Inherited from

[NeverminedEvent](events.NeverminedEvent.md).[subscribe](events.NeverminedEvent.md#subscribe)

#### Defined in

[src/events/NeverminedEvent.ts:41](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/NeverminedEvent.ts#L41)

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

[NeverminedEvent](events.NeverminedEvent.md).[addressesStatic](events.NeverminedEvent.md#addressesstatic)

#### Defined in

[src/Instantiable.abstract.ts:142](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L142)

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

[NeverminedEvent](events.NeverminedEvent.md).[findSignerStatic](events.NeverminedEvent.md#findsignerstatic)

#### Defined in

[src/Instantiable.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L115)

___

### getInstance

▸ `Static` **getInstance**(`contract`, `eventEmitter`, `nevermined`, `web3`): [`ContractEvent`](events.ContractEvent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `ContractBase` |
| `eventEmitter` | [`EventEmitter`](../interfaces/events.EventEmitter.md) |
| `nevermined` | [`Nevermined`](Nevermined.md) |
| `web3` | `JsonRpcProvider` |

#### Returns

[`ContractEvent`](events.ContractEvent.md)

#### Overrides

[NeverminedEvent](events.NeverminedEvent.md).[getInstance](events.NeverminedEvent.md#getinstance)

#### Defined in

[src/events/ContractEvent.ts:14](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/ContractEvent.ts#L14)

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

[NeverminedEvent](events.NeverminedEvent.md).[setInstanceConfig](events.NeverminedEvent.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L162)
