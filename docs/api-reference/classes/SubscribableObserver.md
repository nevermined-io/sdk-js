[@nevermined-io/sdk - v3.0.42](../code-reference.md) / SubscribableObserver

# Class: SubscribableObserver\<T, P\>

## Type parameters

| Name |
| :--- |
| `T`  |
| `P`  |

## Table of contents

### Constructors

- [constructor](SubscribableObserver.md#constructor)

### Properties

- [completed](SubscribableObserver.md#completed)
- [subscriptions](SubscribableObserver.md#subscriptions)

### Methods

- [complete](SubscribableObserver.md#complete)
- [emit](SubscribableObserver.md#emit)
- [error](SubscribableObserver.md#error)
- [next](SubscribableObserver.md#next)
- [subscribe](SubscribableObserver.md#subscribe)
- [unsubscribe](SubscribableObserver.md#unsubscribe)

## Constructors

### constructor

• **new SubscribableObserver**\<`T`, `P`\>(): [`SubscribableObserver`](SubscribableObserver.md)\<`T`, `P`\>

#### Type parameters

| Name |
| :--- |
| `T`  |
| `P`  |

#### Returns

[`SubscribableObserver`](SubscribableObserver.md)\<`T`, `P`\>

## Properties

### completed

• **completed**: `boolean` = `false`

#### Defined in

[src/utils/SubscribableObserver.ts:2](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/utils/SubscribableObserver.ts#L2)

---

### subscriptions

• `Private` **subscriptions**: `Set`\<\{ `onComplete?`: (`complete`: `P`) => `void` ; `onError?`: (`error`: `any`) => `void` ; `onNext?`: (`next`: `T`) => `void` }\>

#### Defined in

[src/utils/SubscribableObserver.ts:4](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/utils/SubscribableObserver.ts#L4)

## Methods

### complete

▸ **complete**(`resolve?`): `void`

#### Parameters

| Name       | Type |
| :--------- | :--- |
| `resolve?` | `P`  |

#### Returns

`void`

#### Defined in

[src/utils/SubscribableObserver.ts:30](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/utils/SubscribableObserver.ts#L30)

---

### emit

▸ **emit**(`type`, `value`): `void`

#### Parameters

| Name    | Type                                        |
| :------ | :------------------------------------------ |
| `type`  | `"onNext"` \| `"onComplete"` \| `"onError"` |
| `value` | `any`                                       |

#### Returns

`void`

#### Defined in

[src/utils/SubscribableObserver.ts:40](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/utils/SubscribableObserver.ts#L40)

---

### error

▸ **error**(`error?`): `void`

#### Parameters

| Name     | Type  |
| :------- | :---- |
| `error?` | `any` |

#### Returns

`void`

#### Defined in

[src/utils/SubscribableObserver.ts:35](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/utils/SubscribableObserver.ts#L35)

---

### next

▸ **next**(`next?`): `void`

#### Parameters

| Name    | Type |
| :------ | :--- |
| `next?` | `T`  |

#### Returns

`void`

#### Defined in

[src/utils/SubscribableObserver.ts:26](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/utils/SubscribableObserver.ts#L26)

---

### subscribe

▸ **subscribe**(`onNext?`, `onComplete?`, `onError?`): `Object`

#### Parameters

| Name          | Type                        |
| :------------ | :-------------------------- |
| `onNext?`     | (`next`: `T`) => `void`     |
| `onComplete?` | (`complete`: `P`) => `void` |
| `onError?`    | (`error`: `any`) => `void`  |

#### Returns

`Object`

| Name          | Type            |
| :------------ | :-------------- |
| `unsubscribe` | () => `boolean` |

#### Defined in

[src/utils/SubscribableObserver.ts:10](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/utils/SubscribableObserver.ts#L10)

---

### unsubscribe

▸ **unsubscribe**(): `void`

#### Returns

`void`

#### Defined in

[src/utils/SubscribableObserver.ts:47](https://github.com/nevermined-io/sdk-js/blob/6dae17b3b84450d8e4cc72ede504295494f55c56/src/utils/SubscribableObserver.ts#L47)
