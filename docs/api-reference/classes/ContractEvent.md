[@nevermined-io/sdk](../code-reference.md) / ContractEvent

# Class: ContractEvent

## Hierarchy

- [`NeverminedEvent`](NeverminedEvent.md)

  ↳ **`ContractEvent`**

## Table of contents

### Constructors

- [constructor](ContractEvent.md#constructor)

### Properties

- [contract](ContractEvent.md#contract)
- [eventEmitter](ContractEvent.md#eventemitter)

### Accessors

- [artifactsFolder](ContractEvent.md#artifactsfolder)
- [circuitsFolder](ContractEvent.md#circuitsfolder)
- [config](ContractEvent.md#config)
- [instanceConfig](ContractEvent.md#instanceconfig)
- [instantiableConfig](ContractEvent.md#instantiableconfig)
- [logger](ContractEvent.md#logger)
- [nevermined](ContractEvent.md#nevermined)
- [web3](ContractEvent.md#web3)

### Methods

- [eventExists](ContractEvent.md#eventexists)
- [filterToArgs](ContractEvent.md#filtertoargs)
- [getBlockNumber](ContractEvent.md#getblocknumber)
- [getEventData](ContractEvent.md#geteventdata)
- [getPastEvents](ContractEvent.md#getpastevents)
- [once](ContractEvent.md#once)
- [setInstanceConfig](ContractEvent.md#setinstanceconfig)
- [subscribe](ContractEvent.md#subscribe)
- [getInstance](ContractEvent.md#getinstance)
- [setInstanceConfig](ContractEvent.md#setinstanceconfig-1)

## Constructors

### constructor

• `Protected` **new ContractEvent**(`contract`, `eventEmitter`)

#### Parameters

| Name           | Type                                            |
| :------------- | :---------------------------------------------- |
| `contract`     | [`ContractBase`](ContractBase.md)               |
| `eventEmitter` | [`EventEmitter`](../interfaces/EventEmitter.md) |

#### Inherited from

[NeverminedEvent](NeverminedEvent.md).[constructor](NeverminedEvent.md#constructor)

#### Defined in

[src/events/NeverminedEvent.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/NeverminedEvent.ts#L34)

## Properties

### contract

• `Protected` **contract**: [`ContractBase`](ContractBase.md) = `null`

#### Inherited from

[NeverminedEvent](NeverminedEvent.md).[contract](NeverminedEvent.md#contract)

#### Defined in

[src/events/NeverminedEvent.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/NeverminedEvent.ts#L29)

---

### eventEmitter

• `Protected` **eventEmitter**: [`EventEmitter`](../interfaces/EventEmitter.md)

#### Inherited from

[NeverminedEvent](NeverminedEvent.md).[eventEmitter](NeverminedEvent.md#eventemitter)

#### Defined in

[src/events/NeverminedEvent.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/NeverminedEvent.ts#L28)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

NeverminedEvent.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

NeverminedEvent.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

NeverminedEvent.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

NeverminedEvent.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

NeverminedEvent.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

NeverminedEvent.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

NeverminedEvent.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

NeverminedEvent.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

### eventExists

▸ `Private` **eventExists**(`eventName`): `boolean`

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `eventName` | `string` |

#### Returns

`boolean`

#### Defined in

[src/events/ContractEvent.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/ContractEvent.ts#L57)

---

### filterToArgs

▸ `Private` **filterToArgs**(`eventName`, `filter`): `any`[]

#### Parameters

| Name        | Type                                |
| :---------- | :---------------------------------- |
| `eventName` | `string`                            |
| `filter`    | [`Filter`](../interfaces/Filter.md) |

#### Returns

`any`[]

#### Defined in

[src/events/ContractEvent.ts:61](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/ContractEvent.ts#L61)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Overrides

[NeverminedEvent](NeverminedEvent.md).[getBlockNumber](NeverminedEvent.md#getblocknumber)

#### Defined in

[src/events/ContractEvent.ts:53](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/ContractEvent.ts#L53)

---

### getEventData

▸ **getEventData**(`options`): [`EventResult`](../code-reference.md#eventresult)

#### Parameters

| Name      | Type                                            |
| :-------- | :---------------------------------------------- |
| `options` | [`EventOptions`](../interfaces/EventOptions.md) |

#### Returns

[`EventResult`](../code-reference.md#eventresult)

#### Overrides

[NeverminedEvent](NeverminedEvent.md).[getEventData](NeverminedEvent.md#geteventdata)

#### Defined in

[src/events/ContractEvent.ts:23](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/ContractEvent.ts#L23)

---

### getPastEvents

▸ **getPastEvents**(`options`): [`EventResult`](../code-reference.md#eventresult)

#### Parameters

| Name      | Type                                            |
| :-------- | :---------------------------------------------- |
| `options` | [`EventOptions`](../interfaces/EventOptions.md) |

#### Returns

[`EventResult`](../code-reference.md#eventresult)

#### Overrides

[NeverminedEvent](NeverminedEvent.md).[getPastEvents](NeverminedEvent.md#getpastevents)

#### Defined in

[src/events/ContractEvent.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/ContractEvent.ts#L35)

---

### once

▸ **once**(`callback?`, `options?`): `Promise`<[`EventResult`](../code-reference.md#eventresult)\>

#### Parameters

| Name        | Type                                                                      |
| :---------- | :------------------------------------------------------------------------ |
| `callback?` | (`events`: [`EventResult`](../code-reference.md#eventresult)[]) => `void` |
| `options?`  | [`EventOptions`](../interfaces/EventOptions.md)                           |

#### Returns

`Promise`<[`EventResult`](../code-reference.md#eventresult)\>

#### Inherited from

[NeverminedEvent](NeverminedEvent.md).[once](NeverminedEvent.md#once)

#### Defined in

[src/events/NeverminedEvent.ts:54](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/NeverminedEvent.ts#L54)

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

[NeverminedEvent](NeverminedEvent.md).[setInstanceConfig](NeverminedEvent.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### subscribe

▸ **subscribe**(`callback`, `options`): [`ContractEventSubscription`](../interfaces/ContractEventSubscription.md)

#### Parameters

| Name       | Type                                                                      |
| :--------- | :------------------------------------------------------------------------ |
| `callback` | (`events`: [`EventResult`](../code-reference.md#eventresult)[]) => `void` |
| `options`  | [`EventOptions`](../interfaces/EventOptions.md)                           |

#### Returns

[`ContractEventSubscription`](../interfaces/ContractEventSubscription.md)

#### Inherited from

[NeverminedEvent](NeverminedEvent.md).[subscribe](NeverminedEvent.md#subscribe)

#### Defined in

[src/events/NeverminedEvent.ts:40](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/NeverminedEvent.ts#L40)

---

### getInstance

▸ `Static` **getInstance**(`contract`, `eventEmitter`, `nevermined`, `web3`): [`ContractEvent`](ContractEvent.md)

#### Parameters

| Name           | Type                                            |
| :------------- | :---------------------------------------------- |
| `contract`     | [`ContractBase`](ContractBase.md)               |
| `eventEmitter` | [`EventEmitter`](../interfaces/EventEmitter.md) |
| `nevermined`   | [`Nevermined`](Nevermined.md)                   |
| `web3`         | `JsonRpcProvider` \| `BrowserProvider`          |

#### Returns

[`ContractEvent`](ContractEvent.md)

#### Overrides

[NeverminedEvent](NeverminedEvent.md).[getInstance](NeverminedEvent.md#getinstance)

#### Defined in

[src/events/ContractEvent.ts:8](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/ContractEvent.ts#L8)

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

[NeverminedEvent](NeverminedEvent.md).[setInstanceConfig](NeverminedEvent.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
