[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [events](../modules/events.md) / NeverminedEvent

# Class: NeverminedEvent

[events](../modules/events.md).NeverminedEvent

## Hierarchy

- `Instantiable`

  ↳ **`NeverminedEvent`**

  ↳↳ [`ContractEvent`](events.ContractEvent.md)

  ↳↳ [`SubgraphEvent`](events.SubgraphEvent.md)

## Table of contents

### Constructors

- [constructor](events.NeverminedEvent.md#constructor)

### Properties

- [contract](events.NeverminedEvent.md#contract)
- [eventEmitter](events.NeverminedEvent.md#eventemitter)

### Accessors

- [artifactsFolder](events.NeverminedEvent.md#artifactsfolder)
- [config](events.NeverminedEvent.md#config)
- [instanceConfig](events.NeverminedEvent.md#instanceconfig)
- [instantiableConfig](events.NeverminedEvent.md#instantiableconfig)
- [logger](events.NeverminedEvent.md#logger)
- [nevermined](events.NeverminedEvent.md#nevermined)
- [web3](events.NeverminedEvent.md#web3)

### Methods

- [addresses](events.NeverminedEvent.md#addresses)
- [checkExists](events.NeverminedEvent.md#checkexists)
- [findSigner](events.NeverminedEvent.md#findsigner)
- [getBlockNumber](events.NeverminedEvent.md#getblocknumber)
- [getEventData](events.NeverminedEvent.md#geteventdata)
- [getPastEvents](events.NeverminedEvent.md#getpastevents)
- [once](events.NeverminedEvent.md#once)
- [setInstanceConfig](events.NeverminedEvent.md#setinstanceconfig)
- [subscribe](events.NeverminedEvent.md#subscribe)
- [addressesStatic](events.NeverminedEvent.md#addressesstatic)
- [findSignerStatic](events.NeverminedEvent.md#findsignerstatic)
- [getInstance](events.NeverminedEvent.md#getinstance)
- [setInstanceConfig](events.NeverminedEvent.md#setinstanceconfig-1)

## Constructors

### constructor

• `Protected` **new NeverminedEvent**(`contract`, `eventEmitter`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `ContractBase` |
| `eventEmitter` | [`EventEmitter`](../interfaces/events.EventEmitter.md) |

#### Overrides

Instantiable.constructor

#### Defined in

[src/events/NeverminedEvent.ts:35](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/NeverminedEvent.ts#L35)

## Properties

### contract

• `Protected` **contract**: `ContractBase` = `null`

#### Defined in

[src/events/NeverminedEvent.ts:30](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/NeverminedEvent.ts#L30)

___

### eventEmitter

• `Protected` **eventEmitter**: [`EventEmitter`](../interfaces/events.EventEmitter.md)

#### Defined in

[src/events/NeverminedEvent.ts:29](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/NeverminedEvent.ts#L29)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:96](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L96)

___

### config

• `Protected` `get` **config**(): [`Config`](Config.md)

#### Returns

[`Config`](Config.md)

#### Inherited from

Instantiable.config

#### Defined in

[src/Instantiable.abstract.ts:80](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L80)

___

### instanceConfig

• `Protected` `get` **instanceConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Instantiable.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:100](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L100)

___

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): `InstantiableConfig`

#### Returns

`InstantiableConfig`

#### Inherited from

Instantiable.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L73)

___

### logger

• `Protected` `get` **logger**(): [`Logger`](utils.Logger.md)

#### Returns

[`Logger`](utils.Logger.md)

#### Inherited from

Instantiable.logger

#### Defined in

[src/Instantiable.abstract.ts:87](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L87)

___

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Instantiable.nevermined

#### Defined in

[src/Instantiable.abstract.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L33)

___

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

Instantiable.checkExists

#### Defined in

[src/Instantiable.abstract.ts:44](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L44)

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

[src/Instantiable.abstract.ts:105](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L105)

___

### getBlockNumber

▸ `Abstract` **getBlockNumber**(...`args`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/events/NeverminedEvent.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/NeverminedEvent.ts#L33)

___

### getEventData

▸ `Abstract` **getEventData**(`options`): [`EventResult`](../modules/events.md#eventresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`EventOptions`](../interfaces/events.EventOptions.md) |

#### Returns

[`EventResult`](../modules/events.md#eventresult)

#### Defined in

[src/events/NeverminedEvent.ts:31](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/NeverminedEvent.ts#L31)

___

### getPastEvents

▸ `Abstract` **getPastEvents**(`options`): [`EventResult`](../modules/events.md#eventresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`EventOptions`](../interfaces/events.EventOptions.md) |

#### Returns

[`EventResult`](../modules/events.md#eventresult)

#### Defined in

[src/events/NeverminedEvent.ts:32](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/NeverminedEvent.ts#L32)

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

Instantiable.setInstanceConfig

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

Instantiable.addressesStatic

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

Instantiable.findSignerStatic

#### Defined in

[src/Instantiable.abstract.ts:115](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L115)

___

### getInstance

▸ `Static` **getInstance**(...`_args`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `..._args` | `any` |

#### Returns

`any`

#### Inherited from

Instantiable.getInstance

#### Defined in

[src/Instantiable.abstract.ts:158](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L158)

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

[src/Instantiable.abstract.ts:162](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/Instantiable.abstract.ts#L162)
