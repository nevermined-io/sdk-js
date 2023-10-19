[@nevermined-io/sdk](../code-reference.md) / Profiles

# Class: Profiles

## Hierarchy

- [`MarketplaceApi`](MarketplaceApi.md)

  ↳ **`Profiles`**

## Table of contents

### Constructors

- [constructor](Profiles.md#constructor)

### Accessors

- [artifactsFolder](Profiles.md#artifactsfolder)
- [circuitsFolder](Profiles.md#circuitsfolder)
- [config](Profiles.md#config)
- [instanceConfig](Profiles.md#instanceconfig)
- [instantiableConfig](Profiles.md#instantiableconfig)
- [logger](Profiles.md#logger)
- [nevermined](Profiles.md#nevermined)
- [url](Profiles.md#url)
- [web3](Profiles.md#web3)

### Methods

- [addNewAddress](Profiles.md#addnewaddress)
- [create](Profiles.md#create)
- [disableOneByUserId](Profiles.md#disableonebyuserid)
- [findOneByAddress](Profiles.md#findonebyaddress)
- [findOneByUserId](Profiles.md#findonebyuserid)
- [login](Profiles.md#login)
- [setInstanceConfig](Profiles.md#setinstanceconfig)
- [update](Profiles.md#update)
- [getInstance](Profiles.md#getinstance)
- [setInstanceConfig](Profiles.md#setinstanceconfig-1)

## Constructors

### constructor

• **new Profiles**(`config`)

#### Parameters

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `config` | [`InstantiableConfig`](../interfaces/InstantiableConfig.md) |

#### Inherited from

[MarketplaceApi](MarketplaceApi.md).[constructor](MarketplaceApi.md#constructor)

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:7](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L7)

## Accessors

### artifactsFolder

• `Protected` `get` **artifactsFolder**(): `string`

#### Returns

`string`

#### Inherited from

MarketplaceApi.artifactsFolder

#### Defined in

[src/Instantiable.abstract.ts:73](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L73)

---

### circuitsFolder

• `Protected` `get` **circuitsFolder**(): `string`

#### Returns

`string`

#### Inherited from

MarketplaceApi.circuitsFolder

#### Defined in

[src/Instantiable.abstract.ts:77](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L77)

---

### config

• `Protected` `get` **config**(): [`NeverminedOptions`](NeverminedOptions.md)

#### Returns

[`NeverminedOptions`](NeverminedOptions.md)

#### Inherited from

MarketplaceApi.config

#### Defined in

[src/Instantiable.abstract.ts:57](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L57)

---

### instanceConfig

• `Protected` `get` **instanceConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

MarketplaceApi.instanceConfig

#### Defined in

[src/Instantiable.abstract.ts:81](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L81)

---

### instantiableConfig

• `Protected` `get` **instantiableConfig**(): [`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Returns

[`InstantiableConfig`](../interfaces/InstantiableConfig.md)

#### Inherited from

MarketplaceApi.instantiableConfig

#### Defined in

[src/Instantiable.abstract.ts:50](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L50)

---

### logger

• `Protected` `get` **logger**(): `Logger`

#### Returns

`Logger`

#### Inherited from

MarketplaceApi.logger

#### Defined in

[src/Instantiable.abstract.ts:64](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L64)

---

### nevermined

• `Protected` `get` **nevermined**(): [`Nevermined`](Nevermined.md)

#### Returns

[`Nevermined`](Nevermined.md)

#### Inherited from

MarketplaceApi.nevermined

#### Defined in

[src/Instantiable.abstract.ts:35](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L35)

---

### url

• `Protected` `get` **url**(): `string`

#### Returns

`string`

#### Inherited from

MarketplaceApi.url

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:12](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L12)

---

### web3

• `get` **web3**(): `JsonRpcProvider` \| `BrowserProvider`

#### Returns

`JsonRpcProvider` \| `BrowserProvider`

#### Inherited from

MarketplaceApi.web3

#### Defined in

[src/Instantiable.abstract.ts:42](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L42)

## Methods

### addNewAddress

▸ **addNewAddress**(`clientAssertion`): `Promise`<`string`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `clientAssertion` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[MarketplaceApi](MarketplaceApi.md).[addNewAddress](MarketplaceApi.md#addnewaddress)

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:36](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L36)

---

### create

▸ **create**(`newProfile`): `Promise`<[`Profile`](../interfaces/Profile.md)\>

Create user profile

#### Parameters

| Name         | Type                                        |
| :----------- | :------------------------------------------ |
| `newProfile` | [`NewProfile`](../interfaces/NewProfile.md) |

#### Returns

`Promise`<[`Profile`](../interfaces/Profile.md)\>

#### Defined in

[src/services/metadata/Profiles.ts:11](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Profiles.ts#L11)

---

### disableOneByUserId

▸ **disableOneByUserId**(`userId`): `Promise`<[`Profile`](../interfaces/Profile.md)\>

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `userId` | `string` |

#### Returns

`Promise`<[`Profile`](../interfaces/Profile.md)\>

#### Defined in

[src/services/metadata/Profiles.ts:93](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Profiles.ts#L93)

---

### findOneByAddress

▸ **findOneByAddress**(`address`): `Promise`<[`Profile`](../interfaces/Profile.md)\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `address` | `string` |

#### Returns

`Promise`<[`Profile`](../interfaces/Profile.md)\>

#### Defined in

[src/services/metadata/Profiles.ts:74](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Profiles.ts#L74)

---

### findOneByUserId

▸ **findOneByUserId**(`userId`): `Promise`<[`Profile`](../interfaces/Profile.md)\>

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `userId` | `string` |

#### Returns

`Promise`<[`Profile`](../interfaces/Profile.md)\>

#### Defined in

[src/services/metadata/Profiles.ts:55](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Profiles.ts#L55)

---

### login

▸ **login**(`clientAssertion`): `Promise`<`string`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `clientAssertion` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[MarketplaceApi](MarketplaceApi.md).[login](MarketplaceApi.md#login)

#### Defined in

[src/services/metadata/MarketplaceAPI.ts:16](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/MarketplaceAPI.ts#L16)

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

[MarketplaceApi](MarketplaceApi.md).[setInstanceConfig](MarketplaceApi.md#setinstanceconfig)

#### Defined in

[src/Instantiable.abstract.ts:99](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L99)

---

### update

▸ **update**(`userId`, `profile`): `Promise`<[`Profile`](../interfaces/Profile.md)\>

Update user profile

#### Parameters

| Name      | Type                                                    |
| :-------- | :------------------------------------------------------ |
| `userId`  | `string`                                                |
| `profile` | `Partial`<[`NewProfile`](../interfaces/NewProfile.md)\> |

#### Returns

`Promise`<[`Profile`](../interfaces/Profile.md)\>

#### Defined in

[src/services/metadata/Profiles.ts:34](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/services/metadata/Profiles.ts#L34)

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

[MarketplaceApi](MarketplaceApi.md).[getInstance](MarketplaceApi.md#getinstance)

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

[MarketplaceApi](MarketplaceApi.md).[setInstanceConfig](MarketplaceApi.md#setinstanceconfig-1)

#### Defined in

[src/Instantiable.abstract.ts:90](https://github.com/nevermined-io/sdk-js/blob/bb26f8ab/src/Instantiable.abstract.ts#L90)
