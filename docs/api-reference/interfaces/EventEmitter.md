[@nevermined-io/sdk - v3.0.33](../code-reference.md) / EventEmitter

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

[src/types/EventTypes.ts:17](https://github.com/nevermined-io/sdk-js/blob/52fd1167668ed7223a94e3de0b05f43aa729e3f8/src/types/EventTypes.ts#L17)

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

[src/types/EventTypes.ts:18](https://github.com/nevermined-io/sdk-js/blob/52fd1167668ed7223a94e3de0b05f43aa729e3f8/src/types/EventTypes.ts#L18)
