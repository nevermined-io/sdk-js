[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [utils](../modules/utils.md) / SubscribableObserver

# Class: SubscribableObserver<T, P\>

[utils](../modules/utils.md).SubscribableObserver

## Type parameters

| Name |
| :------ |
| `T` |
| `P` |

## Table of contents

### Constructors

- [constructor](utils.SubscribableObserver.md#constructor)

### Properties

- [completed](utils.SubscribableObserver.md#completed)
- [subscriptions](utils.SubscribableObserver.md#subscriptions)

### Methods

- [complete](utils.SubscribableObserver.md#complete)
- [emit](utils.SubscribableObserver.md#emit)
- [error](utils.SubscribableObserver.md#error)
- [next](utils.SubscribableObserver.md#next)
- [subscribe](utils.SubscribableObserver.md#subscribe)
- [unsubscribe](utils.SubscribableObserver.md#unsubscribe)

## Constructors

### constructor

• **new SubscribableObserver**<`T`, `P`\>()

#### Type parameters

| Name |
| :------ |
| `T` |
| `P` |

## Properties

### completed

• **completed**: `boolean` = `false`

#### Defined in

[src/utils/SubscribableObserver.ts:2](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribableObserver.ts#L2)

___

### subscriptions

• `Private` **subscriptions**: `Set`<{ `onComplete?`: (`complete`: `P`) => `void` ; `onError?`: (`error`: `any`) => `void` ; `onNext?`: (`next`: `T`) => `void`  }\>

#### Defined in

[src/utils/SubscribableObserver.ts:4](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribableObserver.ts#L4)

## Methods

### complete

▸ **complete**(`resolve?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resolve?` | `P` |

#### Returns

`void`

#### Defined in

[src/utils/SubscribableObserver.ts:30](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribableObserver.ts#L30)

___

### emit

▸ `Private` **emit**(`type`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"onError"`` \| ``"onNext"`` \| ``"onComplete"`` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[src/utils/SubscribableObserver.ts:40](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribableObserver.ts#L40)

___

### error

▸ **error**(`error?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | `any` |

#### Returns

`void`

#### Defined in

[src/utils/SubscribableObserver.ts:35](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribableObserver.ts#L35)

___

### next

▸ **next**(`next?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `next?` | `T` |

#### Returns

`void`

#### Defined in

[src/utils/SubscribableObserver.ts:26](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribableObserver.ts#L26)

___

### subscribe

▸ **subscribe**(`onNext?`, `onComplete?`, `onError?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onNext?` | (`next`: `T`) => `void` |
| `onComplete?` | (`complete`: `P`) => `void` |
| `onError?` | (`error`: `any`) => `void` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `unsubscribe` | () => `boolean` |

#### Defined in

[src/utils/SubscribableObserver.ts:10](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribableObserver.ts#L10)

___

### unsubscribe

▸ `Private` **unsubscribe**(): `void`

#### Returns

`void`

#### Defined in

[src/utils/SubscribableObserver.ts:47](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribableObserver.ts#L47)
