[@nevermined-io/sdk - v3.0.23](../code-reference.md) / SubscribablePromise

# Class: SubscribablePromise\<T, P\>

## Type parameters

| Name |
| :--- |
| `T`  |
| `P`  |

## Table of contents

### Constructors

- [constructor](SubscribablePromise.md#constructor)

### Properties

- [observer](SubscribablePromise.md#observer)
- [promise](SubscribablePromise.md#promise)

### Methods

- [catch](SubscribablePromise.md#catch)
- [finally](SubscribablePromise.md#finally)
- [init](SubscribablePromise.md#init)
- [next](SubscribablePromise.md#next)
- [subscribe](SubscribablePromise.md#subscribe)
- [then](SubscribablePromise.md#then)

## Constructors

### constructor

• **new SubscribablePromise**\<`T`, `P`\>(`executor`): [`SubscribablePromise`](SubscribablePromise.md)\<`T`, `P`\>

#### Type parameters

| Name |
| :--- |
| `T`  |
| `P`  |

#### Parameters

| Name       | Type                                                                                                      |
| :--------- | :-------------------------------------------------------------------------------------------------------- |
| `executor` | (`observer`: [`SubscribableObserver`](SubscribableObserver.md)\<`T`, `P`\>) => `void` \| `Promise`\<`P`\> |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)\<`T`, `P`\>

#### Defined in

[src/utils/SubscribablePromise.ts:15](https://github.com/nevermined-io/sdk-js/blob/1cda883adfb801658f47efa6d7c6cc8f9f8998da/src/utils/SubscribablePromise.ts#L15)

## Properties

### observer

• `Private` **observer**: [`SubscribableObserver`](SubscribableObserver.md)\<`T`, `P`\>

#### Defined in

[src/utils/SubscribablePromise.ts:4](https://github.com/nevermined-io/sdk-js/blob/1cda883adfb801658f47efa6d7c6cc8f9f8998da/src/utils/SubscribablePromise.ts#L4)

---

### promise

• `Private` **promise**: `Promise`\<`P`\> & [`SubscribablePromise`](SubscribablePromise.md)\<`T`, `P`\>

#### Defined in

[src/utils/SubscribablePromise.ts:6](https://github.com/nevermined-io/sdk-js/blob/1cda883adfb801658f47efa6d7c6cc8f9f8998da/src/utils/SubscribablePromise.ts#L6)

## Methods

### catch

▸ **catch**(`onrejected?`): `Promise`\<`any`\> & [`SubscribablePromise`](SubscribablePromise.md)\<`T`, `P`\>

#### Parameters

| Name          | Type                      |
| :------------ | :------------------------ |
| `onrejected?` | (`error`: `any`) => `any` |

#### Returns

`Promise`\<`any`\> & [`SubscribablePromise`](SubscribablePromise.md)\<`T`, `P`\>

#### Defined in

[src/utils/SubscribablePromise.ts:33](https://github.com/nevermined-io/sdk-js/blob/1cda883adfb801658f47efa6d7c6cc8f9f8998da/src/utils/SubscribablePromise.ts#L33)

---

### finally

▸ **finally**(`onfinally?`): `Promise`\<`P`\> & [`SubscribablePromise`](SubscribablePromise.md)\<`T`, `P`\>

#### Parameters

| Name         | Type        |
| :----------- | :---------- |
| `onfinally?` | () => `any` |

#### Returns

`Promise`\<`P`\> & [`SubscribablePromise`](SubscribablePromise.md)\<`T`, `P`\>

#### Defined in

[src/utils/SubscribablePromise.ts:37](https://github.com/nevermined-io/sdk-js/blob/1cda883adfb801658f47efa6d7c6cc8f9f8998da/src/utils/SubscribablePromise.ts#L37)

---

### init

▸ **init**(`executor`): `void`

#### Parameters

| Name       | Type                                                                                                      |
| :--------- | :-------------------------------------------------------------------------------------------------------- |
| `executor` | (`observer`: [`SubscribableObserver`](SubscribableObserver.md)\<`T`, `P`\>) => `void` \| `Promise`\<`P`\> |

#### Returns

`void`

#### Defined in

[src/utils/SubscribablePromise.ts:41](https://github.com/nevermined-io/sdk-js/blob/1cda883adfb801658f47efa6d7c6cc8f9f8998da/src/utils/SubscribablePromise.ts#L41)

---

### next

▸ **next**(`onNext`): [`SubscribablePromise`](SubscribablePromise.md)\<`T`, `P`\>

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `onNext` | (`next`: `T`) => `void` |

#### Returns

[`SubscribablePromise`](SubscribablePromise.md)\<`T`, `P`\>

#### Defined in

[src/utils/SubscribablePromise.ts:24](https://github.com/nevermined-io/sdk-js/blob/1cda883adfb801658f47efa6d7c6cc8f9f8998da/src/utils/SubscribablePromise.ts#L24)

---

### subscribe

▸ **subscribe**(`onNext`): `Object`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `onNext` | (`next`: `T`) => `void` |

#### Returns

`Object`

| Name          | Type            |
| :------------ | :-------------- |
| `unsubscribe` | () => `boolean` |

#### Defined in

[src/utils/SubscribablePromise.ts:20](https://github.com/nevermined-io/sdk-js/blob/1cda883adfb801658f47efa6d7c6cc8f9f8998da/src/utils/SubscribablePromise.ts#L20)

---

### then

▸ **then**(`onfulfilled?`, `onrejected?`): `Promise`\<`any`\> & [`SubscribablePromise`](SubscribablePromise.md)\<`T`, `P`\>

#### Parameters

| Name           | Type                      |
| :------------- | :------------------------ |
| `onfulfilled?` | (`value`: `P`) => `any`   |
| `onrejected?`  | (`error`: `any`) => `any` |

#### Returns

`Promise`\<`any`\> & [`SubscribablePromise`](SubscribablePromise.md)\<`T`, `P`\>

#### Defined in

[src/utils/SubscribablePromise.ts:29](https://github.com/nevermined-io/sdk-js/blob/1cda883adfb801658f47efa6d7c6cc8f9f8998da/src/utils/SubscribablePromise.ts#L29)
