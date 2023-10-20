[@nevermined-io/sdk](../code-reference.md) / EventHandler

# Class: EventHandler

## Table of contents

### Constructors

- [constructor](EventHandler.md#constructor)

### Properties

- [events](EventHandler.md#events)
- [getBlockNumber](EventHandler.md#getblocknumber)
- [interval](EventHandler.md#interval)
- [lastBlock](EventHandler.md#lastblock)
- [lastTimeout](EventHandler.md#lasttimeout)
- [polling](EventHandler.md#polling)

### Accessors

- [count](EventHandler.md#count)

### Methods

- [checkBlock](EventHandler.md#checkblock)
- [subscribe](EventHandler.md#subscribe)
- [unsubscribe](EventHandler.md#unsubscribe)

## Constructors

### constructor

• **new EventHandler**()

## Properties

### events

• `Private` **events**: `Set`<(`blockNumber`: `any`) => `void`\>

#### Defined in

[src/events/EventHandler.ts:6](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/EventHandler.ts#L6)

---

### getBlockNumber

• `Private` **getBlockNumber**: () => `Promise`<`number`\>

#### Type declaration

▸ (): `Promise`<`number`\>

##### Returns

`Promise`<`number`\>

#### Defined in

[src/events/EventHandler.ts:16](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/EventHandler.ts#L16)

---

### interval

• `Private` **interval**: `number` = `200`

#### Defined in

[src/events/EventHandler.ts:10](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/EventHandler.ts#L10)

---

### lastBlock

• `Private` **lastBlock**: `number`

#### Defined in

[src/events/EventHandler.ts:8](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/EventHandler.ts#L8)

---

### lastTimeout

• `Private` **lastTimeout**: `Timeout`

#### Defined in

[src/events/EventHandler.ts:14](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/EventHandler.ts#L14)

---

### polling

• `Private` **polling**: `boolean` = `false`

#### Defined in

[src/events/EventHandler.ts:12](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/EventHandler.ts#L12)

## Accessors

### count

• `get` **count**(): `number`

#### Returns

`number`

#### Defined in

[src/events/EventHandler.ts:2](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/EventHandler.ts#L2)

## Methods

### checkBlock

▸ `Private` **checkBlock**(`isInterval?`): `Promise`<`void`\>

#### Parameters

| Name          | Type      |
| :------------ | :-------- |
| `isInterval?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/events/EventHandler.ts:37](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/EventHandler.ts#L37)

---

### subscribe

▸ **subscribe**(`callback`, `getBlockNumber`): `Object`

#### Parameters

| Name             | Type                                |
| :--------------- | :---------------------------------- |
| `callback`       | (`blockNumber`: `number`) => `void` |
| `getBlockNumber` | () => `Promise`<`number`\>          |

#### Returns

`Object`

| Name          | Type         |
| :------------ | :----------- |
| `unsubscribe` | () => `void` |

#### Defined in

[src/events/EventHandler.ts:18](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/EventHandler.ts#L18)

---

### unsubscribe

▸ **unsubscribe**(`callback`): `void`

#### Parameters

| Name       | Type                                |
| :--------- | :---------------------------------- |
| `callback` | (`blockNumber`: `number`) => `void` |

#### Returns

`void`

#### Defined in

[src/events/EventHandler.ts:28](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/EventHandler.ts#L28)
