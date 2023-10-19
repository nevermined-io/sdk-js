[@nevermined-io/sdk](../code-reference.md) / Instantiable

# Class: Instantiable

## Hierarchy

- **`Instantiable`**

  ↳ [`NeverminedEvent`](NeverminedEvent.md)

  ↳ [`AccountsApi`](AccountsApi.md)

  ↳ [`AgreementsApi`](AgreementsApi.md)

  ↳ [`ProvenanceApi`](ProvenanceApi.md)

  ↳ [`RegistryBaseApi`](RegistryBaseApi.md)

  ↳ [`SearchApi`](SearchApi.md)

  ↳ [`ServicesApi`](ServicesApi.md)

  ↳ [`UtilsApi`](UtilsApi.md)

  ↳ [`JwtUtils`](JwtUtils.md)

  ↳ [`ServiceAgreement`](ServiceAgreement.md)

  ↳ [`SignatureUtils`](SignatureUtils.md)

  ↳ [`WebServiceConnector`](WebServiceConnector.md)

  ↳ [`AccessService`](AccessService.md)

  ↳ [`NFTAccessService`](NFTAccessService.md)

  ↳ [`NFTSalesService`](NFTSalesService.md)

  ↳ [`Account`](Account.md)

  ↳ [`Files`](Files.md)

  ↳ [`Nevermined`](Nevermined.md)

  ↳ [`Providers`](Providers.md)

  ↳ [`TokenUtils`](TokenUtils.md)

  ↳ [`Versions`](Versions.md)

  ↳ [`AaveCredit`](AaveCredit.md)

  ↳ [`MarketplaceApi`](MarketplaceApi.md)

  ↳ [`NeverminedNode`](NeverminedNode.md)

  ↳ [`ContractBase`](ContractBase.md)

  ↳ [`ContractHandler`](ContractHandler.md)

  ↳ [`Keeper`](Keeper.md)

## Table of contents

### Constructors

- [constructor](Instantiable.md#constructor)

### Properties

- [\_instantiableConfig](Instantiable.md#_instantiableconfig)

### Accessors

- [artifactsFolder](Instantiable.md#artifactsfolder)
- [circuitsFolder](Instantiable.md#circuitsfolder)
- [config](Instantiable.md#config)
- [instanceConfig](Instantiable.md#instanceconfig)
- [instantiableConfig](Instantiable.md#instantiableconfig)
- [logger](Instantiable.md#logger)
- [nevermined](Instantiable.md#nevermined)
- [web3](Instantiable.md#web3)

### Methods

- [setInstanceConfig](Instantiable.md#setinstanceconfig)
- [getInstance](Instantiable.md#getinstance)
- [setInstanceConfig](Instantiable.md#setinstanceconfig-1)

## Constructors

### constructor

• **new Instantiable**()

## Properties

### \_instantiableConfig

• `Private` `Optional` **\_instantiableConfig**: [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Defined in

[src/Instantiable.abstract.ts:97](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L97)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

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

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
