[@nevermined-io/sdk - v3.0.25](../code-reference.md) / EventEmitter

# Interface: EventEmitter

## Table of contents

### Properties

- [subscribe](EventEmitter.md#subscribe)
- [unsubscribe](EventEmitter.md#unsubscribe)

## Properties

### subscribe

• **subscribe**: (`callback`: () => `Promise`\<`void`\>, `arg1`: () => `Promise`\<`bigint`\>) => `void`

#### Type declaration

▸ (`callback`, `arg1`): `void`

##### Parameters

| Name       | Type                        |
| :--------- | :-------------------------- |
| `callback` | () => `Promise`\<`void`\>   |
| `arg1`     | () => `Promise`\<`bigint`\> |

##### Returns

`void`

#### Defined in

[src/types/EventTypes.ts:17](https://github.com/nevermined-io/sdk-js/blob/94c3826129f75a1cbded6d423b6664e7f6d5daaa/src/types/EventTypes.ts#L17)

---

### unsubscribe

• **unsubscribe**: (`arg0`: () => `Promise`\<`void`\>) => `void`

#### Type declaration

▸ (`arg0`): `void`

##### Parameters

| Name   | Type                      |
| :----- | :------------------------ |
| `arg0` | () => `Promise`\<`void`\> |

##### Returns

`void`

#### Defined in

[src/types/EventTypes.ts:18](https://github.com/nevermined-io/sdk-js/blob/94c3826129f75a1cbded6d423b6664e7f6d5daaa/src/types/EventTypes.ts#L18)
