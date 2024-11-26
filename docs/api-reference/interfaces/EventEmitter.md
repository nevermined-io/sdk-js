[@nevermined-io/sdk - v3.0.44](../code-reference.md) / EventEmitter

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

[src/types/EventTypes.ts:17](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/types/EventTypes.ts#L17)

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

[src/types/EventTypes.ts:18](https://github.com/nevermined-io/sdk-js/blob/1f765603c75b92c5d8798f51b63641eb0639883b/src/types/EventTypes.ts#L18)
