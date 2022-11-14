[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [events](../modules/events.md) / EventHandler

# Class: EventHandler

[events](../modules/events.md).EventHandler

## Table of contents

### Constructors

- [constructor](events.EventHandler.md#constructor)

### Properties

- [events](events.EventHandler.md#events)
- [getBlockNumber](events.EventHandler.md#getblocknumber)
- [interval](events.EventHandler.md#interval)
- [lastBlock](events.EventHandler.md#lastblock)
- [lastTimeout](events.EventHandler.md#lasttimeout)
- [polling](events.EventHandler.md#polling)

### Accessors

- [count](events.EventHandler.md#count)

### Methods

- [checkBlock](events.EventHandler.md#checkblock)
- [subscribe](events.EventHandler.md#subscribe)
- [unsubscribe](events.EventHandler.md#unsubscribe)

## Constructors

### constructor

• **new EventHandler**()

## Properties

### events

• `Private` **events**: `Set`<(`blockNumber`: `any`) => `void`\>

#### Defined in

[src/events/EventHandler.ts:6](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/EventHandler.ts#L6)

___

### getBlockNumber

• `Private` **getBlockNumber**: () => `Promise`<`number`\>

#### Type declaration

▸ (): `Promise`<`number`\>

##### Returns

`Promise`<`number`\>

#### Defined in

[src/events/EventHandler.ts:16](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/EventHandler.ts#L16)

___

### interval

• `Private` **interval**: `number` = `200`

#### Defined in

[src/events/EventHandler.ts:10](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/EventHandler.ts#L10)

___

### lastBlock

• `Private` **lastBlock**: `number`

#### Defined in

[src/events/EventHandler.ts:8](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/EventHandler.ts#L8)

___

### lastTimeout

• `Private` **lastTimeout**: `Timeout`

#### Defined in

[src/events/EventHandler.ts:14](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/EventHandler.ts#L14)

___

### polling

• `Private` **polling**: `boolean` = `false`

#### Defined in

[src/events/EventHandler.ts:12](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/EventHandler.ts#L12)

## Accessors

### count

• `get` **count**(): `number`

#### Returns

`number`

#### Defined in

[src/events/EventHandler.ts:2](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/EventHandler.ts#L2)

## Methods

### checkBlock

▸ `Private` **checkBlock**(`isInterval?`, `n?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `isInterval?` | `boolean` | `undefined` |
| `n` | `number` | `0` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/events/EventHandler.ts:40](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/EventHandler.ts#L40)

___

### subscribe

▸ **subscribe**(`callback`, `getBlockNumber`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`blockNumber`: `number`) => `void` |
| `getBlockNumber` | () => `Promise`<`number`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `unsubscribe` | () => `void` |

#### Defined in

[src/events/EventHandler.ts:18](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/EventHandler.ts#L18)

___

### unsubscribe

▸ **unsubscribe**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`blockNumber`: `number`) => `void` |

#### Returns

`void`

#### Defined in

[src/events/EventHandler.ts:31](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/EventHandler.ts#L31)
