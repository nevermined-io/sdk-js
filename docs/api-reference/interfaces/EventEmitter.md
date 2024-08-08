[@nevermined-io/sdk - v3.0.23-rc0](../code-reference.md) / EventEmitter

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

[src/types/EventTypes.ts:17](https://github.com/nevermined-io/sdk-js/blob/0917aa7cdaec3f72007eb6710fe0bd1232cfb930/src/types/EventTypes.ts#L17)

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

[src/types/EventTypes.ts:18](https://github.com/nevermined-io/sdk-js/blob/0917aa7cdaec3f72007eb6710fe0bd1232cfb930/src/types/EventTypes.ts#L18)
