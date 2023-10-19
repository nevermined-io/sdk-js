[@nevermined-io/sdk](../code-reference.md) / EventEmitter

# Interface: EventEmitter

## Table of contents

### Properties

- [subscribe](EventEmitter.md#subscribe)
- [unsubscribe](EventEmitter.md#unsubscribe)

## Properties

### subscribe

• **subscribe**: (`callback`: () => `Promise`<`void`\>, `arg1`: () => `Promise`<`number`\>) => `void`

#### Type declaration

▸ (`callback`, `arg1`): `void`

##### Parameters

| Name       | Type                       |
| :--------- | :------------------------- |
| `callback` | () => `Promise`<`void`\>   |
| `arg1`     | () => `Promise`<`number`\> |

##### Returns

`void`

#### Defined in

[src/events/NeverminedEvent.ts:17](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/NeverminedEvent.ts#L17)

---

### unsubscribe

• **unsubscribe**: (`arg0`: () => `Promise`<`void`\>) => `void`

#### Type declaration

▸ (`arg0`): `void`

##### Parameters

| Name   | Type                     |
| :----- | :----------------------- |
| `arg0` | () => `Promise`<`void`\> |

##### Returns

`void`

#### Defined in

[src/events/NeverminedEvent.ts:18](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/events/NeverminedEvent.ts#L18)
