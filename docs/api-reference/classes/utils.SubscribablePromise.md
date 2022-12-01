[@nevermined-io/nevermined-sdk-js](../code-reference.md) / [utils](../modules/utils.md) / SubscribablePromise

# Class: SubscribablePromise<T, P\>

[utils](../modules/utils.md).SubscribablePromise

## Type parameters

| Name |
| :------ |
| `T` |
| `P` |

## Table of contents

### Constructors

- [constructor](utils.SubscribablePromise.md#constructor)

### Properties

- [observer](utils.SubscribablePromise.md#observer)
- [promise](utils.SubscribablePromise.md#promise)

### Methods

- [catch](utils.SubscribablePromise.md#catch)
- [finally](utils.SubscribablePromise.md#finally)
- [init](utils.SubscribablePromise.md#init)
- [next](utils.SubscribablePromise.md#next)
- [subscribe](utils.SubscribablePromise.md#subscribe)
- [then](utils.SubscribablePromise.md#then)

## Constructors

### constructor

• **new SubscribablePromise**<`T`, `P`\>(`executor`)

#### Type parameters

| Name |
| :------ |
| `T` |
| `P` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `executor` | (`observer`: [`SubscribableObserver`](utils.SubscribableObserver.md)<`T`, `P`\>) => `void` \| `Promise`<`P`\> |

#### Defined in

[src/utils/SubscribablePromise.ts:15](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribablePromise.ts#L15)

## Properties

### observer

• `Private` **observer**: [`SubscribableObserver`](utils.SubscribableObserver.md)<`T`, `P`\>

#### Defined in

[src/utils/SubscribablePromise.ts:4](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribablePromise.ts#L4)

___

### promise

• `Private` **promise**: `Promise`<`P`\> & [`SubscribablePromise`](utils.SubscribablePromise.md)<`T`, `P`\>

#### Defined in

[src/utils/SubscribablePromise.ts:6](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribablePromise.ts#L6)

## Methods

### catch

▸ **catch**(`onrejected?`): `Promise`<`any`\> & [`SubscribablePromise`](utils.SubscribablePromise.md)<`T`, `P`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `onrejected?` | (`error`: `any`) => `any` |

#### Returns

`Promise`<`any`\> & [`SubscribablePromise`](utils.SubscribablePromise.md)<`T`, `P`\>

#### Defined in

[src/utils/SubscribablePromise.ts:33](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribablePromise.ts#L33)

___

### finally

▸ **finally**(`onfinally?`): `Promise`<`P`\> & [`SubscribablePromise`](utils.SubscribablePromise.md)<`T`, `P`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `onfinally?` | () => `any` |

#### Returns

`Promise`<`P`\> & [`SubscribablePromise`](utils.SubscribablePromise.md)<`T`, `P`\>

#### Defined in

[src/utils/SubscribablePromise.ts:37](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribablePromise.ts#L37)

___

### init

▸ `Private` **init**(`executor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `executor` | (`observer`: [`SubscribableObserver`](utils.SubscribableObserver.md)<`T`, `P`\>) => `void` \| `Promise`<`P`\> |

#### Returns

`void`

#### Defined in

[src/utils/SubscribablePromise.ts:41](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribablePromise.ts#L41)

___

### next

▸ **next**(`onNext`): [`SubscribablePromise`](utils.SubscribablePromise.md)<`T`, `P`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `onNext` | (`next`: `T`) => `void` |

#### Returns

[`SubscribablePromise`](utils.SubscribablePromise.md)<`T`, `P`\>

#### Defined in

[src/utils/SubscribablePromise.ts:24](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribablePromise.ts#L24)

___

### subscribe

▸ **subscribe**(`onNext`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onNext` | (`next`: `T`) => `void` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `unsubscribe` | () => `boolean` |

#### Defined in

[src/utils/SubscribablePromise.ts:20](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribablePromise.ts#L20)

___

### then

▸ **then**(`onfulfilled?`, `onrejected?`): `Promise`<`any`\> & [`SubscribablePromise`](utils.SubscribablePromise.md)<`T`, `P`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `onfulfilled?` | (`value`: `P`) => `any` |
| `onrejected?` | (`error`: `any`) => `any` |

#### Returns

`Promise`<`any`\> & [`SubscribablePromise`](utils.SubscribablePromise.md)<`T`, `P`\>

#### Defined in

[src/utils/SubscribablePromise.ts:29](https://github.com/nevermined-io/sdk-js/blob/55f88d2/src/utils/SubscribablePromise.ts#L29)
