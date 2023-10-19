[@nevermined-io/sdk](../code-reference.md) / Providers

# Class: Providers

Providers API that allows the basic management of the provider accounts associated to an asset.

## Hierarchy

- [`Instantiable`](Instantiable.md)

  ↳ **`Providers`**

## Table of contents

### Constructors

- [constructor](Providers.md#constructor)

### Accessors

- [artifactsFolder](Providers.md#artifactsfolder)
- [circuitsFolder](Providers.md#circuitsfolder)
- [config](Providers.md#config)
- [instanceConfig](Providers.md#instanceconfig)
- [instantiableConfig](Providers.md#instantiableconfig)
- [logger](Providers.md#logger)
- [nevermined](Providers.md#nevermined)
- [web3](Providers.md#web3)

### Methods

- [add](Providers.md#add)
- [list](Providers.md#list)
- [remove](Providers.md#remove)
- [setInstanceConfig](Providers.md#setinstanceconfig)
- [getInstance](Providers.md#getinstance)
- [setInstanceConfig](Providers.md#setinstanceconfig-1)

## Constructors

### constructor

• **new Providers**(`config`)

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Overrides

[Instantiable](Instantiable.md).[constructor](Instantiable.md#constructor)

#### Defined in

[src/nevermined/Provider.ts:9](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Provider.ts#L9)

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

### add

▸ **add**(`did`, `address`, `from`, `txParams?`): `Promise`<`boolean`\>

Add a new provider in the registry for a did.

#### Parameters

| Name        | Type                                            | Description                                    |
| :---------- | :---------------------------------------------- | :--------------------------------------------- |
| `did`       | `string`                                        | Identifier of the entity created               |
| `address`   | `string`                                        | New provider address in the list of providers. |
| `from`      | [`Account`](Account.md)                         | Sender account address.                        |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | Transaction parameters                         |

#### Returns

`Promise`<`boolean`\>

true if the call succeeded.

#### Defined in

[src/nevermined/Provider.ts:23](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Provider.ts#L23)

---

### list

▸ **list**(`did`): `Promise`<`any`\>

List the provider addresses for a did.

#### Parameters

| Name  | Type     | Description                      |
| :---- | :------- | :------------------------------- |
| `did` | `string` | Identifier of the entity created |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/nevermined/Provider.ts:55](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Provider.ts#L55)

---

### remove

▸ **remove**(`did`, `address`, `from`, `txParams?`): `Promise`<`boolean`\>

Remove a provider in the registry for a did.

#### Parameters

| Name        | Type                                            | Description                                    |
| :---------- | :---------------------------------------------- | :--------------------------------------------- |
| `did`       | `string`                                        | Identifier of the entity created               |
| `address`   | `string`                                        | New provider address in the list of providers. |
| `from`      | [`Account`](Account.md)                         | Sender account address.                        |
| `txParams?` | [`TxParameters`](../interfaces/TxParameters.md) | Transaction parameters                         |

#### Returns

`Promise`<`boolean`\>

true if the call succeeded.

#### Defined in

[src/nevermined/Provider.ts:41](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/nevermined/Provider.ts#L41)

---

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
