[@nevermined-io/sdk](../code-reference.md) / SignatureUtils

# Class: SignatureUtils

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`SignatureUtils`**

## Table of contents

### Constructors

- [constructor](SignatureUtils.md#constructor)

### Accessors

- [artifactsFolder](SignatureUtils.md#artifactsfolder)
- [circuitsFolder](SignatureUtils.md#circuitsfolder)
- [config](SignatureUtils.md#config)
- [instanceConfig](SignatureUtils.md#instanceconfig)
- [instantiableConfig](SignatureUtils.md#instantiableconfig)
- [logger](SignatureUtils.md#logger)
- [nevermined](SignatureUtils.md#nevermined)
- [web3](SignatureUtils.md#web3)

### Methods

- [setInstanceConfig](SignatureUtils.md#setinstanceconfig)
- [signText](SignatureUtils.md#signtext)
- [verifyText](SignatureUtils.md#verifytext)
- [getInstance](SignatureUtils.md#getinstance)
- [hash](SignatureUtils.md#hash)
- [setInstanceConfig](SignatureUtils.md#setinstanceconfig-1)

## Constructors

### constructor

• **new SignatureUtils**(`config`)

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/nevermined/utils/SignatureUtils.ts:5](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/SignatureUtils.ts#L5)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

Instantiable.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

Instantiable.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Instantiable.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

Instantiable.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

Instantiable.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

Instantiable.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

Instantiable.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

### setInstanceConfig

▸ `Protected` **setInstanceConfig**(`config`): `void`

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`void`

#### Inherited from

[Instantiable](Instantiable.md).[setInstanceConfig](Instantiable.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### signText

▸ **signText**(`text`, `address`): `Promise`<`string`\>

#### Parameters

| Name      | Type                     |
| :-------- | :----------------------- |
| `text`    | `string` \| `Uint8Array` |
| `address` | `string`                 |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/SignatureUtils.ts:10](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/SignatureUtils.ts#L10)

---

### verifyText

▸ **verifyText**(`text`, `signature`): `Promise`<`string`\>

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `text`      | `string` |
| `signature` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nevermined/utils/SignatureUtils.ts:22](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/SignatureUtils.ts#L22)

---

### getInstance

▸ `Static` **getInstance**(`..._args`): `any`

#### Parameters

| Name       | Type  |
| :--------- | :---- |
| `..._args` | `any` |

#### Returns

`any`

#### Inherited from

[Instantiable](Instantiable.md).[getInstance](Instantiable.md#getinstance)

#### Defined in

[src/Instantiable.abstract.ts:86](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L86)

---

### hash

▸ `Static` **hash**(`seed`): `string`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `seed` | `string` |

#### Returns

`string`

#### Defined in

[src/nevermined/utils/SignatureUtils.ts:26](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/utils/SignatureUtils.ts#L26)

---

### setInstanceConfig

▸ `Static` `Protected` **setInstanceConfig**<`T`\>(`instance`, `instantiableConfig`): `void`

#### Type parameters

| Name | Type                                      |
| :--- | :---------------------------------------- |
| `T`  | extends [`Instantiable`](Instantiable.md) |

#### Parameters

| Name                 | Type                                                        |
| :------------------- | :---------------------------------------------------------- |
| `instance`           | `T`                                                         |
| `instantiableConfig` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Returns

`void`

#### Inherited from

[Instantiable](Instantiable.md).[setInstanceConfig](Instantiable.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
