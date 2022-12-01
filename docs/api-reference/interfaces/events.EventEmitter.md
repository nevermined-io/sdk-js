[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [events](../modules/events.md) / EventEmitter

# Interface: EventEmitter

[events](../modules/events.md).EventEmitter

## Table of contents

### Properties

- [subscribe](events.EventEmitter.md#subscribe)
- [unsubscribe](events.EventEmitter.md#unsubscribe)

## Properties

### subscribe

• **subscribe**: (`callback`: () => `Promise`<`void`\>, `arg1`: () => `Promise`<`number`\>) => `void`

#### Type declaration

▸ (`callback`, `arg1`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `Promise`<`void`\> |
| `arg1` | () => `Promise`<`number`\> |

##### Returns

`void`

#### Defined in

[src/events/NeverminedEvent.ts:18](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/NeverminedEvent.ts#L18)

___

### unsubscribe

• **unsubscribe**: (`arg0`: () => `Promise`<`void`\>) => `void`

#### Type declaration

▸ (`arg0`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg0` | () => `Promise`<`void`\> |

##### Returns

`void`

#### Defined in

[src/events/NeverminedEvent.ts:19](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/events/NeverminedEvent.ts#L19)
