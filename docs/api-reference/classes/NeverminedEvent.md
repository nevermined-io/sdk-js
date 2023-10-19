[@nevermined-io/sdk](../code-reference.md) / NeverminedEvent

# Class: NeverminedEvent

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`NeverminedEvent`**

  ↳↳ [`ContractEvent`](ContractEvent.md)

  ↳↳ [`SubgraphEvent`](SubgraphEvent.md)

## Table of contents

### Constructors

- [constructor](NeverminedEvent.md#constructor)

### Properties

- [contract](NeverminedEvent.md#contract)
- [eventEmitter](NeverminedEvent.md#eventemitter)

### Accessors

- [artifactsFolder](NeverminedEvent.md#artifactsfolder)
- [circuitsFolder](NeverminedEvent.md#circuitsfolder)
- [config](NeverminedEvent.md#config)
- [instanceConfig](NeverminedEvent.md#instanceconfig)
- [instantiableConfig](NeverminedEvent.md#instantiableconfig)
- [logger](NeverminedEvent.md#logger)
- [nevermined](NeverminedEvent.md#nevermined)
- [web3](NeverminedEvent.md#web3)

### Methods

- [getBlockNumber](NeverminedEvent.md#getblocknumber)
- [getEventData](NeverminedEvent.md#geteventdata)
- [getPastEvents](NeverminedEvent.md#getpastevents)
- [once](NeverminedEvent.md#once)
- [setInstanceConfig](NeverminedEvent.md#setinstanceconfig)
- [subscribe](NeverminedEvent.md#subscribe)
- [getInstance](NeverminedEvent.md#getinstance)
- [setInstanceConfig](NeverminedEvent.md#setinstanceconfig-1)

## Constructors

### constructor

• `Protected` **new NeverminedEvent**(`contract`, `eventEmitter`)

#### Parameters

| Name           | Type                                            |
| :------------- | :---------------------------------------------- |
| `contract`     | [`ContractBase`](ContractBase.md)               |
| `eventEmitter` | [`EventEmitter`](../interfaces/EventEmitter.md) |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/events/NeverminedEvent.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/NeverminedEvent.ts#L34)

## Properties

### contract

• `Protected` **contract**: [`ContractBase`](ContractBase.md) = `null`

#### Defined in

[src/events/NeverminedEvent.ts:29](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/NeverminedEvent.ts#L29)

---

### eventEmitter

• `Protected` **eventEmitter**: [`EventEmitter`](../interfaces/EventEmitter.md)

#### Defined in

[src/events/NeverminedEvent.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/NeverminedEvent.ts#L28)

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

### getBlockNumber

▸ `Abstract` **getBlockNumber**(`...args`): `Promise`<`number`\>

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/events/NeverminedEvent.ts:32](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/NeverminedEvent.ts#L32)

---

### getEventData

▸ `Abstract` **getEventData**(`options`): [`EventResult`](../code-reference.md#eventresult)

#### Parameters

| Name      | Type                                            |
| :-------- | :---------------------------------------------- |
| `options` | [`EventOptions`](../interfaces/EventOptions.md) |

#### Returns

[`EventResult`](../code-reference.md#eventresult)

#### Defined in

[src/events/NeverminedEvent.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/NeverminedEvent.ts#L30)

---

### getPastEvents

▸ `Abstract` **getPastEvents**(`options`): [`EventResult`](../code-reference.md#eventresult)

#### Parameters

| Name      | Type                                            |
| :-------- | :---------------------------------------------- |
| `options` | [`EventOptions`](../interfaces/EventOptions.md) |

#### Returns

[`EventResult`](../code-reference.md#eventresult)

#### Defined in

[src/events/NeverminedEvent.ts:31](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/NeverminedEvent.ts#L31)

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

[Instantiable](Instantiable.md).[setInstanceConfig](Instantiable.md#setinstanceconfig)

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

#### Defined in

[src/events/NeverminedEvent.ts:40](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/NeverminedEvent.ts#L40)

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
