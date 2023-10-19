[@nevermined-io/sdk](../code-reference.md) / UtilsApi

# Class: UtilsApi

Nevermined Utils API

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`UtilsApi`**

## Table of contents

### Constructors

- [constructor](UtilsApi.md#constructor)

### Properties

- [agreements](UtilsApi.md#agreements)
- [contractHandler](UtilsApi.md#contracthandler)
- [fetch](UtilsApi.md#fetch)
- [files](UtilsApi.md#files)
- [jwt](UtilsApi.md#jwt)
- [signature](UtilsApi.md#signature)
- [token](UtilsApi.md#token)
- [versions](UtilsApi.md#versions)

### Accessors

- [artifactsFolder](UtilsApi.md#artifactsfolder)
- [circuitsFolder](UtilsApi.md#circuitsfolder)
- [config](UtilsApi.md#config)
- [instanceConfig](UtilsApi.md#instanceconfig)
- [instantiableConfig](UtilsApi.md#instantiableconfig)
- [logger](UtilsApi.md#logger)
- [nevermined](UtilsApi.md#nevermined)
- [web3](UtilsApi.md#web3)

### Methods

- [setInstanceConfig](UtilsApi.md#setinstanceconfig)
- [getInstance](UtilsApi.md#getinstance)
- [setInstanceConfig](UtilsApi.md#setinstanceconfig-1)

## Constructors

### constructor

• **new UtilsApi**(`config`)

Creates a new AssetsApi

#### Parameters

| Name     | Type                                                        | Description                              |
| :------- | :---------------------------------------------------------- | :--------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) | Configuration of the Nevermined instance |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/nevermined/api/UtilsApi.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/UtilsApi.ts#L57)

## Properties

### agreements

• **agreements**: [`ServiceAgreement`](ServiceAgreement.md)

Agreement utils.

#### Defined in

[src/nevermined/api/UtilsApi.ts:15](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/UtilsApi.ts#L15)

---

### contractHandler

• **contractHandler**: [`ContractHandler`](ContractHandler.md)

Contract utils

#### Defined in

[src/nevermined/api/UtilsApi.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/UtilsApi.ts#L50)

---

### fetch

• **fetch**: [`WebServiceConnector`](WebServiceConnector.md)

Fetch utils.

#### Defined in

[src/nevermined/api/UtilsApi.ts:20](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/UtilsApi.ts#L20)

---

### files

• **files**: [`Files`](Files.md)

Files utils.

#### Defined in

[src/nevermined/api/UtilsApi.ts:25](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/UtilsApi.ts#L25)

---

### jwt

• **jwt**: [`JwtUtils`](JwtUtils.md)

Jwt utils.

#### Defined in

[src/nevermined/api/UtilsApi.ts:30](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/UtilsApi.ts#L30)

---

### signature

• **signature**: [`SignatureUtils`](SignatureUtils.md)

Signature utils.

#### Defined in

[src/nevermined/api/UtilsApi.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/UtilsApi.ts#L35)

---

### token

• **token**: [`TokenUtils`](TokenUtils.md)

Token utils.

#### Defined in

[src/nevermined/api/UtilsApi.ts:40](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/UtilsApi.ts#L40)

---

### versions

• **versions**: [`Versions`](Versions.md)

Token utils.

#### Defined in

[src/nevermined/api/UtilsApi.ts:45](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/api/UtilsApi.ts#L45)

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
